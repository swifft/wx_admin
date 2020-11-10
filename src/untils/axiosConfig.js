import axios from 'axios'
import { Message } from 'element-ui';

//请求超时
axios.create({
    timeout: 2000
})

// 请求前拦截
axios.interceptors.request.use(config => {
    if (localStorage.getItem('userToken')) {
        config.headers.Authorization = localStorage.getItem('userToken')
    }
    return config;
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(res => {
    return res;
}, error => {
    if (error.message === 'Network Error') {
        Message({ message: '网络连接异常！', type: 'warning' })
    }
    if (error.code === 'ECONNABORTED') {
        Message({ message: '请求超时，请重试', type: 'warning' })
    }
    if (error.response.status === 401) {
        Message.error('身份信息已失效,请重新登陆');
        localStorage.removeItem('userToken');
        setTimeout(() => {
            window.location.href = '/login'
        }, 500)
    }
})

export default axios