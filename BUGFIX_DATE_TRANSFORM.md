# 🐛 BugFix: Date Transform Issue

## ❌ Problem

**Error:**

```
Error: campaign.endDate.getTime is not a function
```

**Location:** `src/app/(main)/campaigns/[id]/page.tsx:258`

**Root Cause:**
Zod schema có `.transform()` để convert string → Date, nhưng transform **không được apply** vì:

- `http.get<Type>()` chỉ là **type annotation**
- Không thực sự **parse** qua Zod schema
- Transform chỉ chạy khi gọi `.parse()`

---

## ✅ Solution

### 1. **Parse Response qua Zod Schema**

**File:** `src/apiRequests/campaigns.ts`

**Before:**

```typescript
getById: (id: string) => {
  return http.get<SingleCampaignResponseType>(`/campaigns/${id}`);
};
```

**After:**

```typescript
getById: async (id: string) => {
  const response = await http.get(`/campaigns/${id}`);
  // Parse and transform response through schema
  return SingleCampaignResponse.parse(response);
};
```

**Why:**

- `.parse()` sẽ validate **và** apply transform
- String dates → Date objects
- Nested structure được flatten

### 2. **Update Helper Functions - Defensive Programming**

**File:** `src/app/(main)/campaigns/[id]/page.tsx`

**Before:**

```typescript
function formatDate(date: Date) {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
```

**After:**

```typescript
function formatDate(date: Date | string) {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObj);
}
```

**Why:**

- Handle cả Date và string (defensive programming)
- Không bị crash nếu transform không apply
- Type-safe với union type

### 3. **Safe Date Calculation**

**Before:**

```typescript
const daysRemaining = Math.max(
  0,
  Math.ceil(
    (campaign.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )
);
```

**After:**

```typescript
const endDate =
  campaign.endDate instanceof Date
    ? campaign.endDate
    : new Date(campaign.endDate);
const daysRemaining = Math.max(
  0,
  Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
);
```

**Why:**

- Check instance type trước khi gọi `.getTime()`
- Convert string → Date nếu cần
- Không bị runtime error

---

## 📝 Technical Details

### Zod Transform Behavior

```typescript
// Schema with transform
const schema = z.string().transform(str => new Date(str));

// ❌ This does NOT apply transform (just type annotation)
const data: z.infer<typeof schema> = await api.get();

// ✅ This DOES apply transform
const data = schema.parse(await api.get());
```

### Why Type Annotation Doesn't Work

```typescript
// TypeScript type annotation
http.get<SingleCampaignResponseType>(url);
// ↑ This only tells TypeScript what type to expect
// ↑ Does NOT run any validation or transformation
// ↑ Runtime data might not match the type!

// Zod parse
SingleCampaignResponse.parse(response);
// ↑ This actually validates AND transforms
// ↑ Throws error if validation fails
// ↑ Returns correctly typed and transformed data
```

---

## 🔍 Related Changes

### Also Updated `getList()` for Consistency

```typescript
getList: async (query?: GetCampaignsQueryType) => {
  // ... query building ...
  const response = await http.get(url);
  return CampaignListResponse.parse(response); // ← Added parse
};
```

---

## ✅ Benefits

1. **Type Safety** - Runtime data matches TypeScript types
2. **Validation** - Invalid responses throw clear errors
3. **Transformation** - Dates automatically converted
4. **Defensive** - Helper functions handle both Date and string
5. **Consistency** - All API responses properly parsed

---

## 🧪 How to Test

```bash
# 1. Run dev server
npm run dev

# 2. Navigate to campaign detail
http://localhost:3000/campaigns/68e93d506a06674aebed388f

# 3. Check that:
✅ No "getTime is not a function" error
✅ Dates display correctly
✅ Days remaining calculated correctly
✅ No console errors
```

---

## 📚 Lessons Learned

### ❌ Don't Do This

```typescript
// Just type annotation - no runtime validation
http.get<ResponseType>(url);
```

### ✅ Do This Instead

```typescript
// Parse through schema - runtime validation + transform
const response = await http.get(url);
return Schema.parse(response);
```

### 🛡️ Always Defensive

```typescript
// Handle both types
const dateObj = date instanceof Date ? date : new Date(date);

// Check before calling methods
if (campaign.endDate?.getTime) {
  // safe to use
}
```

---

## 🎯 Summary

**Problem:** Zod transforms not applied → Runtime type mismatch
**Solution:** Parse responses through schema → Transforms applied correctly
**Bonus:** Defensive helper functions → Never crash on type mismatches

**Result:** 🎉 Campaign detail page works perfectly with real API data!
