import{_ as d,k as l,o,c as n,d as e,l as r,p as c,f as p,g as a,a as u}from"./index.53eb19ee.js";const h={},t=i=>(c("data-v-12056e02"),i=i(),p(),i),_={class:"grid"},v={class:"col-12"},m={class:"card docs"},f=t(()=>e("h3",null,"Current Version",-1)),g=t(()=>e("p",null,"Vue 3 and PrimeVue 3",-1)),b=t(()=>e("h5",null,"Getting Started",-1)),y=t(()=>e("p",null,[a("Sakai is an application template for Vue based on the "),e("a",{href:"https://cli.vuejs.org/",class:"font-medium"},"Vue CLI"),a(" that provides out-of-the-box standard tooling for Vue projects. To get started, clone the "),e("a",{href:"https://github.com/primefaces/sakai-vue",class:"font-medium"},"repository"),a(" from GitHub and install the dependencies with npm or yarn.")],-1)),k=t(()=>e("code",null,`\r
npm install\r
\r
`,-1)),w=[k],S=a(" or "),x=t(()=>e("code",null,`\r
yarn\r
\r
`,-1)),V=[x],A=t(()=>e("p",null,[a("Next step is running the application using the serve script and navigate to "),e("i",null,"http://localhost:8080/"),a(" to view the application. That is it, you may now start with the development of your application using the Sakai template.")],-1)),I=t(()=>e("code",null,`\r
npm run serve\r
\r
`,-1)),D=[I],M=t(()=>e("h5",null,"Vue CLI Scripts",-1)),$=t(()=>e("p",null,"Following commands are derived from create-app-app.",-1)),P=t(()=>e("code",null,`\r
"npm run serve": Starts the development server\r
"npm run build": Builds the application for deployment.\r
"npm run lint": Executes the lint checks.\r
"npm run test:unit": Runs the tests.\r
\r
`,-1)),z=[P],B=u("<h5 data-v-12056e02>Structure</h5><p data-v-12056e02>Sakai consists of 2 main parts; the application layout and the resources. <i data-v-12056e02>App.vue</i> inside src folder is the main component containing the template for the base layout whereas required resources such as SASS structure for the layout are placed inside the <b data-v-12056e02>src/assets/</b> folder.</p><h5 data-v-12056e02>Layout Components</h5><p data-v-12056e02>Main layout is the template of the <i data-v-12056e02>App.vue</i>, it is divided into a couple of child components such as topbar, menu and footer. Here is template of the <i data-v-12056e02>App.vue</i> component that implements the logic such as menu state, layout modes and so on. </p><h5 data-v-12056e02>Menu</h5><p data-v-12056e02>Menu is a separate component defined in <i data-v-12056e02>AppMenu.vue</i> file based on PrimeVue MenuModel API. In order to define the menuitems, navigate to data section of <i data-v-12056e02>App.vue</i> file and define your own model as a nested structure using the <i data-v-12056e02>menu</i> property.</p><h5 data-v-12056e02>Dependencies</h5><p data-v-12056e02>Dependencies of Sakai are listed below and needs to be added to package.json.</p>",8),C=a(""),N=t(()=>e("code",null,`\r
{\r
    "primevue": "~3.11.0",\r
    "primeicons": "~5.0.0",\r
    "primeflex": "~3.1.2",\r
}\r
\r
`,-1)),T=[C,N],j=t(()=>e("h5",null,"PrimeVue Theme",-1)),L=t(()=>e("p",null,"Sakai uses the free Saga, Arya and Vela themes which are distributed within PrimeVue, however it can be used with any PrimeVue theme as well such as material, tailwind and bootstrap.",-1)),E=t(()=>e("h5",null,"SASS Variables",-1)),G=t(()=>e("p",null,[a("In case you'd like to customize the layout variables, open "),e("i",null,"_variables.scss"),a(" file under src/layout folder. Saving the changes will be reflected instantly at your browser.")],-1)),H=t(()=>e("h6",null,"src/assets/_variables.scss",-1)),R=a(""),q=t(()=>e("code",null,`\r
$fontSize:1rem;\r
$borderRadius:12px;\r
$transitionDuration:.2s;\r
\r
`,-1)),F=[R,q];function J(i,K,O,Q,U,W){const s=l("code");return o(),n("div",_,[e("div",v,[e("div",m,[f,g,b,y,r((o(),n("pre",null,w)),[[s,void 0,void 0,{script:!0}]]),S,r((o(),n("pre",null,V)),[[s,void 0,void 0,{script:!0}]]),A,r((o(),n("pre",null,D)),[[s,void 0,void 0,{script:!0}]]),M,$,r((o(),n("pre",null,z)),[[s,void 0,void 0,{script:!0}]]),B,r((o(),n("pre",null,T)),[[s,void 0,void 0,{script:!0}]]),j,L,E,G,H,r((o(),n("pre",null,F)),[[s,void 0,void 0,{css:!0}]])])])])}var Y=d(h,[["render",J],["__scopeId","data-v-12056e02"]]);export{Y as default};
