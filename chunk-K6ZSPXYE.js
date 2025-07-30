import{a as St,b as Ft}from"./chunk-YUABFYP2.js";import{c as Ot,d as Pt}from"./chunk-G2M2UXHZ.js";import{g as It}from"./chunk-Z7WK5Y2H.js";import{Da as kt,Ea as st,Ga as L,Ia as A,Pa as X,Ra as lt,S as _t,Sa as Mt,Ta as Dt,Ua as Et,Va as Bt,Z as ot,_ as xt,ca as Ct,da as wt,ea as j,ja as at,k as gt,l as w,la as z,m as Z,va as rt,w as ht,x as yt,ya as Tt}from"./chunk-2ZZAZF3K.js";import{$ as p,Ab as q,Cc as N,Db as tt,Dc as vt,Eb as W,Gb as b,Hb as k,Ib as S,Jb as O,Kb as U,Lb as P,Mb as x,Nb as C,Ra as l,V as R,Vb as g,W as D,Wb as s,X as pt,Xb as v,bb as f,bc as et,cb as bt,dc as F,fa as K,fb as h,ga as H,gb as mt,ha as T,hb as Y,jc as nt,kc as it,pa as $,pc as m,qc as ft,rb as _,sb as E,sc as M,tb as B,ua as u,ub as I,vb as o,vc as G,wa as ut,wb as a,xb as y}from"./chunk-MXPEK2PN.js";var qt=["data-p-icon","chevron-left"],Nt=(()=>{class e extends X{static \u0275fac=(()=>{let t;return function(n){return(t||(t=u(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["","data-p-icon","chevron-left"]],features:[h],attrs:qt,decls:1,vars:0,consts:[["d","M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z","fill","currentColor"]],template:function(i,n){i&1&&(T(),q(0,"path",0))},encapsulation:2})}return e})();var Wt=["data-p-icon","chevron-right"],Lt=(()=>{class e extends X{static \u0275fac=(()=>{let t;return function(n){return(t||(t=u(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["","data-p-icon","chevron-right"]],features:[h],attrs:Wt,decls:1,vars:0,consts:[["d","M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z","fill","currentColor"]],template:function(i,n){i&1&&(T(),q(0,"path",0))},encapsulation:2})}return e})();var At=`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
    }

    .p-tabs-scrollable > .p-tablist {
        overflow: hidden;
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        background: dt('tabs.tablist.background');
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`;var Ut=["previcon"],Gt=["nexticon"],Zt=["content"],Xt=["prevButton"],Jt=["nextButton"],Yt=["inkbar"],te=["tabs"],Q=["*"];function ee(e,d){e&1&&tt(0)}function ne(e,d){if(e&1&&Y(0,ee,1,0,"ng-container",11),e&2){let t=k(2);I("ngTemplateOutlet",t.prevIconTemplate||t._prevIconTemplate)}}function ie(e,d){e&1&&(T(),y(0,"svg",10))}function oe(e,d){if(e&1){let t=W();o(0,"button",9,3),b("click",function(){K(t);let n=k();return H(n.onPrevButtonClick())}),E(2,ne,1,1,"ng-container")(3,ie,1,0,":svg:svg",10),a()}if(e&2){let t=k();g(t.cx("prevButton")),_("aria-label",t.prevButtonAriaLabel)("tabindex",t.tabindex())("data-pc-group-section","navigator"),l(2),B(t.prevIconTemplate||t._prevIconTemplate?2:3)}}function ae(e,d){e&1&&tt(0)}function re(e,d){if(e&1&&Y(0,ae,1,0,"ng-container",11),e&2){let t=k(2);I("ngTemplateOutlet",t.nextIconTemplate||t._nextIconTemplate)}}function se(e,d){e&1&&(T(),y(0,"svg",12))}function le(e,d){if(e&1){let t=W();o(0,"button",9,4),b("click",function(){K(t);let n=k();return H(n.onNextButtonClick())}),E(2,re,1,1,"ng-container")(3,se,1,0,":svg:svg",12),a()}if(e&2){let t=k();g(t.cx("nextButton")),_("aria-label",t.nextButtonAriaLabel)("tabindex",t.tabindex())("data-pc-group-section","navigator"),l(2),B(t.nextIconTemplate||t._nextIconTemplate?2:3)}}function ce(e,d){e&1&&O(0)}var de={root:({instance:e})=>["p-tabs p-component",{"p-tabs-scrollable":e.scrollable()}]},Vt=(()=>{class e extends L{name="tabs";theme=At;classes=de;static \u0275fac=(()=>{let t;return function(n){return(t||(t=u(e)))(n||e)}})();static \u0275prov=D({token:e,factory:e.\u0275fac})}return e})();var pe={root:"p-tablist",content:({instance:e})=>["p-tablist-content",{"p-tablist-viewport":e.scrollable()}],tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},Rt=(()=>{class e extends L{name="tablist";classes=pe;static \u0275fac=(()=>{let t;return function(n){return(t||(t=u(e)))(n||e)}})();static \u0275prov=D({token:e,factory:e.\u0275fac})}return e})();var Kt=(()=>{class e extends A{prevIconTemplate;nextIconTemplate;templates;content;prevButton;nextButton;inkbar;tabs;pcTabs=p(R(()=>V));isPrevButtonEnabled=$(!1);isNextButtonEnabled=$(!1);resizeObserver;showNavigators=m(()=>this.pcTabs.showNavigators());tabindex=m(()=>this.pcTabs.tabindex());scrollable=m(()=>this.pcTabs.scrollable());_componentStyle=p(Rt);constructor(){super(),ft(()=>{this.pcTabs.value(),Z(this.platformId)&&setTimeout(()=>{this.updateInkBar()})})}get prevButtonAriaLabel(){return this.config.translation.aria.previous}get nextButtonAriaLabel(){return this.config.translation.aria.next}ngAfterViewInit(){super.ngAfterViewInit(),this.showNavigators()&&Z(this.platformId)&&(this.updateButtonState(),this.bindResizeObserver())}_prevIconTemplate;_nextIconTemplate;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"previcon":this._prevIconTemplate=t.template;break;case"nexticon":this._nextIconTemplate=t.template;break}})}ngOnDestroy(){this.unbindResizeObserver(),super.ngOnDestroy()}onScroll(t){this.showNavigators()&&this.updateButtonState(),t.preventDefault()}onPrevButtonClick(){let t=this.content.nativeElement,i=z(t),n=Math.abs(t.scrollLeft)-i,r=n<=0?0:n;t.scrollLeft=ot(t)?-1*r:r}onNextButtonClick(){let t=this.content.nativeElement,i=z(t)-this.getVisibleButtonWidths(),n=t.scrollLeft+i,r=t.scrollWidth-i,c=n>=r?r:n;t.scrollLeft=ot(t)?-1*c:c}updateButtonState(){let t=this.content?.nativeElement,i=this.el?.nativeElement,{scrollWidth:n,offsetWidth:r}=t,c=Math.abs(t.scrollLeft),J=z(t);this.isPrevButtonEnabled.set(c!==0),this.isNextButtonEnabled.set(i.offsetWidth>=r&&c!==n-J)}updateInkBar(){let t=this.content?.nativeElement,i=this.inkbar?.nativeElement,n=this.tabs?.nativeElement,r=Ct(t,'[data-pc-name="tab"][data-p-active="true"]');i&&(i.style.width=xt(r)+"px",i.style.left=at(r).left-at(n).left+"px")}getVisibleButtonWidths(){let t=this.prevButton?.nativeElement,i=this.nextButton?.nativeElement;return[t,i].reduce((n,r)=>r?n+z(r):n,0)}bindResizeObserver(){this.resizeObserver=new ResizeObserver(()=>this.updateButtonState()),this.resizeObserver.observe(this.el.nativeElement)}unbindResizeObserver(){this.resizeObserver&&(this.resizeObserver.unobserve(this.el.nativeElement),this.resizeObserver=null)}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=f({type:e,selectors:[["p-tablist"]],contentQueries:function(i,n,r){if(i&1&&(U(r,Ut,4),U(r,Gt,4),U(r,kt,4)),i&2){let c;x(c=C())&&(n.prevIconTemplate=c.first),x(c=C())&&(n.nextIconTemplate=c.first),x(c=C())&&(n.templates=c)}},viewQuery:function(i,n){if(i&1&&(P(Zt,5),P(Xt,5),P(Jt,5),P(Yt,5),P(te,5)),i&2){let r;x(r=C())&&(n.content=r.first),x(r=C())&&(n.prevButton=r.first),x(r=C())&&(n.nextButton=r.first),x(r=C())&&(n.inkbar=r.first),x(r=C())&&(n.tabs=r.first)}},hostVars:3,hostBindings:function(i,n){i&2&&(_("data-pc-name","tablist"),g(n.cx("root")))},features:[F([Rt]),h],ngContentSelectors:Q,decls:9,vars:9,consts:[["content",""],["tabs",""],["inkbar",""],["prevButton",""],["nextButton",""],["type","button","pRipple","",3,"class"],[3,"scroll"],["role","tablist"],["role","presentation"],["type","button","pRipple","",3,"click"],["data-p-icon","chevron-left"],[4,"ngTemplateOutlet"],["data-p-icon","chevron-right"]],template:function(i,n){if(i&1){let r=W();S(),E(0,oe,4,6,"button",5),o(1,"div",6,0),b("scroll",function(J){return K(r),H(n.onScroll(J))}),o(3,"div",7,1),O(5),y(6,"span",8,2),a()(),E(8,le,4,6,"button",5)}i&2&&(B(n.showNavigators()&&n.isPrevButtonEnabled()?0:-1),l(),g(n.cx("content")),l(2),g(n.cx("tabList")),l(3),g(n.cx("activeBar")),_("data-pc-section","inkbar"),l(2),B(n.showNavigators()&&n.isNextButtonEnabled()?8:-1))},dependencies:[w,gt,Nt,Lt,Mt,lt,st],encapsulation:2,changeDetection:0})}return e})(),ue={root:({instance:e})=>["p-tab",{"p-tab-active":e.active(),"p-disabled":e.disabled()}]},jt=(()=>{class e extends L{name="tab";classes=ue;static \u0275fac=(()=>{let t;return function(n){return(t||(t=u(e)))(n||e)}})();static \u0275prov=D({token:e,factory:e.\u0275fac})}return e})();var be=(()=>{class e extends A{value=G();disabled=M(!1,{transform:N});pcTabs=p(R(()=>V));pcTabList=p(R(()=>Kt));el=p(ut);_componentStyle=p(jt);ripple=m(()=>this.config.ripple());id=m(()=>`${this.pcTabs.id()}_tab_${this.value()}`);ariaControls=m(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);active=m(()=>rt(this.pcTabs.value(),this.value()));tabindex=m(()=>this.active()?this.pcTabs.tabindex():-1);mutationObserver;onFocus(t){this.pcTabs.selectOnFocus()&&this.changeActiveValue()}onClick(t){this.changeActiveValue()}onKeyDown(t){switch(t.code){case"ArrowRight":this.onArrowRightKey(t);break;case"ArrowLeft":this.onArrowLeftKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break;default:break}t.stopPropagation()}ngAfterViewInit(){super.ngAfterViewInit(),this.bindMutationObserver()}onArrowRightKey(t){let i=this.findNextTab(t.currentTarget);i?this.changeFocusedTab(t,i):this.onHomeKey(t),t.preventDefault()}onArrowLeftKey(t){let i=this.findPrevTab(t.currentTarget);i?this.changeFocusedTab(t,i):this.onEndKey(t),t.preventDefault()}onHomeKey(t){let i=this.findFirstTab();this.changeFocusedTab(t,i),t.preventDefault()}onEndKey(t){let i=this.findLastTab();this.changeFocusedTab(t,i),t.preventDefault()}onPageDownKey(t){this.scrollInView(this.findLastTab()),t.preventDefault()}onPageUpKey(t){this.scrollInView(this.findFirstTab()),t.preventDefault()}onEnterKey(t){this.changeActiveValue(),t.preventDefault()}findNextTab(t,i=!1){let n=i?t:t.nextElementSibling;return n?j(n,"data-p-disabled")||j(n,"data-pc-section")==="inkbar"?this.findNextTab(n):n:null}findPrevTab(t,i=!1){let n=i?t:t.previousElementSibling;return n?j(n,"data-p-disabled")||j(n,"data-pc-section")==="inkbar"?this.findPrevTab(n):n:null}findFirstTab(){return this.findNextTab(this.pcTabList?.tabs?.nativeElement?.firstElementChild,!0)}findLastTab(){return this.findPrevTab(this.pcTabList?.tabs?.nativeElement?.lastElementChild,!0)}changeActiveValue(){this.pcTabs.updateValue(this.value())}changeFocusedTab(t,i){wt(i),this.scrollInView(i)}scrollInView(t){t?.scrollIntoView?.({block:"nearest"})}bindMutationObserver(){Z(this.platformId)&&(this.mutationObserver=new MutationObserver(t=>{t.forEach(()=>{this.active()&&this.pcTabList?.updateInkBar()})}),this.mutationObserver.observe(this.el.nativeElement,{childList:!0,characterData:!0,subtree:!0}))}unbindMutationObserver(){this.mutationObserver.disconnect()}ngOnDestroy(){this.mutationObserver&&this.unbindMutationObserver(),super.ngOnDestroy()}static \u0275fac=(()=>{let t;return function(n){return(t||(t=u(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["p-tab"]],hostVars:10,hostBindings:function(i,n){i&1&&b("focus",function(c){return n.onFocus(c)})("click",function(c){return n.onClick(c)})("keydown",function(c){return n.onKeyDown(c)}),i&2&&(_("data-pc-name","tab")("id",n.id())("aria-controls",n.ariaControls())("role","tab")("aria-selected",n.active())("data-p-disabled",n.disabled())("data-p-active",n.active())("tabindex",n.tabindex()),g(n.cx("root")))},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[F([jt]),mt([lt]),h],ngContentSelectors:Q,decls:1,vars:0,template:function(i,n){i&1&&(S(),O(0))},dependencies:[w,st],encapsulation:2,changeDetection:0})}return e})(),me={root:({instance:e})=>["p-tabpanel",{"p-tabpanel-active":e.active()}]},zt=(()=>{class e extends L{name="tabpanel";classes=me;static \u0275fac=(()=>{let t;return function(n){return(t||(t=u(e)))(n||e)}})();static \u0275prov=D({token:e,factory:e.\u0275fac})}return e})();var fe=(()=>{class e extends A{pcTabs=p(R(()=>V));value=G(void 0);id=m(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);ariaLabelledby=m(()=>`${this.pcTabs.id()}_tab_${this.value()}`);active=m(()=>rt(this.pcTabs.value(),this.value()));_componentStyle=p(zt);static \u0275fac=(()=>{let t;return function(n){return(t||(t=u(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["p-tabpanel"]],hostVars:7,hostBindings:function(i,n){i&2&&(_("data-pc-name","tabpanel")("id",n.id())("role","tabpanel")("aria-labelledby",n.ariaLabelledby())("data-p-active",n.active()),g(n.cx("root")))},inputs:{value:[1,"value"]},outputs:{value:"valueChange"},features:[F([zt]),h],ngContentSelectors:Q,decls:1,vars:1,template:function(i,n){i&1&&(S(),E(0,ce,1,0)),i&2&&B(n.active()?0:-1)},dependencies:[w],encapsulation:2,changeDetection:0})}return e})(),ve={root:"p-tabpanels"},Qt=(()=>{class e extends L{name="tabpanels";classes=ve;static \u0275fac=(()=>{let t;return function(n){return(t||(t=u(e)))(n||e)}})();static \u0275prov=D({token:e,factory:e.\u0275fac})}return e})();var dt=(()=>{class e extends A{_componentStyle=p(Qt);static \u0275fac=(()=>{let t;return function(n){return(t||(t=u(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["p-tabpanels"]],hostVars:4,hostBindings:function(i,n){i&2&&(_("data-pc-name","tabpanels")("role","presentation"),g(n.cx("root")))},features:[F([Qt]),h],ngContentSelectors:Q,decls:1,vars:0,template:function(i,n){i&1&&(S(),O(0))},dependencies:[w],encapsulation:2,changeDetection:0})}return e})(),V=(()=>{class e extends A{value=G(void 0);scrollable=M(!1,{transform:N});lazy=M(!1,{transform:N});selectOnFocus=M(!1,{transform:N});showNavigators=M(!0,{transform:N});tabindex=M(0,{transform:vt});id=$(Tt("pn_id_"));_componentStyle=p(Vt);updateValue(t){this.value.update(()=>t)}static \u0275fac=(()=>{let t;return function(n){return(t||(t=u(e)))(n||e)}})();static \u0275cmp=f({type:e,selectors:[["p-tabs"]],hostVars:4,hostBindings:function(i,n){i&2&&(_("data-pc-name","tabs")("id",n.id()),g(n.cx("root")))},inputs:{value:[1,"value"],scrollable:[1,"scrollable"],lazy:[1,"lazy"],selectOnFocus:[1,"selectOnFocus"],showNavigators:[1,"showNavigators"],tabindex:[1,"tabindex"]},outputs:{value:"valueChange"},features:[F([Vt]),h],ngContentSelectors:Q,decls:1,vars:0,template:function(i,n){i&1&&(S(),O(0))},dependencies:[w],encapsulation:2,changeDetection:0})}return e})(),Ht=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=bt({type:e});static \u0275inj=pt({imports:[V,dt,fe,Kt,be]})}return e})();var $t=class e{onNext(){throw new Error("Method not implemented.")}onPrevious(){throw new Error("Method not implemented.")}translate=p(ht);dockerService=p(Ft);dockerfile=this.dockerService.dockerfilePreview;compose=this.dockerService.composePreview;cli=this.dockerService.cliPreview;summary=m(()=>({image:"node:18-alpine",user:"appuser (1001:1001)",workdir:"/app",ports:["3000/tcp"],volumes:["/app/data","/app/logs"],env:["NODE_ENV","PORT"],health:"Actif (30s)",security:"Non-root, read-only, capabilities limit\xE9es"}));download(d,t){let i=new Blob([d],{type:"text/plain"}),n=document.createElement("a");n.href=window.URL.createObjectURL(i),n.download=t,n.click(),n.remove()}copy(d){navigator.clipboard.writeText(d)}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=f({type:e,selectors:[["app-apercu"]],decls:84,vars:19,consts:[[1,"final-preview-layout"],[1,"summary-panel"],[1,"summary-title"],[1,"pi","pi-eye"],[1,"summary-desc"],[1,"resume-block"],[1,"resume-title"],[1,"pi","pi-list"],[1,"resume-list"],[1,"actions-block"],["pButton","","type","button","icon","pi pi-download","label","T\xE9l\xE9charger Dockerfile",1,"action-btn","download-btn",3,"click"],["pButton","","type","button","icon","pi pi-download","label","T\xE9l\xE9charger docker-compose.yml",1,"action-btn","download-btn","btn-blue-right",3,"click"],["pButton","","type","button","icon","pi pi-copy","label","Copier les commandes",1,"action-btn","copy-btn","btn-blue-right",3,"click"],[1,"bottom-actions"],["icon","pi pi-arrow-left","severity","secondary",1,"nav-btn","nav-btn-prev",3,"click","label"],["icon","pi pi-arrow-right","iconPos","right",1,"nav-btn","nav-btn-next","btn-blue-right",3,"click","label"],[1,"preview-panel"],["header","Dockerfile"],[1,"code-header"],["pButton","","icon","pi pi-copy","pTooltip","Copier","tooltipPosition","left",1,"mini-btn",3,"click"],[1,"code-preview"],["header","Docker Compose"],["header","Commandes"]],template:function(t,i){t&1&&(o(0,"div",0)(1,"div",1)(2,"h2",2),y(3,"i",3),s(4," Aper\xE7u final"),a(),o(5,"div",4),s(6,"V\xE9rifiez et t\xE9l\xE9chargez votre configuration Docker compl\xE8te"),a(),o(7,"div",5)(8,"div",6),y(9,"i",7),s(10," R\xE9sum\xE9 de configuration"),a(),o(11,"ul",8)(12,"li")(13,"span"),s(14,"Image de base"),a(),o(15,"strong"),s(16),a()(),o(17,"li")(18,"span"),s(19,"Utilisateur"),a(),o(20,"strong"),s(21),a()(),o(22,"li")(23,"span"),s(24,"R\xE9pertoire de travail"),a(),o(25,"strong"),s(26),a()(),o(27,"li")(28,"span"),s(29,"Ports expos\xE9s"),a(),o(30,"strong"),s(31),a()(),o(32,"li")(33,"span"),s(34,"Volumes"),a(),o(35,"strong"),s(36),a()(),o(37,"li")(38,"span"),s(39,"Variables d'env"),a(),o(40,"strong"),s(41),a()(),o(42,"li")(43,"span"),s(44,"Healthcheck"),a(),o(45,"strong"),s(46),a()(),o(47,"li")(48,"span"),s(49,"S\xE9curit\xE9"),a(),o(50,"strong"),s(51),a()()()(),o(52,"div",9)(53,"button",10),b("click",function(){return i.download(i.dockerfile(),"Dockerfile")}),a(),o(54,"button",11),b("click",function(){return i.download(i.compose(),"docker-compose.yml")}),a(),o(55,"button",12),b("click",function(){return i.copy(i.cli())}),a()(),o(56,"div",13)(57,"p-button",14),nt(58,"translate"),b("click",function(){return i.onPrevious()}),a(),o(59,"p-button",15),nt(60,"translate"),b("click",function(){return i.onNext()}),a()()(),o(61,"div",16)(62,"p-tabs")(63,"p-tabpanels",17)(64,"div",18),y(65,"i",3),s(66," Aper\xE7u Dockerfile "),o(67,"button",19),b("click",function(){return i.copy(i.dockerfile())}),a()(),o(68,"pre",20),s(69),a()(),o(70,"p-tabpanels",21)(71,"div",18),y(72,"i",3),s(73," Aper\xE7u docker-compose.yml "),o(74,"button",19),b("click",function(){return i.copy(i.compose())}),a()(),o(75,"pre",20),s(76),a()(),o(77,"p-tabpanels",22)(78,"div",18),y(79,"i",3),s(80," Commandes Docker "),o(81,"button",19),b("click",function(){return i.copy(i.cli())}),a()(),o(82,"pre",20),s(83),a()()()()()),t&2&&(l(16),v(i.summary().image),l(5),v(i.summary().user),l(5),v(i.summary().workdir),l(5),v(i.summary().ports.join(", ")),l(5),v(i.summary().volumes.join(", ")),l(5),v(i.summary().env.join(", ")),l(5),v(i.summary().health),l(5),v(i.summary().security),l(6),I("label",et(it(58,15,"COMMON.BACK_VOLUMES"))),l(2),I("label",et(it(60,17,"COMMON.FINALEXPORT"))),l(10),v(i.dockerfile()),l(7),v(i.compose()),l(7),v(i.cli()))},dependencies:[w,_t,St,Bt,Dt,Et,It,Ht,V,dt,Pt,Ot,yt],styles:[".final-preview-layout[_ngcontent-%COMP%]{display:flex;gap:2.5rem;align-items:flex-start;padding:1.5rem 2.5rem}.summary-panel[_ngcontent-%COMP%]{background:#f7fafd;border-radius:12px;box-shadow:0 2px 12px #0001;padding:2rem 1.5rem;width:340px;min-width:300px}.summary-title[_ngcontent-%COMP%]{font-size:1.4rem;font-weight:600;margin-bottom:.1rem;display:flex;align-items:center;gap:6px}.summary-desc[_ngcontent-%COMP%]{color:#788798;font-size:.93rem;margin-bottom:1.1rem}.resume-block[_ngcontent-%COMP%]{margin-bottom:2.2rem;background:#fff;border-radius:8px;padding:1.1rem 1.2rem;box-shadow:0 1px 6px #0002}.resume-title[_ngcontent-%COMP%]{font-weight:500;color:#2b3d5c;margin-bottom:.5rem;font-size:1.06rem;display:flex;align-items:center;gap:6px}.resume-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0;font-size:.98rem}.resume-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:.3em;border-bottom:1px solid #f0f0f0;padding-bottom:.15em}.resume-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child{border:none}.actions-block[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px;margin-bottom:1.6rem;margin-top:1.1rem}.action-btn[_ngcontent-%COMP%]{width:100%;justify-content:left;font-weight:500;border-radius:7px}.copy-btn[_ngcontent-%COMP%]{background:#eef3fd;color:#345;border:none}.download-btn[_ngcontent-%COMP%]{background:#0075f6;color:#fff;border:none}.footer-nav[_ngcontent-%COMP%]{margin-top:1.1rem;display:flex;gap:.7rem}.preview-panel[_ngcontent-%COMP%]{background:#fff;border-radius:12px;box-shadow:0 2px 12px #0001;flex:1 1 0;min-width:0;padding:1.2rem 1.5rem}.code-header[_ngcontent-%COMP%]{font-size:1rem;font-weight:500;margin-bottom:.5rem;display:flex;align-items:center;gap:.8rem}.mini-btn[_ngcontent-%COMP%]{margin-left:auto;background:transparent;border:none;color:#024ebc}.code-preview[_ngcontent-%COMP%]{background:#101b28;color:#f3f8fc;padding:1.1rem;font-size:.95rem;border-radius:8px;font-family:Fira Mono,Consolas,monospace;overflow-x:auto;min-height:320px;max-height:440px}.bottom-actions[_ngcontent-%COMP%]{margin-top:26px;display:flex;justify-content:space-between;gap:20px}"],changeDetection:0})};export{$t as ApercuComponent};
