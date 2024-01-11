<template>
	<view class="big-msg">
		<view class="msg-user">用户：{{user}}</view>
		<view class="msg-content">{{content}}</view>
		<view class="msg-time">发生时间: {{happenTime}}</view>
	</view>
</template>

<script>
	export default {
		name:"bigmsg",
		props:{
			user: '',
			content:'',
			happen:''
		},
		computed:{
			happenTime(){
		
				const time = this.happen;
				const date = new Date(time);
				
				const options = { 
					timeZone: "Asia/Shanghai" ,
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
				};
				
				//格式化对象
				const formatter = new Intl.DateTimeFormat("zh-CN", options);
				//格式化时间
				const formattedDate = formatter.format(date);
				
				return formattedDate

			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.big-msg{
		height: 100px;
		background-color: white;
		padding: 8px 16px;
		margin-top: 16px;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.msg-user{
		height: 30px;
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #e3e3e3;
		font-weight: bold;
	}
</style>