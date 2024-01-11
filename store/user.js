import {
	ref
} from 'vue'
import {
	defineStore
} from 'pinia'
const useUserStore=defineStore('user',{
	state:()=>({
		token:'',
		openid:'',
		userinfo:{
			id:0,
			state:0,
			userName:'',
			userType:'',
			token:'',
			binding:0,
			email:'',
			mobile:'',
		},
		wxinfo:{
			avatarUrl: "",
			city: "",
			country: "",
			gender: 0,
			language: "",
			nickName: "",
			province: ""
		}
	}),
	actions:{
		setToken(token){
			this.token=token;
		},
		setOpenId(openid){
			this.openid = openid;
		},
		fillUser(userinfo){
			this.userinfo=userinfo;
		},
		fillUserWx(wxinfo){
			this.wxinfo = wxinfo;
		}
	},

	persist:{
		 enabled: true,
		 H5Storage: window?.localStorage,
	}

})

// const useUserStore = defineStore('user', () => {
// 	let token = ref('');
// 	let userinfo=ref({
// 		id:0,
// 		state:0,
// 		userName:'',
// 		userType:'',
// 		token:'',
// 		binding:0,
// 		email:'',
// 		mobile:''	
// 	})

// 	function setToken(token) {
// 		this.token = token
// 	}
// 	function fillUser(userinfo){
// 		this.userinfo=userinfo
// 	}
// 	return {
// 		token,
// 		setToken,
// 		userinfo,
// 		fillUser
// 	}
// },{
// 	enable:true,
// 	H5Storage: window?.localStorage,
// })
export default useUserStore;