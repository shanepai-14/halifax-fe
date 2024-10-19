import{g as S,a as D,s as R,N as k,_ as p,r as L,u as E,c as U,f as A,h as w,T as v,j as d,d as F,S as W,e as z}from"./index-J2ZmRp0j.js";function B(e){return D("MuiFormControlLabel",e)}const t=S("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),H=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","required","slotProps","value"],I=e=>{const{classes:o,disabled:r,labelPlacement:n,error:a,required:l}=e,m={root:["root",r&&"disabled",`labelPlacement${k(n)}`,a&&"error",l&&"required"],label:["label",r&&"disabled"],asterisk:["asterisk",a&&"error"]};return z(m,B,o)},G=R("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:r}=e;return[{[`& .${t.label}`]:o.label},o.root,o[`labelPlacement${k(r.labelPlacement)}`]]}})(({theme:e,ownerState:o})=>p({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${t.disabled}`]:{cursor:"default"}},o.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},o.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},o.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${t.label}`]:{[`&.${t.disabled}`]:{color:(e.vars||e).palette.text.disabled}}})),J=R("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,o)=>o.asterisk})(({theme:e})=>({[`&.${t.error}`]:{color:(e.vars||e).palette.error.main}})),O=L.forwardRef(function(o,r){var n,a;const l=E({props:o,name:"MuiFormControlLabel"}),{className:m,componentsProps:q={},control:i,disabled:C,disableTypography:$,label:j,labelPlacement:N="end",required:h,slotProps:T={}}=l,_=U(l,H),b=A(),y=(n=C??i.props.disabled)!=null?n:b==null?void 0:b.disabled,u=h??i.props.required,x={disabled:y,required:u};["checked","name","onChange","value","inputRef"].forEach(c=>{typeof i.props[c]>"u"&&typeof l[c]<"u"&&(x[c]=l[c])});const M=w({props:l,muiFormControl:b,states:["error"]}),f=p({},l,{disabled:y,labelPlacement:N,required:u,error:M.error}),g=I(f),P=(a=T.typography)!=null?a:q.typography;let s=j;return s!=null&&s.type!==v&&!$&&(s=d.jsx(v,p({component:"span"},P,{className:F(g.label,P==null?void 0:P.className),children:s}))),d.jsxs(G,p({className:F(g.root,m),ownerState:f,ref:r},_,{children:[L.cloneElement(i,x),u?d.jsxs(W,{display:"block",children:[s,d.jsxs(J,{ownerState:f,"aria-hidden":!0,className:g.asterisk,children:[" ","*"]})]}):s]}))});export{O as F};
