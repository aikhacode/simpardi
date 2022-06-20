import{P as w}from"./ProductService.232c8ba0.js";import{_ as y,r as i,o as F,c as V,a as e,b as n,w as c,p as S,j as C,t as d,n as g,e as u}from"./index.13009a81.js";const k={data(){return{picklistValue:[[{name:"San Francisco",code:"SF"},{name:"London",code:"LDN"},{name:"Paris",code:"PRS"},{name:"Istanbul",code:"IST"},{name:"Berlin",code:"BRL"},{name:"Barcelona",code:"BRC"},{name:"Rome",code:"RM"}],[]],orderlistValue:[{name:"San Francisco",code:"SF"},{name:"London",code:"LDN"},{name:"Paris",code:"PRS"},{name:"Istanbul",code:"IST"},{name:"Berlin",code:"BRL"},{name:"Barcelona",code:"BRC"},{name:"Rome",code:"RM"}],dataviewValue:null,layout:"grid",sortKey:null,sortOrder:null,sortField:null,sortOptions:[{label:"Price High to Low",value:"!price"},{label:"Price Low to High",value:"price"}]}},productService:null,created(){this.productService=new w},mounted(){this.productService.getProducts().then(s=>this.dataviewValue=s)},methods:{onSortChange(s){const a=s.value.value,l=s.value;a.indexOf("!")===0?(this.sortOrder=-1,this.sortField=a.substring(1,a.length),this.sortKey=l):(this.sortOrder=1,this.sortField=a,this.sortKey=l)}}},r=s=>(S("data-v-f9d9c4da"),s=s(),C(),s),D={class:"grid"},L={class:"col-12"},O={class:"card"},B=r(()=>e("h5",null,"DataView",-1)),E={class:"grid grid-nogutter"},R={class:"col-6 text-left"},K={class:"col-6 text-right"},I={class:"col-12"},T={class:"flex flex-column md:flex-row align-items-center p-3 w-full"},U=["src","alt"],N={class:"flex-1 text-center md:text-left"},j={class:"font-bold text-2xl"},z={class:"mb-3"},A={class:"flex align-items-center"},q=r(()=>e("i",{class:"pi pi-tag mr-2"},null,-1)),H={class:"font-semibold"},M={class:"flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0"},G={class:"text-2xl font-semibold mb-2 align-self-center md:align-self-end"},J={class:"col-12 md:col-4"},Q={class:"card m-3 border-1 surface-border"},W={class:"flex align-items-center justify-content-between"},X={class:"flex align-items-center"},Y=r(()=>e("i",{class:"pi pi-tag mr-2"},null,-1)),Z={class:"font-semibold"},P={class:"text-center"},$=["src","alt"],ee={class:"text-2xl font-bold"},te={class:"mb-3"},ae={class:"flex align-items-center justify-content-between"},oe={class:"text-2xl font-semibold"},de={class:"col-12 lg:col-8"},se={class:"card"},ne=r(()=>e("h5",null,"PickList",-1)),ce=u(" From "),ie=u(" To "),re={class:"col-12 lg:col-4"},le={class:"card"},ue=r(()=>e("h5",null,"OrderList",-1)),me=u(" Cities ");function _e(s,a,l,ge,o,p){const v=i("Dropdown"),b=i("DataViewLayoutOptions"),m=i("Rating"),_=i("Button"),f=i("DataView"),h=i("PickList"),x=i("OrderList");return F(),V("div",D,[e("div",L,[e("div",O,[B,n(f,{value:o.dataviewValue,layout:o.layout,paginator:!0,rows:9,sortOrder:o.sortOrder,sortField:o.sortField},{header:c(()=>[e("div",E,[e("div",R,[n(v,{modelValue:o.sortKey,"onUpdate:modelValue":a[0]||(a[0]=t=>o.sortKey=t),options:o.sortOptions,optionLabel:"label",placeholder:"Sort By Price",onChange:a[1]||(a[1]=t=>p.onSortChange(t))},null,8,["modelValue","options"])]),e("div",K,[n(b,{modelValue:o.layout,"onUpdate:modelValue":a[2]||(a[2]=t=>o.layout=t)},null,8,["modelValue"])])])]),list:c(t=>[e("div",I,[e("div",T,[e("img",{src:"images/product/"+t.data.image,alt:t.data.name,class:"my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"},null,8,U),e("div",N,[e("div",j,d(t.data.name),1),e("div",z,d(t.data.description),1),n(m,{modelValue:t.data.rating,readonly:!0,cancel:!1,class:"mb-2"},null,8,["modelValue"]),e("div",A,[q,e("span",H,d(t.data.category),1)])]),e("div",M,[e("span",G,"$"+d(t.data.price),1),n(_,{icon:"pi pi-shopping-cart",label:"Add to Cart",disabled:t.data.inventoryStatus==="OUTOFSTOCK",class:"mb-2"},null,8,["disabled"]),e("span",{class:g("product-badge status-"+t.data.inventoryStatus.toLowerCase())},d(t.data.inventoryStatus),3)])])])]),grid:c(t=>[e("div",J,[e("div",Q,[e("div",W,[e("div",X,[Y,e("span",Z,d(t.data.category),1)]),e("span",{class:g("product-badge status-"+t.data.inventoryStatus.toLowerCase())},d(t.data.inventoryStatus),3)]),e("div",P,[e("img",{src:"images/product/"+t.data.image,alt:t.data.name,class:"w-9 shadow-2 my-3 mx-0"},null,8,$),e("div",ee,d(t.data.name),1),e("div",te,d(t.data.description),1),n(m,{modelValue:t.data.rating,readonly:!0,cancel:!1},null,8,["modelValue"])]),e("div",ae,[e("span",oe,"$"+d(t.data.price),1),n(_,{icon:"pi pi-shopping-cart",disabled:t.data.inventoryStatus==="OUTOFSTOCK"},null,8,["disabled"])])])])]),_:1},8,["value","layout","sortOrder","sortField"])])]),e("div",de,[e("div",se,[ne,n(h,{modelValue:o.picklistValue,"onUpdate:modelValue":a[3]||(a[3]=t=>o.picklistValue=t),listStyle:"height:250px",dataKey:"code"},{sourceheader:c(()=>[ce]),targetheader:c(()=>[ie]),item:c(t=>[e("div",null,d(t.item.name),1)]),_:1},8,["modelValue"])])]),e("div",re,[e("div",le,[ue,n(x,{modelValue:o.orderlistValue,"onUpdate:modelValue":a[4]||(a[4]=t=>o.orderlistValue=t),listStyle:"height:250px",dataKey:"code",rows:10},{header:c(()=>[me]),item:c(t=>[e("div",null,d(t.item.name),1)]),_:1},8,["modelValue"])])])])}var be=y(k,[["render",_e],["__scopeId","data-v-f9d9c4da"]]);export{be as default};
