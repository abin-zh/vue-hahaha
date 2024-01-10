import axios from 'axios';
import { useUserStore } from '@/stores/user';

const instance = axios.create({
    //请求地址(根)
    baseURL:'https://api.jqrjq.cn/',
    timeout: 6000
});

//拦截器

instance.interceptors.request.use((config) => {
    //在请求头中添加token
    const userStore = useUserStore();
    const token = userStore.getUserToken;

    if(token != ''){
        config.headers.token = token;
    }
    
    return config;
},(err) => {
    return Promise.reject(err);
});

instance.interceptors.response.use((res) => {
    //直接获取响应数据
    return res.data;
},(err) => {
    return Promise.reject(err.response.data);
})

export default instance;

//test-git