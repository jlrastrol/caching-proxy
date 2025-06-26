# Caching Proxy

A lightweight caching proxy server designed to improve response times and reduce backend load by caching HTTP responses.

## Prerequisites

- Node.js >= 20.x
- npm (Node Package Manager)
- Redis server

## Installation

```bash
git clone https://github.com/jlrastrol/caching-proxy.git
cd caching-proxy
npm install
```

## Configuration

Create a `.env` file at the root of the project with the following variables:

```env
REDIS_USERNAME=username
REDIS_PASSWORD=password
REDIS_HOST=host
REDIS_PORT=port
```

## Running

1. Compile TypeScript:
```bash
npm run build
```

2. Start the Application:
```bash
npm run caching-proxy -- start --port 3000 --origin https://api.pokemontcg.io/v2
```

3. Clear cache the Application:
```bash
npm run caching-proxy -- clear
```
