# User Registration API

## Endpoint: `/users/register`

This endpoint allows users to register by providing their personal details, including their full name, email, and password. Upon successful registration, a new user is created, their password is hashed, and an authentication token is generated.


## HTTP Method:
- `POST`

## URL:
- `/users/register`

---

## Request Body:

The following fields are required in the request body for the registration:

- **fullname** (object): Contains the user's first and last name.
  - **firstname** (string, required): The user's first name. Must be at least 3 characters long.
  - **lastname** (string, optional): The user's last name. Must be at least 3 characters long.
  
- **email** (string, required): The user's email address. Must be a valid email format and at least 5 characters long.

- **password** (string, required): The user's password. Must be at least 6 characters long.


## Example request body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

## Endpoint: `/users/login`

This endpoint allows users to log in by providing their email and password. Upon successful login, an authentication token is generated and returned.

---

## HTTP Method:
- `POST`

## URL:
- `/users/login`

---

## Request Body:

The following fields are required in the request body for login:

- **email** (string, required): The user's email address. Must be a valid email format.
- **password** (string, required): The user's password. Must be at least 6 characters long.

## Example request body:

```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

## 4. **GET User Profile API**

## Endpoint: `/users/profile`

This endpoint allows the authenticated user to fetch their profile details. The user must be logged in and provide a valid authentication token for this request to succeed.

---

## HTTP Method:
- `GET`

## URL:
- `/users/profile`

---

## Request Header:
- **Authorization** (string, required): The authentication token (JWT) should be passed in the `Authorization` header as a Bearer token.

### Example request header:

---

## Response:

- **200 OK**: Returns the profile information of the authenticated user.

### Example response body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "hashedpassword"
}
```



## 5. **GET logout API**

## Endpoint: `/users/logout`

Logout the current user and blacklist the token provided in cookie or headers

---

## HTTP Method:
- `GET`

## URL:
- `/users/logout`

---

## Request Header:
- **Authorization** Requires a valid JWT token in the authorization header or cookie:

# Captain Registration API

## Endpoint: `/captains/register`

This endpoint allows captains to register by providing their personal details, including their full name, email, password, and vehicle information. Upon successful registration, a new captain is created, their password is hashed, and an authentication token is generated.

---

## HTTP Method:
- `POST`

## URL:
- `/captains/register`

---

## Request Body:

The following fields are required in the request body for the registration:

- **fullname** (object): Contains the captain's first and last name.
  - **firstName** (string, required): The captain's first name. Must be at least 3 characters long.
  - **lastName** (string, required): The captain's last name. Must be at least 3 characters long.
  
- **email** (string, required): The captain's email address. Must be a valid email format.

- **password** (string, required): The captain's password. Must be at least 6 characters long.

- **vehicle** (object): Contains information about the captain's vehicle.
  - **color** (string, required): The vehicle's color. Must be at least 3 characters long.
  - **plate** (string, required): The vehicle's plate number. Must be at least 3 characters long.
  - **capacity** (integer, required): The vehicle's capacity. Must be at least 1.
  - **vehicleType** (string, required): The type of the vehicle. Must be one of 'car', 'motorcycle', or 'auto'.

## Example request body:

```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```
## 6. **GET Captain Profile API**

### Endpoint: `/captains/profile`

This endpoint allows an authenticated captain to retrieve their profile information. The captain must be logged in and provide a valid authentication token.

---

### HTTP Method:
- `GET`

### URL:
- `/captains/profile`

---

### Request Header:
- **Authorization** (string, required): The authentication token (JWT) should be passed in the `Authorization` header as a Bearer token.

---

### Response:

- **200 OK**: Returns the profile information of the authenticated captain.

#### Example response body:

```json
{
  "captain": {
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## 7.  **Get Fare API**

This endpoint allows users to get the fare estimate for a ride based on the pickup and destination locations.

---

### HTTP Method:
- `GET`

### URL:
- `/rides/get-fare`

---

### Request Parameters:

The following query parameters are required for the request:

- **pickup** (string, required): The pickup location. Must be at least 3 characters long.
- **destination** (string, required): The destination location. Must be at least 3 characters long.

### Example request URL:

---

### Response:

- **200 OK**: Returns the fare estimate for the ride.

#### Example response body:

```json
{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
```

- **400 Bad Request**: If the request parameters are invalid.

#### Example response body:

```json
{
  "errors": [
    {
      "msg": "Invalid Pickup Location",
      "param": "pickup",
      "location": "query"
    },
    {
      "msg": "Invalid Destination Location",
      "param": "destination",
      "location": "query"
    }
  ]
}

- **500 Internal Server Error**: If there is an error processing the request.

#### Example response body:

```json
{
  "message": "Error message"
}
