# Strike

## Description

A api for handle video rooms using express, typescript and typeorm. 📹 🔥

## Installation

```bash
$ yarn
```

## Database
Create a PostgreSQL instance (check ormconfig.json) and execute following command:

```bash
$ yarn typeorm migration:run
```

## Running the app

```bash
$ yarn dev:server
```

## Test

```bash
# unit tests
$ yarn test
```

# Documentation

For endpoints that need authentication we need to send the JWT token in the authorization header.

#### Headers example:

```
{
  "Authorization": "Bearer <your-token-jwt>",
}
```

## Authentication

### Signup:

`POST /users`: create a new user.

#### Body example:

```
{
  "username": "gcmatheusj",
  "mobileToken": "34be019ef5eb",
  "password": "12345678",
}
```

### Signin:

`POST /sessions`: signin with valid credentials.

#### Body example:

```
{
  "username": "gcmatheusj",
  "password": "12345678",
}
```

## Users:

### Get user:

`GET /users/:username` (no auth required): returns a user.


### Get all user:

`GET /users` (no auth required): returns all user.


### Update user

`PUT /users` (auth required): update current user.

#### Body example:

```
{
  "mobileToken": "34be019ef5eb",
  "oldPassword": "123456",
  "password": "123123"
}
```

### Delete user

`DELETE /users` (auth required): delete current user.

### Get rooms that user is in

`GET /users/:username/rooms` (auth required): returns a list of rooms that the user is in.


## Rooms:

### Create room:

`POST /rooms` (auth required): create a new room.

```
{
  "name": "Learning Room",
  "capacityLimit": 10
}
```

### Get room:

`GET /rooms/:id` (no auth required): gets information about a room.


### Change host

`PUT /rooms` (auth required): changes the host of the user from the current user to another user.

#### Body example:

```
{
  "hostUser": "6d7ed849-53e7-4e24-a0de-90e5e1948f06"
}
```

### Join room:

`POST /rooms/:id/join` (auth required): joins the room as the current user.


### Leave room:

`POST /rooms/:id/leave` (auth required): leaves the room as the current user.

