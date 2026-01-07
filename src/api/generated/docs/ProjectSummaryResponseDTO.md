# ProjectSummaryResponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The unique identifier of the project | [default to undefined]
**name** | **string** | Name of the project | [default to undefined]
**description** | **string** | A brief description of the project | [optional] [default to undefined]
**owner_id** | **number** | The ID of the user who owns the project | [default to undefined]
**status** | [**ProjectStatus**](ProjectStatus.md) | Current status of the project | [default to undefined]
**start_date** | **number** | Project start date as a Unix timestamp (seconds) | [optional] [default to undefined]
**end_date** | **number** | Project end date as a Unix timestamp (seconds) | [optional] [default to undefined]
**created_at** | **number** | Creation timestamp | [default to undefined]
**updated_at** | **number** | Last update timestamp | [default to undefined]
**number_of_todo_tasks** | **number** |  | [default to undefined]
**num_of_in_progress_tasks** | **number** |  | [default to undefined]
**number_of_done_tasks** | **number** |  | [default to undefined]
**number_of_cancelled_tasks** | **number** |  | [default to undefined]
**total_tasks** | **number** |  | [default to undefined]

## Example

```typescript
import { ProjectSummaryResponseDTO } from './api';

const instance: ProjectSummaryResponseDTO = {
    id,
    name,
    description,
    owner_id,
    status,
    start_date,
    end_date,
    created_at,
    updated_at,
    number_of_todo_tasks,
    num_of_in_progress_tasks,
    number_of_done_tasks,
    number_of_cancelled_tasks,
    total_tasks,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
