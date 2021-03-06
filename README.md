[![Build Status](https://travis-ci.org/ohtuprojekti-ilmo/ohtuilmo-frontend.svg?branch=master)](https://travis-ci.org/ohtuprojekti-ilmo/ohtuilmo-frontend)

## Description

Sign up tool for University of Helsinki's software production course

- [Backlog](https://trello.com/b/Wv50WMSA/backlog)
- [Backend](https://github.com/ohtuprojekti-ilmo/ohtuilmo-backend)

## Instructions
- [How to start frontend, backend and database using docker-compose](https://github.com/ohtuprojekti-ilmo/ohtuilmo-frontend/wiki)

### How to start only frontend
- Clone project
- Create .env file to the project root and add address to backend server (ie. `http://localhost:3001` if you're running backend in port 3001)

```
REACT_APP_BACKEND_URI='backend server address'
```

- Run project

```
$ npm install
$ npm start
```

### Docker instructions

[Docker cheatsheet](https://github.com/jexniemi/Docker-cheat-page/wiki)


