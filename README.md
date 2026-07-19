# استوديو زفات تباريك للصوتيات 🎸 (Studio77 Next.js App)

تطبيق ويب حديث ومتطور لعرض الأعمال الصوتية الحصرية، الشيلات، والزفات، وإدارة محتوى الاستوديو عبر لوحة تحكم متكاملة ومحمية بالكامل.

---

## 🚀 التقنيات المستخدمة (Tech Stack)

- **الواجهة الأمامية واللفلفية**: [Next.js (App Router)](https://nextjs.org/) مع React 19.
- **قاعدة البيانات والمصادقة**: [Supabase](https://supabase.com/) (Auth, PostgreSQL DB).
- **إدارة ورفع الوسائط (ملفات صوت وصور)**: [ImageKit.io](https://imagekit.io/) لتخزين ومعالجة وتدفق الصوتيات والصور بسرعة وجودة عالية.
- **التصميم والتنقل**: CSS مخصص بالكامل (Vanilla CSS) متجاوب مع الهواتف الذكية (Mobile-First Design) مع دعم للوضعين الداكن والفاتح (Dark/Light themes).

---

## 🛠️ تفاصيل التركيب والتشغيل المحلي (Setup & Installation)

### 1. الاستنساخ وتثبيت الحزم
قم باستنساخ المجلد وتثبيت الاعتماديات المطلوبة:
```bash
npm install
```

### 2. إعداد ملفات البيئة (`.env.local`)
قم بإنشاء ملف `.env.local` في المجلد الرئيسي للمشروع بناءً على هيكلية الملف المرفق `.env.example` وعبّئ البيانات الخاصة بك:
```env
NEXT_PUBLIC_SUPABASE_URL=رابط_مشروع_سوبابيز
NEXT_PUBLIC_SUPABASE_ANON_KEY=المفتاح_العام_لسوبابيز
SUPABASE_SERVICE_ROLE_KEY=مفتاح_الخدمة_السري_الخاص_بالأدمن

NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=رابط_إندبوينت_إيميج_كيت
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=المفتاح_العام_لإيميج_كيت
IMAGEKIT_PRIVATE_KEY=المفتاح_السري_لإيميج_كيت
```

> [!WARNING]
> لا تقم أبداً بمشاركة ملف `.env.local` أو رفعه على GitHub! تم تكوين ملف `.gitignore` لمنع رفعه تلقائياً.

### 3. إعداد قاعدة البيانات في Supabase
قم بنسخ محتويات ملف `supabase-schema.sql` ولصقها في **SQL Editor** داخل لوحة تحكم Supabase وتشغيلها لإنشاء الجداول اللازمة (`artists` و `tracks` و `coming_soon` و `user_favorites` و `admins` و `filters` و `contact_messages`) وإعداد السياسات الأمنية (RLS).

### 4. إضافة مستخدم أدمن (Admin User)
1. اذهب لقسم **Authentication** في Supabase وأضف بريد الأدمن (`admin@studio.com`) مع كلمة المرور.
2. انسخ الـ `UUID` الخاص بالمستخدم الجديد.
3. قم بإدراج المشرف في جدول `admins` عبر استعلام SQL:
   ```sql
   insert into public.admins (id, email) values ('USER_UUID', 'admin@studio.com');
   ```

### 5. تشغيل بيئة التطوير المحلية
قم بتشغيل خادم التطوير المحلي لرؤية وتعديل المشروع:
```bash
npm run dev
```

---

## 🛡️ نظام الأمان والحماية (Security Architecture)

- **حماية البيانات بالمتصفح (Client-side RLS)**: جميع إجراءات الكتابة (INSERT, UPDATE, DELETE) لبيانات الاستوديو مغلقة تماماً عبر المتصفح باستخدام سياسات Security للـ RLS في Supabase.
- **خدمات الخادم المحمية (Secure API Routes)**: تتم عمليات الإدارة بالكامل من لوحة الأدمن عبر واجهات برمجية خلفية في Next.js (Server APIs) محمية عبر التحقق من توقيع JWT الجلسة ومقارنة معرّف المشرف UUID بجدول المشرفين المصرح لهم داخل قاعدة البيانات.

---

## 📂 هيكلية المجلدات الرئيسية

```text
├── app/                  # مسارات وواجهات Next.js (App Router)
│   ├── admin/            # لوحة تحكم الأدمن
│   ├── api/              # واجهات الـ Backend APIs للعمليات
│   │   ├── upload/       # الواجهة البرمجية للرفع عبر ImageKit
│   │   └── ...           # واجهات الفلاتر، المقاطع، الفنانين...
│   ├── globals.css       # الأنماط والتصاميم العامة
│   └── page.js           # الصفحة الرئيسية للمنصة (مشغل الصوت والمعارض)
├── lib/                  # اتصالات وإعدادات سوبابيز والتحقق
│   └── supabase.js
├── public/               # الملفات الثابتة والمشتركة
├── supabase-schema.sql   # هيكل قاعدة البيانات الكامل والسياسات الأمنية
└── .gitignore            # ملف تجاهل الملفات الحساسة في Git
```
