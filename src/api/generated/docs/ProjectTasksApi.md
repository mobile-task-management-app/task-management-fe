# ProjectTasksApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**projectTaskControllerCreateProjectTask**](#projecttaskcontrollercreateprojecttask) | **POST** /api/v1/projects/{id}/tasks | Create a new task within a project|
|[**projectTaskControllerSearchProjectTasks**](#projecttaskcontrollersearchprojecttasks) | **GET** /api/v1/projects/{id}/tasks | Search and filter tasks within a specific project|

# **projectTaskControllerCreateProjectTask**
> ProjectTaskControllerCreateProjectTask200Response projectTaskControllerCreateProjectTask(body)


### Example

```typescript
import {
    ProjectTasksApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectTasksApi(configuration);

let id: number; //The ID of the project (default to undefined)
let body: object; //

const { status, data } = await apiInstance.projectTaskControllerCreateProjectTask(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **id** | [**number**] | The ID of the project | defaults to undefined|


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

# **projectTaskControllerSearchProjectTasks**
> ProjectTaskControllerSearchProjectTasks200Response projectTaskControllerSearchProjectTasks()


### Example

```typescript
import {
    ProjectTasksApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectTasksApi(configuration);

let id: number; //The ID of the project (default to undefined)

const { status, data } = await apiInstance.projectTaskControllerSearchProjectTasks(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The ID of the project | defaults to undefined|


### Return type

**ProjectTaskControllerSearchProjectTasks200Response**

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

