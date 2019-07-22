# What is this repository for?

Node.js app architecture showcase. You can start your Node.js projects building on this boilerplate, based in API REST.

# Architecture Overview

The app is designed to use a layered architecture. The architecture is heavily influenced by the Clean Architecture. This architecture implemented using Typescript and Webpack

##  The .env file

The .env file must be created in the root of the project, with the following content:
MONGODB = 'mongodb://url:port/databasename' </br>
TOKEN_SECRET = 'MyS3cr3tK3Y'

#### Use the npm scripts:

`yarn install` to install dependencies,</br>
`yarn run build` to build the project (removes the flow annotations) and then,</br>
`yarn start` to start the server.

#### Example:
`http://localhost:3000/admin/provinces`
