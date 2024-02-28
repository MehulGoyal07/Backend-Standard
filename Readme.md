# Backend Notes

# Learning concepts used in designing backend

# Learning standard way of coding

# Project Setup

- package.json using npm init
- node modules using npm i express
- nodemon so that we don't have to restart again and again
- .gitignore and .gitkeep
- src folders containing controllers, db, middlewares, models, routes, utils, app.js, constant.js, index.js can be done using touch and mkdir command to create files and folders respectively
- prettier npm also used to get industry standards, two files .prettierrc and .prettierignore are also added

# MongoDB Connection

- Go on mogodb atlas, create account and setup the initial requirements such that create cluster, set username, password and IP address
- Copy the connection string and paste in .env and replace password there and remove last backslash
- Give a name to the database in constants.js
- Now main part is writing DB connection logic, it can be done in two ways, such that writing it separately and using, second is writing directly in index.js
- Writing separately is generally done
- installing packages dotenv, mongoose, express
- Important thing to remember is use try catch and async await as error may occur and it takes time to fetch data
- Professional approach is using IIFE if we are creating logic in same file
- If logic is separated then we have to export the function
- When connection is done, then a promise is returned as the function is asynchronous
- Therefore, we have to take hold of the promise using then() and catch()
- Then we have to use app to listen in then() block such that start our server on localhost 8000

# Understanding Express

- Will play around request and response
- Have to install npm i cookie-parser (middleware)
- npm i cors (helps in setting cross origin resources)
- middlewares generally used by syntax app.use
- Data may come from urls, jsons, req body
- NOTE:- Not only req and res, we also additionally get (err, req, res, next), next -> flag
- We have to do some settings
- Middlewares used to get hold/check in between the request and response process, eg: checking for loggedIn or not
- A sequence is followed while setting middlewares

# Understanding AsyncHandler(src/utils/asyncHandler.js)

- In summary, express-async-handler simplifies error handling for asynchronous operations in Express. js, making your code cleaner and more readable by eliminating the need for repetitive try/catch blocks in each async route handler.
- Two methods are specified inside "asyncHandler.js" that is using promises and other using try-catch block

# Understanding ApiError.js(src/utils/ApiError.js)

- Handling ApiErrors by extending Error class and overriding some functionalities
- NodeJs provides us with error class
- By creating this file we are playing with the concept of inheritance, so that we can override some functionalities and handle errors in our way
- In summary, this ApiError class allows you to create custom error objects specifically tailored for API-related errors, including status code, error message, additional error details, and stack trace. It provides a structured way to handle and represent errors within an API system.

# Basics of server status code

- Informational responses (100-199)
- Successful responses (200-299)
- Redirection responses (300-399)
- Client Error responses (400-499)
- Server Error responses (500-599)

# Understanding ApiResponse.js(src/utils/ApiError.js)

- As handling errors, we can also handle ApiResponse in a separate file
- Node or Express doesn't provide any extended class for this but we can make our own
