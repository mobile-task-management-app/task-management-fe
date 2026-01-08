# TasksApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**taskControllerBulkAddTaskAttchments**](#taskcontrollerbulkaddtaskattchments) | **POST** /api/v1/tasks/{id}/attachments/bulk | Request presigned URLs for bulk file uploads|
|[**taskControllerDeleteTask**](#taskcontrollerdeletetask) | **DELETE** /api/v1/tasks/{id} | Delete a task|
|[**taskControllerGetTaskById**](#taskcontrollergettaskbyid) | **GET** /api/v1/tasks/{id} | Get a specific task by ID|
|[**taskControllerSearchUserTasks**](#taskcontrollersearchusertasks) | **GET** /api/v1/tasks | List all tasks for the current user|
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

# **taskControllerSearchUserTasks**
> TaskControllerSearchUserTasks200Response taskControllerSearchUserTasks()


### Example

```typescript
import {
    TasksApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'; //Filter tasks by their current status (optional) (default to undefined)
let priority: 'LOW' | 'MEDIUM' | 'HIGH'; //Filter tasks by their priority (optional) (default to undefined)
let categoryId: number; //Filter by category ID (optional) (default to undefined)
let startDate: string; //Filter by start date. Supports single Unix timestamp or range (min,max) (optional) (default to undefined)
let endDate: string; //Filter by end date. Supports single Unix timestamp or range (min,max) (optional) (default to undefined)
let sort: string; //The field to sort the results by (optional) (default to 'created_at')
let asc: boolean; //Sort order: true for ascending, false for descending (optional) (default to false)
let status2: string; //Filter tasks by their current status (optional) (default to undefined)
let priority2: string; //Filter tasks by their priority (optional) (default to undefined)
let categoryId2: number; //Filter by category ID (optional) (default to undefined)
let startDate2: string; //Filter by start date. Supports single Unix timestamp or range (min,max) (optional) (default to undefined)
let endDate2: string; //Filter by end date. Supports single Unix timestamp or range (min,max) (optional) (default to undefined)
let sort2: string; //The field to sort the results by (optional) (default to 'created_at')
let asc2: boolean; //Sort order: true for ascending, false for descending (optional) (default to false)

const { status, data } = await apiInstance.taskControllerSearchUserTasks(
    status,
    priority,
    categoryId,
    startDate,
    endDate,
    sort,
    asc,
    status2,
    priority2,
    categoryId2,
    startDate2,
    endDate2,
    sort2,
    asc2
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **status** | [**&#39;TODO&#39; | &#39;IN_PROGRESS&#39; | &#39;DONE&#39; | &#39;CANCELLED&#39;**]**Array<&#39;TODO&#39; &#124; &#39;IN_PROGRESS&#39; &#124; &#39;DONE&#39; &#124; &#39;CANCELLED&#39;>** | Filter tasks by their current status | (optional) defaults to undefined|
| **priority** | [**&#39;LOW&#39; | &#39;MEDIUM&#39; | &#39;HIGH&#39;**]**Array<&#39;LOW&#39; &#124; &#39;MEDIUM&#39; &#124; &#39;HIGH&#39;>** | Filter tasks by their priority | (optional) defaults to undefined|
| **categoryId** | [**number**] | Filter by category ID | (optional) defaults to undefined|
| **startDate** | [**string**] | Filter by start date. Supports single Unix timestamp or range (min,max) | (optional) defaults to undefined|
| **endDate** | [**string**] | Filter by end date. Supports single Unix timestamp or range (min,max) | (optional) defaults to undefined|
| **sort** | [**string**] | The field to sort the results by | (optional) defaults to 'created_at'|
| **asc** | [**boolean**] | Sort order: true for ascending, false for descending | (optional) defaults to false|
| **status2** | [**string**] | Filter tasks by their current status | (optional) defaults to undefined|
| **priority2** | [**string**] | Filter tasks by their priority | (optional) defaults to undefined|
| **categoryId2** | [**number**] | Filter by category ID | (optional) defaults to undefined|
| **startDate2** | [**string**] | Filter by start date. Supports single Unix timestamp or range (min,max) | (optional) defaults to undefined|
| **endDate2** | [**string**] | Filter by end date. Supports single Unix timestamp or range (min,max) | (optional) defaults to undefined|
| **sort2** | [**string**] | The field to sort the results by | (optional) defaults to 'created_at'|
| **asc2** | [**boolean**] | Sort order: true for ascending, false for descending | (optional) defaults to false|


### Return type

**TaskControllerSearchUserTasks200Response**

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
> TaskControllerGetTaskById200Response taskControllerUpdateTask(updateTaskRequestDTO)


### Example

```typescript
import {
    TasksApi,
    Configuration,
    UpdateTaskRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let id: number; //The unique ID of the task (default to undefined)
let updateTaskRequestDTO: UpdateTaskRequestDTO; //

const { status, data } = await apiInstance.taskControllerUpdateTask(
    id,
    updateTaskRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTaskRequestDTO** | **UpdateTaskRequestDTO**|  | |
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

