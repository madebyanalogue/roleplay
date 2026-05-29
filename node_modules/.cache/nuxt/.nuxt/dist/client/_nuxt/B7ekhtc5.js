const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./RnxCfb_k.js","./entry.BvHUnFjm.css"])))=>i.map(i=>d[i]);
import{f as re,_ as Y,r as G,g as Ae,i as Te,h as x,j as ie,k as oe,n as se,l as Pe,m as ve,c as t,o as e,p as d,a as o,t as L,F,q as V,s as T,w as _e,v as te,x as ee,e as Ie,y as i,z as Ne,A as pe,B as Ee,b as de,C as ne,D as ce,d as $e,E as Q,O as he,S as Be,G as le,H as Re,I as Me,J as Fe,K as We,u as ze}from"./RnxCfb_k.js";import{s as we,_ as He}from"./Cp9-Eu6c.js";let Se=null,me=null;async function xe(){return Se||(Se=Promise.all([re(()=>import("./RnxCfb_k.js").then(r=>r.P),__vite__mapDeps([0,1]),import.meta.url),re(()=>import("./RnxCfb_k.js").then(r=>r.Q),__vite__mapDeps([0,1]),import.meta.url)]).then(([{gsap:r},{ScrollTrigger:a}])=>(r.registerPlugin(a),{gsap:r,ScrollTrigger:a}))),Se}function ye(r=120){me&&clearTimeout(me),me=setTimeout(async()=>{me=null;const{ScrollTrigger:a}=await xe();a&&(a.sort(),a.refresh())},r)}function ue(r,a){const y=r?.pinSpacer,m=r?.pin||a;if(!m||!y)return;const n=(m.closest(".page")||m.closest(".page-section")||m.parentElement)?.offsetWidth||m.offsetWidth;n>0&&(y.style.width=`${n}px`,y.style.maxWidth=`${n}px`),y.style.overflow="hidden",y.style.boxSizing="border-box"}const Ve={key:0,class:"subtitle subtitle--circle orange-dot"},Ge={class:"featured-project-image-container rounded-medium"},Ue={class:"featured-project-image-wrapper"},Xe={class:"portfolio-item-overlay pad-40"},Ke={class:"portfolio-item-overlay-inner gap-40"},Qe={class:"portfolio-item-overlay-title fluid-type line-height-1",style:{"--desktop":"72"}},Ye={class:"portfolio-item-overlay-content gap-50"},Je={key:0,class:"portfolio-item-overlay-desc fluid-type pad-20 pad-bottom",style:{"--desktop":"36"}},Ze="(min-width: 1000px)",fe=650,et=10,tt={__name:"PageSectionFeaturedProjects",props:{section:{type:Object,required:!0}},setup(r){const a=r,y=G(null),m=G(null),w=G(null),n=G(null),v=Ae(),{isLoading:S}=Te();let $=null,s=null,c=()=>{};const u=x(()=>a.section?.featuredProjects||[]);let P=0;function f(){const p=getComputedStyle(document.documentElement).getPropertyValue("--gutter").trim(),I=Number.parseFloat(p);return Number.isFinite(I)?I:20}function l(){return`bottom bottom-=${f()}`}function _(){const p=n.value,I=w.value;return!p||!I?0:Math.max(0,p.scrollWidth-I.clientWidth)}function g(p){ue(p,y.value)}async function k(p){const I=p.querySelectorAll("img");await Promise.all(Array.from(I).map(R=>new Promise(h=>{if(R.complete){h();return}R.addEventListener("load",h,{once:!0}),R.addEventListener("error",h,{once:!0})})))}async function C(){if($?.revert(),$=null,u.value.length<2||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const{gsap:p,ScrollTrigger:I}=await xe();!p||!I||($=p.matchMedia(),$.add(Ze,()=>{let R=null,h=null,q=!1;const M=()=>{ye()};return window.addEventListener("resize",M,{passive:!0}),(async()=>{const b=y.value,D=n.value,j=w.value;if(q||!b||!D||!j||(await k(b),q)||(await new Promise(E=>requestAnimationFrame(E)),await new Promise(E=>requestAnimationFrame(E)),q))return;if(_()<=0){u.value.length>1&&P<et&&(P+=1,B(150));return}P=0,p.set(D,{x:0}),R=p.to(D,{x:()=>-_(),ease:"none"}),h=I.create({trigger:b,pin:j,pinSpacing:!0,start:l,scrub:.45,anticipatePin:0,invalidateOnRefresh:!0,end:()=>`+=${_()}`,animation:R,onRefresh(E){g(E)},onEnter(E){g(E)},onEnterBack(E){g(E)}}),g(h),ye(),b.dataset.featuredProjectsReady="true",document.dispatchEvent(new CustomEvent("featured-projects-scroll-ready"))})(),()=>{q=!0,window.removeEventListener("resize",M),h?.kill(),h=null,R?.kill(),R=null,n.value&&p.set(n.value,{clearProps:"transform"})}}))}function B(p=0){s&&clearTimeout(s),s=setTimeout(async()=>{s=null,await se(),C()},p)}function O(p){if(document.body.classList.contains("preloader-complete")){p();return}document.addEventListener("preloader-complete",p,{once:!0})}return ie(()=>u.value.map(p=>[p._key,p.project?._id,p.project?.slug?.current,p.project?.featuredImage?.asset?.url,p.project?.featuredImageMobile?.asset?.url].join(":")).join("|"),()=>{B(fe)}),ie(S,p=>{p||B(fe)}),oe(async()=>{await se(),c=v.hook("page:finish",()=>{B(fe)}),O(()=>{B()})}),Pe(()=>{B(fe)}),ve(()=>{s&&clearTimeout(s),s=null,c(),y.value&&delete y.value.dataset.featuredProjectsReady,$?.revert(),$=null}),(p,I)=>{const R=te,h=Ie;return e(),t("section",{ref_key:"sectionRef",ref:y,class:"featured-projects grid gap-30","data-featured-projects-scroll":""},[a.section.featuredProjectsTitle||a.section.title?(e(),t("h2",Ve,L(a.section.featuredProjectsTitle||a.section.title),1)):d("",!0),o("div",{ref_key:"scrollRef",ref:m,class:"featured-projects__scroll"},[o("div",{ref_key:"viewportRef",ref:w,class:"featured-projects__viewport"},[o("div",{ref_key:"trackRef",ref:n,class:"featured-projects__track"},[(e(!0),t(F,null,V(i(u),q=>(e(),t("article",{key:q.project?._id||q._key,class:"featured-project"},[q.project?.slug?.current?(e(),T(h,{key:0,to:`/portfolio/${q.project.slug.current}`,class:"featured-project-link"},{default:_e(()=>[o("div",Ge,[o("div",Ue,[q.project?.featuredImage?.asset?(e(),T(R,{key:0,src:q.project.featuredImage.asset.url||"",alt:"",class:ee(["featured-project-image",q.project.featuredImageMobile?.asset?"is-desktop-archive-img":""]),width:q.project.featuredImage.asset.metadata?.dimensions?.width||3200,height:q.project.featuredImage.asset.metadata?.dimensions?.height},null,8,["src","class","width","height"])):d("",!0),q.project?.featuredImageMobile?.asset?(e(),T(R,{key:1,src:q.project.featuredImageMobile.asset.url||"",alt:"",class:"featured-project-image is-mobile-archive-img",width:q.project.featuredImageMobile.asset.metadata?.dimensions?.width||3200,height:q.project.featuredImageMobile.asset.metadata?.dimensions?.height},null,8,["src","width","height"])):d("",!0),o("div",Xe,[I[0]||(I[0]=o("div",{class:"portfolio-item-overlay-bg","aria-hidden":"true"},null,-1)),o("div",Ke,[o("h3",Qe,L(q.project?.title),1),o("div",Ye,[q.project?.thumbnailDescription?(e(),t("div",Je,L(q.project.thumbnailDescription),1)):d("",!0)])])])])])]),_:2},1032,["to"])):d("",!0)]))),128))],512)],512)],512)],512)}}},st=Object.assign(Y(tt,[["__scopeId","data-v-4576449e"]]),{__name:"PageSectionFeaturedProjects"}),ot={class:"hero-carousel"},nt={key:0,class:"hero-carousel__desktop"},it={class:"hero-carousel__column rounded-medium"},at={class:"hero-carousel__stack"},rt=["src","type"],lt={key:0,class:"hero-carousel__column rounded-medium"},ct={class:"hero-carousel__stack"},ut=["src","type"],dt={key:1,class:"hero-carousel__mobile rounded-medium"},_t={class:"hero-carousel__stack"},pt=["src","type"],gt={__name:"PageSectionHeroCarousel",props:{section:{type:Object,required:!0}},setup(r){const a=r,y=G(0),m=G(0),w=G(0),n=G(!1),v=G(!1),S=G(!1);let $=null,s=null,c=null,u=0;function P(A){return A?A.mediaType==="video"?!!A.video?.asset?.url:!!A.image?.asset?.url:!1}function f(A,z=4e3){const N=Number.parseInt(A,10);return!Number.isFinite(N)||N<100?z:N}function l(A,z=!1){if(typeof A=="boolean")return A;if(typeof A=="string"){const N=A.trim().toLowerCase();if(["true","1","yes","on"].includes(N))return!0;if(["false","0","no","off",""].includes(N))return!1}return typeof A=="number"?A!==0:z}function _(A){if(!A||typeof A!="string")return"video/mp4";const z=A.toLowerCase();return z.endsWith(".webm")?"video/webm":z.endsWith(".ogg")||z.endsWith(".ogv")?"video/ogg":"video/mp4"}const g=x(()=>(a.section?.heroCarouselLeft||[]).filter(P)),k=x(()=>(a.section?.heroCarouselRight||[]).filter(P)),C=x(()=>(a.section?.heroCarouselMobile||[]).filter(P)),B=x(()=>l(a.section?.heroCarouselEnableRight,!1)),O=x(()=>l(a.section?.heroCarouselLoopAtSameTime,!1)),p=x(()=>B.value&&k.value.length>0),I=x(()=>g.value.length>0),R=x(()=>f(a.section?.heroCarouselLeftTiming,4e3)),h=x(()=>f(a.section?.heroCarouselRightTiming,4e3)),q=x(()=>R.value),M=x(()=>C.value.length?C.value:g.value),H=x(()=>M.value.length?M.value[w.value%M.value.length]:null);function b(A=[]){return A.filter(z=>z?.mediaType!=="video"&&z?.image?.asset?.url).map(z=>z.image.asset.url)}function D(A){return new Promise(z=>{if(!A){z();return}const N=new Image;N.onload=()=>z(),N.onerror=()=>z(),N.src=A})}async function j(A=[]){const z=b(A);return z.length&&await Promise.all(z.map(N=>D(N))),!0}async function X(){const A=++u;n.value=b(g.value).length===0,v.value=b(k.value).length===0,S.value=b(M.value).length===0,await Promise.all([j(g.value),j(k.value),j(M.value)]),A===u&&(n.value=!0,v.value=!0,S.value=!0)}function E(){$&&(clearInterval($),$=null),s&&(clearInterval(s),s=null),c&&(clearInterval(c),c=null)}function U(){y.value=0,m.value=0,w.value=0}function Z(){E(),U(),g.value.length>1&&($=we(()=>{const A=(y.value+1)%g.value.length,z=A===0;y.value=A,p.value&&O.value&&z&&(m.value=(m.value+1)%k.value.length)},R.value)),p.value&&!O.value&&k.value.length>1&&(s=we(()=>{m.value=(m.value+1)%k.value.length},h.value)),M.value.length>1&&(c=we(()=>{w.value=(w.value+1)%M.value.length},q.value))}async function K(){await X(),Z()}return ie(()=>[g.value.length,k.value.length,C.value.length,B.value,O.value,R.value,h.value],()=>{K()}),oe(()=>{K()}),Pe(()=>{K()}),Ne(()=>{u+=1,E()}),pe(()=>{u+=1,E()}),(A,z)=>{const N=te;return e(),t("section",ot,[i(I)?(e(),t("div",nt,[o("div",it,[o("div",at,[(e(!0),t(F,null,V(i(g),(W,J)=>(e(),t(F,{key:`left-item-${W._key||J}`},[W.mediaType==="video"&&W.video?.asset?.url?(e(),t("video",{key:0,class:ee(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":J===i(y)}]),autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},[o("source",{src:W.video.asset.url,type:_(W.video.asset.url)},null,8,rt)],2)):W.image?.asset?.url?(e(),T(N,{key:1,src:W.image.asset.url,alt:r.section.title||"",class:ee(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":J===i(y)&&i(n)}]),fit:"cover"},null,8,["src","alt","class"])):d("",!0)],64))),128))])]),i(p)?(e(),t("div",lt,[o("div",ct,[(e(!0),t(F,null,V(i(k),(W,J)=>(e(),t(F,{key:`right-item-${W._key||J}`},[W.mediaType==="video"&&W.video?.asset?.url?(e(),t("video",{key:0,class:ee(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":J===i(m)}]),autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},[o("source",{src:W.video.asset.url,type:_(W.video.asset.url)},null,8,ut)],2)):W.image?.asset?.url?(e(),T(N,{key:1,src:W.image.asset.url,alt:r.section.title||"",class:ee(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":J===i(m)&&i(v)}]),fit:"cover"},null,8,["src","alt","class"])):d("",!0)],64))),128))])])):d("",!0)])):d("",!0),i(H)?(e(),t("div",dt,[o("div",_t,[(e(!0),t(F,null,V(i(M),(W,J)=>(e(),t(F,{key:`mobile-item-${W._key||J}`},[W.mediaType==="video"&&W.video?.asset?.url?(e(),t("video",{key:0,class:ee(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":J===i(w)}]),autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},[o("source",{src:W.video.asset.url,type:_(W.video.asset.url)},null,8,pt)],2)):W.image?.asset?.url?(e(),T(N,{key:1,src:W.image.asset.url,alt:r.section.title||"",class:ee(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":J===i(w)&&i(S)}]),fit:"cover"},null,8,["src","alt","class"])):d("",!0)],64))),128))])])):d("",!0)])}}},mt=Object.assign(Y(gt,[["__scopeId","data-v-0451ff2b"]]),{__name:"PageSectionHeroCarousel"}),ft={class:"info-section"},ht={key:0,class:"info-section-image"},yt={class:"info-section-content"},vt={key:0,class:"info-block-title"},kt={key:0,class:"info-block-title"},bt={key:2,class:"info-links-list"},wt={key:0,class:"info-link-subtitle"},St=["href","target","rel"],$t={class:"info-link-title"},Tt={key:3,class:"info-services-block"},Pt={key:0,class:"info-block-title"},It={class:"info-services-content"},xt={key:4,class:"info-news-block"},qt={key:0,class:"info-block-title"},Rt={key:1,class:"info-news-list"},Lt={__name:"PageSectionInfo",props:{section:{type:Object,required:!0}},setup(r){const a=n=>{if(n?.metadata?.dimensions){const{width:v,height:S,aspectRatio:$}=n.metadata.dimensions;if($)return{aspectRatio:`${$}`};if(v&&S)return{aspectRatio:`${v/S}`}}return{aspectRatio:"4 / 3"}};G(null);const y=n=>{n?.target&&n.target.classList.add("loaded")};oe(()=>{se(()=>{const n=document.querySelector(".info-image");n&&n.complete&&n.naturalHeight>0&&n.classList.add("loaded")})});const{data:m}=Ee("news-items",async()=>{const n=`*[_type in ["news", "pressAward"]] | order(orderRank) {
    _id,
    content,
    featuredImage{
      asset->{
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      }
    }
  }`;try{return(await $fetch("/api/sanity/query",{method:"POST",body:{query:n}}))?.result||[]}catch(v){return console.error("[News] Error fetching:",v),[]}},{server:!0}),w=(n,v)=>!n||n.startsWith("mailto:")||n.startsWith("tel:")?!1:!!(v||n.startsWith("http://")||n.startsWith("https://")||n.startsWith("//"));return(n,v)=>{const S=te,$=ce;return e(),t("div",ft,[r.section.infoImage?.asset?(e(),t("div",ht,[o("div",{class:"info-image-container",style:ne(a(r.section.infoImage.asset))},[de(S,{src:r.section.infoImage.asset.url||"",width:r.section.infoImage.asset.metadata?.dimensions?.width,height:r.section.infoImage.asset.metadata?.dimensions?.height,alt:"",class:"info-image",onLoad:y},null,8,["src","width","height"])],4)])):d("",!0),o("div",yt,[(e(!0),t(F,null,V(r.section.infoContent,(s,c)=>(e(),t("div",{key:s._key||c,class:ee(["info-block",[s._type==="infoImageBlock"&&s.showOnDesktop===!1?"info-block-hide-desktop":"",s._type==="infoImageBlock"&&s.showOnMobile===!1?"info-block-hide-mobile":""]])},[s._type==="infoImageBlock"&&s.image?.asset?(e(),t("div",{key:0,class:ee(["info-image-block",[s._type==="infoImageBlock"&&s.spanTwoColumns?"info-image-block-span-2":""]])},[de(S,{src:s.image.asset.url||"",alt:"",class:"info-image-inline"},null,8,["src"])],2)):s._type==="infoTextBlock"?(e(),t("div",{key:1,class:ee(["info-text-block",{"info-text-block-large":s.largeText}])},[s.title?(e(),t("h2",vt,L(s.title),1)):d("",!0),s.text?(e(),T($,{key:1,blocks:s.text},null,8,["blocks"])):d("",!0)],2)):s._type==="infoLinksBlock"?(e(),t("div",{key:2,class:ee(["info-links-block",{"info-links-block-large":s.largeText}])},[s.title?(e(),t("h2",kt,L(s.title),1)):d("",!0),s.text?(e(),T($,{key:1,blocks:s.text},null,8,["blocks"])):d("",!0),s.links&&s.links.length>0?(e(),t("div",bt,[(e(!0),t(F,null,V(s.links,(u,P)=>(e(),t("div",{key:P,class:"info-link-item"},[u.subtitle?(e(),t("span",wt,L(u.subtitle),1)):d("",!0),o("a",{href:u.link,target:w(u.link,u.openInNewTab)?"_blank":void 0,rel:w(u.link,u.openInNewTab)?"noopener":void 0,class:"info-link"},[o("span",$t,[$e(L(u.linkTitle||u.link)+" ",1),v[0]||(v[0]=o("span",{class:"info-link-arrow"},[$e("   "),o("svg",{id:"a","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 18 18"},[o("polygon",{points:"16.5 0 7 0 7 1.5 15.44 1.5 .05 16.89 1.11 17.95 16.5 2.56 16.5 11 18 11 18 1.5 18 0 16.5 0"})])],-1))])],8,St)]))),128))])):d("",!0)],2)):s._type==="infoServicesBlock"?(e(),t("div",Tt,[s.title?(e(),t("h2",Pt,L(s.title),1)):d("",!0),o("div",It,[de($,{blocks:s.content},null,8,["blocks"])])])):s._type==="infoNewsBlock"||s._type==="infoPressAwardsBlock"?(e(),t("div",xt,[s.title?(e(),t("h2",qt,L(s.title),1)):d("",!0),i(m)&&i(m).length>0?(e(),t("div",Rt,[(e(!0),t(F,null,V(i(m),(u,P)=>(e(),t("div",{key:u._id||P,class:"info-news-item"},[u.featuredImage?.asset?.url?(e(),T(S,{key:0,src:u.featuredImage.asset.url,width:u.featuredImage.asset.metadata?.dimensions?.width,height:u.featuredImage.asset.metadata?.dimensions?.height,alt:"",class:"info-news-image"},null,8,["src","width","height"])):d("",!0),u.content?(e(),T($,{key:1,blocks:u.content,class:"info-news-content"},null,8,["blocks"])):d("",!0)]))),128))])):d("",!0)])):d("",!0)],2))),128))])])}}},Ct=Object.assign(Y(Lt,[["__scopeId","data-v-e3075b2d"]]),{__name:"PageSectionInfo"}),At={class:"services-section grid gap-30"},Et={key:0,class:"subtitle subtitle--circle twisted orange-dot"},Mt={class:"services-section__grid fluid-type",style:{"--desktop":"54","--mobile":"28"}},jt={__name:"PageSectionServices",props:{section:{type:Object,required:!0}},setup(r){const a=r,y=x(()=>(a.section?.servicesTextarea||"").split(/\r?\n/).map(m=>m.trim()).filter(Boolean));return(m,w)=>(e(),t("section",At,[r.section.servicesTitle||r.section.title?(e(),t("h2",Et,L(r.section.servicesTitle||r.section.title),1)):d("",!0),o("div",Mt,[(e(!0),t(F,null,V(i(y),(n,v)=>(e(),t("div",{key:`service-${v}`,class:"services-section__item"},L(n),1))),128))])]))}},Ot=Y(jt,[["__scopeId","data-v-688a5a41"]]),Dt={class:"text-section underline-links pad-top-bottom pad-20 pad-md-40 pad-top"},Nt={class:"text-section__inner fluid-type pad-md-20",style:{"--desktop":"73","--mobile":"24"}},Bt={__name:"PageSectionText",props:{section:{type:Object,required:!0}},setup(r){return(a,y)=>{const m=ce;return e(),t("div",Dt,[o("div",Nt,[r.section.textContent?.length?(e(),T(m,{key:0,blocks:r.section.textContent},null,8,["blocks"])):d("",!0)])])}}},Ft=Y(Bt,[["__scopeId","data-v-e13188b0"]]),Wt={key:0,class:"kinetic-typography__text kinetic-typography__text--static hide-md"},zt={key:1,class:"kinetic-typography__text kinetic-typography__text--static hide-md"},Ht={key:0,class:"kinetic-typography__line1"},Vt={key:1,class:"kinetic-typography__line2"},Gt={class:"kinetic-typography__highlight"},Ut={class:"kinetic-typography__highlight"},Xt={key:2,class:"kinetic-typography__stage show-md"},Kt={class:"kinetic-typography__text kinetic-typography__text--animated fluid-type",style:{"--desktop":"108","--mobile":"40"}},Qt={key:1,class:"kinetic-typography__line2"},Yt={class:"kinetic-typography__highlight"},Jt={class:"kinetic-typography__highlight"},Zt="(min-width: 1000px)",es={__name:"PageSectionKineticTypography",props:{section:{type:Object,required:!0}},setup(r){const a=r,y=G(null),m=G(null),w=G(null);let n=null;const v=x(()=>a.section.kineticTypographyLine1??""),S=x(()=>a.section.kineticTypographyHighlightStart??""),$=x(()=>a.section.kineticTypographyHighlightEnd??""),s=x(()=>{const f=a.section.kineticTypographyHighlightConnector;return f==null||f===""?" and ":f}),c=x(()=>!!a.section.kineticTypographyHighlightStart?.trim()||!!a.section.kineticTypographyHighlightEnd?.trim()),u=x(()=>!!a.section.kineticTypographyLine1?.trim()||c.value);async function P(){if(n?.revert(),n=null,!u.value)return;const[{gsap:f},{ScrollTrigger:l}]=await Promise.all([re(()=>import("./RnxCfb_k.js").then(_=>_.P),__vite__mapDeps([0,1]),import.meta.url),re(()=>import("./RnxCfb_k.js").then(_=>_.Q),__vite__mapDeps([0,1]),import.meta.url)]);f.registerPlugin(l),n=f.matchMedia(),n.add(Zt,()=>{let _=null,g=!1;const k=()=>({section:y.value,line1El:m.value,connectorEl:w.value}),C=({section:O,connectorEl:p,line1El:I})=>{if(!O||!p)return!1;const R=O.querySelector(".kinetic-typography__stage");return!(!R||getComputedStyle(R).display==="none"||p.offsetWidth===0||I&&I.offsetHeight===0)},B=()=>{const{section:O,line1El:p,connectorEl:I}=k();if(g||!C({section:O,connectorEl:I,line1El:p})){requestAnimationFrame(B);return}const R=[...p?[p]:[],I];I.style.display="inline-block",I.style.overflow="hidden",I.style.verticalAlign="bottom",I.style.whiteSpace="pre",p&&(p.style.overflow="hidden");let h=0,q=0,M=0;const H=()=>{I.style.width="",M=I.offsetWidth,p&&(p.style.height="",p.style.marginBottom="",h=p.offsetHeight,q=parseFloat(getComputedStyle(p).marginBottom)||0)},b=.5,D=.5,j=.5+.5*.75,X=U=>{if(U<=b){const K=1-U/b;R.forEach(A=>{A.style.opacity=String(K)}),p&&(p.style.height="",p.style.marginBottom=""),I.style.width="";return}H(),R.forEach(K=>{K.style.opacity="0"});const Z=Math.min(1,(U-D)/(j-D));p&&(p.style.height=`${h*(1-Z)}px`,p.style.marginBottom=`${q*(1-Z)}px`),I.style.width=`${M*(1-Z)}px`},E=O.offsetHeight;_=l.create({trigger:O,start:"top top",end:()=>`+=${E}`,pin:O,pinSpacing:!0,anticipatePin:1,invalidateOnRefresh:!0,onUpdate(U){X(U.progress)},onRefresh(U){X(U.progress)}}),X(_.progress),document.fonts?.ready&&document.fonts.ready.then(()=>{g||l.refresh()})};return requestAnimationFrame(B),()=>{g=!0,_?.kill(),_=null;const{line1El:O,connectorEl:p}=k();O&&(O.style.opacity="",O.style.height="",O.style.marginBottom="",O.style.overflow=""),p&&(p.style.opacity="",p.style.width="",p.style.display="",p.style.overflow="",p.style.verticalAlign="",p.style.whiteSpace="")}})}return oe(async()=>{await se(),await P()}),pe(()=>{n?.revert(),n=null}),(f,l)=>{const _=ce;return e(),t("section",{ref_key:"sectionRef",ref:y,class:"kinetic-typography"},[r.section.kineticTypographyText?.length?(e(),t("div",Wt,[de(_,{blocks:r.section.kineticTypographyText},null,8,["blocks"])])):i(u)?(e(),t("div",zt,[i(v)?(e(),t("p",Ht,L(i(v)),1)):d("",!0),i(c)?(e(),t("p",Vt,[o("span",Gt,L(i(S)),1),o("span",null,L(i(s)),1),o("span",Ut,L(i($)),1)])):d("",!0)])):d("",!0),i(u)?(e(),t("div",Xt,[o("div",Kt,[i(v)?(e(),t("p",{key:0,ref_key:"line1Ref",ref:m,class:"kinetic-typography__line1 kinetic-typography__line1--animated","data-kinetic-fade":""},L(i(v)),513)):d("",!0),i(c)?(e(),t("p",Qt,[o("span",Yt,L(i(S)),1),o("span",{ref_key:"connectorRef",ref:w,class:"kinetic-typography__connector","data-kinetic-fade":""},L(i(s)),513),o("span",Jt,L(i($)),1)])):d("",!0)])])):d("",!0)],512)}}},ts=Object.assign(Y(es,[["__scopeId","data-v-c6f1cf08"]]),{__name:"PageSectionKineticTypography"}),ss={key:0,class:"cards-section grid gap-30"},os={key:0,class:"subtitle subtitle--circle purple-dot"},ns={class:"cards-section--grid-mode"},is={class:"cards-section__grid pad-20 pad-md-60 pad-bottom"},as={class:"cards-section__media"},rs={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"cards-section__video"},ls=["src","type"],cs={class:"cards-section__text"},us={key:0,class:"cards-section__title fluid-type pad-60 pad-right",style:{"--desktop":"58","--mobile":"24"}},ds={class:"fluid-type",style:{"--desktop":"30","--mobile":"16"}},_s={key:1,class:"cards-section cards-section--stack-mode grid gap-50 pad-30 pad-top"},ps={key:0,class:"subtitle subtitle--circle purple-dot"},gs={class:"cards-section__container"},ms={class:"cards-section__grid"},fs={class:"cards-section__media"},hs={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"cards-section__video"},ys=["src","type"],vs={class:"cards-section__text"},ks={class:"grid gap-30 pad-md-50 pad-right"},bs={key:0,class:"cards-section__title fluid-type line-height-1 pad-60 pad-right",style:{"--desktop":"56","--mobile":"24"}},ws={class:"fluid-type",style:{"--desktop":"40","--mobile":"16"}},Ss={__name:"PageSectionCards",props:{section:{type:Object,required:!0}},setup(r){const a=r,y=x(()=>a.section?.cardsDisableScrollDemo===!0),m=x(()=>a.section?.cardsSectionTitle||a.section?.cardsTitle||a.section?.title||"");function w(n){if(!n||typeof n!="string")return"video/mp4";const v=n.toLowerCase();return v.endsWith(".webm")?"video/webm":v.endsWith(".ogg")||v.endsWith(".ogv")?"video/ogg":"video/mp4"}return(n,v)=>{const S=te,$=ce;return i(y)?(e(),t("section",ss,[i(m)?(e(),t("h2",os,L(i(m)),1)):d("",!0),o("div",ns,[(e(!0),t(F,null,V(r.section.cards||[],(s,c)=>(e(),t("article",{key:s._key||c,class:"cards-section__item pad-25 rounded-medium"},[o("div",is,[o("div",as,[s.mediaType==="video"&&s.video?.asset?.url?(e(),t("video",rs,[o("source",{src:s.video.asset.url,type:w(s.video.asset.url)},null,8,ls)])):s.image?.asset?.url?(e(),T(S,{key:1,src:s.image.asset.url,alt:s.title||"",width:s.image.asset.metadata?.dimensions?.width,height:s.image.asset.metadata?.dimensions?.height,class:"cards-section__image"},null,8,["src","alt","width","height"])):d("",!0)]),o("div",cs,[s.title?(e(),t("h3",us,L(s.title),1)):d("",!0),o("div",ds,[s.description?.length?(e(),T($,{key:0,blocks:s.description},null,8,["blocks"])):d("",!0)])])])]))),128))])])):(e(),t("section",_s,[i(m)?(e(),t("h2",ps,L(i(m)),1)):d("",!0),o("div",gs,[(e(!0),t(F,null,V(r.section.cards||[],(s,c)=>(e(),t("article",{key:s._key||c,class:"cards-section__item rounded-medium pad-20 pad-sm-50"},[o("div",ms,[o("div",fs,[s.mediaType==="video"&&s.video?.asset?.url?(e(),t("video",hs,[o("source",{src:s.video.asset.url,type:w(s.video.asset.url)},null,8,ys)])):s.image?.asset?.url?(e(),T(S,{key:1,src:s.image.asset.url,alt:s.title||"",width:s.image.asset.metadata?.dimensions?.width,height:s.image.asset.metadata?.dimensions?.height,class:"cards-section__image"},null,8,["src","alt","width","height"])):d("",!0)]),o("div",vs,[o("div",ks,[s.title?(e(),t("h3",bs,L(s.title),1)):d("",!0),o("div",ws,[s.description?.length?(e(),T($,{key:0,blocks:s.description},null,8,["blocks"])):d("",!0)])])])])]))),128))])]))}}},je=Y(Ss,[["__scopeId","data-v-cd8e521b"]]),$s={key:0,class:"sticky-cards__heading subtitle subtitle--circle purple-dot"},Ts={class:"sticky-cards__container"},Ps={class:"sticky-cards__grid"},Is={class:"sticky-cards__media"},xs={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"sticky-cards__video"},qs=["src","type"],Rs={class:"sticky-cards__text"},Ls={class:"grid gap-30 pad-md-50 pad-right"},Cs={key:0,class:"sticky-cards__title fluid-type line-height-1 pad-60 pad-right",style:{"--desktop":"56","--mobile":"24"}},As={class:"fluid-type",style:{"--desktop":"40","--mobile":"16"}},Es="(min-width: 1000px)",ae=650,Le=10,Ms={__name:"PageSectionStackingCards",props:{section:{type:Object,required:!0}},setup(r){const a=r,y=G(null),m=Ae(),{isLoading:w}=Te();let n=null,v=null,S=null,$=()=>{},s=()=>{},c=0;const u=x(()=>(a.section?.cards||[]).length>0),P=x(()=>a.section?.cardsSectionTitle||a.section?.cardsTitle||a.section?.title||""),f=x(()=>({...a.section,cardsDisableScrollDemo:!0}));function l(h){if(!h||typeof h!="string")return"video/mp4";const q=h.toLowerCase();return q.endsWith(".webm")?"video/webm":q.endsWith(".ogg")||q.endsWith(".ogv")?"video/ogg":"video/mp4"}async function _(h){const q=h.querySelectorAll("img");await Promise.all(Array.from(q).map(M=>new Promise(H=>{if(M.complete){H();return}M.addEventListener("load",H,{once:!0}),M.addEventListener("error",H,{once:!0})})))}async function g(){if(n?.revert(),n=null,!u.value)return;const{gsap:h,ScrollTrigger:q}=await xe();!h||!q||(n=h.matchMedia(),n.add(Es,()=>{let M=null,H=!1;const b=()=>{ye()};return window.addEventListener("resize",b,{passive:!0}),(async()=>{const j=y.value;if(H||!j){c<Le&&(c+=1,p(150));return}const X=j.querySelectorAll(".sticky-cards__card"),E=X.length;if(E<1||j.offsetHeight===0){c<Le&&(c+=1,p(150));return}if(await _(j),H||(await new Promise(N=>requestAnimationFrame(N)),await new Promise(N=>requestAnimationFrame(N)),H))return;const U=1/E,Z=5,K=.075,A=E<=1?0:(E-1)/E;X.forEach((N,W)=>{h.set(N,{xPercent:-50,yPercent:-50+W*Z,scale:1-W*K})});function z(N){const W=E<=1?0:Math.min(N,1)*A,J=Math.min(Math.floor(W/U),E-1),ge=(W-J*U)/U;X.forEach((ke,be)=>{if(be<J)h.set(ke,{yPercent:-250,rotationX:35,scale:1});else if(be===J)h.set(ke,{yPercent:h.utils.interpolate(-50,-200,ge),rotationX:h.utils.interpolate(0,35,ge),scale:1});else{const qe=be-J,Oe=(qe-ge)*Z,De=1-(qe-ge)*K;h.set(ke,{yPercent:-50+Oe,rotationX:0,scale:De})}})}M=q.create({trigger:j,start:"top top",end:()=>`+=${window.innerHeight*Math.max((E-1)*2,1)}`,pin:j,pinSpacing:!0,scrub:1,anticipatePin:1,invalidateOnRefresh:!0,onUpdate(N){z(N.progress)},onRefresh(N){ue(N,j),z(N.progress)},onEnter(N){ue(N,j)},onEnterBack(N){ue(N,j)},onLeave(){z(1)}}),ue(M,j),z(M.progress),c=0,ye(k()?500:120)})(),()=>{H=!0,window.removeEventListener("resize",b),M?.kill(),M=null,h.set(y.value?.querySelectorAll(".sticky-cards__card")||[],{clearProps:"all"})}}))}function k(){return!!document.querySelector("[data-featured-projects-scroll]")}function C(){return!!document.querySelector("[data-featured-projects-scroll][data-featured-projects-ready]")}function B(){return k()?450:150}function O(){k()&&(S&&clearTimeout(S),S=setTimeout(()=>{S=null,c=0,p(ae)},750))}function p(h=0){v&&clearTimeout(v),v=setTimeout(async()=>{v=null,await se(),g()},h+B())}function I(h=0){const q=(H=0)=>{p(H+h),O()};if(!k()||C()){q();return}const M=()=>{s(),c=0,q(ae)};s(),document.addEventListener("featured-projects-scroll-ready",M,{once:!0}),s=()=>{document.removeEventListener("featured-projects-scroll-ready",M)},q(ae)}function R(h){if(document.body.classList.contains("preloader-complete")){h();return}document.addEventListener("preloader-complete",h,{once:!0})}return ie(()=>(a.section?.cards||[]).map(h=>[h._key,h.title,h.mediaType,h.image?.asset?.url,h.video?.asset?.url].join(":")).join("|"),async()=>{I(ae)}),ie(w,h=>{h||I(ae)}),oe(async()=>{await se(),$=m.hook("page:finish",()=>{I(ae)}),R(()=>{I()})}),Pe(()=>{I(ae)}),ve(()=>{v&&clearTimeout(v),v=null,S&&clearTimeout(S),S=null,$(),s(),n?.revert(),n=null}),(h,q)=>{const M=je,H=te,b=ce;return e(),t(F,null,[i(u)?(e(),T(M,{key:0,section:i(f),class:"stacking-cards-section__mobile"},null,8,["section"])):d("",!0),i(u)?(e(),t("section",{key:1,ref_key:"sectionRef",ref:y,class:"sticky-cards stacking-cards-section__desktop grid gap-30"},[i(P)?(e(),t("h2",$s,L(i(P)),1)):d("",!0),o("div",Ts,[(e(!0),t(F,null,V(r.section.cards,(D,j)=>(e(),t("article",{key:D._key||`card-${j}`,class:"sticky-cards__card rounded-medium pad-20 pad-sm-50",style:ne({zIndex:r.section.cards.length-j})},[o("div",Ps,[o("div",Is,[D.mediaType==="video"&&D.video?.asset?.url?(e(),t("video",xs,[o("source",{src:D.video.asset.url,type:l(D.video.asset.url)},null,8,qs)])):D.image?.asset?.url?(e(),T(H,{key:1,src:D.image.asset.url,alt:D.title||"",width:D.image.asset.metadata?.dimensions?.width,height:D.image.asset.metadata?.dimensions?.height,class:"sticky-cards__image"},null,8,["src","alt","width","height"])):d("",!0)]),o("div",Rs,[o("div",Ls,[D.title?(e(),t("h3",Cs,L(D.title),1)):d("",!0),o("div",As,[D.description?.length?(e(),T(b,{key:0,blocks:D.description},null,8,["blocks"])):d("",!0)])])])])],4))),128))])],512)):d("",!0)],64)}}},js=Object.assign(Y(Ms,[["__scopeId","data-v-6ba6202a"]]),{__name:"PageSectionStackingCards"}),Os={class:"autoscroll-gallery-section rounded-medium"},Ds=["data-direction"],Ns={"data-draggable-marquee-collection":"",class:"draggable-marquee__collection"},Bs={"data-draggable-marquee-list":"",class:"draggable-marquee__list"},Fs={key:0,class:"draggable-marquee__item-media",draggable:"false",autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},Ws=["src"],zs={"aria-hidden":"true",class:"draggable-marquee__list draggable-marquee__list--clone"},Hs={key:0,class:"draggable-marquee__item-media",draggable:"false",autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},Vs=["src"],Gs={__name:"PageSectionAutoscrollGallery",props:{section:{type:Object,required:!0}},setup(r){Q.registerPlugin(he,Be);const a=r,y=G(null);function m(l){const g=(l||"3/5").trim().split("/").map(k=>k.trim()).filter(Boolean);if(g.length===2){const k=Number.parseFloat(g[0]),C=Number.parseFloat(g[1]);if(k>0&&C>0&&Number.isFinite(k)&&Number.isFinite(C))return`${k} / ${C}`}return"3 / 5"}const w=x(()=>({"--autoscroll-gallery-aspect-ratio":m(a.section?.autoscrollGalleryAspectRatio)})),n=x(()=>{const l=Number.parseFloat(String(a.section?.autoscrollGallerySpeed??60));return Number.isFinite(l)&&l>0?l:60}),v=x(()=>(a.section?.autoscrollGalleryDirection||"left").toLowerCase()==="right"?"right":"left"),S=x(()=>(a.section?.autoscrollGalleryItems||[]).filter(l=>l?l.mediaType==="video"?!!l.video?.asset?.url:!!l.image?.asset?.url:!1)),$=[];let s=null;function c(){s?.disconnect(),s=null}function u(){const l=y.value;!l||l.getAttribute("data-draggable-marquee-init")==="initialized"||s||(s=new ResizeObserver(()=>{f(),y.value?.getAttribute("data-draggable-marquee-init")==="initialized"&&c()}),s.observe(l))}function P(){se(()=>{f(),u()})}function f(){const l=y.value;if(!l||l.getAttribute("data-draggable-marquee-init")==="initialized")return;const g=l.querySelector("[data-draggable-marquee-collection]"),k=g.querySelectorAll(".draggable-marquee__list"),C=k[0],B=k[1];if(!g||!C||!B||!S.value.length)return;const O=C.querySelector(".draggable-marquee__item"),p=getComputedStyle(C),I=O?O.getBoundingClientRect().width:0,R=Number.parseFloat(p.columnGap||p.gap||"0"),h=Math.round(S.value.length*I+S.value.length*R),q=B.offsetLeft-C.offsetLeft,M=Math.round(C.scrollWidth||C.getBoundingClientRect().width),H=Math.round(h||q||M);if(!H)return;let b=0;const D=v.value==="right"?1:-1,j=Math.max(.01,n.value/1e3),X=Q.utils.wrap(-H,0),E=Q.quickTo(g,"x",{duration:.5,ease:"power3",modifiers:{x:K=>{const A=X(Number.parseFloat(K)||0);return`${Math.round(A)}px`}}});E(b);const U=he.create({target:g,type:"pointer,touch",preventDefault:!0,debounce:!1,onPress:()=>{l.setAttribute("data-dragging","true")},onDrag:K=>{b+=K.deltaX,E(b)},onRelease:()=>{l.setAttribute("data-dragging","false")},onStop:()=>{l.setAttribute("data-dragging","false")}});function Z(K,A){b+=D*(A*j),E(b)}Q.ticker.add(Z),l.setAttribute("data-draggable-marquee-init","initialized"),$.push(()=>{U.kill(),Q.ticker.remove(Z),Q.killTweensOf(g),l.setAttribute("data-draggable-marquee-init",""),l.setAttribute("data-dragging","false"),Q.set(g,{clearProps:"transform"})})}return oe(()=>{P()}),ie(()=>[a.section?.autoscrollGalleryAspectRatio,a.section?.autoscrollGallerySpeed,a.section?.autoscrollGalleryDirection,S.value.length],()=>{$.splice(0).forEach(l=>l()),c(),P()}),pe(()=>{c(),$.splice(0).forEach(l=>l())}),(l,_)=>{const g=te;return e(),t("section",Os,[o("div",{ref_key:"wrapperRef",ref:y,"data-draggable-marquee-init":"","data-direction":i(v),class:"draggable-marquee",style:ne(i(w)),onDragstart:_[2]||(_[2]=le(()=>{},["prevent"])),onSelectstart:_[3]||(_[3]=le(()=>{},["prevent"]))},[o("div",Ns,[o("div",Bs,[(e(!0),t(F,null,V(i(S),(k,C)=>(e(),T(Re(k.link?"a":"div"),{key:`${k._key||C}-a`,class:"draggable-marquee__item",draggable:"false",href:k.link||void 0,target:k.link?"_blank":void 0,rel:k.link?"noopener noreferrer":void 0,onDragstart:_[0]||(_[0]=le(()=>{},["prevent"]))},{default:_e(()=>[k.mediaType==="video"&&k.video?.asset?.url?(e(),t("video",Fs,[o("source",{src:k.video.asset.url,type:"video/mp4"},null,8,Ws)])):k.image?.asset?.url?(e(),T(g,{key:1,src:k.image.asset.url,alt:"",fit:"cover",class:"draggable-marquee__item-media",draggable:"false"},null,8,["src"])):d("",!0)]),_:2},1064,["href","target","rel"]))),128))]),o("div",zs,[(e(!0),t(F,null,V(i(S),(k,C)=>(e(),T(Re(k.link?"a":"div"),{key:`${k._key||C}-b`,class:"draggable-marquee__item",draggable:"false",href:k.link||void 0,target:k.link?"_blank":void 0,rel:k.link?"noopener noreferrer":void 0,onDragstart:_[1]||(_[1]=le(()=>{},["prevent"]))},{default:_e(()=>[k.mediaType==="video"&&k.video?.asset?.url?(e(),t("video",Hs,[o("source",{src:k.video.asset.url,type:"video/mp4"},null,8,Vs)])):k.image?.asset?.url?(e(),T(g,{key:1,src:k.image.asset.url,alt:"",fit:"cover",class:"draggable-marquee__item-media",draggable:"false"},null,8,["src"])):d("",!0)]),_:2},1064,["href","target","rel"]))),128))])])],44,Ds)])}}},Us=Y(Gs,[["__scopeId","data-v-9b18e213"]]),Xs={class:"news-section grid gap-30"},Ks={key:0,class:"subtitle subtitle--circle yellow-dot"},Qs={key:1,class:"news-list"},Ys={class:"news-thumbnail"},Js={__name:"PageSectionNews",props:{section:{type:Object,required:!0}},setup(r){const a=r,y=x(()=>(a.section?.newsItems||[]).map(m=>m?.newsPost).filter(Boolean));return(m,w)=>{const n=te,v=ce;return e(),t("section",Xs,[r.section.newsTitle||r.section.title?(e(),t("h2",Ks,L(r.section.newsTitle||r.section.title),1)):d("",!0),i(y).length>0?(e(),t("div",Qs,[(e(!0),t(F,null,V(i(y),(S,$)=>(e(),t("article",{key:S._id||S._key||$,class:"news-item flex gap-md-100 yellow pad-25 rounded-medium"},[o("div",Ys,[S.featuredImage?.asset?.url?(e(),T(n,{key:0,src:S.featuredImage.asset.url,width:S.featuredImage.asset.metadata?.dimensions?.width,height:S.featuredImage.asset.metadata?.dimensions?.height,alt:"",class:"news-image rounded-medium"},null,8,["src","width","height"])):d("",!0)]),S.content?(e(),T(v,{key:0,blocks:S.content,class:"news-content fluid-type",style:{"--desktop":"60","--mobile":"16"}},null,8,["blocks"])):d("",!0)]))),128))])):d("",!0)])}}},Zs=Y(Js,[["__scopeId","data-v-6317e172"]]),eo={key:0,class:"portfolio-stats__row gap-20"},to={key:0,class:"portfolio-stats__dd"},so={class:"portfolio-stats__lozenge white orange-text rounded-small fluid-type mono",style:{"--desktop":"24"}},oo={key:0,class:"portfolio-stats__arrow",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},no={class:"portfolio-stats__value-text"},io={key:1,class:"fluid-type portfolio-stats__label",style:{"--desktop":"28"}},ao={__name:"PortfolioStats",props:{stats:{type:Array,default:()=>[]},rootClass:{type:String,default:""}},setup(r){const a=r,y=x(()=>(a.stats||[]).some(m=>m?.label||m?.value));return(m,w)=>i(y)?(e(),t("div",{key:0,class:ee(["portfolio-stats",r.rootClass])},[(e(!0),t(F,null,V(r.stats,(n,v)=>(e(),t(F,{key:n._key||v},[n.label||n.value?(e(),t("div",eo,[n.value?(e(),t("div",to,[o("span",so,[n.icon==="arrowUp"?(e(),t("svg",oo,[...w[0]||(w[0]=[o("path",{d:"M0 8.98305L1.52649 10.5663L7.57831 4.30064V17.9661H9.74354V4.30064L15.7845 10.5775L17.3218 8.98305L8.66092 0L0 8.98305Z",fill:"currentColor"},null,-1)])])):d("",!0),o("span",no,L(n.value),1)])])):d("",!0),n.label?(e(),t("div",io,L(n.label),1)):d("",!0)])):d("",!0)],64))),128))],2)):d("",!0)}},ro=Y(ao,[["__scopeId","data-v-f900a4f9"]]),lo={class:"portfolio-item-media rounded-medium"},co={class:"portfolio-item-overlay pad-40"},uo={class:"portfolio-item-overlay-inner gap-40"},_o={class:"portfolio-item-overlay-title fluid-type",style:{"--desktop":"72"}},po={class:"portfolio-item-overlay-content gap-50"},go={key:0,class:"portfolio-item-overlay-desc fluid-type",style:{"--desktop":"36"}},mo={class:"portfolio-item-title"},fo={__name:"PageSectionPortfolio",props:{section:{type:Object,required:!0},projects:{type:Array,default:()=>[]}},setup(r){const a=r,y=[4,8,7,5,5,7];function m(c){const P=(c||"3/5").trim().split("/").map(f=>f.trim()).filter(Boolean);if(P.length===2){const f=Number.parseFloat(P[0]),l=Number.parseFloat(P[1]);if(f>0&&l>0&&Number.isFinite(f)&&Number.isFinite(l))return`${f} / ${l}`}return"3 / 5"}const w=x(()=>a.projects||[]),n=x(()=>w.value.length),v=x(()=>({"--portfolio-aspect-ratio":m(a.section?.thumbnailAspectRatio)}));function S(c,u){if(u<=0)return 12;const P=u-1;return c===P&&u%2===1?12:y[c%y.length]}function $(c,u){return c===u-1&&u%2===1}function s(c,u){return{gridColumn:`span ${S(c,u)}`}}return(c,u)=>{const P=te,f=ro,l=Ie;return e(),t("div",{class:"portfolio-section",style:ne(i(v))},[(e(!0),t(F,null,V(i(w),(_,g)=>(e(),t("div",{key:_._id,class:ee(["portfolio-item",{"portfolio-item--orphan":$(g,i(n))}]),style:ne(s(g,i(n)))},[_.slug?.current?(e(),T(l,{key:0,to:`/portfolio/${_.slug.current}`,class:"portfolio-item-link"},{default:_e(()=>[o("div",lo,[_.featuredImage?.asset?(e(),T(P,{key:0,src:_.featuredImage.asset.url||"",alt:"",fit:"cover",class:ee(["portfolio-item-image rounded-medium",_.featuredImageMobile?.asset?"is-desktop-archive-img":""])},null,8,["src","class"])):d("",!0),_.featuredImageMobile?.asset?(e(),T(P,{key:1,src:_.featuredImageMobile.asset.url||"",alt:"",fit:"cover",class:"portfolio-item-image rounded-medium is-mobile-archive-img"},null,8,["src"])):d("",!0),o("div",co,[u[0]||(u[0]=o("div",{class:"portfolio-item-overlay-bg","aria-hidden":"true"},null,-1)),o("div",uo,[o("h3",_o,L(_.title),1),o("div",po,[_.thumbnailDescription?(e(),t("div",go,L(_.thumbnailDescription),1)):d("",!0),_.thumbnailStats?.length?(e(),T(f,{key:1,stats:_.thumbnailStats,"root-class":"portfolio-item-overlay-stats gap-20"},null,8,["stats"])):d("",!0)])])])]),o("h3",mo,L(_.title),1)]),_:2},1032,["to"])):d("",!0)],6))),128))],4)}}},ho=Y(fo,[["__scopeId","data-v-b0e01b5a"]]),yo={key:0,class:"subtitle subtitle--circle orange-dot"},vo={"data-follower-collection":"",class:"preview-collection pad-md-10"},ko={class:"preview-collection__list"},bo={class:"preview-list"},wo={class:"team-member__inner"},So={class:"team-member__row"},$o={class:"team-member__col is--large"},To={class:"team-member__heading fluid-type line-height-1",style:{"--desktop":"76","--mobile":"24"}},Po={class:"team-member__col is--medium"},Io={class:"team-member__role fluid-type line-height-1",style:{"--desktop":"52","--mobile":"24"}},xo={"data-follower-visual":"",class:"team-member__visual"},qo={__name:"PageSectionTeam",props:{section:{type:Object,required:!0}},setup(r){const a=r,y=G(null),{getImageSrc:m}=Me(),w=x(()=>a.section?.teamMembers||[]);let n=null;function v(S){const $=S?.querySelector("[data-follower-collection]"),s=S?.querySelectorAll("[data-follower-item]")||[],c=S?.querySelector("[data-follower-cursor]"),u=S?.querySelector("[data-follower-cursor-inner]");if(!$||!s.length||!c||!u)return()=>{};let P=null,f=!0;const l=100,_=.5,g="power2.inOut",k=[];return s.forEach((C,B)=>{const O=()=>{const p=P===null||B>P;P=B,c.querySelectorAll("[data-follower-visual]").forEach(h=>{Q.killTweensOf(h),Q.to(h,{yPercent:p?-l:l,duration:_,ease:g,overwrite:"auto",onComplete:()=>h.remove()})});const I=C.querySelector("[data-follower-visual]");if(!I)return;const R=I.cloneNode(!0);u.appendChild(R),f?f=!1:Q.fromTo(R,{yPercent:p?l:-l},{yPercent:0,duration:_,ease:g,overwrite:"auto"})};C.addEventListener("mouseenter",O),k.push(()=>{C.removeEventListener("mouseenter",O)})}),()=>{k.forEach(C=>C())}}return oe(()=>{n=v(y.value)}),pe(()=>{n&&n()}),(S,$)=>{const s=te;return e(),t("section",{ref_key:"wrapRef",ref:y,"data-follower-wrap":"",class:"preview-container grid gap-40 pad-md-30 pad-top"},[r.section.title?(e(),t("h2",yo,L(r.section.title),1)):d("",!0),o("div",vo,[o("div",ko,[o("div",bo,[(e(!0),t(F,null,V(i(w),(c,u)=>(e(),t("div",{key:c._key||u,"data-follower-item":"",class:"team-member"},[o("div",wo,[o("div",So,[o("div",$o,[o("h2",To,L(c.name),1)]),o("div",Po,[o("p",Io,L(c.role),1)])]),o("div",xo,[c?.image?.asset?(e(),T(s,{key:0,src:i(m)(c.image.asset),alt:c.name||"",class:"team-member__visual-img"},null,8,["src","alt"])):d("",!0)])])]))),128))])]),$[0]||($[0]=o("div",{"data-follower-cursor":"",class:"preview-follower rounded-medium"},[o("div",{"data-follower-cursor-inner":"",class:"preview-follower__inner"})],-1))])],512)}}},Ro=Y(qo,[["__scopeId","data-v-3b73f470"]]),Lo=["data-logo-wall-shuffle"],Co={class:"logo-wall__collection"},Ao={"data-logo-wall-list":"",class:"logo-wall__list"},Eo={"data-logo-wall-target-parent":"",class:"logo-wall__logo"},Mo={"data-logo-wall-target":"",class:"logo-wall__logo-target"},jo={__name:"PageSectionLogoWall",props:{section:{type:Object,required:!0}},setup(r){const a=r,{getImageSrc:y}=Me(),m=G(null),w=G(null),n=G(null),v=x(()=>a.section?.logoWallLogos||[]),S=x(()=>a.section?.logoWallShuffle!==!1);function $(f){return y(f?.asset||f)}function s(f){return window.getComputedStyle(f).display!=="none"}function c(f){const l=f.slice();for(let _=l.length-1;_>0;_--){const g=Math.floor(Math.random()*(_+1));[l[_],l[g]]=[l[g],l[_]]}return l}async function u(f){if(!f)return;const[{gsap:l},{ScrollTrigger:_}]=await Promise.all([re(()=>import("./RnxCfb_k.js").then(j=>j.P),__vite__mapDeps([0,1]),import.meta.url),re(()=>import("./RnxCfb_k.js").then(j=>j.Q),__vite__mapDeps([0,1]),import.meta.url)]);l.registerPlugin(_);const g=1.5,k=.9,C=f.querySelector("[data-logo-wall-list]");if(!C)return;const B=Array.from(C.querySelectorAll("[data-logo-wall-item]"));if(!B.length)return;const O=f.getAttribute("data-logo-wall-shuffle")!=="false",p=B.map(j=>j.querySelector("[data-logo-wall-target]")).filter(Boolean).map(j=>j.cloneNode(!0));if(!p.length)return;let I=[],R=0,h=[],q=[],M=0;const H=()=>{B.forEach(j=>{j.querySelectorAll("[data-logo-wall-target]").forEach(X=>X.remove())})},b=()=>{if(w.value&&(w.value.kill(),w.value=null),I=B.filter(s),R=I.length,!R)return;q=c(Array.from({length:R},(E,U)=>U)),M=0,H(),h=p.map(E=>E.cloneNode(!0));let j,X;if(O){const E=c(h);j=E.slice(0,R),X=c(E.slice(R))}else j=h.slice(0,R),X=c(h.slice(R));h=j.concat(X);for(let E=0;E<R;E++){const U=I[E].querySelector("[data-logo-wall-target-parent]")||I[E],Z=h.shift();Z&&U.appendChild(Z)}w.value=l.timeline({repeat:-1,repeatDelay:g}),w.value.call(D),w.value.play()},D=()=>{if(B.filter(s).length!==R){b();return}if(!h.length||!R)return;const X=q[M%R];M++;const E=I[X],U=E.querySelector("[data-logo-wall-target-parent]")||E;if(U.querySelectorAll("[data-logo-wall-target]").length>1)return;const K=U.querySelector("[data-logo-wall-target]"),A=h.shift();A&&(l.set(A,{yPercent:50}),U.appendChild(A),K&&l.to(K,{yPercent:-50,duration:k,ease:"expo.inOut",onComplete:()=>{K.remove(),h.push(K)}}),l.to(A,{yPercent:0,duration:k,delay:.1,ease:"expo.inOut"}))};b(),n.value=_.create({trigger:f,start:"top bottom",end:"bottom top",onEnter:()=>w.value?.play(),onLeave:()=>w.value?.pause(),onEnterBack:()=>w.value?.play(),onLeaveBack:()=>w.value?.pause()})}function P(){if(document.hidden){w.value?.pause();return}w.value?.play()}return oe(()=>{u(m.value),document.addEventListener("visibilitychange",P)}),ve(()=>{w.value?.kill(),n.value?.kill(),document.removeEventListener("visibilitychange",P)}),(f,l)=>{const _=te;return i(v).length?(e(),t("section",{key:0,ref_key:"rootRef",ref:m,"data-logo-wall-shuffle":i(S)?"true":"false","data-logo-wall-cycle-init":"",class:"logo-wall"},[o("div",Co,[o("div",Ao,[(e(!0),t(F,null,V(i(v),(g,k)=>(e(),t("div",{key:g._key||`logo-${k}`,"data-logo-wall-item":"",class:"logo-wall__item"},[o("div",Eo,[l[0]||(l[0]=o("div",{class:"logo-wall__logo-before"},null,-1)),o("div",Mo,[$(g)?(e(),T(_,{key:0,src:$(g),loading:"lazy",width:"100",alt:g.alt||"",class:"logo-wall__logo-img"},null,8,["src","alt"])):d("",!0)])])]))),128))])])],8,Lo)):d("",!0)}}},Oo=Object.assign(Y(jo,[["__scopeId","data-v-da216363"]]),{__name:"PageSectionLogoWall"}),Do={key:0,class:"logo-marquee-section grid gap-40 pad-md-100 pad-top-bottom"},No={key:0,class:"subtitle subtitle--circle yellow-dot"},Bo={"data-draggable-marquee-collection":"",class:"logo-draggable-marquee__collection"},Fo={"data-draggable-marquee-list":"",class:"logo-draggable-marquee__list"},Wo={"aria-hidden":"true",class:"logo-draggable-marquee__list logo-draggable-marquee__list--clone"},zo={__name:"PageSectionLogoMarquee",props:{section:{type:Object,required:!0}},setup(r){Q.registerPlugin(he);const a=r,y=G(null),m=x(()=>(a.section?.logoMarqueeLogos||[]).filter(c=>c?.asset?.url)),w=[];let n=null;function v(){n?.disconnect(),n=null}function S(){const c=y.value;!c||c.getAttribute("data-draggable-marquee-init")==="initialized"||n||(n=new ResizeObserver(()=>{s(),y.value?.getAttribute("data-draggable-marquee-init")==="initialized"&&v()}),n.observe(c))}function $(){se(()=>{s(),S()})}function s(){const c=y.value;if(!c||c.getAttribute("data-draggable-marquee-init")==="initialized")return;const u=c.querySelector("[data-draggable-marquee-collection]"),P=u?.querySelectorAll(".logo-draggable-marquee__list"),f=P?.[0],l=P?.[1];if(!u||!f||!l||!m.value.length)return;const _=f.querySelector(".logo-draggable-marquee__item"),g=getComputedStyle(f),k=_?_.getBoundingClientRect().width:0,C=Number.parseFloat(g.columnGap||g.gap||"0"),B=Math.round(m.value.length*k+m.value.length*C),O=l.offsetLeft-f.offsetLeft,p=Math.round(f.scrollWidth||f.getBoundingClientRect().width),I=Math.round(B||O||p);if(!I)return;let R=0;const h=.04,q=Q.utils.wrap(-I,0),M=Q.quickTo(u,"x",{duration:.5,ease:"power3",modifiers:{x:D=>`${Math.round(q(Number.parseFloat(D)||0))}px`}});M(R);const H=he.create({target:u,type:"pointer,touch",preventDefault:!0,debounce:!1,onPress:()=>{c.setAttribute("data-dragging","true")},onDrag:D=>{R+=D.deltaX,M(R)},onRelease:()=>{c.setAttribute("data-dragging","false")},onStop:()=>{c.setAttribute("data-dragging","false")}});function b(D,j){R-=j*h,M(R)}Q.ticker.add(b),c.setAttribute("data-draggable-marquee-init","initialized"),w.push(()=>{H.kill(),Q.ticker.remove(b),Q.killTweensOf(u),c.setAttribute("data-draggable-marquee-init",""),c.setAttribute("data-dragging","false"),Q.set(u,{clearProps:"transform"})})}return oe(()=>{$()}),ie(()=>m.value.length,()=>{w.splice(0).forEach(c=>c()),v(),$()}),pe(()=>{v(),w.splice(0).forEach(c=>c())}),(c,u)=>{const P=te;return i(m).length>0?(e(),t("section",Do,[a.section.logoMarqueeTitle||a.section.title?(e(),t("h2",No,L(a.section.logoMarqueeTitle||a.section.title),1)):d("",!0),o("div",{ref_key:"wrapperRef",ref:y,"data-draggable-marquee-init":"","data-direction":"left",class:"logo-draggable-marquee",onDragstart:u[0]||(u[0]=le(()=>{},["prevent"])),onSelectstart:u[1]||(u[1]=le(()=>{},["prevent"]))},[o("div",Bo,[o("div",Fo,[(e(!0),t(F,null,V(i(m),(f,l)=>(e(),t("div",{key:`${f._key||l}-a`,class:"logo-draggable-marquee__item",draggable:"false"},[f.asset?.url?(e(),T(P,{key:0,src:f.asset.url,alt:f.alt||"",fit:"contain",class:"logo-draggable-marquee__item-media",draggable:"false"},null,8,["src","alt"])):d("",!0)]))),128))]),o("div",Wo,[(e(!0),t(F,null,V(i(m),(f,l)=>(e(),t("div",{key:`${f._key||l}-b`,class:"logo-draggable-marquee__item",draggable:"false"},[f.asset?.url?(e(),T(P,{key:0,src:f.asset.url,alt:f.alt||"",fit:"contain",class:"logo-draggable-marquee__item-media",draggable:"false"},null,8,["src","alt"])):d("",!0)]))),128))])])],544)])):d("",!0)}}},Ho=Y(zo,[["__scopeId","data-v-fd5a357d"]]),Vo={key:0,class:"clients-section grid gap-30"},Go={class:"show-md"},Uo={key:0,class:"subtitle subtitle--circle orange-dot"},Xo={class:"rounded-medium pad-50 pad-md-50 grid gap-30",style:{"background-color":"var(--pink-tint-3)"}},Ko={class:"hide-md"},Qo={key:0,class:"subtitle small subtitle--circle white-dot"},Ce=799,Yo={__name:"PageSectionClients",props:{section:{type:Object,required:!0}},setup(r){const a=r,y=x(()=>a.section?.clientsImages||[]),m=x(()=>{const f=[];for(let l=0;l<y.value.length;l+=3)f.push(y.value.slice(l,l+3));return f}),w=G(null),n=G(null),v=G(null);let S=()=>{},$=()=>{};async function s(){if(!w.value||window.innerWidth>Ce||v.value||m.value.length<=1)return;const f=(await re(async()=>{const{default:l}=await import("./G_YIQCB9.js").then(_=>_.i);return{default:l}},[],import.meta.url)).default;v.value=new f(w.value,{prevNextButtons:!1,pageDots:!0,wrapAround:!0,adaptiveHeight:!1,cellAlign:"center",contain:!0,draggable:!0})}function c(){v.value&&(v.value.destroy(),v.value=null)}function u(){if(window.innerWidth<=Ce){$(),s();return}c(),P()}function P(){if(window.innerWidth<800||!n.value)return;$();const f=n.value.querySelectorAll(".clients-section__item");if(!f.length)return;Q.set(f,{autoAlpha:0,y:20});const l=Q.to(f,{autoAlpha:1,y:0,duration:.5,ease:"power2.out",stagger:.1,paused:!0});let _=null;_=new IntersectionObserver(g=>{g[0]?.isIntersecting&&(l.play(),_?.disconnect(),_=null)},{rootMargin:"0px 0px -35% 0px",threshold:.01}),_.observe(n.value),$=()=>{_?.disconnect(),l.kill(),Q.set(f,{clearProps:"opacity,visibility,transform"})}}return ie(()=>m.value.length,async()=>{await se(),c(),$(),s(),P()}),oe(async()=>{await se(),await s(),P(),window.addEventListener("resize",u),S=()=>window.removeEventListener("resize",u)}),ve(()=>{S(),c(),$()}),(f,l)=>{const _=te;return i(y).length?(e(),t("section",Vo,[o("div",Go,[r.section.clientsTitle||r.section.title?(e(),t("h2",Uo,L(r.section.clientsTitle||r.section.title),1)):d("",!0)]),o("div",Xo,[o("div",Ko,[r.section.clientsTitle||r.section.title?(e(),t("h2",Qo,L(r.section.clientsTitle||r.section.title),1)):d("",!0)]),o("div",{ref_key:"gridRef",ref:n,class:"clients-section__grid pad-60 pad-top-bottom"},[(e(!0),t(F,null,V(i(y),(g,k)=>(e(),t("article",{key:g._key||`client-grid-${k}`,class:"clients-section__item"},[g.image?.asset?.url?(e(),T(_,{key:0,src:g.image.asset.url,alt:g.alt||"",width:g.image.asset.metadata?.dimensions?.width,height:g.image.asset.metadata?.dimensions?.height,class:"clients-section__image",loading:"lazy"},null,8,["src","alt","width","height"])):d("",!0)]))),128))],512),o("div",{ref_key:"carouselRef",ref:w,class:"clients-section__carousel"},[(e(!0),t(F,null,V(i(m),(g,k)=>(e(),t("div",{key:`client-slide-${k}`,class:"clients-section__slide"},[(e(!0),t(F,null,V(g,(C,B)=>(e(),t("article",{key:C._key||`client-slide-item-${k}-${B}`,class:"clients-section__item"},[C.image?.asset?.url?(e(),T(_,{key:0,src:C.image.asset.url,alt:C.alt||"",width:C.image.asset.metadata?.dimensions?.width,height:C.image.asset.metadata?.dimensions?.height,class:"clients-section__image",loading:"lazy"},null,8,["src","alt","width","height"])):d("",!0)]))),128))]))),128))],512)])])):d("",!0)}}},Jo=Object.assign(Y(Yo,[["__scopeId","data-v-45225d1f"]]),{__name:"PageSectionClients"}),Zo={class:"contact-section grid gap-30"},en={class:"contact-section__panels"},tn={key:0,class:"contact-section__title fluid-type line-height-1",style:{"--desktop":"72","--mobile":"40"}},sn={key:1,class:"grid gap-30"},on={key:0,class:"contact-section__right-title fluid-type line-height-1",style:{"--desktop":"72","--mobile":"40"}},nn={key:1,class:"contact-information-list grid gap-50"},an={class:"contact-information-link-wrap"},rn=["href","target","rel"],ln={__name:"PageSectionContact",props:{section:{type:Object,required:!0}},setup(r){const a=r,y=x(()=>a.section.contactTitle||a.section.title||""),m=x(()=>a.section.contactInformation||[]),w=x(()=>a.section.contactLeftBackgroundColour||"var(--pink)"),n=x(()=>a.section.contactRightBackgroundColour||"var(--pink-tint-4)"),v=x(()=>a.section.contactDotColour||"var(--orange)"),S=x(()=>a.section.contactVideo?.asset?.url||""),$=x(()=>{const P=a.section.contactVideoAspectRatio;return P==="portrait"?"portrait":P==="landscape"?"landscape":""}),{contactLinkUsesNative:s,isExternalHttp:c,getContactLinkUrl:u}=Fe();return(P,f)=>{const l=He,_=Ie;return e(),t("section",Zo,[o("div",en,[o("div",{class:"contact-section__panel contact-section__panel--left rounded-medium pad-50 pad-md-50 grid gap-120 gap-md-80",style:ne({backgroundColor:i(w)})},[i(y)?(e(),t("h2",tn,L(i(y)),1)):d("",!0),i(S)?(e(),t("div",sn,[r.section.contactVideoSubtitle?(e(),t("p",{key:0,class:"contact-section__video-subtitle subtitle subtitle--circle",style:ne({"--subtitle-dot-color":i(v)})},L(r.section.contactVideoSubtitle),5)):d("",!0),i(S)?(e(),t("div",{key:1,class:ee(["contact-section__video rounded-medium",i($)])},[de(l,{type:"html5",src:i(S),variant:"contact"},null,8,["src"])],2)):d("",!0)])):d("",!0)],4),o("div",{class:"contact-section__panel contact-section__panel--right rounded-medium pad-50 pad-md-50 grid gap-120 gap-md-80",style:ne({backgroundColor:i(n)})},[r.section.contactRightTitle?(e(),t("h3",on,L(r.section.contactRightTitle),1)):d("",!0),i(m).length?(e(),t("div",nn,[(e(!0),t(F,null,V(i(m),g=>(e(),t("div",{key:g._key,class:"contact-information-item gap-20"},[o("div",{class:"contact-information-item-title subtitle subtitle--circle",style:ne(i(v)?{"--subtitle-dot-color":i(v)}:void 0)},L(g.title),5),o("div",an,[i(s)(i(u)(g))?(e(),t("a",{key:0,href:i(u)(g),target:i(c)(i(u)(g))?"_blank":void 0,rel:i(c)(i(u)(g))?"noopener":void 0,class:"contact-information-link fluid-type line-height-1",style:{"--desktop":"54","--mobile":"24"}},L(g.linkText),9,rn)):(e(),T(_,{key:1,to:i(u)(g),class:"contact-information-link fluid-type line-height-1",style:{"--desktop":"54","--mobile":"24"}},{default:_e(()=>[$e(L(g.linkText),1)]),_:2},1032,["to"]))])]))),128))])):d("",!0)],4)])])}}},cn=Y(ln,[["__scopeId","data-v-f492c5b3"]]),un={class:"spotify-player-section grid gap-30 pad-60 pad-top-bottom"},dn={key:0,class:"subtitle subtitle--circle red-dot"},_n={class:"spotify-player-wrapper rounded-medium"},pn=["src"],gn={key:1,class:"spotify-player-placeholder"},mn={__name:"PageSectionSpotifyPlayer",props:{section:{type:Object,required:!0}},setup(r){const a=r,y=x(()=>{const m=a.section?.spotifyEmbedUrl?.trim();if(!m)return"";const n=(m.match(/src=["']([^"']+)["']/i)?.[1]||m).trim();return n.startsWith("https://open.spotify.com/embed/")?n:""});return(m,w)=>(e(),t("section",un,[r.section.spotifyTitle||r.section.title?(e(),t("h2",dn,L(r.section.spotifyTitle||r.section.title),1)):d("",!0),o("div",_n,[i(y)?(e(),t("iframe",{key:0,src:i(y),title:"Spotify player",loading:"lazy",allow:"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",class:"spotify-player-embed"},null,8,pn)):(e(),t("div",gn," Spotify player is ready. Add a Spotify embed URL or connect API data. "))])]))}},fn=Y(mn,[["__scopeId","data-v-b3498b5f"]]),hn={class:"page"},yn={key:0},vn={key:1,class:"page-content"},kn={key:0,style:{padding:"var(--gutter)"}},bn={key:2},wn={__name:"[...slug]",setup(r){const a=We(),{setLoading:y}=Te(),m=x(()=>a.path==="/"?"home":a.params.slug?Array.isArray(a.params.slug)?a.params.slug.join("/"):a.params.slug:a.path.replace(/^\//,"")||null),{data:w,pending:n,error:v}=Ee(()=>`page-${a.path}`,async()=>{if(!m.value)return null;const s=`*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      devBackgroundImage {
        asset-> {
          url
        }
      },
      sections[]-> {
        _id,
        _type,
        title,
        featuredProjectsTitle,
        newsTitle,
        sectionType,
        newsItems[] {
          _key,
          newsPost-> {
            _id,
            content,
            featuredImage {
              asset-> {
                url,
                metadata {
                  dimensions {
                    width,
                    height
                  }
                }
              }
            }
          }
        },
        featuredProjects[] {
          project-> {
            _id,
            title,
            slug,
            thumbnailDescription,
            thumbnailStats[] {
              _key,
              label,
              value,
              icon
            },
            featuredImage {
              asset->
            },
            featuredImageMobile {
              asset->
            }
          }
        },
        infoImage {
          asset-> {
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              }
            }
          }
        },
        infoContent[] {
          _type,
          _key,
          title,
          text,
          largeText,
          links[] {
            linkTitle,
            subtitle,
            link,
            openInNewTab
          },
          content,
          image {
            asset->
          },
          spanTwoColumns,
          showOnDesktop,
          showOnMobile
        },
        servicesTitle,
        spotifyTitle,
        spotifyEmbedUrl,
        servicesTextarea,
        cardsSectionTitle,
        heroCarouselLeftTiming,
        heroCarouselEnableRight,
        heroCarouselLoopAtSameTime,
        heroCarouselRightTiming,
        heroCarouselLeft[] {
          _key,
          mediaType,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            }
          },
          video {
            asset-> {
              _id,
              url
            }
          }
        },
        heroCarouselRight[] {
          _key,
          mediaType,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            }
          },
          video {
            asset-> {
              _id,
              url
            }
          }
        },
        heroCarouselMobile[] {
          _key,
          mediaType,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            }
          },
          video {
            asset-> {
              _id,
              url
            }
          }
        },
        textContent,
        kineticTypographyLine1,
        kineticTypographyHighlightStart,
        kineticTypographyHighlightConnector,
        kineticTypographyHighlightEnd,
        kineticTypographyText,
        cardsDisableScrollDemo,
        cards[] {
          _key,
          title,
          description,
          mediaType,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            }
          },
          video {
            asset->
          }
        },
        autoscrollGalleryAspectRatio,
        autoscrollGallerySpeed,
        autoscrollGalleryDirection,
        autoscrollGalleryItems[] {
          _key,
          mediaType,
          link,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            }
          },
          video {
            asset-> {
              _id,
              url
            }
          }
        },
        thumbnailAspectRatio,
        teamMembers[] {
          _key,
          name,
          role,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            }
          }
        },
        logoWallShuffle,
        logoWallLogos[] {
          _key,
          alt,
          "asset": asset.asset-> {
            _id,
            url
          }
        },
        logoMarqueeLogos[] {
          _key,
          alt,
          "asset": asset.asset-> {
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              }
            }
          }
        },
        logoMarqueeTitle,
        clientsTitle,
        clientsImages[] {
          _key,
          alt,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            }
          }
        },
        contactTitle,
        contactVideoSubtitle,
        contactVideo {
          asset-> {
            _id,
            url
          }
        },
        contactVideoAspectRatio,
        contactRightTitle,
        contactInformation[] {
          _key,
          title,
          linkText,
          url,
          link {
            type,
            page-> {
              slug {
                current
              }
            },
            url
          }
        },
        contactLeftBackgroundColour,
        contactRightBackgroundColour,
        contactDotColour
      },
      "portfolioProjects": *[_type == "portfolio"] | order(orderRank) {
        _id,
        title,
        slug,
        thumbnailDescription,
        thumbnailStats[] {
          _key,
          label,
          value,
          icon
        },
        featuredImage {
          asset->
        },
        featuredImageMobile {
          asset->
        }
      }
    }`;try{const u=(await $fetch("/api/sanity/query",{method:"POST",body:{query:s,params:{slug:m.value}}}))?.result;return u&&u._id?u:null}catch(c){throw c}},{watch:[m]}),S=x(()=>w.value?.sections||[]),$=x(()=>w.value?.portfolioProjects||[]);return ze(()=>{const s=w.value?.devBackgroundImage?.asset?.url;return s?{bodyAttrs:{"data-page-dev-bg":"true",style:[`background-image:url("${s}")`,"background-size: 100%","background-position: left top","background-repeat:no-repeat"].join(";")}}:{bodyAttrs:{"data-page-dev-bg":void 0,style:void 0}}}),ie(n,s=>{y(s)},{immediate:!0}),(s,c)=>{const u=st,P=mt,f=Ct,l=Ot,_=Ft,g=ts,k=je,C=js,B=Us,O=Zs,p=ho,I=Ro,R=Oo,h=Ho,q=Jo,M=cn,H=fn;return e(),t("div",hn,[i(v)?(e(),t("div",yn,[o("p",null,"Error loading page: "+L(i(v).message),1)])):i(w)?(e(),t("div",vn,[i(S).length===0?(e(),t("div",kn,[...c[0]||(c[0]=[o("p",null,"No sections found for this page. Add sections in Sanity.",-1)])])):d("",!0),(e(!0),t(F,null,V(i(S),b=>(e(),t("div",{key:b._id,class:"page-section"},[b.sectionType==="featuredProjects"?(e(),T(u,{key:0,section:b},null,8,["section"])):b.sectionType==="heroCarousel"?(e(),T(P,{key:1,section:b},null,8,["section"])):b.sectionType==="info"?(e(),T(f,{key:2,section:b},null,8,["section"])):b.sectionType==="services"?(e(),T(l,{key:3,section:b},null,8,["section"])):b.sectionType==="text"?(e(),T(_,{key:4,section:b},null,8,["section"])):b.sectionType==="kineticTypography"?(e(),T(g,{key:5,section:b},null,8,["section"])):b.sectionType==="cards"?(e(),T(k,{key:6,section:b},null,8,["section"])):b.sectionType==="stackingCards"?(e(),T(C,{key:7,section:b},null,8,["section"])):b.sectionType==="autoscrollGallery"?(e(),T(B,{key:8,section:b},null,8,["section"])):b.sectionType==="news"||b.sectionType==="pressAwards"?(e(),T(O,{key:9,section:b},null,8,["section"])):b.sectionType==="portfolio"?(e(),T(p,{key:10,section:b,projects:i($)},null,8,["section","projects"])):b.sectionType==="team"?(e(),T(I,{key:11,section:b},null,8,["section"])):b.sectionType==="logoWall"?(e(),T(R,{key:12,section:b},null,8,["section"])):b.sectionType==="logoMarquee"?(e(),T(h,{key:13,section:b},null,8,["section"])):b.sectionType==="clients"?(e(),T(q,{key:14,section:b},null,8,["section"])):b.sectionType==="contact"?(e(),T(M,{key:15,section:b},null,8,["section"])):b.sectionType==="spotifyPlayer"?(e(),T(H,{key:16,section:b},null,8,["section"])):d("",!0)]))),128))])):(e(),t("div",bn,[...c[1]||(c[1]=[o("p",null,"Page not found",-1)])]))])}}},Tn=Y(wn,[["__scopeId","data-v-157dccc2"]]);export{Tn as default};
