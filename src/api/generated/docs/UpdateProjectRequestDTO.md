# UpdateProjectRequestDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | The name of the project | [optional] [default to undefined]
**description** | **string** | A brief description of the project | [optional] [default to undefined]
**start_date** | **number** | Project start date in Unix timestamp (seconds) | [optional] [default to undefined]
**end_date** | **number** | Project end date in Unix timestamp (seconds) | [optional] [default to undefined]
**status** | **string** | Update the current status of the project | [optional] [default to undefined]

## Example

```typescript
import { UpdateProjectRequestDTO } from './api';

const instance: UpdateProjectRequestDTO = {
    name,
    description,
    start_date,
    end_date,
    status,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
