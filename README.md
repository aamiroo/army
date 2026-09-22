# درجات ارتش جمهوری اسلامی ایران · Ranks of the Islamic Republic of Iran Army

A bilingual, cinematic, scroll-driven website that documents the ranks, hierarchy and command structure of the Islamic Republic of Iran Army — from Private to Army General.

وب‌سایتی دوزبانه، سینمایی و مبتنی بر اسکرول که درجات، سلسله‌مراتب و ساختار فرماندهی ارتش جمهوری اسلامی ایران را از سرباز تا ارتشبد به‌نمایش می‌گذارد.

---

## English

### Overview

This is a **dependency-free, front-end-only** website (HTML + CSS + vanilla JavaScript). It presents the 21 military ranks of the Iranian Army across **5 categories**:

| Category (FA) | Category (EN) | Ranks | Accent color |
|---|---|---|---|
| سربازان | Enlisted | 3 | `#2d6a4f` |
| درجه‌داران | Non-Commissioned Officers | 6 | `#1a5276` |
| افسران جزء | Junior Officers | 5 | `#0e7490` |
| افسران ارشد | Senior Officers | 4 | `#7c2d12` |
| امیران | General Officers | 3 | `#8b7320` |

The default language is Persian (Farsi) with an **RTL** layout; English (**LTR**) can be toggled from the navigation bar. The data lives in a single file (`data.js`), so the whole site can be treated as data-driven.

### Features

- **Full bilingual support** — Persian (RTL, default) and English (LTR) with a one-click toggle; the choice is stored in `localStorage`.
- **Cinematic hero section** — fixed hero with a live HTML5 **Canvas** particle background, scroll parallax on the emblem, and a progressive text reveal.
- **Scroll-choreographed content** — full-bleed background images with a slow "Ken Burns" zoom tied to scroll progress, interleaved between rank categories.
- **5 rank categories, 21 ranks** — each rank shown as a chip card with an insignia image; clicking (or pressing Enter/Space) opens a detail modal.
- **Detail modal** — shows rank insignia, category badge, bilingual name and description, with previous/next navigation (also via arrow keys).
- **Hierarchy timeline** — all ranks plotted in ascending order with active-section highlighting.
- **Structure / org section** — a top-to-bottom overview of the five command levels (currently presenting placeholder data, editable in `data.js`).
- **Sticky navigation** — appears after scrolling past the hero, highlights the section in view (scroll-spy via `IntersectionObserver`).
- **Scroll progress bar** and **scroll-reveal animations** for sections and cards.
- **Reduced-motion support** — respects `prefers-reduced-motion: reduce` and disables heavy animations accordingly.
- **Accessibility basics** — keyboard-navigable rank chips and modal, `role="button"`, `role="dialog"`, ARIA labels, `tabindex`.

### Project structure

```
army/
├── index.html                 # Page structure & hero markup
├── app.js                     # Application logic (i18n, nav, animations, modal, timeline, org)
├── data.js                    # Single source of rank & hierarchy data
├── style.css                  # All styling (design tokens, layout, responsive)
├── fonts/
│   ├── fonts.css              # @font-face declarations
│   ├── doran/                 # "Doran" heading font (woff2/woff, weights 300–900)
│   └── vazir/                 # "Vazirmatn" body font (ttf, weights 300–700)
├── darage/                    # Rank insignia images (21 PNGs, referenced by data.js)
├── image/                     # Cinematic section backgrounds (3 images)
├── images/
│   ├── hero-bg.jpg            # Hero background
│   ├── Seal_of_the_Islamic_Republic_of_Iran_Army.svg
│   └── ranks/                 # Legacy SVG rank badges (not currently used)
├── New Folder/                # Unused leftover folder
├── U.S. Army Ranks_2026-*.html # Legacy seed/source document (not used at runtime)
└── .venv/                     # Python virtual environment (not used by the site)
```

### Technologies used

- **HTML5** — semantic page structure, `canvas` element, `meta` tags.
- **CSS3** — custom properties (design tokens), flexbox layouts, media queries for responsiveness, `backdrop-filter` glass panels, generated SVG data-URI background patterns.
- **Vanilla JavaScript** (no frameworks, no build tools):
  - ES5-style IIFE module pattern;
  - `IntersectionObserver` for scroll-spy, reveal animations and cinematic sections;
  - Canvas 2D API for the hero particle field;
  - `localStorage` for language persistence;
  - `matchMedia` + `prefers-reduced-motion` for the reduced-motion mode;
  - `requestAnimationFrame` for smooth scroll-driven effects.
- **Local web fonts** via `@font-face` — Doran (headings) and Vazirmatn (body), both bundled locally (no external CDN calls).

### How it works

1. `index.html` loads the two stylesheets (`fonts/fonts.css`, `style.css`) and the two scripts (`data.js`, then `app.js`).
2. `data.js` defines `CAT_META` (category metadata), `CAT_ORDER` (category ordering) and `ranks` (the 21-rank array), plus `hierarchyData` (structure section).
3. On load, `app.js`:
   - reads the saved language (default `fa`) and applies `dir`/`lang` attributes;
   - builds the sticky-nav links, the 5 rank-category sections (including 3 cinematic background sections), the timeline and the org chart;
   - binds the language toggle, scroll handlers, parallax, progress bar, reveal observer and the detail modal;
4. All of it is generated from `data.js` — there is no hard-coded rank markup beyond the hero and headers.

### Running locally

The site is pure static files — **no dependencies, no install step, no build step**.

- **Option A — open the file directly:**

  ```bash
  open index.html
  ```

- **Option B — serve it with any static file server** (recommended for the smoothest experience):

  ```bash
  python3 -m http.server 8000
  ```

  then visit <http://localhost:8000>.

### Customization

Everything data-driven is edited in **`data.js`**:

- Add/edit/remove ranks in the `ranks` array (`nameFa`, `nameEn`, `category`, `order`, `insignia`, `description`).
- Change category names, descriptions and accent colors in `CAT_META`.
- Reorder categories through `CAT_ORDER`.
- Edit the structure/org content in `hierarchyData`.

Language strings live in the `I18N` object at the top of **`app.js`**; the 3 cinematic background images are controlled by the `CINEMATIC_IMGS` array there.

Visual theming is centralized in the `:root` custom properties in **`style.css`** (colors, fonts, spacing, radii, shadows).

Rank insignia images correspond to the `insignia` paths in `data.js` and live in **`darage/`**.

### Notes

- The intro copy references **22 ranks**, while the current `ranks` array in `data.js` contains **21 entries** (order value `5` is unused). Update either the copy or the data to match.
- Opening via `file://` works (no `fetch` is used); a local server is still recommended.
- The `media-section` video block is a styled placeholder — no video is wired up yet.
- The `New Folder/` directory, `U.S. Army Ranks_*.html`, `images/ranks/*.svg` and `.venv/` are legacy/unused leftovers and are not part of the runtime.
- Health note: this is a historical/informational reference project.

---

## فارسی

### معرفی پروژه

این وب‌سایت یک سند مرجع **فقط‌-فرانت‌اند و بدون وابستگی** (HTML + CSS + جاوااسکریپت خالص) است که ۲۱ درجهٔ نظامی ارتش جمهوری اسلامی ایران را در **۵ گروه اصلی** معرفی می‌کند:

| دسته | نام انگلیسی | تعداد درجات | رنگ نشانگر |
|---|---|---|---|
| سربازان | Enlisted | ۳ | `#2d6a4f` |
| درجه‌داران | Non-Commissioned Officers | ۶ | `#1a5276` |
| افسران جزء | Junior Officers | ۵ | `#0e7490` |
| افسران ارشد | Senior Officers | ۴ | `#7c2d12` |
| امیران | General Officers | ۳ | `#8b7320` |

زبان پیش‌فرض فارسی با چیدمان **راست‌به‌چپ (RTL)** است و از نوار بالای صفحه می‌توان به انگلیسی با چیدمان **چپ‌به‌راست (LTR)** سوئیچ کرد. تمام داده‌ها در یک فایل واحد (`data.js`) نگهداری می‌شوند و سایت ماهیت داده‌محور دارد.

### ویژگی‌ها

- **پشتیبانی کامل از دو زبان** — فارسی (RTL، پیش‌فرض) و انگلیسی (LTR) با یک دکمه برای جابه‌جایی؛ انتخاب کاربر در `localStorage` ذخیره می‌شود.
- **بخش قهرمان (Hero) سینمایی** — ناحیهٔ ثابت با پس‌زمینهٔ ذرات زندهٔ **Canvas**، پارالاکس روی نشان ارتش و نمایان‌شدن تدریجی متن.
- **محتوا بر پایهٔ اسکرول** — تصاویر تمام‌عرض زمینه با بزرگ‌نمایی آهستهٔ «Ken Burns» مرتبط با پیشرفت اسکرول، در میان بخش‌های دسته‌بندی درجات.
- **۵ دسته و ۲۱ درجه** — هر درجه به‌صورت کارت نشان با تصویر نشان (insignia) نمایش داده می‌شود؛ کلیک (یا Enter/Space) یک پنجرهٔ جزئیات باز می‌کند.
- **پنجرهٔ جزئیات** — شامل نشان درجه، برچسب دسته، نام دوزبانه و توضیحات، با پیمایش به درجهٔ قبل/بعد (و پشتیبانی از کلیدهای جهتی).
- **خط زمان سلسله‌مراتب** — همهٔ درجات به ترتیب صعودی با هایلایت درجهٔ فعال.
- **بخش ساختار / سازمان** — نمای کلی از پنج سطح فرماندهی (در حال حاضر با دادهٔ placeholder که در `data.js` قابل ویرایش است).
- **ناوبری چسبان** — پس از رد شدن از قهرمان نمایان می‌شود و بخشِ در حال مشاهده را هایلایت می‌کند (scroll-spy با `IntersectionObserver`).
- **نوار پیشرفت اسکرول** و **انیمیشن‌های reveal** برای بخش‌ها و کارت‌ها.
- **پشتیبانی از کاهش حرکت** — به `prefers-reduced-motion: reduce` احترام می‌گذارد.
- **مبانی دسترس‌پذیری** — کارت‌های درجات و پنجرهٔ جزئیات با صفحه‌کلید قابل استفاده‌اند (`role="button"`، `role="dialog"`، `aria-label`، `tabindex`).

### ساختار پروژه

```
army/
├── index.html                 # ساختار صفحه و مارک‌آپ قهرمان
├── app.js                     # منطق برنامه (دوزبانه‌سازی، ناوبری، انیمیشن‌ها، مودال، تایم‌لاین، سازمان)
├── data.js                    # منبع واحد داده‌های درجات و سلسله‌مراتب
├── style.css                  # تمام استایل‌ها (توکن‌های طراحی، چیدمان، ریسپانسیو)
├── fonts/
│   ├── fonts.css              # تعریف @font-face
│   ├── doran/                 # فونت تیتر «Doran» (woff2/woff، وزن‌های ۳۰۰ تا ۹۰۰)
│   └── vazir/                 # فونت متن «Vazirmatn» (ttf، وزن‌های ۳۰۰ تا ۷۰۰)
├── darage/                    # تصاویر نشان درجات (۲۱ فایل PNG که در data.js به آن‌ها اشاره شده)
├── image/                     # پس‌زمینه‌های سینمایی (۳ تصویر)
├── images/
│   ├── hero-bg.jpg            # پس‌زمینهٔ قهرمان
│   ├── Seal_of_the_Islamic_Republic_of_Iran_Army.svg
│   └── ranks/                 # نشان‌های SVG قدیمی (در حال حاضر استفاده نمی‌شوند)
├── New Folder/                # پوشهٔ باقی‌ماندهٔ بلااستفاده
├── U.S. Army Ranks_2026-*.html # سند منبع قدیمی (در اجرا استفاده نمی‌شود)
└── .venv/                     # محیط مجازی پایتون (مورد استفادهٔ سایت نیست)
```

### تکنولوژی‌های استفاده‌شده

- **HTML5** — ساختار معنایی صفحه، المان `canvas`، تگ‌های `meta`.
- **CSS3** — متغیرهای سفارشی (توکن‌های طراحی)، چیدمان flexbox، media query برای ریسپانسیو، پنل‌های شیشه‌ای با `backdrop-filter`، الگوهای SVG-URI پس‌زمینه.
- **جاوااسکریپت خالص** (بدون فریم‌ورک و بدون ابزار ساخت):
  - الگوی ماژول IIFE سبک ES5؛
  - `IntersectionObserver` برای scroll-spy، انیمیشن‌های reveal و بخش‌های سینمایی؛
  - Canvas 2D API برای ذرات پس‌زمینهٔ قهرمان؛
  - `localStorage` برای ذخیرهٔ زبان؛
  - `matchMedia` + `prefers-reduced-motion` برای حالت کاهش حرکت؛
  - `requestAnimationFrame` برای جلوه‌های روان مبتنی بر اسکرول.
- **فونت‌های وب محلی** با `@font-face` — Doran (تیتر) و Vazirmatn (متن)، به‌صورت محلی (بدون CDN).

### نحوه کار

1. `index.html` دو فایل استایل (`fonts/fonts.css` و `style.css`) و دو اسکریپت (`data.js` و سپس `app.js`) را بارگذاری می‌کند.
2. `data.js` شامل `CAT_META` (متادیتای دسته‌ها)، `CAT_ORDER` (ترتیب دسته‌ها) و `ranks` (آرایهٔ ۲۱ درجه) به‌همراه `hierarchyData` (بخش ساختار) است.
3. هنگام بارگذاری، `app.js`:
   - زبان ذخیره‌شده را می‌خواند (پیش‌فرض `fa`) و ویژگی‌های `dir`/`lang` را اعمال می‌کند؛
   - لینک‌های ناوبری چسبان، ۵ بخش دسته‌بندی (شامل ۳ بخش پس‌زمینهٔ سینمایی)، تایم‌لاین و نمودار سازمان را می‌سازد؛
   - دکمهٔ تغییر زبان، هندلرهای اسکرول، پارالاکس، نوار پیشرفت، observer نمایان‌شدن و پنجرهٔ جزئیات را متصل می‌کند.
4. همهٔ این‌ها از روی `data.js` ساخته می‌شوند — مارک‌آپ درجات به‌جز قهرمان و هدرها به‌صورت دستی نوشته نشده است.

### اجرای پروژه به صورت محلی

پروژه صرفاً از فایل‌های استاتیک تشکیل شده — **بدون وابستگی، بدون نصب و بدون مرحلهٔ ساخت**.

- **روش اول — باز کردن مستقیم فایل:**

  ```bash
  open index.html
  ```

- **روش دوم — سرو کردن با هر سرور استاتیکی** (برای بهترین تجربه توصیه می‌شود):

  ```bash
  python3 -m http.server 8000
  ```

  سپس به آدرس <http://localhost:8000> مراجعه کنید.

### شخصی‌سازی

تمام بخش‌های داده‌محور در **`data.js`** قابل ویرایش است:

- افزودن/ویرایش/حذف درجات در آرایهٔ `ranks` (`nameFa`، `nameEn`، `category`، `order`، `insignia`، `description`).
- تغییر نام، توضیحات و رنگ دسته‌ها در `CAT_META`.
- تغییر ترتیب دسته‌ها با `CAT_ORDER`.
- ویرایش محتوای بخش ساختار/سازمان در `hierarchyData`.

متن‌های زبانی در آبجکت `I18N` ابتدای **`app.js`** قرار دارد و ۳ تصویر پس‌زمینهٔ سینمایی با آرایهٔ `CINEMATIC_IMGS` در همین فایل کنترل می‌شوند.

تم بصری در متغیرهای سفارشی `:root` در **`style.css`** متمرکز شده است (رنگ‌ها، فونت‌ها، فاصله‌ها، گوشه‌ها و سایه‌ها).

تصاویر نشان درجات با مسیرهای `insignia` در `data.js` متناظرند و در پوشهٔ **`darage/`** قرار دارند.

### نکات

- متن مقدمه به **۲۲ درجه** اشاره دارد، اما آرایهٔ فعلی `ranks` در `data.js` شامل **۲۱ مورد** است (عدد ترتیبِ `5` استفاده نشده). برای هماهنگی، متن یا داده را یکسان کنید.
- باز کردن مستقیم فایل (`file://`) کار می‌کند (چون از `fetch` استفاده نمی‌شود)، اما سرو کردن محلی توصیهٔ بهتری است.
- بخش ویدئو (`media-section`) یک placeholder استایل‌شده است و هنوز ویدیویی به آن متصل نشده.
- پوشهٔ `New Folder/`، فایل `U.S. Army Ranks_*.html`، `images/ranks/*.svg` و `.venv/` باقی‌مانده‌های قدیمی و بلااستفاده هستند و به‌عنوان بخشی از اجرای سایت به‌حساب نمی‌آیند.

---

## Credits / Attribution

- **Rank insignia images** — the PNG badges under `darage/` are displayed as data assets; original sources are not declared inside the project.
- **Legacy SVG badges** under `images/ranks/` are not used at runtime.
- **Hero emblem** — `images/Seal_of_the_Islamic_Republic_of_Iran_Army.svg` (public-domain style seal based on its filename).
- **Cinematic backgrounds** — the 3 images under `image/` (`image (2).jpg`, `Untitled.jpeg`, `upscale-2.png`).
- **Fonts** — `Doran` and `Vazirmatn` are bundled locally under `fonts/` and loaded via `@font-face` in `fonts/fonts.css`.
- **Rank information** — per the site footer: *"درجات ارتش جمهوری اسلامی ایران — اطلاعات بر اساس منابع عمومی"* ("information based on public sources").
- A `U.S. Army Ranks_2026-09-13T08-18-42.html` document is present in the repo as a legacy seed/source file.

## License

No license file (e.g. `LICENSE`, `LICENSE.md`) is present in the repository, and no license is declared anywhere in the source files. **No license is currently specified** — all rights are reserved by default until the project owner chooses a license.