import{P as g}from"./ProductService.232c8ba0.js";import{_ as y,r as c,k as C,o as w,c as k,a as e,b as i,w as n,l as v,e as S,t as x}from"./index.13009a81.js";var T="/app/images/nature/nature9.jpg";const D={data(){return{display:!1,displayConfirmation:!1,visibleLeft:!1,visibleRight:!1,visibleTop:!1,visibleBottom:!1,visibleFull:!1,products:null,selectedProduct:null}},productService:null,created(){this.productService=new g},mounted(){this.productService.getProductsSmall().then(r=>this.products=r)},methods:{open(){this.display=!0},close(){this.display=!1},openConfirmation(){this.displayConfirmation=!0},closeConfirmation(){this.displayConfirmation=!1},toggle(r){this.$refs.op.toggle(r)},toggleDataTable(r){this.$refs.op2.toggle(r)},formatCurrency(r){return r.toLocaleString("en-US",{style:"currency",currency:"USD"})},onProductSelect(r){this.$refs.op.hide(),this.$toast.add({severity:"info",summary:"Product Selected",detail:r.data.name,life:3e3})},confirm(r){this.$confirm.require({target:r.currentTarget,message:"Are you sure you want to proceed?",icon:"pi pi-exclamation-triangle",accept:()=>{this.$toast.add({severity:"info",summary:"Confirmed",detail:"You have accepted",life:3e3})},reject:()=>{this.$toast.add({severity:"error",summary:"Rejected",detail:"You have rejected",life:3e3})}})}}},P={class:"grid"},U={class:"col-12 lg:col-6"},I={class:"card p-fluid"},B=e("h5",null,"Dialog",-1),L=e("p",{class:"line-height-3 m-0"}," Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",-1),R={class:"card p-fluid"},q=e("h5",null,"Overlay Panel",-1),N={class:"grid formgrid"},j={class:"col-6"},F=e("img",{src:T,alt:"Nature 9"},null,-1),O={class:"col-6"},Z=["src","alt"],Y={class:"col-12 lg:col-6"},V={class:"card p-fluid"},A=e("h5",null,"Confirmation",-1),E=e("div",{class:"flex align-items-center justify-content-center"},[e("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}}),e("span",null,"Are you sure you want to proceed?")],-1),z={class:"card"},M=e("h5",null,"Sidebar",-1),G=e("h1",{style:{"font-weight":"normal"}},"Left Sidebar",-1),H=e("h1",{style:{"font-weight":"normal"}},"Right Sidebar",-1),J=e("h1",{style:{"font-weight":"normal"}},"Top Sidebar",-1),K=e("h1",{style:{"font-weight":"normal"}},"Bottom Sidebar",-1),Q=e("h1",{style:{"font-weight":"normal"}},"Full Screen",-1),W={class:"col-12 lg:col-6"},X={class:"card"},$=e("h5",null,"Tooltip",-1),ee={class:"formgroup-inline"},ie={class:"field"},te={class:"col-12 lg:col-6"},oe={class:"card"},le=e("h5",null,"ConfirmPopup",-1);function se(r,t,ne,re,l,a){const s=c("Button"),p=c("Dialog"),m=c("OverlayPanel"),u=c("Column"),f=c("DataTable"),d=c("Sidebar"),h=c("InputText"),_=c("ConfirmPopup"),b=C("tooltip");return w(),k("div",P,[e("div",U,[e("div",I,[B,i(p,{header:"Dialog",visible:l.display,"onUpdate:visible":t[0]||(t[0]=o=>l.display=o),breakpoints:{"960px":"75vw"},style:{width:"30vw"},modal:!0},{footer:n(()=>[i(s,{label:"Ok",onClick:a.close,icon:"pi pi-check",class:"p-button-outlined"},null,8,["onClick"])]),default:n(()=>[L]),_:1},8,["visible"]),i(s,{label:"Show",icon:"pi pi-external-link",style:{width:"auto"},onClick:a.open},null,8,["onClick"])]),e("div",R,[q,e("div",N,[e("div",j,[i(s,{type:"button",label:"Image",onClick:a.toggle,class:"p-button-success"},null,8,["onClick"]),i(m,{ref:"op",appendTo:"body",showCloseIcon:!0},{default:n(()=>[F]),_:1},512)]),e("div",O,[i(s,{type:"button",label:"DataTable",onClick:a.toggleDataTable,class:"p-button-success"},null,8,["onClick"]),i(m,{ref:"op2",appendTo:"body",showCloseIcon:!0,id:"overlay_panel",style:{width:"450px"}},{default:n(()=>[i(f,{value:l.products,selection:l.selectedProduct,"onUpdate:selection":t[1]||(t[1]=o=>l.selectedProduct=o),selectionMode:"single",paginator:!0,rows:5,onRowSelect:a.onProductSelect,responsiveLayout:"scroll"},{default:n(()=>[i(u,{field:"name",header:"Name",sortable:!0,headerStyle:"min-width:10rem;"}),i(u,{header:"Image",headerStyle:"min-width:10rem;"},{body:n(o=>[e("img",{src:"images/product/"+o.data.image,alt:o.data.image,width:"100",class:"shadow-2"},null,8,Z)]),_:1}),i(u,{field:"price",header:"Price",sortable:!0,headerStyle:"min-width:8rem;"},{body:n(o=>[S(x(a.formatCurrency(o.data.price)),1)]),_:1})]),_:1},8,["value","selection","onRowSelect"])]),_:1},512)])])])]),e("div",Y,[e("div",V,[A,i(s,{label:"Delete",icon:"pi pi-trash",class:"p-button-danger",style:{width:"auto"},onClick:a.openConfirmation},null,8,["onClick"]),i(p,{header:"Confirmation",visible:l.displayConfirmation,"onUpdate:visible":t[2]||(t[2]=o=>l.displayConfirmation=o),style:{width:"350px"},modal:!0},{footer:n(()=>[i(s,{label:"No",icon:"pi pi-times",onClick:a.closeConfirmation,class:"p-button-text"},null,8,["onClick"]),i(s,{label:"Yes",icon:"pi pi-check",onClick:a.closeConfirmation,class:"p-button-text",autofocus:""},null,8,["onClick"])]),default:n(()=>[E]),_:1},8,["visible"])]),e("div",z,[M,i(d,{visible:l.visibleLeft,"onUpdate:visible":t[3]||(t[3]=o=>l.visibleLeft=o),baseZIndex:1e3},{default:n(()=>[G]),_:1},8,["visible"]),i(d,{visible:l.visibleRight,"onUpdate:visible":t[4]||(t[4]=o=>l.visibleRight=o),baseZIndex:1e3,position:"right"},{default:n(()=>[H]),_:1},8,["visible"]),i(d,{visible:l.visibleTop,"onUpdate:visible":t[5]||(t[5]=o=>l.visibleTop=o),baseZIndex:1e3,position:"top"},{default:n(()=>[J]),_:1},8,["visible"]),i(d,{visible:l.visibleBottom,"onUpdate:visible":t[6]||(t[6]=o=>l.visibleBottom=o),baseZIndex:1e3,position:"bottom"},{default:n(()=>[K]),_:1},8,["visible"]),i(d,{visible:l.visibleFull,"onUpdate:visible":t[7]||(t[7]=o=>l.visibleFull=o),baseZIndex:1e3,position:"full"},{default:n(()=>[Q]),_:1},8,["visible"]),i(s,{icon:"pi pi-arrow-right",class:"p-button-warning",onClick:t[8]||(t[8]=o=>l.visibleLeft=!0),style:{"margin-right":".25em"}}),i(s,{icon:"pi pi-arrow-left",class:"p-button-warning",onClick:t[9]||(t[9]=o=>l.visibleRight=!0),style:{"margin-right":".25em"}}),i(s,{icon:"pi pi-arrow-down",class:"p-button-warning",onClick:t[10]||(t[10]=o=>l.visibleTop=!0),style:{"margin-right":".25em"}}),i(s,{icon:"pi pi-arrow-up",class:"p-button-warning",onClick:t[11]||(t[11]=o=>l.visibleBottom=!0),style:{"margin-right":".25em"}}),i(s,{icon:"pi pi-external-link",class:"p-button-warning",onClick:t[12]||(t[12]=o=>l.visibleFull=!0)})])]),e("div",W,[e("div",X,[$,e("div",ee,[e("div",ie,[v(i(h,{type:"text",placeholder:"Username"},null,512),[[b,"Your username"]])]),v(i(s,{type:"button",label:"Save",icon:"pi pi-check"},null,512),[[b,"Click to proceed"]])])])]),e("div",te,[e("div",oe,[le,i(_),i(s,{ref:"popup",onClick:t[13]||(t[13]=o=>a.confirm(o)),icon:"pi pi-check",label:"Confirm",class:"mr-2"},null,512)])])])}var de=y(D,[["render",se]]);export{de as default};
