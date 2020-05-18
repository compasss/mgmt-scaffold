const userRouter = require('./controller/user.js')

module.exports = function(app){

  app.use('/mock-api/user', userRouter);
}
