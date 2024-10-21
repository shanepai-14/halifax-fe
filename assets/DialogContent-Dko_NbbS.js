import{g as k,a as W,r as d,s as u,aC as V,at as q,N as n,_ as r,X as T,u as w,l as G,c as R,E as J,j as l,d as m,e as j,ai as Q}from"./index-CsnMuw79.js";function Z(o){return W("MuiDialog",o)}const D=k("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),oo=d.createContext({}),ao=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],eo=u(V,{name:"MuiDialog",slot:"Backdrop",overrides:(o,a)=>a.backdrop})({zIndex:-1}),io=o=>{const{classes:a,scroll:e,maxWidth:i,fullWidth:t,fullScreen:p}=o,c={root:["root"],container:["container",`scroll${n(e)}`],paper:["paper",`paperScroll${n(e)}`,`paperWidth${n(String(i))}`,t&&"paperFullWidth",p&&"paperFullScreen"]};return j(c,Z,a)},ro=u(q,{name:"MuiDialog",slot:"Root",overridesResolver:(o,a)=>a.root})({"@media print":{position:"absolute !important"}}),to=u("div",{name:"MuiDialog",slot:"Container",overridesResolver:(o,a)=>{const{ownerState:e}=o;return[a.container,a[`scroll${n(e.scroll)}`]]}})(({ownerState:o})=>r({height:"100%","@media print":{height:"auto"},outline:0},o.scroll==="paper"&&{display:"flex",justifyContent:"center",alignItems:"center"},o.scroll==="body"&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),so=u(T,{name:"MuiDialog",slot:"Paper",overridesResolver:(o,a)=>{const{ownerState:e}=o;return[a.paper,a[`scrollPaper${n(e.scroll)}`],a[`paperWidth${n(String(e.maxWidth))}`],e.fullWidth&&a.paperFullWidth,e.fullScreen&&a.paperFullScreen]}})(({theme:o,ownerState:a})=>r({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},a.scroll==="paper"&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},a.scroll==="body"&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!a.maxWidth&&{maxWidth:"calc(100% - 64px)"},a.maxWidth==="xs"&&{maxWidth:o.breakpoints.unit==="px"?Math.max(o.breakpoints.values.xs,444):`max(${o.breakpoints.values.xs}${o.breakpoints.unit}, 444px)`,[`&.${D.paperScrollBody}`]:{[o.breakpoints.down(Math.max(o.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}},a.maxWidth&&a.maxWidth!=="xs"&&{maxWidth:`${o.breakpoints.values[a.maxWidth]}${o.breakpoints.unit}`,[`&.${D.paperScrollBody}`]:{[o.breakpoints.down(o.breakpoints.values[a.maxWidth]+32*2)]:{maxWidth:"calc(100% - 64px)"}}},a.fullWidth&&{width:"calc(100% - 64px)"},a.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${D.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),go=d.forwardRef(function(a,e){const i=w({props:a,name:"MuiDialog"}),t=G(),p={enter:t.transitions.duration.enteringScreen,exit:t.transitions.duration.leavingScreen},{"aria-describedby":c,"aria-labelledby":x,BackdropComponent:h,BackdropProps:N,children:F,className:U,disableEscapeKeyDown:y=!1,fullScreen:A=!1,fullWidth:E=!1,maxWidth:_="sm",onBackdropClick:P,onClick:M,onClose:b,open:$,PaperComponent:I=T,PaperProps:B={},scroll:L="paper",TransitionComponent:X=Q,transitionDuration:S=p,TransitionProps:Y}=i,z=R(i,ao),g=r({},i,{disableEscapeKeyDown:y,fullScreen:A,fullWidth:E,maxWidth:_,scroll:L}),f=io(g),C=d.useRef(),H=s=>{C.current=s.target===s.currentTarget},K=s=>{M&&M(s),C.current&&(C.current=null,P&&P(s),b&&b(s,"backdropClick"))},v=J(x),O=d.useMemo(()=>({titleId:v}),[v]);return l.jsx(ro,r({className:m(f.root,U),closeAfterTransition:!0,components:{Backdrop:eo},componentsProps:{backdrop:r({transitionDuration:S,as:h},N)},disableEscapeKeyDown:y,onClose:b,open:$,ref:e,onClick:K,ownerState:g},z,{children:l.jsx(X,r({appear:!0,in:$,timeout:S,role:"presentation"},Y,{children:l.jsx(to,{className:m(f.container),onMouseDown:H,ownerState:g,children:l.jsx(so,r({as:I,elevation:24,role:"dialog","aria-describedby":c,"aria-labelledby":v},B,{className:m(f.paper,B.className),ownerState:g,children:l.jsx(oo.Provider,{value:O,children:F})}))})}))}))});function lo(o){return W("MuiDialogContent",o)}k("MuiDialogContent",["root","dividers"]);function mo(o){return W("MuiDialogTitle",o)}const no=k("MuiDialogTitle",["root"]),po=["className","dividers"],co=o=>{const{classes:a,dividers:e}=o;return j({root:["root",e&&"dividers"]},lo,a)},uo=u("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:e}=o;return[a.root,e.dividers&&a.dividers]}})(({theme:o,ownerState:a})=>r({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},a.dividers?{padding:"16px 24px",borderTop:`1px solid ${(o.vars||o).palette.divider}`,borderBottom:`1px solid ${(o.vars||o).palette.divider}`}:{[`.${no.root} + &`]:{paddingTop:0}})),ho=d.forwardRef(function(a,e){const i=w({props:a,name:"MuiDialogContent"}),{className:t,dividers:p=!1}=i,c=R(i,po),x=r({},i,{dividers:p}),h=co(x);return l.jsx(uo,r({className:m(h.root,t),ownerState:x,ref:e},c))});export{go as D,ho as a,oo as b,D as d,mo as g};