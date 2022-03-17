# store-dznx-api

maybe later i will update this repo,
these API just for my study case

services api

```http
 https://store-dznx.herokuapp.com/
```

## Installation

Install my-project with npm

```bash
  npm install
  cd dir
  npm run prod
```

## API Reference

#### Get all items

```http
  GET https://store-dznx.herokuapp.com/api/v1/players/landingpage
```

#### Get item detail

```http
 GET https://store-dznx.herokuapp.com/api/v1/players/${id}/detail
```

#### Sign up

```http
 POST https://store-dznx.herokuapp.com/api/v1/auth/signup
```

#### Sign in

```http
 POST https://store-dznx.herokuapp.com/api/v1/auth/signin (take token)
```

required authorization token-------------------------

#### Get dashboard

```http
 GET https://store-dznx.herokuapp.com/api/v1/players/dashboard
```

#### Get dashboard

```http
 GET https://store-dznx.herokuapp.com/api/v1/players/history/${id}/detail
```

| Parameter | Type     | Description                                           |
| :-------- | :------- | :---------------------------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch                     |
| `token`   | `string` | **Required**. authorization for private data to fetch |

## Features

- express mongodb
- admin page
- jwt token

## Authors

- [@dennyzain](https://www.github.com/dennyzain)
