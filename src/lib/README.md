# Library Directory Structure

Cấu trúc thư mục `lib/` được tổ chức theo domain/chức năng để dễ quản lý và maintain.

## 📁 Structure

```
lib/
├── api/                    # API & HTTP related
│   ├── http.ts            # HTTP client, error classes
│   ├── errors.ts          # Error code mapping
│   └── index.ts           # Exports
├── auth/                   # Authentication related
│   ├── single-flight.ts   # Single flight pattern for refresh/logout
│   ├── pkce.ts           # PKCE utilities for OAuth
│   ├── server.ts          # Server-side auth helpers (cookies, headers)
│   └── index.ts           # Exports
├── utils/                  # General utilities
│   ├── cn.ts              # Tailwind className utility
│   ├── path.ts            # Path manipulation
│   ├── file.ts            # File type detection & formatting
│   ├── id.ts              # ID generation utilities
│   └── index.ts           # Exports
├── web3/                   # Web3/blockchain
│   ├── wagmi.ts           # Wagmi configuration
│   └── index.ts           # Exports
└── index.ts               # Main barrel export
```

## 📚 Modules

### 🌐 api/

**API client và error handling**

```typescript
// HTTP Client
import http from '@/lib/api/http';
import { HttpError, EntityError } from '@/lib/api/http';

// Error handling
import {
  getApiErrorMessage,
  logErrorForDev,
  ERROR_MESSAGES,
} from '@/lib/api/errors';
```

**Files:**

- `http.ts`: HTTP client với authentication, refresh token logic
- `errors.ts`: Error code mapping (46 error codes) cho user-friendly messages

---

### 🔐 auth/

**Authentication utilities**

```typescript
// Single flight pattern (prevent concurrent requests)
import { refreshOnce, logoutOnce } from '@/lib/auth/single-flight';

// PKCE for OAuth
import { generateCodeVerifier, generateCodeChallenge } from '@/lib/auth/pkce';

// Server-side helpers
import { readCookie, readHeader } from '@/lib/auth/server';
```

**Files:**

- `single-flight.ts`: Đảm bảo chỉ có 1 request refresh/logout tại một thời điểm
- `pkce.ts`: PKCE implementation cho OAuth 2.0
- `server.ts`: Read cookies và headers từ server-side (Next.js)

---

### 🛠️ utils/

**General purpose utilities**

```typescript
// Tailwind className merge
import { cn } from '@/lib/utils/cn';

// Path utilities
import { normalizePath } from '@/lib/utils/path';

// File utilities
import {
  detectMediaType,
  isImageFile,
  isDocumentFile,
  getFileExtension,
  formatFileSize,
} from '@/lib/utils/file';

// ID generation
import { generateId, generateShortId, generateNumericId } from '@/lib/utils/id';
```

**Files:**

- `cn.ts`: Merge Tailwind classes với conflict resolution
- `path.ts`: URL/path manipulation
- `file.ts`: File type detection, validation, formatting
- `id.ts`: Generate unique IDs (UUID, short ID, numeric ID)

---

### ⛓️ web3/

**Web3 & blockchain utilities**

```typescript
// Wagmi config
import { config } from '@/lib/web3/wagmi';
```

**Files:**

- `wagmi.ts`: Wagmi configuration cho Web3 integration

---

## 🎯 Import Guidelines

### ✅ Recommended

**Import từ domain folders:**

```typescript
// Specific imports
import http from '@/lib/api/http';
import { getApiErrorMessage } from '@/lib/api/errors';
import { refreshOnce } from '@/lib/auth/single-flight';
import { cn } from '@/lib/utils/cn';
```

**Hoặc từ barrel exports:**

```typescript
// From index files
import { http, getApiErrorMessage } from '@/lib/api';
import { refreshOnce } from '@/lib/auth';
import { cn, generateId } from '@/lib/utils';
```

### ❌ Avoid

**Đừng import trực tiếp từ lib root cho files đã move:**

```typescript
// ❌ BAD - these files don't exist anymore
import http from '@/lib/http';
import { generateId } from '@/lib/generate-id';
import { cn } from '@/lib/utils'; // OK nếu có barrel export
```

---

## 🔄 Migration Guide

Nếu bạn có code cũ cần update:

| Old Import             | New Import                               |
| ---------------------- | ---------------------------------------- |
| `@/lib/http`           | `@/lib/api/http`                         |
| `@/lib/error-messages` | `@/lib/api/errors`                       |
| `@/lib/singe-flight`   | `@/lib/auth/single-flight` (fixed typo!) |
| `@/lib/pkce`           | `@/lib/auth/pkce`                        |
| `@/lib/read-on-server` | `@/lib/auth/server`                      |
| `@/lib/generate-id`    | `@/lib/utils/id`                         |
| `@/lib/wagmi-config`   | `@/lib/web3/wagmi`                       |
| `helpers/file-utils`   | `@/lib/utils/file`                       |

**Old `utils.ts` split into:**

- `cn()` → `@/lib/utils/cn`
- `normalizePath()` → `@/lib/utils/path`

---

## 📝 Adding New Utilities

### 1. Xác định domain

Utility mới thuộc category nào?

- **API related?** → `lib/api/`
- **Auth related?** → `lib/auth/`
- **General purpose?** → `lib/utils/`
- **Web3 related?** → `lib/web3/`

### 2. Tạo file mới

```typescript
// lib/utils/new-utility.ts
export function myNewUtility() {
  // Implementation
}
```

### 3. Export trong index.ts

```typescript
// lib/utils/index.ts
export * from './new-utility';
```

### 4. Document

Update README này với:

- Import example
- Brief description
- Use cases

---

## 🧪 Testing

Mỗi utility nên có unit tests:

```
lib/
├── api/
│   ├── __tests__/
│   │   ├── http.test.ts
│   │   └── errors.test.ts
│   ├── http.ts
│   └── errors.ts
```

---

## 💡 Best Practices

1. **Single Responsibility**: Mỗi file nên có một trách nhiệm rõ ràng
2. **Pure Functions**: Utilities nên là pure functions khi có thể
3. **Type Safety**: Luôn định nghĩa types đầy đủ
4. **Documentation**: Comment cho public APIs
5. **Testing**: Unit tests cho business logic quan trọng
6. **Barrel Exports**: Sử dụng `index.ts` để tổ chức exports

---

## 📊 Statistics

- **Total Modules**: 4 (api, auth, utils, web3)
- **Total Files**: 12 utilities
- **Total Exports**:
  - `api/`: ~50 exports (http client + 46 error codes)
  - `auth/`: 6 exports
  - `utils/`: 10 exports
  - `web3/`: 1 export

---

## 🔗 Related

- [Error Handling Documentation](./api/ERROR_HANDLING.md)
- [API Client Usage](./api/)
- [Authentication Flow](./auth/)

---

**Last Updated**: 2025-01-10  
**Maintained By**: Frontend Team
