<template>
	<!-- 页面 -->
	<view class="container">
		
		<uni-forms class="myForm" ref="myform" :modelValue="user" :rules="rules">
			<uni-forms-item name="email">
				<uni-easyinput class="input" v-model="user.email" placeholder="请输入邮箱" required/>
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput class="input" v-model="user.password" placeholder="请输入密码" required/>
			</uni-forms-item>
			<button type="default" @click="login">用户登录</button>
			<button style="margin-top:16px" @click="toWxLogin" type="primary">微信登录</button>
			
			<view class="logo-extra">
				<button type="default" size="mini">忘记密码</button>
				<button type="default" size="mini" @click="toRegister">用户注册</button>
			</view>
			
		</uni-forms>
	</view>
</template>

<script>
	import { postRequest } from '@/http/index'
	import useUserStore from '@/store/user'
	export default {
		data() {
			return {
				user: {
					email: '',
					password: ''
				},
				// 表单验证
				rules:{
					email:{
						rules:[
							{required:true,errorMessage:"请输入邮箱"},
							{format:'email',errorMessage:"邮箱格式不正确"}
						]
					},
					password:{
						rules:[
							{required:true,errorMessage:"请输入密码"},
							{minLength:8,maxLength:20,errorMessage:"密码的长度在8到20之间"}
						]
					}
				}
			}
		},
		methods:{
			toWxLogin(){
				uni.navigateTo({
					url:'/pages/index/wx_login'
				})
			},
			login(){
				this.$refs.myform.validate().then(res => {
					//登录
					postRequest('api/mobile/elogin',this.user).then(res => {
						const { data,msg } = res
						if(res.code == 1 && res.success){
							//用户状态保存
							const userStore = useUserStore();
							userStore.setToken(data.userinfo.token);
							userStore.fillUser(data.userinfo);
							//数据持久化
							uni.setStorage({
								key: 'isLogin',
								data: 1
							})
							//跳转用户中心
							uni.switchTab({
								url:'/pages/my/my'
							})
						}else{
							uni.showToast({
								title: msg,
								duration: 2000,
								icon: 'none',
							})
						}

					}).catch(err => {

					})
				});
			},
			toRegister(){
				
			}
		}
	}
</script>

<style scoped>
	.container{
		padding: 16px;
	}
	.myForm {
		padding: 40px 10px 0 10px;
		margin: 10px;
		height: calc(80vh - 240px);
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
		border-radius: 0 0 10px 10px;
	}

	.logo-extra {
		display: flex;
		margin-top: 10upx;
	}

	.logo-extra button {
		width: 100%;
	}

	.logo {
		width: 100%;
		height: 240px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	image {
		width: 100px;
		height: 100px;

	}
</style>