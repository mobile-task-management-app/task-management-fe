# ProjectResponseDTO


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

## Example

```typescript
import { ProjectResponseDTO } from './api';

const instance: ProjectResponseDTO = {
    id,
    name,
    description,
    owner_id,
    status,
    start_date,
    end_date,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
