/* Leaf Café — a self-contained fictional portfolio demo. No network requests for form/cart. */
(() => {
  'use strict';

  const copy = {
    th: {
      skip: 'ข้ามไปยังเนื้อหาหลัก', topNote: 'ชีวิตดีขึ้นได้ ด้วยช่วงเวลาพักเล็ก ๆ และมัทฉะดี ๆ',
      navMenu: 'เมนู', navStory: 'เรื่องราวของเรา', navExperience: 'บรรยากาศ', navContact: 'ติดต่อ', navCta: 'แวะมาทักทาย ↗',
      heroEyebrow: 'A LITTLE GREEN, A LOT OF JOY', heroLine1: 'ให้ทุกวัน', heroLine2: 'ละมุนขึ้น', heroLine3: 'ทีละจิบ ✳',
      heroDesc: 'ในวันที่โลกหมุนเร็ว เราชวนคุณพักสักนิดกับมัทฉะแก้วโปรด ขนมอบหอม ๆ และช่วงเวลาดี ๆ ที่อยากเก็บไว้นานอีกหน่อย',
      heroBrowse: 'ค้นหาเมนูโปรด', heroStory: 'รู้จัก Leaf Café', heroProofTitle: 'ทำด้วยใจ ใส่ใจทุกแก้ว', heroProofDesc: 'A mindful little café concept',
      heroTagTop: "TODAY'S LITTLE JOY", heroAlt: 'ภาพประกอบแก้วมัทฉะเย็นกับใบไม้และสตรอว์เบอร์รี',
      menuEyebrow: 'MADE TO MAKE YOU SMILE', menuTitle1: 'อร่อยกับ', menuTitle2: 'ทุกโมเมนต์', menuDesc: 'เลือกเครื่องดื่มแก้วที่ใช่ แล้วเติมความสุขด้วยขนมโปรด',
      filterAll: 'ทั้งหมด', filterDrink: 'เครื่องดื่ม', filterDessert: 'ขนมหวาน', menuFootnote: 'ราคาและรายการอาหารเป็นข้อมูลสมมติเพื่อสาธิตเว็บไซต์เท่านั้น',
      categoryDrink: 'DRINKS', categoryDessert: 'DESSERTS', badgePopular: 'ยอดนิยม', badgeNew: 'มาใหม่', addToBag: 'เพิ่มลงรายการ', addToast: 'เพิ่มลงรายการทดลองแล้ว',
      storyEyebrow: "HELLO, WE'RE LEAF CAFÉ", storyLine1: 'ความสุขเล็ก ๆ', storyLine2: 'ที่ไม่ต้องรีบร้อน',
      storyText1: 'เราเชื่อว่าแก้วเครื่องดื่มดี ๆ ไม่ได้มีไว้แค่ดับกระหาย แต่เป็นข้ออ้างเล็ก ๆ ให้คุณได้พักจากความวุ่นวาย และกลับมาอยู่กับช่วงเวลาตรงหน้า',
      storyText2: 'Leaf Café จึงถูกคิดขึ้นมาให้เป็นมุมอบอุ่นสำหรับบทสนทนาดี ๆ หนังสือเล่มโปรด และวันที่อยากใจดีกับตัวเองอีกนิด',
      storySignature: 'little moments matter', storyArtLabel: 'A CORNER TO SLOW DOWN', storyAlt: 'ภาพวาดภายในคาเฟ่ที่มีโต๊ะไม้และหน้าต่างรับแสง',
      experienceEyebrow: 'MORE THAN A CUP', experienceTitle1: 'เติมเต็มวันดี ๆ', experienceTitle2: 'ในแบบของคุณ',
      experienceDesc: 'ทุกอย่างเริ่มจากความตั้งใจเล็ก ๆ ที่อยากให้คุณยิ้มได้ง่ายขึ้น',
      feature1Title: 'คัดสรรด้วยใจ', feature1Text: 'ทุกแก้วออกแบบจากรสชาติที่กลมกล่อมและความใส่ใจในรายละเอียด',
      feature2Title: 'มุมพักที่พอดี', feature2Text: 'บรรยากาศอบอุ่น เรียบง่าย ให้การพักของคุณเป็นเรื่องธรรมชาติ',
      feature3Title: 'ช่วงเวลาที่แชร์ได้', feature3Text: 'จะมากับเพื่อนหรือมากับตัวเอง ทุกช่วงเวลาก็มีความหมาย',
      contactEyebrow: 'SAY HELLO, STAY A WHILE', contactLine1: 'วันนี้คุณ', contactLine2: 'พักใจหรือยัง?',
      contactDesc: 'มีเรื่องอยากบอก หรือแค่อยากส่งคำทักทาย? ทดลองกรอกฟอร์มด้านข้างได้เลย',
      contactInfoTitle: 'Leaf Café — Demo concept', contactInfoDesc: 'เว็บไซต์ตัวอย่าง ไม่ใช่ร้านค้าที่เปิดให้บริการจริง',
      formEyebrow: 'A LITTLE NOTE FROM YOU ✳', formName: 'ชื่อของคุณ', formEmail: 'อีเมล', formMessage: 'ข้อความถึงเรา',
      formNamePlaceholder: 'ชื่อของคุณ', formMessagePlaceholder: 'เล่าอะไรให้เราฟังหน่อย...', formSubmit: 'ลองส่งข้อความ',
      formNote: 'Demo เท่านั้น — ข้อความจะไม่ถูกส่งหรือบันทึกที่เซิร์ฟเวอร์',
      formSuccess: 'เรียบร้อย! นี่คือการส่งข้อความตัวอย่าง ไม่มีข้อมูลใดถูกส่งออกไป ☘',
      formError: 'กรุณากรอกชื่อ (อย่างน้อย 2 ตัวอักษร), อีเมลที่ถูกต้อง และข้อความอย่างน้อย 10 ตัวอักษร',
      footerTagline: 'A small pause. A brighter day.', backTop: 'กลับด้านบน', footerDemo: 'คาเฟ่สมมติสำหรับแสดงผลงานเว็บไซต์',
      footerCredit: 'ภาพประกอบสร้างขึ้นสำหรับ Demo · ไม่รับออร์เดอร์หรือส่งข้อความจริง',
      bagEyebrow: 'YOUR LITTLE PICKS', bagTitle: 'รายการที่เลือก', bagNote: 'ตัวอย่างตะกร้าเท่านั้น ยังไม่รองรับการสั่งซื้อหรือชำระเงินจริง',
      bagTotal: 'ราคารวมโดยประมาณ', bagContinue: 'เลือกเมนูต่อ', bagEmpty: 'ยังไม่มีเมนูในรายการ ลองเลือกเมนูที่ชอบดูนะ ♡', bagRemove: 'นำออก',
      bagClose: 'ปิดรายการทดลอง', bagOpen: 'เปิดรายการที่เลือก', menuOpen: 'เปิดเมนูนำทาง', menuClose: 'ปิดเมนูนำทาง', currency: '฿', pageTitle: 'Leaf Café — พักใจ แล้วจิบความสุข'
    },
    en: {
      skip: 'Skip to main content', topNote: 'Good days begin with a little pause and a lovely cup of matcha',
      navMenu: 'Our menu', navStory: 'Our story', navExperience: 'The experience', navContact: 'Say hello', navCta: 'Say hello ↗',
      heroEyebrow: 'A LITTLE GREEN, A LOT OF JOY', heroLine1: 'Slow down.', heroLine2: 'Sip a little.', heroLine3: 'Feel good. ✳',
      heroDesc: 'When life moves a little too fast, take a moment for your favorite matcha, a comforting pastry, and the simple joy of slowing down.',
      heroBrowse: 'Explore our menu', heroStory: 'Meet Leaf Café', heroProofTitle: 'Made with care, every time', heroProofDesc: 'A mindful little café concept',
      heroTagTop: "TODAY'S LITTLE JOY", heroAlt: 'Illustration of an iced matcha latte with leafy accents and strawberry',
      menuEyebrow: 'MADE TO MAKE YOU SMILE', menuTitle1: 'A treat for', menuTitle2: 'every moment', menuDesc: 'Find your feel-good drink, then make it sweeter with a little treat.',
      filterAll: 'All goodies', filterDrink: 'Drinks', filterDessert: 'Desserts', menuFootnote: 'Menu items and prices are fictional for portfolio demonstration only.',
      categoryDrink: 'DRINKS', categoryDessert: 'DESSERTS', badgePopular: 'Popular', badgeNew: 'New', addToBag: 'Add to demo list', addToast: 'Added to your demo picks',
      storyEyebrow: "HELLO, WE'RE LEAF CAFÉ", storyLine1: 'Little joys.', storyLine2: 'Unhurried days.',
      storyText1: 'We believe a good drink is more than something to sip. It is a gentle reminder to step away from the noise and enjoy the moment you are in.',
      storyText2: 'Leaf Café is imagined as a cozy corner for good conversations, favorite books, and days when you want to be a little kinder to yourself.',
      storySignature: 'little moments matter', storyArtLabel: 'A CORNER TO SLOW DOWN', storyAlt: 'Illustrated café interior with a wooden table and sunlit windows',
      experienceEyebrow: 'MORE THAN A CUP', experienceTitle1: 'More joy,', experienceTitle2: 'your own way',
      experienceDesc: 'Thoughtful little details that help an everyday moment feel special.',
      feature1Title: 'Made thoughtfully', feature1Text: 'Every drink is imagined with balanced flavors and attention to detail.',
      feature2Title: 'Room to breathe', feature2Text: 'A warm, simple space where taking a break comes naturally.',
      feature3Title: 'Moments together', feature3Text: 'With a friend or on your own, every little moment can mean a lot.',
      contactEyebrow: 'SAY HELLO, STAY A WHILE', contactLine1: 'Have you had', contactLine2: 'your pause today?',
      contactDesc: 'Have something to share? Try out the little demo form here.',
      contactInfoTitle: 'Leaf Café — Demo concept', contactInfoDesc: 'Fictional café website; not an operating business.',
      formEyebrow: 'A LITTLE NOTE FROM YOU ✳', formName: 'Your name', formEmail: 'Email address', formMessage: 'Your message',
      formNamePlaceholder: 'Your name', formMessagePlaceholder: 'Tell us a little something...', formSubmit: 'Try the demo form',
      formNote: 'Demo only — no message is sent or saved to a server.',
      formSuccess: 'All set! This was only a demo — no information was sent anywhere. ☘',
      formError: 'Please enter a name (2+ characters), a valid email, and a message (10+ characters).',
      footerTagline: 'A small pause. A brighter day.', backTop: 'Back to top', footerDemo: 'Fictional café concept for a web development portfolio.',
      footerCredit: 'Original demo illustrations · No real orders or messages',
      bagEyebrow: 'YOUR LITTLE PICKS', bagTitle: 'Your little picks', bagNote: 'Demo selection only. No real orders or payments are available.',
      bagTotal: 'Estimated total', bagContinue: 'Keep exploring', bagEmpty: 'Your list is empty. Find something lovely on the menu ♡', bagRemove: 'Remove',
      bagClose: 'Close sample selection', bagOpen: 'Open selected items', menuOpen: 'Open navigation menu', menuClose: 'Close navigation menu', currency: '฿', pageTitle: 'Leaf Café — A little pause, a lot of joy'
    }
  };

  const products = [
    { id:'matcha', category:'drink', price:135, image:'menu-matcha.svg', label:'popular', th:{name:'Signature Matcha', desc:'มัทฉะละมุน หอมชา เข้มกำลังดี'}, en:{name:'Signature Matcha',desc:'Smooth, earthy matcha with a gentle finish.'}},
    { id:'strawberry', category:'drink', price:155, image:'menu-strawberry.svg', label:'new', th:{name:'Strawberry Cloud', desc:'ความหอมของมัทฉะกับสตรอว์เบอร์รีหวานอมเปรี้ยว'}, en:{name:'Strawberry Cloud',desc:'A sweet-tart berry twist on a matcha favorite.'}},
    { id:'coffee', category:'drink', price:120, image:'menu-coffee.svg', label:'', th:{name:'Slow Morning Coffee', desc:'กาแฟนมกลมกล่อมสำหรับเช้าวันสบาย'}, en:{name:'Slow Morning Coffee',desc:'A mellow coffee for the slowest mornings.'}},
    { id:'cheesecake', category:'dessert', price:165, image:'menu-cheesecake.svg', label:'popular', th:{name:'Matcha Cheesecake', desc:'ชีสเค้กเนื้อนุ่ม หวานน้อย หอมมัทฉะ'}, en:{name:'Matcha Cheesecake',desc:'Creamy matcha cheesecake, just sweet enough.'}},
    { id:'croissant', category:'dessert', price:95, image:'menu-croissant.svg', label:'', th:{name:'Butter Croissant', desc:'ครัวซองต์ชั้นบางกรอบ หอมเนยอบสด'}, en:{name:'Butter Croissant',desc:'Flaky layers and a warm buttery finish.'}},
    { id:'cookies', category:'dessert', price:85, image:'menu-cookies.svg', label:'new', th:{name:'Matcha Cookies', desc:'คุกกี้มัทฉะกรอบนอกนุ่มใน'}, en:{name:'Matcha Cookies',desc:'Soft-centered cookies with a matcha twist.'}}
  ];

  const state = { lang: 'th', filter: 'all', bag: new Map(), menuOpen: false, bagOpen: false };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  let toastTimer = null;
  let prevFocus = null;
  try { if (localStorage.getItem('leaf-cafe-lang') === 'en') state.lang = 'en'; } catch { /* local file storage may be unavailable */ }

  function tr(key) { return copy[state.lang][key] || key; }
  function assetUrl(filename) { return (window.__LEAF_ASSETS__ && window.__LEAF_ASSETS__[filename]) || `assets/${filename}`; }
  function formatPrice(n) { return `${tr('currency')}${n.toLocaleString('en-US')}`; }
  function showToast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2300);
  }

  function renderProducts() {
    const grid = $('#product-grid');
    grid.replaceChildren();
    for (const product of products.filter((p) => state.filter === 'all' || p.category === state.filter)) {
      const card = document.createElement('article'); card.className = 'product-card';
      const media = document.createElement('div'); media.className = 'product-media';
      const img = document.createElement('img'); img.src = assetUrl(product.image); img.alt = product[state.lang].name; img.loading = 'lazy'; img.width = 500; img.height = 420;
      media.append(img);
      if (product.label) { const chip=document.createElement('span'); chip.className='product-chip'; chip.textContent=tr(product.label === 'new'?'badgeNew':'badgePopular');media.append(chip); }
      const meta = document.createElement('div'); meta.className = 'product-meta';
      const category=document.createElement('p'); category.className='product-category'; category.textContent=tr(product.category==='drink'?'categoryDrink':'categoryDessert');
      const title=document.createElement('h3');title.className='product-title';title.textContent=product[state.lang].name;
      const desc=document.createElement('p');desc.className='product-desc';desc.textContent=product[state.lang].desc;
      const bottom=document.createElement('div');bottom.className='product-bottom';
      const price=document.createElement('span');price.className='product-price';price.textContent=formatPrice(product.price);
      const add=document.createElement('button'); add.type='button';add.className='add-button';add.textContent='+';add.title=`${tr('addToBag')}: ${product[state.lang].name}`;add.setAttribute('aria-label',add.title);add.addEventListener('click',()=>{state.bag.set(product.id,(state.bag.get(product.id)||0)+1);updateBag();showToast(tr('addToast'));});
      bottom.append(price,add);meta.append(category,title,desc,bottom);card.append(media,meta);grid.append(card);
    }
  }

  function updateBag() {
    const count = Array.from(state.bag.values()).reduce((a,b)=>a+b,0);
    $('#bag-count').textContent=String(count);
    const items = $('#bag-items');items.replaceChildren();
    let total=0;
    if (!count) {const empty=document.createElement('p');empty.className='bag-empty';empty.textContent=tr('bagEmpty');items.append(empty);}
    for (const [id,quantity] of state.bag) {
      const product=products.find((p)=>p.id===id);if(!product) continue;
      total += product.price*quantity;
      const item=document.createElement('div');item.className='bag-item';
      const img=document.createElement('img');img.src=assetUrl(product.image);img.alt='';
      const wrap=document.createElement('div');const name=document.createElement('strong');name.textContent=product[state.lang].name;
      const detail=document.createElement('small');detail.textContent=`${quantity} × ${formatPrice(product.price)}`;wrap.append(name,detail);
      const remove=document.createElement('button');remove.type='button';remove.className='bag-remove';remove.textContent=tr('bagRemove');remove.setAttribute('aria-label',`${tr('bagRemove')} ${product[state.lang].name}`);remove.addEventListener('click',()=>{state.bag.delete(id);updateBag();});
      item.append(img,wrap,remove);items.append(item);
    }
    $('#bag-total').textContent=formatPrice(total);
  }

  function applyLanguage() {
    document.documentElement.lang=state.lang;
    document.title=tr('pageTitle');
    $$('[data-i18n]').forEach((el)=>{el.textContent=tr(el.dataset.i18n);});
    $$('[data-placeholder-key]').forEach((el)=>{el.placeholder=tr(el.dataset.placeholderKey);});
    $$('[data-alt-key]').forEach((el)=>{el.alt=tr(el.dataset.altKey);});
    $('#lang-current').textContent=state.lang.toUpperCase();
    $('#lang-toggle').setAttribute('aria-label',state.lang==='th'?'Switch language to English':'เปลี่ยนภาษาเป็นไทย');
    $('#bag-open').setAttribute('aria-label',tr('bagOpen'));
    $('#bag-close').setAttribute('aria-label',tr('bagClose'));
    $('#menu-toggle').setAttribute('aria-label',tr(state.menuOpen?'menuClose':'menuOpen'));
    $('#form-feedback').textContent='';
    renderProducts();updateBag();
  }

  function toggleMobileMenu(force) {
    state.menuOpen=typeof force==='boolean'?force:!state.menuOpen;
    $('#mobile-nav').hidden=!state.menuOpen;
    $('#menu-toggle').setAttribute('aria-expanded',String(state.menuOpen));
    $('#menu-toggle').setAttribute('aria-label',tr(state.menuOpen?'menuClose':'menuOpen'));
  }

  function toggleBag(open) {
    state.bagOpen=open;
    const drawer=$('#bag-drawer');const backdrop=$('#drawer-backdrop');
    if(open){prevFocus=document.activeElement;backdrop.hidden=false;drawer.inert=false;drawer.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');requestAnimationFrame(()=>{drawer.classList.add('is-open');backdrop.classList.add('is-open');$('#bag-close').focus();});}
    else{drawer.classList.remove('is-open');backdrop.classList.remove('is-open');drawer.inert=true;drawer.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');setTimeout(()=>{if(!state.bagOpen)backdrop.hidden=true;},300);if(prevFocus&&typeof prevFocus.focus==='function')prevFocus.focus();}
  }

  $('#lang-toggle').addEventListener('click',()=>{state.lang=state.lang==='th'?'en':'th';try{localStorage.setItem('leaf-cafe-lang',state.lang);}catch{}applyLanguage();});
  $$('.filter-button').forEach((button)=>button.addEventListener('click',()=>{state.filter=button.dataset.filter;$$('.filter-button').forEach((b)=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});renderProducts();}));
  $('#menu-toggle').addEventListener('click',()=>toggleMobileMenu());
  $$('#mobile-nav a').forEach((a)=>a.addEventListener('click',()=>toggleMobileMenu(false)));
  $('#bag-open').addEventListener('click',()=>toggleBag(true));
  $('#bag-close').addEventListener('click',()=>toggleBag(false));
  $('#drawer-backdrop').addEventListener('click',()=>toggleBag(false));
  $('#bag-continue').addEventListener('click',()=>toggleBag(false));
  document.addEventListener('keydown',(event)=>{
    if(event.key==='Escape'){if(state.bagOpen)toggleBag(false);if(state.menuOpen)toggleMobileMenu(false);}
    if(event.key==='Tab'&&state.bagOpen){const focusables=$$('#bag-drawer button, #bag-drawer a').filter(el=>!el.disabled);const first=focusables[0],last=focusables.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
  });
  $('#contact-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const form=event.currentTarget;
    const name=form.elements.name.value.trim();const email=form.elements.email.value.trim();const message=form.elements.message.value.trim();
    const valid=name.length>=2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && message.length>=10;
    const feedback=$('#form-feedback');feedback.classList.toggle('is-error',!valid);feedback.textContent=tr(valid?'formSuccess':'formError');
    if(valid)form.reset();
  });
  $('#copyright-year').textContent=String(new Date().getFullYear());
  applyLanguage();
})();
