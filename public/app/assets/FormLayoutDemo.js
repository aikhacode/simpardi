import{_,r as t,o as r,c as m,d as e,e as s}from"./index.js";const h={data(){return{dropdownItems:[{name:"Option 1",code:"Option 1"},{name:"Option 2",code:"Option 2"},{name:"Option 3",code:"Option 3"}],dropdownItem:null}}},p={class:"grid"},f={class:"col-12 md:col-6"},u={class:"card p-fluid"},v=e("h5",null,"Vertical",-1),b={class:"field"},x=e("label",{for:"name1"},"Name",-1),y={class:"field"},g=e("label",{for:"email1"},"Email",-1),w={class:"field"},I=e("label",{for:"age1"},"Age",-1),O={class:"card p-fluid"},V=e("h5",null,"Vertical Grid",-1),B={class:"formgrid grid"},E={class:"field col"},L=e("label",{for:"name2"},"Name",-1),N={class:"field col"},T=e("label",{for:"email2"},"Email",-1),F={class:"col-12 md:col-6"},z={class:"card p-fluid"},A=e("h5",null,"Horizontal",-1),D={class:"field grid"},S=e("label",{for:"name3",class:"col-12 mb-2 md:col-2 md:mb-0"},"Name",-1),k={class:"col-12 md:col-10"},C={class:"field grid"},H=e("label",{for:"email3",class:"col-12 mb-2 md:col-2 md:mb-0"},"Email",-1),U={class:"col-12 md:col-10"},G={class:"card"},Z=e("h5",null,"Inline",-1),$={class:"formgroup-inline"},j={class:"field"},q=e("label",{for:"firstname1",class:"p-sr-only"},"Firstname",-1),J={class:"field"},K=e("label",{for:"lastname1",class:"p-sr-only"},"Lastname",-1),M={class:"card"},P=e("h5",null,"Help Text",-1),Q={class:"field p-fluid"},R=e("label",{for:"username"},"Username",-1),W=e("small",null,"Enter your username to reset your password.",-1),X={class:"col-12"},Y={class:"card"},ee=e("h5",null,"Advanced",-1),se={class:"p-fluid formgrid grid"},oe={class:"field col-12 md:col-6"},te=e("label",{for:"firstname2"},"Firstname",-1),de={class:"field col-12 md:col-6"},le=e("label",{for:"lastname2"},"Lastname",-1),ie={class:"field col-12"},ce=e("label",{for:"address"},"Address",-1),ne={class:"field col-12 md:col-6"},ae=e("label",{for:"city"},"City",-1),_e={class:"field col-12 md:col-3"},re=e("label",{for:"state"},"State",-1),me={class:"field col-12 md:col-3"},he=e("label",{for:"zip"},"Zip",-1);function pe(fe,l,ue,ve,d,be){const o=t("InputText"),i=t("Button"),c=t("Textarea"),n=t("Dropdown");return r(),m("div",p,[e("div",f,[e("div",u,[v,e("div",b,[x,s(o,{id:"name1",type:"text"})]),e("div",y,[g,s(o,{id:"email1",type:"text"})]),e("div",w,[I,s(o,{id:"age1",type:"text"})])]),e("div",O,[V,e("div",B,[e("div",E,[L,s(o,{id:"name2",type:"text"})]),e("div",N,[T,s(o,{id:"email2",type:"text"})])])])]),e("div",F,[e("div",z,[A,e("div",D,[S,e("div",k,[s(o,{id:"name3",type:"text"})])]),e("div",C,[H,e("div",U,[s(o,{id:"email3",type:"text"})])])]),e("div",G,[Z,e("div",$,[e("div",j,[q,s(o,{id:"firstname1",type:"text",placeholder:"Firstname"})]),e("div",J,[K,s(o,{id:"lastname1",type:"text",placeholder:"Lastname"})]),s(i,{label:"Submit"})])]),e("div",M,[P,e("div",Q,[R,s(o,{id:"username",type:"text"}),W])])]),e("div",X,[e("div",Y,[ee,e("div",se,[e("div",oe,[te,s(o,{id:"firstname2",type:"text"})]),e("div",de,[le,s(o,{id:"lastname2",type:"text"})]),e("div",ie,[ce,s(c,{id:"address",rows:"4"})]),e("div",ne,[ae,s(o,{id:"city",type:"text"})]),e("div",_e,[re,s(n,{id:"state",modelValue:d.dropdownItem,"onUpdate:modelValue":l[0]||(l[0]=a=>d.dropdownItem=a),options:d.dropdownItems,optionLabel:"name",placeholder:"Select One"},null,8,["modelValue","options"])]),e("div",me,[he,s(o,{id:"zip",type:"text"})])])])])])}var ye=_(h,[["render",pe]]);export{ye as default};
