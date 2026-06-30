/* MHBM — Page Template: injects topbar, navbar, footer, utils into all inner pages */
(function(){
'use strict';

function getBase(){
  const p = window.location.pathname;
  if(p.includes('/espace-client/')) return '../../';
  if(p.includes('/pages/')) return '../';
  return './';
}

function iconSVG(id){
  return `<svg aria-hidden="true" focusable="false"><use href="#${id}"/></svg>`;
}

/* ── ICON SPRITE (inline into body once) ── */
function injectIcons(){
  if(document.getElementById('mhbm-icons')) return;
  const base = getBase();
  fetch(base+'assets/icons/icons.svg')
    .then(r=>r.text())
    .then(html=>{
      const div=document.createElement('div');
      div.id='mhbm-icons'; div.style.display='none'; div.innerHTML=html;
      document.body.insertBefore(div,document.body.firstChild);
    }).catch(()=>{});
}

/* ── TOPBAR ── */
function buildTopbar(b){
  return `
<div class="topbar" role="complementary" aria-label="Informations rapides">
  <div class="topbar-inner container">
    <div class="topbar-left">
      <a href="tel:+21673264360" aria-label="Téléphone">
        ${iconSVG('icon-phone')} <span data-bidi-ltr>+216 73 264 360</span>
      </a>
      <a href="mailto:contact@mhbm-avocat.com" class="hide-mobile" aria-label="Email">
        ${iconSVG('icon-mail')} contact@mhbm-avocat.com
      </a>
    </div>
    <div class="topbar-right">
      <span class="hide-mobile">${iconSVG('icon-clock')} <span data-i18n="tb_hours">Lun–Ven 08h–17h30 · Sam 08h–13h30</span></span>
      <a href="${b}pages/espace-client/login.html">${iconSVG('icon-user')} <span data-i18n="nav_espace_client">Espace Client</span></a>
    </div>
  </div>
</div>`;
}

/* ── NAVBAR ── */
function buildNavbar(b){
  return `
<nav class="navbar" id="navbar" role="navigation" aria-label="Navigation principale">
  <div class="navbar-inner container">
    <a href="${b}index.html" class="navbar-logo" aria-label="Cabinet MHBM Avocats-Conseils — Accueil">
      <!--
        LOGO — Remplacer ce bloc par :
        <img src="${b}assets/images/logo/logo-mhbm.svg" alt="Cabinet MHBM Avocats-Conseils" class="logo-img">
        Fichier: logo-mhbm.svg | Dimensions: 170×52px | Format: SVG transparent
      -->
      <div class="logo-ph" aria-hidden="true">
        <span class="logo-ph-name">MHBM AVOCATS-CONSEILS</span>
        <span class="logo-ph-file">logo-mhbm.svg</span>
        <span class="logo-ph-dims">170 × 52 px · SVG</span>
      </div>
    </a>

    <ul class="navbar-menu" role="menubar">
      <li class="nav-item" role="none">
        <a href="${b}index.html" class="nav-link" role="menuitem" data-i18n="nav_cabinet">Le Cabinet
          ${iconSVG('icon-chevron-down')}
        </a>
        <div class="dropdown wide" role="menu">
          <a href="${b}pages/presentation.html" class="dd-link" role="menuitem">
            <div class="dd-icon">${iconSVG('icon-award')}</div>
            <div><div class="dd-title" data-i18n="nav_presentation">Présentation</div><div class="dd-desc">Histoire & fondateur</div></div>
          </a>
          <a href="${b}pages/equipe.html" class="dd-link" role="menuitem">
            <div class="dd-icon">${iconSVG('icon-users')}</div>
            <div><div class="dd-title" data-i18n="nav_equipe">L'Équipe</div><div class="dd-desc">Avocats & collaborateurs</div></div>
          </a>
          <a href="${b}pages/valeurs.html" class="dd-link" role="menuitem">
            <div class="dd-icon">${iconSVG('icon-shield')}</div>
            <div><div class="dd-title" data-i18n="nav_valeurs">Valeurs & Vision</div><div class="dd-desc">Nos engagements</div></div>
          </a>
          <a href="${b}pages/bureaux.html" class="dd-link" role="menuitem">
            <div class="dd-icon">${iconSVG('icon-pin')}</div>
            <div><div class="dd-title" data-i18n="nav_bureaux">Nos Bureaux</div><div class="dd-desc">Localisation & accès</div></div>
          </a>
        </div>
      </li>
      <li class="nav-item" role="none">
        <a href="${b}pages/expertises.html" class="nav-link" role="menuitem" data-i18n="nav_expertises">Expertises
          ${iconSVG('icon-chevron-down')}
        </a>
        <div class="dropdown wide" role="menu">
          <a href="${b}pages/expertise-succession.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-scale')}</div>
            <div><div class="dd-title" data-i18n="nav_succession">Droit Successoral</div><div class="dd-desc">Héritage & succession</div></div>
          </a>
          <a href="${b}pages/expertise-immobilier.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-home')}</div>
            <div><div class="dd-title" data-i18n="nav_immobilier">Droit Immobilier</div><div class="dd-desc">Achat, vente, litiges</div></div>
          </a>
          <a href="${b}pages/expertise-divorce.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-family')}</div>
            <div><div class="dd-title" data-i18n="nav_divorce">Divorce International</div><div class="dd-desc">Famille & séparation</div></div>
          </a>
          <a href="${b}pages/expertise-affaires.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-briefcase')}</div>
            <div><div class="dd-title" data-i18n="nav_affaires">Droit des Affaires</div><div class="dd-desc">Sociétés & commerce</div></div>
          </a>
          <a href="${b}pages/expertise-penal.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-gavel')}</div>
            <div><div class="dd-title" data-i18n="nav_penal">Droit Pénal</div><div class="dd-desc">Défense & représentation</div></div>
          </a>
          <a href="${b}pages/expertise-nationalite.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-id-card')}</div>
            <div><div class="dd-title" data-i18n="nav_nationalite">Nationalité Tunisienne</div><div class="dd-desc">Acquisition & récupération</div></div>
          </a>
          <a href="${b}pages/expertise-arbitrage.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-handshake')}</div>
            <div><div class="dd-title" data-i18n="nav_arbitrage">Arbitrage & Médiation</div><div class="dd-desc">Résolution amiable</div></div>
          </a>
          <a href="${b}pages/expertise-recouvrement.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-debt')}</div>
            <div><div class="dd-title" data-i18n="nav_recouvrement">Recouvrement</div><div class="dd-desc">Créances & saisies</div></div>
          </a>
          <a href="${b}pages/expertise-travail.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-worker')}</div>
            <div><div class="dd-title" data-i18n="nav_travail">Droit du Travail</div><div class="dd-desc">Employés & employeurs</div></div>
          </a>
          <a href="${b}pages/expertise-famille.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-family-heart')}</div>
            <div><div class="dd-title" data-i18n="nav_famille">Droit de la Famille</div><div class="dd-desc">Mariage, garde, pension</div></div>
          </a>
          <a href="${b}pages/expertise-accidents.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-accident')}</div>
            <div><div class="dd-title" data-i18n="nav_accidents">Accidents & Indemnisation</div><div class="dd-desc">Victimes & assurances</div></div>
          </a>
          <a href="${b}pages/expertise-baux.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-lease')}</div>
            <div><div class="dd-title" data-i18n="nav_baux">Baux & Litiges</div><div class="dd-desc">Location & copropriété</div></div>
          </a>
        </div>
      </li>
      <li class="nav-item" role="none">
        <a href="${b}pages/tunisiens-etranger.html" class="nav-link" role="menuitem" data-i18n="nav_etranger">Tunisiens à l'Étranger</a>
      </li>
      <li class="nav-item" role="none">
        <a href="${b}pages/consultation-ligne.html" class="nav-link" role="menuitem" data-i18n="nav_consultation">Consultation en Ligne</a>
      </li>
      <li class="nav-item" role="none">
        <a href="${b}pages/ressources.html" class="nav-link" role="menuitem" data-i18n="nav_ressources">Ressources
          ${iconSVG('icon-chevron-down')}
        </a>
        <div class="dropdown" role="menu">
          <a href="${b}pages/blog.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-pen')}</div>
            <div><div class="dd-title" data-i18n="nav_blog">Blog Juridique</div><div class="dd-desc">Articles & actualités</div></div>
          </a>
          <a href="${b}pages/guides.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-book')}</div>
            <div><div class="dd-title" data-i18n="nav_guides">Guides Pratiques</div><div class="dd-desc">PDF gratuits</div></div>
          </a>
          <a href="${b}pages/faq.html" class="dd-link">
            <div class="dd-icon">${iconSVG('icon-question')}</div>
            <div><div class="dd-title" data-i18n="nav_faq">FAQ</div><div class="dd-desc">Questions fréquentes</div></div>
          </a>
        </div>
      </li>
      <li class="nav-item" role="none">
        <a href="${b}pages/honoraires.html" class="nav-link" role="menuitem" data-i18n="nav_honoraires">Honoraires</a>
      </li>
      <li class="nav-item" role="none">
        <a href="${b}pages/contact.html" class="nav-link" role="menuitem" data-i18n="nav_contact">Contact</a>
      </li>
    </ul>

    <div class="navbar-actions">
      <div class="lang-sw" role="group" aria-label="Sélectionner la langue">
        <button class="lang-btn active" data-lang="fr" aria-label="Français">FR</button>
        <button class="lang-btn" data-lang="ar" aria-label="العربية">عر</button>
      </div>
      <a href="${b}pages/espace-client/login.html" class="btn btn-ghost btn-sm hide-mobile">
        ${iconSVG('icon-user')} <span data-i18n="nav_espace_client">Espace Client</span>
      </a>
      <a href="${b}pages/consultation-ligne.html" class="btn btn-primary btn-sm" data-i18n="nav_rdv">Prendre RDV</a>
      <button class="hamburger" id="hamburger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<!-- Mobile Menu -->
<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation mobile">
  <div class="mobile-nav-label" data-i18n="nav_cabinet">Le Cabinet</div>
  <a href="${b}pages/presentation.html" class="mobile-sub-link" data-i18n="nav_presentation">Présentation</a>
  <a href="${b}pages/equipe.html" class="mobile-sub-link" data-i18n="nav_equipe">L'Équipe</a>
  <a href="${b}pages/valeurs.html" class="mobile-sub-link" data-i18n="nav_valeurs">Valeurs & Vision</a>
  <a href="${b}pages/bureaux.html" class="mobile-sub-link" data-i18n="nav_bureaux">Nos Bureaux</a>
  <div class="mobile-nav-label" data-i18n="nav_expertises">Expertises</div>
  <a href="${b}pages/expertise-succession.html" class="mobile-sub-link" data-i18n="nav_succession">Droit Successoral</a>
  <a href="${b}pages/expertise-immobilier.html" class="mobile-sub-link" data-i18n="nav_immobilier">Droit Immobilier</a>
  <a href="${b}pages/expertise-divorce.html" class="mobile-sub-link" data-i18n="nav_divorce">Divorce International</a>
  <a href="${b}pages/expertise-affaires.html" class="mobile-sub-link" data-i18n="nav_affaires">Droit des Affaires</a>
  <a href="${b}pages/expertise-penal.html" class="mobile-sub-link" data-i18n="nav_penal">Droit Pénal</a>
  <a href="${b}pages/expertise-nationalite.html" class="mobile-sub-link" data-i18n="nav_nationalite">Nationalité Tunisienne</a>
  <a href="${b}pages/expertise-arbitrage.html" class="mobile-sub-link" data-i18n="nav_arbitrage">Arbitrage & Médiation</a>
  <a href="${b}pages/expertise-recouvrement.html" class="mobile-sub-link" data-i18n="nav_recouvrement">Recouvrement</a>
  <a href="${b}pages/expertise-travail.html" class="mobile-sub-link" data-i18n="nav_travail">Droit du Travail</a>
  <a href="${b}pages/expertise-famille.html" class="mobile-sub-link" data-i18n="nav_famille">Droit de la Famille</a>
  <a href="${b}pages/expertise-accidents.html" class="mobile-sub-link" data-i18n="nav_accidents">Accidents & Indemnisation</a>
  <a href="${b}pages/expertise-baux.html" class="mobile-sub-link" data-i18n="nav_baux">Baux & Litiges</a>
  <a href="${b}pages/tunisiens-etranger.html" class="mobile-nav-link" data-i18n="nav_etranger">Tunisiens à l'Étranger</a>
  <a href="${b}pages/consultation-ligne.html" class="mobile-nav-link" data-i18n="nav_consultation">Consultation en Ligne</a>
  <a href="${b}pages/ressources.html" class="mobile-nav-link" data-i18n="nav_ressources">Ressources</a>
  <a href="${b}pages/honoraires.html" class="mobile-nav-link" data-i18n="nav_honoraires">Honoraires</a>
  <a href="${b}pages/contact.html" class="mobile-nav-link" data-i18n="nav_contact">Contact</a>
  <div class="mobile-actions">
    <a href="${b}pages/consultation-ligne.html" class="btn btn-primary" data-i18n="nav_rdv">Prendre RDV</a>
    <a href="${b}pages/espace-client/login.html" class="btn btn-outline" data-i18n="nav_espace_client">Espace Client</a>
    <a href="https://wa.me/21698258015" class="btn btn-ghost wa-link" target="_blank" rel="noopener">
      ${iconSVG('icon-whatsapp')} WhatsApp
    </a>
  </div>
</div>`;
}

/* ── FOOTER ── */
function buildFooter(b){
  return `
<footer role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div>
        <!--
          LOGO FOOTER BLANC — Remplacer par :
          <img src="${b}assets/images/logo/logo-mhbm-blanc.svg" alt="MHBM" style="height:42px;width:auto;margin-bottom:18px">
          Fichier: logo-mhbm-blanc.svg | Dimensions: 140×42px | SVG transparent | Version blanche
        -->
        <div class="footer-logo-ph" aria-hidden="true">
          <span>logo-mhbm-blanc.svg · 140×42px</span>
        </div>
        <p class="footer-tagline" data-i18n="ft_tagline">Maître Mohamed Haithem Ben Makhlouf, Avocat près de la Cour de Cassation. Au service des Tunisiens en Tunisie et dans le monde entier depuis 2007.</p>
        <div class="footer-socials">
          <a href="#" class="footer-social" aria-label="LinkedIn" data-tooltip="LinkedIn">${iconSVG('icon-linkedin')}</a>
          <a href="#" class="footer-social" aria-label="Facebook" data-tooltip="Facebook">${iconSVG('icon-facebook')}</a>
          <a href="#" class="footer-social" aria-label="Instagram" data-tooltip="Instagram">${iconSVG('icon-instagram')}</a>
          <a href="#" class="footer-social" aria-label="YouTube" data-tooltip="YouTube">${iconSVG('icon-youtube')}</a>
          <a href="https://wa.me/21698258015" class="footer-social wa-link" aria-label="WhatsApp" target="_blank" rel="noopener">${iconSVG('icon-whatsapp')}</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title" data-i18n="ft_nav">Navigation</div>
        <div class="footer-links">
          <a href="${b}index.html" class="footer-link" data-i18n="nav_cabinet">Le Cabinet</a>
          <a href="${b}pages/expertises.html" class="footer-link" data-i18n="nav_expertises">Expertises</a>
          <a href="${b}pages/tunisiens-etranger.html" class="footer-link" data-i18n="nav_etranger">Tunisiens à l'Étranger</a>
          <a href="${b}pages/consultation-ligne.html" class="footer-link" data-i18n="nav_consultation">Consultation</a>
          <a href="${b}pages/honoraires.html" class="footer-link" data-i18n="nav_honoraires">Honoraires</a>
          <a href="${b}pages/contact.html" class="footer-link" data-i18n="nav_contact">Contact</a>
          <a href="${b}pages/espace-client/login.html" class="footer-link" data-i18n="nav_espace_client">Espace Client</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title" data-i18n="ft_expertises">Expertises</div>
        <div class="footer-links">
          <a href="${b}pages/expertise-succession.html" class="footer-link" data-i18n="nav_succession">Droit Successoral</a>
          <a href="${b}pages/expertise-immobilier.html" class="footer-link" data-i18n="nav_immobilier">Droit Immobilier</a>
          <a href="${b}pages/expertise-divorce.html" class="footer-link" data-i18n="nav_divorce">Divorce International</a>
          <a href="${b}pages/expertise-affaires.html" class="footer-link" data-i18n="nav_affaires">Droit des Affaires</a>
          <a href="${b}pages/expertise-penal.html" class="footer-link" data-i18n="nav_penal">Droit Pénal</a>
          <a href="${b}pages/expertise-nationalite.html" class="footer-link" data-i18n="nav_nationalite">Nationalité Tunisienne</a>
          <a href="${b}pages/expertise-arbitrage.html" class="footer-link" data-i18n="nav_arbitrage">Arbitrage & Médiation</a>
          <a href="${b}pages/expertise-recouvrement.html" class="footer-link" data-i18n="nav_recouvrement">Recouvrement</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title" data-i18n="ft_contact">Contact</div>
        <div class="footer-contact-row">${iconSVG('icon-pin')}<span>Rue des Fleurs, M'saken<br>Sousse 4070 — Tunisie</span></div>
        <div class="footer-contact-row">${iconSVG('icon-phone')}<a href="tel:+21673264360" data-bidi-ltr>+216 73 264 360</a></div>
        <div class="footer-contact-row">${iconSVG('icon-whatsapp')}<a href="https://wa.me/21698258015" class="wa-link" target="_blank" data-bidi-ltr>+216 98 258 015</a></div>
        <div class="footer-contact-row">${iconSVG('icon-mail')}<a href="mailto:contact@mhbm-avocat.com">contact@mhbm-avocat.com</a></div>
        <div class="footer-col-title" style="margin-top:20px" data-i18n="ft_hours_title">Horaires</div>
        <div class="footer-hours">
          <div class="footer-hour"><span class="footer-hour-day" data-i18n="ft_mon_fri">Lun – Ven</span><span class="footer-hour-time" data-bidi-ltr>08h00 – 17h30</span></div>
          <div class="footer-hour"><span class="footer-hour-day" data-i18n="ft_sat">Samedi</span><span class="footer-hour-time" data-bidi-ltr>08h00 – 13h30</span></div>
          <div class="footer-hour"><span class="footer-hour-day" data-i18n="ft_sun">Dimanche</span><span class="footer-hour-time" style="opacity:.45" data-i18n="ft_closed">Fermé</span></div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy" data-i18n="ft_copy">© 2025 Cabinet MHBM Avocats-Conseils — Tous droits réservés</span>
      <div class="footer-legal">
        <a href="${b}pages/mentions-legales.html" data-i18n="ft_legal">Mentions légales</a>
        <a href="${b}pages/confidentialite.html" data-i18n="ft_privacy">Confidentialité</a>
        <a href="${b}pages/cookies.html" data-i18n="ft_cookies">Cookies</a>
      </div>
    </div>
    <p class="footer-disclaimer" data-i18n="ft_disclaimer">Les informations publiées sur ce site ont un caractère général et informatif. Elles ne constituent pas un avis juridique.</p>
  </div>
</footer>`;
}

/* ── UTILITIES (back-to-top, wa, cookie) ── */
function buildUtils(){
  return `
<button id="back-to-top" aria-label="Retour en haut" title="Retour en haut">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
</button>

<div class="wa-float">
  <a href="https://wa.me/21698258015" class="wa-btn wa-link" target="_blank" rel="noopener" aria-label="Nous écrire sur WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.32A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.69 0-3.27-.49-4.6-1.33l-.33-.2-3.02.79.81-2.95-.22-.34A7.96 7.96 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z"/>
    </svg>
  </a>
</div>

<div id="cookie-banner" style="position:fixed;bottom:0;left:0;right:0;z-index:9990;background:var(--blue-deep);color:rgba(255,255,255,.85);padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;border-top:3px solid var(--gold-light);transform:translateY(100%);transition:transform .4s var(--ease)" role="dialog" aria-live="polite" aria-label="Consentement cookies">
  <p style="font-size:.875rem;margin:0;flex:1;min-width:240px" data-i18n="cookie_text">Ce site utilise des cookies pour améliorer votre expérience.</p>
  <div style="display:flex;gap:10px;flex-shrink:0">
    <button class="btn btn-gold btn-sm" data-accept data-i18n="cookie_accept">Accepter</button>
    <button class="btn btn-outline-white btn-sm" data-decline data-i18n="cookie_decline">Refuser</button>
  </div>
</div>`;
}

/* ── INJECT ── */
document.addEventListener('DOMContentLoaded', function(){
  const b = getBase();
  const body = document.body;

  // Inject icons
  injectIcons();

  // Check if page already has topbar (index.html inlines it)
  if(!document.querySelector('.topbar')){
    body.insertAdjacentHTML('afterbegin', buildNavbar(b) + buildTopbar(b));
    // Reorder: topbar first
    const nav = body.querySelector('.navbar');
    const tb  = body.querySelector('.topbar');
    if(nav && tb){ body.insertBefore(tb, nav); }
  }

  // Footer
  if(!document.querySelector('footer')){
    const main = body.querySelector('main') || body;
    main.insertAdjacentHTML('afterend', buildFooter(b) + buildUtils());
  }

  // core.js, fr.js, ar.js are already loaded by the page <script> tags
  // (they run before this DOMContentLoaded handler since page-template.js
  // is listed last). Re-apply translations & re-init now that the
  // navbar/footer/utils have just been injected into the DOM.
  if(window.MHBM){
    if(MHBM.lang) MHBM.lang.apply();
    if(MHBM.nav) MHBM.nav.init();
    if(MHBM.anim) MHBM.anim.init();
    if(MHBM.counters) MHBM.counters.init();
    if(MHBM.accordion) MHBM.accordion.init();
    if(MHBM.forms) MHBM.forms.init();
    if(MHBM.backTop) MHBM.backTop.init();
    if(MHBM.smoothScroll) MHBM.smoothScroll();
    if(MHBM.cookies) MHBM.cookies.init();
    // Re-bind language switcher buttons that were just injected
    document.querySelectorAll('.lang-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        if(btn.dataset.lang !== MHBM.lang.current()) MHBM.lang.set(btn.dataset.lang);
      });
    });
  }
});
})();
