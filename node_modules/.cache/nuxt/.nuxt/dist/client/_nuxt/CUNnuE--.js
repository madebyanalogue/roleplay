const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Cb8-EniE.js","./entry.wTB5BXBk.css","./DhjvDC2M.js","./CqkleIqs.js"])))=>i.map(i=>d[i]);
import{_ as Z,f as $,c as t,o as e,g as I,h as _,i as n,n as Q,a as i,j as se,F as V,k as qe,r as U,l as Le,m as we,p as oe,q as ie,s as te,v as Se,x as ve,t as C,y as X,w as pe,b as re,e as $e,z as Re,A as fe,B as he,C as Ne,D as ge,E as Ce,G as le,H as ce,d as be,I as _e,J as K,O as ye,S as Fe,K as ae,L as xe,M as Be,N as We,u as Ve}from"./Cb8-EniE.js";import{s as ke,_ as He}from"./BXvW38V6.js";const ze=["src"],Ge=["src"],Ue={__name:"PortfolioThumbnailMedia",props:{project:{type:Object,required:!0},imageClass:{type:String,default:"portfolio-thumbnail-media"}},setup(c){const a=c;function y(w){const u=w?.thumbnailMediaTypeMobile;return!u||u==="inherit"?w?.thumbnailMediaType||"image":u}const g=$(()=>a.project?.thumbnailMediaType||"image"),h=$(()=>y(a.project)),r=$(()=>a.project?.featuredVideo?.asset?.url||""),m=$(()=>h.value!=="video"?"":a.project?.featuredVideoMobile?.asset?.url||r.value),b=$(()=>h.value!=="image"?"":a.project?.featuredImageMobile?.asset?.url||a.project?.featuredImage?.asset?.url||""),x=$(()=>a.project?.featuredImageMobile?.asset?.metadata?.dimensions?.width||a.project?.featuredImage?.asset?.metadata?.dimensions?.width),s=$(()=>a.project?.featuredImageMobile?.asset?.metadata?.dimensions?.height||a.project?.featuredImage?.asset?.metadata?.dimensions?.height),l=$(()=>h.value!==g.value?!0:h.value==="video"?!!a.project?.featuredVideoMobile?.asset?.url:!!a.project?.featuredImageMobile?.asset),p=$(()=>g.value==="video"&&!!r.value),P=$(()=>g.value==="image"&&!!a.project?.featuredImage?.asset),v=$(()=>l.value&&h.value==="video"&&!!m.value),o=$(()=>l.value&&h.value==="image"&&!!b.value);return(w,u)=>{const f=se;return e(),t(V,null,[n(p)?(e(),t("video",{key:0,autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata",class:Q([c.imageClass,n(l)?"is-desktop-archive-img":""])},[i("source",{src:n(r),type:"video/mp4"},null,8,ze)],2)):n(P)?(e(),I(f,{key:1,src:c.project.featuredImage.asset.url||"",alt:"",fit:"cover",class:Q([c.imageClass,n(l)?"is-desktop-archive-img":""]),width:c.project.featuredImage.asset.metadata?.dimensions?.width,height:c.project.featuredImage.asset.metadata?.dimensions?.height},null,8,["src","class","width","height"])):_("",!0),n(v)?(e(),t("video",{key:2,autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata",class:Q([c.imageClass,"is-mobile-archive-img"])},[i("source",{src:n(m),type:"video/mp4"},null,8,Ge)],2)):n(o)?(e(),I(f,{key:3,src:n(b),alt:"",fit:"cover",class:Q([c.imageClass,"is-mobile-archive-img"]),width:n(x),height:n(s)},null,8,["src","class","width","height"])):_("",!0)],64)}}},Me=Z(Ue,[["__scopeId","data-v-38d4293c"]]),Xe={key:0,class:"featured-projects__title subtitle subtitle--circle orange-dot"},Ke=["data-lenis-prevent"],Ze={class:"featured-project-image-container rounded-medium"},Qe={class:"featured-project-image-wrapper"},Je={class:"portfolio-item-overlay pad-40"},Ye={class:"portfolio-item-overlay-inner gap-40"},et={class:"portfolio-item-overlay-title fluid-type line-height-1",style:{"--desktop":"72"}},tt={class:"portfolio-item-overlay-content gap-50"},st={key:0,class:"portfolio-item-overlay-desc fluid-type pad-20 pad-bottom",style:{"--desktop":"36"}},ot="(min-width: 1000px)",me=650,it=10,nt={__name:"PageSectionFeaturedProjects",props:{section:{type:Object,required:!0}},setup(c){const a=c,{portfolioProjectPath:y}=qe(),g=U(null),h=U(null),r=U(null),m=U(null),b=U(null),x=Le(),{isLoading:s}=we();let l=null,p=null,P=()=>{};const v=$(()=>a.section?.featuredProjects||[]),o=U(!1);let w=null,u=()=>{},f=0;function R(){const T=getComputedStyle(document.documentElement).getPropertyValue("--gutter").trim(),B=Number.parseFloat(T);return Number.isFinite(B)?B:20}function z(){return`bottom bottom-=${R()}`}function G(){const T=b.value,B=m.value;return!T||!B?0:Math.max(0,T.scrollWidth-B.clientWidth)}function A(T){he(T,g.value)}async function q(T){const B=T.querySelectorAll("img"),k=T.querySelectorAll("video");await Promise.all([...Array.from(B).map(H=>new Promise(d=>{if(H.complete){d();return}H.addEventListener("load",d,{once:!0}),H.addEventListener("error",d,{once:!0})})),...Array.from(k).map(H=>new Promise(d=>{if(H.readyState>=1){d();return}H.addEventListener("loadedmetadata",d,{once:!0}),H.addEventListener("error",d,{once:!0})}))])}async function L(){if(l?.revert(),l=null,v.value.length<2||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const{gsap:T,ScrollTrigger:B}=await Re();!T||!B||(l=T.matchMedia(),l.add(ot,()=>{let k=null,H=null,d=!1;const M=()=>{fe()};return window.addEventListener("resize",M,{passive:!0}),(async()=>{const D=g.value,J=h.value,j=b.value,S=m.value;if(d||!D||!J||!j||!S||(await q(D),d)||(await new Promise(N=>requestAnimationFrame(N)),await new Promise(N=>requestAnimationFrame(N)),d))return;if(G()<=0){v.value.length>1&&f<it&&(f+=1,O(150));return}f=0,T.set(j,{x:0}),k=T.to(j,{x:()=>-G(),ease:"none"}),H=B.create({trigger:D,pin:J,pinSpacing:!0,start:z,scrub:.45,anticipatePin:0,invalidateOnRefresh:!0,end:()=>`+=${G()}`,animation:k,onRefresh(N){A(N)},onEnter(N){A(N)},onEnterBack(N){A(N)}}),A(H),fe(),D.dataset.featuredProjectsReady="true",document.dispatchEvent(new CustomEvent("featured-projects-scroll-ready"))})(),()=>{d=!0,window.removeEventListener("resize",M),H?.kill(),H=null,k?.kill(),k=null,b.value&&T.set(b.value,{clearProps:"transform"})}}))}function O(T=0){p&&clearTimeout(p),p=setTimeout(async()=>{p=null,await te(),L()},T)}function Y(T){if(document.body.classList.contains("preloader-complete")){T();return}document.addEventListener("preloader-complete",T,{once:!0})}return oe(()=>v.value.map(T=>[T._key,T.project?._id,T.project?.slug?.current,T.project?.featuredImage?.asset?.url,T.project?.featuredImageMobile?.asset?.url,T.project?.thumbnailMediaType,T.project?.thumbnailMediaTypeMobile,T.project?.featuredVideo?.asset?.url,T.project?.featuredVideoMobile?.asset?.url].join(":")).join("|"),()=>{O(me)}),oe(s,T=>{T||O(me)}),ie(async()=>{await te(),w=window.matchMedia("(max-width: 999px)"),u=()=>{o.value=w.matches},u(),w.addEventListener("change",u),P=x.hook("page:finish",()=>{O(me)}),Y(()=>{O()})}),Se(()=>{O(me)}),ve(()=>{w?.removeEventListener("change",u),w=null,p&&clearTimeout(p),p=null,P(),g.value&&delete g.value.dataset.featuredProjectsReady,l?.revert(),l=null}),(T,B)=>{const k=Me,H=$e;return e(),t("section",{ref_key:"sectionRef",ref:g,class:"featured-projects","data-featured-projects-scroll":""},[i("div",{ref_key:"pinRef",ref:h,class:"featured-projects__pin grid gap-30 pad-gutter pad-top"},[a.section.featuredProjectsTitle||a.section.title?(e(),t("h2",Xe,C(a.section.featuredProjectsTitle||a.section.title),1)):_("",!0),i("div",{ref_key:"scrollRef",ref:r,class:"featured-projects__scroll"},[i("div",{ref_key:"viewportRef",ref:m,class:"featured-projects__viewport","data-lenis-prevent":n(o)?"":void 0},[i("div",{ref_key:"trackRef",ref:b,class:"featured-projects__track"},[(e(!0),t(V,null,X(n(v),d=>(e(),t("article",{key:d.project?._id||d._key,class:"featured-project"},[d.project?.slug?.current?(e(),I(H,{key:0,to:n(y)(d.project.slug),class:"featured-project-link"},{default:pe(()=>[i("div",Ze,[i("div",Qe,[re(k,{project:d.project,"image-class":"featured-project-image"},null,8,["project"]),i("div",Je,[B[0]||(B[0]=i("div",{class:"portfolio-item-overlay-bg","aria-hidden":"true"},null,-1)),i("div",Ye,[i("h3",et,C(d.project?.title),1),i("div",tt,[d.project?.thumbnailDescription?(e(),t("div",st,C(d.project.thumbnailDescription),1)):_("",!0)])])])])])]),_:2},1032,["to"])):_("",!0)]))),128))],512)],8,Ke)],512)],512)],512)}}},at=Object.assign(Z(nt,[["__scopeId","data-v-a45ced49"]]),{__name:"PageSectionFeaturedProjects"}),rt={class:"hero-carousel"},lt={key:0,class:"hero-carousel__desktop"},ct={class:"hero-carousel__column rounded-medium"},ut={class:"hero-carousel__stack"},dt=["src","type"],pt={key:0,class:"hero-carousel__column rounded-medium"},_t={class:"hero-carousel__stack"},gt=["src","type"],mt={key:1,class:"hero-carousel__mobile rounded-medium"},ht={class:"hero-carousel__stack"},ft=["src","type"],yt={__name:"PageSectionHeroCarousel",props:{section:{type:Object,required:!0}},setup(c){const a=c,y=U(0),g=U(0),h=U(0),r=U(!1),m=U(!1),b=U(!1);let x=null,s=null,l=null,p=0;function P(S){return S?S.mediaType==="video"?!!S.video?.asset?.url:!!S.image?.asset?.url:!1}function v(S,W=4e3){const N=Number.parseInt(S,10);return!Number.isFinite(N)||N<100?W:N}function o(S,W=!1){if(typeof S=="boolean")return S;if(typeof S=="string"){const N=S.trim().toLowerCase();if(["true","1","yes","on"].includes(N))return!0;if(["false","0","no","off",""].includes(N))return!1}return typeof S=="number"?S!==0:W}function w(S){if(!S||typeof S!="string")return"video/mp4";const W=S.toLowerCase();return W.endsWith(".webm")?"video/webm":W.endsWith(".ogg")||W.endsWith(".ogv")?"video/ogg":"video/mp4"}const u=$(()=>(a.section?.heroCarouselLeft||[]).filter(P)),f=$(()=>(a.section?.heroCarouselRight||[]).filter(P)),R=$(()=>(a.section?.heroCarouselMobile||[]).filter(P)),z=$(()=>o(a.section?.heroCarouselEnableRight,!1)),G=$(()=>o(a.section?.heroCarouselLoopAtSameTime,!1)),A=$(()=>z.value&&f.value.length>0),q=$(()=>u.value.length>0),L=$(()=>v(a.section?.heroCarouselLeftTiming,4e3)),O=$(()=>v(a.section?.heroCarouselRightTiming,4e3)),Y=$(()=>L.value),T=$(()=>R.value.length?R.value:u.value),B=$(()=>T.value.length?T.value[h.value%T.value.length]:null);function k(S=[]){return S.filter(W=>W?.mediaType!=="video"&&W?.image?.asset?.url).map(W=>W.image.asset.url)}function H(S){return new Promise(W=>{if(!S){W();return}const N=new Image;N.onload=()=>W(),N.onerror=()=>W(),N.src=S})}async function d(S=[]){const W=k(S);return W.length&&await Promise.all(W.map(N=>H(N))),!0}async function M(){const S=++p;r.value=k(u.value).length===0,m.value=k(f.value).length===0,b.value=k(T.value).length===0,await Promise.all([d(u.value),d(f.value),d(T.value)]),S===p&&(r.value=!0,m.value=!0,b.value=!0)}function E(){x&&(clearInterval(x),x=null),s&&(clearInterval(s),s=null),l&&(clearInterval(l),l=null)}function D(){y.value=0,g.value=0,h.value=0}function J(){E(),D(),u.value.length>1&&(x=ke(()=>{const S=(y.value+1)%u.value.length,W=S===0;y.value=S,A.value&&G.value&&W&&(g.value=(g.value+1)%f.value.length)},L.value)),A.value&&!G.value&&f.value.length>1&&(s=ke(()=>{g.value=(g.value+1)%f.value.length},O.value)),T.value.length>1&&(l=ke(()=>{h.value=(h.value+1)%T.value.length},Y.value))}async function j(){await M(),J()}return oe(()=>[u.value.length,f.value.length,R.value.length,z.value,G.value,L.value,O.value],()=>{j()}),ie(()=>{j()}),Se(()=>{j()}),Ne(()=>{p+=1,E()}),ge(()=>{p+=1,E()}),(S,W)=>{const N=se;return e(),t("section",rt,[n(q)?(e(),t("div",lt,[i("div",ct,[i("div",ut,[(e(!0),t(V,null,X(n(u),(F,ee)=>(e(),t(V,{key:`left-item-${F._key||ee}`},[F.mediaType==="video"&&F.video?.asset?.url?(e(),t("video",{key:0,class:Q(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===n(y)}]),autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},[i("source",{src:F.video.asset.url,type:w(F.video.asset.url)},null,8,dt)],2)):F.image?.asset?.url?(e(),I(N,{key:1,src:F.image.asset.url,alt:c.section.title||"",class:Q(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===n(y)&&n(r)}]),fit:"cover"},null,8,["src","alt","class"])):_("",!0)],64))),128))])]),n(A)?(e(),t("div",pt,[i("div",_t,[(e(!0),t(V,null,X(n(f),(F,ee)=>(e(),t(V,{key:`right-item-${F._key||ee}`},[F.mediaType==="video"&&F.video?.asset?.url?(e(),t("video",{key:0,class:Q(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===n(g)}]),autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},[i("source",{src:F.video.asset.url,type:w(F.video.asset.url)},null,8,gt)],2)):F.image?.asset?.url?(e(),I(N,{key:1,src:F.image.asset.url,alt:c.section.title||"",class:Q(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===n(g)&&n(m)}]),fit:"cover"},null,8,["src","alt","class"])):_("",!0)],64))),128))])])):_("",!0)])):_("",!0),n(B)?(e(),t("div",mt,[i("div",ht,[(e(!0),t(V,null,X(n(T),(F,ee)=>(e(),t(V,{key:`mobile-item-${F._key||ee}`},[F.mediaType==="video"&&F.video?.asset?.url?(e(),t("video",{key:0,class:Q(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===n(h)}]),autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},[i("source",{src:F.video.asset.url,type:w(F.video.asset.url)},null,8,ft)],2)):F.image?.asset?.url?(e(),I(N,{key:1,src:F.image.asset.url,alt:c.section.title||"",class:Q(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===n(h)&&n(b)}]),fit:"cover"},null,8,["src","alt","class"])):_("",!0)],64))),128))])])):_("",!0)])}}},vt=Object.assign(Z(yt,[["__scopeId","data-v-0451ff2b"]]),{__name:"PageSectionHeroCarousel"}),kt={class:"info-section"},bt={key:0,class:"info-section-image"},wt={class:"info-section-content"},St={key:0,class:"info-block-title"},$t={key:0,class:"info-block-title"},Tt={key:2,class:"info-links-list"},xt={key:0,class:"info-link-subtitle"},Pt=["href","target","rel"],It={class:"info-link-title"},qt={key:3,class:"info-services-block"},Lt={key:0,class:"info-block-title"},Rt={class:"info-services-content"},Ct={key:4,class:"info-news-block"},Mt={key:0,class:"info-block-title"},jt={key:1,class:"info-news-list"},At={__name:"PageSectionInfo",props:{section:{type:Object,required:!0}},setup(c){const a=r=>{if(r?.metadata?.dimensions){const{width:m,height:b,aspectRatio:x}=r.metadata.dimensions;if(x)return{aspectRatio:`${x}`};if(m&&b)return{aspectRatio:`${m/b}`}}return{aspectRatio:"4 / 3"}};U(null);const y=r=>{r?.target&&r.target.classList.add("loaded")};ie(()=>{te(()=>{const r=document.querySelector(".info-image");r&&r.complete&&r.naturalHeight>0&&r.classList.add("loaded")})});const{data:g}=Ce("news-items",async()=>{const r=`*[_type in ["news", "pressAward"]] | order(orderRank) {
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
  }`;try{return(await $fetch("/api/sanity/query",{method:"POST",body:{query:r}}))?.result||[]}catch(m){return console.error("[News] Error fetching:",m),[]}},{server:!0}),h=(r,m)=>!r||r.startsWith("mailto:")||r.startsWith("tel:")?!1:!!(m||r.startsWith("http://")||r.startsWith("https://")||r.startsWith("//"));return(r,m)=>{const b=se,x=ce;return e(),t("div",kt,[c.section.infoImage?.asset?(e(),t("div",bt,[i("div",{class:"info-image-container",style:le(a(c.section.infoImage.asset))},[re(b,{src:c.section.infoImage.asset.url||"",width:c.section.infoImage.asset.metadata?.dimensions?.width,height:c.section.infoImage.asset.metadata?.dimensions?.height,alt:"",class:"info-image",onLoad:y},null,8,["src","width","height"])],4)])):_("",!0),i("div",wt,[(e(!0),t(V,null,X(c.section.infoContent,(s,l)=>(e(),t("div",{key:s._key||l,class:Q(["info-block",[s._type==="infoImageBlock"&&s.showOnDesktop===!1?"info-block-hide-desktop":"",s._type==="infoImageBlock"&&s.showOnMobile===!1?"info-block-hide-mobile":""]])},[s._type==="infoImageBlock"&&s.image?.asset?(e(),t("div",{key:0,class:Q(["info-image-block",[s._type==="infoImageBlock"&&s.spanTwoColumns?"info-image-block-span-2":""]])},[re(b,{src:s.image.asset.url||"",alt:"",class:"info-image-inline"},null,8,["src"])],2)):s._type==="infoTextBlock"?(e(),t("div",{key:1,class:Q(["info-text-block",{"info-text-block-large":s.largeText}])},[s.title?(e(),t("h2",St,C(s.title),1)):_("",!0),s.text?(e(),I(x,{key:1,blocks:s.text},null,8,["blocks"])):_("",!0)],2)):s._type==="infoLinksBlock"?(e(),t("div",{key:2,class:Q(["info-links-block",{"info-links-block-large":s.largeText}])},[s.title?(e(),t("h2",$t,C(s.title),1)):_("",!0),s.text?(e(),I(x,{key:1,blocks:s.text},null,8,["blocks"])):_("",!0),s.links&&s.links.length>0?(e(),t("div",Tt,[(e(!0),t(V,null,X(s.links,(p,P)=>(e(),t("div",{key:P,class:"info-link-item"},[p.subtitle?(e(),t("span",xt,C(p.subtitle),1)):_("",!0),i("a",{href:p.link,target:h(p.link,p.openInNewTab)?"_blank":void 0,rel:h(p.link,p.openInNewTab)?"noopener":void 0,class:"info-link"},[i("span",It,[be(C(p.linkTitle||p.link)+" ",1),m[0]||(m[0]=i("span",{class:"info-link-arrow"},[be("   "),i("svg",{id:"a","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 18 18"},[i("polygon",{points:"16.5 0 7 0 7 1.5 15.44 1.5 .05 16.89 1.11 17.95 16.5 2.56 16.5 11 18 11 18 1.5 18 0 16.5 0"})])],-1))])],8,Pt)]))),128))])):_("",!0)],2)):s._type==="infoServicesBlock"?(e(),t("div",qt,[s.title?(e(),t("h2",Lt,C(s.title),1)):_("",!0),i("div",Rt,[re(x,{blocks:s.content},null,8,["blocks"])])])):s._type==="infoNewsBlock"||s._type==="infoPressAwardsBlock"?(e(),t("div",Ct,[s.title?(e(),t("h2",Mt,C(s.title),1)):_("",!0),n(g)&&n(g).length>0?(e(),t("div",jt,[(e(!0),t(V,null,X(n(g),(p,P)=>(e(),t("div",{key:p._id||P,class:"info-news-item"},[p.featuredImage?.asset?.url?(e(),I(b,{key:0,src:p.featuredImage.asset.url,width:p.featuredImage.asset.metadata?.dimensions?.width,height:p.featuredImage.asset.metadata?.dimensions?.height,alt:"",class:"info-news-image"},null,8,["src","width","height"])):_("",!0),p.content?(e(),I(x,{key:1,blocks:p.content,class:"info-news-content"},null,8,["blocks"])):_("",!0)]))),128))])):_("",!0)])):_("",!0)],2))),128))])])}}},Et=Object.assign(Z(At,[["__scopeId","data-v-a7f71c1e"]]),{__name:"PageSectionInfo"}),Ot={class:"services-section grid gap-30"},Dt={key:0,class:"subtitle subtitle--circle twisted orange-dot"},Nt={class:"services-section__grid fluid-type",style:{"--desktop":"54","--mobile":"24"}},Ft={__name:"PageSectionServices",props:{section:{type:Object,required:!0}},setup(c){const a=c,y=$(()=>(a.section?.servicesTextarea||"").split(/\r?\n/).map(g=>g.trim()).filter(Boolean));return(g,h)=>(e(),t("section",Ot,[c.section.servicesTitle||c.section.title?(e(),t("h2",Dt,C(c.section.servicesTitle||c.section.title),1)):_("",!0),i("div",Nt,[(e(!0),t(V,null,X(n(y),(r,m)=>(e(),t("div",{key:`service-${m}`,class:"services-section__item"},C(r),1))),128))])]))}},Bt=Z(Ft,[["__scopeId","data-v-13b29f2c"]]),Wt={class:"text-section underline-links pad-top-bottom pad-20 pad-sm-40"},Vt={class:"text-section__inner fluid-type pad-md-20",style:{"--desktop":"73","--mobile":"30"}},Ht={__name:"PageSectionText",props:{section:{type:Object,required:!0}},setup(c){return(a,y)=>{const g=ce;return e(),t("div",Wt,[i("div",Vt,[c.section.textContent?.length?(e(),I(g,{key:0,blocks:c.section.textContent},null,8,["blocks"])):_("",!0)])])}}},zt=Z(Ht,[["__scopeId","data-v-91c9415c"]]),Gt={key:0,class:"kinetic-typography__text kinetic-typography__text--static hide-md"},Ut={key:1,class:"kinetic-typography__text kinetic-typography__text--static hide-md"},Xt={key:0,class:"kinetic-typography__line1"},Kt={key:1,class:"kinetic-typography__line2"},Zt={class:"kinetic-typography__highlight"},Qt={class:"kinetic-typography__highlight"},Jt={key:2,class:"kinetic-typography__stage show-md"},Yt={class:"kinetic-typography__text kinetic-typography__text--animated fluid-type",style:{"--desktop":"108","--mobile":"40"}},es={key:1,class:"kinetic-typography__line2"},ts={class:"kinetic-typography__highlight"},ss={class:"kinetic-typography__highlight"},os="(min-width: 1000px)",is={__name:"PageSectionKineticTypography",props:{section:{type:Object,required:!0}},setup(c){const a=c,y=U(null),g=U(null),h=U(null);let r=null;const m=$(()=>a.section.kineticTypographyLine1??""),b=$(()=>a.section.kineticTypographyHighlightStart??""),x=$(()=>a.section.kineticTypographyHighlightEnd??""),s=$(()=>{const o=a.section.kineticTypographyHighlightConnector;return o==null||o===""?" and ":o}),l=$(()=>!!a.section.kineticTypographyHighlightStart?.trim()||!!a.section.kineticTypographyHighlightEnd?.trim()),p=$(()=>!!a.section.kineticTypographyLine1?.trim()||l.value);function P(){const o=document.createElement("div");o.style.cssText="position:absolute;visibility:hidden;pointer-events:none;height:var(--header-full)",document.documentElement.appendChild(o);const w=o.offsetHeight;return o.remove(),w||89}async function v(){if(r?.revert(),r=null,!p.value)return;const[{gsap:o},{ScrollTrigger:w}]=await Promise.all([_e(()=>import("./Cb8-EniE.js").then(u=>u.U),__vite__mapDeps([0,1]),import.meta.url),_e(()=>import("./Cb8-EniE.js").then(u=>u.V),__vite__mapDeps([0,1]),import.meta.url)]);o.registerPlugin(w),r=o.matchMedia(),r.add(os,()=>{let u=null,f=!1;const R=()=>({section:y.value,line1El:g.value,connectorEl:h.value}),z=({section:A,connectorEl:q,line1El:L})=>{if(!A||!q)return!1;const O=A.querySelector(".kinetic-typography__stage");return!(!O||getComputedStyle(O).display==="none"||q.offsetWidth===0||L&&L.offsetHeight===0)},G=()=>{const{section:A,line1El:q,connectorEl:L}=R();if(f||!z({section:A,connectorEl:L,line1El:q})){requestAnimationFrame(G);return}const O=[...q?[q]:[],L];L.style.display="inline-block",L.style.overflow="hidden",L.style.verticalAlign="bottom",L.style.whiteSpace="pre",q&&(q.style.overflow="hidden");let Y=0,T=0,B=0;const k=()=>{L.style.width="",B=L.offsetWidth,q&&(q.style.height="",q.style.marginBottom="",Y=q.offsetHeight,T=parseFloat(getComputedStyle(q).marginBottom)||0)},H=.5,d=.5,M=.5+.5*.75,E=o.parseEase("power2.inOut"),D=j=>{const S=E(Math.min(1,Math.max(0,j)));if(S<=H){const N=1-S/H;O.forEach(F=>{F.style.opacity=String(N)}),q&&(q.style.height="",q.style.marginBottom=""),L.style.width="";return}k(),O.forEach(N=>{N.style.opacity="0"});const W=Math.min(1,(S-d)/(M-d));q&&(q.style.height=`${Y*(1-W)}px`,q.style.marginBottom=`${T*(1-W)}px`),L.style.width=`${B*(1-W)}px`},J=()=>A.offsetHeight||parseFloat(getComputedStyle(A).height)||0;u=w.create({trigger:A,start:()=>`top top+=${P()}`,end:()=>`+=${J()}`,pin:A,pinSpacing:!0,anticipatePin:1,invalidateOnRefresh:!0,onUpdate(j){D(j.progress)},onRefresh(j){D(j.progress)}}),D(u.progress),document.fonts?.ready&&document.fonts.ready.then(()=>{f||w.refresh()})};return requestAnimationFrame(G),()=>{f=!0,u?.kill(),u=null;const{line1El:A,connectorEl:q}=R();A&&(A.style.opacity="",A.style.height="",A.style.marginBottom="",A.style.overflow=""),q&&(q.style.opacity="",q.style.width="",q.style.display="",q.style.overflow="",q.style.verticalAlign="",q.style.whiteSpace="")}})}return ie(async()=>{await te(),await v()}),ge(()=>{r?.revert(),r=null}),(o,w)=>{const u=ce;return e(),t("section",{ref_key:"sectionRef",ref:y,class:"kinetic-typography"},[c.section.kineticTypographyText?.length?(e(),t("div",Gt,[re(u,{blocks:c.section.kineticTypographyText},null,8,["blocks"])])):n(p)?(e(),t("div",Ut,[n(m)?(e(),t("p",Xt,C(n(m)),1)):_("",!0),n(l)?(e(),t("p",Kt,[i("span",Zt,C(n(b)),1),i("span",null,C(n(s)),1),i("span",Qt,C(n(x)),1)])):_("",!0)])):_("",!0),n(p)?(e(),t("div",Jt,[i("div",Yt,[n(m)?(e(),t("p",{key:0,ref_key:"line1Ref",ref:g,class:"kinetic-typography__line1 kinetic-typography__line1--animated","data-kinetic-fade":""},C(n(m)),513)):_("",!0),n(l)?(e(),t("p",es,[i("span",ts,C(n(b)),1),i("span",{ref_key:"connectorRef",ref:h,class:"kinetic-typography__connector","data-kinetic-fade":""},C(n(s)),513),i("span",ss,C(n(x)),1)])):_("",!0)])])):_("",!0)],512)}}},ns=Object.assign(Z(is,[["__scopeId","data-v-1a9a1829"]]),{__name:"PageSectionKineticTypography"}),as={key:0,class:"cards-section grid gap-30"},rs={key:0,class:"subtitle subtitle--circle purple-dot"},ls={class:"cards-section--grid-mode"},cs={class:"cards-section__grid pad-20 pad-md-60 pad-bottom"},us={class:"cards-section__media"},ds={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"cards-section__video"},ps=["src","type"],_s={class:"cards-section__text"},gs={key:0,class:"cards-section__title fluid-type pad-60 pad-right",style:{"--desktop":"58","--mobile":"24"}},ms={class:"fluid-type",style:{"--desktop":"30","--mobile":"16"}},hs={key:1,class:"cards-section cards-section--stack-mode grid gap-50 pad-30 pad-top"},fs={key:0,class:"subtitle subtitle--circle purple-dot"},ys={class:"cards-section__container"},vs={class:"cards-section__grid"},ks={class:"cards-section__media"},bs={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"cards-section__video"},ws=["src","type"],Ss={class:"cards-section__text"},$s={class:"grid gap-30 pad-md-50 pad-right"},Ts={key:0,class:"cards-section__title fluid-type line-height-1 pad-60 pad-right",style:{"--desktop":"56","--mobile":"24"}},xs={class:"fluid-type",style:{"--desktop":"40","--mobile":"16"}},Ps={__name:"PageSectionCards",props:{section:{type:Object,required:!0}},setup(c){const a=c,y=$(()=>a.section?.cardsDisableScrollDemo===!0),g=$(()=>a.section?.cardsSectionTitle||a.section?.cardsTitle||a.section?.title||"");function h(r){if(!r||typeof r!="string")return"video/mp4";const m=r.toLowerCase();return m.endsWith(".webm")?"video/webm":m.endsWith(".ogg")||m.endsWith(".ogv")?"video/ogg":"video/mp4"}return(r,m)=>{const b=se,x=ce;return n(y)?(e(),t("section",as,[n(g)?(e(),t("h2",rs,C(n(g)),1)):_("",!0),i("div",ls,[(e(!0),t(V,null,X(c.section.cards||[],(s,l)=>(e(),t("article",{key:s._key||l,class:"cards-section__item pad-25 rounded-medium"},[i("div",cs,[i("div",us,[s.mediaType==="video"&&s.video?.asset?.url?(e(),t("video",ds,[i("source",{src:s.video.asset.url,type:h(s.video.asset.url)},null,8,ps)])):s.image?.asset?.url?(e(),I(b,{key:1,src:s.image.asset.url,alt:s.title||"",width:s.image.asset.metadata?.dimensions?.width,height:s.image.asset.metadata?.dimensions?.height,class:"cards-section__image"},null,8,["src","alt","width","height"])):_("",!0)]),i("div",_s,[s.title?(e(),t("h3",gs,C(s.title),1)):_("",!0),i("div",ms,[s.description?.length?(e(),I(x,{key:0,blocks:s.description},null,8,["blocks"])):_("",!0)])])])]))),128))])])):(e(),t("section",hs,[n(g)?(e(),t("h2",fs,C(n(g)),1)):_("",!0),i("div",ys,[(e(!0),t(V,null,X(c.section.cards||[],(s,l)=>(e(),t("article",{key:s._key||l,class:"cards-section__item rounded-medium pad-20 pad-sm-50"},[i("div",vs,[i("div",ks,[s.mediaType==="video"&&s.video?.asset?.url?(e(),t("video",bs,[i("source",{src:s.video.asset.url,type:h(s.video.asset.url)},null,8,ws)])):s.image?.asset?.url?(e(),I(b,{key:1,src:s.image.asset.url,alt:s.title||"",width:s.image.asset.metadata?.dimensions?.width,height:s.image.asset.metadata?.dimensions?.height,class:"cards-section__image"},null,8,["src","alt","width","height"])):_("",!0)]),i("div",Ss,[i("div",$s,[s.title?(e(),t("h3",Ts,C(s.title),1)):_("",!0),i("div",xs,[s.description?.length?(e(),I(x,{key:0,blocks:s.description},null,8,["blocks"])):_("",!0)])])])])]))),128))])]))}}},je=Z(Ps,[["__scopeId","data-v-cd8e521b"]]),Is={key:0,class:"sticky-cards__heading subtitle subtitle--circle purple-dot"},qs={class:"sticky-cards__slides"},Ls={class:"sticky-cards__wrapper"},Rs={class:"sticky-cards__grid"},Cs={class:"sticky-cards__text"},Ms={class:"grid gap-30 pad-md-50 pad-right"},js={key:0,class:"sticky-cards__title fluid-type line-height-1 pad-60 pad-right",style:{"--desktop":"56","--mobile":"24"}},As={class:"fluid-type",style:{"--desktop":"40","--mobile":"16"}},Es={class:"sticky-cards__media"},Os={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"sticky-cards__video"},Ds=["src","type"],Ns="(min-width: 1000px)",ne=650,Pe=10,Fs={__name:"PageSectionStackingCards",props:{section:{type:Object,required:!0}},setup(c){const a=c,y=U(null),g=Le(),{isLoading:h}=we();let r=null,m=null,b=null,x=()=>{},s=()=>{},l=0;const p=$(()=>(a.section?.cards||[]).length>0),P=$(()=>a.section?.cardsSectionTitle||a.section?.cardsTitle||a.section?.title||""),v=$(()=>({...a.section,cardsDisableScrollDemo:!0}));function o(d){if(!d||typeof d!="string")return"video/mp4";const M=d.toLowerCase();return M.endsWith(".webm")?"video/webm":M.endsWith(".ogg")||M.endsWith(".ogv")?"video/ogg":"video/mp4"}function w(){const d=getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim(),M=Number.parseFloat(d);return Number.isFinite(M)?M:49}function u(){const d=getComputedStyle(document.documentElement).getPropertyValue("--gutter").trim(),M=Number.parseFloat(d);return Number.isFinite(M)?M:20}function f(){return`top top+=${w()+u()}`}function R(){return Math.max(window.innerHeight-w()-u(),1)}function z(d){return(d%5-2)*2}function G(d){const M=d.querySelector(".sticky-cards__heading");if(!M){d.style.setProperty("--cards-heading-space","0px");return}const E=M.offsetHeight;d.style.setProperty("--cards-heading-space",`${E}px`)}async function A(d){const M=d.querySelectorAll("img");await Promise.all(Array.from(M).map(E=>new Promise(D=>{if(E.complete){D();return}E.addEventListener("load",D,{once:!0}),E.addEventListener("error",D,{once:!0})})))}async function q(){if(r?.revert(),r=null,!p.value)return;const{gsap:d,ScrollTrigger:M}=await Re();!d||!M||(r=d.matchMedia(),r.add(Ns,()=>{const E=[];let D=!1;const J=()=>{const S=y.value;S&&G(S),fe()};return window.addEventListener("resize",J,{passive:!0}),(async()=>{const S=y.value;if(D||!S){l<Pe&&(l+=1,B(150));return}const W=S.querySelectorAll(".sticky-cards__slide"),N=W.length;if(N<1||S.offsetHeight===0){l<Pe&&(l+=1,B(150));return}await A(S),!D&&(await new Promise(F=>requestAnimationFrame(F)),await new Promise(F=>requestAnimationFrame(F)),!D&&(G(S),W.forEach((F,ee)=>{const Te=F.querySelector(".sticky-cards__wrapper"),ue=F.querySelector(".sticky-cards__card");if(!Te||!ue)return;const Ee=ee===N-1;if(d.set(ue,{rotationX:0,rotationZ:0,scale:1,autoAlpha:1}),Ee)return;const Oe=M.create({animation:d.to(ue,{rotationZ:z(ee),scale:.7,rotationX:40,ease:"power1.in"}),pin:Te,trigger:F,start:f,end:()=>`+=${R()}`,scrub:!0,anticipatePin:0,invalidateOnRefresh:!0,onRefresh(de){he(de,S)},onEnter(de){he(de,S)},onEnterBack(de){he(de,S)}}),De=M.create({animation:d.to(ue,{autoAlpha:0,ease:"power1.in"}),trigger:ue,start:"top -80%",end:()=>`+=${R()*.2}`,scrub:!0,invalidateOnRefresh:!0});E.push(Oe,De)}),l=0,fe(L()?500:120)))})(),()=>{D=!0,window.removeEventListener("resize",J),E.forEach(W=>W.kill());const S=y.value?.querySelectorAll(".sticky-cards__card");S?.length&&d.set(S,{clearProps:"all"})}}))}function L(){return!!document.querySelector("[data-featured-projects-scroll]")}function O(){return!!document.querySelector("[data-featured-projects-scroll][data-featured-projects-ready]")}function Y(){return L()?450:150}function T(){L()&&(b&&clearTimeout(b),b=setTimeout(()=>{b=null,l=0,B(ne)},750))}function B(d=0){m&&clearTimeout(m),m=setTimeout(async()=>{m=null,await te(),q()},d+Y())}function k(d=0){const M=(D=0)=>{B(D+d),T()};if(!L()||O()){M();return}const E=()=>{s(),l=0,M(ne)};s(),document.addEventListener("featured-projects-scroll-ready",E,{once:!0}),s=()=>{document.removeEventListener("featured-projects-scroll-ready",E)},M(ne)}function H(d){if(document.body.classList.contains("preloader-complete")){d();return}document.addEventListener("preloader-complete",d,{once:!0})}return oe(P,async()=>{await te(),y.value&&G(y.value),k(ne)}),oe(()=>(a.section?.cards||[]).map(d=>[d._key,d.title,d.mediaType,d.image?.asset?.url,d.video?.asset?.url].join(":")).join("|"),async()=>{k(ne)}),oe(h,d=>{d||k(ne)}),ie(async()=>{await te(),x=g.hook("page:finish",()=>{k(ne)}),H(()=>{k()})}),Se(()=>{k(ne)}),ve(()=>{m&&clearTimeout(m),m=null,b&&clearTimeout(b),b=null,x(),s(),r?.revert(),r=null}),(d,M)=>{const E=je,D=ce,J=se;return e(),t(V,null,[n(p)?(e(),I(E,{key:0,section:n(v),class:"stacking-cards-section__mobile"},null,8,["section"])):_("",!0),n(p)?(e(),t("section",{key:1,ref_key:"sectionRef",ref:y,class:"sticky-cards stacking-cards-section__desktop"},[n(P)?(e(),t("h2",Is,C(n(P)),1)):_("",!0),i("div",qs,[(e(!0),t(V,null,X(c.section.cards,(j,S)=>(e(),t("article",{key:j._key||`card-${S}`,class:"sticky-cards__slide"},[i("div",Ls,[i("div",{class:Q(["sticky-cards__card rounded-medium pad-20 pad-sm-50",`sticky-cards__card--${S%4+1}`])},[i("div",Rs,[i("div",Cs,[i("div",Ms,[j.title?(e(),t("h3",js,C(j.title),1)):_("",!0),i("div",As,[j.description?.length?(e(),I(D,{key:0,blocks:j.description},null,8,["blocks"])):_("",!0)])])]),i("div",Es,[j.mediaType==="video"&&j.video?.asset?.url?(e(),t("video",Os,[i("source",{src:j.video.asset.url,type:o(j.video.asset.url)},null,8,Ds)])):j.image?.asset?.url?(e(),I(J,{key:1,src:j.image.asset.url,alt:j.title||"",width:j.image.asset.metadata?.dimensions?.width,height:j.image.asset.metadata?.dimensions?.height,class:"sticky-cards__image"},null,8,["src","alt","width","height"])):_("",!0)])])],2)])]))),128))])],512)):_("",!0)],64)}}},Bs=Object.assign(Z(Fs,[["__scopeId","data-v-2426c5ee"]]),{__name:"PageSectionStackingCards"}),Ws={class:"autoscroll-gallery-section rounded-medium"},Vs=["data-direction"],Hs={"data-draggable-marquee-collection":"",class:"draggable-marquee__collection"},zs={"data-draggable-marquee-list":"",class:"draggable-marquee__list"},Gs={key:0,class:"draggable-marquee__item-media",draggable:"false",autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},Us=["src"],Xs={"aria-hidden":"true",class:"draggable-marquee__list draggable-marquee__list--clone"},Ks={key:0,class:"draggable-marquee__item-media",draggable:"false",autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},Zs=["src"],Qs={__name:"PageSectionAutoscrollGallery",props:{section:{type:Object,required:!0}},setup(c){K.registerPlugin(ye,Fe);const a=c,y=U(null);function g(o){const u=(o||"3/5").trim().split("/").map(f=>f.trim()).filter(Boolean);if(u.length===2){const f=Number.parseFloat(u[0]),R=Number.parseFloat(u[1]);if(f>0&&R>0&&Number.isFinite(f)&&Number.isFinite(R))return`${f} / ${R}`}return"3 / 5"}const h=$(()=>({"--autoscroll-gallery-aspect-ratio":g(a.section?.autoscrollGalleryAspectRatio)})),r=$(()=>{const o=Number.parseFloat(String(a.section?.autoscrollGallerySpeed??60));return Number.isFinite(o)&&o>0?o:60}),m=$(()=>(a.section?.autoscrollGalleryDirection||"left").toLowerCase()==="right"?"right":"left"),b=$(()=>(a.section?.autoscrollGalleryItems||[]).filter(o=>o?o.mediaType==="video"?!!o.video?.asset?.url:!!o.image?.asset?.url:!1)),x=[];let s=null;function l(){s?.disconnect(),s=null}function p(){const o=y.value;!o||o.getAttribute("data-draggable-marquee-init")==="initialized"||s||(s=new ResizeObserver(()=>{v(),y.value?.getAttribute("data-draggable-marquee-init")==="initialized"&&l()}),s.observe(o))}function P(){te(()=>{v(),p()})}function v(){const o=y.value;if(!o||o.getAttribute("data-draggable-marquee-init")==="initialized")return;const u=o.querySelector("[data-draggable-marquee-collection]"),f=u.querySelectorAll(".draggable-marquee__list"),R=f[0],z=f[1];if(!u||!R||!z||!b.value.length)return;const G=R.querySelector(".draggable-marquee__item"),A=getComputedStyle(R),q=G?G.getBoundingClientRect().width:0,L=Number.parseFloat(A.columnGap||A.gap||"0"),O=Math.round(b.value.length*q+b.value.length*L),Y=z.offsetLeft-R.offsetLeft,T=Math.round(R.scrollWidth||R.getBoundingClientRect().width),B=Math.round(O||Y||T);if(!B)return;let k=0;const H=m.value==="right"?1:-1,d=Math.max(.01,r.value/1e3),M=K.utils.wrap(-B,0),E=K.quickTo(u,"x",{duration:.5,ease:"power3",modifiers:{x:j=>{const S=M(Number.parseFloat(j)||0);return`${Math.round(S)}px`}}});E(k);const D=ye.create({target:u,type:"pointer,touch",preventDefault:!0,debounce:!1,onPress:()=>{o.setAttribute("data-dragging","true")},onDrag:j=>{k+=j.deltaX,E(k)},onRelease:()=>{o.setAttribute("data-dragging","false")},onStop:()=>{o.setAttribute("data-dragging","false")}});function J(j,S){k+=H*(S*d),E(k)}K.ticker.add(J),o.setAttribute("data-draggable-marquee-init","initialized"),x.push(()=>{D.kill(),K.ticker.remove(J),K.killTweensOf(u),o.setAttribute("data-draggable-marquee-init",""),o.setAttribute("data-dragging","false"),K.set(u,{clearProps:"transform"})})}return ie(()=>{P()}),oe(()=>[a.section?.autoscrollGalleryAspectRatio,a.section?.autoscrollGallerySpeed,a.section?.autoscrollGalleryDirection,b.value.length],()=>{x.splice(0).forEach(o=>o()),l(),P()}),ge(()=>{l(),x.splice(0).forEach(o=>o())}),(o,w)=>{const u=se;return e(),t("section",Ws,[i("div",{ref_key:"wrapperRef",ref:y,"data-draggable-marquee-init":"","data-direction":n(m),class:"draggable-marquee",style:le(n(h)),onDragstart:w[2]||(w[2]=ae(()=>{},["prevent"])),onSelectstart:w[3]||(w[3]=ae(()=>{},["prevent"]))},[i("div",Hs,[i("div",zs,[(e(!0),t(V,null,X(n(b),(f,R)=>(e(),I(xe(f.link?"a":"div"),{key:`${f._key||R}-a`,class:"draggable-marquee__item",draggable:"false",href:f.link||void 0,target:f.link?"_blank":void 0,rel:f.link?"noopener noreferrer":void 0,onDragstart:w[0]||(w[0]=ae(()=>{},["prevent"]))},{default:pe(()=>[f.mediaType==="video"&&f.video?.asset?.url?(e(),t("video",Gs,[i("source",{src:f.video.asset.url,type:"video/mp4"},null,8,Us)])):f.image?.asset?.url?(e(),I(u,{key:1,src:f.image.asset.url,alt:"",fit:"cover",class:"draggable-marquee__item-media",draggable:"false"},null,8,["src"])):_("",!0)]),_:2},1064,["href","target","rel"]))),128))]),i("div",Xs,[(e(!0),t(V,null,X(n(b),(f,R)=>(e(),I(xe(f.link?"a":"div"),{key:`${f._key||R}-b`,class:"draggable-marquee__item",draggable:"false",href:f.link||void 0,target:f.link?"_blank":void 0,rel:f.link?"noopener noreferrer":void 0,onDragstart:w[1]||(w[1]=ae(()=>{},["prevent"]))},{default:pe(()=>[f.mediaType==="video"&&f.video?.asset?.url?(e(),t("video",Ks,[i("source",{src:f.video.asset.url,type:"video/mp4"},null,8,Zs)])):f.image?.asset?.url?(e(),I(u,{key:1,src:f.image.asset.url,alt:"",fit:"cover",class:"draggable-marquee__item-media",draggable:"false"},null,8,["src"])):_("",!0)]),_:2},1064,["href","target","rel"]))),128))])])],44,Vs)])}}},Js=Z(Qs,[["__scopeId","data-v-5d240941"]]),Ys={class:"news-section grid gap-30"},eo={key:0,class:"subtitle subtitle--circle yellow-dot"},to={key:1,class:"news-list"},so={class:"news-thumbnail"},oo={__name:"PageSectionNews",props:{section:{type:Object,required:!0}},setup(c){const a=c,y=$(()=>(a.section?.newsItems||[]).map(g=>g?.newsPost).filter(Boolean));return(g,h)=>{const r=se,m=ce;return e(),t("section",Ys,[c.section.newsTitle||c.section.title?(e(),t("h2",eo,C(c.section.newsTitle||c.section.title),1)):_("",!0),n(y).length>0?(e(),t("div",to,[(e(!0),t(V,null,X(n(y),(b,x)=>(e(),t("article",{key:b._id||b._key||x,class:"news-item flex gap-md-100 yellow pad-25 rounded-medium"},[i("div",so,[b.featuredImage?.asset?.url?(e(),I(r,{key:0,src:b.featuredImage.asset.url,width:b.featuredImage.asset.metadata?.dimensions?.width,height:b.featuredImage.asset.metadata?.dimensions?.height,alt:"",class:"news-image rounded-medium"},null,8,["src","width","height"])):_("",!0)]),b.content?(e(),I(m,{key:0,blocks:b.content,class:"news-content fluid-type",style:{"--desktop":"60","--mobile":"16"}},null,8,["blocks"])):_("",!0)]))),128))])):_("",!0)])}}},io=Z(oo,[["__scopeId","data-v-6317e172"]]),no={key:0,class:"portfolio-stats__row gap-20"},ao={key:0,class:"portfolio-stats__dd"},ro={class:"portfolio-stats__lozenge white orange-text rounded-small fluid-type mono",style:{"--desktop":"24"}},lo={key:0,class:"portfolio-stats__arrow",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},co={class:"portfolio-stats__value-text"},uo={key:1,class:"fluid-type portfolio-stats__label",style:{"--desktop":"28"}},po={__name:"PortfolioStats",props:{stats:{type:Array,default:()=>[]},rootClass:{type:String,default:""}},setup(c){const a=c,y=$(()=>(a.stats||[]).some(g=>g?.label||g?.value));return(g,h)=>n(y)?(e(),t("div",{key:0,class:Q(["portfolio-stats",c.rootClass])},[(e(!0),t(V,null,X(c.stats,(r,m)=>(e(),t(V,{key:r._key||m},[r.label||r.value?(e(),t("div",no,[r.value?(e(),t("div",ao,[i("span",ro,[r.icon==="arrowUp"?(e(),t("svg",lo,[...h[0]||(h[0]=[i("path",{d:"M0 8.98305L1.52649 10.5663L7.57831 4.30064V17.9661H9.74354V4.30064L15.7845 10.5775L17.3218 8.98305L8.66092 0L0 8.98305Z",fill:"currentColor"},null,-1)])])):_("",!0),i("span",co,C(r.value),1)])])):_("",!0),r.label?(e(),t("div",uo,C(r.label),1)):_("",!0)])):_("",!0)],64))),128))],2)):_("",!0)}},_o=Z(po,[["__scopeId","data-v-f900a4f9"]]),go={class:"portfolio-item-media rounded-medium"},mo={class:"portfolio-item-overlay pad-40"},ho={class:"portfolio-item-overlay-inner gap-40"},fo={class:"portfolio-item-overlay-title fluid-type",style:{"--desktop":"72"}},yo={class:"portfolio-item-overlay-content gap-50"},vo={key:0,class:"portfolio-item-overlay-desc fluid-type",style:{"--desktop":"36"}},ko={class:"portfolio-item-title"},bo={__name:"PageSectionPortfolio",props:{section:{type:Object,required:!0},projects:{type:Array,default:()=>[]}},setup(c){const a=c,{portfolioProjectPath:y}=qe(),g=[4,8,7,5,5,7];function h(p){const v=(p||"3/5").trim().split("/").map(o=>o.trim()).filter(Boolean);if(v.length===2){const o=Number.parseFloat(v[0]),w=Number.parseFloat(v[1]);if(o>0&&w>0&&Number.isFinite(o)&&Number.isFinite(w))return`${o} / ${w}`}return"3 / 5"}const r=$(()=>a.projects||[]),m=$(()=>r.value.length),b=$(()=>({"--portfolio-aspect-ratio":h(a.section?.thumbnailAspectRatio)}));function x(p,P){if(P<=0)return 12;const v=P-1;return p===v&&P%2===1?12:g[p%g.length]}function s(p,P){return p===P-1&&P%2===1}function l(p,P){return{gridColumn:`span ${x(p,P)}`}}return(p,P)=>{const v=Me,o=_o,w=$e;return e(),t("div",{class:"portfolio-section",style:le(n(b))},[(e(!0),t(V,null,X(n(r),(u,f)=>(e(),t("div",{key:u._id,class:Q(["portfolio-item",{"portfolio-item--orphan":s(f,n(m))}]),style:le(l(f,n(m)))},[u.slug?.current?(e(),I(w,{key:0,to:n(y)(u.slug),class:"portfolio-item-link"},{default:pe(()=>[i("div",go,[re(v,{project:u,"image-class":"portfolio-item-image rounded-medium"},null,8,["project"]),i("div",mo,[P[0]||(P[0]=i("div",{class:"portfolio-item-overlay-bg","aria-hidden":"true"},null,-1)),i("div",ho,[i("h3",fo,C(u.title),1),i("div",yo,[u.thumbnailDescription?(e(),t("div",vo,C(u.thumbnailDescription),1)):_("",!0),u.thumbnailStats?.length?(e(),I(o,{key:1,stats:u.thumbnailStats,"root-class":"portfolio-item-overlay-stats gap-20"},null,8,["stats"])):_("",!0)])])])]),i("h3",ko,C(u.title),1)]),_:2},1032,["to"])):_("",!0)],6))),128))],4)}}},wo=Z(bo,[["__scopeId","data-v-a8a58847"]]),Ae=()=>({getImageSrc:a=>{if(!a)return"";if(typeof a=="string")return String(a);try{const y=a?.url;if(y&&typeof y=="string"&&y.length>0)return String(y)}catch{}try{const y=a?._id;if(y&&typeof y=="string"){const g=String(y).match(/image-([^-]+)-(\d+)x(\d+)-(\w+)/);if(g){const[,h,r,m,b]=g;return`https://cdn.sanity.io/images/uuzbe0e0/production/${h}-${r}x${m}.${b}`}}}catch{}return console.warn("[useSanityImage] Could not extract image URL from asset:",a),""}}),So={key:0,class:"subtitle subtitle--circle orange-dot"},$o={"data-follower-collection":"",class:"preview-collection pad-md-10"},To={class:"preview-collection__list"},xo={class:"preview-list"},Po={class:"team-member__inner"},Io={class:"team-member__row"},qo={class:"team-member__col is--large"},Lo={class:"team-member__heading fluid-type line-height-1",style:{"--desktop":"76","--mobile":"24"}},Ro={class:"team-member__col is--medium"},Co={class:"team-member__role fluid-type line-height-1",style:{"--desktop":"52","--mobile":"24"}},Mo={"data-follower-visual":"",class:"team-member__visual"},jo={__name:"PageSectionTeam",props:{section:{type:Object,required:!0}},setup(c){const a=c,y=U(null),{getImageSrc:g}=Ae(),h=$(()=>a.section?.teamMembers||[]);let r=null;function m(b){const x=b?.querySelector("[data-follower-collection]"),s=b?.querySelectorAll("[data-follower-item]")||[],l=b?.querySelector("[data-follower-cursor]"),p=b?.querySelector("[data-follower-cursor-inner]");if(!x||!s.length||!l||!p)return()=>{};let P=null,v=!0;const o=100,w=.5,u="power2.inOut",f=[];return s.forEach((R,z)=>{const G=()=>{const A=P===null||z>P;P=z,l.querySelectorAll("[data-follower-visual]").forEach(O=>{K.killTweensOf(O),K.to(O,{yPercent:A?-o:o,duration:w,ease:u,overwrite:"auto",onComplete:()=>O.remove()})});const q=R.querySelector("[data-follower-visual]");if(!q)return;const L=q.cloneNode(!0);p.appendChild(L),v?v=!1:K.fromTo(L,{yPercent:A?o:-o},{yPercent:0,duration:w,ease:u,overwrite:"auto"})};R.addEventListener("mouseenter",G),f.push(()=>{R.removeEventListener("mouseenter",G)})}),()=>{f.forEach(R=>R())}}return ie(()=>{r=m(y.value)}),ge(()=>{r&&r()}),(b,x)=>{const s=se;return e(),t("section",{ref_key:"wrapRef",ref:y,"data-follower-wrap":"",class:"preview-container grid gap-40 pad-md-30 pad-top"},[c.section.title?(e(),t("h2",So,C(c.section.title),1)):_("",!0),i("div",$o,[i("div",To,[i("div",xo,[(e(!0),t(V,null,X(n(h),(l,p)=>(e(),t("div",{key:l._key||p,"data-follower-item":"",class:"team-member"},[i("div",Po,[i("div",Io,[i("div",qo,[i("h2",Lo,C(l.name),1)]),i("div",Ro,[i("p",Co,C(l.role),1)])]),i("div",Mo,[l?.image?.asset?(e(),I(s,{key:0,src:n(g)(l.image.asset),alt:l.name||"",class:"team-member__visual-img"},null,8,["src","alt"])):_("",!0)])])]))),128))])]),x[0]||(x[0]=i("div",{"data-follower-cursor":"",class:"preview-follower rounded-medium"},[i("div",{"data-follower-cursor-inner":"",class:"preview-follower__inner"})],-1))])],512)}}},Ao=Z(jo,[["__scopeId","data-v-3b73f470"]]),Eo=["data-logo-wall-shuffle"],Oo={class:"logo-wall__collection"},Do={"data-logo-wall-list":"",class:"logo-wall__list"},No={"data-logo-wall-target-parent":"",class:"logo-wall__logo"},Fo={"data-logo-wall-target":"",class:"logo-wall__logo-target"},Bo={__name:"PageSectionLogoWall",props:{section:{type:Object,required:!0}},setup(c){const a=c,{getImageSrc:y}=Ae(),g=U(null),h=U(null),r=U(null),m=$(()=>a.section?.logoWallLogos||[]),b=$(()=>a.section?.logoWallShuffle!==!1);function x(v){return y(v?.asset||v)}function s(v){return window.getComputedStyle(v).display!=="none"}function l(v){const o=v.slice();for(let w=o.length-1;w>0;w--){const u=Math.floor(Math.random()*(w+1));[o[w],o[u]]=[o[u],o[w]]}return o}async function p(v){if(!v)return;const[{gsap:o},{ScrollTrigger:w}]=await Promise.all([_e(()=>import("./Cb8-EniE.js").then(d=>d.U),__vite__mapDeps([0,1]),import.meta.url),_e(()=>import("./Cb8-EniE.js").then(d=>d.V),__vite__mapDeps([0,1]),import.meta.url)]);o.registerPlugin(w);const u=1.5,f=.9,R=v.querySelector("[data-logo-wall-list]");if(!R)return;const z=Array.from(R.querySelectorAll("[data-logo-wall-item]"));if(!z.length)return;const G=v.getAttribute("data-logo-wall-shuffle")!=="false",A=z.map(d=>d.querySelector("[data-logo-wall-target]")).filter(Boolean).map(d=>d.cloneNode(!0));if(!A.length)return;let q=[],L=0,O=[],Y=[],T=0;const B=()=>{z.forEach(d=>{d.querySelectorAll("[data-logo-wall-target]").forEach(M=>M.remove())})},k=()=>{if(h.value&&(h.value.kill(),h.value=null),q=z.filter(s),L=q.length,!L)return;Y=l(Array.from({length:L},(E,D)=>D)),T=0,B(),O=A.map(E=>E.cloneNode(!0));let d,M;if(G){const E=l(O);d=E.slice(0,L),M=l(E.slice(L))}else d=O.slice(0,L),M=l(O.slice(L));O=d.concat(M);for(let E=0;E<L;E++){const D=q[E].querySelector("[data-logo-wall-target-parent]")||q[E],J=O.shift();J&&D.appendChild(J)}h.value=o.timeline({repeat:-1,repeatDelay:u}),h.value.call(H),h.value.play()},H=()=>{if(z.filter(s).length!==L){k();return}if(!O.length||!L)return;const M=Y[T%L];T++;const E=q[M],D=E.querySelector("[data-logo-wall-target-parent]")||E;if(D.querySelectorAll("[data-logo-wall-target]").length>1)return;const j=D.querySelector("[data-logo-wall-target]"),S=O.shift();S&&(o.set(S,{yPercent:50}),D.appendChild(S),j&&o.to(j,{yPercent:-50,duration:f,ease:"expo.inOut",onComplete:()=>{j.remove(),O.push(j)}}),o.to(S,{yPercent:0,duration:f,delay:.1,ease:"expo.inOut"}))};k(),r.value=w.create({trigger:v,start:"top bottom",end:"bottom top",onEnter:()=>h.value?.play(),onLeave:()=>h.value?.pause(),onEnterBack:()=>h.value?.play(),onLeaveBack:()=>h.value?.pause()})}function P(){if(document.hidden){h.value?.pause();return}h.value?.play()}return ie(()=>{p(g.value),document.addEventListener("visibilitychange",P)}),ve(()=>{h.value?.kill(),r.value?.kill(),document.removeEventListener("visibilitychange",P)}),(v,o)=>{const w=se;return n(m).length?(e(),t("section",{key:0,ref_key:"rootRef",ref:g,"data-logo-wall-shuffle":n(b)?"true":"false","data-logo-wall-cycle-init":"",class:"logo-wall"},[i("div",Oo,[i("div",Do,[(e(!0),t(V,null,X(n(m),(u,f)=>(e(),t("div",{key:u._key||`logo-${f}`,"data-logo-wall-item":"",class:"logo-wall__item"},[i("div",No,[o[0]||(o[0]=i("div",{class:"logo-wall__logo-before"},null,-1)),i("div",Fo,[x(u)?(e(),I(w,{key:0,src:x(u),loading:"lazy",width:"100",alt:u.alt||"",class:"logo-wall__logo-img"},null,8,["src","alt"])):_("",!0)])])]))),128))])])],8,Eo)):_("",!0)}}},Wo=Object.assign(Z(Bo,[["__scopeId","data-v-da216363"]]),{__name:"PageSectionLogoWall"}),Vo={key:0,class:"logo-marquee-section grid gap-40 pad-md-100 pad-top-bottom"},Ho={key:0,class:"subtitle subtitle--circle yellow-dot"},zo={"data-draggable-marquee-collection":"",class:"logo-draggable-marquee__collection"},Go={"data-draggable-marquee-list":"",class:"logo-draggable-marquee__list"},Uo={"aria-hidden":"true",class:"logo-draggable-marquee__list logo-draggable-marquee__list--clone"},Xo={__name:"PageSectionLogoMarquee",props:{section:{type:Object,required:!0}},setup(c){K.registerPlugin(ye);const a=c,y=U(null),g=$(()=>(a.section?.logoMarqueeLogos||[]).filter(l=>l?.asset?.url)),h=[];let r=null;function m(){r?.disconnect(),r=null}function b(){const l=y.value;!l||l.getAttribute("data-draggable-marquee-init")==="initialized"||r||(r=new ResizeObserver(()=>{s(),y.value?.getAttribute("data-draggable-marquee-init")==="initialized"&&m()}),r.observe(l))}function x(){te(()=>{s(),b()})}function s(){const l=y.value;if(!l||l.getAttribute("data-draggable-marquee-init")==="initialized")return;const p=l.querySelector("[data-draggable-marquee-collection]"),P=p?.querySelectorAll(".logo-draggable-marquee__list"),v=P?.[0],o=P?.[1];if(!p||!v||!o||!g.value.length)return;const w=v.querySelector(".logo-draggable-marquee__item"),u=getComputedStyle(v),f=w?w.getBoundingClientRect().width:0,R=Number.parseFloat(u.columnGap||u.gap||"0"),z=Math.round(g.value.length*f+g.value.length*R),G=o.offsetLeft-v.offsetLeft,A=Math.round(v.scrollWidth||v.getBoundingClientRect().width),q=Math.round(z||G||A);if(!q)return;let L=0;const O=.04,Y=K.utils.wrap(-q,0),T=K.quickTo(p,"x",{duration:.5,ease:"power3",modifiers:{x:H=>`${Math.round(Y(Number.parseFloat(H)||0))}px`}});T(L);const B=ye.create({target:p,type:"pointer,touch",preventDefault:!0,debounce:!1,onPress:()=>{l.setAttribute("data-dragging","true")},onDrag:H=>{L+=H.deltaX,T(L)},onRelease:()=>{l.setAttribute("data-dragging","false")},onStop:()=>{l.setAttribute("data-dragging","false")}});function k(H,d){L-=d*O,T(L)}K.ticker.add(k),l.setAttribute("data-draggable-marquee-init","initialized"),h.push(()=>{B.kill(),K.ticker.remove(k),K.killTweensOf(p),l.setAttribute("data-draggable-marquee-init",""),l.setAttribute("data-dragging","false"),K.set(p,{clearProps:"transform"})})}return ie(()=>{x()}),oe(()=>g.value.length,()=>{h.splice(0).forEach(l=>l()),m(),x()}),ge(()=>{m(),h.splice(0).forEach(l=>l())}),(l,p)=>{const P=se;return n(g).length>0?(e(),t("section",Vo,[a.section.logoMarqueeTitle||a.section.title?(e(),t("h2",Ho,C(a.section.logoMarqueeTitle||a.section.title),1)):_("",!0),i("div",{ref_key:"wrapperRef",ref:y,"data-draggable-marquee-init":"","data-direction":"left",class:"logo-draggable-marquee",onDragstart:p[0]||(p[0]=ae(()=>{},["prevent"])),onSelectstart:p[1]||(p[1]=ae(()=>{},["prevent"]))},[i("div",zo,[i("div",Go,[(e(!0),t(V,null,X(n(g),(v,o)=>(e(),t("div",{key:`${v._key||o}-a`,class:"logo-draggable-marquee__item",draggable:"false"},[v.asset?.url?(e(),I(P,{key:0,src:v.asset.url,alt:v.alt||"",fit:"contain",class:"logo-draggable-marquee__item-media",draggable:"false"},null,8,["src","alt"])):_("",!0)]))),128))]),i("div",Uo,[(e(!0),t(V,null,X(n(g),(v,o)=>(e(),t("div",{key:`${v._key||o}-b`,class:"logo-draggable-marquee__item",draggable:"false"},[v.asset?.url?(e(),I(P,{key:0,src:v.asset.url,alt:v.alt||"",fit:"contain",class:"logo-draggable-marquee__item-media",draggable:"false"},null,8,["src","alt"])):_("",!0)]))),128))])])],544)])):_("",!0)}}},Ko=Z(Xo,[["__scopeId","data-v-fd5a357d"]]),Zo={key:0,class:"clients-section grid gap-30"},Qo={class:"show-md"},Jo={key:0,class:"subtitle subtitle--circle orange-dot"},Yo={class:"rounded-medium pad-50 pad-md-50 grid gap-30",style:{"background-color":"var(--pink-tint-3)"}},ei={class:"hide-md"},ti={key:0,class:"subtitle small subtitle--circle white-dot"},Ie=799,si={__name:"PageSectionClients",props:{section:{type:Object,required:!0}},setup(c){const a=c,y=$(()=>a.section?.clientsImages||[]),g=$(()=>{const v=[];for(let o=0;o<y.value.length;o+=3)v.push(y.value.slice(o,o+3));return v}),h=U(null),r=U(null),m=U(null);let b=()=>{},x=()=>{};async function s(){if(!h.value||window.innerWidth>Ie||m.value||g.value.length<=1)return;const v=(await _e(async()=>{const{default:o}=await import("./DhjvDC2M.js").then(w=>w.i);return{default:o}},__vite__mapDeps([2,3]),import.meta.url)).default;m.value=new v(h.value,{prevNextButtons:!1,pageDots:!0,wrapAround:!0,adaptiveHeight:!1,cellAlign:"center",contain:!0,draggable:!0})}function l(){m.value&&(m.value.destroy(),m.value=null)}function p(){if(window.innerWidth<=Ie){x(),s();return}l(),P()}function P(){if(window.innerWidth<800||!r.value)return;x();const v=r.value.querySelectorAll(".clients-section__item");if(!v.length)return;K.set(v,{autoAlpha:0,y:20});const o=K.to(v,{autoAlpha:1,y:0,duration:.5,ease:"power2.out",stagger:.1,paused:!0});let w=null;w=new IntersectionObserver(u=>{u[0]?.isIntersecting&&(o.play(),w?.disconnect(),w=null)},{rootMargin:"0px 0px -35% 0px",threshold:.01}),w.observe(r.value),x=()=>{w?.disconnect(),o.kill(),K.set(v,{clearProps:"opacity,visibility,transform"})}}return oe(()=>g.value.length,async()=>{await te(),l(),x(),s(),P()}),ie(async()=>{await te(),await s(),P(),window.addEventListener("resize",p),b=()=>window.removeEventListener("resize",p)}),ve(()=>{b(),l(),x()}),(v,o)=>{const w=se;return n(y).length?(e(),t("section",Zo,[i("div",Qo,[c.section.clientsTitle||c.section.title?(e(),t("h2",Jo,C(c.section.clientsTitle||c.section.title),1)):_("",!0)]),i("div",Yo,[i("div",ei,[c.section.clientsTitle||c.section.title?(e(),t("h2",ti,C(c.section.clientsTitle||c.section.title),1)):_("",!0)]),i("div",{ref_key:"gridRef",ref:r,class:"clients-section__grid pad-60 pad-top-bottom"},[(e(!0),t(V,null,X(n(y),(u,f)=>(e(),t("article",{key:u._key||`client-grid-${f}`,class:"clients-section__item"},[u.image?.asset?.url?(e(),I(w,{key:0,src:u.image.asset.url,alt:u.alt||"",width:u.image.asset.metadata?.dimensions?.width,height:u.image.asset.metadata?.dimensions?.height,class:"clients-section__image",loading:"lazy"},null,8,["src","alt","width","height"])):_("",!0)]))),128))],512),i("div",{ref_key:"carouselRef",ref:h,class:"clients-section__carousel"},[(e(!0),t(V,null,X(n(g),(u,f)=>(e(),t("div",{key:`client-slide-${f}`,class:"clients-section__slide"},[(e(!0),t(V,null,X(u,(R,z)=>(e(),t("article",{key:R._key||`client-slide-item-${f}-${z}`,class:"clients-section__item"},[R.image?.asset?.url?(e(),I(w,{key:0,src:R.image.asset.url,alt:R.alt||"",width:R.image.asset.metadata?.dimensions?.width,height:R.image.asset.metadata?.dimensions?.height,class:"clients-section__image",loading:"lazy"},null,8,["src","alt","width","height"])):_("",!0)]))),128))]))),128))],512)])])):_("",!0)}}},oi=Object.assign(Z(si,[["__scopeId","data-v-45225d1f"]]),{__name:"PageSectionClients"}),ii={class:"contact-section grid gap-30"},ni={class:"contact-section__panel rounded-medium pad-50 pad-md-50"},ai={class:"contact-section__columns"},ri={class:"contact-section__column contact-section__column--left"},li={key:0,class:"contact-section__title fluid-type line-height-1",style:{"--desktop":"72","--mobile":"40"}},ci={key:1,class:"contact-information-list grid gap-50"},ui={class:"contact-information-link-wrap"},di=["href","target","rel"],pi={key:0,class:"contact-section__column contact-section__column--right"},_i={__name:"PageSectionContact",props:{section:{type:Object,required:!0}},setup(c){const a=c,y=$(()=>a.section.contactTitle||a.section.title||""),g=$(()=>a.section.contactInformation||[]),h=$(()=>a.section.contactDotColour||"var(--orange)"),r=$(()=>a.section.contactVideo?.asset?.url||""),m=$(()=>{const l=a.section.contactVideoAspectRatio;return l==="portrait"?"portrait":l==="landscape"?"landscape":""}),{contactLinkUsesNative:b,isExternalHttp:x,getContactLinkUrl:s}=Be();return(l,p)=>{const P=$e,v=He;return e(),t("section",ii,[i("div",ni,[i("div",ai,[i("div",ri,[n(y)?(e(),t("h2",li,C(n(y)),1)):_("",!0),n(g).length?(e(),t("div",ci,[(e(!0),t(V,null,X(n(g),o=>(e(),t("div",{key:o._key,class:"contact-information-item gap-20"},[i("div",{class:"contact-information-item-title subtitle subtitle--circle",style:le(n(h)?{"--subtitle-dot-color":n(h)}:void 0)},C(o.title),5),i("div",ui,[n(b)(n(s)(o))?(e(),t("a",{key:0,href:n(s)(o),target:n(x)(n(s)(o))?"_blank":void 0,rel:n(x)(n(s)(o))?"noopener":void 0,class:"contact-information-link fluid-type line-height-1",style:{"--desktop":"54","--mobile":"24"}},C(o.linkText),9,di)):(e(),I(P,{key:1,to:n(s)(o),class:"contact-information-link fluid-type line-height-1",style:{"--desktop":"54","--mobile":"24"}},{default:pe(()=>[be(C(o.linkText),1)]),_:2},1032,["to"]))])]))),128))])):_("",!0)]),c.section.contactVideoSubtitle||n(r)?(e(),t("div",pi,[i("div",{class:Q(["contact-section__video-group",n(m)])},[c.section.contactVideoSubtitle?(e(),t("p",{key:0,class:"contact-section__video-subtitle subtitle subtitle--circle",style:le({"--subtitle-dot-color":n(h)})},C(c.section.contactVideoSubtitle),5)):_("",!0),i("div",{class:Q(["contact-section__video rounded-medium",[n(m),{"contact-section__video--placeholder":!n(r)}]])},[n(r)?(e(),I(v,{key:0,type:"html5",src:n(r),variant:"contact"},null,8,["src"])):_("",!0)],2)],2)])):_("",!0)])])])}}},gi=Z(_i,[["__scopeId","data-v-66fa2942"]]),mi={class:"spotify-player-section grid gap-30 pad-60 pad-top-bottom"},hi={key:0,class:"subtitle subtitle--circle red-dot"},fi={class:"spotify-player-wrapper rounded-medium"},yi=["src"],vi={key:1,class:"spotify-player-placeholder"},ki={__name:"PageSectionSpotifyPlayer",props:{section:{type:Object,required:!0}},setup(c){const a=c,y=$(()=>{const g=a.section?.spotifyEmbedUrl?.trim();if(!g)return"";const r=(g.match(/src=["']([^"']+)["']/i)?.[1]||g).trim();return r.startsWith("https://open.spotify.com/embed/")?r:""});return(g,h)=>(e(),t("section",mi,[c.section.spotifyTitle||c.section.title?(e(),t("h2",hi,C(c.section.spotifyTitle||c.section.title),1)):_("",!0),i("div",fi,[n(y)?(e(),t("iframe",{key:0,src:n(y),title:"Spotify player",loading:"lazy",allow:"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",class:"spotify-player-embed"},null,8,yi)):(e(),t("div",vi," Spotify player is ready. Add a Spotify embed URL or connect API data. "))])]))}},bi=Z(ki,[["__scopeId","data-v-b3498b5f"]]),wi={class:"page"},Si={key:0},$i={key:1,class:"page-content"},Ti={key:0,style:{padding:"var(--gutter)"}},xi={key:2},Pi={__name:"[...slug]",setup(c){const a=We(),{setLoading:y}=we(),g=$(()=>a.path==="/"?"home":a.params.slug?Array.isArray(a.params.slug)?a.params.slug.join("/"):a.params.slug:a.path.replace(/^\//,"")||null),{data:h,pending:r,error:m}=Ce(()=>`page-${a.path}`,async()=>{if(!g.value)return null;const s=`*[_type == "page" && slug.current == $slug][0] {
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
            thumbnailMediaType,
            thumbnailMediaTypeMobile,
            featuredImage {
              asset->
            },
            featuredImageMobile {
              asset->
            },
            featuredVideo {
              asset-> {
                url
              }
            },
            featuredVideoMobile {
              asset-> {
                url
              }
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
        thumbnailMediaType,
        thumbnailMediaTypeMobile,
        featuredImage {
          asset->
        },
        featuredImageMobile {
          asset->
        },
        featuredVideo {
          asset-> {
            url
          }
        },
        featuredVideoMobile {
          asset-> {
            url
          }
        }
      }
    }`;try{const p=(await $fetch("/api/sanity/query",{method:"POST",body:{query:s,params:{slug:g.value}}}))?.result;return p&&p._id?p:null}catch(l){throw l}},{watch:[g]}),b=$(()=>h.value?.sections||[]),x=$(()=>h.value?.portfolioProjects||[]);return Ve(()=>{const s=h.value?.devBackgroundImage?.asset?.url;return s?{bodyAttrs:{"data-page-dev-bg":"true",style:[`background-image:url("${s}")`,"background-size: 100%","background-position: left top","background-repeat:no-repeat"].join(";")}}:{bodyAttrs:{"data-page-dev-bg":void 0,style:void 0}}}),oe(r,s=>{y(s)},{immediate:!0}),(s,l)=>{const p=at,P=vt,v=Et,o=Bt,w=zt,u=ns,f=je,R=Bs,z=Js,G=io,A=wo,q=Ao,L=Wo,O=Ko,Y=oi,T=gi,B=bi;return e(),t("div",wi,[n(m)?(e(),t("div",Si,[i("p",null,"Error loading page: "+C(n(m).message),1)])):n(h)?(e(),t("div",$i,[n(b).length===0?(e(),t("div",Ti,[...l[0]||(l[0]=[i("p",null,"No sections found for this page. Add sections in Sanity.",-1)])])):_("",!0),(e(!0),t(V,null,X(n(b),k=>(e(),t("div",{key:k._id,class:"page-section"},[k.sectionType==="featuredProjects"?(e(),I(p,{key:0,section:k},null,8,["section"])):k.sectionType==="heroCarousel"?(e(),I(P,{key:1,section:k},null,8,["section"])):k.sectionType==="info"?(e(),I(v,{key:2,section:k},null,8,["section"])):k.sectionType==="services"?(e(),I(o,{key:3,section:k},null,8,["section"])):k.sectionType==="text"?(e(),I(w,{key:4,section:k},null,8,["section"])):k.sectionType==="kineticTypography"?(e(),I(u,{key:5,section:k},null,8,["section"])):k.sectionType==="cards"?(e(),I(f,{key:6,section:k},null,8,["section"])):k.sectionType==="stackingCards"?(e(),I(R,{key:7,section:k},null,8,["section"])):k.sectionType==="autoscrollGallery"?(e(),I(z,{key:8,section:k},null,8,["section"])):k.sectionType==="news"||k.sectionType==="pressAwards"?(e(),I(G,{key:9,section:k},null,8,["section"])):k.sectionType==="work"||k.sectionType==="portfolio"?(e(),I(A,{key:10,section:k,projects:n(x)},null,8,["section","projects"])):k.sectionType==="team"?(e(),I(q,{key:11,section:k},null,8,["section"])):k.sectionType==="logoWall"?(e(),I(L,{key:12,section:k},null,8,["section"])):k.sectionType==="logoMarquee"?(e(),I(O,{key:13,section:k},null,8,["section"])):k.sectionType==="clients"?(e(),I(Y,{key:14,section:k},null,8,["section"])):k.sectionType==="contact"?(e(),I(T,{key:15,section:k},null,8,["section"])):k.sectionType==="spotifyPlayer"?(e(),I(B,{key:16,section:k},null,8,["section"])):_("",!0)]))),128))])):(e(),t("div",xi,[...l[1]||(l[1]=[i("p",null,"Page not found",-1)])]))])}}},Li=Z(Pi,[["__scopeId","data-v-02a0b670"]]);export{Li as default};
