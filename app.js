/* app.js — Cinematic scroll-driven rank experience */
(function(){
"use strict";
var PR=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
function $(s,c){return(c||document).querySelector(s)}
function $$(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!==undefined)e.innerHTML=h;return e}
function gcr(cat){return ranks.filter(function(r){return r.category===cat}).sort(function(a,b){return a.order-b.order})}
function absTop(el){var t=0;while(el){t+=el.offsetTop;el=el.offsetParent}return t}
var FA_DIGITS={0:"\u06f0",1:"\u06f1",2:"\u06f2",3:"\u06f3",4:"\u06f4",5:"\u06f5",6:"\u06f6",7:"\u06f7",8:"\u06f8",9:"\u06f9"};
function faNu(n){return String(n).replace(/[0-9]/g,function(d){return FA_DIGITS[d]})}

/* === i18n === */
var LANG=localStorage.getItem("lang")||"fa";
var I18N={
  heroLabel:{fa:"ارتش جمهوری اسلامی ایران",en:"Islamic Republic of Iran Army"},
  heroTitle:{fa:"درجات <span>ارتش جمهوری اسلامی ایران</span>",en:"<span>Ranks of the</span> Islamic Republic of Iran Army"},
  heroSub:{fa:"شناخت درجات، سلسله‌مراتب و ساختار فرماندهی ارتش — از سرباز تا ارتشبد",en:"Understanding ranks, hierarchy and command structure of the Army — from Private to Army General"},
  scrollText:{fa:"کاوش",en:"EXPLORE"},
  overviewLabel:{fa:"نمای کلی",en:"OVERVIEW"},
  overviewTitle:{fa:"سلسله‌مراتب درجات نظامی",en:"Military Rank Hierarchy"},
  overviewDesc:{fa:"ارتش جمهوری اسلامی ایران دارای ۲۲ درجه نظامی در پنج گروه اصلی است: سربازان، درجه‌داران، افسران جزء، افسران ارشد و امیران. هر درجه نشان‌دهنده سطح تخصص، مسئولیت و اقتدار فرماندهی فرد در سلسله‌مراتب نظامی است.",en:"The Islamic Republic of Iran Army has 22 military ranks in five main groups: Enlisted, NCOs, Junior Officers, Senior Officers, and General Officers. Each rank represents a level of expertise, responsibility and command authority."},
  mediaLabel:{fa:"رسانه",en:"MEDIA"},
  mediaTitle:{fa:"آشنایی با درجات ارتش",en:"About Army Ranks"},
  mediaDesc:{fa:"ویدئوی آشنایی با ساختار درجات و سلسله‌مراتب فرماندهی ارتش جمهوری اسلامی ایران",en:"Video introduction to the rank structure and command hierarchy of the Islamic Republic of Iran Army"},
  mediaPlayLabel:{fa:"آشنایی با درجات ارتش",en:"About Army Ranks"},
  hierarchyLabel:{fa:"سلسله‌مراتب",en:"HIERARCHY"},
  hierarchyTitle:{fa:"سلسله‌مراتب درجات",en:"Rank Hierarchy"},
  hierarchyDesc:{fa:"سفر از پایین‌ترین درجه تا عالی‌ترین سطح فرماندهی نظامی",en:"Journey from the lowest rank to the highest level of military command"},
  structureLabel:{fa:"ساختار",en:"STRUCTURE"},
  structureTitle:{fa:"ساختار سلسله‌مراتبی",en:"Hierarchical Structure"},
  structureDesc:{fa:"نگاهی به سطوح مختلف فرماندهی و سازمان‌دهی نیروهای مسلح",en:"An overview of different levels of command and organization of the armed forces"},
  footerText:{fa:"درجات ارتش جمهوری اسلامی ایران — اطلاعات بر اساس منابع عمومی",en:"Ranks of the Islamic Republic of Iran Army — Information based on public sources"},
  navMokaddame:{fa:"مقدمه",en:"Overview"},
  navSarbazan:{fa:"سربازان",en:"Enlisted"},
  navDarjedaran:{fa:"درجه‌داران",en:"NCOs"},
  navAfseranJazeh:{fa:"افسران جزء",en:"Junior Officers"},
  navAfseranArshad:{fa:"افسران ارشد",en:"Senior Officers"},
  navAmiran:{fa:"امیران",en:"Generals"},
  navTazian:{fa:"سلسله‌مراتب",en:"Hierarchy"},
  navSakhtar:{fa:"ساختار",en:"Structure"},
  rankOrder:{fa:"رتبه",en:"Rank"},
  rankOf:{fa:"از",en:"of"},
  rankIn:{fa:"در سلسله‌مراتب ارتش",en:"in Army hierarchy"},
  detailClose:{fa:"بستن",en:"Close"},
  detailPrev:{fa:"← درجه بعدی",en:"Previous Rank →"},
  detailNext:{fa:"درجه قبلی →",en:"← Next Rank"},
  detailPrevAria:{fa:"درجه بعدی",en:"Previous Rank"},
  detailNextAria:{fa:"درجه قبلی",en:"Next Rank"},
  noDesc:{fa:"",en:""},
  cardCatLabel:{fa:function(cat){return CAT_META[cat].name},en:function(cat){return CAT_META[cat].nameEn}},
  orgSoldiers:{fa:"تعداد نیرو",en:"Force Size"},
  orgUnit:{fa:"واحد",en:"Unit"}
};
function t(k){return I18N[k]?(typeof I18N[k][LANG]==="function"?I18N[k][LANG]():I18N[k][LANG]):k}

/* Nav items — bilingual */
function navItems(){
  return[
    {id:"intro-section",fa:"مقدمه",en:"Overview"},
    {id:"enlisted-section",fa:"سربازان",en:"Enlisted"},
    {id:"nco-section",fa:"درجه\u200cداران",en:"NCOs"},
    {id:"junior-officer-section",fa:"افسران جزء",en:"Junior Officers"},
    {id:"senior-officer-section",fa:"افسران ارشد",en:"Senior Officers"},
    {id:"general-section",fa:"امیران",en:"Generals"},
    {id:"timeline-section",fa:"سلسله\u200cمراتب",en:"Hierarchy"},
    {id:"org-section",fa:"ساختار",en:"Structure"}
  ];
}

function switchLang(lang){
  LANG=lang;localStorage.setItem("lang",lang);
  var h=document.documentElement;
  h.setAttribute("lang",lang==="fa"?"fa":"en");
  h.setAttribute("dir",lang==="fa"?"rtl":"ltr");
  h.setAttribute("data-lang",lang);
  /* toggle button label */
  var btn=$("#langToggle");
  if(btn)btn.textContent=lang==="fa"?"EN":"فارسی";
  /* update static data-i18n elements */
  $$("[data-i18n]").forEach(function(e){
    var v=t(e.getAttribute("data-i18n"));
    if(v!==undefined)e.innerHTML=v;
  });
  /* update title & meta */
  document.title=lang==="fa"?"درجات ارتش جمهوری اسلامی ایران":"Ranks of the Islamic Republic of Iran Army";
  var md=$('meta[name="description"]');
  if(md)md.setAttribute("content",lang==="fa"?"راهنمای جامع درجات و سلسله‌مراتب ارتش جمهوری اسلامی ایران":"Comprehensive guide to ranks and hierarchy of the Islamic Republic of Iran Army");
  /* rebuild dynamic sections */
  rebuildAll();
}

function rebuildAll(){
  /* close detail if open */
  if(dp&&dp.classList&&dp.classList.contains("open"))closeDetail();
  /* clear containers */
  var cc=$("#categoriesContainer");if(cc)cc.innerHTML="";
  var tl=$("#timelineRanks");if(tl)tl.innerHTML="";
  var oc=$("#orgChart");if(oc)oc.innerHTML="";
  nl=[];
  /* rebuild nav links (keep logo & lang toggle) */
  var ni=$(".nav-inner",navEl);
  $$(".nav-link",ni).forEach(function(a){ni.removeChild(a)});
  buildNavLinks();
  /* rebuild sections */
  renderScrollSections();
  setupCinematicScroll();
  renderTimeline();
  renderOrg();
  /* rebuild detail panel */
  buildDetail();
  setupNavObs();
  requestAnimationFrame(function(){setupReveal()});
}

var ro;
function setupReveal(){
  if(PR){$$(".reveal").forEach(function(e){e.classList.add("revealed")});return;}
  ro=new IntersectionObserver(function(en){en.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add("revealed");ro.unobserve(e.target)}
  })},{threshold:0.12,rootMargin:"0px 0px -40px 0px"});
  $$(".reveal").forEach(function(e){ro.observe(e)});
}

/* Hero canvas particles */
function heroParticles(){
  var canvas=$("#heroCanvas");if(!canvas||PR)return;
  var ctx=canvas.getContext("2d"),particles=[],N=35;
  function resize(){canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight}
  resize();window.addEventListener("resize",resize);
  for(var i=0;i<N;i++){
    particles.push({
      x:Math.random()*canvas.width,y:Math.random()*canvas.height,
      r:Math.random()*1.5+0.5,
      dx:(Math.random()-0.5)*0.25,dy:(Math.random()-0.5)*0.15-0.1,
      o:Math.random()*0.25+0.05,
      phase:Math.random()*Math.PI*2
    });
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var t=Date.now()*0.001;
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      p.x+=p.dx+Math.sin(t*0.3+p.phase)*0.08;
      p.y+=p.dy+Math.cos(t*0.2+p.phase)*0.05;
      if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;
      if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0;
      var flicker=p.o+Math.sin(t*0.8+p.phase)*0.05;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle="rgba(201,168,76,"+Math.max(0,flicker)+")";
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* Sticky nav */
var navEl,nl=[];
function buildNav(){
  navEl=$("#stickyNav");
  buildNavLinks();
}
function buildNavLinks(){
  var items=navItems();
  var ni=$(".nav-inner",navEl);
  items.forEach(function(it){
    var a=el("a","nav-link",it[LANG]);
    a.href="#"+it.id;a.setAttribute("data-section",it.id);
    a.addEventListener("click",function(e){
      e.preventDefault();var tg=document.getElementById(it.id);
      if(tg){var off=navEl.offsetHeight+16;
        window.scrollTo({top:absTop(tg)-off,behavior:PR?"auto":"smooth"});
      }
    });
    ni.appendChild(a);nl.push(a);
  });
}
function setupNavObs(){
  var secs=$$("[data-section-id]");
  var intersecting={};
  var o=new IntersectionObserver(function(en){
    en.forEach(function(e){
      var id=e.target.getAttribute("data-section-id");
      if(e.isIntersecting){intersecting[id]=e.intersectionRatio;}
      else{delete intersecting[id];}
    });
    /* pick section with highest intersection ratio */
    var best=null,bestR=-1;
    for(var k in intersecting){if(intersecting[k]>bestR){bestR=intersecting[k];best=k;}}
    if(best){
      nl.forEach(function(l){l.classList.toggle("active",l.getAttribute("data-section")===best)});
    }
  },{threshold:[0,0.1,0.25,0.5],rootMargin:"-80px 0px -60% 0px"});
  secs.forEach(function(s){o.observe(s)});
}
function handleNavVis(){
  var hero=$("#hero"),th=hero.offsetHeight-100;
  function ck(){navEl.classList.toggle("visible",window.scrollY>th)}
  window.addEventListener("scroll",ck,{passive:true});ck();
}

/* Progress bar */
function setupProgress(){
  var bar=$("#progressBar");
  function u(){
    var st=window.scrollY,dh=document.documentElement.scrollHeight-window.innerHeight;
    bar.style.width=(dh>0?(st/dh)*100:0)+"%";
  }
  window.addEventListener("scroll",u,{passive:true});u();
}

/* Hero parallax — logo moves right, text reveals */
function setupParallax(){
  if(PR)return;
  var logo=$(".hero-logo"),text=$(".hero-text"),hero=$("#hero");
  if(!logo||!text)return;
  var wrap=text.parentElement;
  window.addEventListener("scroll",function(){
    var sc=window.scrollY,h=hero.offsetHeight;
    if(sc>=h)return;
    var p=Math.min(1,sc/h);
    /* logo scales from 1→0.55 */
    logo.style.transform="scale("+(1-p*0.45)+")";
    /* text reveals after 15% scroll, fully shown at 85% */
    var tp=Math.max(0,Math.min(1,(p-0.15)/0.7));
    text.style.maxWidth=(tp*600)+"px";
    text.style.opacity=tp;
    wrap.style.gap=(tp*2)+"rem";
    if(tp>=1){text.style.overflow="visible";text.style.whiteSpace="normal"}
  },{passive:true});
}

/* Scroll indicator */
function setupScrollInd(){
  var ind=$("#scrollIndicator");if(!ind)return;
  ind.addEventListener("click",function(){
    var i=$("#intro-section");
    if(i)window.scrollTo({top:absTop(i)-80,behavior:PR?"auto":"smooth"});
  });
  var hero=$("#hero");
  function ck(){ind.classList.toggle("hidden",window.scrollY>hero.offsetHeight*0.4)}
  window.addEventListener("scroll",ck,{passive:true});ck();
}

/* ===== Cinematic images + Rank sections ===== */
var CINEMATIC_IMGS=["image/image (2).jpg","image/Untitled.jpeg","image/upscale-2.png"];
function renderScrollSections(){
  var ctr=$("#categoriesContainer");
  var imgIdx=0;
  CAT_ORDER.forEach(function(cat,i){
    var m=CAT_META[cat],cr=gcr(cat);
    var isFa=LANG==="fa";
    var isCinematic=(i===0||i===2||i===4);
    /* Cinematic image section — pure bg image, sticky, content scrolls over/under */
    if(isCinematic){
      var cs=el("section","cinematic-section");
      var imgWrap=el("div","cinematic-image");
      var img=el("img","");
      img.src=CINEMATIC_IMGS[imgIdx];img.alt="";img.setAttribute("loading","eager");
      imgWrap.appendChild(img);cs.appendChild(imgWrap);
      var cap=el("div","cinematic-caption");
      cap.innerHTML='<span class="cinematic-no">'+(isFa?faNu(i+1):String(i+1))+'</span><div class="cinematic-meta"><em>'+(isFa?m.name:m.nameEn)+'</em><span class="cinematic-en">'+m.nameEn+'</span></div>';
      cs.appendChild(cap);
      ctr.appendChild(cs);
      imgIdx++;
    }
    /* Rank section: white patterned bg (except first section which has no pattern) */
    var rSec=el("section","rank-section"+(i===0?"":" rank-section-pattern"));
    rSec.id=cat+"-section";rSec.setAttribute("data-section-id",cat+"-section");
    var layout=el("div","rank-layout reveal");
    var ranksCol=el("div","ranks-col");
    cr.forEach(function(r){
      var chip=el("div","rank-chip");
      chip.setAttribute("data-rank-id",r.id);chip.setAttribute("tabindex","0");chip.setAttribute("role","button");
      chip.setAttribute("aria-label",r.nameFa+" - "+r.nameEn);
      chip.innerHTML='<div class="chip-insignia"><img src="'+r.insignia+'" alt="'+r.nameFa+'" loading="lazy"></div><p class="chip-name">'+(isFa?r.nameFa:r.nameEn)+'</p><span class="chip-name-en">'+r.nameEn+'</span>';
      chip.addEventListener("click",function(){openDetail(r)});
      chip.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openDetail(r)}});
      ranksCol.appendChild(chip);
    });
    var descCol=el("div","desc-col");
    descCol.innerHTML='<span class="cat-label" style="color:'+m.color+'">'+m.nameEn+'</span><h2 class="cat-title">'+(isFa?m.name:m.nameEn)+'</h2><div class="cat-rule" style="background:'+m.color+'"></div><p class="cat-desc">'+(isFa?m.description:m.descriptionEn)+'</p>';
    layout.appendChild(ranksCol);layout.appendChild(descCol);
    rSec.appendChild(layout);ctr.appendChild(rSec);
  });
}

/* ===== Cinematic scroll-driven animations ===== */
var _cineScrollBound=false;
function setupCinematicScroll(){
  if(PR){
    $$(".cinematic-panel").forEach(function(p){p.classList.add("visible")});
    return;
  }
  /* IntersectionObserver — fade panels in as they enter viewport */
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting)entry.target.classList.add("visible");
    });
  },{threshold:0.12,rootMargin:"-5% 0px -5% 0px"});
  $$(".cinematic-panel").forEach(function(p){observer.observe(p)});
  /* Ken Burns slow zoom + scroll progress bar (only bind once) */
  if(!_cineScrollBound){
    _cineScrollBound=true;
    var ticking=false;
    window.addEventListener("scroll",function(){
      if(!ticking){
        requestAnimationFrame(function(){
          $$(".cinematic-section").forEach(function(sec){
            var img=sec.querySelector(".cinematic-image img");
            if(!img)return;
            var rect=sec.getBoundingClientRect();
            var scrollable=rect.height-window.innerHeight;
            if(scrollable<=0)return;
            var progress=Math.max(0,Math.min(1,-rect.top/scrollable));
            img.style.transform="scale("+(1+progress*0.12)+")";
            var fill=sec.querySelector(".cinematic-progress-fill");
            if(fill)fill.style.height=(progress*100)+"%";
          });
          ticking=false;
        });
        ticking=true;
      }
    },{passive:true});
  }
}

/* Timeline */
function renderTimeline(){
  var ctr=$("#timelineRanks");
  var sorted=ranks.slice().sort(function(a,b){return a.order-b.order});
  sorted.forEach(function(r){
    var m=CAT_META[r.category];
    var nd=el("div","tl-node reveal");
    nd.setAttribute("data-rank-id",r.id);nd.setAttribute("tabindex","0");nd.setAttribute("role","button");
    nd.innerHTML='<div class="tl-dot" style="background:'+m.color+'"></div><div class="tl-line"></div><div class="tl-card"><div class="tl-insignia"><img src="'+r.insignia+'" alt="'+r.nameFa+'" loading="lazy"></div><div class="tl-info"><span class="tl-cat" style="color:'+m.color+'">'+(LANG==="fa"?m.name:m.nameEn)+'</span><h4 class="tl-name">'+(LANG==="fa"?r.nameFa:r.nameEn)+'</h4><span class="tl-name-en">'+r.nameEn+'</span>'+(r.description?'<p class="tl-desc">'+(LANG==="fa"?r.description:(r.descriptionEn||r.description))+'</p>':'')+'</div><span class="tl-order">'+r.order+'</span></div>';
    nd.addEventListener("click",function(){openDetail(r)});
    nd.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openDetail(r)}});
    ctr.appendChild(nd);
  });
  var ao=new IntersectionObserver(function(en){en.forEach(function(e){
    if(e.isIntersecting){$$(".tl-node.active").forEach(function(n){n.classList.remove("active")});e.target.classList.add("active")}
  })},{threshold:0.6});
  $$(".tl-node",ctr).forEach(function(n){ao.observe(n)});
}

/* Detail panel */
var dp,dox;
function buildDetail(){
  /* remove old if exists */
  if(dox&&dox.parentNode)dox.parentNode.removeChild(dox);
  if(dp&&dp.parentNode)dp.parentNode.removeChild(dp);
  dox=el("div","detail-overlay");dox.addEventListener("click",closeDetail);
  dp=el("div","detail-panel");dp.setAttribute("role","dialog");dp.setAttribute("aria-label","Detail");
  dp.innerHTML='<button class="detail-close" aria-label="'+t("detailClose")+'">&#10005;</button><div class="detail-content"><div class="detail-insignia-wrap"><img class="detail-insignia" src="" alt=""></div><div class="detail-body"><span class="detail-cat-badge"></span><h2 class="detail-name"></h2><span class="detail-name-en"></span><div class="detail-rule"></div><p class="detail-desc"></p><span class="detail-order"></span></div></div><div class="detail-nav"><button class="detail-prev" aria-label="'+t("detailPrevAria")+'">'+t("detailPrev")+'</button><button class="detail-next" aria-label="'+t("detailNextAria")+'">'+t("detailNext")+'</button></div>';
  document.body.appendChild(dox);document.body.appendChild(dp);
  $(".detail-close",dp).addEventListener("click",closeDetail);
  $(".detail-prev",dp).addEventListener("click",function(){
    var id=dp.getAttribute("data-current-id"),idx=ranks.findIndex(function(r){return r.id===id});
    if(idx>0)openDetail(ranks[idx-1]);
  });
  $(".detail-next",dp).addEventListener("click",function(){
    var id=dp.getAttribute("data-current-id"),idx=ranks.findIndex(function(r){return r.id===id});
    if(idx<ranks.length-1)openDetail(ranks[idx+1]);
  });
  document.addEventListener("keydown",function(e){
    if(!dp.classList.contains("open"))return;
    if(e.key==="Escape")closeDetail();
    if(LANG==="fa"){
      if(e.key==="ArrowLeft")$(".detail-next",dp).click();
      if(e.key==="ArrowRight")$(".detail-prev",dp).click();
    }else{
      if(e.key==="ArrowLeft")$(".detail-prev",dp).click();
      if(e.key==="ArrowRight")$(".detail-next",dp).click();
    }
  });
}
function openDetail(r){
  var m=CAT_META[r.category];
  dp.setAttribute("data-current-id",r.id);
  $(".detail-insignia",dp).src=r.insignia;$(".detail-insignia",dp).alt=r.nameFa;
  $(".detail-cat-badge",dp).textContent=LANG==="fa"?m.name:m.nameEn;$(".detail-cat-badge",dp).style.background=m.color;
  $(".detail-name",dp).textContent=LANG==="fa"?r.nameFa:r.nameEn;$(".detail-name-en",dp).textContent=r.nameEn;
  $(".detail-desc",dp).textContent=LANG==="fa"?(r.description||""):(r.descriptionEn||r.description||"");
  $(".detail-order",dp).textContent=t("rankOrder")+" "+r.order+" "+t("rankOf")+" "+ranks.length+" "+t("rankIn");
  $(".detail-rule",dp).style.background=m.color;
  var idx=ranks.indexOf(r);
  $(".detail-prev",dp).style.visibility=idx>0?"visible":"hidden";
  $(".detail-next",dp).style.visibility=idx<ranks.length-1?"visible":"hidden";
  dox.classList.add("open");dp.classList.add("open");document.body.style.overflow="hidden";
}
function closeDetail(){dox.classList.remove("open");dp.classList.remove("open");document.body.style.overflow=""}

/* Org section */
function renderOrg(){
  var ctr=$("#orgChart");if(!ctr||typeof hierarchyData==="undefined")return;
  hierarchyData.forEach(function(it){
    var nd=el("div","org-node reveal");
    nd.innerHTML='<div class="org-level"><span class="org-name">'+(LANG==="fa"?it.name:it.nameEn)+'</span><span class="org-name-en">'+it.nameEn+'</span></div><div class="org-details"><span class="org-unit">'+it.unit+'</span><span class="org-soldiers">'+it.soldiers+'</span></div><p class="org-desc">'+it.desc+'</p>';
    ctr.appendChild(nd);
  });
}

/* Init */
function init(){
  navEl=$("#stickyNav");
  handleNavVis();setupProgress();setupParallax();setupScrollInd();heroParticles();
  /* lang toggle */
  var ltb=$("#langToggle");
  if(ltb){ltb.addEventListener("click",function(){switchLang(LANG==="fa"?"en":"fa")})}
  /* apply language (builds all content) */
  switchLang(LANG);
  requestAnimationFrame(function(){setupReveal()});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
