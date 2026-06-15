const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DXJSAWiJ.js","./entry.CVSj4Dl0.css"])))=>i.map(i=>d[i]);
import{_ as Y,f as R,c as t,g as i,o as e,a as o,n as Z,h as L,i as u,j as te,F as B,k as Le,r as G,l as Re,m as Se,p as ne,q as oe,s as se,v as $e,x as ye,t as j,y as U,w as de,b as le,e as Te,z as Ae,A as fe,B as ue,C as Ne,D as pe,E as Ce,G as ae,H as ce,d as we,I as _e,J as Q,O as he,S as Fe,K as re,L as xe,M as je,N as Be,P as We,u as ze}from"./DXJSAWiJ.js";import{s as be,_ as Ve}from"./BZFLOE6y.js";const He=["src"],Ge={__name:"PortfolioThumbnailMedia",props:{project:{type:Object,required:!0},imageClass:{type:String,default:"portfolio-thumbnail-media"}},setup(r){const c=r,S=R(()=>c.project?.thumbnailMediaType==="video"&&c.project?.featuredVideo?.asset?.url);return(_,v)=>{const a=te;return i(S)?(e(),t("video",{key:0,autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata",class:Z(r.imageClass)},[o("source",{src:r.project.featuredVideo.asset.url,type:"video/mp4"},null,8,He)],2)):(e(),t(B,{key:1},[r.project.featuredImage?.asset?(e(),L(a,{key:0,src:r.project.featuredImage.asset.url||"",alt:"",fit:"cover",class:Z([r.imageClass,r.project.featuredImageMobile?.asset?"is-desktop-archive-img":""]),width:r.project.featuredImage.asset.metadata?.dimensions?.width,height:r.project.featuredImage.asset.metadata?.dimensions?.height},null,8,["src","class","width","height"])):u("",!0),r.project.featuredImageMobile?.asset?(e(),L(a,{key:1,src:r.project.featuredImageMobile.asset.url||"",alt:"",fit:"cover",class:Z([r.imageClass,"is-mobile-archive-img"]),width:r.project.featuredImageMobile.asset.metadata?.dimensions?.width,height:r.project.featuredImageMobile.asset.metadata?.dimensions?.height},null,8,["src","class","width","height"])):u("",!0)],64))}}},Ee=Y(Ge,[["__scopeId","data-v-6a1ecdf5"]]),Ue={key:0,class:"subtitle subtitle--circle orange-dot"},Xe=["data-lenis-prevent"],Ke={class:"featured-project-image-container rounded-medium"},Qe={class:"featured-project-image-wrapper"},Ye={class:"portfolio-item-overlay pad-40"},Je={class:"portfolio-item-overlay-inner gap-40"},Ze={class:"portfolio-item-overlay-title fluid-type line-height-1",style:{"--desktop":"72"}},et={class:"portfolio-item-overlay-content gap-50"},tt={key:0,class:"portfolio-item-overlay-desc fluid-type pad-20 pad-bottom",style:{"--desktop":"36"}},st="(min-width: 1000px)",me=650,ot=10,nt={__name:"PageSectionFeaturedProjects",props:{section:{type:Object,required:!0}},setup(r){const c=r,{portfolioProjectPath:S}=Le(),_=G(null),v=G(null),a=G(null),f=G(null),k=Re(),{isLoading:T}=Se();let s=null,l=null,p=()=>{};const $=R(()=>c.section?.featuredProjects||[]),g=G(!1);let n=null,y=()=>{},m=0;function h(){const w=getComputedStyle(document.documentElement).getPropertyValue("--gutter").trim(),x=Number.parseFloat(w);return Number.isFinite(x)?x:20}function C(){return`bottom bottom-=${h()}`}function z(){const w=f.value,x=a.value;return!w||!x?0:Math.max(0,w.scrollWidth-x.clientWidth)}function D(w){ue(w,_.value)}async function I(w){const x=w.querySelectorAll("img"),F=w.querySelectorAll("video");await Promise.all([...Array.from(x).map(d=>new Promise(q=>{if(d.complete){q();return}d.addEventListener("load",q,{once:!0}),d.addEventListener("error",q,{once:!0})})),...Array.from(F).map(d=>new Promise(q=>{if(d.readyState>=1){q();return}d.addEventListener("loadedmetadata",q,{once:!0}),d.addEventListener("error",q,{once:!0})}))])}async function M(){if(s?.revert(),s=null,$.value.length<2||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const{gsap:w,ScrollTrigger:x}=await Ae();!w||!x||(s=w.matchMedia(),s.add(st,()=>{let F=null,d=null,q=!1;const A=()=>{fe()};return window.addEventListener("resize",A,{passive:!0}),(async()=>{const O=_.value,H=f.value,J=a.value;if(q||!O||!H||!J||(await I(O),q)||(await new Promise(P=>requestAnimationFrame(P)),await new Promise(P=>requestAnimationFrame(P)),q))return;if(z()<=0){$.value.length>1&&m<ot&&(m+=1,E(150));return}m=0,w.set(H,{x:0}),F=w.to(H,{x:()=>-z(),ease:"none"}),d=x.create({trigger:O,pin:J,pinSpacing:!0,start:C,scrub:.45,anticipatePin:0,invalidateOnRefresh:!0,end:()=>`+=${z()}`,animation:F,onRefresh(P){D(P)},onEnter(P){D(P)},onEnterBack(P){D(P)}}),D(d),fe(),O.dataset.featuredProjectsReady="true",document.dispatchEvent(new CustomEvent("featured-projects-scroll-ready"))})(),()=>{q=!0,window.removeEventListener("resize",A),d?.kill(),d=null,F?.kill(),F=null,f.value&&w.set(f.value,{clearProps:"transform"})}}))}function E(w=0){l&&clearTimeout(l),l=setTimeout(async()=>{l=null,await se(),M()},w)}function b(w){if(document.body.classList.contains("preloader-complete")){w();return}document.addEventListener("preloader-complete",w,{once:!0})}return ne(()=>$.value.map(w=>[w._key,w.project?._id,w.project?.slug?.current,w.project?.featuredImage?.asset?.url,w.project?.featuredImageMobile?.asset?.url,w.project?.thumbnailMediaType,w.project?.featuredVideo?.asset?.url].join(":")).join("|"),()=>{E(me)}),ne(T,w=>{w||E(me)}),oe(async()=>{await se(),n=window.matchMedia("(max-width: 999px)"),y=()=>{g.value=n.matches},y(),n.addEventListener("change",y),p=k.hook("page:finish",()=>{E(me)}),b(()=>{E()})}),$e(()=>{E(me)}),ye(()=>{n?.removeEventListener("change",y),n=null,l&&clearTimeout(l),l=null,p(),_.value&&delete _.value.dataset.featuredProjectsReady,s?.revert(),s=null}),(w,x)=>{const F=Ee,d=Te;return e(),t("section",{ref_key:"sectionRef",ref:_,class:"featured-projects grid gap-30","data-featured-projects-scroll":""},[c.section.featuredProjectsTitle||c.section.title?(e(),t("h2",Ue,j(c.section.featuredProjectsTitle||c.section.title),1)):u("",!0),o("div",{ref_key:"scrollRef",ref:v,class:"featured-projects__scroll"},[o("div",{ref_key:"viewportRef",ref:a,class:"featured-projects__viewport","data-lenis-prevent":i(g)?"":void 0},[o("div",{ref_key:"trackRef",ref:f,class:"featured-projects__track"},[(e(!0),t(B,null,U(i($),q=>(e(),t("article",{key:q.project?._id||q._key,class:"featured-project"},[q.project?.slug?.current?(e(),L(d,{key:0,to:i(S)(q.project.slug),class:"featured-project-link"},{default:de(()=>[o("div",Ke,[o("div",Qe,[le(F,{project:q.project,"image-class":"featured-project-image"},null,8,["project"]),o("div",Ye,[x[0]||(x[0]=o("div",{class:"portfolio-item-overlay-bg","aria-hidden":"true"},null,-1)),o("div",Je,[o("h3",Ze,j(q.project?.title),1),o("div",et,[q.project?.thumbnailDescription?(e(),t("div",tt,j(q.project.thumbnailDescription),1)):u("",!0)])])])])])]),_:2},1032,["to"])):u("",!0)]))),128))],512)],8,Xe)],512)],512)}}},it=Object.assign(Y(nt,[["__scopeId","data-v-5a7f8721"]]),{__name:"PageSectionFeaturedProjects"}),at={class:"hero-carousel"},rt={key:0,class:"hero-carousel__desktop"},lt={class:"hero-carousel__column rounded-medium"},ct={class:"hero-carousel__stack"},ut=["src","type"],dt={key:0,class:"hero-carousel__column rounded-medium"},_t={class:"hero-carousel__stack"},pt=["src","type"],gt={key:1,class:"hero-carousel__mobile rounded-medium"},mt={class:"hero-carousel__stack"},ft=["src","type"],ht={__name:"PageSectionHeroCarousel",props:{section:{type:Object,required:!0}},setup(r){const c=r,S=G(0),_=G(0),v=G(0),a=G(!1),f=G(!1),k=G(!1);let T=null,s=null,l=null,p=0;function $(P){return P?P.mediaType==="video"?!!P.video?.asset?.url:!!P.image?.asset?.url:!1}function g(P,W=4e3){const N=Number.parseInt(P,10);return!Number.isFinite(N)||N<100?W:N}function n(P,W=!1){if(typeof P=="boolean")return P;if(typeof P=="string"){const N=P.trim().toLowerCase();if(["true","1","yes","on"].includes(N))return!0;if(["false","0","no","off",""].includes(N))return!1}return typeof P=="number"?P!==0:W}function y(P){if(!P||typeof P!="string")return"video/mp4";const W=P.toLowerCase();return W.endsWith(".webm")?"video/webm":W.endsWith(".ogg")||W.endsWith(".ogv")?"video/ogg":"video/mp4"}const m=R(()=>(c.section?.heroCarouselLeft||[]).filter($)),h=R(()=>(c.section?.heroCarouselRight||[]).filter($)),C=R(()=>(c.section?.heroCarouselMobile||[]).filter($)),z=R(()=>n(c.section?.heroCarouselEnableRight,!1)),D=R(()=>n(c.section?.heroCarouselLoopAtSameTime,!1)),I=R(()=>z.value&&h.value.length>0),M=R(()=>m.value.length>0),E=R(()=>g(c.section?.heroCarouselLeftTiming,4e3)),b=R(()=>g(c.section?.heroCarouselRightTiming,4e3)),w=R(()=>E.value),x=R(()=>C.value.length?C.value:m.value),F=R(()=>x.value.length?x.value[v.value%x.value.length]:null);function d(P=[]){return P.filter(W=>W?.mediaType!=="video"&&W?.image?.asset?.url).map(W=>W.image.asset.url)}function q(P){return new Promise(W=>{if(!P){W();return}const N=new Image;N.onload=()=>W(),N.onerror=()=>W(),N.src=P})}async function A(P=[]){const W=d(P);return W.length&&await Promise.all(W.map(N=>q(N))),!0}async function K(){const P=++p;a.value=d(m.value).length===0,f.value=d(h.value).length===0,k.value=d(x.value).length===0,await Promise.all([A(m.value),A(h.value),A(x.value)]),P===p&&(a.value=!0,f.value=!0,k.value=!0)}function O(){T&&(clearInterval(T),T=null),s&&(clearInterval(s),s=null),l&&(clearInterval(l),l=null)}function H(){S.value=0,_.value=0,v.value=0}function J(){O(),H(),m.value.length>1&&(T=be(()=>{const P=(S.value+1)%m.value.length,W=P===0;S.value=P,I.value&&D.value&&W&&(_.value=(_.value+1)%h.value.length)},E.value)),I.value&&!D.value&&h.value.length>1&&(s=be(()=>{_.value=(_.value+1)%h.value.length},b.value)),x.value.length>1&&(l=be(()=>{v.value=(v.value+1)%x.value.length},w.value))}async function X(){await K(),J()}return ne(()=>[m.value.length,h.value.length,C.value.length,z.value,D.value,E.value,b.value],()=>{X()}),oe(()=>{X()}),$e(()=>{X()}),Ne(()=>{p+=1,O()}),pe(()=>{p+=1,O()}),(P,W)=>{const N=te;return e(),t("section",at,[i(M)?(e(),t("div",rt,[o("div",lt,[o("div",ct,[(e(!0),t(B,null,U(i(m),(V,ee)=>(e(),t(B,{key:`left-item-${V._key||ee}`},[V.mediaType==="video"&&V.video?.asset?.url?(e(),t("video",{key:0,class:Z(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===i(S)}]),autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},[o("source",{src:V.video.asset.url,type:y(V.video.asset.url)},null,8,ut)],2)):V.image?.asset?.url?(e(),L(N,{key:1,src:V.image.asset.url,alt:r.section.title||"",class:Z(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===i(S)&&i(a)}]),fit:"cover"},null,8,["src","alt","class"])):u("",!0)],64))),128))])]),i(I)?(e(),t("div",dt,[o("div",_t,[(e(!0),t(B,null,U(i(h),(V,ee)=>(e(),t(B,{key:`right-item-${V._key||ee}`},[V.mediaType==="video"&&V.video?.asset?.url?(e(),t("video",{key:0,class:Z(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===i(_)}]),autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},[o("source",{src:V.video.asset.url,type:y(V.video.asset.url)},null,8,pt)],2)):V.image?.asset?.url?(e(),L(N,{key:1,src:V.image.asset.url,alt:r.section.title||"",class:Z(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===i(_)&&i(f)}]),fit:"cover"},null,8,["src","alt","class"])):u("",!0)],64))),128))])])):u("",!0)])):u("",!0),i(F)?(e(),t("div",gt,[o("div",mt,[(e(!0),t(B,null,U(i(x),(V,ee)=>(e(),t(B,{key:`mobile-item-${V._key||ee}`},[V.mediaType==="video"&&V.video?.asset?.url?(e(),t("video",{key:0,class:Z(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===i(v)}]),autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},[o("source",{src:V.video.asset.url,type:y(V.video.asset.url)},null,8,ft)],2)):V.image?.asset?.url?(e(),L(N,{key:1,src:V.image.asset.url,alt:r.section.title||"",class:Z(["hero-carousel__media hero-carousel__slide",{"hero-carousel__slide--active":ee===i(v)&&i(k)}]),fit:"cover"},null,8,["src","alt","class"])):u("",!0)],64))),128))])])):u("",!0)])}}},yt=Object.assign(Y(ht,[["__scopeId","data-v-0451ff2b"]]),{__name:"PageSectionHeroCarousel"}),vt={class:"info-section"},kt={key:0,class:"info-section-image"},bt={class:"info-section-content"},wt={key:0,class:"info-block-title"},St={key:0,class:"info-block-title"},$t={key:2,class:"info-links-list"},Tt={key:0,class:"info-link-subtitle"},Pt=["href","target","rel"],xt={class:"info-link-title"},It={key:3,class:"info-services-block"},qt={key:0,class:"info-block-title"},Lt={class:"info-services-content"},Rt={key:4,class:"info-news-block"},At={key:0,class:"info-block-title"},Ct={key:1,class:"info-news-list"},jt={__name:"PageSectionInfo",props:{section:{type:Object,required:!0}},setup(r){const c=a=>{if(a?.metadata?.dimensions){const{width:f,height:k,aspectRatio:T}=a.metadata.dimensions;if(T)return{aspectRatio:`${T}`};if(f&&k)return{aspectRatio:`${f/k}`}}return{aspectRatio:"4 / 3"}};G(null);const S=a=>{a?.target&&a.target.classList.add("loaded")};oe(()=>{se(()=>{const a=document.querySelector(".info-image");a&&a.complete&&a.naturalHeight>0&&a.classList.add("loaded")})});const{data:_}=Ce("news-items",async()=>{const a=`*[_type in ["news", "pressAward"]] | order(orderRank) {
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
  }`;try{return(await $fetch("/api/sanity/query",{method:"POST",body:{query:a}}))?.result||[]}catch(f){return console.error("[News] Error fetching:",f),[]}},{server:!0}),v=(a,f)=>!a||a.startsWith("mailto:")||a.startsWith("tel:")?!1:!!(f||a.startsWith("http://")||a.startsWith("https://")||a.startsWith("//"));return(a,f)=>{const k=te,T=ce;return e(),t("div",vt,[r.section.infoImage?.asset?(e(),t("div",kt,[o("div",{class:"info-image-container",style:ae(c(r.section.infoImage.asset))},[le(k,{src:r.section.infoImage.asset.url||"",width:r.section.infoImage.asset.metadata?.dimensions?.width,height:r.section.infoImage.asset.metadata?.dimensions?.height,alt:"",class:"info-image",onLoad:S},null,8,["src","width","height"])],4)])):u("",!0),o("div",bt,[(e(!0),t(B,null,U(r.section.infoContent,(s,l)=>(e(),t("div",{key:s._key||l,class:Z(["info-block",[s._type==="infoImageBlock"&&s.showOnDesktop===!1?"info-block-hide-desktop":"",s._type==="infoImageBlock"&&s.showOnMobile===!1?"info-block-hide-mobile":""]])},[s._type==="infoImageBlock"&&s.image?.asset?(e(),t("div",{key:0,class:Z(["info-image-block",[s._type==="infoImageBlock"&&s.spanTwoColumns?"info-image-block-span-2":""]])},[le(k,{src:s.image.asset.url||"",alt:"",class:"info-image-inline"},null,8,["src"])],2)):s._type==="infoTextBlock"?(e(),t("div",{key:1,class:Z(["info-text-block",{"info-text-block-large":s.largeText}])},[s.title?(e(),t("h2",wt,j(s.title),1)):u("",!0),s.text?(e(),L(T,{key:1,blocks:s.text},null,8,["blocks"])):u("",!0)],2)):s._type==="infoLinksBlock"?(e(),t("div",{key:2,class:Z(["info-links-block",{"info-links-block-large":s.largeText}])},[s.title?(e(),t("h2",St,j(s.title),1)):u("",!0),s.text?(e(),L(T,{key:1,blocks:s.text},null,8,["blocks"])):u("",!0),s.links&&s.links.length>0?(e(),t("div",$t,[(e(!0),t(B,null,U(s.links,(p,$)=>(e(),t("div",{key:$,class:"info-link-item"},[p.subtitle?(e(),t("span",Tt,j(p.subtitle),1)):u("",!0),o("a",{href:p.link,target:v(p.link,p.openInNewTab)?"_blank":void 0,rel:v(p.link,p.openInNewTab)?"noopener":void 0,class:"info-link"},[o("span",xt,[we(j(p.linkTitle||p.link)+" ",1),f[0]||(f[0]=o("span",{class:"info-link-arrow"},[we("   "),o("svg",{id:"a","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 18 18"},[o("polygon",{points:"16.5 0 7 0 7 1.5 15.44 1.5 .05 16.89 1.11 17.95 16.5 2.56 16.5 11 18 11 18 1.5 18 0 16.5 0"})])],-1))])],8,Pt)]))),128))])):u("",!0)],2)):s._type==="infoServicesBlock"?(e(),t("div",It,[s.title?(e(),t("h2",qt,j(s.title),1)):u("",!0),o("div",Lt,[le(T,{blocks:s.content},null,8,["blocks"])])])):s._type==="infoNewsBlock"||s._type==="infoPressAwardsBlock"?(e(),t("div",Rt,[s.title?(e(),t("h2",At,j(s.title),1)):u("",!0),i(_)&&i(_).length>0?(e(),t("div",Ct,[(e(!0),t(B,null,U(i(_),(p,$)=>(e(),t("div",{key:p._id||$,class:"info-news-item"},[p.featuredImage?.asset?.url?(e(),L(k,{key:0,src:p.featuredImage.asset.url,width:p.featuredImage.asset.metadata?.dimensions?.width,height:p.featuredImage.asset.metadata?.dimensions?.height,alt:"",class:"info-news-image"},null,8,["src","width","height"])):u("",!0),p.content?(e(),L(T,{key:1,blocks:p.content,class:"info-news-content"},null,8,["blocks"])):u("",!0)]))),128))])):u("",!0)])):u("",!0)],2))),128))])])}}},Et=Object.assign(Y(jt,[["__scopeId","data-v-a7f71c1e"]]),{__name:"PageSectionInfo"}),Mt={class:"services-section grid gap-30"},Ot={key:0,class:"subtitle subtitle--circle twisted orange-dot"},Dt={class:"services-section__grid fluid-type",style:{"--desktop":"54","--mobile":"28"}},Nt={__name:"PageSectionServices",props:{section:{type:Object,required:!0}},setup(r){const c=r,S=R(()=>(c.section?.servicesTextarea||"").split(/\r?\n/).map(_=>_.trim()).filter(Boolean));return(_,v)=>(e(),t("section",Mt,[r.section.servicesTitle||r.section.title?(e(),t("h2",Ot,j(r.section.servicesTitle||r.section.title),1)):u("",!0),o("div",Dt,[(e(!0),t(B,null,U(i(S),(a,f)=>(e(),t("div",{key:`service-${f}`,class:"services-section__item"},j(a),1))),128))])]))}},Ft=Y(Nt,[["__scopeId","data-v-688a5a41"]]),Bt={class:"text-section underline-links pad-top-bottom pad-20 pad-md-40 pad-top"},Wt={class:"text-section__inner fluid-type pad-md-20",style:{"--desktop":"73","--mobile":"24"}},zt={__name:"PageSectionText",props:{section:{type:Object,required:!0}},setup(r){return(c,S)=>{const _=ce;return e(),t("div",Bt,[o("div",Wt,[r.section.textContent?.length?(e(),L(_,{key:0,blocks:r.section.textContent},null,8,["blocks"])):u("",!0)])])}}},Vt=Y(zt,[["__scopeId","data-v-e13188b0"]]),Ht={key:0,class:"kinetic-typography__text kinetic-typography__text--static hide-md"},Gt={key:1,class:"kinetic-typography__text kinetic-typography__text--static hide-md"},Ut={key:0,class:"kinetic-typography__line1"},Xt={key:1,class:"kinetic-typography__line2"},Kt={class:"kinetic-typography__highlight"},Qt={class:"kinetic-typography__highlight"},Yt={key:2,class:"kinetic-typography__stage show-md"},Jt={class:"kinetic-typography__text kinetic-typography__text--animated fluid-type",style:{"--desktop":"108","--mobile":"40"}},Zt={key:1,class:"kinetic-typography__line2"},es={class:"kinetic-typography__highlight"},ts={class:"kinetic-typography__highlight"},ss="(min-width: 1000px)",os={__name:"PageSectionKineticTypography",props:{section:{type:Object,required:!0}},setup(r){const c=r,S=G(null),_=G(null),v=G(null);let a=null;const f=R(()=>c.section.kineticTypographyLine1??""),k=R(()=>c.section.kineticTypographyHighlightStart??""),T=R(()=>c.section.kineticTypographyHighlightEnd??""),s=R(()=>{const g=c.section.kineticTypographyHighlightConnector;return g==null||g===""?" and ":g}),l=R(()=>!!c.section.kineticTypographyHighlightStart?.trim()||!!c.section.kineticTypographyHighlightEnd?.trim()),p=R(()=>!!c.section.kineticTypographyLine1?.trim()||l.value);async function $(){if(a?.revert(),a=null,!p.value)return;const[{gsap:g},{ScrollTrigger:n}]=await Promise.all([_e(()=>import("./DXJSAWiJ.js").then(y=>y.W),__vite__mapDeps([0,1]),import.meta.url),_e(()=>import("./DXJSAWiJ.js").then(y=>y.X),__vite__mapDeps([0,1]),import.meta.url)]);g.registerPlugin(n),a=g.matchMedia(),a.add(ss,()=>{let y=null,m=!1;const h=()=>({section:S.value,line1El:_.value,connectorEl:v.value}),C=({section:D,connectorEl:I,line1El:M})=>{if(!D||!I)return!1;const E=D.querySelector(".kinetic-typography__stage");return!(!E||getComputedStyle(E).display==="none"||I.offsetWidth===0||M&&M.offsetHeight===0)},z=()=>{const{section:D,line1El:I,connectorEl:M}=h();if(m||!C({section:D,connectorEl:M,line1El:I})){requestAnimationFrame(z);return}const E=[...I?[I]:[],M];M.style.display="inline-block",M.style.overflow="hidden",M.style.verticalAlign="bottom",M.style.whiteSpace="pre",I&&(I.style.overflow="hidden");let b=0,w=0,x=0;const F=()=>{M.style.width="",x=M.offsetWidth,I&&(I.style.height="",I.style.marginBottom="",b=I.offsetHeight,w=parseFloat(getComputedStyle(I).marginBottom)||0)},d=.5,q=.5,A=.5+.5*.75,K=H=>{if(H<=d){const X=1-H/d;E.forEach(P=>{P.style.opacity=String(X)}),I&&(I.style.height="",I.style.marginBottom=""),M.style.width="";return}F(),E.forEach(X=>{X.style.opacity="0"});const J=Math.min(1,(H-q)/(A-q));I&&(I.style.height=`${b*(1-J)}px`,I.style.marginBottom=`${w*(1-J)}px`),M.style.width=`${x*(1-J)}px`},O=D.offsetHeight;y=n.create({trigger:D,start:"top top",end:()=>`+=${O}`,pin:D,pinSpacing:!0,anticipatePin:1,invalidateOnRefresh:!0,onUpdate(H){K(H.progress)},onRefresh(H){K(H.progress)}}),K(y.progress),document.fonts?.ready&&document.fonts.ready.then(()=>{m||n.refresh()})};return requestAnimationFrame(z),()=>{m=!0,y?.kill(),y=null;const{line1El:D,connectorEl:I}=h();D&&(D.style.opacity="",D.style.height="",D.style.marginBottom="",D.style.overflow=""),I&&(I.style.opacity="",I.style.width="",I.style.display="",I.style.overflow="",I.style.verticalAlign="",I.style.whiteSpace="")}})}return oe(async()=>{await se(),await $()}),pe(()=>{a?.revert(),a=null}),(g,n)=>{const y=ce;return e(),t("section",{ref_key:"sectionRef",ref:S,class:"kinetic-typography"},[r.section.kineticTypographyText?.length?(e(),t("div",Ht,[le(y,{blocks:r.section.kineticTypographyText},null,8,["blocks"])])):i(p)?(e(),t("div",Gt,[i(f)?(e(),t("p",Ut,j(i(f)),1)):u("",!0),i(l)?(e(),t("p",Xt,[o("span",Kt,j(i(k)),1),o("span",null,j(i(s)),1),o("span",Qt,j(i(T)),1)])):u("",!0)])):u("",!0),i(p)?(e(),t("div",Yt,[o("div",Jt,[i(f)?(e(),t("p",{key:0,ref_key:"line1Ref",ref:_,class:"kinetic-typography__line1 kinetic-typography__line1--animated","data-kinetic-fade":""},j(i(f)),513)):u("",!0),i(l)?(e(),t("p",Zt,[o("span",es,j(i(k)),1),o("span",{ref_key:"connectorRef",ref:v,class:"kinetic-typography__connector","data-kinetic-fade":""},j(i(s)),513),o("span",ts,j(i(T)),1)])):u("",!0)])])):u("",!0)],512)}}},ns=Object.assign(Y(os,[["__scopeId","data-v-c6f1cf08"]]),{__name:"PageSectionKineticTypography"}),is={key:0,class:"cards-section grid gap-30"},as={key:0,class:"subtitle subtitle--circle purple-dot"},rs={class:"cards-section--grid-mode"},ls={class:"cards-section__grid pad-20 pad-md-60 pad-bottom"},cs={class:"cards-section__media"},us={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"cards-section__video"},ds=["src","type"],_s={class:"cards-section__text"},ps={key:0,class:"cards-section__title fluid-type pad-60 pad-right",style:{"--desktop":"58","--mobile":"24"}},gs={class:"fluid-type",style:{"--desktop":"30","--mobile":"16"}},ms={key:1,class:"cards-section cards-section--stack-mode grid gap-50 pad-30 pad-top"},fs={key:0,class:"subtitle subtitle--circle purple-dot"},hs={class:"cards-section__container"},ys={class:"cards-section__grid"},vs={class:"cards-section__media"},ks={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"cards-section__video"},bs=["src","type"],ws={class:"cards-section__text"},Ss={class:"grid gap-30 pad-md-50 pad-right"},$s={key:0,class:"cards-section__title fluid-type line-height-1 pad-60 pad-right",style:{"--desktop":"56","--mobile":"24"}},Ts={class:"fluid-type",style:{"--desktop":"40","--mobile":"16"}},Ps={__name:"PageSectionCards",props:{section:{type:Object,required:!0}},setup(r){const c=r,S=R(()=>c.section?.cardsDisableScrollDemo===!0),_=R(()=>c.section?.cardsSectionTitle||c.section?.cardsTitle||c.section?.title||"");function v(a){if(!a||typeof a!="string")return"video/mp4";const f=a.toLowerCase();return f.endsWith(".webm")?"video/webm":f.endsWith(".ogg")||f.endsWith(".ogv")?"video/ogg":"video/mp4"}return(a,f)=>{const k=te,T=ce;return i(S)?(e(),t("section",is,[i(_)?(e(),t("h2",as,j(i(_)),1)):u("",!0),o("div",rs,[(e(!0),t(B,null,U(r.section.cards||[],(s,l)=>(e(),t("article",{key:s._key||l,class:"cards-section__item pad-25 rounded-medium"},[o("div",ls,[o("div",cs,[s.mediaType==="video"&&s.video?.asset?.url?(e(),t("video",us,[o("source",{src:s.video.asset.url,type:v(s.video.asset.url)},null,8,ds)])):s.image?.asset?.url?(e(),L(k,{key:1,src:s.image.asset.url,alt:s.title||"",width:s.image.asset.metadata?.dimensions?.width,height:s.image.asset.metadata?.dimensions?.height,class:"cards-section__image"},null,8,["src","alt","width","height"])):u("",!0)]),o("div",_s,[s.title?(e(),t("h3",ps,j(s.title),1)):u("",!0),o("div",gs,[s.description?.length?(e(),L(T,{key:0,blocks:s.description},null,8,["blocks"])):u("",!0)])])])]))),128))])])):(e(),t("section",ms,[i(_)?(e(),t("h2",fs,j(i(_)),1)):u("",!0),o("div",hs,[(e(!0),t(B,null,U(r.section.cards||[],(s,l)=>(e(),t("article",{key:s._key||l,class:"cards-section__item rounded-medium pad-20 pad-sm-50"},[o("div",ys,[o("div",vs,[s.mediaType==="video"&&s.video?.asset?.url?(e(),t("video",ks,[o("source",{src:s.video.asset.url,type:v(s.video.asset.url)},null,8,bs)])):s.image?.asset?.url?(e(),L(k,{key:1,src:s.image.asset.url,alt:s.title||"",width:s.image.asset.metadata?.dimensions?.width,height:s.image.asset.metadata?.dimensions?.height,class:"cards-section__image"},null,8,["src","alt","width","height"])):u("",!0)]),o("div",ws,[o("div",Ss,[s.title?(e(),t("h3",$s,j(s.title),1)):u("",!0),o("div",Ts,[s.description?.length?(e(),L(T,{key:0,blocks:s.description},null,8,["blocks"])):u("",!0)])])])])]))),128))])]))}}},Me=Y(Ps,[["__scopeId","data-v-cd8e521b"]]),xs={key:0,class:"sticky-cards__heading subtitle subtitle--circle purple-dot"},Is={class:"sticky-cards__container"},qs={class:"sticky-cards__grid"},Ls={class:"sticky-cards__media"},Rs={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"sticky-cards__video"},As=["src","type"],Cs={class:"sticky-cards__text"},js={class:"grid gap-30 pad-md-50 pad-right"},Es={key:0,class:"sticky-cards__title fluid-type line-height-1 pad-60 pad-right",style:{"--desktop":"56","--mobile":"24"}},Ms={class:"fluid-type",style:{"--desktop":"40","--mobile":"16"}},Os="(min-width: 1000px)",ie=650,Ie=10,Ds={__name:"PageSectionStackingCards",props:{section:{type:Object,required:!0}},setup(r){const c=r,S=G(null),_=Re(),{isLoading:v}=Se();let a=null,f=null,k=null,T=()=>{},s=()=>{},l=0;const p=R(()=>(c.section?.cards||[]).length>0),$=R(()=>c.section?.cardsSectionTitle||c.section?.cardsTitle||c.section?.title||""),g=R(()=>({...c.section,cardsDisableScrollDemo:!0}));function n(b){if(!b||typeof b!="string")return"video/mp4";const w=b.toLowerCase();return w.endsWith(".webm")?"video/webm":w.endsWith(".ogg")||w.endsWith(".ogv")?"video/ogg":"video/mp4"}async function y(b){const w=b.querySelectorAll("img");await Promise.all(Array.from(w).map(x=>new Promise(F=>{if(x.complete){F();return}x.addEventListener("load",F,{once:!0}),x.addEventListener("error",F,{once:!0})})))}async function m(){if(a?.revert(),a=null,!p.value)return;const{gsap:b,ScrollTrigger:w}=await Ae();!b||!w||(a=b.matchMedia(),a.add(Os,()=>{let x=null,F=!1;const d=()=>{fe()};return window.addEventListener("resize",d,{passive:!0}),(async()=>{const A=S.value;if(F||!A){l<Ie&&(l+=1,I(150));return}const K=A.querySelectorAll(".sticky-cards__card"),O=K.length;if(O<1||A.offsetHeight===0){l<Ie&&(l+=1,I(150));return}if(await y(A),F||(await new Promise(N=>requestAnimationFrame(N)),await new Promise(N=>requestAnimationFrame(N)),F))return;const H=1/O,J=5,X=.075,P=O<=1?0:(O-1)/O;K.forEach((N,V)=>{b.set(N,{xPercent:-50,yPercent:-50+V*J,scale:1-V*X})});function W(N){const V=O<=1?0:Math.min(N,1)*P,ee=Math.min(Math.floor(V/H),O-1),ge=(V-ee*H)/H;K.forEach((ve,ke)=>{if(ke<ee)b.set(ve,{xPercent:-50,yPercent:-250,rotationX:35,scale:1});else if(ke===ee)b.set(ve,{xPercent:-50,yPercent:b.utils.interpolate(-50,-200,ge),rotationX:b.utils.interpolate(0,35,ge),scale:1});else{const Pe=ke-ee,Oe=(Pe-ge)*J,De=1-(Pe-ge)*X;b.set(ve,{xPercent:-50,yPercent:-50+Oe,rotationX:0,scale:De})}})}x=w.create({trigger:A,start:"top top",end:()=>`+=${window.innerHeight*Math.max((O-1)*2,1)}`,pin:A,pinSpacing:!0,scrub:1,anticipatePin:1,invalidateOnRefresh:!0,onUpdate(N){W(N.progress)},onRefresh(N){ue(N,A),W(N.progress)},onEnter(N){ue(N,A),W(N.progress)},onEnterBack(N){ue(N,A),W(N.progress)},onLeave(){W(1)},onLeaveBack(){W(0)}}),ue(x,A),W(x.progress),l=0,fe(h()?500:120)})(),()=>{F=!0,window.removeEventListener("resize",d),x?.kill(),x=null;const A=S.value?.querySelectorAll(".sticky-cards__card");A?.length&&b.set(A,{clearProps:"all"})}}))}function h(){return!!document.querySelector("[data-featured-projects-scroll]")}function C(){return!!document.querySelector("[data-featured-projects-scroll][data-featured-projects-ready]")}function z(){return h()?450:150}function D(){h()&&(k&&clearTimeout(k),k=setTimeout(()=>{k=null,l=0,I(ie)},750))}function I(b=0){f&&clearTimeout(f),f=setTimeout(async()=>{f=null,await se(),m()},b+z())}function M(b=0){const w=(F=0)=>{I(F+b),D()};if(!h()||C()){w();return}const x=()=>{s(),l=0,w(ie)};s(),document.addEventListener("featured-projects-scroll-ready",x,{once:!0}),s=()=>{document.removeEventListener("featured-projects-scroll-ready",x)},w(ie)}function E(b){if(document.body.classList.contains("preloader-complete")){b();return}document.addEventListener("preloader-complete",b,{once:!0})}return ne(()=>(c.section?.cards||[]).map(b=>[b._key,b.title,b.mediaType,b.image?.asset?.url,b.video?.asset?.url].join(":")).join("|"),async()=>{M(ie)}),ne(v,b=>{b||M(ie)}),oe(async()=>{await se(),T=_.hook("page:finish",()=>{M(ie)}),E(()=>{M()})}),$e(()=>{M(ie)}),ye(()=>{f&&clearTimeout(f),f=null,k&&clearTimeout(k),k=null,T(),s(),a?.revert(),a=null}),(b,w)=>{const x=Me,F=te,d=ce;return e(),t(B,null,[i(p)?(e(),L(x,{key:0,section:i(g),class:"stacking-cards-section__mobile"},null,8,["section"])):u("",!0),i(p)?(e(),t("section",{key:1,ref_key:"sectionRef",ref:S,class:"sticky-cards stacking-cards-section__desktop grid gap-30"},[i($)?(e(),t("h2",xs,j(i($)),1)):u("",!0),o("div",Is,[(e(!0),t(B,null,U(r.section.cards,(q,A)=>(e(),t("article",{key:q._key||`card-${A}`,class:"sticky-cards__card rounded-medium pad-20 pad-sm-50",style:ae({zIndex:r.section.cards.length-A,"--card-index":A})},[o("div",qs,[o("div",Ls,[q.mediaType==="video"&&q.video?.asset?.url?(e(),t("video",Rs,[o("source",{src:q.video.asset.url,type:n(q.video.asset.url)},null,8,As)])):q.image?.asset?.url?(e(),L(F,{key:1,src:q.image.asset.url,alt:q.title||"",width:q.image.asset.metadata?.dimensions?.width,height:q.image.asset.metadata?.dimensions?.height,class:"sticky-cards__image"},null,8,["src","alt","width","height"])):u("",!0)]),o("div",Cs,[o("div",js,[q.title?(e(),t("h3",Es,j(q.title),1)):u("",!0),o("div",Ms,[q.description?.length?(e(),L(d,{key:0,blocks:q.description},null,8,["blocks"])):u("",!0)])])])])],4))),128))])],512)):u("",!0)],64)}}},Ns=Object.assign(Y(Ds,[["__scopeId","data-v-4856b5cc"]]),{__name:"PageSectionStackingCards"}),Fs={class:"autoscroll-gallery-section rounded-medium"},Bs=["data-direction"],Ws={"data-draggable-marquee-collection":"",class:"draggable-marquee__collection"},zs={"data-draggable-marquee-list":"",class:"draggable-marquee__list"},Vs={key:0,class:"draggable-marquee__item-media",draggable:"false",autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},Hs=["src"],Gs={"aria-hidden":"true",class:"draggable-marquee__list draggable-marquee__list--clone"},Us={key:0,class:"draggable-marquee__item-media",draggable:"false",autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},Xs=["src"],Ks={__name:"PageSectionAutoscrollGallery",props:{section:{type:Object,required:!0}},setup(r){Q.registerPlugin(he,Fe);const c=r,S=G(null);function _(n){const m=(n||"3/5").trim().split("/").map(h=>h.trim()).filter(Boolean);if(m.length===2){const h=Number.parseFloat(m[0]),C=Number.parseFloat(m[1]);if(h>0&&C>0&&Number.isFinite(h)&&Number.isFinite(C))return`${h} / ${C}`}return"3 / 5"}const v=R(()=>({"--autoscroll-gallery-aspect-ratio":_(c.section?.autoscrollGalleryAspectRatio)})),a=R(()=>{const n=Number.parseFloat(String(c.section?.autoscrollGallerySpeed??60));return Number.isFinite(n)&&n>0?n:60}),f=R(()=>(c.section?.autoscrollGalleryDirection||"left").toLowerCase()==="right"?"right":"left"),k=R(()=>(c.section?.autoscrollGalleryItems||[]).filter(n=>n?n.mediaType==="video"?!!n.video?.asset?.url:!!n.image?.asset?.url:!1)),T=[];let s=null;function l(){s?.disconnect(),s=null}function p(){const n=S.value;!n||n.getAttribute("data-draggable-marquee-init")==="initialized"||s||(s=new ResizeObserver(()=>{g(),S.value?.getAttribute("data-draggable-marquee-init")==="initialized"&&l()}),s.observe(n))}function $(){se(()=>{g(),p()})}function g(){const n=S.value;if(!n||n.getAttribute("data-draggable-marquee-init")==="initialized")return;const m=n.querySelector("[data-draggable-marquee-collection]"),h=m.querySelectorAll(".draggable-marquee__list"),C=h[0],z=h[1];if(!m||!C||!z||!k.value.length)return;const D=C.querySelector(".draggable-marquee__item"),I=getComputedStyle(C),M=D?D.getBoundingClientRect().width:0,E=Number.parseFloat(I.columnGap||I.gap||"0"),b=Math.round(k.value.length*M+k.value.length*E),w=z.offsetLeft-C.offsetLeft,x=Math.round(C.scrollWidth||C.getBoundingClientRect().width),F=Math.round(b||w||x);if(!F)return;let d=0;const q=f.value==="right"?1:-1,A=Math.max(.01,a.value/1e3),K=Q.utils.wrap(-F,0),O=Q.quickTo(m,"x",{duration:.5,ease:"power3",modifiers:{x:X=>{const P=K(Number.parseFloat(X)||0);return`${Math.round(P)}px`}}});O(d);const H=he.create({target:m,type:"pointer,touch",preventDefault:!0,debounce:!1,onPress:()=>{n.setAttribute("data-dragging","true")},onDrag:X=>{d+=X.deltaX,O(d)},onRelease:()=>{n.setAttribute("data-dragging","false")},onStop:()=>{n.setAttribute("data-dragging","false")}});function J(X,P){d+=q*(P*A),O(d)}Q.ticker.add(J),n.setAttribute("data-draggable-marquee-init","initialized"),T.push(()=>{H.kill(),Q.ticker.remove(J),Q.killTweensOf(m),n.setAttribute("data-draggable-marquee-init",""),n.setAttribute("data-dragging","false"),Q.set(m,{clearProps:"transform"})})}return oe(()=>{$()}),ne(()=>[c.section?.autoscrollGalleryAspectRatio,c.section?.autoscrollGallerySpeed,c.section?.autoscrollGalleryDirection,k.value.length],()=>{T.splice(0).forEach(n=>n()),l(),$()}),pe(()=>{l(),T.splice(0).forEach(n=>n())}),(n,y)=>{const m=te;return e(),t("section",Fs,[o("div",{ref_key:"wrapperRef",ref:S,"data-draggable-marquee-init":"","data-direction":i(f),class:"draggable-marquee",style:ae(i(v)),onDragstart:y[2]||(y[2]=re(()=>{},["prevent"])),onSelectstart:y[3]||(y[3]=re(()=>{},["prevent"]))},[o("div",Ws,[o("div",zs,[(e(!0),t(B,null,U(i(k),(h,C)=>(e(),L(xe(h.link?"a":"div"),{key:`${h._key||C}-a`,class:"draggable-marquee__item",draggable:"false",href:h.link||void 0,target:h.link?"_blank":void 0,rel:h.link?"noopener noreferrer":void 0,onDragstart:y[0]||(y[0]=re(()=>{},["prevent"]))},{default:de(()=>[h.mediaType==="video"&&h.video?.asset?.url?(e(),t("video",Vs,[o("source",{src:h.video.asset.url,type:"video/mp4"},null,8,Hs)])):h.image?.asset?.url?(e(),L(m,{key:1,src:h.image.asset.url,alt:"",fit:"cover",class:"draggable-marquee__item-media",draggable:"false"},null,8,["src"])):u("",!0)]),_:2},1064,["href","target","rel"]))),128))]),o("div",Gs,[(e(!0),t(B,null,U(i(k),(h,C)=>(e(),L(xe(h.link?"a":"div"),{key:`${h._key||C}-b`,class:"draggable-marquee__item",draggable:"false",href:h.link||void 0,target:h.link?"_blank":void 0,rel:h.link?"noopener noreferrer":void 0,onDragstart:y[1]||(y[1]=re(()=>{},["prevent"]))},{default:de(()=>[h.mediaType==="video"&&h.video?.asset?.url?(e(),t("video",Us,[o("source",{src:h.video.asset.url,type:"video/mp4"},null,8,Xs)])):h.image?.asset?.url?(e(),L(m,{key:1,src:h.image.asset.url,alt:"",fit:"cover",class:"draggable-marquee__item-media",draggable:"false"},null,8,["src"])):u("",!0)]),_:2},1064,["href","target","rel"]))),128))])])],44,Bs)])}}},Qs=Y(Ks,[["__scopeId","data-v-9b18e213"]]),Ys={class:"news-section grid gap-30"},Js={key:0,class:"subtitle subtitle--circle yellow-dot"},Zs={key:1,class:"news-list"},eo={class:"news-thumbnail"},to={__name:"PageSectionNews",props:{section:{type:Object,required:!0}},setup(r){const c=r,S=R(()=>(c.section?.newsItems||[]).map(_=>_?.newsPost).filter(Boolean));return(_,v)=>{const a=te,f=ce;return e(),t("section",Ys,[r.section.newsTitle||r.section.title?(e(),t("h2",Js,j(r.section.newsTitle||r.section.title),1)):u("",!0),i(S).length>0?(e(),t("div",Zs,[(e(!0),t(B,null,U(i(S),(k,T)=>(e(),t("article",{key:k._id||k._key||T,class:"news-item flex gap-md-100 yellow pad-25 rounded-medium"},[o("div",eo,[k.featuredImage?.asset?.url?(e(),L(a,{key:0,src:k.featuredImage.asset.url,width:k.featuredImage.asset.metadata?.dimensions?.width,height:k.featuredImage.asset.metadata?.dimensions?.height,alt:"",class:"news-image rounded-medium"},null,8,["src","width","height"])):u("",!0)]),k.content?(e(),L(f,{key:0,blocks:k.content,class:"news-content fluid-type",style:{"--desktop":"60","--mobile":"16"}},null,8,["blocks"])):u("",!0)]))),128))])):u("",!0)])}}},so=Y(to,[["__scopeId","data-v-6317e172"]]),oo={key:0,class:"portfolio-stats__row gap-20"},no={key:0,class:"portfolio-stats__dd"},io={class:"portfolio-stats__lozenge white orange-text rounded-small fluid-type mono",style:{"--desktop":"24"}},ao={key:0,class:"portfolio-stats__arrow",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},ro={class:"portfolio-stats__value-text"},lo={key:1,class:"fluid-type portfolio-stats__label",style:{"--desktop":"28"}},co={__name:"PortfolioStats",props:{stats:{type:Array,default:()=>[]},rootClass:{type:String,default:""}},setup(r){const c=r,S=R(()=>(c.stats||[]).some(_=>_?.label||_?.value));return(_,v)=>i(S)?(e(),t("div",{key:0,class:Z(["portfolio-stats",r.rootClass])},[(e(!0),t(B,null,U(r.stats,(a,f)=>(e(),t(B,{key:a._key||f},[a.label||a.value?(e(),t("div",oo,[a.value?(e(),t("div",no,[o("span",io,[a.icon==="arrowUp"?(e(),t("svg",ao,[...v[0]||(v[0]=[o("path",{d:"M0 8.98305L1.52649 10.5663L7.57831 4.30064V17.9661H9.74354V4.30064L15.7845 10.5775L17.3218 8.98305L8.66092 0L0 8.98305Z",fill:"currentColor"},null,-1)])])):u("",!0),o("span",ro,j(a.value),1)])])):u("",!0),a.label?(e(),t("div",lo,j(a.label),1)):u("",!0)])):u("",!0)],64))),128))],2)):u("",!0)}},uo=Y(co,[["__scopeId","data-v-f900a4f9"]]),_o={class:"portfolio-item-media rounded-medium"},po={class:"portfolio-item-overlay pad-40"},go={class:"portfolio-item-overlay-inner gap-40"},mo={class:"portfolio-item-overlay-title fluid-type",style:{"--desktop":"72"}},fo={class:"portfolio-item-overlay-content gap-50"},ho={key:0,class:"portfolio-item-overlay-desc fluid-type",style:{"--desktop":"36"}},yo={class:"portfolio-item-title"},vo={__name:"PageSectionPortfolio",props:{section:{type:Object,required:!0},projects:{type:Array,default:()=>[]}},setup(r){const c=r,{portfolioProjectPath:S}=Le(),_=[4,8,7,5,5,7];function v(p){const g=(p||"3/5").trim().split("/").map(n=>n.trim()).filter(Boolean);if(g.length===2){const n=Number.parseFloat(g[0]),y=Number.parseFloat(g[1]);if(n>0&&y>0&&Number.isFinite(n)&&Number.isFinite(y))return`${n} / ${y}`}return"3 / 5"}const a=R(()=>c.projects||[]),f=R(()=>a.value.length),k=R(()=>({"--portfolio-aspect-ratio":v(c.section?.thumbnailAspectRatio)}));function T(p,$){if($<=0)return 12;const g=$-1;return p===g&&$%2===1?12:_[p%_.length]}function s(p,$){return p===$-1&&$%2===1}function l(p,$){return{gridColumn:`span ${T(p,$)}`}}return(p,$)=>{const g=Ee,n=uo,y=Te;return e(),t("div",{class:"portfolio-section",style:ae(i(k))},[(e(!0),t(B,null,U(i(a),(m,h)=>(e(),t("div",{key:m._id,class:Z(["portfolio-item",{"portfolio-item--orphan":s(h,i(f))}]),style:ae(l(h,i(f)))},[m.slug?.current?(e(),L(y,{key:0,to:i(S)(m.slug),class:"portfolio-item-link"},{default:de(()=>[o("div",_o,[le(g,{project:m,"image-class":"portfolio-item-image rounded-medium"},null,8,["project"]),o("div",po,[$[0]||($[0]=o("div",{class:"portfolio-item-overlay-bg","aria-hidden":"true"},null,-1)),o("div",go,[o("h3",mo,j(m.title),1),o("div",fo,[m.thumbnailDescription?(e(),t("div",ho,j(m.thumbnailDescription),1)):u("",!0),m.thumbnailStats?.length?(e(),L(n,{key:1,stats:m.thumbnailStats,"root-class":"portfolio-item-overlay-stats gap-20"},null,8,["stats"])):u("",!0)])])])]),o("h3",yo,j(m.title),1)]),_:2},1032,["to"])):u("",!0)],6))),128))],4)}}},ko=Y(vo,[["__scopeId","data-v-b622bc63"]]),bo={key:0,class:"subtitle subtitle--circle orange-dot"},wo={"data-follower-collection":"",class:"preview-collection pad-md-10"},So={class:"preview-collection__list"},$o={class:"preview-list"},To={class:"team-member__inner"},Po={class:"team-member__row"},xo={class:"team-member__col is--large"},Io={class:"team-member__heading fluid-type line-height-1",style:{"--desktop":"76","--mobile":"24"}},qo={class:"team-member__col is--medium"},Lo={class:"team-member__role fluid-type line-height-1",style:{"--desktop":"52","--mobile":"24"}},Ro={"data-follower-visual":"",class:"team-member__visual"},Ao={__name:"PageSectionTeam",props:{section:{type:Object,required:!0}},setup(r){const c=r,S=G(null),{getImageSrc:_}=je(),v=R(()=>c.section?.teamMembers||[]);let a=null;function f(k){const T=k?.querySelector("[data-follower-collection]"),s=k?.querySelectorAll("[data-follower-item]")||[],l=k?.querySelector("[data-follower-cursor]"),p=k?.querySelector("[data-follower-cursor-inner]");if(!T||!s.length||!l||!p)return()=>{};let $=null,g=!0;const n=100,y=.5,m="power2.inOut",h=[];return s.forEach((C,z)=>{const D=()=>{const I=$===null||z>$;$=z,l.querySelectorAll("[data-follower-visual]").forEach(b=>{Q.killTweensOf(b),Q.to(b,{yPercent:I?-n:n,duration:y,ease:m,overwrite:"auto",onComplete:()=>b.remove()})});const M=C.querySelector("[data-follower-visual]");if(!M)return;const E=M.cloneNode(!0);p.appendChild(E),g?g=!1:Q.fromTo(E,{yPercent:I?n:-n},{yPercent:0,duration:y,ease:m,overwrite:"auto"})};C.addEventListener("mouseenter",D),h.push(()=>{C.removeEventListener("mouseenter",D)})}),()=>{h.forEach(C=>C())}}return oe(()=>{a=f(S.value)}),pe(()=>{a&&a()}),(k,T)=>{const s=te;return e(),t("section",{ref_key:"wrapRef",ref:S,"data-follower-wrap":"",class:"preview-container grid gap-40 pad-md-30 pad-top"},[r.section.title?(e(),t("h2",bo,j(r.section.title),1)):u("",!0),o("div",wo,[o("div",So,[o("div",$o,[(e(!0),t(B,null,U(i(v),(l,p)=>(e(),t("div",{key:l._key||p,"data-follower-item":"",class:"team-member"},[o("div",To,[o("div",Po,[o("div",xo,[o("h2",Io,j(l.name),1)]),o("div",qo,[o("p",Lo,j(l.role),1)])]),o("div",Ro,[l?.image?.asset?(e(),L(s,{key:0,src:i(_)(l.image.asset),alt:l.name||"",class:"team-member__visual-img"},null,8,["src","alt"])):u("",!0)])])]))),128))])]),T[0]||(T[0]=o("div",{"data-follower-cursor":"",class:"preview-follower rounded-medium"},[o("div",{"data-follower-cursor-inner":"",class:"preview-follower__inner"})],-1))])],512)}}},Co=Y(Ao,[["__scopeId","data-v-3b73f470"]]),jo=["data-logo-wall-shuffle"],Eo={class:"logo-wall__collection"},Mo={"data-logo-wall-list":"",class:"logo-wall__list"},Oo={"data-logo-wall-target-parent":"",class:"logo-wall__logo"},Do={"data-logo-wall-target":"",class:"logo-wall__logo-target"},No={__name:"PageSectionLogoWall",props:{section:{type:Object,required:!0}},setup(r){const c=r,{getImageSrc:S}=je(),_=G(null),v=G(null),a=G(null),f=R(()=>c.section?.logoWallLogos||[]),k=R(()=>c.section?.logoWallShuffle!==!1);function T(g){return S(g?.asset||g)}function s(g){return window.getComputedStyle(g).display!=="none"}function l(g){const n=g.slice();for(let y=n.length-1;y>0;y--){const m=Math.floor(Math.random()*(y+1));[n[y],n[m]]=[n[m],n[y]]}return n}async function p(g){if(!g)return;const[{gsap:n},{ScrollTrigger:y}]=await Promise.all([_e(()=>import("./DXJSAWiJ.js").then(A=>A.W),__vite__mapDeps([0,1]),import.meta.url),_e(()=>import("./DXJSAWiJ.js").then(A=>A.X),__vite__mapDeps([0,1]),import.meta.url)]);n.registerPlugin(y);const m=1.5,h=.9,C=g.querySelector("[data-logo-wall-list]");if(!C)return;const z=Array.from(C.querySelectorAll("[data-logo-wall-item]"));if(!z.length)return;const D=g.getAttribute("data-logo-wall-shuffle")!=="false",I=z.map(A=>A.querySelector("[data-logo-wall-target]")).filter(Boolean).map(A=>A.cloneNode(!0));if(!I.length)return;let M=[],E=0,b=[],w=[],x=0;const F=()=>{z.forEach(A=>{A.querySelectorAll("[data-logo-wall-target]").forEach(K=>K.remove())})},d=()=>{if(v.value&&(v.value.kill(),v.value=null),M=z.filter(s),E=M.length,!E)return;w=l(Array.from({length:E},(O,H)=>H)),x=0,F(),b=I.map(O=>O.cloneNode(!0));let A,K;if(D){const O=l(b);A=O.slice(0,E),K=l(O.slice(E))}else A=b.slice(0,E),K=l(b.slice(E));b=A.concat(K);for(let O=0;O<E;O++){const H=M[O].querySelector("[data-logo-wall-target-parent]")||M[O],J=b.shift();J&&H.appendChild(J)}v.value=n.timeline({repeat:-1,repeatDelay:m}),v.value.call(q),v.value.play()},q=()=>{if(z.filter(s).length!==E){d();return}if(!b.length||!E)return;const K=w[x%E];x++;const O=M[K],H=O.querySelector("[data-logo-wall-target-parent]")||O;if(H.querySelectorAll("[data-logo-wall-target]").length>1)return;const X=H.querySelector("[data-logo-wall-target]"),P=b.shift();P&&(n.set(P,{yPercent:50}),H.appendChild(P),X&&n.to(X,{yPercent:-50,duration:h,ease:"expo.inOut",onComplete:()=>{X.remove(),b.push(X)}}),n.to(P,{yPercent:0,duration:h,delay:.1,ease:"expo.inOut"}))};d(),a.value=y.create({trigger:g,start:"top bottom",end:"bottom top",onEnter:()=>v.value?.play(),onLeave:()=>v.value?.pause(),onEnterBack:()=>v.value?.play(),onLeaveBack:()=>v.value?.pause()})}function $(){if(document.hidden){v.value?.pause();return}v.value?.play()}return oe(()=>{p(_.value),document.addEventListener("visibilitychange",$)}),ye(()=>{v.value?.kill(),a.value?.kill(),document.removeEventListener("visibilitychange",$)}),(g,n)=>{const y=te;return i(f).length?(e(),t("section",{key:0,ref_key:"rootRef",ref:_,"data-logo-wall-shuffle":i(k)?"true":"false","data-logo-wall-cycle-init":"",class:"logo-wall"},[o("div",Eo,[o("div",Mo,[(e(!0),t(B,null,U(i(f),(m,h)=>(e(),t("div",{key:m._key||`logo-${h}`,"data-logo-wall-item":"",class:"logo-wall__item"},[o("div",Oo,[n[0]||(n[0]=o("div",{class:"logo-wall__logo-before"},null,-1)),o("div",Do,[T(m)?(e(),L(y,{key:0,src:T(m),loading:"lazy",width:"100",alt:m.alt||"",class:"logo-wall__logo-img"},null,8,["src","alt"])):u("",!0)])])]))),128))])])],8,jo)):u("",!0)}}},Fo=Object.assign(Y(No,[["__scopeId","data-v-da216363"]]),{__name:"PageSectionLogoWall"}),Bo={key:0,class:"logo-marquee-section grid gap-40 pad-md-100 pad-top-bottom"},Wo={key:0,class:"subtitle subtitle--circle yellow-dot"},zo={"data-draggable-marquee-collection":"",class:"logo-draggable-marquee__collection"},Vo={"data-draggable-marquee-list":"",class:"logo-draggable-marquee__list"},Ho={"aria-hidden":"true",class:"logo-draggable-marquee__list logo-draggable-marquee__list--clone"},Go={__name:"PageSectionLogoMarquee",props:{section:{type:Object,required:!0}},setup(r){Q.registerPlugin(he);const c=r,S=G(null),_=R(()=>(c.section?.logoMarqueeLogos||[]).filter(l=>l?.asset?.url)),v=[];let a=null;function f(){a?.disconnect(),a=null}function k(){const l=S.value;!l||l.getAttribute("data-draggable-marquee-init")==="initialized"||a||(a=new ResizeObserver(()=>{s(),S.value?.getAttribute("data-draggable-marquee-init")==="initialized"&&f()}),a.observe(l))}function T(){se(()=>{s(),k()})}function s(){const l=S.value;if(!l||l.getAttribute("data-draggable-marquee-init")==="initialized")return;const p=l.querySelector("[data-draggable-marquee-collection]"),$=p?.querySelectorAll(".logo-draggable-marquee__list"),g=$?.[0],n=$?.[1];if(!p||!g||!n||!_.value.length)return;const y=g.querySelector(".logo-draggable-marquee__item"),m=getComputedStyle(g),h=y?y.getBoundingClientRect().width:0,C=Number.parseFloat(m.columnGap||m.gap||"0"),z=Math.round(_.value.length*h+_.value.length*C),D=n.offsetLeft-g.offsetLeft,I=Math.round(g.scrollWidth||g.getBoundingClientRect().width),M=Math.round(z||D||I);if(!M)return;let E=0;const b=.04,w=Q.utils.wrap(-M,0),x=Q.quickTo(p,"x",{duration:.5,ease:"power3",modifiers:{x:q=>`${Math.round(w(Number.parseFloat(q)||0))}px`}});x(E);const F=he.create({target:p,type:"pointer,touch",preventDefault:!0,debounce:!1,onPress:()=>{l.setAttribute("data-dragging","true")},onDrag:q=>{E+=q.deltaX,x(E)},onRelease:()=>{l.setAttribute("data-dragging","false")},onStop:()=>{l.setAttribute("data-dragging","false")}});function d(q,A){E-=A*b,x(E)}Q.ticker.add(d),l.setAttribute("data-draggable-marquee-init","initialized"),v.push(()=>{F.kill(),Q.ticker.remove(d),Q.killTweensOf(p),l.setAttribute("data-draggable-marquee-init",""),l.setAttribute("data-dragging","false"),Q.set(p,{clearProps:"transform"})})}return oe(()=>{T()}),ne(()=>_.value.length,()=>{v.splice(0).forEach(l=>l()),f(),T()}),pe(()=>{f(),v.splice(0).forEach(l=>l())}),(l,p)=>{const $=te;return i(_).length>0?(e(),t("section",Bo,[c.section.logoMarqueeTitle||c.section.title?(e(),t("h2",Wo,j(c.section.logoMarqueeTitle||c.section.title),1)):u("",!0),o("div",{ref_key:"wrapperRef",ref:S,"data-draggable-marquee-init":"","data-direction":"left",class:"logo-draggable-marquee",onDragstart:p[0]||(p[0]=re(()=>{},["prevent"])),onSelectstart:p[1]||(p[1]=re(()=>{},["prevent"]))},[o("div",zo,[o("div",Vo,[(e(!0),t(B,null,U(i(_),(g,n)=>(e(),t("div",{key:`${g._key||n}-a`,class:"logo-draggable-marquee__item",draggable:"false"},[g.asset?.url?(e(),L($,{key:0,src:g.asset.url,alt:g.alt||"",fit:"contain",class:"logo-draggable-marquee__item-media",draggable:"false"},null,8,["src","alt"])):u("",!0)]))),128))]),o("div",Ho,[(e(!0),t(B,null,U(i(_),(g,n)=>(e(),t("div",{key:`${g._key||n}-b`,class:"logo-draggable-marquee__item",draggable:"false"},[g.asset?.url?(e(),L($,{key:0,src:g.asset.url,alt:g.alt||"",fit:"contain",class:"logo-draggable-marquee__item-media",draggable:"false"},null,8,["src","alt"])):u("",!0)]))),128))])])],544)])):u("",!0)}}},Uo=Y(Go,[["__scopeId","data-v-fd5a357d"]]),Xo={key:0,class:"clients-section grid gap-30"},Ko={class:"show-md"},Qo={key:0,class:"subtitle subtitle--circle orange-dot"},Yo={class:"rounded-medium pad-50 pad-md-50 grid gap-30",style:{"background-color":"var(--pink-tint-3)"}},Jo={class:"hide-md"},Zo={key:0,class:"subtitle small subtitle--circle white-dot"},qe=799,en={__name:"PageSectionClients",props:{section:{type:Object,required:!0}},setup(r){const c=r,S=R(()=>c.section?.clientsImages||[]),_=R(()=>{const g=[];for(let n=0;n<S.value.length;n+=3)g.push(S.value.slice(n,n+3));return g}),v=G(null),a=G(null),f=G(null);let k=()=>{},T=()=>{};async function s(){if(!v.value||window.innerWidth>qe||f.value||_.value.length<=1)return;const g=(await _e(async()=>{const{default:n}=await import("./G_YIQCB9.js").then(y=>y.i);return{default:n}},[],import.meta.url)).default;f.value=new g(v.value,{prevNextButtons:!1,pageDots:!0,wrapAround:!0,adaptiveHeight:!1,cellAlign:"center",contain:!0,draggable:!0})}function l(){f.value&&(f.value.destroy(),f.value=null)}function p(){if(window.innerWidth<=qe){T(),s();return}l(),$()}function $(){if(window.innerWidth<800||!a.value)return;T();const g=a.value.querySelectorAll(".clients-section__item");if(!g.length)return;Q.set(g,{autoAlpha:0,y:20});const n=Q.to(g,{autoAlpha:1,y:0,duration:.5,ease:"power2.out",stagger:.1,paused:!0});let y=null;y=new IntersectionObserver(m=>{m[0]?.isIntersecting&&(n.play(),y?.disconnect(),y=null)},{rootMargin:"0px 0px -35% 0px",threshold:.01}),y.observe(a.value),T=()=>{y?.disconnect(),n.kill(),Q.set(g,{clearProps:"opacity,visibility,transform"})}}return ne(()=>_.value.length,async()=>{await se(),l(),T(),s(),$()}),oe(async()=>{await se(),await s(),$(),window.addEventListener("resize",p),k=()=>window.removeEventListener("resize",p)}),ye(()=>{k(),l(),T()}),(g,n)=>{const y=te;return i(S).length?(e(),t("section",Xo,[o("div",Ko,[r.section.clientsTitle||r.section.title?(e(),t("h2",Qo,j(r.section.clientsTitle||r.section.title),1)):u("",!0)]),o("div",Yo,[o("div",Jo,[r.section.clientsTitle||r.section.title?(e(),t("h2",Zo,j(r.section.clientsTitle||r.section.title),1)):u("",!0)]),o("div",{ref_key:"gridRef",ref:a,class:"clients-section__grid pad-60 pad-top-bottom"},[(e(!0),t(B,null,U(i(S),(m,h)=>(e(),t("article",{key:m._key||`client-grid-${h}`,class:"clients-section__item"},[m.image?.asset?.url?(e(),L(y,{key:0,src:m.image.asset.url,alt:m.alt||"",width:m.image.asset.metadata?.dimensions?.width,height:m.image.asset.metadata?.dimensions?.height,class:"clients-section__image",loading:"lazy"},null,8,["src","alt","width","height"])):u("",!0)]))),128))],512),o("div",{ref_key:"carouselRef",ref:v,class:"clients-section__carousel"},[(e(!0),t(B,null,U(i(_),(m,h)=>(e(),t("div",{key:`client-slide-${h}`,class:"clients-section__slide"},[(e(!0),t(B,null,U(m,(C,z)=>(e(),t("article",{key:C._key||`client-slide-item-${h}-${z}`,class:"clients-section__item"},[C.image?.asset?.url?(e(),L(y,{key:0,src:C.image.asset.url,alt:C.alt||"",width:C.image.asset.metadata?.dimensions?.width,height:C.image.asset.metadata?.dimensions?.height,class:"clients-section__image",loading:"lazy"},null,8,["src","alt","width","height"])):u("",!0)]))),128))]))),128))],512)])])):u("",!0)}}},tn=Object.assign(Y(en,[["__scopeId","data-v-45225d1f"]]),{__name:"PageSectionClients"}),sn={class:"contact-section grid gap-30"},on={class:"contact-section__panel rounded-medium pad-50 pad-md-50"},nn={class:"contact-section__columns"},an={class:"contact-section__column contact-section__column--left"},rn={key:0,class:"contact-section__title fluid-type line-height-1",style:{"--desktop":"72","--mobile":"40"}},ln={key:1,class:"contact-information-list grid gap-50"},cn={class:"contact-information-link-wrap"},un=["href","target","rel"],dn={key:0,class:"contact-section__column contact-section__column--right"},_n={__name:"PageSectionContact",props:{section:{type:Object,required:!0}},setup(r){const c=r,S=R(()=>c.section.contactTitle||c.section.title||""),_=R(()=>c.section.contactInformation||[]),v=R(()=>c.section.contactDotColour||"var(--orange)"),a=R(()=>c.section.contactVideo?.asset?.url||""),f=R(()=>{const l=c.section.contactVideoAspectRatio;return l==="portrait"?"portrait":l==="landscape"?"landscape":""}),{contactLinkUsesNative:k,isExternalHttp:T,getContactLinkUrl:s}=Be();return(l,p)=>{const $=Te,g=Ve;return e(),t("section",sn,[o("div",on,[o("div",nn,[o("div",an,[i(S)?(e(),t("h2",rn,j(i(S)),1)):u("",!0),i(_).length?(e(),t("div",ln,[(e(!0),t(B,null,U(i(_),n=>(e(),t("div",{key:n._key,class:"contact-information-item gap-20"},[o("div",{class:"contact-information-item-title subtitle subtitle--circle",style:ae(i(v)?{"--subtitle-dot-color":i(v)}:void 0)},j(n.title),5),o("div",cn,[i(k)(i(s)(n))?(e(),t("a",{key:0,href:i(s)(n),target:i(T)(i(s)(n))?"_blank":void 0,rel:i(T)(i(s)(n))?"noopener":void 0,class:"contact-information-link fluid-type line-height-1",style:{"--desktop":"54","--mobile":"24"}},j(n.linkText),9,un)):(e(),L($,{key:1,to:i(s)(n),class:"contact-information-link fluid-type line-height-1",style:{"--desktop":"54","--mobile":"24"}},{default:de(()=>[we(j(n.linkText),1)]),_:2},1032,["to"]))])]))),128))])):u("",!0)]),r.section.contactVideoSubtitle||i(a)?(e(),t("div",dn,[o("div",{class:Z(["contact-section__video-group",i(f)])},[r.section.contactVideoSubtitle?(e(),t("p",{key:0,class:"contact-section__video-subtitle subtitle subtitle--circle",style:ae({"--subtitle-dot-color":i(v)})},j(r.section.contactVideoSubtitle),5)):u("",!0),o("div",{class:Z(["contact-section__video rounded-medium",[i(f),{"contact-section__video--placeholder":!i(a)}]])},[i(a)?(e(),L(g,{key:0,type:"html5",src:i(a),variant:"contact"},null,8,["src"])):u("",!0)],2)],2)])):u("",!0)])])])}}},pn=Y(_n,[["__scopeId","data-v-66fa2942"]]),gn={class:"spotify-player-section grid gap-30 pad-60 pad-top-bottom"},mn={key:0,class:"subtitle subtitle--circle red-dot"},fn={class:"spotify-player-wrapper rounded-medium"},hn=["src"],yn={key:1,class:"spotify-player-placeholder"},vn={__name:"PageSectionSpotifyPlayer",props:{section:{type:Object,required:!0}},setup(r){const c=r,S=R(()=>{const _=c.section?.spotifyEmbedUrl?.trim();if(!_)return"";const a=(_.match(/src=["']([^"']+)["']/i)?.[1]||_).trim();return a.startsWith("https://open.spotify.com/embed/")?a:""});return(_,v)=>(e(),t("section",gn,[r.section.spotifyTitle||r.section.title?(e(),t("h2",mn,j(r.section.spotifyTitle||r.section.title),1)):u("",!0),o("div",fn,[i(S)?(e(),t("iframe",{key:0,src:i(S),title:"Spotify player",loading:"lazy",allow:"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",class:"spotify-player-embed"},null,8,hn)):(e(),t("div",yn," Spotify player is ready. Add a Spotify embed URL or connect API data. "))])]))}},kn=Y(vn,[["__scopeId","data-v-b3498b5f"]]),bn={class:"page"},wn={key:0},Sn={key:1,class:"page-content"},$n={key:0,style:{padding:"var(--gutter)"}},Tn={key:2},Pn={__name:"[...slug]",setup(r){const c=We(),{setLoading:S}=Se(),_=R(()=>c.path==="/"?"home":c.params.slug?Array.isArray(c.params.slug)?c.params.slug.join("/"):c.params.slug:c.path.replace(/^\//,"")||null),{data:v,pending:a,error:f}=Ce(()=>`page-${c.path}`,async()=>{if(!_.value)return null;const s=`*[_type == "page" && slug.current == $slug][0] {
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
        }
      }
    }`;try{const p=(await $fetch("/api/sanity/query",{method:"POST",body:{query:s,params:{slug:_.value}}}))?.result;return p&&p._id?p:null}catch(l){throw l}},{watch:[_]}),k=R(()=>v.value?.sections||[]),T=R(()=>v.value?.portfolioProjects||[]);return ze(()=>{const s=v.value?.devBackgroundImage?.asset?.url;return s?{bodyAttrs:{"data-page-dev-bg":"true",style:[`background-image:url("${s}")`,"background-size: 100%","background-position: left top","background-repeat:no-repeat"].join(";")}}:{bodyAttrs:{"data-page-dev-bg":void 0,style:void 0}}}),ne(a,s=>{S(s)},{immediate:!0}),(s,l)=>{const p=it,$=yt,g=Et,n=Ft,y=Vt,m=ns,h=Me,C=Ns,z=Qs,D=so,I=ko,M=Co,E=Fo,b=Uo,w=tn,x=pn,F=kn;return e(),t("div",bn,[i(f)?(e(),t("div",wn,[o("p",null,"Error loading page: "+j(i(f).message),1)])):i(v)?(e(),t("div",Sn,[i(k).length===0?(e(),t("div",$n,[...l[0]||(l[0]=[o("p",null,"No sections found for this page. Add sections in Sanity.",-1)])])):u("",!0),(e(!0),t(B,null,U(i(k),d=>(e(),t("div",{key:d._id,class:"page-section"},[d.sectionType==="featuredProjects"?(e(),L(p,{key:0,section:d},null,8,["section"])):d.sectionType==="heroCarousel"?(e(),L($,{key:1,section:d},null,8,["section"])):d.sectionType==="info"?(e(),L(g,{key:2,section:d},null,8,["section"])):d.sectionType==="services"?(e(),L(n,{key:3,section:d},null,8,["section"])):d.sectionType==="text"?(e(),L(y,{key:4,section:d},null,8,["section"])):d.sectionType==="kineticTypography"?(e(),L(m,{key:5,section:d},null,8,["section"])):d.sectionType==="cards"?(e(),L(h,{key:6,section:d},null,8,["section"])):d.sectionType==="stackingCards"?(e(),L(C,{key:7,section:d},null,8,["section"])):d.sectionType==="autoscrollGallery"?(e(),L(z,{key:8,section:d},null,8,["section"])):d.sectionType==="news"||d.sectionType==="pressAwards"?(e(),L(D,{key:9,section:d},null,8,["section"])):d.sectionType==="work"||d.sectionType==="portfolio"?(e(),L(I,{key:10,section:d,projects:i(T)},null,8,["section","projects"])):d.sectionType==="team"?(e(),L(M,{key:11,section:d},null,8,["section"])):d.sectionType==="logoWall"?(e(),L(E,{key:12,section:d},null,8,["section"])):d.sectionType==="logoMarquee"?(e(),L(b,{key:13,section:d},null,8,["section"])):d.sectionType==="clients"?(e(),L(w,{key:14,section:d},null,8,["section"])):d.sectionType==="contact"?(e(),L(x,{key:15,section:d},null,8,["section"])):d.sectionType==="spotifyPlayer"?(e(),L(F,{key:16,section:d},null,8,["section"])):u("",!0)]))),128))])):(e(),t("div",Tn,[...l[1]||(l[1]=[o("p",null,"Page not found",-1)])]))])}}},qn=Y(Pn,[["__scopeId","data-v-34eb9cef"]]);export{qn as default};
