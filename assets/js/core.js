/* ============================================================
   MHBM AVOCATS-CONSEILS — Core JavaScript
   ============================================================ */
'use strict';

window.MHBM = window.MHBM || {};

/* ─── CONFIG ─────────────────────────────────────────────── */
MHBM.config = {
  waNumber: '21698258015',
  waMsg: encodeURIComponent('Bonjour, je souhaite une consultation juridique.'),
  waMsg_ar: encodeURIComponent('مرحباً، أودّ الحصول على استشارة قانونية.'),
  tel: '+21673264360',
  email: 'contact@mhbm-avocat.com',
};

/* ─── LANGUAGE ────────────────────────────────────────────── */
MHBM.lang = (function(){
  let current = localStorage.getItem('mhbm_lang') || 'fr';

  function getDict(){ return current==='ar' ? window.LANG_AR : window.LANG_FR; }

  function apply(){
    const dict = getDict();
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.dataset.i18n;
      if(dict[key] !== undefined){
        if(el.tagName==='INPUT'||el.tagName==='TEXTAREA') el.placeholder = dict[key];
        else el.innerHTML = dict[key];
      }
    });
    document.querySelectorAll('[data-i18n-href]').forEach(el=>{
      const key = el.dataset.i18nHref;
      if(dict[key]) el.href = dict[key];
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el=>{
      const key = el.dataset.i18nTitle;
      if(dict[key]) el.title = dict[key];
    });
    // RTL
    const isAr = current==='ar';
    document.documentElement.lang = current;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', isAr);
    // Fix bidi on numeric elements
    document.querySelectorAll('[data-bidi-ltr]').forEach(el=>{
      el.style.direction = 'ltr';
      el.style.unicodeBidi = 'isolate';
    });
    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.lang===current);
    });
    // WhatsApp message
    const waLinks = document.querySelectorAll('.wa-link');
    const msg = isAr ? MHBM.config.waMsg_ar : MHBM.config.waMsg;
    waLinks.forEach(l=>{ l.href = `https://wa.me/${MHBM.config.waNumber}?text=${msg}`; });
  }

  function set(lang){
    current = lang;
    localStorage.setItem('mhbm_lang', lang);
    // Font
    if(lang==='ar'){
      if(!document.getElementById('font-arabic')){
        const lk = document.createElement('link');
        lk.id='font-arabic'; lk.rel='stylesheet';
        lk.href='https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(lk);
      }
    }
    // Smooth swap
    document.body.style.opacity='0.7';
    setTimeout(()=>{ apply(); document.body.style.opacity=''; },150);
  }

  return { apply, set, current:()=>current, dict:getDict };
})();

/* ─── NAV ─────────────────────────────────────────────────── */
MHBM.nav = (function(){
  let menuOpen = false;

  function init(){
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    // Sticky scroll
    if(navbar){
      window.addEventListener('scroll',()=>{
        navbar.classList.toggle('scrolled', window.scrollY > 20);
      },{passive:true});
    }

    // Hamburger
    if(hamburger && mobileMenu){
      hamburger.addEventListener('click',()=>{ menuOpen?close():open(); });
    }

    // Close on outside click
    document.addEventListener('click',(e)=>{
      if(menuOpen && !e.target.closest('#mobile-menu') && !e.target.closest('#hamburger')) close();
    });

    // Keyboard ESC
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'&&menuOpen) close(); });

    // Mark active link
    markActive();

    function open(){
      menuOpen=true;
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      document.body.style.overflow='hidden';
      hamburger.setAttribute('aria-expanded','true');
    }
    function close(){
      menuOpen=false;
      if(hamburger) hamburger.classList.remove('open');
      if(mobileMenu) mobileMenu.classList.remove('open');
      document.body.style.overflow='';
      if(hamburger) hamburger.setAttribute('aria-expanded','false');
    }
  }

  function markActive(){
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link, .dd-link').forEach(a=>{
      const href = a.getAttribute('href');
      if(href && href!=='#' && href!=='/' && path.includes(href.replace(/^\.\.\//, '').replace(/index\.html$/,''))){
        a.classList.add('active');
      }
    });
  }

  return { init };
})();

/* ─── ANIMATIONS ─────────────────────────────────────────── */
MHBM.anim = (function(){
  function init(){
    // Intersection observer for reveal
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});

    document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));

    // Stagger children
    document.querySelectorAll('[data-stagger]').forEach(parent=>{
      const children = parent.children;
      const io2 = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            Array.from(children).forEach((child,i)=>{
              setTimeout(()=>child.classList.add('revealed'), i*80);
            });
            io2.unobserve(e.target);
          }
        });
      },{threshold:0.1});
      io2.observe(parent);
    });
  }
  return { init };
})();

/* ─── COUNTERS ────────────────────────────────────────────── */
MHBM.counters = (function(){
  function init(){
    const els = document.querySelectorAll('[data-counter]');
    if(!els.length) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ animate(e.target); io.unobserve(e.target); }
      });
    },{threshold:0.5});
    els.forEach(el=>io.observe(el));
  }

  function animate(el){
    const target = parseInt(el.dataset.counter);
    const dur = 1800;
    const step = target/(dur/16);
    let cur = 0;
    const timer = setInterval(()=>{
      cur = Math.min(cur+step, target);
      // Format number — always LTR digits in context
      el.textContent = Math.floor(cur).toLocaleString('fr-FR');
      if(cur>=target) clearInterval(timer);
    },16);
  }
  return { init };
})();

/* ─── FAQ ACCORDION ──────────────────────────────────────── */
MHBM.accordion = (function(){
  function init(){
    document.querySelectorAll('.faq-trigger').forEach(trigger=>{
      trigger.addEventListener('click',()=>{
        const isOpen = trigger.getAttribute('aria-expanded')==='true';
        // Close all
        document.querySelectorAll('.faq-trigger').forEach(t=>{
          t.setAttribute('aria-expanded','false');
          const c = t.closest('.faq-item')?.querySelector('.faq-content');
          if(c) c.classList.remove('open');
        });
        // Open clicked
        if(!isOpen){
          trigger.setAttribute('aria-expanded','true');
          const content = trigger.closest('.faq-item')?.querySelector('.faq-content');
          if(content) content.classList.add('open');
        }
      });
    });
  }
  return { init };
})();

/* ─── FORMS ──────────────────────────────────────────────── */
MHBM.forms = (function(){
  function init(){
    document.querySelectorAll('form[data-form]').forEach(form=>{
      form.addEventListener('submit', handleSubmit);
    });
    // Real-time validation
    document.querySelectorAll('.form-input, .form-textarea').forEach(input=>{
      input.addEventListener('blur',()=>validateField(input));
      input.addEventListener('input',()=>clearError(input));
    });
  }

  function validateField(el){
    const val = el.value.trim();
    const group = el.closest('.form-group');
    if(!group) return true;
    let err = null;
    if(el.required && !val){
      err = MHBM.lang.current()==='ar' ? 'هذا الحقل إلزامي' : 'Ce champ est obligatoire';
    } else if(el.type==='email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)){
      err = MHBM.lang.current()==='ar' ? 'بريد إلكتروني غير صالح' : 'Adresse email invalide';
    } else if(el.type==='tel' && val && !/^[\d\s+\-().]{7,}$/.test(val)){
      err = MHBM.lang.current()==='ar' ? 'رقم هاتف غير صالح' : 'Numéro de téléphone invalide';
    }
    if(err){
      group.classList.add('has-error');
      let errEl = group.querySelector('.form-error');
      if(!errEl){ errEl=document.createElement('p'); errEl.className='form-error'; group.appendChild(errEl); }
      errEl.textContent=err;
      return false;
    }
    return true;
  }

  function clearError(el){
    const group = el.closest('.form-group');
    if(group){ group.classList.remove('has-error'); }
  }

  function handleSubmit(e){
    e.preventDefault();
    const form = e.currentTarget;
    const fields = form.querySelectorAll('.form-input[required], .form-textarea[required]');
    let valid=true;
    fields.forEach(f=>{ if(!validateField(f)) valid=false; });
    if(!valid) return;

    const btn = form.querySelector('[type="submit"]');
    const origText = btn.innerHTML;
    const dict = MHBM.lang.dict();
    btn.innerHTML = dict.sending || 'Envoi...';
    btn.disabled=true;

    setTimeout(()=>{
      btn.innerHTML=origText;
      btn.disabled=false;
      form.reset();
      MHBM.toast(dict.form_success || 'Message envoyé avec succès !', 'success');
    },1800);
  }
  return { init };
})();

/* ─── TOAST ──────────────────────────────────────────────── */
MHBM.toast = function(msg, type='success'){
  const t = document.createElement('div');
  t.className='toast';
  if(type==='error') t.style.borderColor='var(--error)';
  t.textContent=msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),400); },5000);
};

/* ─── BACK TO TOP ────────────────────────────────────────── */
MHBM.backTop = (function(){
  function init(){
    const btn = document.getElementById('back-to-top');
    if(!btn) return;
    window.addEventListener('scroll',()=>{
      btn.classList.toggle('visible', window.scrollY > 400);
    },{passive:true});
    btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }
  return { init };
})();

/* ─── SMOOTH SCROLL ──────────────────────────────────────── */
MHBM.smoothScroll = function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });
};

/* ─── COOKIE BANNER ──────────────────────────────────────── */
MHBM.cookies = (function(){
  function init(){
    if(localStorage.getItem('mhbm_cookies')) return;
    const banner = document.getElementById('cookie-banner');
    if(!banner) return;
    setTimeout(()=>banner.style.transform='translateY(0)',500);
    banner.querySelector('[data-accept]')?.addEventListener('click',()=>dismiss('accepted'));
    banner.querySelector('[data-decline]')?.addEventListener('click',()=>dismiss('declined'));

    function dismiss(val){
      localStorage.setItem('mhbm_cookies',val);
      banner.style.transform='translateY(100%)';
    }
  }
  return { init };
})();

/* ─── PATH UTILITIES ─────────────────────────────────────── */
MHBM.getBase = function(){
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  // index.html is at root, pages are at depth 1, espace-client at depth 2
  if(window.location.pathname.includes('/espace-client/')) return '../../';
  if(window.location.pathname.includes('/pages/')) return '../';
  return './';
};

/* ─── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  MHBM.lang.apply();
  MHBM.nav.init();
  MHBM.anim.init();
  MHBM.counters.init();
  MHBM.accordion.init();
  MHBM.forms.init();
  MHBM.backTop.init();
  MHBM.smoothScroll();
  MHBM.cookies.init();

  // Language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(btn.dataset.lang !== MHBM.lang.current()) MHBM.lang.set(btn.dataset.lang);
    });
  });
});
