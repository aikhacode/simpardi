import{_ as s,r as d,o as t,c,d as e,e as l}from"./index.js";const n={methods:{onUpload(){this.$toast.add({severity:"info",summary:"Success",detail:"File Uploaded",life:3e3})}}},i={class:"grid"},p={class:"col-12"},r={class:"card"},_=e("h5",null,"Advanced",-1),m=e("h5",null,"Basic",-1);function u(h,U,f,v,F,o){const a=d("FileUpload");return t(),c("div",i,[e("div",p,[e("div",r,[_,l(a,{name:"demo[]",url:"./upload.php",onUpload:o.onUpload,multiple:!0,accept:"image/*",maxFileSize:1e6},null,8,["onUpload"]),m,l(a,{mode:"basic",name:"demo[]",url:"./upload.php",accept:"image/*",maxFileSize:1e6,onUpload:o.onUpload},null,8,["onUpload"])])])])}var B=s(n,[["render",u]]);export{B as default};
