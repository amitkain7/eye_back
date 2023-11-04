const customError = require('../errors/customerror');

const errorHandler = (err, req, res, next) => {
  
 console.log(err)
  if (err instanceof customError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      msg: `A duplicate value was entered for the following field: ${Object.keys(err.keyValue)
        }. Please choose another value.`,
    });
  }

  if (err.name === 'ValidationError') {
    msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    return res.status(400).json({ msg: msg })

  }
  // Add more custom error handling logic here if needed.

  // Handle other errors with a generic message and status code.
  res.status(500).json({ msg: 'Something went wrong. Please try again later.' });
};

module.exports = errorHandler;
