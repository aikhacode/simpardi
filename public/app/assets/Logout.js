import{_ as p}from"./avatar.js";import{_,r,o as f,c as g,d as e,e as n,p as x,f as h}from"./index.js";const b={data(){return{email:"",password:"",checked:!1}},computed:{logoColor(){return this.$appState.darkTheme?"white":"dark"}}},l=a=>(x("data-v-0648ef2d"),a=a(),h(),a),v={class:"surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"},w={class:"grid justify-content-center p-2 lg:p-0",style:{"min-width":"80%"}},y={class:"col-12 mt-5 xl:mt-0 text-center"},k=["src"],V={class:"col-12 xl:col-6",style:{"border-radius":"56px",padding:"0.3rem",background:"linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%)"}},I={class:"h-full w-full m-0 py-7 px-4",style:{"border-radius":"53px",background:"linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0))"}},S=l(()=>e("div",{class:"text-center mb-5"},[e("img",{src:p,alt:"Image",height:"50",class:"mb-3"}),e("div",{class:"text-900 text-3xl font-medium mb-3"},"Welcome, Isabel!"),e("span",{class:"text-600 font-medium"},"Sign in to continue")],-1)),C={class:"w-full md:w-10 mx-auto"},B=l(()=>e("label",{for:"email1",class:"block text-900 text-xl font-medium mb-2"},"Email",-1)),P=l(()=>e("label",{for:"password1",class:"block text-900 font-medium text-xl mb-2"},"Password",-1)),j={class:"flex align-items-center justify-content-between mb-5"},E={class:"flex align-items-center"},T=l(()=>e("label",{for:"rememberme1"},"Remember me",-1)),U=l(()=>e("a",{class:"font-medium no-underline ml-2 text-right cursor-pointer",style:{color:"var(--primary-color)"}},"Forgot password?",-1));function L(a,t,N,F,s,d){const i=r("InputText"),c=r("Password"),m=r("Checkbox"),u=r("Button");return f(),g("div",v,[e("div",w,[e("div",y,[e("img",{src:"/layout/images/logo-"+d.logoColor+".svg",alt:"Sakai logo",class:"mb-5",style:{width:"81px",height:"60px"}},null,8,k)]),e("div",V,[e("div",I,[S,e("div",C,[B,n(i,{id:"email1",modelValue:s.email,"onUpdate:modelValue":t[0]||(t[0]=o=>s.email=o),type:"text",class:"w-full mb-3",placeholder:"Email",style:{padding:"1rem"}},null,8,["modelValue"]),P,n(c,{id:"password1",modelValue:s.password,"onUpdate:modelValue":t[1]||(t[1]=o=>s.password=o),placeholder:"Password",toggleMask:!0,class:"w-full mb-3",inputClass:"w-full",inputStyle:"padding:1rem"},null,8,["modelValue"]),e("div",j,[e("div",E,[n(m,{id:"rememberme1",modelValue:s.checked,"onUpdate:modelValue":t[2]||(t[2]=o=>s.checked=o),binary:!0,class:"mr-2"},null,8,["modelValue"]),T]),U]),n(u,{label:"Sign In",class:"w-full p-3 text-xl"})])])])])])}var W=_(b,[["render",L],["__scopeId","data-v-0648ef2d"]]);export{W as default};
