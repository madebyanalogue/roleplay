const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ww16NeOw.js","./entry.Dg1M9R2e.css"])))=>i.map(i=>d[i]);
import{_ as B,c as s,o as e,F as T,r as C,n as X,f as x,g as _,w as ae,a as n,h as K,t as L,e as ye,i as N,j as Q,k as H,l as ue,b as ne,m as te,p as le,d as _e,q as S,s as A,v as se,x as re,y as ie,z as q,S as ee,O as ge,A as ve,B as oe,C as me,D as we,E as de,G as pe,H as ke,I as be,u as $e}from"./ww16NeOw.js";const Se={class:"featured-projects"},xe={class:"featured-project-image-container"},qe={class:"featured-project-image-wrapper"},Ie={class:"featured-project-title"},Pe={__name:"PageSectionFeaturedProjects",props:{section:{type:Object,required:!0}},setup(g){return(w,$)=>{const k=K,p=ye;return e(),s("div",Se,[(e(!0),s(T,null,C(g.section.featuredProjects,o=>(e(),s("div",{key:o.project?._id||o._key,class:X(["featured-project",`format-${o.format||"landscape"}`])},[o.project?.slug?.current?(e(),x(p,{key:0,to:`/portfolio/${o.project.slug.current}`,class:"featured-project-link"},{default:ae(()=>[n("div",xe,[n("div",qe,[o.project?.featuredImage?.asset?(e(),x(k,{key:0,src:o.project.featuredImage.asset.url||"",alt:"",class:X(["featured-project-image",o.project.featuredImageMobile?.asset?"is-desktop-archive-img":""]),width:"3200",height:o.project.featuredImage.asset.metadata?.dimensions?.height},null,8,["src","class","height"])):_("",!0),o.project?.featuredImageMobile?.asset?(e(),x(k,{key:1,src:o.project.featuredImageMobile.asset.url||"",alt:"",class:"featured-project-image is-mobile-archive-img",width:"3200",height:o.project.featuredImageMobile.asset.metadata?.dimensions?.height},null,8,["src","height"])):_("",!0)])]),n("h3",Ie,[n("span",null,L(o.project.title),1)])]),_:2},1032,["to"])):_("",!0)],2))),128))])}}},Te=B(Pe,[["__scopeId","data-v-7582c54b"]]),Le={class:"info-section"},Ae={key:0,class:"info-section-image"},Ce={class:"info-section-content"},Re={key:0,class:"info-block-title"},Me={key:0,class:"info-block-title"},Oe={key:2,class:"info-links-list"},Ee={key:0,class:"info-link-subtitle"},Ne=["href","target","rel"],je={class:"info-link-title"},Be={key:3,class:"info-services-block"},De={key:0,class:"info-block-title"},Fe={class:"info-services-content"},We={key:4,class:"info-news-block"},ze={key:0,class:"info-block-title"},Ge={key:1,class:"info-news-list"},Ve={__name:"PageSectionInfo",props:{section:{type:Object,required:!0}},setup(g){const w=o=>{if(o?.metadata?.dimensions){const{width:f,height:b,aspectRatio:v}=o.metadata.dimensions;if(v)return{aspectRatio:`${v}`};if(f&&b)return{aspectRatio:`${f/b}`}}return{aspectRatio:"4 / 3"}};N(null);const $=o=>{o?.target&&o.target.classList.add("loaded")};Q(()=>{H(()=>{const o=document.querySelector(".info-image");o&&o.complete&&o.naturalHeight>0&&o.classList.add("loaded")})});const{data:k}=ue("news-items",async()=>{const o=`*[_type in ["news", "pressAward"]] | order(orderRank) {
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
  }`;try{return(await $fetch("/api/sanity/query",{method:"POST",body:{query:o}}))?.result||[]}catch(f){return console.error("[News] Error fetching:",f),[]}},{server:!0}),p=(o,f)=>!o||o.startsWith("mailto:")||o.startsWith("tel:")?!1:!!(f||o.startsWith("http://")||o.startsWith("https://")||o.startsWith("//"));return(o,f)=>{const b=K,v=le;return e(),s("div",Le,[g.section.infoImage?.asset?(e(),s("div",Ae,[n("div",{class:"info-image-container",style:te(w(g.section.infoImage.asset))},[ne(b,{src:g.section.infoImage.asset.url||"",width:g.section.infoImage.asset.metadata?.dimensions?.width,height:g.section.infoImage.asset.metadata?.dimensions?.height,alt:"",class:"info-image",onLoad:$},null,8,["src","width","height"])],4)])):_("",!0),n("div",Ce,[(e(!0),s(T,null,C(g.section.infoContent,(i,c)=>(e(),s("div",{key:i._key||c,class:X(["info-block",[i._type==="infoImageBlock"&&i.showOnDesktop===!1?"info-block-hide-desktop":"",i._type==="infoImageBlock"&&i.showOnMobile===!1?"info-block-hide-mobile":""]])},[i._type==="infoImageBlock"&&i.image?.asset?(e(),s("div",{key:0,class:X(["info-image-block",[i._type==="infoImageBlock"&&i.spanTwoColumns?"info-image-block-span-2":""]])},[ne(b,{src:i.image.asset.url||"",alt:"",class:"info-image-inline"},null,8,["src"])],2)):i._type==="infoTextBlock"?(e(),s("div",{key:1,class:X(["info-text-block",{"info-text-block-large":i.largeText}])},[i.title?(e(),s("h2",Re,L(i.title),1)):_("",!0),i.text?(e(),x(v,{key:1,blocks:i.text},null,8,["blocks"])):_("",!0)],2)):i._type==="infoLinksBlock"?(e(),s("div",{key:2,class:X(["info-links-block",{"info-links-block-large":i.largeText}])},[i.title?(e(),s("h2",Me,L(i.title),1)):_("",!0),i.text?(e(),x(v,{key:1,blocks:i.text},null,8,["blocks"])):_("",!0),i.links&&i.links.length>0?(e(),s("div",Oe,[(e(!0),s(T,null,C(i.links,(r,h)=>(e(),s("div",{key:h,class:"info-link-item"},[r.subtitle?(e(),s("span",Ee,L(r.subtitle),1)):_("",!0),n("a",{href:r.link,target:p(r.link,r.openInNewTab)?"_blank":void 0,rel:p(r.link,r.openInNewTab)?"noopener":void 0,class:"info-link"},[n("span",je,[_e(L(r.linkTitle||r.link)+" ",1),f[0]||(f[0]=n("span",{class:"info-link-arrow"},[_e("   "),n("svg",{id:"a","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 18 18"},[n("polygon",{points:"16.5 0 7 0 7 1.5 15.44 1.5 .05 16.89 1.11 17.95 16.5 2.56 16.5 11 18 11 18 1.5 18 0 16.5 0"})])],-1))])],8,Ne)]))),128))])):_("",!0)],2)):i._type==="infoServicesBlock"?(e(),s("div",Be,[i.title?(e(),s("h2",De,L(i.title),1)):_("",!0),n("div",Fe,[ne(v,{blocks:i.content},null,8,["blocks"])])])):i._type==="infoNewsBlock"||i._type==="infoPressAwardsBlock"?(e(),s("div",We,[i.title?(e(),s("h2",ze,L(i.title),1)):_("",!0),S(k)&&S(k).length>0?(e(),s("div",Ge,[(e(!0),s(T,null,C(S(k),(r,h)=>(e(),s("div",{key:r._id||h,class:"info-news-item"},[r.featuredImage?.asset?.url?(e(),x(b,{key:0,src:r.featuredImage.asset.url,width:r.featuredImage.asset.metadata?.dimensions?.width,height:r.featuredImage.asset.metadata?.dimensions?.height,alt:"",class:"info-news-image"},null,8,["src","width","height"])):_("",!0),r.content?(e(),x(v,{key:1,blocks:r.content,class:"info-news-content"},null,8,["blocks"])):_("",!0)]))),128))])):_("",!0)])):_("",!0)],2))),128))])])}}},Xe=Object.assign(B(Ve,[["__scopeId","data-v-e3075b2d"]]),{__name:"PageSectionInfo"}),He={class:"services-section grid gap-30"},Ue={class:"show-md"},Ye={key:0,class:"subtitle subtitle--square twisted orange-dot"},Ke={class:"rounded-medium beige pad-50 pad-md-50 grid gap-30"},Ze={class:"hide-md"},Qe={key:0,class:"subtitle small subtitle--square twisted white-dot"},Je={class:"services-section__desktop-grid fluid-type pad-70 pad-top-bottom",style:{"--desktop":"54","--mobile":"28"}},fe=999,et={__name:"PageSectionServices",props:{section:{type:Object,required:!0}},setup(g){const w=g,$=N(null),k=N(null);let p=()=>{};const o=A(()=>(w.section?.servicesTextarea||"").split(/\r?\n/).map(c=>c.trim()).filter(Boolean)),f=A(()=>{const c=[];for(let r=0;r<o.value.length;r+=7)c.push(o.value.slice(r,r+7));return c});async function b(){if(!$.value||window.innerWidth>fe||k.value||f.value.length<=1)return;const c=(await ie(async()=>{const{default:r}=await import("./G_YIQCB9.js").then(h=>h.i);return{default:r}},[],import.meta.url)).default;k.value=new c($.value,{prevNextButtons:!1,pageDots:!0,wrapAround:!0,adaptiveHeight:!1,cellAlign:"left",contain:!0,draggable:!0})}function v(){k.value&&(k.value.destroy(),k.value=null)}function i(){if(window.innerWidth<=fe){b();return}v()}return se(()=>f.value.length,async()=>{await H(),v(),b()}),Q(async()=>{await H(),await b(),window.addEventListener("resize",i),p=()=>window.removeEventListener("resize",i)}),re(()=>{p(),v()}),(c,r)=>(e(),s("section",He,[n("div",Ue,[g.section.servicesTitle||g.section.title?(e(),s("h2",Ye,L(g.section.servicesTitle||g.section.title),1)):_("",!0)]),n("div",Ke,[n("div",Ze,[g.section.servicesTitle||g.section.title?(e(),s("h2",Qe,L(g.section.servicesTitle||g.section.title),1)):_("",!0)]),n("div",Je,[(e(!0),s(T,null,C(S(o),(h,d)=>(e(),s("div",{key:`service-desktop-${d}`,class:"services-section__item"},L(h),1))),128))]),n("div",{ref_key:"carouselRef",ref:$,class:"services-section__mobile-carousel fluid-type",style:{"--desktop":"54","--mobile":"28"}},[(e(!0),s(T,null,C(S(f),(h,d)=>(e(),s("div",{key:`service-group-${d}`,class:"services-section__slide"},[(e(!0),s(T,null,C(h,(t,l)=>(e(),s("div",{key:`service-mobile-${d}-${l}`,class:"services-section__item"},L(t),1))),128))]))),128))],512)])]))}},tt=Object.assign(B(et,[["__scopeId","data-v-d5b35a20"]]),{__name:"PageSectionServices"}),st={class:"text-section underline-links pad-top-bottom"},ot={class:"text-section__inner fluid-type pad-md-20",style:{"--desktop":"73","--mobile":"24"}},nt={__name:"PageSectionText",props:{section:{type:Object,required:!0}},setup(g){return(w,$)=>{const k=le;return e(),s("div",st,[n("div",ot,[g.section.textContent?.length?(e(),x(k,{key:0,blocks:g.section.textContent},null,8,["blocks"])):_("",!0)])])}}},at=B(nt,[["__scopeId","data-v-7d204ceb"]]),it={key:0,class:"cards-section cards-section--grid-mode"},lt={class:"cards-section__grid"},rt={class:"cards-section__text"},ct={key:0,class:"cards-section__title"},ut={class:"cards-section__media"},dt={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"cards-section__video"},_t=["src","type"],gt=["inert"],mt={class:"cards-section__sticky-col cards-section__sticky-col--text"},pt={class:"cards-section__sticky-copy"},ft={key:0,class:"cards-section__sticky-eyebrow underline-links"},ht={key:1,class:"cards-section__sticky-title"},yt={class:"cards-section__sticky-col cards-section__sticky-col--media rounded-medium"},vt={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"cards-section__sticky-media-el"},wt=["src","type"],kt=["inert"],bt={class:"cards-section__grid"},$t={class:"cards-section__text"},St={key:0,class:"cards-section__title"},xt={class:"cards-section__media"},qt={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"cards-section__video"},It=["src","type"],ce="(min-width: 1000px)",Pt={__name:"PageSectionCards",props:{section:{type:Object,required:!0}},setup(g){q.registerPlugin(ee);const w=g,$=A(()=>w.section?.cardsDisableScrollDemo===!0),k=N(null),p=N(!1),o=N(!1),f=A(()=>(w.section?.cards||[]).length),b=A(()=>f.value+4);let v=()=>{};function i(t){if(!t||typeof t!="string")return"video/mp4";const l=t.toLowerCase();return l.endsWith(".webm")?"video/webm":l.endsWith(".ogg")||l.endsWith(".ogv")?"video/ogg":"video/mp4"}function c(){v();const t=k.value;if(!t||$.value||typeof window<"u"&&!window.matchMedia(ce).matches)return;const l=t.querySelectorAll(".cards-section__sticky-card"),u=l.length;if(!u)return;const m=5,a=.075;l.forEach((y,R)=>{q.set(y,{xPercent:-50,yPercent:-50+R*m,scale:1-R*a})});const P=Math.max(2.25,u*1.05),G=u>1?((u-1)/u)**2:1,D=ee.create({trigger:t,start:"top top",end:()=>`+=${window.innerHeight*P*G}`,pin:!0,pinSpacing:!0,scrub:1,invalidateOnRefresh:!0,onUpdate:y=>{const R=y.progress,V=1/u,E=Math.min(Math.floor(R/V),u-1),F=(R-E*V)/V;l.forEach((j,W)=>{if(W<E)q.set(j,{xPercent:-50,yPercent:-250,rotationX:35});else if(W===E)W===u-1||u===1?q.set(j,{xPercent:-50,yPercent:-50,rotationX:0,scale:1}):q.set(j,{xPercent:-50,yPercent:q.utils.interpolate(-50,-200,F),rotationX:q.utils.interpolate(0,35,F),scale:1});else{const M=W-E,z=(M-F)*m,O=1-(M-F)*a;q.set(j,{xPercent:-50,yPercent:-50+z,rotationX:0,scale:O})}})}});function I(){ee.refresh()}window.addEventListener("resize",I),v=()=>{window.removeEventListener("resize",I),D.kill(),q.killTweensOf(l)}}function r(){if($.value){v();return}if(typeof window>"u")return;const t=window.matchMedia(ce);p.value=t.matches,o.value=!0,t.matches?H(()=>c()):(v(),ee.refresh())}let h,d;return se(()=>`${$.value}:${(w.section?.cards||[]).map(t=>[t._key,t.mediaType,t.title,t.image?.asset?.url,t.video?.asset?.url].filter(Boolean).join(":")).join("|")}`,async()=>{await H(),r()}),Q(async()=>{await H(),!(typeof window>"u")&&(h=window.matchMedia(ce),p.value=h.matches,o.value=!0,d=()=>r(),h.addEventListener("change",d),r())}),re(()=>{h&&d&&h.removeEventListener("change",d),v()}),(t,l)=>{const u=le,m=K;return S($)?(e(),s("section",it,[(e(!0),s(T,null,C(g.section.cards||[],(a,P)=>(e(),s("article",{key:a._key||P,class:"cards-section__item"},[n("div",lt,[n("div",rt,[a.title?(e(),s("h3",ct,L(a.title),1)):_("",!0),a.description?.length?(e(),x(u,{key:1,blocks:a.description},null,8,["blocks"])):_("",!0)]),n("div",ut,[a.mediaType==="video"&&a.video?.asset?.url?(e(),s("video",dt,[n("source",{src:a.video.asset.url,type:i(a.video.asset.url)},null,8,_t)])):a.image?.asset?.url?(e(),x(m,{key:1,src:a.image.asset.url,alt:a.title||"",width:a.image.asset.metadata?.dimensions?.width,height:a.image.asset.metadata?.dimensions?.height,class:"cards-section__image"},null,8,["src","alt","width","height"])):_("",!0)])])]))),128))])):(e(),s(T,{key:1},[n("section",{ref_key:"stickySectionRef",ref:k,class:"cards-section cards-section--sticky-cards show-md",inert:S(o)&&!S(p)},[(e(!0),s(T,null,C(g.section.cards||[],(a,P)=>(e(),s("div",{key:a._key||P,class:X(["cards-section__sticky-card",`cards-section__sticky-card--tone-${P%5+1}`]),style:te({zIndex:S(b)-P})},[n("div",mt,[n("div",pt,[a.description?.length?(e(),s("div",ft,[ne(u,{blocks:a.description},null,8,["blocks"])])):_("",!0),a.title?(e(),s("h2",ht,L(a.title),1)):_("",!0)])]),n("div",yt,[a.mediaType==="video"&&a.video?.asset?.url?(e(),s("video",vt,[n("source",{src:a.video.asset.url,type:i(a.video.asset.url)},null,8,wt)])):a.image?.asset?.url?(e(),x(m,{key:1,src:a.image.asset.url,alt:a.title||"",width:a.image.asset.metadata?.dimensions?.width,height:a.image.asset.metadata?.dimensions?.height,class:"cards-section__sticky-media-el"},null,8,["src","alt","width","height"])):_("",!0)])],6))),128))],8,gt),n("section",{class:"cards-section cards-section--grid-mode hide-md",inert:S(o)&&S(p)},[(e(!0),s(T,null,C(g.section.cards||[],(a,P)=>(e(),s("article",{key:`m-${a._key||P}`,class:"cards-section__item"},[n("div",bt,[n("div",$t,[a.title?(e(),s("h3",St,L(a.title),1)):_("",!0),a.description?.length?(e(),x(u,{key:1,blocks:a.description},null,8,["blocks"])):_("",!0)]),n("div",xt,[a.mediaType==="video"&&a.video?.asset?.url?(e(),s("video",qt,[n("source",{src:a.video.asset.url,type:i(a.video.asset.url)},null,8,It)])):a.image?.asset?.url?(e(),x(m,{key:1,src:a.image.asset.url,alt:a.title||"",width:a.image.asset.metadata?.dimensions?.width,height:a.image.asset.metadata?.dimensions?.height,class:"cards-section__image"},null,8,["src","alt","width","height"])):_("",!0)])])]))),128))],8,kt)],64))}}},Tt=B(Pt,[["__scopeId","data-v-3dab3103"]]),Lt={class:"autoscroll-gallery-section rounded-medium"},At=["data-direction"],Ct={"data-draggable-marquee-collection":"",class:"draggable-marquee__collection"},Rt={"data-draggable-marquee-list":"",class:"draggable-marquee__list"},Mt={key:0,class:"draggable-marquee__item-media",draggable:"false",autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},Ot=["src"],Et={"aria-hidden":"true",class:"draggable-marquee__list draggable-marquee__list--clone"},Nt={key:0,class:"draggable-marquee__item-media",draggable:"false",autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata"},jt=["src"],Bt={__name:"PageSectionAutoscrollGallery",props:{section:{type:Object,required:!0}},setup(g){q.registerPlugin(ge,ee);const w=g,$=N(null);function k(t){const u=(t||"3/5").trim().split("/").map(m=>m.trim()).filter(Boolean);if(u.length===2){const m=Number.parseFloat(u[0]),a=Number.parseFloat(u[1]);if(m>0&&a>0&&Number.isFinite(m)&&Number.isFinite(a))return`${m} / ${a}`}return"3 / 5"}const p=A(()=>({"--autoscroll-gallery-aspect-ratio":k(w.section?.autoscrollGalleryAspectRatio)})),o=A(()=>{const t=Number.parseFloat(String(w.section?.autoscrollGallerySpeed??60));return Number.isFinite(t)&&t>0?t:60}),f=A(()=>(w.section?.autoscrollGalleryDirection||"left").toLowerCase()==="right"?"right":"left"),b=A(()=>(w.section?.autoscrollGalleryItems||[]).filter(t=>t?t.mediaType==="video"?!!t.video?.asset?.url:!!t.image?.asset?.url:!1)),v=[];let i=null;function c(){i?.disconnect(),i=null}function r(){const t=$.value;!t||t.getAttribute("data-draggable-marquee-init")==="initialized"||i||(i=new ResizeObserver(()=>{d(),$.value?.getAttribute("data-draggable-marquee-init")==="initialized"&&c()}),i.observe(t))}function h(){H(()=>{d(),r()})}function d(){const t=$.value;if(!t||t.getAttribute("data-draggable-marquee-init")==="initialized")return;const u=t.querySelector("[data-draggable-marquee-collection]"),m=u.querySelectorAll(".draggable-marquee__list"),a=m[0],P=m[1];if(!u||!a||!P||!b.value.length)return;const G=a.querySelector(".draggable-marquee__item"),D=getComputedStyle(a),I=G?G.getBoundingClientRect().width:0,y=Number.parseFloat(D.columnGap||D.gap||"0"),R=Math.round(b.value.length*I+b.value.length*y),V=P.offsetLeft-a.offsetLeft,E=Math.round(a.scrollWidth||a.getBoundingClientRect().width),F=Math.round(R||V||E);if(!F)return;let j=0;const W=f.value==="right"?1:-1,M=Math.max(.01,o.value/1e3),z=q.utils.wrap(-F,0),O=q.quickTo(u,"x",{duration:.5,ease:"power3",modifiers:{x:Y=>{const Z=z(Number.parseFloat(Y)||0);return`${Math.round(Z)}px`}}});O(j);const U=ge.create({target:u,type:"pointer,touch",preventDefault:!0,debounce:!1,onPress:()=>{t.setAttribute("data-dragging","true")},onDrag:Y=>{j+=Y.deltaX,O(j)},onRelease:()=>{t.setAttribute("data-dragging","false")},onStop:()=>{t.setAttribute("data-dragging","false")}});function J(Y,Z){j+=W*(Z*M),O(j)}q.ticker.add(J),t.setAttribute("data-draggable-marquee-init","initialized"),v.push(()=>{U.kill(),q.ticker.remove(J),q.killTweensOf(u),t.setAttribute("data-draggable-marquee-init",""),t.setAttribute("data-dragging","false"),q.set(u,{clearProps:"transform"})})}return Q(()=>{h()}),se(()=>[w.section?.autoscrollGalleryAspectRatio,w.section?.autoscrollGallerySpeed,w.section?.autoscrollGalleryDirection,b.value.length],()=>{v.splice(0).forEach(t=>t()),c(),h()}),ve(()=>{c(),v.splice(0).forEach(t=>t())}),(t,l)=>{const u=K;return e(),s("section",Lt,[n("div",{ref_key:"wrapperRef",ref:$,"data-draggable-marquee-init":"","data-direction":S(f),class:"draggable-marquee",style:te(S(p)),onDragstart:l[2]||(l[2]=oe(()=>{},["prevent"])),onSelectstart:l[3]||(l[3]=oe(()=>{},["prevent"]))},[n("div",Ct,[n("div",Rt,[(e(!0),s(T,null,C(S(b),(m,a)=>(e(),x(me(m.link?"a":"div"),{key:`${m._key||a}-a`,class:"draggable-marquee__item",draggable:"false",href:m.link||void 0,target:m.link?"_blank":void 0,rel:m.link?"noopener noreferrer":void 0,onDragstart:l[0]||(l[0]=oe(()=>{},["prevent"]))},{default:ae(()=>[m.mediaType==="video"&&m.video?.asset?.url?(e(),s("video",Mt,[n("source",{src:m.video.asset.url,type:"video/mp4"},null,8,Ot)])):m.image?.asset?.url?(e(),x(u,{key:1,src:m.image.asset.url,alt:"",fit:"cover",class:"draggable-marquee__item-media",draggable:"false"},null,8,["src"])):_("",!0)]),_:2},1064,["href","target","rel"]))),128))]),n("div",Et,[(e(!0),s(T,null,C(S(b),(m,a)=>(e(),x(me(m.link?"a":"div"),{key:`${m._key||a}-b`,class:"draggable-marquee__item",draggable:"false",href:m.link||void 0,target:m.link?"_blank":void 0,rel:m.link?"noopener noreferrer":void 0,onDragstart:l[1]||(l[1]=oe(()=>{},["prevent"]))},{default:ae(()=>[m.mediaType==="video"&&m.video?.asset?.url?(e(),s("video",Nt,[n("source",{src:m.video.asset.url,type:"video/mp4"},null,8,jt)])):m.image?.asset?.url?(e(),x(u,{key:1,src:m.image.asset.url,alt:"",fit:"cover",class:"draggable-marquee__item-media",draggable:"false"},null,8,["src"])):_("",!0)]),_:2},1064,["href","target","rel"]))),128))])])],44,At)])}}},Dt=B(Bt,[["__scopeId","data-v-33d6411d"]]),Ft={class:"news-section"},Wt={__name:"PageSectionNews",setup(g){const{data:w}=ue("news-items",async()=>{const $=`*[_type in ["news", "pressAward"]] | order(orderRank) {
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
  }`;try{return(await $fetch("/api/sanity/query",{method:"POST",body:{query:$}}))?.result||[]}catch(k){return console.error("[News] Error fetching:",k),[]}},{server:!0});return($,k)=>{const p=K,o=le;return e(),s("div",Ft,[(e(!0),s(T,null,C(S(w),(f,b)=>(e(),s("div",{key:f._id||b,class:"news-item"},[f.featuredImage?.asset?.url?(e(),x(p,{key:0,src:f.featuredImage.asset.url,width:f.featuredImage.asset.metadata?.dimensions?.width,height:f.featuredImage.asset.metadata?.dimensions?.height,alt:"",class:"news-image"},null,8,["src","width","height"])):_("",!0),f.content?(e(),x(o,{key:1,blocks:f.content,class:"news-content"},null,8,["blocks"])):_("",!0)]))),128))])}}},zt=Object.assign(B(Wt,[["__scopeId","data-v-1bd25f93"]]),{__name:"PageSectionNews"}),Gt={key:0,class:"portfolio-stats__row gap-20"},Vt={key:0,class:"portfolio-stats__dd"},Xt={class:"portfolio-stats__lozenge white orange-text rounded-small fluid-type mono",style:{"--desktop":"24"}},Ht={key:0,class:"portfolio-stats__arrow",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},Ut={class:"portfolio-stats__value-text"},Yt={key:1,class:"fluid-type portfolio-stats__label",style:{"--desktop":"28"}},Kt={__name:"PortfolioStats",props:{stats:{type:Array,default:()=>[]},rootClass:{type:String,default:""}},setup(g){const w=g,$=A(()=>(w.stats||[]).some(k=>k?.label||k?.value));return(k,p)=>S($)?(e(),s("div",{key:0,class:X(["portfolio-stats",g.rootClass])},[(e(!0),s(T,null,C(g.stats,(o,f)=>(e(),s(T,{key:o._key||f},[o.label||o.value?(e(),s("div",Gt,[o.value?(e(),s("div",Vt,[n("span",Xt,[o.icon==="arrowUp"?(e(),s("svg",Ht,[...p[0]||(p[0]=[n("path",{d:"M0 8.98305L1.52649 10.5663L7.57831 4.30064V17.9661H9.74354V4.30064L15.7845 10.5775L17.3218 8.98305L8.66092 0L0 8.98305Z",fill:"currentColor"},null,-1)])])):_("",!0),n("span",Ut,L(o.value),1)])])):_("",!0),o.label?(e(),s("div",Yt,L(o.label),1)):_("",!0)])):_("",!0)],64))),128))],2)):_("",!0)}},Zt=B(Kt,[["__scopeId","data-v-f900a4f9"]]),Qt={class:"portfolio-item-media rounded-medium"},Jt={class:"portfolio-item-overlay pad-40"},es={class:"portfolio-item-overlay-inner gap-40"},ts={class:"portfolio-item-overlay-title fluid-type",style:{"--desktop":"72"}},ss={class:"portfolio-item-overlay-content gap-50"},os={key:0,class:"portfolio-item-overlay-desc fluid-type",style:{"--desktop":"36"}},ns={class:"portfolio-item-title"},as={__name:"PageSectionPortfolio",props:{section:{type:Object,required:!0},projects:{type:Array,default:()=>[]}},setup(g){const w=g,$=[4,8,7,5,5,7];function k(c){const h=(c||"3/5").trim().split("/").map(d=>d.trim()).filter(Boolean);if(h.length===2){const d=Number.parseFloat(h[0]),t=Number.parseFloat(h[1]);if(d>0&&t>0&&Number.isFinite(d)&&Number.isFinite(t))return`${d} / ${t}`}return"3 / 5"}const p=A(()=>w.projects||[]),o=A(()=>p.value.length),f=A(()=>({"--portfolio-aspect-ratio":k(w.section?.thumbnailAspectRatio)}));function b(c,r){if(r<=0)return 12;const h=r-1;return c===h&&r%2===1?12:$[c%$.length]}function v(c,r){return c===r-1&&r%2===1}function i(c,r){return{gridColumn:`span ${b(c,r)}`}}return(c,r)=>{const h=K,d=Zt,t=ye;return e(),s("div",{class:"portfolio-section",style:te(S(f))},[(e(!0),s(T,null,C(S(p),(l,u)=>(e(),s("div",{key:l._id,class:X(["portfolio-item",{"portfolio-item--orphan":v(u,S(o))}]),style:te(i(u,S(o)))},[l.slug?.current?(e(),x(t,{key:0,to:`/portfolio/${l.slug.current}`,class:"portfolio-item-link"},{default:ae(()=>[n("div",Qt,[l.featuredImage?.asset?(e(),x(h,{key:0,src:l.featuredImage.asset.url||"",alt:"",fit:"cover",class:X(["portfolio-item-image rounded-medium",l.featuredImageMobile?.asset?"is-desktop-archive-img":""])},null,8,["src","class"])):_("",!0),l.featuredImageMobile?.asset?(e(),x(h,{key:1,src:l.featuredImageMobile.asset.url||"",alt:"",fit:"cover",class:"portfolio-item-image rounded-medium is-mobile-archive-img"},null,8,["src"])):_("",!0),n("div",Jt,[r[0]||(r[0]=n("div",{class:"portfolio-item-overlay-bg","aria-hidden":"true"},null,-1)),n("div",es,[n("h3",ts,L(l.title),1),n("div",ss,[l.thumbnailDescription?(e(),s("div",os,L(l.thumbnailDescription),1)):_("",!0),l.thumbnailStats?.length?(e(),x(d,{key:1,stats:l.thumbnailStats,"root-class":"portfolio-item-overlay-stats gap-20"},null,8,["stats"])):_("",!0)])])])]),n("h3",ns,L(l.title),1)]),_:2},1032,["to"])):_("",!0)],6))),128))],4)}}},is=B(as,[["__scopeId","data-v-88d5ee03"]]),ls={"data-follower-collection":"",class:"preview-collection"},rs={class:"preview-list"},cs={class:"preview-item__inner"},us={class:"preview-item__row"},ds={class:"preview-item__col is--large"},_s={class:"preview-item__heading"},gs={class:"preview-item__col is--medium"},ms={class:"preview-item__text"},ps={"data-follower-visual":"",class:"preview-item__visual"},fs={__name:"PageSectionTeam",props:{section:{type:Object,required:!0}},setup(g){const w=g,$=N(null),{getImageSrc:k}=de(),p=A(()=>w.section?.teamMembers||[]);let o=null;function f(b){const v=b?.querySelector("[data-follower-collection]"),i=b?.querySelectorAll("[data-follower-item]")||[],c=b?.querySelector("[data-follower-cursor]"),r=b?.querySelector("[data-follower-cursor-inner]");if(!v||!i.length||!c||!r)return()=>{};let h=null,d=!0;const t=100,l=.5,u="power2.inOut";q.set(c,{xPercent:-50,yPercent:-50});const m=q.quickTo(c,"x",{duration:.6,ease:"power3"}),a=q.quickTo(c,"y",{duration:.6,ease:"power3"}),P=I=>{m(I.clientX),a(I.clientY)};window.addEventListener("mousemove",P);const G=[];i.forEach((I,y)=>{const R=()=>{const E=h===null||y>h;h=y,c.querySelectorAll("[data-follower-visual]").forEach(W=>{q.killTweensOf(W),q.to(W,{yPercent:E?-t:t,duration:l,ease:u,overwrite:"auto",onComplete:()=>W.remove()})});const F=I.querySelector("[data-follower-visual]");if(!F)return;const j=F.cloneNode(!0);r.appendChild(j),d?d=!1:q.fromTo(j,{yPercent:E?t:-t},{yPercent:0,duration:l,ease:u,overwrite:"auto"})},V=()=>{const E=c.querySelector("[data-follower-visual]");E&&(q.killTweensOf(E),q.to(E,{yPercent:-t,duration:l,ease:u,overwrite:"auto",onComplete:()=>E.remove()}))};I.addEventListener("mouseenter",R),I.addEventListener("mouseleave",V),G.push(()=>{I.removeEventListener("mouseenter",R),I.removeEventListener("mouseleave",V)})});const D=()=>{c.querySelectorAll("[data-follower-visual]").forEach(I=>{q.killTweensOf(I),q.delayedCall(l,()=>I.remove())}),d=!0,h=null};return v.addEventListener("mouseleave",D),()=>{window.removeEventListener("mousemove",P),v.removeEventListener("mouseleave",D),G.forEach(I=>I())}}return Q(()=>{o=f($.value)}),ve(()=>{o&&o()}),(b,v)=>{const i=K;return e(),s("section",{ref_key:"wrapRef",ref:$,"data-follower-wrap":"",class:"preview-container"},[v[0]||(v[0]=we('<div class="preview-item__row tablet--hide" data-v-7f7d0164><div class="preview-item__col is--large" data-v-7f7d0164><span class="preview-container__label" data-v-7f7d0164>Name</span></div><div class="preview-item__col is--medium" data-v-7f7d0164><span class="preview-container__label" data-v-7f7d0164>Role</span></div></div>',1)),n("div",ls,[n("div",rs,[(e(!0),s(T,null,C(S(p),(c,r)=>(e(),s("div",{key:c._key||r,"data-follower-item":"",class:"preview-item"},[n("div",cs,[n("div",us,[n("div",ds,[n("h2",_s,L(c.name),1)]),n("div",gs,[n("p",ms,L(c.role),1)])]),n("div",ps,[c?.image?.asset?(e(),x(i,{key:0,src:S(k)(c.image.asset),alt:c.name||"",class:"preview-item__visual-img"},null,8,["src","alt"])):_("",!0)])])]))),128))])]),v[1]||(v[1]=n("div",{"data-follower-cursor":"",class:"preview-follower"},[n("div",{"data-follower-cursor-inner":"",class:"preview-follower__inner"},[n("div",{class:"preview-follower__label"},[n("div",{class:"preview-follower__label-span"},"View team")])])],-1))],512)}}},hs=B(fs,[["__scopeId","data-v-7f7d0164"]]),ys=["data-logo-wall-shuffle"],vs={class:"logo-wall__collection"},ws={"data-logo-wall-list":"",class:"logo-wall__list"},ks={"data-logo-wall-target-parent":"",class:"logo-wall__logo"},bs={"data-logo-wall-target":"",class:"logo-wall__logo-target"},$s={__name:"PageSectionLogoWall",props:{section:{type:Object,required:!0}},setup(g){const w=g,{getImageSrc:$}=de(),k=N(null),p=N(null),o=N(null),f=A(()=>w.section?.logoWallLogos||[]),b=A(()=>w.section?.logoWallShuffle!==!1);function v(d){return $(d?.asset||d)}function i(d){return window.getComputedStyle(d).display!=="none"}function c(d){const t=d.slice();for(let l=t.length-1;l>0;l--){const u=Math.floor(Math.random()*(l+1));[t[l],t[u]]=[t[u],t[l]]}return t}async function r(d){if(!d)return;const[{gsap:t},{ScrollTrigger:l}]=await Promise.all([ie(()=>import("./ww16NeOw.js").then(M=>M.M),__vite__mapDeps([0,1]),import.meta.url),ie(()=>import("./ww16NeOw.js").then(M=>M.N),__vite__mapDeps([0,1]),import.meta.url)]);t.registerPlugin(l);const u=1.5,m=.9,a=d.querySelector("[data-logo-wall-list]");if(!a)return;const P=Array.from(a.querySelectorAll("[data-logo-wall-item]"));if(!P.length)return;const G=d.getAttribute("data-logo-wall-shuffle")!=="false",D=P.map(M=>M.querySelector("[data-logo-wall-target]")).filter(Boolean).map(M=>M.cloneNode(!0));if(!D.length)return;let I=[],y=0,R=[],V=[],E=0;const F=()=>{P.forEach(M=>{M.querySelectorAll("[data-logo-wall-target]").forEach(z=>z.remove())})},j=()=>{if(p.value&&(p.value.kill(),p.value=null),I=P.filter(i),y=I.length,!y)return;V=c(Array.from({length:y},(O,U)=>U)),E=0,F(),R=D.map(O=>O.cloneNode(!0));let M,z;if(G){const O=c(R);M=O.slice(0,y),z=c(O.slice(y))}else M=R.slice(0,y),z=c(R.slice(y));R=M.concat(z);for(let O=0;O<y;O++){const U=I[O].querySelector("[data-logo-wall-target-parent]")||I[O],J=R.shift();J&&U.appendChild(J)}p.value=t.timeline({repeat:-1,repeatDelay:u}),p.value.call(W),p.value.play()},W=()=>{if(P.filter(i).length!==y){j();return}if(!R.length||!y)return;const z=V[E%y];E++;const O=I[z],U=O.querySelector("[data-logo-wall-target-parent]")||O;if(U.querySelectorAll("[data-logo-wall-target]").length>1)return;const Y=U.querySelector("[data-logo-wall-target]"),Z=R.shift();Z&&(t.set(Z,{yPercent:50,autoAlpha:0}),U.appendChild(Z),Y&&t.to(Y,{yPercent:-50,autoAlpha:0,duration:m,ease:"expo.inOut",onComplete:()=>{Y.remove(),R.push(Y)}}),t.to(Z,{yPercent:0,autoAlpha:1,duration:m,delay:.1,ease:"expo.inOut"}))};j(),o.value=l.create({trigger:d,start:"top bottom",end:"bottom top",onEnter:()=>p.value?.play(),onLeave:()=>p.value?.pause(),onEnterBack:()=>p.value?.play(),onLeaveBack:()=>p.value?.pause()})}function h(){if(document.hidden){p.value?.pause();return}p.value?.play()}return Q(()=>{r(k.value),document.addEventListener("visibilitychange",h)}),re(()=>{p.value?.kill(),o.value?.kill(),document.removeEventListener("visibilitychange",h)}),(d,t)=>{const l=K;return S(f).length?(e(),s("section",{key:0,ref_key:"rootRef",ref:k,"data-logo-wall-shuffle":S(b)?"true":"false","data-logo-wall-cycle-init":"",class:"logo-wall"},[n("div",vs,[n("div",ws,[(e(!0),s(T,null,C(S(f),(u,m)=>(e(),s("div",{key:u._key||`logo-${m}`,"data-logo-wall-item":"",class:"logo-wall__item"},[n("div",ks,[t[0]||(t[0]=n("div",{class:"logo-wall__logo-before"},null,-1)),n("div",bs,[v(u)?(e(),x(l,{key:0,src:v(u),loading:"lazy",width:"100",alt:u.alt||"",class:"logo-wall__logo-img"},null,8,["src","alt"])):_("",!0)])])]))),128))])])],8,ys)):_("",!0)}}},Ss=Object.assign(B($s,[["__scopeId","data-v-ebf4dc63"]]),{__name:"PageSectionLogoWall"}),xs=["data-marquee-direction"],qs={"data-marquee-scroll-target":"",class:"logo-marquee__scroll"},Is={"data-marquee-collection-target":"",class:"logo-marquee__collection"},Ps=["src"],Ts={__name:"PageSectionLogoMarquee",props:{section:{type:Object,required:!0}},setup(g){const w=N(null),$=g,{getImageSrc:k}=de();function p(r){const h=r.slice();for(let d=h.length-1;d>0;d--){const t=Math.floor(Math.random()*(d+1));[h[d],h[t]]=[h[t],h[d]]}return h}const o=A(()=>$.section?.logoMarqueeLogos||$.section?.logoGridLogos||[]),f=N([]),b=N([]),v=A(()=>f.value.length>0?f.value:o.value),i=A(()=>b.value.length>0?b.value:o.value),c=r=>r?k(r):"";return Q(()=>{w.value&&(f.value=p([...o.value]),b.value=p([...o.value]),H(()=>{pe(w.value),setTimeout(()=>pe(w.value),500)}))}),(r,h)=>S(o).length>0?(e(),s("section",{key:0,ref_key:"sectionRef",ref:w,class:"logo-marquee-section"},[(e(!0),s(T,null,C([S(f),S(b)],(d,t)=>(e(),s("div",{key:t,"data-marquee-duplicate":2,"data-marquee-scroll-direction-target":"","data-marquee-direction":t===0?"left":"right","data-marquee-status":"normal","data-marquee-speed":"15","data-marquee-scroll-speed":"10",class:"logo-marquee"},[n("div",qs,[n("div",Is,[(e(!0),s(T,null,C(t===0?S(v):S(i),(l,u)=>(e(),s("div",{key:`${t}-${l._key||u}`,class:"logo-marquee__item"},[n("img",{src:c(l?.asset||l),alt:"",class:"logo-marquee__img",loading:"lazy"},null,8,Ps)]))),128))])])],8,xs))),128))],512)):_("",!0)}},Ls=Object.assign(B(Ts,[["__scopeId","data-v-71d3f651"]]),{__name:"PageSectionLogoMarquee"}),As={key:0,class:"clients-section grid gap-30"},Cs={class:"show-md"},Rs={key:0,class:"subtitle subtitle--circle orange-dot"},Ms={class:"rounded-medium pad-50 pad-md-50 grid gap-30",style:{"background-color":"var(--pink-tint-3)"}},Os={class:"hide-md"},Es={key:0,class:"subtitle small subtitle--circle white-dot"},he=799,Ns={__name:"PageSectionClients",props:{section:{type:Object,required:!0}},setup(g){const w=g,$=A(()=>w.section?.clientsImages||[]),k=A(()=>{const d=[];for(let t=0;t<$.value.length;t+=3)d.push($.value.slice(t,t+3));return d}),p=N(null),o=N(null),f=N(null);let b=()=>{},v=()=>{};async function i(){if(!p.value||window.innerWidth>he||f.value||k.value.length<=1)return;const d=(await ie(async()=>{const{default:t}=await import("./G_YIQCB9.js").then(l=>l.i);return{default:t}},[],import.meta.url)).default;f.value=new d(p.value,{prevNextButtons:!1,pageDots:!0,wrapAround:!0,adaptiveHeight:!1,cellAlign:"center",contain:!0,draggable:!0})}function c(){f.value&&(f.value.destroy(),f.value=null)}function r(){if(window.innerWidth<=he){v(),i();return}c(),h()}function h(){if(window.innerWidth<800||!o.value)return;v();const d=o.value.querySelectorAll(".clients-section__item");if(!d.length)return;q.set(d,{autoAlpha:0,y:20});const t=q.to(d,{autoAlpha:1,y:0,duration:.5,ease:"power2.out",stagger:.1,paused:!0});let l=null;l=new IntersectionObserver(u=>{u[0]?.isIntersecting&&(t.play(),l?.disconnect(),l=null)},{rootMargin:"0px 0px -35% 0px",threshold:.01}),l.observe(o.value),v=()=>{l?.disconnect(),t.kill(),q.set(d,{clearProps:"opacity,visibility,transform"})}}return se(()=>k.value.length,async()=>{await H(),c(),v(),i(),h()}),Q(async()=>{await H(),await i(),h(),window.addEventListener("resize",r),b=()=>window.removeEventListener("resize",r)}),re(()=>{b(),c(),v()}),(d,t)=>{const l=K;return S($).length?(e(),s("section",As,[n("div",Cs,[g.section.clientsTitle||g.section.title?(e(),s("h2",Rs,L(g.section.clientsTitle||g.section.title),1)):_("",!0)]),n("div",Ms,[n("div",Os,[g.section.clientsTitle||g.section.title?(e(),s("h2",Es,L(g.section.clientsTitle||g.section.title),1)):_("",!0)]),n("div",{ref_key:"gridRef",ref:o,class:"clients-section__grid pad-60 pad-top-bottom"},[(e(!0),s(T,null,C(S($),(u,m)=>(e(),s("article",{key:u._key||`client-grid-${m}`,class:"clients-section__item"},[u.image?.asset?.url?(e(),x(l,{key:0,src:u.image.asset.url,alt:u.alt||"",width:u.image.asset.metadata?.dimensions?.width,height:u.image.asset.metadata?.dimensions?.height,class:"clients-section__image",loading:"lazy"},null,8,["src","alt","width","height"])):_("",!0)]))),128))],512),n("div",{ref_key:"carouselRef",ref:p,class:"clients-section__carousel"},[(e(!0),s(T,null,C(S(k),(u,m)=>(e(),s("div",{key:`client-slide-${m}`,class:"clients-section__slide"},[(e(!0),s(T,null,C(u,(a,P)=>(e(),s("article",{key:a._key||`client-slide-item-${m}-${P}`,class:"clients-section__item"},[a.image?.asset?.url?(e(),x(l,{key:0,src:a.image.asset.url,alt:a.alt||"",width:a.image.asset.metadata?.dimensions?.width,height:a.image.asset.metadata?.dimensions?.height,class:"clients-section__image",loading:"lazy"},null,8,["src","alt","width","height"])):_("",!0)]))),128))]))),128))],512)])])):_("",!0)}}},js=Object.assign(B(Ns,[["__scopeId","data-v-45225d1f"]]),{__name:"PageSectionClients"}),Bs={class:"page"},Ds={key:0},Fs={key:1,class:"page-content"},Ws={key:0,style:{padding:"var(--gutter)"}},zs={key:2},Gs={__name:"[...slug]",setup(g){const w=ke(),{setLoading:$}=be(),k=A(()=>w.path==="/"?"home":w.params.slug?Array.isArray(w.params.slug)?w.params.slug.join("/"):w.params.slug:w.path.replace(/^\//,"")||null),{data:p,pending:o,error:f}=ue(()=>`page-${w.path}`,async()=>{if(!k.value)return null;const i=`*[_type == "page" && slug.current == $slug][0] {
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
        sectionType,
        featuredProjects[] {
          project-> {
            _id,
            title,
            slug,
            featuredImage {
              asset->
            },
            featuredImageMobile {
              asset->
            }
          },
          format
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
        servicesTextarea,
        textContent,
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
          asset-> {
            _id,
            url
          }
        },
        logoMarqueeLogos[] {
          _key,
          alt,
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
        }
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
    }`;try{const r=(await $fetch("/api/sanity/query",{method:"POST",body:{query:i,params:{slug:k.value}}}))?.result;return r&&r._id?r:null}catch(c){throw c}},{watch:[k]}),b=A(()=>p.value?.sections||[]),v=A(()=>p.value?.portfolioProjects||[]);return $e(()=>{const i=p.value?.devBackgroundImage?.asset?.url;return i?{bodyAttrs:{"data-page-dev-bg":"true",style:[`background-image:url("${i}")`,"background-size: 100%","background-position: left top","background-repeat:no-repeat"].join(";")}}:{bodyAttrs:{"data-page-dev-bg":void 0,style:void 0}}}),se(o,i=>{$(i)},{immediate:!0}),(i,c)=>{const r=Te,h=Xe,d=tt,t=at,l=Tt,u=Dt,m=zt,a=is,P=hs,G=Ss,D=Ls,I=js;return e(),s("div",Bs,[S(f)?(e(),s("div",Ds,[n("p",null,"Error loading page: "+L(S(f).message),1)])):S(p)?(e(),s("div",Fs,[S(b).length===0?(e(),s("div",Ws,[...c[0]||(c[0]=[n("p",null,"No sections found for this page. Add sections in Sanity.",-1)])])):_("",!0),(e(!0),s(T,null,C(S(b),y=>(e(),s("div",{key:y._id,class:"page-section"},[y.sectionType==="featuredProjects"?(e(),x(r,{key:0,section:y},null,8,["section"])):y.sectionType==="info"?(e(),x(h,{key:1,section:y},null,8,["section"])):y.sectionType==="services"?(e(),x(d,{key:2,section:y},null,8,["section"])):y.sectionType==="text"?(e(),x(t,{key:3,section:y},null,8,["section"])):y.sectionType==="cards"?(e(),x(l,{key:4,section:y},null,8,["section"])):y.sectionType==="autoscrollGallery"?(e(),x(u,{key:5,section:y},null,8,["section"])):y.sectionType==="news"||y.sectionType==="pressAwards"?(e(),x(m,{key:6,section:y},null,8,["section"])):y.sectionType==="portfolio"?(e(),x(a,{key:7,section:y,projects:S(v)},null,8,["section","projects"])):y.sectionType==="team"?(e(),x(P,{key:8,section:y},null,8,["section"])):y.sectionType==="logoWall"?(e(),x(G,{key:9,section:y},null,8,["section"])):y.sectionType==="logoMarquee"?(e(),x(D,{key:10,section:y},null,8,["section"])):y.sectionType==="clients"?(e(),x(I,{key:11,section:y},null,8,["section"])):_("",!0)]))),128))])):(e(),s("div",zs,[...c[1]||(c[1]=[n("p",null,"Page not found",-1)])]))])}}},Xs=B(Gs,[["__scopeId","data-v-915bd727"]]);export{Xs as default};
