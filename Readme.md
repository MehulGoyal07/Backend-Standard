# Backend Notes

## Learning concepts used in designing backend

## Learning standard way of coding

### Project Setup

- package.json using npm init
- node modules using npm i express
- nodemon so that we don't have to restart again and again
- .gitignore and .gitkeep
- src folders containing controllers, db, middlewares, models, routes, utils, app.js, constant.js, index.js can be done using touch and mkdir command to create files and folders respectively
- prettier npm also used to get industry standards, two files .prettierrc and .prettierignore are also added

### MongoDB Connection

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

### Understanding Express

- Will play around request and response
- Have to install npm i cookie-parser (middleware)
- npm i cors (helps in setting cross origin resources)
- middlewares generally used by syntax app.use
- Data may come from urls, jsons, req body
- NOTE:- Not only req and res, we also additionally get (err, req, res, next), next -> flag
- We have to do some settings
- Middlewares used to get hold/check in between the request and response process, eg: checking for loggedIn or not
- A sequence is followed while setting middlewares

### Understanding AsyncHandler(src/utils/asyncHandler.js)

- In summary, express-async-handler simplifies error handling for asynchronous operations in Express. js, making your code cleaner and more readable by eliminating the need for repetitive try/catch blocks in each async route handler.
- Two methods are specified inside "asyncHandler.js" that is using promises and other using try-catch block

### Understanding ApiError.js(src/utils/ApiError.js)

- Handling ApiErrors by extending Error class and overriding some functionalities
- NodeJs provides us with error class
- By creating this file we are playing with the concept of inheritance, so that we can override some functionalities and handle errors in our way
- In summary, this ApiError class allows you to create custom error objects specifically tailored for API-related errors, including status code, error message, additional error details, and stack trace. It provides a structured way to handle and represent errors within an API system.

### Basics of server status code

- Informational responses (100-199)
- Successful responses (200-299)
- Redirection responses (300-399)
- Client Error responses (400-499)
- Server Error responses (500-599)

### Understanding ApiResponse.js(src/utils/ApiError.js)

- As handling errors, we can also handle ApiResponse in a separate file
- Node or Express doesn't provide any extended class for this but we can make our own
- This class is designed to represent responses returned by an API.
- The class is intended to simplify the creation of API responses by encapsulating the status code, data, and message within an ApiResponse object. The success property provides a convenient way to determine the success of the API operation based on the status code.

### Understanding Middlewares

- Middleware in web development refers to a software layer that sits between the client and server and is responsible for handling various tasks related to HTTP requests and responses.

### Creating User Model(user.model.js) -> refer to User_Videos_Overview.png

- The userSchema contains username, email, fullname, avatar, coverImage, watchHistory, password, refreshToken

### Creating Video Model(video.model.js) -> refer to User_Videos_Overview.png

- The videoSchema contains videoFile, thumbnail, title,description, duration, views, isPublished, owner

### Understanding - npm package mongoose-aggregate-paginate-v2 used for UserModel

- WatchHistory makes the user model a little complex
- Writing user model is itself a complex model therefore, we will use a mongoose package npm i mongoose-aggregate-paginate-v2
- It allows us to write aggregation query
- The package will be imported in video.model.js
- Just before exporting the file, we will inject the plugin

### Understanding - npm package bcrypt - used in user.model.js

- It's a simple library which hashes our password
- Used for safety purpose, such that avoiding data breaching
- It will encrypt and decrypt the password on it's own
- We can't directly use the functionality of bcrypt
- We will use hooks to get a hold of it
- Pre Hook - Pre middleware functions are executed one after another, when each middleware calls next
- In brief if user is going to save data then just before that using this pre-hook(we can pass the data and destructure it)

### Understanding - npm package jwt(jsonwebtoken) - used in user.model.js

- Used to generate or get the tokens such that sending username, email in form of encrypted token which is not human readable
- But can understand from payloads
- JWT is a brearer token(like an key whoever holds it will get the data)
- written in .env file
- AccessToken -> Access tokens are short-lived tokens that grant access to protected resources on behalf of an authenticated user.
- RefreshToken -> Refresh tokens are long-lived tokens used to obtain new access tokens after the original access token expires.

### Uploading File in backend - using multer npm package and cloudinary(Use cloudinary documentation for more clearance)

- Will keep it as a utility in utils folder
- We will use multer npm package for uploading files and cloudinary
- npm i cloudinary multer
- Setting Cloudinary -> import and then configure
- We will not upload directly through cloudinary but using multer will keep the file on our server for safety purpose and then upload using cloudinary
- Will use nodeJS file system fs
- Will also create a middleware file(multer functionality)
- Functionalities of multer can be read on the official documentation

### Note:- Above code is just the professional setup and is the minimum thing we can do to handle the things professionally, further we will write our controllers and routes part and use the functionalities written above

### HTTP CRASH COURSE (Hyper Text Transfer Protocol)

- Imgaes regarding this also in img folder
- Difference between http and https is security, in https there is another layer of security where the data is not accessed in between, communication is done in between server and client
- URL (Uniform Resource Locator): A URL is a specific type of Uniform Resource Identifier (URI) that provides the means to access a resource on the internet.
- URI (Uniform Resource Identifier): A URI is a string of characters used to identify a resource, either by location, name, or both.
- URN (Uniform Resource Name): A URN is a type of URI that is used to uniquely identify a resource without specifying its location or how to access it.
- metadata: key-value sent along with request and response
- Request Headers -> from client
- Response Headers -> from server
- Representation Headers -> encoding/compression
- Payload Header -> data

### Complete Guide for Router and Controller