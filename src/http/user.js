import axios from './axios'

// 登录
const userLogin = (data) => {
    return axios.request({
        url:'/api/mobile/elogin',
        method:'post',
        data
    })
}

// 注册
const userReg = (data) => {
    return axios.request({
        url:'/api/mobile/eregister',
        method:'post',
        data
    })
}

// 获取用户信息
const getUserInfo = (id) => {
    return axios.request({
        url:`/api/userinfo/one?id=${id}`,
        method:'get',
    })

}

export {
    userLogin,
    userReg,
    getUserInfo
}