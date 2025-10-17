# React Query Integration Guide

## 📚 Tổng quan

Project đã được tích hợp **React Query v5** (TanStack Query) để quản lý server state một cách hiệu quả và theo best practices.

## 🎯 Lợi ích của React Query

1. **Tự động caching** - Giảm số lượng API calls không cần thiết
2. **Background refetching** - Luôn giữ data fresh cho người dùng
3. **Optimistic updates** - UX tốt hơn với instant feedback
4. **Error handling** - Xử lý lỗi thống nhất và retry logic thông minh
5. **Loading states** - Dễ dàng quản lý loading/error states
6. **Parallel/dependent queries** - Fetch nhiều data hiệu quả
7. **Cache invalidation** - Tự động sync data sau mutations

## 📁 Cấu trúc

```
src/
├── lib/react-query/
│   ├── query-client.ts    # QueryClient configuration
│   ├── query-keys.ts      # Query keys constants
│   └── index.ts           # Barrel export
│
├── hooks/campaigns/
│   ├── use-query-campaigns.ts          # Fetch danh sách campaigns
│   ├── use-query-campaign.ts           # Fetch chi tiết campaign
│   ├── use-mutation-create-campaign.ts # Tạo campaign mới
│   ├── use-mutation-update-campaign.ts # Update campaign
│   ├── use-mutation-delete-campaign.ts # Xóa campaign
│   └── index.ts                        # Barrel export
│
└── components/providers.tsx  # QueryClientProvider setup
```

## 🔧 Configuration

### QueryClient Settings

File: `src/lib/react-query/query-client.ts`

```typescript
{
  queries: {
    staleTime: 60 * 1000,        // 1 phút - data fresh
    gcTime: 5 * 60 * 1000,       // 5 phút - cache time
    refetchOnWindowFocus: false,  // Không auto refetch khi focus
    refetchOnReconnect: true,     // Refetch khi reconnect internet
    retry: 2,                     // Retry 2 lần cho 5xx errors
  },
  mutations: {
    retry: false,  // Không retry mutations
  }
}
```

### Query Keys Structure

File: `src/lib/react-query/query-keys.ts`

Query keys được tổ chức theo pattern:

- `['campaigns']` - Root key
- `['campaigns', 'list']` - All lists
- `['campaigns', 'list', filters]` - Specific list với filters
- `['campaigns', 'detail', id]` - Campaign detail

## 📖 Cách sử dụng

### 1. Fetch danh sách campaigns (Query)

```typescript
import { useQueryCampaigns } from '@/hooks/campaigns';

function CampaignsPage() {
  const { data, isLoading, error, refetch } = useQueryCampaigns({
    filters: {
      page: 1,
      limit: 10,
      category: 'health'
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const campaigns = data?.items || [];
  const pagination = data?.pagination;

  return (
    <div>
      {campaigns.map(campaign => (
        <CampaignCard key={campaign._id} {...campaign} />
      ))}
    </div>
  );
}
```

### 2. Fetch chi tiết campaign (Query)

```typescript
import { useQueryCampaign } from '@/hooks/campaigns';

function CampaignDetailPage({ id }: { id: string }) {
  const { data, isLoading } = useQueryCampaign({ id });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data?.data.title}</h1>
      <p>{data?.data.description}</p>
    </div>
  );
}
```

### 3. Tạo campaign mới (Mutation)

```typescript
import { useMutationCreateCampaign } from '@/hooks/campaigns';
import { useRouter } from 'next/navigation';

function CreateCampaignPage() {
  const router = useRouter();

  const createMutation = useMutationCreateCampaign({
    onSuccess: (data) => {
      toast.success('Tạo thành công!');
      router.push(`/campaigns/${data.data._id}`);
    }
  });

  const handleSubmit = async (formData) => {
    // Transform và upload files...
    createMutation.mutate(campaignData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button
        type="submit"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? 'Đang tạo...' : 'Tạo campaign'}
      </Button>
    </form>
  );
}
```

### 4. Update campaign (Mutation)

```typescript
import { useMutationUpdateCampaign } from '@/hooks/campaigns';

function EditCampaignPage({ id }: { id: string }) {
  const updateMutation = useMutationUpdateCampaign({
    onSuccess: () => {
      toast.success('Cập nhật thành công!');
    }
  });

  const handleUpdate = (updates) => {
    updateMutation.mutate({
      id,
      data: updates
    });
  };

  return (
    <Button onClick={() => handleUpdate({ title: 'New Title' })}>
      Update
    </Button>
  );
}
```

### 5. Xóa campaign (Mutation)

```typescript
import { useMutationDeleteCampaign } from '@/hooks/campaigns';

function CampaignActions({ id }: { id: string }) {
  const router = useRouter();

  const deleteMutation = useMutationDeleteCampaign({
    onSuccess: () => {
      toast.success('Xóa thành công!');
      router.push('/campaigns');
    }
  });

  const handleDelete = () => {
    if (confirm('Bạn có chắc muốn xóa?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
    >
      Xóa campaign
    </Button>
  );
}
```

## 🎨 Advanced Patterns

### Cache Invalidation

Mutations tự động invalidate cache:

```typescript
// Sau khi create campaign
queryClient.invalidateQueries({
  queryKey: ['campaigns', 'list'], // Refetch tất cả lists
});

// Sau khi update campaign
queryClient.invalidateQueries({
  queryKey: ['campaigns', 'detail', id], // Refetch detail cụ thể
});
```

### Dependent Queries

```typescript
// Fetch campaign detail trước, sau đó fetch related data
const { data: campaign } = useQueryCampaign({ id });

const { data: donations } = useQuery({
  queryKey: ['donations', campaign?.data._id],
  queryFn: () => fetchDonations(campaign?.data._id),
  enabled: !!campaign?.data._id, // Chỉ fetch khi có campaign
});
```

### Optimistic Updates

```typescript
const updateMutation = useMutationUpdateCampaign({
  onMutate: async variables => {
    // Cancel ongoing queries
    await queryClient.cancelQueries({
      queryKey: ['campaigns', 'detail', variables.id],
    });

    // Snapshot current value
    const previous = queryClient.getQueryData([
      'campaigns',
      'detail',
      variables.id,
    ]);

    // Optimistically update
    queryClient.setQueryData(['campaigns', 'detail', variables.id], old => ({
      ...old,
      ...variables.data,
    }));

    return { previous };
  },
  onError: (err, variables, context) => {
    // Rollback on error
    queryClient.setQueryData(
      ['campaigns', 'detail', variables.id],
      context?.previous
    );
  },
});
```

### Prefetching

```typescript
import { useQueryClient } from '@tanstack/react-query';

function CampaignCard({ id }) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    // Prefetch detail khi hover
    queryClient.prefetchQuery({
      queryKey: ['campaigns', 'detail', id],
      queryFn: () => campaignsApiRequest.getById(id)
    });
  };

  return <Card onMouseEnter={handleMouseEnter}>...</Card>;
}
```

## 🔍 React Query Devtools

Devtools được bật trong development mode:

1. Mở app ở development mode
2. Click vào biểu tượng React Query ở góc màn hình
3. Xem queries, mutations, cache state

## 🌟 Best Practices

### 1. Luôn dùng query keys constants

```typescript
// ✅ Good
queryKey: queryKeys.campaigns.list(filters);

// ❌ Bad
queryKey: ['campaigns', 'list', filters];
```

### 2. Handle loading và error states

```typescript
// ✅ Good
if (isLoading) return <Skeleton />;
if (error) return <ErrorMessage error={error} />;

// ❌ Bad - Không handle edge cases
return <div>{data.items.map(...)}</div>;
```

### 3. Sử dụng enabled option

```typescript
// ✅ Good - Chỉ fetch khi có ID
const { data } = useQueryCampaign({
  id,
  enabled: !!id,
});

// ❌ Bad - Fetch ngay cả khi chưa có ID
const { data } = useQueryCampaign({ id });
```

### 4. Custom stale time cho data ít thay đổi

```typescript
// ✅ Good - Static data có stale time cao
const { data } = useQuery({
  queryKey: ['categories'],
  queryFn: fetchCategories,
  staleTime: 10 * 60 * 1000, // 10 phút
});
```

### 5. Cleanup unused queries

```typescript
// Tự động cleanup sau gcTime (5 phút default)
// Hoặc manual remove:
queryClient.removeQueries({
  queryKey: ['campaigns', 'detail', oldId],
});
```

## 🚀 Migration từ useState/useEffect

### Before (Old way)

```typescript
const [campaigns, setCampaigns] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      const data = await campaignsApiRequest.getList();
      setCampaigns(data.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, [filters]);
```

### After (React Query)

```typescript
const { data, isLoading } = useQueryCampaigns({ filters });
const campaigns = data?.items || [];
```

## 📚 Tài liệu tham khảo

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)
- [Query Key Management](https://tkdodo.eu/blog/effective-react-query-keys)

