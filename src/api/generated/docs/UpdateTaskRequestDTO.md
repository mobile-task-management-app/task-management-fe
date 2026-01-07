# UpdateTaskRequestDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** |  | [optional] [default to undefined]
**priority** | [**TaskPriority**](TaskPriority.md) |  | [optional] [default to undefined]
**status** | [**TaskStatus**](TaskStatus.md) |  | [optional] [default to undefined]
**category_ids** | **Array&lt;number&gt;** |  | [optional] [default to undefined]
**start_date** | **number** |  | [optional] [default to undefined]
**end_date** | **number** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateTaskRequestDTO } from './api';

const instance: UpdateTaskRequestDTO = {
    title,
    priority,
    status,
    category_ids,
    start_date,
    end_date,
    description,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
