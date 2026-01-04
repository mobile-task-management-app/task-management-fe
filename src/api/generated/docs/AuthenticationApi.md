# AuthenticationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerLogIn**](#authcontrollerlogin) | **POST** /api/v1/auth/log-in | User Login|
|[**authControllerSignUp**](#authcontrollersignup) | **POST** /api/v1/auth/sign-up | Register a new user|
|[**authControllerVerifyOtp**](#authcontrollerverifyotp) | **POST** /api/v1/auth/verify-otp | Verify OTP code|

# **authControllerLogIn**
> AuthControllerVerifyOtp200Response authControllerLogIn(logInRequestDTO)

Authenticates user credentials and returns a JWT token if successful.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    LogInRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let logInRequestDTO: LogInRequestDTO; //

const { status, data } = await apiInstance.authControllerLogIn(
    logInRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **logInRequestDTO** | **LogInRequestDTO**|  | |


### Return type

**AuthControllerVerifyOtp200Response**

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

# **authControllerSignUp**
> AppResponseDTO authControllerSignUp(signUpRequestDTO)

Creates a user account and triggers an OTP verification email/SMS.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    SignUpRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let signUpRequestDTO: SignUpRequestDTO; //

const { status, data } = await apiInstance.authControllerSignUp(
    signUpRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signUpRequestDTO** | **SignUpRequestDTO**|  | |


### Return type

**AppResponseDTO**

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

# **authControllerVerifyOtp**
> AuthControllerVerifyOtp200Response authControllerVerifyOtp(verifyOtpRequestDTO)

Validates the 6-digit code sent to the user and returns access tokens.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    VerifyOtpRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let verifyOtpRequestDTO: VerifyOtpRequestDTO; //

const { status, data } = await apiInstance.authControllerVerifyOtp(
    verifyOtpRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **verifyOtpRequestDTO** | **VerifyOtpRequestDTO**|  | |


### Return type

**AuthControllerVerifyOtp200Response**

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

