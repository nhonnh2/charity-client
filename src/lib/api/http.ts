import envConfig from '@/config';
import { z } from 'zod';

import { normalizePath } from '@/lib/utils/path';
import { readCookie, readHeader } from '@/lib/auth/server';
import { refreshOnce, logoutOnce } from '@/lib/auth/single-flight';
import { getApiErrorMessage, logErrorForDev } from '@/lib/api/errors';

import { redirect } from 'next/navigation';
import { toast } from 'sonner';

// Base response schema - chuẩn format từ backend
const BaseResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    statusCode: z.number(),
    message: z.string(),
    timestamp: z.string().transform(str => new Date(str)),
  });

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined;
  /**
   * If true, will not show error toast notification
   * Use this when you want to handle errors manually
   * @default false
   */
  silent?: boolean;
  /**
   * Custom error message to show instead of the default one
   * Only used when silent is false
   */
  customErrorMessage?: string;
  /**
   * Context for error logging (helps debugging)
   */
  errorContext?: string;
  /**
   * Toast options to pass to sonner's toast.error()
   * Useful for replacing loading toast: { id: loadingToastId }
   */
  toastOptions?: Parameters<typeof toast.error>[1];
  /**
   * Zod schema để validate và extract data từ response
   * Nếu có schema, sẽ tự động extract data từ { data, statusCode, message, timestamp }
   */
  dataSchema?: z.ZodTypeAny;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    error_code?: string;
    errorCode?: string;
    [key: string]: any;
  };
  constructor({
    status,
    payload,
    message = 'Lỗi HTTP',
  }: {
    status: number;
    payload: any;
    message?: string;
  }) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: typeof ENTITY_ERROR_STATUS;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: typeof ENTITY_ERROR_STATUS;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload, message: 'Lỗi thực thể' });
    this.status = status;
    this.payload = payload;
  }
}

/**
 * Global error handler for HTTP requests
 * Automatically shows toast notification unless silent mode is enabled
 */
const handleRequestError = (error: any, options?: CustomOptions) => {
  const isClient = typeof window !== 'undefined';
  const silent = options?.silent ?? false;
  const errorContext = options?.errorContext;

  // Log error in development
  logErrorForDev(error, errorContext);

  // Show toast notification on client side (unless silent)
  if (isClient && !silent) {
    const errorMessage =
      options?.customErrorMessage || getApiErrorMessage(error);
    toast.error(errorMessage, options?.toastOptions);
  }

  // Re-throw the error so caller can still handle it if needed
  throw error;
};

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
) => {
  try {
    const isClient = typeof window !== 'undefined';

    let body: FormData | string | undefined = undefined;
    if (options?.body instanceof FormData) {
      body = options.body;
    } else if (options?.body) {
      body = JSON.stringify(options.body);
    }
    let baseHeaders: {
      [key: string]: string;
    } =
      body instanceof FormData
        ? {}
        : {
            'Content-Type': 'application/json',
          };

    if (!isClient) {
      const accessToken = await readCookie('accessToken');

      if (accessToken) {
        baseHeaders.Authorization = `Bearer ${accessToken}`;
      }
    }

    // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
    // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

    const baseUrl =
      options?.baseUrl === undefined
        ? envConfig.NEXT_PUBLIC_API_ENDPOINT
        : options.baseUrl;

    const fullUrl = `${baseUrl}/${normalizePath(url)}`;
    const doFetch = () =>
      fetch(fullUrl, {
        ...options,
        headers: {
          ...baseHeaders,
          ...options?.headers,
        } as any,
        body,
        method,
        ...(isClient ? { credentials: 'include' } : {}), // <<< cookie httpOnly tự được gửi kèm
      });

    let res = await doFetch();
    const normalizeUrl = normalizePath(url);
    const isRefreshToken = ['auth/refresh'].includes(normalizeUrl);

    if (res.status === AUTHENTICATION_ERROR_STATUS) {
      console.log(
        'AUTHENTICATION_ERROR_STATUS___',
        isRefreshToken,
        normalizeUrl
      );
      if (isRefreshToken) {
        if (isClient) {
          const resLogout = await logoutOnce();
          if (resLogout) {
            // Client-side navigation must not use next/navigation redirect
            window.location.href = '/login';
            return null as any;
          }
        }
      } else {
        if (isClient) {
          const resRefresh = await refreshOnce();
          if (resRefresh) {
            res = await doFetch();
          } else {
            window.location.href = '/logout';
            return null;
          }
        } else {
          const csrfToken = await readCookie('csrfToken');
          const returnTo: any = (await readHeader('x-return-to')) ?? '/';
          const refreshUrl = `/refresh-token?csrfToken=${encodeURIComponent(
            csrfToken ?? ''
          )}&returnTo=${encodeURIComponent(returnTo)}`;
          redirect(refreshUrl);
        }
      }
    }

    const payload: Response = await res.json();
    const data = {
      status: res.status,
      payload,
    };
    if (res.status === ENTITY_ERROR_STATUS) {
      console.log('ENTITY_ERROR_STATUS___', res);

      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new HttpError({
        status: res.status,
        payload,
      });
    }
    // 🚀 INTERCEPTOR: Tự động extract data nếu có dataSchema
    if (options?.dataSchema) {
      try {
        const responseSchema = BaseResponseSchema(options.dataSchema);
        const parsedResponse = responseSchema.parse(payload);
        return parsedResponse.data; // Chỉ return data, không cần statusCode, message, timestamp
      } catch (error) {
        console.error('Response validation error:', error);
        // Nếu validation fail, fallback về payload gốc
        return payload;
      }
    }

    return data.payload;
  } catch (error) {
    // Use global error handler
    return handleRequestError(error, options);
  }
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options });
  },
};

// Export BaseResponseSchema để dùng ở nơi khác
export { BaseResponseSchema };

export default http;
