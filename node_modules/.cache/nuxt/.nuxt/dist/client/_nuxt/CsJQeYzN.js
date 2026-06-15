import{_ as O,f as w,c as a,i as d,g as o,o as i,a as s,F as q,y as F,t as _,n as $,r as j,p as N,b as k,h as x,w as D,j as H,T as $e,q as ge,x as ve,G as A,P as Se,m as Le,k as Ae,E as pe,s as Pe,H as Te,Q as Be,R as Re,d as se,e as je}from"./DXJSAWiJ.js";import{_ as ye,s as qe}from"./BZFLOE6y.js";const Me={class:"portfolio-stats__table"},Ne={class:"portfolio-stats__dd"},Ee={key:0,class:"portfolio-stats__lozenge orange white-text rounded-small fluid-type mono",style:{"--desktop":"16","--mobile":"12"}},Fe={key:0,class:"portfolio-stats__arrow",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},Oe={class:"portfolio-stats__value-text"},ze={class:"portfolio-stats__label fluid-type",style:{"--desktop":"28","--mobile":"18"}},Ge={__name:"PortfolioStatsProject",props:{stats:{type:Array,default:()=>[]},rootClass:{type:String,default:""}},setup(r){const y=r,f=w(()=>(y.stats||[]).some(p=>p?.label||p?.value)),v=w(()=>(y.stats||[]).filter(p=>p?.label||p?.value));return(p,I)=>o(f)?(i(),a("div",{key:0,class:$(["portfolio-stats",r.rootClass])},[s("table",Me,[s("tbody",null,[(i(!0),a(q,null,F(o(v),(g,n)=>(i(),a("tr",{key:g._key||n,class:"portfolio-stats__row"},[s("td",Ne,[g.value?(i(),a("span",Ee,[g.icon==="arrowUp"?(i(),a("svg",Fe,[...I[0]||(I[0]=[s("path",{d:"M0 8.98305L1.52649 10.5663L7.57831 4.30064V17.9661H9.74354V4.30064L15.7845 10.5775L17.3218 8.98305L8.66092 0L0 8.98305Z",fill:"currentColor"},null,-1)])])):d("",!0),s("span",Oe,_(g.value),1)])):d("",!0)]),s("td",ze,_(g.label),1)]))),128))])])],2)):d("",!0)}},Ue=O(Ge,[["__scopeId","data-v-594acba9"]]),We={class:"portfolio-image-container portfolio-video-block-inner"},De=["src","title"],He={key:1,autoplay:"",muted:"",loop:"",playsinline:"",class:"portfolio-video-block-bg"},Ze=["src","type"],Ke={__name:"PortfolioVideoBlock",props:{block:{type:Object,required:!0},alt:{type:String,default:""}},emits:["image-load"],setup(r,{emit:y}){const f=r,v=y,p=j(!1);N(()=>f.block?._key,()=>{p.value=!1});function I(m){const c=String(m||"").trim();if(!c)return null;if(/^\d+$/.test(c))return c;let V=c.match(/vimeo\.com\/(?:video\/)?(\d+)/i);return V?V[1]:(V=c.match(/player\.vimeo\.com\/video\/(\d+)/i),V?V[1]:null)}function g(m){if(!m||typeof m!="string")return"video/mp4";const c=m.toLowerCase();return c.endsWith(".webm")?"video/webm":c.endsWith(".ogg")||c.endsWith(".ogv")?"video/ogg":"video/mp4"}const n=w(()=>f.block?.playbackMode!=="interactive"),C=w(()=>f.block?.videoSource!=="vimeo"?"":I(f.block?.videoVimeo)||""),b=w(()=>C.value?`https://player.vimeo.com/video/${C.value}?background=1&autoplay=1&muted=1&loop=1`:"");return(m,c)=>{const V=H,P=ye;return i(),a("div",We,[o(n)?(i(),a(q,{key:0},[o(C)?(i(),a("iframe",{key:0,src:o(b),class:"portfolio-video-block-bg",title:`${r.alt} background video`,allow:"autoplay; fullscreen; picture-in-picture",loading:"lazy"},null,8,De)):r.block.video?.asset?.url?(i(),a("video",He,[s("source",{src:r.block.video.asset.url,type:g(r.block.video.asset.url)},null,8,Ze)])):d("",!0)],64)):(i(),a(q,{key:1},[k($e,{name:"portfolio-video-fade"},{default:D(()=>[o(p)?d("",!0):(i(),a("button",{key:0,type:"button",class:"portfolio-video-cta",onClick:c[1]||(c[1]=S=>p.value=!0)},[r.block.poster?.asset?.url?(i(),x(V,{key:0,src:r.block.poster.asset.url,alt:`${r.alt} video poster`,width:r.block.poster.asset.metadata?.dimensions?.width,height:r.block.poster.asset.metadata?.dimensions?.height,class:"portfolio-video-poster",onLoad:c[0]||(c[0]=S=>v("image-load"))},null,8,["src","alt","width","height"])):d("",!0),c[2]||(c[2]=s("span",{class:"portfolio-video-cta__play","aria-hidden":"true"},"Play",-1)),c[3]||(c[3]=s("span",{class:"sr-only"},"Play video with sound",-1))]))]),_:1}),o(p)&&o(C)?(i(),x(P,{key:`video-vimeo-${r.block._key||"block"}-${o(C)}`,type:"vimeo","vimeo-id":o(C),autoplay:!0,muted:!1},null,8,["vimeo-id"])):o(p)&&r.block.video?.asset?.url?(i(),x(P,{key:`video-mp4-${r.block._key||"block"}-${r.block.video.asset.url}`,type:"html5",src:r.block.video.asset.url,autoplay:!0,muted:!1},null,8,["src"])):d("",!0)],64))])}}},Qe=O(Ke,[["__scopeId","data-v-a1d8266c"]]),Xe={key:0,class:"portfolio-gallery","data-click-zoom-article":""},Je={__name:"PortfolioGallery",props:{images:{type:Array,required:!0},timing:{type:Number,default:1e3},alt:{type:String,default:""}},setup(r){const y=r,f=j(0);let v=null;const p=()=>{if(y.images.length<=1){f.value=0;return}v=qe(()=>{f.value=(f.value+1)%y.images.length},y.timing)},I=()=>{v&&(clearInterval(v),v=null)};return ge(()=>{p()}),ve(()=>{I()}),N(()=>y.images,()=>{I(),f.value=0,p()},{deep:!0}),N(()=>y.timing,()=>{I(),p()}),(g,n)=>{const C=H;return r.images&&r.images.length>0?(i(),a("div",Xe,[(i(!0),a(q,null,F(r.images,(b,m)=>(i(),a("div",{key:m,class:$(["portfolio-gallery-image",{"portfolio-gallery-image-active":m===f.value}])},[b?.asset?(i(),x(C,{key:0,src:b.asset.url||"",alt:r.alt||"Gallery image",class:"portfolio-gallery-img"},null,8,["src","alt"])):d("",!0)],2))),128))])):d("",!0)}}},he=Object.assign(O(Je,[["__scopeId","data-v-62eac4df"]]),{__name:"PortfolioGallery"}),Ye={key:2,class:"portfolio-image-container portfolio-two-column-video-container"},et=["src","title"],tt={key:1,autoplay:"",muted:"",loop:"",playsinline:"",class:"portfolio-two-column-video"},ot=["src","type"],it={__name:"PortfolioTwoColumnCell",props:{columnType:{type:String,default:"image"},image:{type:Object,default:null},images:{type:Array,default:()=>[]},timing:{type:Number,default:1e3},videoSource:{type:String,default:"file"},video:{type:Object,default:null},videoVimeo:{type:String,default:""},alt:{type:String,default:""},getImageAspectRatio:{type:Function,required:!0}},emits:["image-load"],setup(r,{emit:y}){const f=r,v=y;function p(b){const m=String(b||"").trim();if(!m)return null;if(/^\d+$/.test(m))return m;let c=m.match(/vimeo\.com\/(?:video\/)?(\d+)/i);return c?c[1]:(c=m.match(/player\.vimeo\.com\/video\/(\d+)/i),c?c[1]:null)}function I(b){if(!b||typeof b!="string")return"video/mp4";const m=b.toLowerCase();return m.endsWith(".webm")?"video/webm":m.endsWith(".ogg")||m.endsWith(".ogv")?"video/ogg":"video/mp4"}const g=w(()=>f.columnType!=="video"||f.videoSource!=="vimeo"?"":p(f.videoVimeo)||""),n=w(()=>g.value?`https://player.vimeo.com/video/${g.value}?background=1&autoplay=1&muted=1&loop=1`:""),C=w(()=>f.columnType!=="video"?!1:g.value?!0:!!f.video?.asset?.url);return(b,m)=>{const c=he,V=H;return r.columnType==="gallery"&&r.images&&r.images.length>0?(i(),x(c,{key:0,images:r.images,timing:r.timing||1e3,alt:r.alt},null,8,["images","timing","alt"])):r.columnType==="image"&&r.image?.asset?(i(),a("div",{key:1,"data-click-zoom":"",class:"portfolio-image-container",style:A(r.getImageAspectRatio(r.image.asset))},[k(V,{src:r.image.asset.url||"",alt:r.alt,width:r.image.asset.metadata?.dimensions?.width,height:r.image.asset.metadata?.dimensions?.height,class:"portfolio-image",onLoad:m[0]||(m[0]=P=>v("image-load"))},null,8,["src","alt","width","height"])],4)):r.columnType==="video"&&o(C)?(i(),a("div",Ye,[o(g)?(i(),a("iframe",{key:0,src:o(n),class:"portfolio-two-column-vimeo",title:`${r.alt} background video`,allow:"autoplay; fullscreen; picture-in-picture",loading:"lazy"},null,8,et)):r.video?.asset?.url?(i(),a("video",tt,[s("source",{src:r.video.asset.url,type:I(r.video.asset.url)},null,8,ot)])):d("",!0)])):d("",!0)}}},st=O(it,[["__scopeId","data-v-6155122c"]]),lt={class:"portfolio-detail"},at={key:0,class:"portfolio-loading"},nt={key:1,class:"portfolio-error"},rt={key:2},dt={class:"portfolio-layout portfolio-fade-in"},ct={class:"hide-md pad-30 pad-top-bottom"},ut={class:"grid gap-50"},mt={class:"portfolio-title portfolio-title-full fluid-type",style:{"--desktop":"54","--mobile":"40"}},pt={key:0,class:"portfolio-intro",style:{"--desktop":"18","--mobile":"18"}},ft={class:"portfolio-layout__sidebar rounded-portfolio white pad-30"},gt={class:"portfolio-sidebar-stack"},vt={class:"portfolio-sidebar-stack__middle"},yt={class:"portfolio-sidebar-stack__body gap-30"},ht={class:"portfolio-title portfolio-title-full fluid-type show-md",style:{"--desktop":"54","--mobile":"40"}},_t={key:0,class:"portfolio-intro show-md pad-md-30 pad-right",style:{"--desktop":"18","--mobile":"18"}},kt={key:0,class:"portfolio-accordion"},wt=["tabindex","aria-expanded"],bt={class:"portfolio-accordion-panel-inner"},xt={class:"portfolio-accordion-panel fluid-type",style:{"--desktop":"26","--mobile":"18"}},It={key:1,class:"portfolio-accordion"},Ct=["tabindex","aria-expanded"],Vt={class:"portfolio-accordion-panel-inner"},$t={class:"portfolio-accordion-panel fluid-type",style:{"--desktop":"24","--mobile":"18"}},St={key:2,class:"portfolio-accordion"},Lt=["tabindex","aria-expanded"],At={class:"portfolio-accordion-panel-inner"},Pt={class:"portfolio-accordion-panel pad-top fluid-type",style:{"--desktop":"24","--mobile":"18"}},Tt={class:"portfolio-video-launch"},Bt=["aria-expanded"],Rt={id:"portfolio-client-video-pop",class:"portfolio-video-pop",role:"dialog","aria-label":"Client video"},jt={class:"portfolio-video-pop__inner portfolio-image-container"},qt={class:"portfolio-layout__main"},Mt={class:"portfolio-content"},Nt={key:0,class:"portfolio-image-block rounded-portfolio"},Et={key:1,class:"portfolio-video-block rounded-portfolio"},Ft={key:2,class:"portfolio-testimonial-block rounded-portfolio beige grid gap-50 pad-30 pad-md-50"},Ot={class:"subtitle subtitle--square white-dot portfolio-testimonial-subtitle"},zt={key:0,class:"portfolio-testimonial-quote fluid-type pad-md-60 pad-right",style:{"--desktop":"60","--mobile":"30"}},Gt={key:1,class:"portfolio-testimonial-attribution fluid-type",style:{"--desktop":"24","--mobile":"18"}},Ut={key:0},Wt={key:1},Dt={key:3,class:"portfolio-services-block rounded-portfolio beige grid gap-60 pad-30"},Ht={class:"subtitle subtitle--circle orange-dot portfolio-services-subtitle"},Zt={class:"portfolio-services-columns fluid-type pad-40 pad-bottom",style:{"--desktop":"50","--mobile":"24"}},Kt={key:4,class:"portfolio-cards-block"},Qt={class:"portfolio-cards-item__grid"},Xt={class:"portfolio-cards-item__text underline-links"},Jt={key:0,class:"portfolio-cards-item__title"},Yt={class:"portfolio-cards-item__media"},eo={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"portfolio-cards-item__video"},to=["src","type"],oo={key:5,class:"portfolio-text-block rounded-portfolio beige underline-links pad-30"},io={key:6,class:"portfolio-gallery-block rounded-portfolio"},so={key:7,class:""},lo={class:"portfolio-two-column-block"},ao={key:8,class:"portfolio-two-column-gallery-block"},no={key:0,class:"portfolio-next-project rounded-portfolio yellow pad-30 portfolio-fade-in"},ro={class:"portfolio-next-project__info"},co={class:"subtitle"},uo={class:"portfolio-next-project__actions"},mo={key:3,class:"portfolio-not-found rounded-portfolio beige pad-30"},fe=999,po={__name:"[slug]",setup(r){const y=Se(),{setLoading:f}=Le(),{singlePortfolioNextProjectSettings:v,portfolioProjectPath:p}=Ae();function I(t){if(!t||typeof t!="string")return null;const l=t.trim();if(/^\d+$/.test(l))return l;let u=l.match(/vimeo\.com\/(?:video\/)?(\d+)/i);return u?u[1]:(u=l.match(/player\.vimeo\.com\/video\/(\d+)/i),u?u[1]:null)}const g=w(()=>{const t=y.params.slug;return t?Array.isArray(t)?t[0]:t:y.path.replace(/^\/work\/?/,"")||null}),{data:n,pending:C,error:b}=pe(()=>`portfolio-${y.path}`,async()=>g.value?await $fetch("/api/sanity/query",{method:"POST",body:{query:`*[_type == "portfolio" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      intro,
      role,
      play,
      results,
      resultsStats,
      clientVideoSource,
      clientVideoVimeo,
      clientVideo {
        asset->
      },
      contentBlocks[] {
        _type,
        _key,
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
        videoSource,
        playbackMode,
        videoVimeo,
        poster {
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
        },
        text,
        image1 {
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
        image2 {
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
        column1Type,
        column1Images[] {
          asset->
        },
        column1Timing,
        column1VideoSource,
        column1VideoVimeo,
        column1Video {
          asset->
        },
        column2Type,
        column2Images[] {
          asset->
        },
        column2Timing,
        column2VideoSource,
        column2VideoVimeo,
        column2Video {
          asset->
        },
        columnAspectRatio,
        timing,
        images[] {
          asset->
        },
        leftImages[] {
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
        leftTiming,
        rightImages[] {
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
        rightTiming,
        subtitle,
        testimonial,
        name,
        company,
        title,
        body,
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
        }
      }
    }`,params:{slug:g.value}}}).then(l=>l?.result||null).catch(()=>null):null,{watch:[g]}),{data:m}=pe("portfolio-next-projects",async()=>await $fetch("/api/sanity/query",{method:"POST",body:{query:`*[_type == "portfolio"] | order(orderRank) {
      _id,
      title,
      slug
    }`}}).then(l=>l?.result||[]).catch(()=>[]),{watch:[]}),c=w(()=>{const t=n.value,l=m.value;if(!t?.slug?.current||!Array.isArray(l)||l.length===0)return null;const u=l.findIndex(B=>B?.slug?.current===t.slug.current);if(u===-1)return l[0]||null;const L=(u+1)%l.length;return l[L]||null}),V=w(()=>!!c.value&&v.value?.enabled!==!1),P=w(()=>{const t=n.value;return!t||t.clientVideoSource!=="vimeo"?"":I(t.clientVideoVimeo||"")||""}),S=j(!1),Z=j(null);N(g,()=>{S.value=!1});function z(t){return Array.isArray(t)&&t.length>0}function le(t){return t?z(t.role)?"role":z(t.play)?"play":z(t.results)||z(t.resultsStats)?"results":null:null}const G=j(null),K=w(()=>G.value??le(n.value??null));N(()=>n.value?._id,()=>{G.value=null});const T=j(!1),Q=j(!1);function ae(){T.value=window.matchMedia(`(max-width: ${fe}px)`).matches}function X(t){return K.value===t}function J(t){return T.value?!0:K.value===t}function Y(t){if(T.value)return;const l=le(n.value??null);if(K.value===t){G.value=l??null;return}G.value=t}const _e=w(()=>n.value?P.value?!0:!!n.value.clientVideo?.asset?.url:!1),ke=w(()=>Array.isArray(n.value?.contentBlocks)?n.value.contentBlocks:[]);function we(t){return t!==0}function ne(t){!S.value||!Z.value||Z.value.contains(t.target)||(S.value=!1)}function re(t){t.key==="Escape"&&(S.value=!1)}N(C,t=>{f(t)},{immediate:!0});const E=t=>{if(t?.metadata?.dimensions){const{width:l,height:u,aspectRatio:L}=t.metadata.dimensions;if(L)return{aspectRatio:`${L}`};if(l&&u)return{aspectRatio:`${l/u}`}}return{aspectRatio:"4 / 3"}},R=t=>{t?.target&&t.target.classList.add("loaded")};function be(t){return!t||typeof t!="string"?[]:t.split(/\r?\n/).map(l=>l.trim()).filter(Boolean)}function xe(t){return!t||t._type!=="videoBlock"||t.videoSource!=="vimeo"?"":I(t.videoVimeo||"")||""}function Ie(t){return!t||t._type!=="videoBlock"?!1:xe(t)?!0:!!t.video?.asset?.url}function Ce(t){if(!t||typeof t!="string")return"video/mp4";const l=t.toLowerCase();return l.endsWith(".webm")?"video/webm":l.endsWith(".ogg")||l.endsWith(".ogv")?"video/ogg":"video/mp4"}function de(t){if(!t||typeof t!="string")return null;const l=t.trim();if(!l)return null;const u=l.split("/").map(M=>M.trim()).filter(Boolean);if(u.length!==2)return null;const L=Number.parseFloat(u[0]),B=Number.parseFloat(u[1]);return!Number.isFinite(L)||!Number.isFinite(B)||L<=0||B<=0?null:`${L} / ${B}`}function U(t){const l=de(t?.columnAspectRatio);return l?{"--portfolio-col-aspect":l}:{}}function W(t){return de(t?.columnAspectRatio)!=null}function ce(){const t=T.value;ae(),t&&!T.value&&(Q.value=!0,requestAnimationFrame(()=>{requestAnimationFrame(()=>{Q.value=!1})}))}let ue=()=>{};return ge(()=>{{ae();const t=window.matchMedia(`(max-width: ${fe}px)`);t.addEventListener("change",ce),ue=()=>t.removeEventListener("change",ce),document.addEventListener("pointerdown",ne,!0),document.addEventListener("keydown",re),Pe(()=>{document.querySelectorAll(".portfolio-image").forEach(u=>{u.complete&&u.naturalHeight>0&&u.classList.add("loaded")})})}}),ve(()=>{ue(),document.removeEventListener("pointerdown",ne,!0),document.removeEventListener("keydown",re)}),(t,l)=>{const u=Te,L=Ue,B=ye,M=H,Ve=Qe,ee=he,me=st,te=je;return i(),a("div",lt,[o(C)?(i(),a("div",at)):o(b)?(i(),a("div",nt,[s("p",null,"Error loading portfolio: "+_(o(b).message),1)])):o(n)?(i(),a("div",rt,[l[11]||(l[11]=s("div",{class:"sticky-corner-portfolio-strip"},null,-1)),s("div",dt,[s("div",ct,[s("div",ut,[s("h1",mt,_(o(n).title),1),o(n).intro?.length?(i(),a("div",pt,[k(u,{blocks:o(n).intro},null,8,["blocks"])])):d("",!0)])]),s("aside",ft,[l[8]||(l[8]=s("div",{class:"sticky-corner"},null,-1)),s("div",gt,[s("div",vt,[s("div",yt,[s("h1",ht,_(o(n).title),1),o(n).intro?.length?(i(),a("div",_t,[k(u,{blocks:o(n).intro},null,8,["blocks"])])):d("",!0),o(n).role?.length||o(n).play?.length||o(n).results?.length||o(n).resultsStats?.length?(i(),a("div",{key:1,class:$(["portfolio-accordions",{"portfolio-accordions--no-transition":o(Q)}])},[o(n).role?.length?(i(),a("div",kt,[s("button",{id:"accordion-heading-role",type:"button",class:"portfolio-accordion-summary",tabindex:o(T)?-1:0,"aria-expanded":J("role"),"aria-controls":"accordion-panel-role",onClick:l[0]||(l[0]=e=>Y("role"))},[...l[4]||(l[4]=[s("span",{class:"subtitle subtitle--circle orange-dot"},"Role",-1)])],8,wt),s("div",{id:"accordion-panel-role",class:$(["portfolio-accordion-panel-outer",{"portfolio-accordion-panel-outer--open":X("role")}]),role:"region","aria-labelledby":"accordion-heading-role"},[s("div",bt,[s("div",xt,[k(u,{blocks:o(n).role},null,8,["blocks"])])])],2)])):d("",!0),o(n).play?.length?(i(),a("div",It,[s("button",{id:"accordion-heading-play",type:"button",class:"portfolio-accordion-summary",tabindex:o(T)?-1:0,"aria-expanded":J("play"),"aria-controls":"accordion-panel-play",onClick:l[1]||(l[1]=e=>Y("play"))},[...l[5]||(l[5]=[s("span",{class:"subtitle subtitle--square twisted orange-dot"},"Play",-1)])],8,Ct),s("div",{id:"accordion-panel-play",class:$(["portfolio-accordion-panel-outer",{"portfolio-accordion-panel-outer--open":X("play")}]),role:"region","aria-labelledby":"accordion-heading-play"},[s("div",Vt,[s("div",$t,[k(u,{blocks:o(n).play},null,8,["blocks"])])])],2)])):d("",!0),o(n).results?.length||o(n).resultsStats?.length?(i(),a("div",St,[s("button",{id:"accordion-heading-results",type:"button",class:"portfolio-accordion-summary",tabindex:o(T)?-1:0,"aria-expanded":J("results"),"aria-controls":"accordion-panel-results",onClick:l[2]||(l[2]=e=>Y("results"))},[...l[6]||(l[6]=[s("span",{class:"subtitle subtitle--circle orange-dot"},"Results",-1)])],8,Lt),s("div",{id:"accordion-panel-results",class:$(["portfolio-accordion-panel-outer",{"portfolio-accordion-panel-outer--open":X("results")}]),role:"region","aria-labelledby":"accordion-heading-results"},[s("div",At,[s("div",Pt,[o(n).results?.length?(i(),x(u,{key:0,blocks:o(n).results},null,8,["blocks"])):d("",!0),o(n).resultsStats?.length?(i(),x(L,{key:1,stats:o(n).resultsStats,"root-class":"portfolio-results-stats gap-20"},null,8,["stats"])):d("",!0)])])],2)])):d("",!0)],2)):d("",!0)])]),o(_e)?(i(),a("div",{key:0,ref_key:"clientVideoLaunchRef",ref:Z,class:"portfolio-sidebar-stack__footer"},[s("div",Tt,[s("button",{type:"button",class:"portfolio-hear-btn gap-bounce-hover fluid-type mono lavender",style:{"--desktop":"18","--mobile":"14"},"aria-expanded":o(S),"aria-controls":"portfolio-client-video-pop",onClick:l[3]||(l[3]=e=>S.value=!o(S))},[...l[7]||(l[7]=[s("span",{class:"subtitle subtitle--circle orange-dot"},"Hear from the client",-1),s("div",{class:"orange-text pad-20 pad-left"},[s("svg",{class:"portfolio-hear-arrow",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"none","aria-hidden":"true"},[s("path",{fill:"currentColor",d:"M0.270896 13.5043L11.9361 1.83905L2.51334 1.83905C2.38258 1.85469 2.24999 1.84216 2.12448 1.80231C1.99897 1.76246 1.88343 1.6962 1.78565 1.608C1.68787 1.51979 1.61009 1.41168 1.55756 1.29093C1.50502 1.17017 1.47894 1.03957 1.48106 0.907898C1.48319 0.776227 1.51347 0.646535 1.56987 0.527537C1.62627 0.408538 1.70749 0.30299 1.80807 0.217985C1.90865 0.132979 2.02626 0.0704848 2.15299 0.0347015C2.27973 -0.00108239 2.41265 -0.00932503 2.54283 0.0105246L14.1923 0.0105213C14.3141 0.0078327 14.4351 0.0298347 14.5482 0.0751989C14.6612 0.120563 14.7639 0.188354 14.85 0.274477C14.9361 0.3606 15.0039 0.463272 15.0493 0.576306C15.0946 0.68934 15.1166 0.81039 15.1139 0.932156L15.1139 12.5816C15.1148 12.7039 15.0913 12.825 15.0449 12.9381C14.9985 13.0512 14.9301 13.1539 14.8437 13.2404C14.7572 13.3268 14.6545 13.3952 14.5414 13.4416C14.4283 13.488 14.3072 13.5115 14.1849 13.5106C13.9397 13.5069 13.7056 13.4078 13.5322 13.2344C13.3588 13.0609 13.2597 12.8268 13.2559 12.5816L13.2486 3.15145L1.5833 14.8167C1.40861 14.9875 1.1736 15.0825 0.929272 15.0812C0.684948 15.0798 0.451024 14.9821 0.278269 14.8093C0.190835 14.7248 0.121168 14.6237 0.0733622 14.5119C0.025557 14.4002 0.000577941 14.2799 -0.000109264 14.1584C-0.000796447 14.0368 0.0228239 13.9163 0.0693633 13.804C0.115903 13.6916 0.184423 13.5898 0.270896 13.5043Z"})])],-1)])],8,Bt),Be(s("div",Rt,[s("div",jt,[o(P)?(i(),x(B,{key:`pop-vimeo-${o(P)}`,type:"vimeo","vimeo-id":o(P)},null,8,["vimeo-id"])):o(n).clientVideo?.asset?.url?(i(),x(B,{key:`pop-mp4-${o(n).clientVideo.asset.url}`,type:"html5",src:o(n).clientVideo.asset.url},null,8,["src"])):d("",!0)])],512),[[Re,o(S)]])])],512)):d("",!0)])]),s("div",qt,[l[10]||(l[10]=s("div",{class:"portfolio-layout__main-mask"},null,-1)),s("div",Mt,[(i(!0),a(q,null,F(o(ke),(e,oe)=>(i(),a("div",{key:e._key||oe,class:$(["portfolio-content-block",{"portfolio-fade-in":we(oe)}]),style:A({transitionDelay:`${(oe+1)*.1}s`})},[e._type==="imageBlock"&&e.image?.asset?(i(),a("div",Nt,[s("div",{"data-click-zoom":"",class:"portfolio-image-container",style:A(E(e.image.asset))},[k(M,{src:e.image.asset.url||"",alt:o(n).title,width:e.image.asset.metadata?.dimensions?.width,height:e.image.asset.metadata?.dimensions?.height,class:"portfolio-image",onLoad:R},null,8,["src","alt","width","height"])],4)])):e._type==="videoBlock"&&Ie(e)?(i(),a("div",Et,[k(Ve,{block:e,alt:o(n).title,onImageLoad:R},null,8,["block","alt"])])):e._type==="testimonialBlock"?(i(),a("div",Ft,[s("div",Ot,_(e.subtitle||"Testimonial"),1),e.testimonial?(i(),a("blockquote",zt," “"+_(e.testimonial)+"” ",1)):d("",!0),e.name||e.company?(i(),a("footer",Gt,[e.name?(i(),a("div",Ut,_(e.name),1)):d("",!0),e.company?(i(),a("div",Wt,_(e.company),1)):d("",!0)])):d("",!0)])):e._type==="servicesBlock"&&e.body?(i(),a("div",Dt,[s("div",Ht,_(e.title||"Services"),1),s("div",Zt,[(i(!0),a(q,null,F(be(e.body),(h,ie)=>(i(),a("div",{key:ie,class:"portfolio-services-line"},_(h),1))),128))])])):e._type==="cardsBlock"&&e.cards?.length?(i(),a("div",Kt,[(i(!0),a(q,null,F(e.cards,(h,ie)=>(i(),a("article",{key:h._key||ie,class:"portfolio-cards-item rounded-portfolio"},[s("div",Qt,[s("div",Xt,[h.title?(i(),a("h3",Jt,_(h.title),1)):d("",!0),h.description?.length?(i(),x(u,{key:1,blocks:h.description},null,8,["blocks"])):d("",!0)]),s("div",Yt,[h.mediaType==="video"&&h.video?.asset?.url?(i(),a("video",eo,[s("source",{src:h.video.asset.url,type:Ce(h.video.asset.url)},null,8,to)])):h.image?.asset?.url?(i(),x(M,{key:1,src:h.image.asset.url,alt:h.title||o(n).title,width:h.image.asset.metadata?.dimensions?.width,height:h.image.asset.metadata?.dimensions?.height,class:"portfolio-cards-item__image",onLoad:R},null,8,["src","alt","width","height"])):d("",!0)])])]))),128))])):e._type==="textBlock"&&e.text?(i(),a("div",oo,[k(u,{blocks:e.text},null,8,["blocks"])])):e._type==="galleryBlock"&&e.images&&e.images.length>0?(i(),a("div",io,[k(ee,{images:e.images,timing:e.timing||1e3,alt:o(n).title},null,8,["images","timing","alt"])])):e._type==="twoColumnBlock"?(i(),a("div",so,[l[9]||(l[9]=s("div",{class:"sticky-corner-two-columns"},null,-1)),s("div",lo,[s("div",{class:$(["portfolio-two-column-image rounded-portfolio",{"portfolio-column-media--desktop-aspect":W(e)}]),style:A(U(e))},[k(me,{"column-type":e.column1Type,image:e.image1,images:e.column1Images,timing:e.column1Timing,"video-source":e.column1VideoSource,video:e.column1Video,"video-vimeo":e.column1VideoVimeo,alt:o(n).title,"get-image-aspect-ratio":E,onImageLoad:R},null,8,["column-type","image","images","timing","video-source","video","video-vimeo","alt"])],6),s("div",{class:$(["portfolio-two-column-image rounded-portfolio",{"portfolio-column-media--desktop-aspect":W(e)}]),style:A(U(e))},[k(me,{"column-type":e.column2Type,image:e.image2,images:e.column2Images,timing:e.column2Timing,"video-source":e.column2VideoSource,video:e.column2Video,"video-vimeo":e.column2VideoVimeo,alt:o(n).title,"get-image-aspect-ratio":E,onImageLoad:R},null,8,["column-type","image","images","timing","video-source","video","video-vimeo","alt"])],6)])])):e._type==="twoColumnGalleryBlock"?(i(),a("div",ao,[s("div",{class:$(["portfolio-two-column-gallery-column rounded-portfolio",{"portfolio-column-media--desktop-aspect":W(e)}]),style:A(U(e))},[e.leftImages&&e.leftImages.length>1?(i(),x(ee,{key:0,images:e.leftImages,timing:e.leftTiming||1e3,alt:o(n).title},null,8,["images","timing","alt"])):e.leftImages&&e.leftImages.length===1&&e.leftImages[0]?.asset?(i(),a("div",{key:1,"data-click-zoom":"",class:"portfolio-image-container",style:A(E(e.leftImages[0].asset))},[k(M,{src:e.leftImages[0].asset.url||"",alt:o(n).title,width:e.leftImages[0].asset.metadata?.dimensions?.width,height:e.leftImages[0].asset.metadata?.dimensions?.height,class:"portfolio-image",onLoad:R},null,8,["src","alt","width","height"])],4)):d("",!0)],6),s("div",{class:$(["portfolio-two-column-gallery-column rounded-portfolio",{"portfolio-column-media--desktop-aspect":W(e)}]),style:A(U(e))},[e.rightImages&&e.rightImages.length>1?(i(),x(ee,{key:0,images:e.rightImages,timing:e.rightTiming||1e3,alt:o(n).title},null,8,["images","timing","alt"])):e.rightImages&&e.rightImages.length===1&&e.rightImages[0]?.asset?(i(),a("div",{key:1,"data-click-zoom":"",class:"portfolio-image-container",style:A(E(e.rightImages[0].asset))},[k(M,{src:e.rightImages[0].asset.url||"",alt:o(n).title,width:e.rightImages[0].asset.metadata?.dimensions?.width,height:e.rightImages[0].asset.metadata?.dimensions?.height,class:"portfolio-image",onLoad:R},null,8,["src","alt","width","height"])],4)):d("",!0)],6)])):d("",!0)],6))),128)),o(V)?(i(),a("div",no,[s("div",ro,[s("div",co,_(o(v).nextUpSubtitle),1),k(te,{to:o(p)(o(c).slug),class:"portfolio-next-project__title fluid-type",style:{"--desktop":"72","--mobile":"40"}},{default:D(()=>[se(_(o(c).title),1)]),_:1},8,["to"])]),s("div",uo,[k(te,{to:o(p)(o(c).slug),class:"next--button fluid-type",style:{"--desktop":"24","--mobile":"18","--background-color":"var(--white)","--color":"var(--black)","--border-color":"var(--white)"}},{default:D(()=>[se(_(o(v).viewProjectButtonTitle),1)]),_:1},8,["to"]),o(v).backLink?(i(),x(te,{key:0,to:o(v).backLink.path,class:"next--button outline fluid-type",style:{"--desktop":"24","--mobile":"18","--background-color":"transparent","--color":"var(--black)","--border-color":"var(--black)"}},{default:D(()=>[se(_(o(v).backLink.title),1)]),_:1},8,["to"])):d("",!0)])])):d("",!0)])])])])):(i(),a("div",mo,[...l[12]||(l[12]=[s("p",null,"Portfolio project not found",-1)])]))])}}},vo=O(po,[["__scopeId","data-v-9da0880f"]]);export{vo as default};
