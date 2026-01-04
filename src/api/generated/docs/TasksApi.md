# TasksApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**taskControllerBulkAddTaskAttchments**](#taskcontrollerbulkaddtaskattchments) | **POST** /api/v1/tasks/{id}/attachments/bulk | Request presigned URLs for bulk file uploads|
|[**taskControllerDeleteTask**](#taskcontrollerdeletetask) | **DELETE** /api/v1/tasks/{id} | Delete a task|
|[**taskControllerGetTaskById**](#taskcontrollergettaskbyid) | **GET** /api/v1/tasks/{id} | Get a specific task by ID|
|[**taskControllerUpdateTask**](#taskcontrollerupdatetask) | **PATCH** /api/v1/tasks/{id} | Update task details|

# **taskControllerBulkAddTaskAttchments**
> ProjectTaskControllerCreateProjectTask200Response taskControllerBulkAddTaskAttchments(body)

Call this before uploading files to S3. Returns S3 PUT URLs for the mobile app.

### Example

```typescript
import {
    TasksApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let id: number; //The task ID to attach files to (default to undefined)
let body: object; //

const { status, data } = await apiInstance.taskControllerBulkAddTaskAttchments(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **id** | [**number**] | The task ID to attach files to | defaults to undefined|


### Return type

**ProjectTaskControllerCreateProjectTask200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **taskControllerDeleteTask**
> AppResponseDTO taskControllerDeleteTask()


### Example

```typescript
import {
    TasksApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.taskControllerDeleteTask(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**AppResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **taskControllerGetTaskById**
> TaskControllerGetTaskById200Response taskControllerGetTaskById()


### Example

```typescript
import {
    TasksApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.taskControllerGetTaskById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**TaskControllerGetTaskById200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **taskControllerUpdateTask**
> TaskControllerGetTaskById200Response taskControllerUpdateTask(body)


### Example

```typescript
import {
    TasksApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let id: number; //The unique ID of the task (default to undefined)
let body: object; //

const { status, data } = await apiInstance.taskControllerUpdateTask(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **id** | [**number**] | The unique ID of the task | defaults to undefined|


### Return type

**TaskControllerGetTaskById200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

