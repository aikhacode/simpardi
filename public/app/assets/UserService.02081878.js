import{k as t,u as r,l as o}from"./index.0463b87e.js";const d=""+new URL("../images/logo-sipardi.png",import.meta.url).href,c=new class{reqOptions(e,a){return{url:t(a),method:e,headers:{Accept:"application/json",Authorization:`Bearer ${r().token}`}}}getUsers(){return o(this.reqOptions("GET","/bro")).then(e=>e.data)}delete(e){return o({url:t("/bro/delete/"+e.email),method:"DELETE",headers:{Accept:"application/json",Authorization:`Bearer ${r().token}`}}).then(a=>a.data)}saveUser(e,a=!1){return console.log(e),o({url:t("/bro/update"),method:"POST",data:{name:e.name,email:e.email,password:e.password1,password_confirmation:e.password2,username:e.username,role:e.role,mode:a?"new":"old"},headers:{Accept:"application/json",Authorization:`Bearer ${r().token}`}}).then(s=>s.data)}saveCategory(e=!0,a,s){let n=e?"/categories":`/categories/${a}`;return o({url:t(n),method:e?"POST":"PUT",data:s,headers:{Accept:"application/json",Authorization:`Bearer ${r().token}`}}).then(i=>i.data)}};export{c as S,d as _};
