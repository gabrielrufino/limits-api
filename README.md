# Limits API

Implementation of rate limiting in Node.js

## Getting started

### Requirements

* git
* docker
* docker-compose
* NPM
* Node.js

### Repository

```bash
$ git clone https://github.com/gabrielrufino/limits-api.git
$ cd limits-api
$ npm ci
$ cp .env.example .env
```

### Redis

```
$ docker-compose up -d redis
```

### Server

#### Development

```bash
$ npm run start:development
```

#### Production

```bash
$ npm run build
$ npm start
```

## Usage

The default base url of the server is gonna be `http://localhost:3000`, unless you change the `PORT` environment variable in the `.env` file.

### Public route

> **GET** /public

**Response 200:**

```json
{
  "status": "ok"
}
```

**Response 429:**

```json
{
  "error": "Too many requests",
  "unlockAt": "1970-01-01T00:00:00.000Z"
}
```

### Private route

> **GET** /private

You can set the `Authorization` header with any uuid of the `AUTH_TOKENS` environment variable in the `.env` file.

**Requests headers:**

```json
{
  "Authorization": "6d9ca404-b45e-450d-afdb-d79e29eb8818"
}
```

**Response 200:**

```json
{
  "status": "ok"
}
```

**Response 429:**

```json
{
  "error": "Too many requests",
  "unlockAt": "1970-01-01T00:00:00.000Z"
}
```

## License

UNLICENSED
