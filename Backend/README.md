# User Registration API

## Endpoint: `/users/register`

This endpoint allows users to register by providing their personal details, including their full name, email, and password. Upon successful registration, a new user is created, their password is hashed, and an authentication token is generated.

---

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

Example request body:

````json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123"
}

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

Example request body:

```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
````
