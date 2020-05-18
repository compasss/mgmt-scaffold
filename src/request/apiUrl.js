export default {
  // login api
  login: '/auth/login/password',
  signout: '/auth/logout',
  sendSms: '/auth/sms/code/send',
  verifySms: '/auth/sms/code/verify',
  changePassword: '/auth/users/changePassword',
  resetPassword: '/auth/users/resetPassword',
  authUsers: '/auth/users',

  // mock api
  mockUserInfo: 'http://127.0.0.1:8080/mock-api/user/userinfo'
}