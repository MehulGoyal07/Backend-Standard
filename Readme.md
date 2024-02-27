# Backend Notes

# Learning concepts used in designing backend
# Learning standard way of coding

# Project Setup
- package.json using npm init
- node modules using npm i express
- nodemon so that we don't have to restart again and again
- .gitignore and .gitkeep
- src folders containing controllers, db,     middlewares, models, routes, utils, app.js, constant.js, index.js can be done using touch and mkdir command to create files and folders respectively
- prettier npm also used to get industry standards, two files .prettierrc and .prettierignore are also added

# MongoDB Connection
- Go on mogodb atlas, create account and setup the initial requirements such that create cluster, set username, password and IP address
- Copy the connection string and paste in .env and replace password there and remove last backslash
- Give a name to the database in constants.js
- Now main part is writing DB connection logic, it can be done in two ways, such that writing it separately and using, second is writing directly in index.js
- Writing separately is generally done
- installing packages dotenv, mongoose, express
- Important thing to remember is use try catch and async await as error may occur and it takes time to fetch data
- Professional approach is using IIFE

