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

## License

UNLICENSED
