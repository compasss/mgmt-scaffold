import { fetch as fetchPolyfill } from 'whatwg-fetch'
import _ from 'lodash'

let defaultConfig = {
  method: 'GET',
  headers: {
    'Content-Type':'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  credentials: 'same-origin',
}

let condition = 'onLine';

function updateOnlineStatus() {
  condition = navigator.onLine ? 'online' : 'offline';
  if (condition === 'offline') {
    console.log('offline')
    // Toast('网络错误')
  }
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

/**
 * RFC4122 version 4 
 * create uuid
 */
function uuidv4() {
  return 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

if (!sessionStorage.getItem('xSessionId')) {
  sessionStorage.setItem('xSessionId', uuidv4())
}

var httpReg = /^http.*$/
function $fetch (url, config) {
  if (!httpReg.test(url)) {
    url = process.env.VUE_APP_API_URL + url;
  }
  let httpConfig = _.merge(defaultConfig, config)

  // 请求头增加id用户日志捕获
  httpConfig.headers['X-B3-TraceId'] = uuidv4();
  httpConfig.headers['X-Session-Id'] = sessionStorage.getItem('xSessionId')

  return new Promise((resolve, reject) => {
    fetchPolyfill(url, httpConfig).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res
      } else {
        var error = new Error(res.status)
        error.res = res;
        throw error
      }
    }).then((res) => {
      return res.json()
    }).then(res => {
      resolve(res)
    }).catch((error) => {
      error.res.json().then(errorData => {
        reject(errorData)
      }).catch(e => {
        reject(e)
      })
    })
  })
}

$fetch.prototype.addHeader = function(key, value) {
  defaultConfig[key] = value
}

$fetch.prototype.deleteHeader = function(key) {
  if (defaultConfig[key]) {
    defaultConfig[key] = '';
  }
}

export const fetch = $fetch