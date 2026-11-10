/*
 * Leaf Café — all editable content in one place.
 *
 * - `copy` holds every UI string in Thai (th) and English (en). Both languages must
 *   have the same keys; `npm test` fails if one is missing.
 * - `{name}` style placeholders are filled in by LeafLogic.translate().
 * - `products` is the fictional demo menu. Prices are in Thai baht.
 */
(function (root) {
  "use strict";

  const copy = {
    th: {
      pageTitle: "Leaf Café — พักใจ แล้วจิบความสุข",
      skip: "ข้ามไปยังเนื้อหาหลัก",
      topNote: "ชีวิตดีขึ้นได้ ด้วยช่วงเวลาพักเล็ก ๆ และมัทฉะดี ๆ",
      homeLabel: "Leaf Café หน้าแรก",
      mainNavLabel: "เมนูหลัก",
      langGroupLabel: "เลือกภาษา",
      navMenu: "เมนู",
      navStory: "เรื่องราวของเรา",
      navExperience: "บรรยากาศ",
      navContact: "ติดต่อ",
      navCta: "แวะมาทักทาย",
      menuOpen: "เปิดเมนูนำทาง",
      menuClose: "ปิดเมนูนำทาง",

      heroEyebrow: "A little green, a lot of joy",
      heroLine1: "ให้ทุกวัน",
      heroLine2: "ละมุนขึ้น",
      heroLine3: "ทีละจิบ",
      heroDesc:
        "ในวันที่โลกหมุนเร็ว เราชวนคุณพักสักนิดกับมัทฉะแก้วโปรด ขนมอบหอม ๆ และช่วงเวลาดี ๆ ที่อยากเก็บไว้นานอีกหน่อย",
      heroBrowse: "ดูเมนูทั้งหมด",
      heroStory: "รู้จัก Leaf Café",
      heroProofTitle: "ทำด้วยใจ ใส่ใจทุกแก้ว",
      heroProofDesc: "คาเฟ่มัทฉะในจินตนาการ สำหรับวันที่อยากช้าลง",
      heroTagTop: "เมนูแนะนำวันนี้",
      heroAlt: "แก้วมัทฉะลาเต้เย็นวางบนโต๊ะสีครีมรับแสงแดด",
      tickerLabel: "ทำด้วยมือ มัทฉะและอื่น ๆ ช่วงเวลาช้า ๆ ของคุณ",

      menuEyebrow: "Made to make you smile",
      menuTitle1: "อร่อยกับ",
      menuTitle2: "ทุกโมเมนต์",
      menuDesc: "เลือกเครื่องดื่มแก้วที่ใช่ แล้วเติมความสุขด้วยขนมโปรด",
      filterLabel: "หมวดหมู่เมนู",
      filterAll: "ทั้งหมด",
      filterDrink: "เครื่องดื่ม",
      filterDessert: "ขนมหวาน",
      menuStatus: "แสดง {count} รายการ",
      menuFootnote:
        "ราคาและรายการอาหารเป็นข้อมูลสมมติเพื่อสาธิตเว็บไซต์เท่านั้น ภาพเมนูเป็นภาพสต็อกจาก Pexels ไม่ใช่สินค้าจริงของร้าน",
      categoryDrink: "เครื่องดื่ม",
      categoryDessert: "ขนมหวาน",
      badgePopular: "ยอดนิยม",
      badgeNew: "มาใหม่",
      addToBag: "เพิ่ม {name} ลงรายการ",
      addToast: "เพิ่ม {name} ลงรายการแล้ว",

      storyEyebrow: "Hello, we're Leaf Café",
      storyLine1: "ความสุขเล็ก ๆ",
      storyLine2: "ที่ไม่ต้องรีบร้อน",
      storyText1:
        "เราเชื่อว่าแก้วเครื่องดื่มดี ๆ ไม่ได้มีไว้แค่ดับกระหาย แต่เป็นข้ออ้างเล็ก ๆ ให้คุณได้พักจากความวุ่นวาย และกลับมาอยู่กับช่วงเวลาตรงหน้า",
      storyText2:
        "Leaf Café จึงถูกคิดขึ้นมาให้เป็นมุมอบอุ่นสำหรับบทสนทนาดี ๆ หนังสือเล่มโปรด และวันที่อยากใจดีกับตัวเองอีกนิด",
      storySignature: "ช่วงเวลาเล็ก ๆ ก็มีความหมาย",
      storyArtLabel: "มุมเล็ก ๆ สำหรับพักใจ",
      storyAlt: "ภาพวาดภายในคาเฟ่ที่มีโต๊ะไม้และหน้าต่างรับแสง",

      experienceEyebrow: "More than a cup",
      experienceTitle1: "เติมเต็มวันดี ๆ",
      experienceTitle2: "ในแบบของคุณ",
      experienceDesc:
        "ทุกอย่างเริ่มจากความตั้งใจเล็ก ๆ ที่อยากให้คุณยิ้มได้ง่ายขึ้น",
      feature1Title: "คัดสรรด้วยใจ",
      feature1Text: "ทุกแก้วออกแบบจากรสชาติที่กลมกล่อมและความใส่ใจในรายละเอียด",
      feature2Title: "มุมพักที่พอดี",
      feature2Text:
        "บรรยากาศอบอุ่น เรียบง่าย ให้การพักของคุณเป็นเรื่องธรรมชาติ",
      feature3Title: "ช่วงเวลาที่แชร์ได้",
      feature3Text: "จะมากับเพื่อนหรือมากับตัวเอง ทุกช่วงเวลาก็มีความหมาย",

      contactEyebrow: "Say hello, stay a while",
      contactLine1: "วันนี้คุณ",
      contactLine2: "พักใจหรือยัง?",
      contactDesc:
        "มีเรื่องอยากบอก หรือแค่อยากส่งคำทักทาย? ทดลองกรอกฟอร์มด้านข้างได้เลย",
      contactInfoTitle: "Leaf Café เป็นร้านสมมติ",
      contactInfoDesc: "เว็บไซต์ตัวอย่าง ไม่ใช่ร้านค้าที่เปิดให้บริการจริง",
      formEyebrow: "ฝากข้อความถึงเรา",
      formName: "ชื่อของคุณ",
      formEmail: "อีเมล",
      formMessage: "ข้อความถึงเรา",
      formNamePlaceholder: "เช่น มะลิ",
      formMessagePlaceholder: "เล่าอะไรให้เราฟังหน่อย...",
      formSubmit: "ลองส่งข้อความ",
      formNote: "Demo เท่านั้น ข้อความจะไม่ถูกส่งหรือบันทึกที่เซิร์ฟเวอร์",
      formSuccess:
        "เรียบร้อย! นี่คือการส่งข้อความตัวอย่าง ไม่มีข้อมูลใดถูกส่งออกไป",
      formErrorSummary: "กรุณาแก้ไข {count} ช่องที่ระบุไว้ด้านบน",
      errNameRequired: "กรุณากรอกชื่อ",
      errNameShort: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร",
      errEmailRequired: "กรุณากรอกอีเมล",
      errEmailInvalid: "รูปแบบอีเมลไม่ถูกต้อง เช่น hello@example.com",
      errMessageRequired: "กรุณาเขียนข้อความ",
      errMessageShort: "ข้อความต้องมีอย่างน้อย 10 ตัวอักษร",
      errTooLong: "ข้อความยาวเกินกำหนด",

      footerTagline: "A small pause. A brighter day.",
      backTop: "กลับด้านบน",
      footerDemo: "คาเฟ่สมมติสำหรับแสดงผลงานเว็บไซต์",
      footerCredit:
        "ภาพประกอบสร้างขึ้นสำหรับ Demo · ไม่รับออร์เดอร์หรือส่งข้อความจริง",

      bagOpen: "เปิดรายการที่เลือก ({count} ชิ้น)",
      bagEyebrow: "Your little picks",
      bagTitle: "รายการที่เลือก",
      bagClose: "ปิดรายการที่เลือก",
      bagNote: "ตัวอย่างตะกร้าเท่านั้น ยังไม่รองรับการสั่งซื้อหรือชำระเงินจริง",
      bagEmpty: "ยังไม่มีเมนูในรายการ ลองเลือกเมนูที่ชอบดูนะ",
      bagEach: "ชิ้นละ {price}",
      bagDecrease: "ลดจำนวน {name}",
      bagIncrease: "เพิ่มจำนวน {name}",
      bagQuantity: "จำนวน {name}",
      bagQtyStatus: "{name} จำนวน {count}",
      bagRemove: "นำออก",
      bagRemoveLabel: "นำ {name} ออกจากรายการ",
      bagRemoved: "นำ {name} ออกแล้ว",
      bagTotal: "ราคารวมโดยประมาณ",
      bagContinue: "เลือกเมนูต่อ",
    },
    en: {
      pageTitle: "Leaf Café — A little pause, a lot of joy",
      skip: "Skip to main content",
      topNote: "Good days begin with a little pause and a lovely cup of matcha",
      homeLabel: "Leaf Café home",
      mainNavLabel: "Main navigation",
      langGroupLabel: "Choose language",
      navMenu: "Menu",
      navStory: "Our story",
      navExperience: "The experience",
      navContact: "Contact",
      navCta: "Say hello",
      menuOpen: "Open navigation menu",
      menuClose: "Close navigation menu",

      heroEyebrow: "A little green, a lot of joy",
      heroLine1: "Slow down.",
      heroLine2: "Sip a little.",
      heroLine3: "Feel good.",
      heroDesc:
        "When life moves a little too fast, take a moment for your favorite matcha, a comforting pastry, and the simple joy of slowing down.",
      heroBrowse: "See the full menu",
      heroStory: "Meet Leaf Café",
      heroProofTitle: "Made with care, every time",
      heroProofDesc: "An imaginary matcha café for slower days",
      heroTagTop: "Today's pick",
      heroAlt: "A glass of iced matcha latte on a sunlit cream-coloured table",
      tickerLabel: "Handcrafted with love, matcha and more, your slow moment",

      menuEyebrow: "Made to make you smile",
      menuTitle1: "A treat for",
      menuTitle2: "every moment",
      menuDesc:
        "Find your feel-good drink, then make it sweeter with a little treat.",
      filterLabel: "Menu categories",
      filterAll: "All",
      filterDrink: "Drinks",
      filterDessert: "Desserts",
      menuStatus: "Showing {count} items",
      menuFootnote:
        "Menu items and prices are fictional, for portfolio demonstration only. Menu photos are Pexels stock images, not real products.",
      categoryDrink: "Drink",
      categoryDessert: "Dessert",
      badgePopular: "Popular",
      badgeNew: "New",
      addToBag: "Add {name} to your list",
      addToast: "Added {name} to your list",

      storyEyebrow: "Hello, we're Leaf Café",
      storyLine1: "Little joys.",
      storyLine2: "Unhurried days.",
      storyText1:
        "We believe a good drink is more than something to sip. It is a gentle reminder to step away from the noise and enjoy the moment you are in.",
      storyText2:
        "Leaf Café is imagined as a cozy corner for good conversations, favorite books, and days when you want to be a little kinder to yourself.",
      storySignature: "Little moments matter",
      storyArtLabel: "A corner to slow down",
      storyAlt:
        "Illustrated café interior with a wooden table and sunlit windows",

      experienceEyebrow: "More than a cup",
      experienceTitle1: "More joy,",
      experienceTitle2: "your own way",
      experienceDesc:
        "Thoughtful little details that help an everyday moment feel special.",
      feature1Title: "Made thoughtfully",
      feature1Text:
        "Every drink is imagined with balanced flavors and attention to detail.",
      feature2Title: "Room to breathe",
      feature2Text:
        "A warm, simple space where taking a break comes naturally.",
      feature3Title: "Moments together",
      feature3Text:
        "With a friend or on your own, every little moment can mean a lot.",

      contactEyebrow: "Say hello, stay a while",
      contactLine1: "Have you had",
      contactLine2: "your pause today?",
      contactDesc:
        "Have something to share? Try out the little demo form here.",
      contactInfoTitle: "Leaf Café is fictional",
      contactInfoDesc: "A sample website, not an operating business.",
      formEyebrow: "Leave us a note",
      formName: "Your name",
      formEmail: "Email address",
      formMessage: "Your message",
      formNamePlaceholder: "e.g. Mali",
      formMessagePlaceholder: "Tell us a little something...",
      formSubmit: "Try the demo form",
      formNote: "Demo only. No message is sent or saved to a server.",
      formSuccess:
        "All set! This was only a demo, so nothing was sent anywhere.",
      formErrorSummary: "Please fix the {count} highlighted field(s) above.",
      errNameRequired: "Enter your name.",
      errNameShort: "Your name needs at least 2 characters.",
      errEmailRequired: "Enter your email address.",
      errEmailInvalid: "Enter an email like hello@example.com.",
      errMessageRequired: "Write a message.",
      errMessageShort: "Your message needs at least 10 characters.",
      errTooLong: "This is longer than allowed.",

      footerTagline: "A small pause. A brighter day.",
      backTop: "Back to top",
      footerDemo: "Fictional café concept for a web development portfolio.",
      footerCredit: "Original demo illustrations · No real orders or messages",

      bagOpen: "Open your list ({count} items)",
      bagEyebrow: "Your little picks",
      bagTitle: "Your list",
      bagClose: "Close your list",
      bagNote: "Demo list only. Real orders and payments are not available.",
      bagEmpty: "Your list is empty. Pick something lovely from the menu.",
      bagEach: "{price} each",
      bagDecrease: "Decrease {name}",
      bagIncrease: "Increase {name}",
      bagQuantity: "{name} quantity",
      bagQtyStatus: "{name}: {count}",
      bagRemove: "Remove",
      bagRemoveLabel: "Remove {name} from your list",
      bagRemoved: "Removed {name}",
      bagTotal: "Estimated total",
      bagContinue: "Keep exploring",
    },
  };

  const products = [
    {
      id: "matcha",
      category: "drink",
      price: 135,
      image: "photos/menu-matcha.webp",
      label: "popular",
      th: { name: "Signature Matcha", desc: "มัทฉะละมุน หอมชา เข้มกำลังดี" },
      en: {
        name: "Signature Matcha",
        desc: "Smooth, earthy matcha with a gentle finish.",
      },
    },
    {
      id: "strawberry",
      category: "drink",
      price: 155,
      image: "photos/menu-strawberry.webp",
      label: "new",
      th: {
        name: "Strawberry Cloud",
        desc: "ความหอมของมัทฉะกับสตรอว์เบอร์รีหวานอมเปรี้ยว",
      },
      en: {
        name: "Strawberry Cloud",
        desc: "A sweet-tart berry twist on a matcha favorite.",
      },
    },
    {
      id: "coffee",
      category: "drink",
      price: 120,
      image: "photos/menu-coffee.webp",
      label: "",
      th: {
        name: "Slow Morning Coffee",
        desc: "กาแฟนมกลมกล่อมสำหรับเช้าวันสบาย",
      },
      en: {
        name: "Slow Morning Coffee",
        desc: "A mellow coffee for the slowest mornings.",
      },
    },
    {
      id: "cheesecake",
      category: "dessert",
      price: 165,
      image: "photos/menu-cheesecake.webp",
      label: "popular",
      th: {
        name: "Matcha Cheesecake",
        desc: "ชีสเค้กเนื้อนุ่ม หวานน้อย หอมมัทฉะ",
      },
      en: {
        name: "Matcha Cheesecake",
        desc: "Creamy matcha cheesecake, just sweet enough.",
      },
    },
    {
      id: "croissant",
      category: "dessert",
      price: 95,
      image: "photos/menu-croissant.webp",
      label: "",
      th: { name: "Butter Croissant", desc: "ครัวซองต์ชั้นบางกรอบ หอมเนยอบสด" },
      en: {
        name: "Butter Croissant",
        desc: "Flaky layers and a warm buttery finish.",
      },
    },
    {
      id: "cookies",
      category: "dessert",
      price: 85,
      image: "photos/menu-cookies.webp",
      label: "new",
      th: { name: "Matcha Cookies", desc: "คุกกี้มัทฉะกรอบนอกนุ่มใน" },
      en: {
        name: "Matcha Cookies",
        desc: "Soft-centered cookies with a matcha twist.",
      },
    },
  ];

  root.LeafContent = Object.freeze({ copy, products });
})(globalThis);
