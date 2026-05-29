import{_ as u,I as _,l as g,v as f,c as s,o as t,F as p,r as w,b as x,w as v,a as i,f as d,g as r,h as I,n as y,t as b,e as k,q as M}from"./ww16NeOw.js";const N={class:"portfolio-archive"},q={class:"portfolio-item-image-container"},z={class:"portfolio-item-image-wrapper"},B={class:"portfolio-item-title"},L={__name:"index",setup(C){const{setLoading:m}=_(),{data:l,pending:c}=g("portfolio",async()=>await $fetch("/api/sanity/query",{method:"POST",body:{query:`*[_type == "portfolio"] | order(orderRank) {
    _id,
    title,
    slug,
    featuredImage {
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
    featuredImageMobile {
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
  }`}}).then(o=>o?.result||[]).catch(()=>[]),{watch:[]});return f(c,a=>{m(a)},{immediate:!0}),(a,o)=>{const n=I,h=k;return t(),s("div",N,[(t(!0),s(p,null,w(M(l),e=>(t(),s("div",{key:e._id,class:"portfolio-item"},[x(h,{to:`/portfolio/${e.slug.current}`,class:"portfolio-item-link"},{default:v(()=>[i("div",q,[i("div",z,[e.featuredImage?.asset?(t(),d(n,{key:0,src:e.featuredImage.asset.url||"",width:Math.min(e.featuredImage.asset.metadata?.dimensions?.width||1800,1800),height:e.featuredImage.asset.metadata?.dimensions?.height,sizes:e.featuredImageMobile?.asset?"(min-width: 1000px) 33vw, 50vw":"(max-width: 799px) 100vw, (max-width: 999px) 50vw, 33vw",alt:"",class:y(["portfolio-item-image",e.featuredImageMobile?.asset?"is-desktop-archive-img":""])},null,8,["src","width","height","sizes","class"])):r("",!0),e.featuredImageMobile?.asset?(t(),d(n,{key:1,src:e.featuredImageMobile.asset.url||"",width:Math.min(e.featuredImageMobile.asset.metadata?.dimensions?.width||1800,1800),height:e.featuredImageMobile.asset.metadata?.dimensions?.height,sizes:"(max-width: 999px) 100vw, (min-width: 1000px) 33vw",alt:"",class:"portfolio-item-image is-mobile-archive-img"},null,8,["src","width","height"])):r("",!0)]),i("h3",B,b(e.title),1)])]),_:2},1032,["to"])]))),128))])}}},V=u(L,[["__scopeId","data-v-8ac53c4a"]]);export{V as default};
