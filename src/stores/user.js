import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {

    state: () => ({
        user: {
            "state": 1,
            "id": 0,
            "userName": "",
            "userType": "",
            "token": "",
            "binding": 0,
            "createTime": "",
            "updateTime": "",
            "email": ""
        }
    }),
    getters: {
        getUser: (state) => state.user,
        getUserToken: (state) => state.user.token
    },
    actions: {
        setUser(user) {
            this.user = user
        },
    },
    persist: true
})