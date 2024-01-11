<template>
	<view class="container">
		
		<uni-forms class="myForm" ref="myform" :modelValue="msg" :rules="rules">
			
			<uni-forms-item name="content">
				<uni-easyinput class="input" v-model="msg.content" placeholder="请输入大事件内容" required/>
			</uni-forms-item>
			<button type="primary" @click="createMsg">添加</button>
			
		</uni-forms>
	</view>
</template>

<script>
	import useUserStore from '@/store/user'
	import { postRequest } from '@/http/index'
	export default {
		data() {
			return {
				msg:{
					content:'',
				},
				rules:{
					content:{
						rules:[
							{required:true,errorMessage:"请输入大事件"}
						]
					}
				}
			}
		},
		methods: {
			createMsg(){
				this.$refs.myform.validate().then(res => {
					const userStore = useUserStore();
					const { id } = userStore.userinfo;
					const happenTime = Date.now();
					const data = {
						content: this.msg.content,
						happenTime: happenTime,
						userId: id
					}
					postRequest('api/memorabilia/add',data).then(res => {
						const { code, msg, success } = res;
						if(code == 1 && success){
							uni.switchTab({
								url:'/pages/index/index'
							})
							uni.showToast({
								title: msg,
								duration: 2000,
								icon: 'none',
							})
						}else{
							uni.showToast({
								title: msg,
								duration: 2000,
								icon: 'none',
							})
						}
					})
				})
			}
		}
	}
</script>

<style>
	.container{
		padding: 16px;
	}
</style>
