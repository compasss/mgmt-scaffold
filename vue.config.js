const mockApi = require('./mock/mock.js');

module.exports = {
  devServer: {
    before: mockApi
  }
}