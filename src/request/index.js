import axios from 'axios'
import config from './config.js' // 导入默认配置
import router from '@/router'
import apiUrls from '@/request/apiUrl.js'
import { Loading } from 'element-ui';

// import { Toast } from "mint-ui";
// import utils from "../../utils/utils.js";

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

const instance = axios.create(config)

// axios instance request 拦截器
instance.interceptors.request.use(
  config => {
    config.headers['X-B3-TraceId'] = uuidv4();
    config.headers['X-Session-Id'] = sessionStorage.getItem('xSessionId');
    return config
  },
  error => {
    //  1.判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
      // return service.request(originalRequest);//例如再重复请求一次
    }
    //  2.需要重定向到错误页面
    const errorInfo = error.response
    // console.log(errorInfo)
    if (errorInfo) {
      // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
      const errorStatus = errorInfo.status; // 404 403 500 ... 等
      router.push({
        path: `/error/${errorStatus}`
      })
    }
    return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
  }
)

// axios instance response 拦截器
instance.interceptors.response.use(
  response => {
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if (response.data == undefined) {
      response.data = response.request.responseText
    }
    // try {
    //   window.userLogline.info('response success', {
    //     uuid: response.config.headers['X-B3-TraceId'],
    //     sessionId: response.config.headers['X-Session-Id'],
    //     status: response.status,
    //     data: response.data
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
    // 若不是正确的返回code，且已经登录，就抛出错误
    // const err = new Error(data.description)

    // err.data = data
    // err.response = response

    // throw err
    return response
  },
  err => {
    return Promise.reject(err) // 返回接口返回的错误信息
  }
)

/**
 * 
 * @param {api url} url 
 * @param {axios config object} options 
 * @param {return xhr data only} onlyData 
 * @param {show loading icon} loading 
 */
export default function $axios(options, onlyData = true, loading = true) {
  options.url = apiUrls[options.api]
  return new Promise((resolve, reject) => {
    instance(options)
      .then((res) => {
        if (loading){
          // window.mlWebApp.api.loading.hide()
        }
        if (onlyData) {
          resolve(res.data)
        } else {
          resolve(res)
        }
      })
      .catch((error) => {
        if (loading) {
          // window.mlWebApp.api.loading.hide();
        }
        // try {
        //   // 有些手机没有实例化，有点坑
        //   window.userLogline.error('response error', {
        //     uuid: error.config.headers['X-B3-TraceId'],
        //     sessionId: error.config.headers['X-Session-Id'],
        //     response: error.response ? error.response.data : 'no response'
        //   })
        // } catch (error) {
        //   console.log(error)
        // }
        
        // utils.methods.trackerMessage(`http error:${error.config.url}`, {
        //   level: 'error',
        //   uuid: error.config.headers['X-B3-TraceId'],
        //   sessionId: error.config.headers['X-Session-Id']
        // });
        if (error.response.status === 401) {
          router.push({ path: '/login', query: { redirectUrl: router.currentRoute.fullPath } })
        } else {
          reject(error)
        }
      })
  })
}

$axios.config = config;
