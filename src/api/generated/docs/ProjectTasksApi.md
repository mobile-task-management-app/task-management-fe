# ProjectTasksApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**projectTaskControllerCreateProjectTask**](#projecttaskcontrollercreateprojecttask) | **POST** /api/v1/projects/{id}/tasks | Create a new task within a project|
|[**projectTaskControllerSearchProjectTasks**](#projecttaskcontrollersearchprojecttasks) | **GET** /api/v1/projects/{id}/tasks | Search and filter tasks within a specific project|

# **projectTaskControllerCreateProjectTask**
> ProjectTaskControllerCreateProjectTask200Response projectTaskControllerCreateProjectTask(createProjectTaskRequestDTO)


### Example

```typescript
import {
    ProjectTasksApi,
    Configuration,
    CreateProjectTaskRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectTasksApi(configuration);

let id: number; //The ID of the project (default to undefined)
let createProjectTaskRequestDTO: CreateProjectTaskRequestDTO; //

const { status, data } = await apiInstance.projectTaskControllerCreateProjectTask(
    id,
    createProjectTaskRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createProjectTaskRequestDTO** | **CreateProjectTaskRequestDTO**|  | |
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
let status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'; //Filter tasks by their current status (optional) (default to undefined)
let priority: 'LOW' | 'MEDIUM' | 'HIGH'; //Filter tasks by their priority (optional) (default to undefined)
let categoryId: number; //Filter by category ID (optional) (default to undefined)
let startDate: string; //Filter by start date. Supports single Unix timestamp or range (min,max) (optional) (default to undefined)
let endDate: string; //Filter by end date. Supports single Unix timestamp or range (min,max) (optional) (default to undefined)
let sort: string; //The field to sort the results by (optional) (default to 'created_at')
let asc: boolean; //Sort order: true for ascending, false for descending (optional) (default to false)

const { status, data } = await apiInstance.projectTaskControllerSearchProjectTasks(
    id,
    status,
    priority,
    categoryId,
    startDate,
    endDate,
    sort,
    asc
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The ID of the project | defaults to undefined|
| **status** | [**&#39;TODO&#39; | &#39;IN_PROGRESS&#39; | &#39;DONE&#39; | &#39;CANCELLED&#39;**]**Array<&#39;TODO&#39; &#124; &#39;IN_PROGRESS&#39; &#124; &#39;DONE&#39; &#124; &#39;CANCELLED&#39;>** | Filter tasks by their current status | (optional) defaults to undefined|
| **priority** | [**&#39;LOW&#39; | &#39;MEDIUM&#39; | &#39;HIGH&#39;**]**Array<&#39;LOW&#39; &#124; &#39;MEDIUM&#39; &#124; &#39;HIGH&#39;>** | Filter tasks by their priority | (optional) defaults to undefined|
| **categoryId** | [**number**] | Filter by category ID | (optional) defaults to undefined|
| **startDate** | [**string**] | Filter by start date. Supports single Unix timestamp or range (min,max) | (optional) defaults to undefined|
| **endDate** | [**string**] | Filter by end date. Supports single Unix timestamp or range (min,max) | (optional) defaults to undefined|
| **sort** | [**string**] | The field to sort the results by | (optional) defaults to 'created_at'|
| **asc** | [**boolean**] | Sort order: true for ascending, false for descending | (optional) defaults to false|


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

