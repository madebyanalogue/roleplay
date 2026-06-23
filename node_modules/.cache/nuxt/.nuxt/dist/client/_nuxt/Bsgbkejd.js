import{_ as Z,f as _,c as s,h as u,i as o,o as i,a,F as U,y as X,t as $,n as T,r as A,p as F,b as S,g as L,w as te,j as oe,T as Ge,G as R,q as $e,x as Te,N as We,m as He,k as Xe,E as xe,s as Ce,H as Ze,P as Ke,d as fe,e as Je}from"./Cb8-EniE.js";import{_ as Se,s as Qe}from"./BXvW38V6.js";const Ye={class:"portfolio-stats__table"},et={class:"portfolio-stats__dd"},tt={key:0,class:"portfolio-stats__lozenge orange white-text rounded-small fluid-type mono",style:{"--desktop":"16","--mobile":"12"}},ot={key:0,class:"portfolio-stats__arrow",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},it={class:"portfolio-stats__value-text"},lt={class:"portfolio-stats__label fluid-type",style:{"--desktop":"28","--mobile":"18"}},at={__name:"PortfolioStatsProject",props:{stats:{type:Array,default:()=>[]},rootClass:{type:String,default:""}},setup(r){const V=r,f=_(()=>(V.stats||[]).some(g=>g?.label||g?.value)),b=_(()=>(V.stats||[]).filter(g=>g?.label||g?.value));return(g,P)=>o(f)?(i(),s("div",{key:0,class:T(["portfolio-stats",r.rootClass])},[a("table",Ye,[a("tbody",null,[(i(!0),s(U,null,X(o(b),(y,n)=>(i(),s("tr",{key:y._key||n,class:"portfolio-stats__row"},[a("td",et,[y.value?(i(),s("span",tt,[y.icon==="arrowUp"?(i(),s("svg",ot,[...P[0]||(P[0]=[a("path",{d:"M0 8.98305L1.52649 10.5663L7.57831 4.30064V17.9661H9.74354V4.30064L15.7845 10.5775L17.3218 8.98305L8.66092 0L0 8.98305Z",fill:"currentColor"},null,-1)])])):u("",!0),a("span",it,$(y.value),1)])):u("",!0)]),a("td",lt,$(y.label),1)]))),128))])])],2)):u("",!0)}},st=Z(at,[["__scopeId","data-v-594acba9"]]),nt=["src","title"],rt={key:1,autoplay:"",muted:"",loop:"",playsinline:"",preload:"metadata",class:"portfolio-video-block-bg"},dt=["src","type"],ct={__name:"PortfolioVideoBlock",props:{block:{type:Object,required:!0},alt:{type:String,default:""}},emits:["image-load"],setup(r,{emit:V}){const f=r,b=V,g=A(!1);F(()=>f.block?._key,()=>{g.value=!1});function P(c){const d=String(c||"").trim();if(!d)return null;if(/^\d+$/.test(d))return d;let m=d.match(/vimeo\.com\/(?:video\/)?(\d+)/i);return m?m[1]:(m=d.match(/player\.vimeo\.com\/video\/(\d+)/i),m?m[1]:null)}function y(c){if(!c||typeof c!="string")return"video/mp4";const d=c.toLowerCase();return d.endsWith(".webm")?"video/webm":d.endsWith(".ogg")||d.endsWith(".ogv")?"video/ogg":"video/mp4"}function n(c){if(!c?.metadata?.dimensions)return null;const{width:d,height:m,aspectRatio:h}=c.metadata.dimensions;return d&&m?`${d} / ${m}`:h?`${h}`:null}const B=_(()=>f.block?.playbackMode!=="interactive"),v=_(()=>f.block?.videoSource!=="vimeo"?"":P(f.block?.videoVimeo)||""),j=A(null);F(v,async c=>{if(j.value=null,!!c)try{const d=await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${c}`)}`);if(!d.ok)return;const m=await d.json(),{width:h,height:M}=m;h>0&&M>0&&(j.value=`${h} / ${M}`)}catch{}},{immediate:!0});const x=_(()=>v.value?`https://player.vimeo.com/video/${v.value}?background=1&autoplay=1&muted=1&loop=1`:""),k=_(()=>B.value&&!v.value&&!!f.block?.video?.asset?.url),C=_(()=>B.value&&!!v.value),w=_(()=>{const c=n(f.block?.poster?.asset),d=j.value;if(f.block?.playbackMode==="interactive"&&c)return{"--portfolio-video-aspect":c,"--portfolio-video-aspect-mobile":c};const m=v.value&&d?d:"16 / 9",h=v.value?d||c||"16 / 9":c||"16 / 9";return{"--portfolio-video-aspect":m,"--portfolio-video-aspect-mobile":h}});return(c,d)=>{const m=oe,h=Se;return i(),s("div",{class:T(["portfolio-image-container portfolio-video-block-inner",{"portfolio-video-block-inner--natural-mobile":o(k),"portfolio-video-block-inner--natural-mobile-vimeo":o(C)}]),style:R(o(w))},[o(B)?(i(),s(U,{key:0},[o(v)?(i(),s("iframe",{key:0,src:o(x),class:"portfolio-video-block-bg",title:`${r.alt} background video`,allow:"autoplay; fullscreen; picture-in-picture",loading:"lazy"},null,8,nt)):r.block.video?.asset?.url?(i(),s("video",rt,[a("source",{src:r.block.video.asset.url,type:y(r.block.video.asset.url)},null,8,dt)])):u("",!0)],64)):(i(),s(U,{key:1},[S(Ge,{name:"portfolio-video-fade"},{default:te(()=>[o(g)?u("",!0):(i(),s("button",{key:0,type:"button",class:"portfolio-video-cta",onClick:d[1]||(d[1]=M=>g.value=!0)},[r.block.poster?.asset?.url?(i(),L(m,{key:0,src:r.block.poster.asset.url,alt:`${r.alt} video poster`,fit:"cover",class:"portfolio-video-poster",onLoad:d[0]||(d[0]=M=>b("image-load"))},null,8,["src","alt"])):u("",!0),d[2]||(d[2]=a("span",{class:"portfolio-video-cta__play","aria-hidden":"true"},"Play",-1)),d[3]||(d[3]=a("span",{class:"sr-only"},"Play video with sound",-1))]))]),_:1}),o(g)&&o(v)?(i(),L(h,{key:`video-vimeo-${r.block._key||"block"}-${o(v)}`,type:"vimeo","vimeo-id":o(v),autoplay:!0,muted:!1,fill:""},null,8,["vimeo-id"])):o(g)&&r.block.video?.asset?.url?(i(),L(h,{key:`video-mp4-${r.block._key||"block"}-${r.block.video.asset.url}`,type:"html5",src:r.block.video.asset.url,autoplay:!0,muted:!1,fill:""},null,8,["src"])):u("",!0)],64))],6)}}},ut=Object.assign(Z(ct,[["__scopeId","data-v-a75c30d5"]]),{__name:"PortfolioVideoBlock"}),mt={key:0,class:"portfolio-gallery","data-click-zoom-article":""},pt={__name:"PortfolioGallery",props:{images:{type:Array,required:!0},timing:{type:Number,default:1e3},alt:{type:String,default:""}},setup(r){const V=r,f=A(0);let b=null;const g=()=>{if(V.images.length<=1){f.value=0;return}b=Qe(()=>{f.value=(f.value+1)%V.images.length},V.timing)},P=()=>{b&&(clearInterval(b),b=null)};return $e(()=>{g()}),Te(()=>{P()}),F(()=>V.images,()=>{P(),f.value=0,g()},{deep:!0}),F(()=>V.timing,()=>{P(),g()}),(y,n)=>{const B=oe;return r.images&&r.images.length>0?(i(),s("div",mt,[(i(!0),s(U,null,X(r.images,(v,j)=>(i(),s("div",{key:j,class:T(["portfolio-gallery-image",{"portfolio-gallery-image-active":j===f.value}])},[v?.asset?(i(),L(B,{key:0,src:v.asset.url||"",alt:r.alt||"Gallery image",class:"portfolio-gallery-img"},null,8,["src","alt"])):u("",!0)],2))),128))])):u("",!0)}}},Ae=Object.assign(Z(pt,[["__scopeId","data-v-62eac4df"]]),{__name:"PortfolioGallery"}),ft=["src","title"],vt={key:1,autoplay:"",muted:"",loop:"",playsinline:"",class:"portfolio-two-column-video"},gt=["src","type"],yt={__name:"PortfolioTwoColumnCell",props:{columnType:{type:String,default:"image"},image:{type:Object,default:null},images:{type:Array,default:()=>[]},timing:{type:Number,default:1e3},videoSource:{type:String,default:"file"},video:{type:Object,default:null},videoVimeo:{type:String,default:""},alt:{type:String,default:""},getImageAspectRatio:{type:Function,required:!0}},emits:["image-load"],setup(r,{emit:V}){const f=r,b=V;function g(x){const k=String(x||"").trim();if(!k)return null;if(/^\d+$/.test(k))return k;let C=k.match(/vimeo\.com\/(?:video\/)?(\d+)/i);return C?C[1]:(C=k.match(/player\.vimeo\.com\/video\/(\d+)/i),C?C[1]:null)}function P(x){if(!x||typeof x!="string")return"video/mp4";const k=x.toLowerCase();return k.endsWith(".webm")?"video/webm":k.endsWith(".ogg")||k.endsWith(".ogv")?"video/ogg":"video/mp4"}const y=_(()=>f.columnType!=="video"||f.videoSource!=="vimeo"?"":g(f.videoVimeo)||""),n=_(()=>y.value?`https://player.vimeo.com/video/${y.value}?background=1&autoplay=1&muted=1&loop=1`:""),B=_(()=>f.columnType!=="video"?!1:y.value?!0:!!f.video?.asset?.url),v=A(null);F(y,async x=>{if(v.value=null,!!x)try{const k=await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${x}`)}`);if(!k.ok)return;const C=await k.json(),{width:w,height:c}=C;w>0&&c>0&&(v.value=`${w} / ${c}`)}catch{}},{immediate:!0});const j=_(()=>!y.value||!v.value?{}:{"--portfolio-two-column-video-aspect":v.value});return(x,k)=>{const C=Ae,w=oe;return r.columnType==="gallery"&&r.images&&r.images.length>0?(i(),L(C,{key:0,images:r.images,timing:r.timing||1e3,alt:r.alt},null,8,["images","timing","alt"])):r.columnType==="image"&&r.image?.asset?(i(),s("div",{key:1,"data-click-zoom":"",class:"portfolio-image-container",style:R(r.getImageAspectRatio(r.image.asset))},[S(w,{src:r.image.asset.url||"",alt:r.alt,fit:"cover",width:r.image.asset.metadata?.dimensions?.width,height:r.image.asset.metadata?.dimensions?.height,class:"portfolio-image",onLoad:k[0]||(k[0]=c=>b("image-load"))},null,8,["src","alt","width","height"])],4)):r.columnType==="video"&&o(B)?(i(),s("div",{key:2,class:T(["portfolio-image-container portfolio-two-column-video-container",{"portfolio-two-column-video-container--vimeo":!!o(y)}]),style:R(o(j))},[o(y)?(i(),s("iframe",{key:0,src:o(n),class:"portfolio-two-column-vimeo",title:`${r.alt} background video`,allow:"autoplay; fullscreen; picture-in-picture",loading:"lazy"},null,8,ft)):r.video?.asset?.url?(i(),s("video",vt,[a("source",{src:r.video.asset.url,type:P(r.video.asset.url)},null,8,gt)])):u("",!0)],6)):u("",!0)}}},ht=Object.assign(Z(yt,[["__scopeId","data-v-a8d784f9"]]),{__name:"PortfolioTwoColumnCell"}),_t={class:"portfolio-detail"},kt={key:0,class:"portfolio-loading"},wt={key:1,class:"portfolio-error"},bt={key:2},Vt={class:"portfolio-layout portfolio-fade-in"},xt={class:"hide-md pad-30 pad-top"},Ct={class:"grid gap-50"},It={class:"portfolio-title portfolio-title-full fluid-type",style:{"--desktop":"54","--mobile":"40"}},$t={class:"portfolio-layout__sidebar rounded-portfolio white pad-30"},Tt={class:"portfolio-sidebar-stack"},St={class:"portfolio-sidebar-stack__middle"},At={class:"portfolio-sidebar-stack__body gap-30"},Lt={class:"portfolio-title portfolio-title-full fluid-type show-md",style:{"--desktop":"54","--mobile":"40"}},Pt={key:0,class:"portfolio-accordion"},Rt=["tabindex","aria-expanded"],Bt={class:"portfolio-accordion-panel-inner"},jt={class:"portfolio-accordion-panel fluid-type",style:{"--desktop":"26","--mobile":"18"}},Nt={key:1,class:"portfolio-accordion"},Mt=["tabindex","aria-expanded"],Et={class:"portfolio-accordion-panel-inner"},qt={class:"portfolio-accordion-panel fluid-type",style:{"--desktop":"24","--mobile":"18"}},Ft={key:2,class:"portfolio-accordion"},Ot=["tabindex","aria-expanded"],Dt={class:"portfolio-accordion-panel-inner"},Ut={class:"portfolio-accordion-panel pad-top fluid-type",style:{"--desktop":"24","--mobile":"18"}},zt=["aria-expanded"],Gt={class:"portfolio-hear-btn__video-inner portfolio-image-container"},Wt={class:"portfolio-layout__main"},Ht={class:"portfolio-content"},Xt={key:0,class:"portfolio-image-block rounded-portfolio"},Zt={key:1,class:"portfolio-video-block rounded-portfolio"},Kt={key:2,class:"portfolio-testimonial-block rounded-portfolio beige grid gap-50 pad-30 pad-md-50"},Jt={class:"subtitle subtitle--square white-dot portfolio-testimonial-subtitle"},Qt={key:0,class:"portfolio-testimonial-quote fluid-type pad-md-60 pad-right",style:{"--desktop":"60","--mobile":"30"}},Yt={key:1,class:"portfolio-testimonial-attribution fluid-type",style:{"--desktop":"24","--mobile":"18"}},eo={key:0},to={key:1},oo={key:3,class:"portfolio-services-block rounded-portfolio beige grid gap-60 pad-30"},io={class:"subtitle subtitle--circle orange-dot portfolio-services-subtitle"},lo={class:"portfolio-services-columns fluid-type pad-40 pad-bottom",style:{"--desktop":"50","--mobile":"24"}},ao={key:4,class:"portfolio-cards-block"},so={class:"portfolio-cards-item__grid"},no={class:"portfolio-cards-item__text underline-links"},ro={key:0,class:"portfolio-cards-item__title"},co={class:"portfolio-cards-item__media"},uo={key:0,autoplay:"",muted:"",loop:"",playsinline:"",class:"portfolio-cards-item__video"},mo=["src","type"],po={key:5,class:"portfolio-text-block rounded-portfolio beige underline-links pad-30"},fo={key:6,class:"portfolio-gallery-block rounded-portfolio"},vo={key:7,class:""},go={class:"portfolio-two-column-block"},yo={key:8,class:"portfolio-two-column-gallery-block"},ho={key:0,class:"portfolio-next-project rounded-portfolio yellow pad-30 portfolio-fade-in"},_o={class:"portfolio-next-project__info"},ko={class:"subtitle"},wo={class:"portfolio-next-project__actions"},bo={key:3,class:"portfolio-not-found rounded-portfolio beige pad-30"},Vo=550,xo=400,Ie=999,Co={__name:"[slug]",setup(r){const V=We(),{setLoading:f}=He(),{singlePortfolioNextProjectSettings:b,portfolioProjectPath:g}=Xe();function P(e){if(!e||typeof e!="string")return null;const l=e.trim();if(/^\d+$/.test(l))return l;let p=l.match(/vimeo\.com\/(?:video\/)?(\d+)/i);return p?p[1]:(p=l.match(/player\.vimeo\.com\/video\/(\d+)/i),p?p[1]:null)}const y=_(()=>{const e=V.params.slug;return e?Array.isArray(e)?e[0]:e:V.path.replace(/^\/work\/?/,"")||null}),{data:n,pending:B,error:v}=xe(()=>`portfolio-${V.path}`,async()=>y.value?await $fetch("/api/sanity/query",{method:"POST",body:{query:`*[_type == "portfolio" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      role,
      play,
      results,
      resultsStats,
      clientVideoSource,
      clientVideoVimeo,
      clientVideo {
        asset-> {
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
    }`,params:{slug:y.value}}}).then(l=>l?.result||null).catch(()=>null):null,{watch:[y]}),{data:j}=xe("portfolio-next-projects",async()=>await $fetch("/api/sanity/query",{method:"POST",body:{query:`*[_type == "portfolio"] | order(orderRank) {
      _id,
      title,
      slug
    }`}}).then(l=>l?.result||[]).catch(()=>[]),{watch:[]}),x=_(()=>{const e=n.value,l=j.value;if(!e?.slug?.current||!Array.isArray(l)||l.length===0)return null;const p=l.findIndex(q=>q?.slug?.current===e.slug.current);if(p===-1)return l[0]||null;const N=(p+1)%l.length;return l[N]||null}),k=_(()=>!!x.value&&b.value?.enabled!==!1),C=_(()=>{const e=n.value;return!e||e.clientVideoSource!=="vimeo"?"":P(e.clientVideoVimeo||"")||""}),w=A(!1),c=A(!1),d=A(!1),m=A(!1),h=A(!1),M=A(null),ie=A(!1);let W=null,O=null;function z(){W&&(clearTimeout(W),W=null),O&&(clearTimeout(O),O=null)}function K(){z(),W=setTimeout(()=>{W=null,c.value&&m.value&&!d.value&&w.value&&(d.value=!0,h.value=!1),!c.value&&!d.value&&(m.value=!1,w.value=!1,h.value=!1)},Vo+50)}function Le(){O&&clearTimeout(O),O=setTimeout(()=>{O=null,!d.value&&m.value&&c.value&&(c.value=!1,w.value=!1,K())},xo+50)}const Pe=_(()=>{const e=n.value;if(!e)return 16/9;const l=e.clientVideo?.asset?.metadata?.dimensions;return l?.aspectRatio?l.aspectRatio:l?.width&&l?.height?l.width/l.height:16/9});function ve(){z(),w.value=!1,c.value=!1,d.value=!1,m.value=!1,h.value=!1}function Re(){if(!(m.value||h.value)){if(ie.value){m.value=!0,w.value=!0,c.value=!0,d.value=!0;return}h.value=!0,m.value=!0,w.value=!0,Ce(()=>{requestAnimationFrame(()=>{c.value=!0,K()})})}}function le(){if(!(!m.value||h.value)){if(ie.value){ve();return}if(h.value=!0,d.value){d.value=!1,Le();return}c.value=!1,w.value=!1,K()}}function Be(){if(m.value){le();return}Re()}function je(e){if(!(e.target!==e.currentTarget||e.propertyName!=="grid-template-rows")){if(c.value&&m.value&&!d.value&&w.value){z(),d.value=!0,h.value=!1;return}!c.value&&!d.value&&(z(),m.value=!1,w.value=!1,h.value=!1)}}function Ne(e){e.target!==e.currentTarget||e.propertyName!=="opacity"||!d.value&&m.value&&c.value&&(z(),c.value=!1,w.value=!1,K())}F(y,()=>{ve()});function J(e){return Array.isArray(e)&&e.length>0}function ge(e){return e?J(e.role)?"role":J(e.play)?"play":J(e.results)||J(e.resultsStats)?"results":null:null}const Q=A(null),ae=_(()=>Q.value??ge(n.value??null));F(()=>n.value?._id,()=>{Q.value=null});const E=A(!1),se=A(!1);function ye(){E.value=window.matchMedia(`(max-width: ${Ie}px)`).matches}function ne(e){return ae.value===e}function re(e){return E.value?!0:ae.value===e}function de(e){if(E.value)return;const l=ge(n.value??null);if(ae.value===e){Q.value=l??null;return}Q.value=e}const Me=_(()=>n.value?C.value?!0:!!n.value.clientVideo?.asset?.url:!1),Ee=_(()=>Array.isArray(n.value?.contentBlocks)?n.value.contentBlocks:[]);function qe(e){return e!==0}function he(e){!m.value||!M.value||M.value.contains(e.target)||le()}function _e(e){e.key==="Escape"&&m.value&&le()}F(B,e=>{f(e)},{immediate:!0});const H=e=>{if(e?.metadata?.dimensions){const{width:l,height:p,aspectRatio:N}=e.metadata.dimensions;if(N)return{aspectRatio:`${N}`};if(l&&p)return{aspectRatio:`${l/p}`}}return{aspectRatio:"4 / 3"}},D=e=>{e?.target&&e.target.classList.add("loaded")};function Fe(e){return!e||typeof e!="string"?[]:e.split(/\r?\n/).map(l=>l.trim()).filter(Boolean)}function Oe(e){return!e||e._type!=="videoBlock"||e.videoSource!=="vimeo"?"":P(e.videoVimeo||"")||""}function De(e){return!e||e._type!=="videoBlock"?!1:Oe(e)?!0:!!e.video?.asset?.url}function Ue(e){if(!e||typeof e!="string")return"video/mp4";const l=e.toLowerCase();return l.endsWith(".webm")?"video/webm":l.endsWith(".ogg")||l.endsWith(".ogv")?"video/ogg":"video/mp4"}function ke(e){if(!e||typeof e!="string")return null;const l=e.trim();if(!l)return null;const p=l.split("/").map(G=>G.trim()).filter(Boolean);if(p.length!==2)return null;const N=Number.parseFloat(p[0]),q=Number.parseFloat(p[1]);return!Number.isFinite(N)||!Number.isFinite(q)||N<=0||q<=0?null:`${N} / ${q}`}function Y(e){const l=ke(e?.columnAspectRatio);return l?{"--portfolio-col-aspect":l}:{}}function ee(e){return ke(e?.columnAspectRatio)!=null}function we(){const e=E.value;ye(),e&&!E.value&&(se.value=!0,requestAnimationFrame(()=>{requestAnimationFrame(()=>{se.value=!1})}))}let be=()=>{};return $e(()=>{{ie.value=window.matchMedia("(prefers-reduced-motion: reduce)").matches,ye();const e=window.matchMedia(`(max-width: ${Ie}px)`);e.addEventListener("change",we),be=()=>e.removeEventListener("change",we),document.addEventListener("pointerdown",he,!0),document.addEventListener("keydown",_e),Ce(()=>{document.querySelectorAll(".portfolio-image").forEach(p=>{p.complete&&p.naturalHeight>0&&p.classList.add("loaded")})})}}),Te(()=>{z(),be(),document.removeEventListener("pointerdown",he,!0),document.removeEventListener("keydown",_e)}),(e,l)=>{const p=Ze,N=st,q=Se,G=oe,ze=ut,ce=Ae,Ve=ht,ue=Je;return i(),s("div",_t,[o(B)?(i(),s("div",kt)):o(v)?(i(),s("div",wt,[a("p",null,"Error loading portfolio: "+$(o(v).message),1)])):o(n)?(i(),s("div",bt,[l[10]||(l[10]=a("div",{class:"sticky-corner-portfolio-strip"},null,-1)),a("div",Vt,[a("div",xt,[a("div",Ct,[a("h1",It,$(o(n).title),1)])]),a("aside",$t,[l[7]||(l[7]=a("div",{class:"sticky-corner"},null,-1)),a("div",Tt,[a("div",St,[a("div",At,[a("h1",Lt,$(o(n).title),1),o(n).role?.length||o(n).play?.length||o(n).results?.length||o(n).resultsStats?.length?(i(),s("div",{key:0,class:T(["portfolio-accordions",{"portfolio-accordions--no-transition":o(se)}])},[o(n).role?.length?(i(),s("div",Pt,[a("button",{id:"accordion-heading-role",type:"button",class:"portfolio-accordion-summary",tabindex:o(E)?-1:0,"aria-expanded":re("role"),"aria-controls":"accordion-panel-role",onClick:l[0]||(l[0]=t=>de("role"))},[...l[3]||(l[3]=[a("span",{class:"subtitle subtitle--circle orange-dot"},"Role",-1)])],8,Rt),a("div",{id:"accordion-panel-role",class:T(["portfolio-accordion-panel-outer",{"portfolio-accordion-panel-outer--open":ne("role")}]),role:"region","aria-labelledby":"accordion-heading-role"},[a("div",Bt,[a("div",jt,[S(p,{blocks:o(n).role},null,8,["blocks"])])])],2)])):u("",!0),o(n).play?.length?(i(),s("div",Nt,[a("button",{id:"accordion-heading-play",type:"button",class:"portfolio-accordion-summary",tabindex:o(E)?-1:0,"aria-expanded":re("play"),"aria-controls":"accordion-panel-play",onClick:l[1]||(l[1]=t=>de("play"))},[...l[4]||(l[4]=[a("span",{class:"subtitle subtitle--square twisted orange-dot"},"Play",-1)])],8,Mt),a("div",{id:"accordion-panel-play",class:T(["portfolio-accordion-panel-outer",{"portfolio-accordion-panel-outer--open":ne("play")}]),role:"region","aria-labelledby":"accordion-heading-play"},[a("div",Et,[a("div",qt,[S(p,{blocks:o(n).play},null,8,["blocks"])])])],2)])):u("",!0),o(n).results?.length||o(n).resultsStats?.length?(i(),s("div",Ft,[a("button",{id:"accordion-heading-results",type:"button",class:"portfolio-accordion-summary",tabindex:o(E)?-1:0,"aria-expanded":re("results"),"aria-controls":"accordion-panel-results",onClick:l[2]||(l[2]=t=>de("results"))},[...l[5]||(l[5]=[a("span",{class:"subtitle subtitle--circle orange-dot"},"Results",-1)])],8,Ot),a("div",{id:"accordion-panel-results",class:T(["portfolio-accordion-panel-outer",{"portfolio-accordion-panel-outer--open":ne("results")}]),role:"region","aria-labelledby":"accordion-heading-results"},[a("div",Dt,[a("div",Ut,[o(n).results?.length?(i(),L(p,{key:0,blocks:o(n).results},null,8,["blocks"])):u("",!0),o(n).resultsStats?.length?(i(),L(N,{key:1,stats:o(n).resultsStats,"root-class":"portfolio-results-stats gap-20"},null,8,["stats"])):u("",!0)])])],2)])):u("",!0)],2)):u("",!0)])]),o(Me)?(i(),s("div",{key:0,ref_key:"clientVideoLaunchRef",ref:M,class:"portfolio-sidebar-stack__footer"},[a("div",{class:T(["portfolio-video-launch",{"portfolio-video-launch--expanded":o(c)}])},[a("button",{type:"button",class:T(["portfolio-hear-btn portfolio-hear-btn--launch gap-bounce-hover fluid-type mono lavender",{"portfolio-hear-btn--expanded":o(c),"portfolio-hear-btn--video-visible":o(d)}]),style:R({"--desktop":"18","--mobile":"14","--client-video-aspect":o(Pe)}),"aria-expanded":o(w),"aria-controls":"portfolio-client-video-panel",onClick:Be},[l[6]||(l[6]=Ke('<span class="portfolio-hear-btn__row" data-v-c44286fd><span class="subtitle subtitle--circle orange-dot" data-v-c44286fd>Client says</span><div class="orange-text pad-20 pad-left" data-v-c44286fd><svg class="portfolio-hear-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="none" aria-hidden="true" data-v-c44286fd><path fill="currentColor" d="M0.270896 13.5043L11.9361 1.83905L2.51334 1.83905C2.38258 1.85469 2.24999 1.84216 2.12448 1.80231C1.99897 1.76246 1.88343 1.6962 1.78565 1.608C1.68787 1.51979 1.61009 1.41168 1.55756 1.29093C1.50502 1.17017 1.47894 1.03957 1.48106 0.907898C1.48319 0.776227 1.51347 0.646535 1.56987 0.527537C1.62627 0.408538 1.70749 0.30299 1.80807 0.217985C1.90865 0.132979 2.02626 0.0704848 2.15299 0.0347015C2.27973 -0.00108239 2.41265 -0.00932503 2.54283 0.0105246L14.1923 0.0105213C14.3141 0.0078327 14.4351 0.0298347 14.5482 0.0751989C14.6612 0.120563 14.7639 0.188354 14.85 0.274477C14.9361 0.3606 15.0039 0.463272 15.0493 0.576306C15.0946 0.68934 15.1166 0.81039 15.1139 0.932156L15.1139 12.5816C15.1148 12.7039 15.0913 12.825 15.0449 12.9381C14.9985 13.0512 14.9301 13.1539 14.8437 13.2404C14.7572 13.3268 14.6545 13.3952 14.5414 13.4416C14.4283 13.488 14.3072 13.5115 14.1849 13.5106C13.9397 13.5069 13.7056 13.4078 13.5322 13.2344C13.3588 13.0609 13.2597 12.8268 13.2559 12.5816L13.2486 3.15145L1.5833 14.8167C1.40861 14.9875 1.1736 15.0825 0.929272 15.0812C0.684948 15.0798 0.451024 14.9821 0.278269 14.8093C0.190835 14.7248 0.121168 14.6237 0.0733622 14.5119C0.025557 14.4002 0.000577941 14.2799 -0.000109264 14.1584C-0.000796447 14.0368 0.0228239 13.9163 0.0693633 13.804C0.115903 13.6916 0.184423 13.5898 0.270896 13.5043Z" data-v-c44286fd></path></svg></div></span>',1)),o(m)?(i(),s("div",{key:0,id:"portfolio-client-video-panel",class:"portfolio-hear-btn__video-panel",role:"region","aria-label":"Client video",onTransitionend:je},[a("div",Gt,[a("div",{class:"portfolio-hear-btn__video-media",onTransitionend:Ne},[o(C)?(i(),L(q,{key:`client-vimeo-${o(C)}`,type:"vimeo","vimeo-id":o(C),fill:""},null,8,["vimeo-id"])):o(n).clientVideo?.asset?.url?(i(),L(q,{key:`client-mp4-${o(n).clientVideo.asset.url}`,type:"html5",src:o(n).clientVideo.asset.url,fill:""},null,8,["src"])):u("",!0)],32)])],32)):u("",!0)],14,zt)],2)],512)):u("",!0)])]),a("div",Wt,[l[9]||(l[9]=a("div",{class:"portfolio-layout__main-mask"},null,-1)),a("div",Ht,[(i(!0),s(U,null,X(o(Ee),(t,me)=>(i(),s("div",{key:t._key||me,class:T(["portfolio-content-block",{"portfolio-fade-in":qe(me)}]),style:R({transitionDelay:`${(me+1)*.1}s`})},[t._type==="imageBlock"&&t.image?.asset?(i(),s("div",Xt,[a("div",{"data-click-zoom":"",class:"portfolio-image-container",style:R(H(t.image.asset))},[S(G,{src:t.image.asset.url||"",alt:o(n).title,width:t.image.asset.metadata?.dimensions?.width,height:t.image.asset.metadata?.dimensions?.height,class:"portfolio-image",onLoad:D},null,8,["src","alt","width","height"])],4)])):t._type==="videoBlock"&&De(t)?(i(),s("div",Zt,[S(ze,{block:t,alt:o(n).title,onImageLoad:D},null,8,["block","alt"])])):t._type==="testimonialBlock"?(i(),s("div",Kt,[a("div",Jt,$(t.subtitle||"Testimonial"),1),t.testimonial?(i(),s("blockquote",Qt," “"+$(t.testimonial)+"” ",1)):u("",!0),t.name||t.company?(i(),s("footer",Yt,[t.name?(i(),s("div",eo,$(t.name),1)):u("",!0),t.company?(i(),s("div",to,$(t.company),1)):u("",!0)])):u("",!0)])):t._type==="servicesBlock"&&t.body?(i(),s("div",oo,[a("div",io,$(t.title||"Services"),1),a("div",lo,[(i(!0),s(U,null,X(Fe(t.body),(I,pe)=>(i(),s("div",{key:pe,class:"portfolio-services-line"},$(I),1))),128))])])):t._type==="cardsBlock"&&t.cards?.length?(i(),s("div",ao,[(i(!0),s(U,null,X(t.cards,(I,pe)=>(i(),s("article",{key:I._key||pe,class:"portfolio-cards-item rounded-portfolio"},[a("div",so,[a("div",no,[I.title?(i(),s("h3",ro,$(I.title),1)):u("",!0),I.description?.length?(i(),L(p,{key:1,blocks:I.description},null,8,["blocks"])):u("",!0)]),a("div",co,[I.mediaType==="video"&&I.video?.asset?.url?(i(),s("video",uo,[a("source",{src:I.video.asset.url,type:Ue(I.video.asset.url)},null,8,mo)])):I.image?.asset?.url?(i(),L(G,{key:1,src:I.image.asset.url,alt:I.title||o(n).title,width:I.image.asset.metadata?.dimensions?.width,height:I.image.asset.metadata?.dimensions?.height,class:"portfolio-cards-item__image",onLoad:D},null,8,["src","alt","width","height"])):u("",!0)])])]))),128))])):t._type==="textBlock"&&t.text?(i(),s("div",po,[S(p,{blocks:t.text},null,8,["blocks"])])):t._type==="galleryBlock"&&t.images&&t.images.length>0?(i(),s("div",fo,[S(ce,{images:t.images,timing:t.timing||1e3,alt:o(n).title},null,8,["images","timing","alt"])])):t._type==="twoColumnBlock"?(i(),s("div",vo,[l[8]||(l[8]=a("div",{class:"sticky-corner-two-columns"},null,-1)),a("div",go,[a("div",{class:T(["portfolio-two-column-image rounded-portfolio",{"portfolio-column-media--desktop-aspect":ee(t)}]),style:R(Y(t))},[S(Ve,{"column-type":t.column1Type,image:t.image1,images:t.column1Images,timing:t.column1Timing,"video-source":t.column1VideoSource,video:t.column1Video,"video-vimeo":t.column1VideoVimeo,alt:o(n).title,"get-image-aspect-ratio":H,onImageLoad:D},null,8,["column-type","image","images","timing","video-source","video","video-vimeo","alt"])],6),a("div",{class:T(["portfolio-two-column-image rounded-portfolio",{"portfolio-column-media--desktop-aspect":ee(t)}]),style:R(Y(t))},[S(Ve,{"column-type":t.column2Type,image:t.image2,images:t.column2Images,timing:t.column2Timing,"video-source":t.column2VideoSource,video:t.column2Video,"video-vimeo":t.column2VideoVimeo,alt:o(n).title,"get-image-aspect-ratio":H,onImageLoad:D},null,8,["column-type","image","images","timing","video-source","video","video-vimeo","alt"])],6)])])):t._type==="twoColumnGalleryBlock"?(i(),s("div",yo,[a("div",{class:T(["portfolio-two-column-gallery-column rounded-portfolio",{"portfolio-column-media--desktop-aspect":ee(t)}]),style:R(Y(t))},[t.leftImages&&t.leftImages.length>1?(i(),L(ce,{key:0,images:t.leftImages,timing:t.leftTiming||1e3,alt:o(n).title},null,8,["images","timing","alt"])):t.leftImages&&t.leftImages.length===1&&t.leftImages[0]?.asset?(i(),s("div",{key:1,"data-click-zoom":"",class:"portfolio-image-container",style:R(H(t.leftImages[0].asset))},[S(G,{src:t.leftImages[0].asset.url||"",alt:o(n).title,fit:"cover",width:t.leftImages[0].asset.metadata?.dimensions?.width,height:t.leftImages[0].asset.metadata?.dimensions?.height,class:"portfolio-image",onLoad:D},null,8,["src","alt","width","height"])],4)):u("",!0)],6),a("div",{class:T(["portfolio-two-column-gallery-column rounded-portfolio",{"portfolio-column-media--desktop-aspect":ee(t)}]),style:R(Y(t))},[t.rightImages&&t.rightImages.length>1?(i(),L(ce,{key:0,images:t.rightImages,timing:t.rightTiming||1e3,alt:o(n).title},null,8,["images","timing","alt"])):t.rightImages&&t.rightImages.length===1&&t.rightImages[0]?.asset?(i(),s("div",{key:1,"data-click-zoom":"",class:"portfolio-image-container",style:R(H(t.rightImages[0].asset))},[S(G,{src:t.rightImages[0].asset.url||"",alt:o(n).title,fit:"cover",width:t.rightImages[0].asset.metadata?.dimensions?.width,height:t.rightImages[0].asset.metadata?.dimensions?.height,class:"portfolio-image",onLoad:D},null,8,["src","alt","width","height"])],4)):u("",!0)],6)])):u("",!0)],6))),128)),o(k)?(i(),s("div",ho,[a("div",_o,[a("div",ko,$(o(b).nextUpSubtitle),1),S(ue,{to:o(g)(o(x).slug),class:"portfolio-next-project__title fluid-type",style:{"--desktop":"72","--mobile":"40"}},{default:te(()=>[fe($(o(x).title),1)]),_:1},8,["to"])]),a("div",wo,[S(ue,{to:o(g)(o(x).slug),class:"next--button fluid-type",style:{"--desktop":"24","--mobile":"18","--background-color":"var(--white)","--color":"var(--black)","--border-color":"var(--white)"}},{default:te(()=>[fe($(o(b).viewProjectButtonTitle),1)]),_:1},8,["to"]),o(b).backLink?(i(),L(ue,{key:0,to:o(b).backLink.path,class:"next--button outline fluid-type",style:{"--desktop":"24","--mobile":"18","--background-color":"transparent","--color":"var(--black)","--border-color":"var(--black)"}},{default:te(()=>[fe($(o(b).backLink.title),1)]),_:1},8,["to"])):u("",!0)])])):u("",!0)])])])])):(i(),s("div",bo,[...l[11]||(l[11]=[a("p",null,"Portfolio project not found",-1)])]))])}}},To=Z(Co,[["__scopeId","data-v-c44286fd"]]);export{To as default};
