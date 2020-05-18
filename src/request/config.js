export default {
  baseURL: process.env.VUE_APP_API_URL,
  method: 'GET',
  headers: {
    'Content-Type':'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'x-auth-token': '554f9011-add6-4c48-bfde-53772cd45f19'
  },
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json',
  // validateStatus: function (status) {
  //   return status >= 200 && status < 300
  // },
}
