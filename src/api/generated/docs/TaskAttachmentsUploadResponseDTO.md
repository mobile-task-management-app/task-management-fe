# TaskAttachmentsUploadResponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**owner_id** | **number** |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**project_id** | **number** |  | [default to undefined]
**status** | [**TaskStatus**](TaskStatus.md) |  | [default to undefined]
**priority** | [**TaskPriority**](TaskPriority.md) |  | [default to undefined]
**category_ids** | **Array&lt;number&gt;** |  | [default to undefined]
**attachments** | [**Array&lt;TaskAttachmentResponseDTO&gt;**](TaskAttachmentResponseDTO.md) |  | [default to undefined]
**start_date** | **number** | Project start date as a Unix timestamp (seconds) | [optional] [default to undefined]
**end_date** | **number** | Project end date as a Unix timestamp (seconds) | [optional] [default to undefined]
**description** | **string** |  | [default to undefined]
**created_at** | **number** |  | [default to undefined]
**updated_at** | **number** |  | [default to undefined]

## Example

```typescript
import { TaskAttachmentsUploadResponseDTO } from './api';

const instance: TaskAttachmentsUploadResponseDTO = {
    id,
    owner_id,
    title,
    project_id,
    status,
    priority,
    category_ids,
    attachments,
    start_date,
    end_date,
    description,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
