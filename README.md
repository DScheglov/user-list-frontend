# user-list-frontend
User List Angular Front-End

## Deployment
```shell
git clone https://github.com/DScheglov/user-list-frontend.git
cd user-list-frontend && npm install
npm start
```

## Configure API connection:
In order to configure Front-End to interact with Back-End correctly
you should specify the `host`, `port` and `path` of the api in the
file `api.config.js` in the project root directory:
```javascript
// api.config.js
(function (global) {
  'use strict';
  global.userRestApiConfig = {
    "host": "http://localhost",
    "path": "/api/users",
    "port": "8888"
  };
})(this);
```

## Back-End Deployment:
See [Back-End repository](https://github.com/DScheglov/user-list-backend.git)


## Demo
Front-End: [https://dscheglov.github.io/user-list-frontend/](https://dscheglov.github.io/user-list-frontend/)
Linked to Back-End: [http://176.107.177.23:8800/api/users/](http://176.107.177.23:8800/api/users/)
