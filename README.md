# Mr. CRUD 😎

Simple App that uses the GitHub API to CRUD files. Based on Node.js, Express, Vue.js and Vuetify

### Start Server
```
npm start
```

### Start Server (watch files)
```
npm watch
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

## Docker
```
docker build -t mr-crud-app .
docker run -p 8080:8080 -d mr-crud-app
# or
docker-compose up
```

## Demo
- http://mr-crud.herokuapp.com/

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Test Messages

{ "event": "subscribe", "id": 1 }
{ "event": "subscribe", "id": 2 }
{ "event": "unsubscribe", "id": 1 }
{ "event": "unsubscribe", "id": 2 }
