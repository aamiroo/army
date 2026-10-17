/* data.js — درجات ارتش جمهوری اسلامی ایران */
var CAT_META = {
  "enlisted": {
    name: "سربازان",
    nameEn: "Enlisted",
    description: "سربازان ستون فقرات ارتش را تشکیل می‌دهند. آن‌ها وظایف عملیاتی و تاکتیکی حیاتی را در واحدهای نظامی انجام می‌دهند و نقش مستقیم در اجرای مأموریت‌های محوله دارند.",
    descriptionEn: "Enlisted soldiers form the backbone of the army. They perform vital operational and tactical duties in military units and play a direct role in executing assigned missions.",
    color: "#2d6a4f"
  },
  "nco": {
    name: "درجه‌داران",
    nameEn: "Non-Commissioned Officers",
    description: "درجه‌داران پل ارتباطی میان سربازان و افسران هستند. آن‌ها تجربه و تخصص عملیاتی دارند و نقش کلیدی در فرماندهی، آموزش و مدیریت واحدهای کوچک ایفا می‌کنند.",
    descriptionEn: "NCOs serve as the bridge between enlisted soldiers and officers. They possess operational experience and expertise, playing a key role in commanding, training and managing small units.",
    color: "#1a5276"
  },
  "junior-officer": {
    name: "افسران جزء",
    nameEn: "Junior Officers",
    description: "افسران جزء نخستین سطح فرماندهی افسری را تشکیل می‌دهند. آن‌ها فرماندهی واحدهای کوچک تا متوسط را بر عهده دارند و مسئول برنامه‌ریزی و اجرای عملیات محوله‌اند.",
    descriptionEn: "Junior Officers form the first level of officer command. They command small to medium units and are responsible for planning and executing assigned operations.",
    color: "#0e7490"
  },
  "senior-officer": {
    name: "افسران ارشد",
    nameEn: "Senior Officers",
    description: "افسران ارشد فرماندهی واحدهای بزرگ‌تر و هماهنگی عملیات گسترده را بر عهده دارند. آن‌ها در سطح راهبردی و عملیاتی تصمیم‌گیری می‌کنند.",
    descriptionEn: "Senior Officers command larger units and coordinate extensive operations. They make strategic and operational level decisions.",
    color: "#7c2d12"
  },
  "general": {
    name: "امیران",
    nameEn: "General Officers",
    description: "امیران عالی‌ترین سطوح فرماندهی نظامی را در ارتش در اختیار دارند. آن‌ها مسئول راهبری کلی نیروها، تعیین سیاست‌های نظامی و فرماندهی عملیات بزرگ هستند.",
    descriptionEn: "General Officers hold the highest levels of military command in the army. They are responsible for overall force leadership, setting military policy and commanding major operations.",
    color: "#8b7320"
  }
};

var CAT_ORDER = ["enlisted", "nco", "junior-officer", "senior-officer", "general"];

var ranks = [
  { id:"sarbaz", nameFa:"سرباز", nameEn:"Private", category:"enlisted", order:1, insignia:"darage/Sarbaz_-k(1).png", description:"پایین‌ترین درجه نظامی در ارتش.", descriptionEn:"The lowest military rank in the army." },
  { id:"sarbaz-dovom", nameFa:"سرباز دوم", nameEn:"Private Second Class", category:"enlisted", order:2, insignia:"darage/Sarbaz_2-c.png", description:"" },
  { id:"sarbaz-yekom", nameFa:"سرباز یکم", nameEn:"Private First Class", category:"enlisted", order:3, insignia:"darage/Sarbaz_1-k.png", description:"" },
  { id:"sarjukhe", nameFa:"سرجوخه", nameEn:"Corporal", category:"nco", order:4, insignia:"darage/Sarjukhe-c.png", description:"" },
  { id:"goruhban-3", nameFa:"گروهبان سوم", nameEn:"Third Sergeant", category:"nco", order:6, insignia:"darage/Goruhban_3-k.png", description:"" },
  { id:"goruhban-2", nameFa:"گروهبان دوم", nameEn:"Second Sergeant", category:"nco", order:7, insignia:"darage/Goruhban_2-c.png", description:"" },
  { id:"goruhban-1", nameFa:"گروهبان یکم", nameEn:"First Sergeant", category:"nco", order:8, insignia:"darage/Goruhban_1-k.png", description:"" },
  { id:"ostovar-2", nameFa:"استوار دوم", nameEn:"Second Warrant Officer", category:"nco", order:9, insignia:"darage/Ostovar_2-c.png", description:"" },
  { id:"ostovar-1", nameFa:"استوار یکم", nameEn:"First Warrant Officer", category:"nco", order:10, insignia:"darage/Ostovar_1-k.png", description:"" },
  { id:"sotvan-3", nameFa:"ستوان سوم", nameEn:"Third Lieutenant", category:"junior-officer", order:11, insignia:"darage/Sotvan_3.png", description:"پایین‌ترین درجه افسری.", descriptionEn:"The lowest officer rank." },
  { id:"sotvan-2", nameFa:"ستوان دوم", nameEn:"Second Lieutenant", category:"junior-officer", order:12, insignia:"darage/Sotvan_2.png", description:"" },
  { id:"sotvan-1", nameFa:"ستوان یکم", nameEn:"First Lieutenant", category:"junior-officer", order:13, insignia:"darage/Sotvan_1.png", description:"" },
  { id:"sarvan", nameFa:"سروان", nameEn:"Captain", category:"junior-officer", order:14, insignia:"darage/Sarvan.png", description:"" },
  { id:"sargord", nameFa:"سرگرد", nameEn:"Major", category:"junior-officer", order:15, insignia:"darage/Sargord.png", description:"" },
  { id:"sarhang-2", nameFa:"سرهنگ دوم", nameEn:"Lieutenant Colonel", category:"senior-officer", order:16, insignia:"darage/Sarhang_2.png", description:"" },
  { id:"sarhang", nameFa:"سرهنگ", nameEn:"Colonel", category:"senior-officer", order:17, insignia:"darage/Sarhang_1.png", description:"" },
  { id:"sartip-2", nameFa:"سرتیپ دوم", nameEn:"Second Brigadier General", category:"senior-officer", order:18, insignia:"darage/Sartip_2.png", description:"" },
  { id:"sartip", nameFa:"سرتیپ", nameEn:"Brigadier General", category:"senior-officer", order:19, insignia:"darage/Sartip.png", description:"" },
  { id:"sarlashkar", nameFa:"سرلشکر", nameEn:"Major General", category:"general", order:20, insignia:"darage/Sarlashgar.png", description:"" },
  { id:"sepahbod", nameFa:"سپهبد", nameEn:"Lieutenant General", category:"general", order:21, insignia:"darage/Sepahbod.png", description:"" },
  { id:"arteshbod", nameFa:"ارتشبد", nameEn:"Army General", category:"general", order:22, insignia:"darage/Arteshbod.png", description:"عالی‌ترین درجه نظامی در ارتش.", descriptionEn:"The highest military rank in the army." }
];

/* Organizational hierarchy — data-driven, editable later */
var hierarchyData = [
  { id:"fire-team", level:"levels", name:"تیم آتش", nameEn:"Fire Team", rangeFa:"۲ تا ۴ نفر", rangeEn:"2–4 personnel", scale:6 },
  { id:"squad", level:"levels", name:"جوخه", nameEn:"Squad", rangeFa:"۵ تا ۱۵ نفر", rangeEn:"5–15 personnel", scale:10 },
  { id:"group", level:"levels", name:"گروه", nameEn:"Group", rangeFa:"۱۵ تا ۲۵ نفر", rangeEn:"15–25 personnel", scale:14 },
  { id:"platoon", level:"levels", name:"دسته", nameEn:"Platoon", rangeFa:"حدود ۴۰ تا ۸۰ نفر", rangeEn:"Approximately 40–80 personnel", scale:18 },
  { id:"company", level:"levels", name:"گروهان", nameEn:"Company", rangeFa:"حدود ۸۰ تا ۲۵۰ نفر", rangeEn:"Approximately 80–250 personnel", scale:22 },
  { id:"battalion", level:"levels", name:"گردان", nameEn:"Battalion", rangeFa:"حدود ۳۰۰ تا ۱٬۰۰۰ نفر", rangeEn:"Approximately 300–1,000 personnel", scale:26 },
  { id:"regiment", level:"levels", name:"هنگ", nameEn:"Regiment", rangeFa:"حدود ۱٬۰۰۰ تا ۵٬۵۰۰ نفر", rangeEn:"Approximately 1,000–5,500 personnel", scale:30 },
  { id:"brigade", level:"levels", name:"تیپ", nameEn:"Brigade", rangeFa:"حدود ۶٬۰۰۰ تا ۱۰٬۰۰۰ نفر", rangeEn:"Approximately 6,000–10,000 personnel", scale:34 },
  { id:"division", level:"levels", name:"لشکر", nameEn:"Division", rangeFa:"حدود ۱۰٬۰۰۰ تا ۲۵٬۰۰۰ نفر", rangeEn:"Approximately 10,000–25,000 personnel", scale:38 }
];
