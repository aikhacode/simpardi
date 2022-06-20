import{_ as s,E as t,o as i,c as l,a as n}from"./index.cb2347e1.js";import{P as a}from"./ProductService.232c8ba0.js";const r={data(){return{products:null,lineData:{labels:["January","February","March","April","May","June","July"],datasets:[{label:"Revenue",data:[65,59,80,81,56,55,40],fill:!1,backgroundColor:"#2f4860",borderColor:"#2f4860",tension:.4},{label:"Sales",data:[28,48,40,19,86,27,90],fill:!1,backgroundColor:"#00bb7e",borderColor:"#00bb7e",tension:.4}]},items:[{label:"Add New",icon:"pi pi-fw pi-plus"},{label:"Remove",icon:"pi pi-fw pi-minus"}],lineOptions:null}},productService:null,themeChangeListener:null,mounted(){this.productService.getProductsSmall().then(e=>this.products=e),this.themeChangeListener=e=>{e.dark?this.applyDarkTheme():this.applyLightTheme()},t.on("change-theme",this.themeChangeListener),this.isDarkTheme()?this.applyDarkTheme():this.applyLightTheme()},beforeUnmount(){t.off("change-theme",this.themeChangeListener)},created(){this.productService=new a},methods:{formatCurrency(e){return e.toLocaleString("en-US",{style:"currency",currency:"USD"})},isDarkTheme(){return this.$appState.darkTheme===!0},applyLightTheme(){this.lineOptions={plugins:{legend:{labels:{color:"#495057"}}},scales:{x:{ticks:{color:"#495057"},grid:{color:"#ebedef"}},y:{ticks:{color:"#495057"},grid:{color:"#ebedef"}}}}},applyDarkTheme(){this.lineOptions={plugins:{legend:{labels:{color:"#ebedef"}}},scales:{x:{ticks:{color:"#ebedef"},grid:{color:"rgba(160, 167, 181, .3)"}},y:{ticks:{color:"#ebedef"},grid:{color:"rgba(160, 167, 181, .3)"}}}}}}},c={class:"grid"},o=n('<div class="col-12 lg:col-6 xl:col-3"><div class="card mb-0"><div class="flex justify-content-between mb-3"><div><span class="block text-500 font-medium mb-3">Orders</span><div class="text-900 font-medium text-xl">152</div></div><div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem;"><i class="pi pi-shopping-cart text-blue-500 text-xl"></i></div></div><span class="text-green-500 font-medium">24 new </span><span class="text-500">since last visit</span></div></div><div class="col-12 lg:col-6 xl:col-3"><div class="card mb-0"><div class="flex justify-content-between mb-3"><div><span class="block text-500 font-medium mb-3">Revenue</span><div class="text-900 font-medium text-xl">$2.100</div></div><div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width:2.5rem;height:2.5rem;"><i class="pi pi-map-marker text-orange-500 text-xl"></i></div></div><span class="text-green-500 font-medium">%52+ </span><span class="text-500">since last week</span></div></div><div class="col-12 lg:col-6 xl:col-3"><div class="card mb-0"><div class="flex justify-content-between mb-3"><div><span class="block text-500 font-medium mb-3">Customers</span><div class="text-900 font-medium text-xl">28441</div></div><div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width:2.5rem;height:2.5rem;"><i class="pi pi-inbox text-cyan-500 text-xl"></i></div></div><span class="text-green-500 font-medium">520 </span><span class="text-500">newly registered</span></div></div><div class="col-12 lg:col-6 xl:col-3"><div class="card mb-0"><div class="flex justify-content-between mb-3"><div><span class="block text-500 font-medium mb-3">Comments</span><div class="text-900 font-medium text-xl">152 Unread</div></div><div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem;"><i class="pi pi-comment text-purple-500 text-xl"></i></div></div><span class="text-green-500 font-medium">85 </span><span class="text-500">responded</span></div></div>',4),d=[o];function m(e,p,u,h,v,b){return i(),l("div",c,d)}var g=s(r,[["render",m]]);export{g as default};
