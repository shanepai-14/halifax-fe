import{g as _,a as $,aZ as y,Y as j,s as M,T as N,N as h,_ as i,r as x,u as P,c as U,a_ as z,Z as W,j as E,d as H,e as Z}from"./index-VIGZPWaT.js";function I(o){return $("MuiLink",o)}const O=_("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),g={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Y=o=>g[o]||o,q=({theme:o,ownerState:e})=>{const n=Y(e.color),s=y(o,`palette.${n}`,!1)||e.color,r=y(o,`palette.${n}Channel`);return"vars"in o&&r?`rgba(${r} / 0.4)`:j(s,.4)},w=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],G=o=>{const{classes:e,component:n,focusVisible:s,underline:r}=o,t={root:["root",`underline${h(r)}`,n==="button"&&"button",s&&"focusVisible"]};return Z(t,I,e)},J=M(N,{name:"MuiLink",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:n}=o;return[e.root,e[`underline${h(n.underline)}`],n.component==="button"&&e.button]}})(({theme:o,ownerState:e})=>i({},e.underline==="none"&&{textDecoration:"none"},e.underline==="hover"&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},e.underline==="always"&&i({textDecoration:"underline"},e.color!=="inherit"&&{textDecorationColor:q({theme:o,ownerState:e})},{"&:hover":{textDecorationColor:"inherit"}}),e.component==="button"&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${O.focusVisible}`]:{outline:"auto"}})),Q=x.forwardRef(function(e,n){const s=P({props:e,name:"MuiLink"}),{className:r,color:t="primary",component:c="a",onBlur:u,onFocus:d,TypographyClasses:C,underline:k="always",variant:p="inherit",sx:l}=s,V=U(s,w),{isFocusVisibleRef:f,onBlur:F,onFocus:L,ref:R}=z(),[v,b]=x.useState(!1),D=W(n,R),T=a=>{F(a),f.current===!1&&b(!1),u&&u(a)},A=a=>{L(a),f.current===!0&&b(!0),d&&d(a)},m=i({},s,{color:t,component:c,focusVisible:v,underline:k,variant:p}),B=G(m);return E.jsx(J,i({color:t,className:H(B.root,r),classes:C,component:c,onBlur:T,onFocus:A,ref:D,ownerState:m,variant:p,sx:[...Object.keys(g).includes(t)?[]:[{color:t}],...Array.isArray(l)?l:[l]]},V))});export{Q as L};