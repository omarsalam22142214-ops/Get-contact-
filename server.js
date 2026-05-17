const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// تشغيل الـ CORS عشان الواجهة الأمامية تقدر تبعت طلبات للسيرفر ده
app.use(cors());
app.use(express.json());

/* 
 * قاعدة البيانات المبدئية (In-memory Database)
 * في المشاريع الحقيقية، الجزء ده بيتبدل باتصال بقاعدة بيانات حقيقية زي MongoDB أو PostgreSQL
 * أو حتى عن طريق API لملف إكسيل باستخدام أدوات زي SheetDB.
 */
const database = {
    "01012345678": ["أحمد الشغل", "مهندس أحمد", "أحمد محمود", "Ahmed Work"],
    "01111111111": ["المندوب", "شركة الشحن", "توصيل طلبات", "مندوب التوصيل"],
    "01222222222": ["دكتور الأسنان", "عيادة د مصطفى", "Dentist"]
};

// إنشاء الـ API Endpoint اللي الواجهة هتبعتله الرقم
app.get('/api/search', (req, res) => {
    // بناخد الرقم اللي مبعوت في الرابط
    const phoneNumber = req.query.phone;

    // لو مفيش رقم مبعوت، بنرجع خطأ
    if (!phoneNumber) {
        return res.status(400).json({ error: 'برجاء إرسال رقم الهاتف للبحث' });
    }

    console.log(`تم استلام طلب بحث عن الرقم: ${phoneNumber}`);

    // بندور على الرقم في قاعدة البيانات، لو ملقيناهوش بنرجع مصفوفة فاضية
    const tags = database[phoneNumber] || [];

    // بنرجع النتيجة على هيئة JSON
    res.json({ tags: tags });
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`السيرفر شغال وزي الفل ومستني الطلبات على بورت ${PORT} 🚀`);
});
