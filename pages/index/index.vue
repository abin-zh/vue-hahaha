<template>
	<view class="container">
		<view class="header">
			<view><button @click="toMsg" type="primary">添加大事件</button></view>
		</view>
		<view class="title">你创建的大事件</view>
		<!-- 大事件组件列表 -->
		<bigmsg v-for="item,index in msgs" :user="userName" :content="item.content" :happen="item.happenTime"></bigmsg>
		
	</view>
</template>
<!-- 		<navigator class="navi" url="/pages/index/crop">crop</navigator>
		<navigator class="navi" url="/pages/index/mqtt">mqtt</navigator> -->

<script>
	import bigmsg from '@/components/bigmsg/bigmsg'
	import useUserStore from '@/store/user'
	import { getRequest } from '@/http/index'
	export default {
		data() {
			return {
				msgs:[],
				userName: ''
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init(){
				const userStore = useUserStore()
				const { id,userName } = userStore.userinfo
				this.userName = userName
				this.getBigMsg(id)
			},
			getBigMsg(id){
				//获取大事件
				getRequest(`api/memorabilia/${id}`).then(res => {
					const { data, msg } = res;
					if(res.code == 1 && res.success){
						this.msgs = []
						data.memorabilias.forEach(item => {
							this.msgs.push(item)
						})
							
					}else{	
						uni.showToast({
							title: msg,
							duration: 2000,
							icon: 'none',
						})
					}
					
				})
			},
			toMsg(){
				uni.navigateTo({
					url:'/pages/index/msg'
				})
			}
		}
	}
</script>

<style>
	.container{
		padding: 16px 16px;
	}
	.header{
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}
	.title{
		margin-top: 16px;
		display: flex;
		justify-content: center;
		font-weight: bold;
		font-size: 20px;
	}
</style>