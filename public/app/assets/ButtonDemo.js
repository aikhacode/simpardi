import{_ as p,r as b,o as d,c as m,d as n,e as t,w as u}from"./index.js";var r="/app/images/primevue-logo.svg";const _={data(){return{items:[{label:"Update",icon:"pi pi-refresh"},{label:"Delete",icon:"pi pi-times"},{separator:!0},{label:"Home",icon:"pi pi-home"}],loading:[!1,!1,!1]}},methods:{load(a){this.loading[a]=!0,setTimeout(()=>this.loading[a]=!1,1e3)}}},h={class:"grid"},g={class:"col-12 md:col-6"},v={class:"card"},f=n("h5",null,"Default",-1),k={class:"card"},y=n("h5",null,"Severities",-1),S={class:"card"},x=n("h5",null,"Text",-1),w={class:"card"},B=n("h5",null,"Outlined",-1),D={class:"card"},P=n("h5",null,"Button Group",-1),C={class:"p-buttonset"},I={class:"card"},R=n("h5",null,"SplitButton",-1),W={class:"card"},T=n("h5",null,"Templating",-1),H=n("img",{alt:"logo",src:r,style:{width:"1.5rem"}},null,-1),V=n("img",{alt:"logo",src:r,style:{width:"1.5rem"}},null,-1),L=n("span",{class:"ml-2 text-bold"},"PrimeVue",-1),N={class:"col-12 md:col-6"},O={class:"card"},E=n("h5",null,"Icons",-1),G={class:"card"},U=n("h5",null,"Raised",-1),j={class:"card"},q=n("h5",null,"Rounded",-1),z={class:"card"},A=n("h5",null,"Rounded Icons",-1),F={class:"card"},J=n("h5",null,"Rounded Text",-1),K={class:"card"},M=n("h5",null,"Rounded Outlined",-1),Q={class:"card"},X=n("h5",null,"Loading",-1);function Y(a,l,Z,$,s,i){const o=b("Button"),e=b("SplitButton");return d(),m("div",h,[n("div",g,[n("div",v,[f,t(o,{label:"Submit",class:"mr-2 mb-2"}),t(o,{label:"Disabled",class:"mr-2 mb-2",disabled:!0}),t(o,{label:"Link",class:"p-button-link mr-2 mb-2"})]),n("div",k,[y,t(o,{label:"Primary",class:"mr-2 mb-2"}),t(o,{label:"Secondary",class:"p-button-secondary mr-2 mb-2"}),t(o,{label:"Success",class:"p-button-success mr-2 mb-2"}),t(o,{label:"Info",class:"p-button-info mr-2 mb-2"}),t(o,{label:"Warning",class:"p-button-warning mr-2 mb-2"}),t(o,{label:"Danger",class:"p-button-danger mr-2 mb-2"})]),n("div",S,[x,t(o,{label:"Primary",class:"p-button-text mr-2 mb-2"}),t(o,{label:"Secondary",class:"p-button-secondary p-button-text mr-2 mb-2"}),t(o,{label:"Success",class:"p-button-success p-button-text mr-2 mb-2"}),t(o,{label:"Info",class:"p-button-info p-button-text mr-2 mb-2"}),t(o,{label:"Warning",class:"p-button-warning p-button-text mr-2 mb-2"}),t(o,{label:"Help",class:"p-button-help p-button-text mr-2 mb-2"}),t(o,{label:"Danger",class:"p-button-danger p-button-text mr-2 mb-2"}),t(o,{label:"Plain",class:"p-button-plain p-button-text mr-2 mb-2"})]),n("div",w,[B,t(o,{label:"Primary",class:"p-button-outlined mr-2 mb-2"}),t(o,{label:"Secondary",class:"p-button-outlined p-button-secondary mr-2 mb-2"}),t(o,{label:"Success",class:"p-button-outlined p-button-success mr-2 mb-2"}),t(o,{label:"Info",class:"p-button-outlined p-button-info mr-2 mb-2"}),t(o,{label:"Warning",class:"p-button-outlined p-button-warning mr-2 mb-2"}),t(o,{label:"Help",class:"p-button-outlined p-button-help mr-2 mb-2"}),t(o,{label:"Danger",class:"p-button-outlined p-button-danger mr-2 mb-2"})]),n("div",D,[P,n("span",C,[t(o,{label:"Save",icon:"pi pi-check"}),t(o,{label:"Delete",icon:"pi pi-trash"}),t(o,{label:"Cancel",icon:"pi pi-times"})])]),n("div",I,[R,t(e,{label:"Save",icon:"pi pi-check",model:s.items,class:"p-button-secondary mr-2 mb-2"},null,8,["model"]),t(e,{label:"Save",icon:"pi pi-check",model:s.items,class:"p-button-success mr-2 mb-2"},null,8,["model"]),t(e,{label:"Save",icon:"pi pi-check",model:s.items,class:"p-button-info mr-2 mb-2"},null,8,["model"]),t(e,{label:"Save",icon:"pi pi-check",model:s.items,class:"p-button-warning mr-2 mb-2"},null,8,["model"]),t(e,{label:"Save",icon:"pi pi-check",model:s.items,class:"p-button-danger mr-2 mb-2"},null,8,["model"])]),n("div",W,[T,t(o,{type:"button",class:"mr-2 mb-2 px-3"},{default:u(()=>[H]),_:1}),t(o,{type:"button",class:"p-button-outlined p-button-success mr-2 mb-2"},{default:u(()=>[V,L]),_:1})])]),n("div",N,[n("div",O,[E,t(o,{icon:"pi pi-star-fill",class:"mr-2 mb-2"}),t(o,{label:"Bookmark",icon:"pi pi-bookmark",class:"mr-2 mb-2"}),t(o,{label:"Bookmark",icon:"pi pi-bookmark",iconPos:"right",class:"mr-2 mb-2"})]),n("div",G,[U,t(o,{label:"Primary",class:"p-button-raised mr-2 mb-2"}),t(o,{label:"Secondary",class:"p-button-raised p-button-secondary mr-2 mb-2"}),t(o,{label:"Success",class:"p-button-raised p-button-success mr-2 mb-2"}),t(o,{label:"Info",class:"p-button-raised p-button-info mr-2 mb-2"}),t(o,{label:"Warning",class:"p-button-raised p-button-warning mr-2 mb-2"}),t(o,{label:"Danger",class:"p-button-raised p-button-danger mr-2 mb-2"})]),n("div",j,[q,t(o,{label:"Primary",class:"p-button-rounded mr-2 mb-2"}),t(o,{label:"Secondary",class:"p-button-rounded p-button-secondary mr-2 mb-2"}),t(o,{label:"Success",class:"p-button-rounded p-button-success mr-2 mb-2"}),t(o,{label:"Info",class:"p-button-rounded p-button-info mr-2 mb-2"}),t(o,{label:"Warning",class:"p-button-rounded p-button-warning mr-2 mb-2"}),t(o,{label:"Danger",class:"p-button-rounded p-button-danger mr-2 mb-2"})]),n("div",z,[A,t(o,{icon:"pi pi-star-fill",class:"p-button-rounded mr-2 mb-2"}),t(o,{icon:"pi pi-bookmark",class:"p-button-rounded p-button-secondary mr-2 mb-2"}),t(o,{icon:"pi pi-check",class:"p-button-rounded p-button-success mr-2 mb-2"}),t(o,{icon:"pi pi-search",class:"p-button-rounded p-button-info mr-2 mb-2"}),t(o,{icon:"pi pi-user",class:"p-button-rounded p-button-warning mr-2 mb-2"}),t(o,{icon:"pi pi-sign-out",class:"p-button-rounded p-button-danger mr-2 mb-2"})]),n("div",F,[J,t(o,{icon:"pi pi-check",class:"p-button-rounded p-button-text mr-2 mb-2"}),t(o,{icon:"pi pi-bookmark",class:"p-button-rounded p-button-secondary p-button-text mr-2 mb-2"}),t(o,{icon:"pi pi-search",class:"p-button-rounded p-button-success p-button-text mr-2 mb-2"}),t(o,{icon:"pi pi-user",class:"p-button-rounded p-button-info p-button-text mr-2 mb-2"}),t(o,{icon:"pi pi-bell",class:"p-button-rounded p-button-warning p-button-text mr-2 mb-2"}),t(o,{icon:"pi pi-heart",class:"p-button-rounded p-button-help p-button-text mr-2 mb-2"}),t(o,{icon:"pi pi-times",class:"p-button-rounded p-button-danger p-button-text mr-2 mb-2"}),t(o,{icon:"pi pi-filter",class:"p-button-rounded p-button-plain p-button-text mr-2 mb-2"})]),n("div",K,[M,t(o,{icon:"pi pi-check",class:"p-button-rounded p-button-outlined mr-2 mb-2"}),t(o,{icon:"pi pi-bookmark",class:"p-button-rounded p-button-secondary p-button-outlined mr-2 mb-2"}),t(o,{icon:"pi pi-search",class:"p-button-rounded p-button-success p-button-outlined mr-2 mb-2"}),t(o,{icon:"pi pi-user",class:"p-button-rounded p-button-info p-button-outlined mr-2 mb-2"}),t(o,{icon:"pi pi-bell",class:"p-button-rounded p-button-warning p-button-outlined mr-2 mb-2"}),t(o,{icon:"pi pi-heart",class:"p-button-rounded p-button-help p-button-outlined mr-2 mb-2"}),t(o,{icon:"pi pi-times",class:"p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"})]),n("div",Q,[X,t(o,{type:"button",class:"mr-2 mb-2",label:"Search",icon:"pi pi-search",loading:s.loading[0],onClick:l[0]||(l[0]=c=>i.load(0))},null,8,["loading"]),t(o,{type:"button",class:"mr-2 mb-2",label:"Search",icon:"pi pi-search",iconPos:"right",loading:s.loading[1],onClick:l[1]||(l[1]=c=>i.load(1))},null,8,["loading"]),t(o,{type:"button",class:"mr-2 mb-2",icon:"pi pi-search",loading:s.loading[2],onClick:l[2]||(l[2]=c=>i.load(2))},null,8,["loading"]),t(o,{type:"button",class:"mr-2 mb-2",label:"Search",loading:s.loading[3],onClick:l[3]||(l[3]=c=>i.load(3))},null,8,["loading"])])])])}var ot=p(_,[["render",Y]]);export{ot as default};
