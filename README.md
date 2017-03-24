# user-list-frontend
User List Angular Front-End

## Deployment
```shell
git clone https://github.com/DScheglov/user-list-frontend.git
cd user-list-frontend && npm install
npm start
```

Output:
```shell
[04:09:40] Using gulpfile ~/..../user-list-frontend/docs/gulpfile.js
[04:09:40] Starting 'watch'...
[04:09:40] Finished 'watch' after 15 ms
[04:09:40] Starting 'serve'...
[04:09:40] Webserver started at http://0.0.0.0:8080
[04:09:40] Finished 'serve' after 34 ms
```

In order to configure Port for Front-End please update `gulpfile.js`


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
 - Front-End: [https://dscheglov.github.io/user-list-frontend/](https://dscheglov.github.io/user-list-frontend/)
 - Linked to Back-End: [http://176.107.177.23:8800/api/users/](http://176.107.177.23:8800/api/users/)
