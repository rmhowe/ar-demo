(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function l(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=l(t);fetch(t.href,e)}})();const v="modulepreload",I=function(n,r){return new URL(n,r).href},g={},f=function(r,l,i){if(!l||l.length===0)return r();const t=document.getElementsByTagName("link");return Promise.all(l.map(e=>{if(e=I(e,i),e in g)return;g[e]=!0;const o=e.endsWith(".css"),m=o?'[rel="stylesheet"]':"";if(!!i)for(let c=t.length-1;c>=0;c--){const u=t[c];if(u.href===e&&(!o||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${m}`))return;const s=document.createElement("link");if(s.rel=o?"stylesheet":v,o||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),o)return new Promise((c,u)=>{s.addEventListener("load",c),s.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>r())};const p=document.getElementById("demo");/android/i.test(navigator.userAgent)?p.innerHTML=`
    <a href="intent://arvr.google.com/scene-viewer/1.0?file=https://dl2.boxcloud.com/d/1/b1!V8IdHRAMy_xUh6MnQRaj4r4-DnwOV81B3vH71II_Ixt6qtvXd0NRPidjaKZWTMUkbGvAdtqydFQ2IDvxD391B3J6guwb174iY6mSOlOUwPljWOnxcQTTdue6Bi8bEsU0vfngcRr4h4lFhlMjvumIrSgEIrGCeWrqwjJ4yVp82pYgFdlTu4agaEh0X2hDrETZkZ01Q7eHSH0HqW7pHJISBSkKkrZZYWwSFD7GgWxdEfz44RRM3YSWbvDtUoFDpc5F3Zl8PcRQ6FtJa5e5lr7rFOU2XpEuQo-5WLx-KhQ6R3JzLkxlfXKMY00_5B4efkvycIEljLDWcW2JN2Ub_0Bf4shZVkUae2h7OLAcwHxqcu06jFH64P8eYQtlhY0UKmpHolXN8PUSesSYJz3VRBW-NoS2l38XjIQP0z3DGGjYIL38YTm9MdWjGdQq1KZQz8IIM9o3pAupqn5aa7PffU3si5At0AcnBM3EXP507HVoI56pdLmafFC4QrbK2o-DjrA5fT62dfC4VkanbtWOGG0mxZrUxh7TTIRwceiFduCmjOLBniPpHEJzxFcHPhWXbdqgvWsIMbqaUQRy3b1abz1CgVBIZbxk2fP_5hZpQuaQ58IVv-UceB8fot0NdXhrQqLAIy8l7wR_rNMqYe0xc-jIeIuKvj-IYFW6CklXd708ED22b1xWHlXV305JHAjhZnOrVM-sRxjAxEgvtM3IoXQ8yYb6JQ6MsFmddua_oxnZDtkFwNyDY3lHDkqKG9vNAgUVSX4AvM03st8obiS8VAUeCWuNoBgebGlJ2JhYuu3FzPGpF5tNLQ4y4j0MtiL9VaCMXMBG1Tb9FyWdKkGqOtvaQ2QP-blQ8VHSNdDsZRfCYvltoT1mS4gIXwpMSGgm9Ag1tsdCPJJN2j7SCJYgU3lRMoly_lYzAr9IT1-cz8iqg_CGnWTqmfC737X-AwWYKU1OiPpQELZtzqOsIhLTmWP8RpTNc-mUnY3-JSlKflKJTyrM5-iT9CjXD5hw2IOpIeA4VcE9xyKiWzIpoHi1DXhRTRwHewPRxAksgJrvtoUBZlUoghw_XNVMy5DlV1Uh15FVrfez6OcyIY4fZCkSwJEVfvT0CiqQCtOH20UvufWBykpXcoKsDr6v5jd5F8hC2cngQdJr9mCehuAqFVfLlpgd1bJCIyJ3yalroT6-3WskuMIkSFpSsWj0rAxk1IC1c7RQkDPwQMRUOtB0fdWVMDCsOyGhGvCOVMiKAQYq7TBLeGmw15zFlfZlSi1cCPQjgZsWjRjmi95Bid5ih2TGbegk7o2imt7e/download&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;">
      <img src="./thumbnail.png" />
    </a>
    <p>Tap the model to see it in AR</p>
  `:/iPad|iPhone|iPod/.test(navigator.userAgent)?p.innerHTML=`
    <a rel="ar" href="./MutantWaving.usdz">
      <img src="./thumbnail.png" />
    </a>`:y();async function y(){const n=await f(()=>import("./three.module-71d891b4.js"),[],import.meta.url),{GLTFLoader:r}=await f(()=>import("./GLTFLoader-55ecfdd3.js"),["./GLTFLoader-55ecfdd3.js","./three.module-71d891b4.js"],import.meta.url),{OrbitControls:l}=await f(()=>import("./OrbitControls-778f5ca2.js"),["./OrbitControls-778f5ca2.js","./three.module-71d891b4.js"],import.meta.url),i=new n.WebGLRenderer;i.setSize(window.innerWidth,window.innerHeight);const t=new n.Scene;t.background=new n.Color(2368548);const e=new n.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3),o=new l(e,i.domElement);document.body.appendChild(i.domElement);const m=new n.Clock;let d;const s=new n.AmbientLight(4210752,2);t.add(s);const c=new n.DirectionalLight(16777215,1.5);t.add(c),e.position.z=5,o.update(),new r().load("./MutantWaving.glb",function(a){t.add(a.scene),d=new n.AnimationMixer(a.scene),a.animations.forEach(w=>{d.clipAction(w).play()})},void 0,function(a){console.error(a)});function h(){requestAnimationFrame(h),o.update();const a=m.getDelta();d&&d.update(a),i.render(t,e)}h()}