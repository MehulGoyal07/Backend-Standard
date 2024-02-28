// approach using then() and catch()
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// approach using try-catch
// understanding higher order function
// a function is passed to another func (func) => () => {}
// Breakdown of main code
// #1 const asyncHandler = () => {}
// #2 const asyncHandler = {func} => () => {}
// #3 const asyncHandler = {func} => async() => {}

// Wrapper function which will reduce the complexity of code
// const asyncHandler = (func) => async (req, res, next) => {
//   try {
//     await func(req, res, next)
//   } catch (error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
