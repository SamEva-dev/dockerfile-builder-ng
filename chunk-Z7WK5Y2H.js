import{Ga as v,I as A,Ia as M,l as h}from"./chunk-2ZZAZF3K.js";import{$ as n,Ba as c,Ib as y,Jb as g,W as u,X as a,Z as p,bb as d,cb as l,dc as E,fb as f,ua as s,vb as m,wb as b}from"./chunk-MXPEK2PN.js";var N=`
    .p-buttongroup {
        display: inline-flex;
    }

    .p-buttongroup .p-button {
        margin: 0;
    }

    .p-buttongroup .p-button:not(:last-child),
    .p-buttongroup .p-button:not(:last-child):hover {
        border-inline-end: 0 none;
    }

    .p-buttongroup .p-button:not(:first-of-type):not(:last-of-type) {
        border-radius: 0;
    }

    .p-buttongroup .p-button:first-of-type:not(:only-of-type) {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-buttongroup .p-button:last-of-type:not(:only-of-type) {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }

    .p-buttongroup .p-button:focus {
        position: relative;
        z-index: 1;
    }
`;var I=["*"],_=`
    ${N}

    /* For PrimeNG */
    .p-buttongroup p-button:focus .p-button {
        position: relative;
        z-index: 1;
    }

    .p-buttongroup p-button:not(:last-child) .p-button,
    .p-buttongroup p-button:not(:last-child) .p-button:hover {
        border-right: 0 none;
    }

    .p-buttongroup p-button:not(:first-of-type):not(:last-of-type) .p-button {
        border-radius: 0;
    }

    .p-buttongroup p-button:first-of-type:not(:only-of-type) .p-button {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-buttongroup p-button:last-of-type:not(:only-of-type) .p-button {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }
`,T={root:"p-buttongroup p-component"},x=(()=>{class t extends v{name="buttongroup";theme=_;classes=T;static \u0275fac=(()=>{let e;return function(i){return(e||(e=s(t)))(i||t)}})();static \u0275prov=u({token:t,factory:t.\u0275fac})}return t})();var S=(()=>{class t extends M{_componentStyle=n(x);static \u0275fac=(()=>{let e;return function(i){return(e||(e=s(t)))(i||t)}})();static \u0275cmp=d({type:t,selectors:[["p-buttonGroup"],["p-buttongroup"],["p-button-group"]],features:[E([x]),f],ngContentSelectors:I,decls:2,vars:0,consts:[["role","group",1,"p-buttongroup","p-component"]],template:function(r,i){r&1&&(y(),m(0,"span",0),g(1),b())},dependencies:[h],encapsulation:2,changeDetection:0})}return t})(),$=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=l({type:t});static \u0275inj=a({imports:[S]})}return t})();var o;function H(){if(o==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return o=!1,o;if("scrollBehavior"in document.documentElement.style)o=!0;else{let t=Element.prototype.scrollTo;t?o=!/\{\s*\[native code\]\s*\}/.test(t.toString()):o=!1}}return o}function q(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var C=new p("MATERIAL_ANIMATIONS");var D=null;function R(){return n(C,{optional:!0})?.animationsDisabled||n(c,{optional:!0})==="NoopAnimations"?"di-disabled":(D??=n(A).matchMedia("(prefers-reduced-motion)").matches,D?"reduced-motion":"enabled")}function pt(){return R()!=="enabled"}function dt(t){return t==null?"":typeof t=="string"?t:`${t}px`}function yt(t){return t!=null&&`${t}`!="false"}export{H as a,q as b,pt as c,dt as d,yt as e,S as f,$ as g};
