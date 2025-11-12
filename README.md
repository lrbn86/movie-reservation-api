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
### Endpoints
* [Authentication](#authentication)
  * [`POST /api/auth/register`](#post-apiauthregister)
  * [`POST /api/auth/login`](#post-apiauthlogin)
* [Movies](#movies)
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
#### Reservations
#### Payments
#### Notifications

## License
This project is licensed under the [MIT License](LICENSE)
