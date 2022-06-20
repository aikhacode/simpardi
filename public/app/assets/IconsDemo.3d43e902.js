import{_ as h,r as f,k as g,o as s,c as o,d as e,l as a,e as v,i as b,j as k,p as x,f as y,g as i,n as I,t as w}from"./index.53eb19ee.js";const S={data(){return{icons:null,filter:null}},mounted(){fetch("data/icons.json",{headers:{"Cache-Control":"no-cache"}}).then(n=>n.json()).then(n=>{let u=n.icons.filter(l=>l.icon.tags.indexOf("deprecate")===-1);u.sort((l,c)=>l.properties.name<c.properties.name?-1:l.properties.name<c.properties.name?1:0),this.icons=u})},computed:{filteredIcons(){return this.filter?this.icons.filter(n=>n.properties.name.indexOf(this.filter.toLowerCase())>-1):this.icons}}},t=n=>(x("data-v-6ed1b848"),n=n(),y(),n),P={class:"card"},z=t(()=>e("h3",null,"Icons",-1)),D=t(()=>e("p",null,[i("PrimeVue components internally use "),e("a",{href:"https://github.com/primefaces/primeicons",class:"font-medium"},"PrimeIcons"),i(" library, the official icons suite from "),e("a",{href:"https://www.primetek.com.tr",class:"font-medium"},"PrimeTek"),i(".")],-1)),V=t(()=>e("h5",null,"Download",-1)),C=t(()=>e("p",null,"PrimeIcons is available at npm, run the following command to download it to your project.",-1)),T=t(()=>e("code",null,`\r
npm install primeicons --save\r
\r
`,-1)),j=[T],E=t(()=>e("h5",null,"Getting Started",-1)),A=t(()=>e("p",null,[i("PrimeIcons use the "),e("strong",null,"pi pi-{icon}"),i(" syntax such as "),e("strong",null,"pi pi-check"),i(". A standalone icon can be displayed using an element like "),e("i",null,"i"),i(" or "),e("i",null,"span")],-1)),B=t(()=>e("code",null,`\r
<i class="pi pi-check"></i>\r
<i class="pi pi-times"></i>\r
\r
`,-1)),L=[B],M=t(()=>e("i",{class:"pi pi-check",style:{"margin-right":".5rem"}},null,-1)),N=t(()=>e("i",{class:"pi pi-times"},null,-1)),F=t(()=>e("h5",null,"Size",-1)),H=t(()=>e("p",null,"Size of the icons can easily be changed using font-size property.",-1)),O=t(()=>e("code",null,`\r
<i class="pi pi-check"></i>\r
\r
`,-1)),R=[O],U=t(()=>e("i",{class:"pi pi-check"},null,-1)),q=t(()=>e("code",null,`\r
<i class="pi pi-check" style="font-size: 2rem"></i>\r
\r
`,-1)),G=[q],Y=t(()=>e("i",{class:"pi pi-check",style:{"font-size":"2rem"}},null,-1)),$=t(()=>e("h5",null,"Spinning Animation",-1)),J=t(()=>e("p",null,"Special pi-spin class applies continuous rotation to an icon.",-1)),K=t(()=>e("code",null,`\r
<i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>\r
\r
`,-1)),Q=[K],W=t(()=>e("i",{class:"pi pi-spin pi-spinner",style:{"font-size":"2rem"}},null,-1)),X=t(()=>e("h5",null,"Constants",-1)),Z=t(()=>e("p",null,"PrimeIcons constants API is provided to easily choose an icon with typescript e.g. when defining a menu model.",-1)),ee=t(()=>e("code",null,`\r
<Menu :model="items" />\r
\r
`,-1)),te=[ee],ne=t(()=>e("code",null,`\r
import {PrimeIcons} from 'primevue/api';\r
\r
export default {\r
	data() {\r
		return {\r
			items: [\r
				{\r
					label: 'Update',\r
					icon: PrimeIcons.REFRESH,\r
                    to: '/update'\r
				},\r
				{\r
					label: 'Delete',\r
					icon: PrimeIcons.TIMES,\r
                    to: '/delete'\r
				}\r
			]\r
		}\r
	}\r
}\r
\r
`,-1)),se=[ne],oe=t(()=>e("h5",null,"List of Icons",-1)),ie=t(()=>e("p",null,[i("Here is the current list of PrimeIcons, more icons are added periodically. You may also "),e("a",{href:"https://github.com/primefaces/primeicons/issues",class:"font-medium"},"request new icons"),i(" at the issue tracker.")],-1)),re={class:"grid icons-list text-center"};function ae(n,d,u,l,c,_){const m=f("InputText"),r=g("code");return s(),o("div",null,[e("div",P,[z,D,V,C,a((s(),o("pre",null,j)),[[r]]),E,A,a((s(),o("pre",null,L)),[[r]]),M,N,F,H,a((s(),o("pre",null,R)),[[r]]),U,a((s(),o("pre",null,G)),[[r]]),Y,$,J,a((s(),o("pre",null,Q)),[[r]]),W,X,Z,a((s(),o("pre",null,te)),[[r]]),a((s(),o("pre",null,se)),[[r,void 0,void 0,{script:!0}]]),oe,ie,v(m,{modelValue:c.filter,"onUpdate:modelValue":d[0]||(d[0]=p=>c.filter=p),class:"w-full p-3 mt-3 mb-5",placeholder:"Search an icon"},null,8,["modelValue"]),e("div",re,[(s(!0),o(b,null,k(_.filteredIcons,p=>(s(),o("div",{class:"col-6 sm:col-4 lg:col-3 xl:col-2 pb-5",key:p.properties.name},[e("i",{class:I("text-2xl mb-2 pi pi-"+p.properties.name)},null,2),e("div",null,"pi-"+w(p.properties.name),1)]))),128))])])])}var ce=h(S,[["render",ae],["__scopeId","data-v-6ed1b848"]]);export{ce as default};
