# API Documentation
This API uses JWT to authenticate requests. Register an account and login to receive a JWT. Place the JWT in the request's authorization header when making a request.

## Errors
This API follows conventional HTTP response codes to indicate success or failure of a request

| Code | Description |
| - | - |
| 200 | Everything worked as expected |
| 400 | The client is sending a bad request to the API |
| 401 | The client is not authenticated |
| 403 | The client is authenticated, but does not have the permissions to make the request |
| 404 | The resource does not exist |
| 409 | The request conflicts with another request |
| 429 | Too many requests hit the API too quickly |
| 500 | The server has internal errors that must be resolved by the API developer |

## Endpoints
* [Authentication](#authentication)
  * [`POST /api/auth/register`](#post-apiauthregister)
  * [`POST /api/auth/login`](#post-apiauthlogin)
* [Movies](#movies)
  * [`POST /api/movies`](#post-apimovies)
  * [`GET /api/movies`](#get-apimovies)
  * [`PUT /api/movies/:movieId`](#put-apimoviesmovieid)
  * [`DELETE /api/movies/:movieId`](#delete-apimoviesmovieid)
* [Reservations](#reservations)
  * [`POST /api/reservations`](#post-apireservations)
  * [`GET /api/reservations`](#get-apireservations)
  * [`PUT /api/reservations/:reservationId`](#put-apireservationsreservationid)
  * [`DELETE /api/reservations/:reservationsId`](#put-apireservationsreservationid)
* [Payments](#payments)
* [Notifications](#notifications)

## Authentication
### POST /api/auth/register
Register the user
| Request Body Parameter | Description | Required |
| - | - | - |
| email | The email of the user | Yes |
| password | The password of the user | Yes |

### POST /api/auth/login
Login the user and receive a JWT to authenticate future requests
| Request Body Parameter | Description | Required |
| - | - | - |
| email | The email of the user | Yes |
| password | The password of the user | Yes |

## Movies
### POST /api/movies
Add a movie
| Request Body Parameter | Description | Required |
| - | - | - |
| title | The title of the movie | Yes |
| description | The description of the movie | Yes |

### GET /api/movies
Get all the movies

### PUT /api/movies/:movieId
Update a movie by a movieId
| Request Body Parameter | Description | Required |
| - | - | - |
| title | The new title of the movie | No |
| description | The new description of the movie | No |

### DELETE /api/movies/:movieId
Delete a movie by a movieId

## Reservations
### POST /api/reservations
Add a reservation
| Request Body Parameter | Description | Required |
| - | - | - |
| title | The new title of the movie | Yes |
| seats | The number of seats booked | Yes |
| time | The time of the reservation | Yes |

### GET /api/reservations
Get all the reservations

### PUT /api/reservations/:reservationId
Update a reservation by reservationId
| Request Body Parameter | Description | Required |
| - | - | - |
| title | The new title of the movie | No |
| seats | The number of seats booked | No |
| time | The time of the reservation | No |

### DELETE /api/reservation/:reservationId
Delete a reservation by reservationId

## Payments
TBA

## Notifications
TBA
