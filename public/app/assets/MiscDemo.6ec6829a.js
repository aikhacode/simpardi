import{_ as b,r as t,k as f,o as y,c as x,a as s,b as e,l as u,w as _}from"./index.13009a81.js";const w={data(){return{value:0}},interval:null,methods:{startProgress(){this.interval=setInterval(()=>{let c=this.value+Math.floor(Math.random()*10)+1;c>=100&&(c=100),this.value=c},2e3)},endProgress(){clearInterval(this.interval),this.interval=null}},mounted(){this.startProgress()},beforeUnmount(){this.endProgress()}},z={class:"grid"},B={class:"col-12"},P={class:"card"},S=s("h5",null,"ProgressBar",-1),k={class:"grid"},q={class:"col"},A={class:"col"},T={class:"col-12 lg:col-6"},C={class:"card"},I=s("h4",null,"Badge",-1),M=s("h5",null,"Numbers",-1),D={class:"badges"},E=s("h5",null,"Positioned Badge",-1),V={class:"pi pi-bell mr-4 p-text-secondary",style:{"font-size":"2rem"}},j={class:"pi pi-calendar mr-4 p-text-secondary",style:{"font-size":"2rem"}},G={class:"pi pi-envelope p-text-secondary",style:{"font-size":"2rem"}},N=s("h5",null,"Inline Button Badge",-1),L=s("h5",null,"Sizes",-1),U={class:"badges"},W={class:"card"},$=s("h4",null,"Avatar",-1),F=s("h5",null,"Avatar Group",-1),J=s("h5",null,"Label - Circle",-1),O=s("h5",null,"Icon - Badge",-1),H={class:"card"},K=s("h4",null,"ScrollTop",-1),Q=s("p",null," Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget est lorem. Amet consectetur adipiscing elit ut. Nam libero justo laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Est ultricies integer quis auctor elit sed vulputate. Consequat ac felis donec et. Tellus orci ac auctor augue mauris. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Tincidunt arcu non sodales neque sodales. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut etiam sit amet nisl purus. Cursus sit amet dictum sit amet. Tristique senectus et netus et malesuada fames ac turpis egestas. Et tortor consequat id porta nibh venenatis cras sed. Diam maecenas ultricies mi eget mauris. Eget egestas purus viverra accumsan in nisl nisi. Suscipit adipiscing bibendum est ultricies integer. Mattis aliquam faucibus purus in massa tempor nec. ",-1),R={class:"col-12 lg:col-6"},X={class:"card"},Y=s("h4",null,"Tag",-1),Z=s("h5",null,"Tags",-1),ee=s("h5",null,"Pills",-1),se=s("h5",null,"Icons",-1),ae={class:"card"},ie=s("h4",null,"Chip",-1),le=s("h5",null,"Basic",-1),te={class:"flex align-items-center flex-column sm:flex-row"},oe=s("h5",null,"Icon",-1),re={class:"flex align-items-center flex-column sm:flex-row"},ce=s("h5",null,"Image",-1),ne={class:"flex align-items-center flex-column sm:flex-row"},ue={class:"card"},de=s("h4",null,"Skeleton",-1),me={class:"border-round border-1 surface-border p-4"},_e={class:"flex mb-3"},he={class:"flex justify-content-between mt-3"};function ge(c,ve,pe,be,h,fe){const d=t("ProgressBar"),o=t("Badge"),m=t("Button"),l=t("Avatar"),g=t("AvatarGroup"),v=t("ScrollTop"),p=t("ScrollPanel"),a=t("Tag"),i=t("Chip"),r=t("Skeleton"),n=f("badge");return y(),x("div",z,[s("div",B,[s("div",P,[S,s("div",k,[s("div",q,[e(d,{value:h.value},null,8,["value"])]),s("div",A,[e(d,{value:50,showValue:!1})])])])]),s("div",T,[s("div",C,[I,M,s("div",D,[e(o,{value:2,class:"mr-2"}),e(o,{value:8,severity:"success",class:"mr-2"}),e(o,{value:4,severity:"info",class:"mr-2"}),e(o,{value:12,severity:"warning",class:"mr-2"}),e(o,{value:3,severity:"danger"})]),E,u(s("i",V,null,512),[[n,2]]),u(s("i",j,null,512),[[n,"10+",void 0,{danger:!0}]]),u(s("i",G,null,512),[[n,void 0,void 0,{danger:!0}]]),N,e(m,{label:"Emails",badge:"8",class:"mr-2"}),e(m,{label:"Messages",icon:"pi pi-users",class:"p-button-warning",badge:"8",badgeClass:"p-badge-danger"}),L,s("div",U,[e(o,{value:2,class:"mr-2"}),e(o,{value:4,size:"large",severity:"warning",class:"mr-2"}),e(o,{value:6,size:"xlarge",severity:"success"})])]),s("div",W,[$,F,e(g,{class:"mb-3"},{default:_(()=>[e(l,{image:"/images/avatar/amyelsner.png",size:"large",shape:"circle"}),e(l,{image:"/images/avatar/asiyajavayant.png",size:"large",shape:"circle"}),e(l,{image:"/images/avatar/onyamalimba.png",size:"large",shape:"circle"}),e(l,{image:"/images/avatar/ionibowcher.png",size:"large",shape:"circle"}),e(l,{image:"/images/avatar/xuxuefeng.png",size:"large",shape:"circle"}),e(l,{label:"+2",shape:"circle",size:"large",style:{"background-color":"#9c27b0",color:"#ffffff"}})]),_:1}),J,e(l,{label:"P",class:"mr-2",size:"xlarge",shape:"circle"}),e(l,{label:"V",class:"mr-2",size:"large",style:{"background-color":"#2196F3",color:"#ffffff"},shape:"circle"}),e(l,{label:"U",class:"mr-2",style:{"background-color":"#9c27b0",color:"#ffffff"},shape:"circle"}),O,u(e(l,{icon:"pi pi-user",class:"mr-2",size:"xlarge"},null,512),[[n,4,void 0,{success:!0}]])]),s("div",H,[K,e(p,{style:{width:"250px",height:"200px"}},{default:_(()=>[Q,e(v,{target:"parent",threshold:100,icon:"pi pi-arrow-up"})]),_:1})])]),s("div",R,[s("div",X,[Y,Z,e(a,{class:"mr-2",value:"Primary"}),e(a,{class:"mr-2",severity:"success",value:"Success"}),e(a,{class:"mr-2",severity:"info",value:"Info"}),e(a,{class:"mr-2",severity:"warning",value:"Warning"}),e(a,{severity:"danger",value:"Danger"}),ee,e(a,{class:"mr-2",value:"Primary",rounded:!0}),e(a,{class:"mr-2",severity:"success",value:"Success",rounded:!0}),e(a,{class:"mr-2",severity:"info",value:"Info",rounded:!0}),e(a,{class:"mr-2",severity:"warning",value:"Warning",rounded:!0}),e(a,{severity:"danger",value:"Danger",rounded:!0}),se,e(a,{class:"mr-2",icon:"pi pi-user",value:"Primary"}),e(a,{class:"mr-2",icon:"pi pi-check",severity:"success",value:"Success"}),e(a,{class:"mr-2",icon:"pi pi-info-circle",severity:"info",value:"Info"}),e(a,{class:"mr-2",con:"pi pi-exclamation-triangle",severity:"warning",value:"Warning"}),e(a,{icon:"pi pi-times",severity:"danger",value:"Danger"})]),s("div",ae,[ie,le,s("div",te,[e(i,{label:"Action",class:"mr-2 mb-2"}),e(i,{label:"Comedy",class:"mr-2 mb-2"}),e(i,{label:"Mystery",class:"mr-2 mb-2"}),e(i,{label:"Thriller",removable:!0,class:"mb-2"})]),oe,s("div",re,[e(i,{label:"Apple",icon:"pi pi-apple",class:"mr-2 mb-2"}),e(i,{label:"Facebook",icon:"pi pi-facebook",class:"mr-2 mb-2"}),e(i,{label:"Google",icon:"pi pi-google",class:"mr-2 mb-2"}),e(i,{label:"Microsoft",icon:"pi pi-microsoft",removable:!0,class:"mb-2"})]),ce,s("div",ne,[e(i,{label:"Amy Elsner",image:"/images/avatar/amyelsner.png",class:"mr-2 mb-2"}),e(i,{label:"Asiya Javayant",image:"/images/avatar/asiyajavayant.png",class:"mr-2 mb-2"}),e(i,{label:"Onyama Limba",image:"/images/avatar/onyamalimba.png",class:"mr-2 mb-2"})])]),s("div",ue,[de,s("div",me,[s("div",_e,[e(r,{shape:"circle",size:"4rem",class:"mr-2"}),s("div",null,[e(r,{width:"10rem",class:"mb-2"}),e(r,{width:"5rem",class:"mb-2"}),e(r,{height:".5rem"})])]),e(r,{width:"100%",height:"150px"}),s("div",he,[e(r,{width:"4rem",height:"2rem"}),e(r,{width:"4rem",height:"2rem"})])])])])])}var xe=b(w,[["render",ge]]);export{xe as default};
