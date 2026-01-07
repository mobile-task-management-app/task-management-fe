# UserResponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The unique identifier of the user | [default to undefined]
**first_name** | **string** | The first name of the user | [default to undefined]
**last_name** | **string** | The last name of the user | [default to undefined]
**email** | **string** | User email address | [default to undefined]
**phone_number** | **string** | International phone number | [default to undefined]
**last_login_at** | **number** | unix timestamp of the last successful login | [default to undefined]

## Example

```typescript
import { UserResponseDTO } from './api';

const instance: UserResponseDTO = {
    id,
    first_name,
    last_name,
    email,
    phone_number,
    last_login_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
