import{u as e,A as s,s as a,o as n,c as o,w as t,i as r,a as i,b as m,f as u,e as l}from"./index-ecb441ed.js";import{_ as d,a as c,b as p}from"./uni-forms.d7f3f3ae.js";import{r as f}from"./uni-app.es.58aeac87.js";import{p as g}from"./index.9a912d11.js";import{_}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.d8bf0f6a.js";const h=_({data:()=>({msg:{content:""},rules:{content:{rules:[{required:!0,errorMessage:"请输入大事件"}]}}}),methods:{createMsg(){this.$refs.myform.validate().then((n=>{const o=e(),{id:t}=o.userinfo,r=Date.now(),i={content:this.msg.content,happenTime:r,userId:t};g("api/memorabilia/add",i).then((e=>{const{code:n,msg:o,success:t}=e;1==n&&t?(s({url:"/pages/index/index"}),a({title:o,duration:2e3,icon:"none"})):a({title:o,duration:2e3,icon:"none"})}))}))}}},[["render",function(e,s,a,g,_,h){const j=f(u("uni-easyinput"),d),x=f(u("uni-forms-item"),c),y=l,b=f(u("uni-forms"),p),V=r;return n(),o(V,{class:"container"},{default:t((()=>[i(b,{class:"myForm",ref:"myform",modelValue:_.msg,rules:_.rules},{default:t((()=>[i(x,{name:"content"},{default:t((()=>[i(j,{class:"input",modelValue:_.msg.content,"onUpdate:modelValue":s[0]||(s[0]=e=>_.msg.content=e),placeholder:"请输入大事件内容",required:""},null,8,["modelValue"])])),_:1}),i(y,{type:"primary",onClick:h.createMsg},{default:t((()=>[m("添加")])),_:1},8,["onClick"])])),_:1},8,["modelValue","rules"])])),_:1})}],["__scopeId","data-v-d125f4b2"]]);export{h as default};