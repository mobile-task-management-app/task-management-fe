# CreateProjectTaskRequestDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** |  | [default to undefined]
**priority** | [**TaskPriority**](TaskPriority.md) |  | [default to undefined]
**category_ids** | **Array&lt;number&gt;** |  | [default to undefined]
**attachments** | [**Array&lt;CreateTaskAttachmentRequestDTO&gt;**](CreateTaskAttachmentRequestDTO.md) |  | [default to undefined]
**start_date** | **number** |  | [optional] [default to undefined]
**end_date** | **number** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateProjectTaskRequestDTO } from './api';

const instance: CreateProjectTaskRequestDTO = {
    title,
    priority,
    category_ids,
    attachments,
    start_date,
    end_date,
    description,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
