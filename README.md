# Movie Reservation API
Browse movies and reserve seats for specific showtimes

## Table of Contents
* [Features](#features)
* [Setup](#setup)
* [API Documentation](#api-documentation)
* [License](#license)

## Features
* User - register, login, profile update, password reset
* Movies - manage movie listings, showtimes, search/filter
* Reservations - book seats, cancel bookings, check availability
* Payments - process payments, refund, track payment status
* Notifications - email/sms confirmation, reminders

## Setup
1. Get the project locally
```bash
git clone https://github.com/lrbn86/movie-reservation-api.git
cd movie-reservation-api
npm install
```
2. Run the project
```bash
npm start
```
3. Run tests
```bash
npm run test
```
For more commands, check the `package.json` file

## API Documentation
This API uses JWT to authenticate requests. Register an account and login to receive a JWT. Place the JWT in the request's authorization header when making a request.

### Errors
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

### Endpoints
* [Authentication](#authentication)
  * [`POST /api/auth/register`](#post-apiauthregister)
  * [`POST /api/auth/login`](#post-apiauthlogin)
* [Movies](#movies)
  * [`POST /api/movies`](#post-apimovies)
  * [`GET /api/movies`](#get-apimovies)
  * [`PUT /api/movies/:movieId`](#put-apimoviesmovieid)
  * [`DELETE /api/movies/:movieId`](#delete-apimoviesmovieid)
* [Reservations](#reservations)
* [Payments](#payments)
* [Notifications](#notifications)

#### Authentication
##### POST /api/auth/register
Register the user
| Request Body Parameter | Description | Required |
| - | - | - |
| email | The email of the user | Yes |
| password | The password of the user | Yes |

##### POST /api/auth/login
Login the user
| Request Body Parameter | Description | Required |
| - | - | - |
| email | The email of the user | Yes |
| password | The password of the user | Yes |

#### Movies
##### POST /api/movies
Add a movie
##### GET /api/movies
Get all the movies
##### PUT /api/movies/:movieId
Update a movie
##### DELETE /api/movies/:movieId
Delete a movie

#### Reservations
#### Payments
#### Notifications

## License
This project is licensed under the [MIT License](LICENSE)
