<template>
	<view class="container">
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<view class="title">地址</view>
				<input class="uni-input" placeholder="输入地址" :value="connection.host" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">端口</view>
				<input class="uni-input" placeholder="输入端口" :value="connection.port" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">路径</view>
				<input class="uni-input" placeholder="输入路径" :value="connection.endpoint" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">客户端ID</view>
				<input class="uni-input" placeholder="输入客户端ID(可选)" :value="connection.clientId" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">用户名</view>
				<input class="uni-input" placeholder="输入用户名(可选)" :value="connection.username" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码</view>
				<input class="uni-input" placeholder="输入密码(可选)" :value="connection.password" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">存活时间</view>
				<input class="uni-input" placeholder="输入存活时间(默认60)" :value="connection.keep_alive" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">订阅主题</view>
				<input class="uni-input" placeholder="输入需要订阅的主题" :value="subscription.topic" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">发布主题</view>
				<input class="uni-input" placeholder="输入需要发布到的主题" :value="publish.topic" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">发布内容</view>
				<input class="uni-input" placeholder="输入需要发布的内容(常为json)" :value="publish.payload" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title"></view>
				<checkbox-group class="cbox" @change="changeUrl">
					<view>
						<label class="cbox-label">
							<checkbox value="CleanSession" checked="true" />清除会话
						</label>
						<label class="cbox-label">
							<!-- #ifndef MP-WEIXIN -->
							<checkbox value="SSL" />SSL
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN -->
							<checkbox checked="true" disabled />SSL
							<!-- #endif -->
						</label>
					</view>
					<view>
						<label>
							<text class="uri-text">{{uri}}</text>
						</label>
					</view>
				</checkbox-group>
			</view>
			<view class="btn-group">
				<!-- 连接 -->
				<button v-if="!connected" @click="createConnection" class="btn-conn" type="default">连接</button>
				<button v-else class="btn-conn" type="default" disabled>连接</button>
				<button @click="destroyConnection" type="warn">断开连接</button>
				<view class="state-text">
					<text>当前状态:</text>
					<text v-if="!connected" style="color: rgb(255, 109, 109);">未连接</text>
					<text v-else style="color: rgb(66, 216, 133);">已连接</text>
				</view>
			</view>
			<view class="btn-group">
				<!-- 获取主题信息 -->
				<button @click="doSubscribe" type="primary">订阅主题</button>
				<button @click="doUnSubscribe" type="warn">取消订阅</button>
				<button disabled></button>
			</view>
			<view class="msg_list">
				<text>消息列表</text>
				<p v-for="(item,index) in msgs">{{item.name}}：{{item.msg}}
					<hr>
				</p>
			</view>
		</view>
	</view>
</template>

<script>
	import mqtt from 'mqtt/dist/mqtt';
	export default {
		computed: {
			uri() {
				const {
					protocol,
					host,
					port,
					endpoint
				} = this.connection;
				return `${protocol}://${host}:${port}${endpoint}`;
			},
		},
		data() {
			return {
				//连接参数
				connection: {
					// #ifdef MP-WEIXIN
					protocol: "wxs",
					port: 8084,
					// #endif
					// #ifndef MP-WEIXIN
					protocol: "ws",
					port: 8083,
					// #endif
					// ws: 8083; wss: 8084
					host: "jqrjq.cn",
					endpoint: "/mqtt",
					// for more options, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
					clean: true,
					connectTimeout: 30 * 1000, // ms
					reconnectPeriod: 4000, // ms
					clientId: "emqx_vue_" + Math.random().toString(16).substring(2, 8),
					// auth
					username: "emqx_test",
					password: "emqx_test",
					keep_alive: 60,
				},
				//订阅
				subscription: {
					topic: "topic/mqttx",
					qos: 0,
				},
				//发布
				publish: {
					topic: "topic/browser",
					qos: 0,
					payload: '{ "msg": "Hello, I am browser." }',
				},
				receiveNews: "",
				qosList: [0, 1, 2],
				client: {
					connected: false,
				},
				subscribeSuccess: false,
				connecting: false,
				retryTimes: 0,
				ssl: false,
				connected: false,
				//消息列表
				msgs:[]
			}
		},
		methods: {
			//方法、参数参考https://www.emqx.com/en/blog/how-to-use-mqtt-in-vue
			//初始化
			initData() {
				this.client = {
					connected: false,
				};
				this.retryTimes = 0;
				this.connecting = false;
				this.subscribeSuccess = false;
			},
			//重连操作
			handleOnReConnect() {
				this.retryTimes += 1;
				if (this.retryTimes > 5) {
					try {
						this.client.end();
						this.initData();
						this.$message.error("Connection maxReconnectTimes limit, stop retry");
					} catch (error) {
						this.$message.error(error.toString());
					}
				}
			},
			createConnection() {
				try {
					this.connecting = true;
					const {
						protocol,
						host,
						port,
						endpoint,
						...options
					} = this.connection;
					//连接链接
					const connectUrl = `${protocol}://${host}:${port}${endpoint}`;
					this.client = mqtt.connect(connectUrl, options);
					if (this.client.on) {
						//连接监听
						this.client.on("connect", () => {
							this.connecting = false;
							this.connected = true;
							console.log("Connection succeeded!");
						});
						//重连监听
						this.client.on("reconnect", this.handleOnReConnect);
						//错误监听
						this.client.on("error", (error) => {
							console.log("Connection failed", error);
						});
						//消息监听
						this.client.on("message", (topic, message) => {
							//消息处理
							// console.log(`Received message ${message} from topic ${topic}`);
							this.receiveNews = this.receiveNews.concat(message);
							const data = JSON.parse(message);
							this.msgs.push(data);
						});
					}
				} catch (error) {
					//连接失败
					this.connecting = false;
					console.log("mqtt.connect error", error);
				}
			},
			//断开连接
			destroyConnection() {
				if (this.client.connected) {
					try {
						this.client.end(false, () => {
							this.initData()
							this.connected = false;
							console.log('Successfully disconnected!')
						})
					} catch (error) {
						console.log('Disconnect failed', error.toString())
					}
				}
			},
			//订阅主题
			doSubscribe() {
				const {
					topic,
					qos
				} = this.subscription
				this.client.subscribe(topic, {
					qos
				}, (error, res) => {
					if (error) {
						console.log('Subscribe to topics error', error)
						return
					}
					this.subscribeSuccess = true
					console.log('Subscribe to topics res', res)
				})
			},
			//取消订阅
			doUnSubscribe() {
			  const { topic } = this.subscription
			  this.client.unsubscribe(topic, error => {
			    if (error) {
			      console.log('Unsubscribe error', error)
			    }
			  })
			},
			//发布消息
			doPublish() {
				const {
					topic,
					qos,
					payload
				} = this.publish
				this.client.publish(topic, payload, {
					qos
				}, error => {
					if (error) {
						console.log('Publish error', error)
					}
				})
			},
			changeUrl: function(e) {
				const {
					value
				} = e.detail;
				value.forEach((item) => {
					this.connection.port = item == "SSL" ? 8084 : 8083;

					this.connection.protocol = item == "SSL" ? "wss" : "ws";
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 16px 16px;
		box-sizing: border-box;
	}

	.uni-input {
		height: 35px;
		padding: 4px 8px;
		background-color: #fff;
	}

	.title {
		font-weight: bold;
	}

	.cbox {
		display: flex;
		justify-content: space-between;
	}

	.cbox,
	.uni-input {
		margin-top: 8px;
		margin-bottom: 16px;
	}

	.cbox-label {
		margin-right: 8px;
	}

	.uri-text {
		color: rgb(66, 216, 133);
	}

	.btn-group {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 16px;
	}

	.btn-conn {
		background-color: #68e09d;
		color: #fff;
	}

	.btn-conn:active {
		background-color: #5bc589;
	}

	.btn-group button {
		width: 30%;
		font-weight: bold;
	}

	.state-text {
		display: flex;
		align-items: center;
		font-weight: bold;
	}
	
	.msg_list{
		background-color: white;
		padding: 16px;
	}
	
	.msg_list text{
		padding: 4px;
		border-radius: 4px;
		background-color: #e3e3e3;
	}
	
	.msg_list p{
		margin-top: 8px;
	}

	uni-button {
		margin: 0;
	}
</style>