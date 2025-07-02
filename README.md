# HTTP Status Code Test

## Description
A minimal Express.js server that returns cat images for various HTTP status codes using [http.cat](https://http.cat/). It includes a simple header-based authentication layer (`username: admin`, `password: admin`) and multiple endpoints to demonstrate different response codes.

## Setup
```bash
git clone https://github.com/CandasKat/http-status-code-test.git
cd http-status-code-test
npm install
```
This installs express and node-fetch as defined in package.json.

## Run
```
node index.js
```

By default, the server listens on http://localhost:3000.
