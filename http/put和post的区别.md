[参考网站](<https://restfulapi.net/rest-put-vs-post/>)

# REST – PUT vs POST

It has been observed that many people struggle to choose between **HTTP PUT vs POST** methods when designing a system. Though, [RFC 2616](https://www.ietf.org/rfc/rfc2616.txt) has been very clear in differentiating between the two – yet complex wordings are a source of confusion for many of us. Let’s try to solve the puzzle **when to use PUT or POST**.

Let’s compare them for better understanding.

| **PUT**                                                      | **POST**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| RFC-2616 clearly mention that `PUT` method requests for the enclosed entity be stored under the supplied [Request-URI](https://restfulapi.net/resource-naming/). If the Request-URI refers to an already existing resource – an update operation will happen, otherwise create operation should happen if Request-URI is a valid resource URI (assuming client is allowed to determine resource identifier).`PUT /questions/{question-id}` | The `POST` method is used to request that the origin server accept the entity enclosed in the request as a new subordinate of the resource identified by the Request-URI in the Request-Line. It essentially means that `POST`request-URI should be of a collection URI.`POST /questions` |
| `PUT` method is [idempotent](https://restfulapi.net/idempotent-rest-apis/). So if you send retry a request multiple times, that should be equivalent to single request modification. | `POST` is NOT idempotent. So if you retry the request N times, you will end up having N resources with N different URIs created on server. |
| Use `PUT` when you want to modify a singular resource which is already a part of resources collection. PUT replaces the resource in its entirety. Use PATCH if request updates part of the resource. | Use `POST` when you want to add a child resource under resources collection. |
| `PUT` is idempotent, so you can cache the response.          | Responses to this method are not [cacheable](https://restfulapi.net/caching/), unless the response includes appropriate Cache-Control or Expires header fields. However, the 303 (See Other) response can be used to direct the user agent to retrieve a cacheable resource. |
| Generally, in practice, always use `PUT` for UPDATE operations. | Always use `POST` for CREATE operations.                     |

## PUT vs POST : An Example

Let’s say we are designing a network application. Let’s list down few URIs and their purpose to get better understanding when to use `POST` and when to use `PUT` operations.

```
GET 	/device-management/devices : Get all devices
POST 	/device-management/devices : Create a new device

GET 	/device-management/devices/{id} : Get the device information identified by "id"
PUT 	/device-management/devices/{id} : Update the device information identified by "id"
DELETE	/device-management/devices/{id} : Delete device by "id"
```

Follow the similar URI design practices for other resources as well.

Reference: [SO Thread](https://stackoverflow.com/questions/630453/put-vs-post-in-rest)