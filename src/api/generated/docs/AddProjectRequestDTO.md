# AddProjectRequestDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | The name of the project | [default to undefined]
**description** | **string** | A brief description of the project | [optional] [default to undefined]
**start_date** | **number** | Project start date in Unix timestamp (seconds) | [optional] [default to undefined]
**end_date** | **number** | Project end date in Unix timestamp (seconds) | [optional] [default to undefined]

## Example

```typescript
import { AddProjectRequestDTO } from './api';

const instance: AddProjectRequestDTO = {
    name,
    description,
    start_date,
    end_date,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
