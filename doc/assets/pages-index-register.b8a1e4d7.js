import{o as e,a,w as l,g as r,d as s,f as o,v as d,r as u,x as i}from"./index-a85f2653.js";import{_ as t,a as n,b as m,c as p}from"./logo.2cee09b8.js";import{r as c}from"./uni-app.es.a7fedcdd.js";import{_ as f}from"./_plugin-vue_export-helper.1b428a4d.js";const g=f({data:()=>({registerModel:{email:"",userName:"",password:"",repassword:"",emailCode:""},emailCode:"123456",loading:!0,rules:{email:{rules:[{required:!0,errorMessage:"必填项"},{validateFunction:function(e,a,l,r){return null==a.match(/^([0-9a-zA-Z_.-])+@([0-9a-zA-Z_.-])+.([a-zA-Z]+)$/)&&r("邮件格式不正确"),!0}}]},userName:{rules:[{required:!0,errorMessage:"必填项"},{validateFunction:function(e,a,l,r){return null==a.match(/^[a-zA-Z0-9_-]{8,20}$/)&&r("用户账号长度8到20位（字母，数字，下划线，减号）"),!0}}]},password:{rules:[{required:!0,errorMessage:"必填项"},{validateFunction:function(e,a,l,r){return null==a.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/)&&r("至少8-16个字符，1个大写字母，1个小写字母和1个数字"),!0}}]},repassword:{rules:[{required:!0,errorMessage:"必填项"},{validateFunction:function(e,a,l,r){return a!==l.password&&r("两次输入密码不一致"),!0}}]},emailCode:{rules:[{required:!0,errorMessage:"必填项"},{validateFunction:function(e,a,l,r){return a==this.emailCode&&r("邮件验证码不一致"),!0}}]}}}),onReady(){this.$refs.myForm.setRules(this.rules)},methods:{btnRegister(){this.$refs.myForm.validate().then((e=>{console.log(e)})).catch((e=>{}))},btnEmailCode(){}}},[["render",function(f,g,_,M,V,h){const w=d,C=r,y=c(u("uni-easyinput"),n),q=c(u("uni-forms-item"),m),F=i,v=c(u("uni-forms"),p);return e(),a(C,null,{default:l((()=>[s(C,{class:"logo"},{default:l((()=>[s(w,{src:t})])),_:1}),s(v,{class:"myForm",ref:"myForm",modelValue:V.registerModel,rules:V.rules},{default:l((()=>[s(q,{name:"email",required:""},{default:l((()=>[s(y,{class:"input",inputmode:"email",modelValue:V.registerModel.email,"onUpdate:modelValue":g[0]||(g[0]=e=>V.registerModel.email=e),placeholder:"请输入电子邮箱","suffix-icon":"email"},null,8,["modelValue"])])),_:1}),s(q,{name:"userName",required:""},{default:l((()=>[s(y,{class:"input",modelValue:V.registerModel.userName,"onUpdate:modelValue":g[1]||(g[1]=e=>V.registerModel.userName=e),placeholder:"请输入用户账号","suffix-icon":"person"},null,8,["modelValue"])])),_:1}),s(q,{name:"emailCode",required:""},{default:l((()=>[s(C,{class:"myForm-emailCode"},{default:l((()=>[s(y,{class:"input",modelValue:V.registerModel.emailCode,"onUpdate:modelValue":g[2]||(g[2]=e=>V.registerModel.emailCode=e),placeholder:"请输入邮箱验证码"},null,8,["modelValue"]),s(F,{type:"default",size:"mini",loading:V.loading,onClick:h.btnEmailCode},{default:l((()=>[o("邮箱验证码")])),_:1},8,["loading","onClick"])])),_:1})])),_:1}),s(q,{name:"password",required:""},{default:l((()=>[s(y,{class:"input",type:"password",modelValue:V.registerModel.password,"onUpdate:modelValue":g[3]||(g[3]=e=>V.registerModel.password=e),placeholder:"请输入密码"},null,8,["modelValue"])])),_:1}),s(q,{name:"repassword",required:""},{default:l((()=>[s(y,{class:"input",type:"password",modelValue:V.registerModel.repassword,"onUpdate:modelValue":g[4]||(g[4]=e=>V.registerModel.repassword=e),placeholder:"请输入确认密码"},null,8,["modelValue"])])),_:1}),s(F,{type:"primary",onClick:h.btnRegister},{default:l((()=>[o("用户注册")])),_:1},8,["onClick"])])),_:1},8,["modelValue","rules"])])),_:1})}],["__scopeId","data-v-10895f88"]]);export{g as default};
