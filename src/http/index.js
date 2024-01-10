import axios from './axios'

const login = (data) => {
    return axios.request({
        url:'/api/mobile/elogin',
        method:'post',
        data
    })
}

export {
    login
}