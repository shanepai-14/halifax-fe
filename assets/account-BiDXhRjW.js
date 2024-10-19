import{r as o,$,_ as A,j as e,X as L,G as c,A as W,T as y,B as N,at as D,F as M,C as O,V as R}from"./index-J2ZmRp0j.js";import{C as B}from"./Container-Bbar7_yA.js";import{T as g,S as P,M as U}from"./TextField-BU9sUyB-.js";import{I as k}from"./InputLabel-DACWEQnz.js";import{B as w}from"./Button-CzVtlHTw.js";import{R as E}from"./EditOutlined-BrPEsPJg.js";import{R as V,a as H}from"./SearchOutlined-NpYSuTk0.js";import{T as F,a as J,e as G,c as T,d,b as _}from"./TableRow-B6-RbjxZ.js";import{R as X}from"./DeleteOutlined-Dcq2eSu1.js";import{D as q,a as K}from"./DialogContent-xT8Yr3t2.js";var Q={icon:{tag:"svg",attrs:{"fill-rule":"evenodd",viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"}}]},name:"close",theme:"outlined"},Y=function(m,u){return o.createElement($,A({},m,{ref:u,icon:Q}))},Z=o.forwardRef(Y),ee={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"}}]},name:"save",theme:"outlined"},te=function(m,u){return o.createElement($,A({},m,{ref:u,icon:ee}))},ae=o.forwardRef(te);const se=["admin","sales","staff"],le=({initialUserData:n,onSave:m,onCancel:u})=>{const[a,C]=o.useState(n),[l,f]=o.useState(!n.id);o.useEffect(()=>{C(n),f(!n.id)},[n]);const x=s=>{const{name:i,value:p}=s.target;C({...a,[i]:p})},b=()=>{l&&m(a),f(!l)},v=(s,i)=>`${(s==null?void 0:s.charAt(0))||""}${(i==null?void 0:i.charAt(0))||""}`.toUpperCase(),I=s=>{if(!s)return"#000000";let i=0;for(let h=0;h<s.length;h++)i=s.charCodeAt(h)+((i<<5)-i);let p="#";for(let h=0;h<3;h++){const t=i>>h*8&255;p+=`00${t.toString(16)}`.slice(-2)}return p};return e.jsx(B,{maxWidth:"xxl",sx:{mt:0,p:"0!important"},children:e.jsxs(L,{elevation:3,sx:{p:0},children:[e.jsxs(c,{container:!0,spacing:3,sx:{p:"0!important"},alignItems:"center",children:[e.jsx(c,{item:!0,xs:12,md:4,sx:{display:"flex",justifyContent:"center"},children:e.jsx(W,{sx:{width:150,height:150,fontSize:60,bgcolor:I(`${a.firstName||""} ${a.lastName||""}`)},children:v(a.firstName,a.lastName)})}),e.jsxs(c,{item:!0,xs:12,md:8,children:[e.jsxs(y,{variant:"h4",gutterBottom:!0,children:[a.firstName," ",a.lastName]}),e.jsx(y,{variant:"subtitle1",color:"textSecondary",gutterBottom:!0,children:a.email}),a&&e.jsx(N,{sx:{display:"inline-block",bgcolor:"primary.main",color:"white",px:2,py:.5,borderRadius:1,textTransform:"capitalize"},children:a.role})]})]}),e.jsx(D,{sx:{my:4}}),e.jsxs(c,{container:!0,spacing:3,children:[e.jsx(c,{item:!0,xs:12,sm:6,children:e.jsx(g,{fullWidth:!0,label:"First Name",name:"firstName",value:a.firstName||"",onChange:x,disabled:!l})}),e.jsx(c,{item:!0,xs:12,sm:6,children:e.jsx(g,{fullWidth:!0,label:"Last Name",name:"lastName",value:a.lastName||"",onChange:x,disabled:!l})}),e.jsx(c,{item:!0,xs:12,children:e.jsx(g,{fullWidth:!0,label:"Email",name:"email",value:a.email||"",onChange:x,disabled:!l})}),e.jsx(c,{item:!0,xs:12,children:e.jsxs(M,{fullWidth:!0,disabled:!l,children:[e.jsx(k,{children:"Role"}),e.jsx(P,{name:"role",value:a.role||"",onChange:x,label:"Role",children:se.map(s=>e.jsx(U,{value:s,sx:{textTransform:"capitalize"},children:s},s))})]})}),e.jsx(c,{item:!0,xs:12,children:e.jsx(g,{fullWidth:!0,label:"Phone",name:"phone",value:a.phone||"",onChange:x,disabled:!l})}),e.jsx(c,{item:!0,xs:12,children:e.jsx(g,{fullWidth:!0,label:"Address",name:"address",value:a.address||"",onChange:x,disabled:!l,multiline:!0,rows:2})})]}),e.jsxs(N,{sx:{mt:4,display:"flex",justifyContent:"flex-end"},children:[e.jsx(w,{variant:"outlined",onClick:u,startIcon:e.jsx(Z,{}),sx:{mr:2},children:"Cancel"}),e.jsx(w,{variant:"contained",color:l?"success":"primary",onClick:b,startIcon:l?e.jsx(ae,{}):e.jsx(E,{}),children:l?"Save Changes":"Edit Profile"})]})]})})},ne=[{id:1,firstName:"John",lastName:"Doe",email:"john.doe@example.com",role:"admin",phone:"123-456-7890",address:"123 Main St, Anytown, AN 12345"},{id:2,firstName:"Jane",lastName:"Smith",email:"jane.smith@example.com",role:"sales",phone:"234-567-8901",address:"456 Oak Rd, Somewhere, SW 23456"},{id:3,firstName:"Bob",lastName:"Johnson",email:"bob.johnson@example.com",role:"staff",phone:"345-678-9012",address:"789 Pine Ave, Nowhere, NW 34567"}],je=()=>{const[n,m]=o.useState(ne),[u,a]=o.useState(!1),[C,l]=o.useState(null),[f,x]=o.useState(""),b=(t=null)=>{l(t),a(!0)},v=()=>{a(!1),l(null)},I=t=>{m(n.filter(r=>r.id!==t))},s=t=>{if(t.id)m(n.map(r=>r.id===t.id?t:r));else{const r={...t,id:Math.max(...n.map(S=>S.id))+1};m([...n,r])}v()},i=(t,r)=>`${t.charAt(0)}${r.charAt(0)}`.toUpperCase(),p=t=>{let r=0;for(let j=0;j<t.length;j++)r=t.charCodeAt(j)+((r<<5)-r);let S="#";for(let j=0;j<3;j++){const z=r>>j*8&255;S+=`00${z.toString(16)}`.slice(-2)}return S},h=n.filter(t=>t.firstName.toLowerCase().includes(f.toLowerCase())||t.lastName.toLowerCase().includes(f.toLowerCase())||t.email.toLowerCase().includes(f.toLowerCase()));return e.jsxs(B,{maxWidth:"xxl",sx:{mt:0,p:"0!important"},children:[e.jsxs(N,{sx:{mb:2,display:"flex",justifyContent:"space-between"},children:[e.jsx(g,{label:"Search Users",variant:"outlined",size:"small",value:f,onChange:t=>x(t.target.value),InputProps:{startAdornment:e.jsx(V,{style:{color:"action.active",marginRight:8}})}}),e.jsx(w,{variant:"contained",startIcon:e.jsx(H,{}),color:"error",onClick:()=>b(),children:"Add New User"})]}),e.jsx(F,{component:L,children:e.jsxs(J,{children:[e.jsx(G,{children:e.jsxs(T,{children:[e.jsx(d,{children:"User"}),e.jsx(d,{children:"Email"}),e.jsx(d,{children:"Role"}),e.jsx(d,{children:"Phone"}),e.jsx(d,{align:"right",children:"Actions"})]})}),e.jsx(_,{children:h.map(t=>e.jsxs(T,{children:[e.jsx(d,{children:e.jsxs(N,{sx:{display:"flex",alignItems:"center"},children:[e.jsx(W,{sx:{bgcolor:p(`${t.firstName} ${t.lastName}`),mr:2},children:i(t.firstName,t.lastName)}),t.firstName," ",t.lastName]})}),e.jsx(d,{children:t.email}),e.jsx(d,{children:e.jsx(O,{label:t.role,color:t.role==="admin"?"error":t.role==="sales"?"primary":"default"})}),e.jsx(d,{children:t.phone}),e.jsxs(d,{align:"right",children:[e.jsx(R,{onClick:()=>b(t),children:e.jsx(E,{})}),e.jsx(R,{onClick:()=>I(t.id),children:e.jsx(X,{})})]})]},t.id))})]})}),e.jsx(q,{open:u,onClose:v,fullWidth:!0,maxWidth:"md",children:e.jsx(K,{children:e.jsx(le,{initialUserData:C||{},onSave:s,onCancel:v})})})]})};export{je as default};