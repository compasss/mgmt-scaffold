const userRouter = require('./controller/user.js')
const orderRouter = require('./controller/order.js')

module.exports = function(app){

  app.use('/mock-api/user', userRouter);
  app.use('/mock-api/order', orderRouter);
}
