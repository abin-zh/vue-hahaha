<template>
    <div class="container">
        <div class="login-panel reg-panel">
            <div class="login-title reg-title">
                <el-text>Register</el-text>
            </div>
            <div class="login-form" >
                <el-form ref="formRef" :model="regdata" :rules="regRule">
                    <el-form-item label="电子邮件" prop="email">
                        <el-input type="email" v-model="regdata.email"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="用户密码" prop="password">
                        <el-input type="password" v-model="regdata.password" show-password/>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="cpassword">
                        <el-input type="password" v-model="regdata.cpassword" show-password/>
                    </el-form-item>

                    <el-form-item label="用户账号" prop="userName">
                        <el-input v-model="regdata.userName" />
                    </el-form-item>
<!-- 
                    <el-form-item label="用户类型">
                        <el-select v-model="select" placeholder="Select" style="width: 115px">
                            <el-option label="学生" value="1" />
                            <el-option label="老师" value="2" />
                            <el-option label="宿管" value="3" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="用户性别">
                        <el-radio-group v-model="sex">
                            <el-radio label="男" size="default">男</el-radio>
                            <el-radio label="女" size="default">女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="出生日期">
                        <el-date-picker v-model="birthday"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="兴趣爱好">
                        <el-checkbox label="阅读" />
                        <el-checkbox label="音乐" />
                        <el-checkbox label="阅读" />
                    </el-form-item> -->

                    <!-- <el-form-item label="自我介绍">
                        <el-input
                            v-model="textarea1"
                            :autosize="{ minRows: 5}"
                            type="textarea"
                        />
                    </el-form-item> -->
                    
                    <el-form-item class="reg-button-group">
                        <el-button type="primary" @click="reg(formRef)">提交</el-button>
                        <el-button type="warning" @click="resetInfo(formRef)">重置</el-button>
                    </el-form-item>
                    
                </el-form>
            </div>
            <!-- <div class="link">
                <router-link to="/">忘记密码?</router-link>
                <el-divider direction="vertical" />
                <router-link to="/user/register">注册</router-link>
            </div> -->
        </div>
    </div>
</template>

<script setup>
    import { ref,reactive } from 'vue';
    import { userReg } from '@/http/user';
    import { useRouter } from 'vue-router';
    import { ElMessage } from 'element-plus';

    //响应式数据
    //ref用来定义基本类型数据，
    //reactive用来定义引用类型，如对象、或数组类型数据
    const regdata = reactive({
        email: '',
        password: '',
        cpassword: '',
        userName: '',
    })

    //校验密码是否一致
    const checkPwd = (rule, value, callback) => {
        if (value !== regdata.password) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    };

    //表单校验规则
    //https://blog.csdn.net/weixin_43405300/article/details/132326466
    const regRule = {
        email:[
            {required: true,message:'请输入邮箱',triger:'blur'},
            {type:'email',message:'请输入正确的邮箱',triger:'blur'}
        ],
        password:[
            {required: true,message:'请输入密码',triger:'blur'},
            {min:8,max:20,message:'密码的长度在8到20之间',triger:'blur'}
        ],
        cpassword:[
            {required: true,message:'请再次输入密码',triger:'blur'},
            {min:8,max:20,message:'密码的长度在8到20之间',triger:'blur'},
            {validator: checkPwd, triger:'blur'}
        ],
        userName:[
            {required: true,message:'请输入用户账号',triger:'blur'},
            {min:8,max:20,message:'用户账号的长度在8到20之间',triger:'blur'}
        ],        
    }

    //类reactive,el-form需要，可得到validate函数
    const formRef = ref(regdata);
    
    const router = useRouter();

    const reg = (formRef) => {
        formRef.validate((valid) => {
            //所有校验通过
            if (valid) {
                //提交注册信息(@/http/user function:userReg)
                userReg(regdata).then(res => { 
                    
                    //注册成功后的操作
                    if(res.success == true && res.code == 1){
                        ElMessage({message: '注册成功',type: 'success',offset: 100});
                        //跳转
                        router.push('/user/login');
                    }else{
                        ElMessage({message: res.msg,type: 'warning',offset: 100});
                    }
                }).catch(err => {
                    //注册失败后显示错误信息
                    ElMessage({message: err.msg,type: 'error',offset: 100});
                })
            } else {
                //部分校验未通过
                ElMessage({message: '请检查输入信息',type: 'error',offset: 100});
                return false;
            }
        });
    }

    // 重置表单
    const resetInfo = (formRef) => {
        if(!formRef) return ;
        formRef.resetFields();
    }
</script>

<style scoped>
    .reg-panel{
        margin: 25px;
    }
    .reg-title{
        height: 50px;
        margin-bottom: 25px;
    }
    .reg-title .el-text {
        font-size: 24px;
    }

    .el-button{
        width: 47.5%;
    }
</style>