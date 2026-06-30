/* MHBM — Espace Client Data & Auth */
'use strict';
window.MHBM_EC = window.MHBM_EC || {};

MHBM_EC.DEMO_CLIENT = {
  id:'demo-001', prenom:'Mahrez', nom:'Beltaief',
  prenomAr:'محرز', nomAr:'باللطيف',
  email:'mahrez.beltaief@email.com', phone:'+33 6 12 34 56 78',
  ville:'Lyon, France', since:'2023', avatar:'MB',
  dossiers:[
    {id:'DOS-2024-087',type:'Droit Successoral',titre:'Succession M. Beltaief Houcine',statut:'active',progress:65,avocat:'Me Ben Makhlouf',date:'12 mars 2024',next:'Audience tribunal — 28 juin 2025',color:'var(--blue-inst)'},
    {id:'DOS-2023-142',type:'Droit Immobilier',titre:'Acquisition appartement Sousse',statut:'closed',progress:100,avocat:'Me Bhiri',date:'5 sept. 2023',next:'Dossier clôturé avec succès',color:'var(--success)'},
    {id:'DOS-2024-103',type:'Procuration',titre:'Procuration générale notariée',statut:'pending',progress:20,avocat:'Me Guezguez',date:'2 mai 2024',next:'En attente de documents client',color:'var(--warning)'},
  ],
  consultations:[
    {id:'CON-2025-031',type:'Vidéo',date:'28 juin 2025',heure:'14h00',avocat:'Me Ben Makhlouf',sujet:"Point d'avancement succession",statut:'confirmed'},
    {id:'CON-2025-028',type:'WhatsApp',date:'15 juin 2025',heure:'10h30',avocat:'Me Guezguez',sujet:'Liste documents procuration',statut:'done'},
    {id:'CON-2024-019',type:'Vidéo',date:'3 mai 2024',heure:'15h00',avocat:'Me Ben Makhlouf',sujet:'Première consultation succession',statut:'done'},
  ],
  documents:[
    {id:'DOC-001',nom:'Acte de décès — M. Beltaief H.',type:'PDF',size:'245 Ko',date:'14 mars 2024',dossier:'DOS-2024-087',icon:'📄'},
    {id:'DOC-002',nom:'Inventaire patrimoine',type:'PDF',size:'512 Ko',date:'20 mars 2024',dossier:'DOS-2024-087',icon:'📋'},
    {id:'DOC-003',nom:'Acte de vente appartement Sousse',type:'PDF',size:'1.2 Mo',date:'18 nov. 2023',dossier:'DOS-2023-142',icon:'🏠'},
    {id:'DOC-004',nom:'Titre foncier TF-4521',type:'PDF',size:'380 Ko',date:'18 nov. 2023',dossier:'DOS-2023-142',icon:'📜'},
    {id:'DOC-005',nom:'Modèle procuration générale',type:'PDF',size:'95 Ko',date:'3 mai 2024',dossier:'DOS-2024-103',icon:'✍️'},
  ],
  messages:[
    {id:'MSG-001',de:'Me Ben Makhlouf',sujet:'Audience fixée au 28 juin 2025',preview:"Bonjour M. Beltaief, l'audience a été fixée au 28 juin...",date:'15 juin 2025',unread:true},
    {id:'MSG-002',de:'Secrétariat MHBM',sujet:'Rappel : documents à fournir',preview:'Nous vous rappelons que les documents suivants sont nécessaires...',date:'10 juin 2025',unread:true},
    {id:'MSG-003',de:'Me Bhiri',sujet:'Dossier immobilier clôturé ✓',preview:"J'ai le plaisir de vous confirmer que votre dossier...",date:'20 nov. 2023',unread:false},
  ],
  factures:[
    {id:'FAC-2024-012',ref:'Honoraires — DOS-2024-087',montant:'1 200,00 TND',date:'15 avril 2024',statut:'paid'},
    {id:'FAC-2023-089',ref:'Honoraires — DOS-2023-142',montant:'2 800,00 TND',date:'20 nov. 2023',statut:'paid'},
    {id:'FAC-2024-021',ref:'Acompte — DOS-2024-103',montant:'300,00 TND',date:'5 mai 2024',statut:'pending'},
  ],
  notifications:[
    {text:'Audience fixée au 28 juin 2025 — DOS-2024-087',time:'Il y a 2 jours',unread:true},
    {text:'Nouveau message de Me Ben Makhlouf',time:'Il y a 2 jours',unread:true},
    {text:'Document ajouté à votre dossier',time:'Il y a 5 jours',unread:false},
    {text:'Facture FAC-2024-012 marquée réglée',time:'Il y a 2 mois',unread:false},
  ]
};

MHBM_EC.auth = {
  login(email,password){
    // Demo: any credentials work
    sessionStorage.setItem('mhbm_client', JSON.stringify({...MHBM_EC.DEMO_CLIENT,email:email||MHBM_EC.DEMO_CLIENT.email}));
    return true;
  },
  demoLogin(){
    sessionStorage.setItem('mhbm_client', JSON.stringify(MHBM_EC.DEMO_CLIENT));
    return true;
  },
  register(data){
    // Simulate registration — store in session
    const client = {...MHBM_EC.DEMO_CLIENT, prenom:data.prenom||'Nouveau', nom:data.nom||'Client', email:data.email||'', phone:data.phone||''};
    sessionStorage.setItem('mhbm_client', JSON.stringify(client));
    return true;
  },
  logout(){
    sessionStorage.removeItem('mhbm_client');
    window.location.href='login.html';
  },
  getClient(){ try{return JSON.parse(sessionStorage.getItem('mhbm_client'));}catch(e){return null;} },
  requireAuth(){
    if(!this.getClient()){ window.location.href='login.html'; return false; }
    return true;
  }
};
