# ✅ Schema Fix - Đã cập nhật đúng API Response Structure

## 🎯 Vấn đề

Schema không khớp với **API response thực tế**:

### ❌ Schema Cũ (SAI)

```typescript
// Nghĩ rằng API trả về nested structure
{
  data: {
    statusCode: 200,
    message: "...",
    data: { campaign }  // ← Nested data.data
  },
  statusCode: 200,
  message: "...",
  timestamp: "..."
}
```

### ✅ API Thực Tế

**Single Campaign Detail (`GET /api/campaigns/:id`):**

```json
{
  "data": {
    "_id": "...",
    "title": "...",
    "description": "...",
    ...campaign fields...
  },
  "statusCode": 200,
  "message": "Lấy chi tiết chiến dịch thành công",
  "timestamp": "2025-10-11T16:00:05.945Z"
}
```

**Campaign List (`GET /api/campaigns`):**

```json
{
  "data": {
    "data": [
      { ...campaign1... },
      { ...campaign2... }
    ],
    "pagination": {
      "current": 1,
      "pageSize": 10,
      "total": 100,
      "totalPages": 10
    }
  },
  "statusCode": 200,
  "message": "Lấy dữ liệu thành công",
  "timestamp": "2025-10-11T16:00:05.945Z"
}
```

---

## ✅ Đã Sửa

### 1. **SingleCampaignResponse Schema**

**File:** `src/schemaValidations/campaign.schema.ts`

**Before:**

```typescript
export const SingleCampaignResponse = z
  .object({
    data: z.object({
      statusCode: z.number(),
      message: z.string(),
      data: CampaignResponse, // ← Nested data.data (SAI!)
    }),
    statusCode: z.number().optional(),
    message: z.string().optional(),
    timestamp: z.string().optional(),
  })
  .transform(response => ({
    data: response.data.data, // ← Accessing nested data (SAI!)
    message: response.data.message,
  }));
```

**After:**

```typescript
// API returns: { data: Campaign, statusCode, message, timestamp }
export const SingleCampaignResponse = z
  .object({
    data: CampaignResponse, // ← Direct campaign object (ĐÚNG!)
    statusCode: z.number(),
    message: z.string(),
    timestamp: z.string().optional(),
  })
  .transform(response => ({
    data: response.data, // ← Direct access (ĐÚNG!)
    message: response.message,
  }));
```

### 2. **CampaignListResponse Schema**

**Before:**

```typescript
export const CampaignListResponse = z
  .object({
    data: z.object({
      statusCode: z.number(),
      message: z.string(),
      data: z.array(CampaignResponse),
      meta: z.object({...}),  // ← Tên field sai
    }),
    ...
  })
```

**After:**

```typescript
// API returns: { data: { data: Campaign[], pagination: {...} }, ... }
export const CampaignListResponse = z
  .object({
    data: z.object({
      data: z.array(CampaignResponse), // ← Nested data.data cho list
      pagination: z
        .object({
          // ← Tên field đúng
          current: z.number(),
          pageSize: z.number(),
          total: z.number(),
          totalPages: z.number(),
        })
        .optional(),
    }),
    statusCode: z.number(),
    message: z.string(),
    timestamp: z.string().optional(),
  })
  .transform(response => ({
    data: response.data.data, // ← Flatten nested data
    pagination: response.data.pagination, // ← Pagination thay vì meta
    message: response.message,
  }));
```

---

## 📊 So Sánh Structures

### Detail Response

| Level    | Old (SAI)                                    | New (ĐÚNG)      |
| -------- | -------------------------------------------- | --------------- |
| Top      | `data: { statusCode, message, data: {...} }` | `data: {...}`   |
| Campaign | `response.data.data`                         | `response.data` |

### List Response

| Level           | Old (SAI)                                    | New (ĐÚNG)                                 |
| --------------- | -------------------------------------------- | ------------------------------------------ |
| Top             | `data: { statusCode, message, data: [...] }` | `data: { data: [...], pagination: {...} }` |
| Campaigns Array | `response.data.data`                         | `response.data.data`                       |
| Pagination      | `meta`                                       | `pagination`                               |

---

## 🔧 Files Changed

### 1. Schema Definition

✅ `src/schemaValidations/campaign.schema.ts`

- Fixed SingleCampaignResponse structure
- Fixed CampaignListResponse structure
- Changed `meta` → `pagination`
- Removed unnecessary nested statusCode/message

### 2. Test File

✅ `src/schemaValidations/__tests__/campaign-api-validation.test.ts`

- Updated sampleDetailResponse to match API
- Updated sampleListResponse to match API
- Fixed indentation
- Added pagination object

### 3. API Request Layer (Already correct)

✅ `src/apiRequests/campaigns.ts`

- `.parse()` calls already in place
- Will work correctly with fixed schemas

---

## ✅ Kết Quả

### Before Fix

```typescript
// ❌ Schema parse fails
const response = await campaignsApiRequest.getById(id);
// Error: Expected nested data.data structure
```

### After Fix

```typescript
// ✅ Schema parse succeeds
const response = await campaignsApiRequest.getById(id);
// response.data = campaign object (correctly typed)
// response.message = "Lấy chi tiết chiến dịch thành công"
```

---

## 🧪 How to Verify

### 1. Test with Real API

```bash
# Detail
curl http://localhost:3001/api/campaigns/68e9495acf919e962138789e | jq '.'

# List
curl http://localhost:3001/api/campaigns?limit=1 | jq '.'
```

### 2. Check Structure

```bash
# Detail response keys
curl ... | jq 'keys'
# Output: ["data", "message", "statusCode", "timestamp"]

# List response keys
curl ... | jq '.data | keys'
# Output: ["data", "pagination"]
```

### 3. Run Validation Test

```bash
npx tsx src/schemaValidations/__tests__/campaign-api-validation.test.ts
```

**Expected Output:**

```
🧪 Testing Campaign Schema Validation

1️⃣ Testing SingleCampaignResponse...
✅ Detail response validated successfully!
   Campaign ID: 68e93d506a06674aebed388f
   Title: f ưe ừew fewf ưef ừ fw ừe
   ...

2️⃣ Testing CampaignListResponse...
✅ List response validated successfully!
   Total campaigns: 1
   ...

✨ Schema validation tests completed!
```

---

## 📝 Key Learnings

### 1. **Always Verify API Response First**

```bash
curl <api-endpoint> | jq '.'
```

Don't assume API structure!

### 2. **Different Endpoints, Different Structures**

- **Detail**: Direct campaign object in `data`
- **List**: Nested `data.data` array + `pagination`

### 3. **Field Naming Matters**

- API uses `pagination` not `meta`
- API uses `current` not `page`
- API uses `pageSize` not `limit`

### 4. **Schema Transform Purpose**

```typescript
.transform(response => ({
  data: response.data,      // Flatten for easier use
  message: response.message  // Extract message
}));
```

Transform để code gọn hơn, không phải access nested structure.

---

## 🎯 Summary

| Aspect              | Before                       | After                   |
| ------------------- | ---------------------------- | ----------------------- |
| **Schema Accuracy** | ❌ Wrong structure           | ✅ Matches API exactly  |
| **Detail Response** | ❌ Expected nested data.data | ✅ Direct data object   |
| **List Response**   | ❌ Wrong field names (meta)  | ✅ Correct (pagination) |
| **Parse Success**   | ❌ Fails validation          | ✅ Parses correctly     |
| **Type Safety**     | ⚠️ Wrong types at runtime    | ✅ Correct types        |

**Result:** Schema giờ khớp 100% với API! 🎉

---

## 🔍 Debug Commands

```bash
# Check detail response structure
curl -s http://localhost:3001/api/campaigns/[ID] | jq '{
  topKeys: keys,
  dataType: (.data | type),
  dataKeys: (.data | keys | .[0:5])
}'

# Check list response structure
curl -s http://localhost:3001/api/campaigns?limit=1 | jq '{
  topKeys: keys,
  dataKeys: (.data | keys),
  paginationKeys: (.data.pagination | keys)
}'
```

---

**Schemas are now production-ready! ✨**
