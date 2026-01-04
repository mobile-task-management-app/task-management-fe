# ProjectsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**projectControllerAddProject**](#projectcontrolleraddproject) | **POST** /api/v1/projects | Create a new project|
|[**projectControllerDeleteProject**](#projectcontrollerdeleteproject) | **DELETE** /api/v1/projects/{id} | Delete a project|
|[**projectControllerGetProjectById**](#projectcontrollergetprojectbyid) | **GET** /api/v1/projects/{id} | Get project details by ID|
|[**projectControllerSearchProject**](#projectcontrollersearchproject) | **GET** /api/v1/projects | Search and filter projects|
|[**projectControllerUpdateProject**](#projectcontrollerupdateproject) | **PATCH** /api/v1/projects/{id} | Update an existing project|

# **projectControllerAddProject**
> ProjectControllerAddProject200Response projectControllerAddProject(addProjectRequestDTO)


### Example

```typescript
import {
    ProjectsApi,
    Configuration,
    AddProjectRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let addProjectRequestDTO: AddProjectRequestDTO; //

const { status, data } = await apiInstance.projectControllerAddProject(
    addProjectRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addProjectRequestDTO** | **AddProjectRequestDTO**|  | |


### Return type

**ProjectControllerAddProject200Response**

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

# **projectControllerDeleteProject**
> AppResponseDTO projectControllerDeleteProject()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.projectControllerDeleteProject(
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

# **projectControllerGetProjectById**
> ProjectControllerAddProject200Response projectControllerGetProjectById()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.projectControllerGetProjectById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ProjectControllerAddProject200Response**

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

# **projectControllerSearchProject**
> ProjectControllerSearchProject200Response projectControllerSearchProject()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let status: 'NOT_YET' | 'IN_PROGRESS' | 'DONE'; //Filter projects by their current status (optional) (default to undefined)
let startDate: string; //Filter by start date. Supports single Unix timestamp or range (min,max) (optional) (default to undefined)
let endDate: string; //Filter by end date. Supports single Unix timestamp or range (min,max) (optional) (default to undefined)
let sort: string; //The field to sort the results by (optional) (default to 'created_at')
let asc: boolean; //Sort order: true for ascending, false for descending (optional) (default to false)

const { status, data } = await apiInstance.projectControllerSearchProject(
    status,
    startDate,
    endDate,
    sort,
    asc
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **status** | [**&#39;NOT_YET&#39; | &#39;IN_PROGRESS&#39; | &#39;DONE&#39;**]**Array<&#39;NOT_YET&#39; &#124; &#39;IN_PROGRESS&#39; &#124; &#39;DONE&#39;>** | Filter projects by their current status | (optional) defaults to undefined|
| **startDate** | [**string**] | Filter by start date. Supports single Unix timestamp or range (min,max) | (optional) defaults to undefined|
| **endDate** | [**string**] | Filter by end date. Supports single Unix timestamp or range (min,max) | (optional) defaults to undefined|
| **sort** | [**string**] | The field to sort the results by | (optional) defaults to 'created_at'|
| **asc** | [**boolean**] | Sort order: true for ascending, false for descending | (optional) defaults to false|


### Return type

**ProjectControllerSearchProject200Response**

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

# **projectControllerUpdateProject**
> ProjectControllerAddProject200Response projectControllerUpdateProject(updateProjectRequestDTO)


### Example

```typescript
import {
    ProjectsApi,
    Configuration,
    UpdateProjectRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let id: number; // (default to undefined)
let updateProjectRequestDTO: UpdateProjectRequestDTO; //

const { status, data } = await apiInstance.projectControllerUpdateProject(
    id,
    updateProjectRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateProjectRequestDTO** | **UpdateProjectRequestDTO**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ProjectControllerAddProject200Response**

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

