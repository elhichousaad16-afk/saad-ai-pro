// Netlify Function: يجلب التقويم الاقتصادي الحقيقي (أحداث هذا الأسبوع) من مصدر عام مجاني
// بدون أي مفتاح API — نفس المصدر المستخدم على نطاق واسع من متداولي الفوركس (مرآة لبيانات ForexFactory).
//
// ملاحظة مهمة: هذا المصدر العام محدود بحد صارم جدًا (طلبان كل 5 دقائق لكل المستخدمين عالميًا)،
// لذلك يجب عدم استدعاء هذه الدالة أكثر من مرة كل ساعة تقريبًا من الواجهة الأمامية (مع تخزين مؤقت محلي).

export async function handler() {
  try {
    const resp = await fetch("https://nfs.faireconomy.media/ff_calendar_thisweek.json", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SaadAITrading/1.0)" },
    });
    if (!resp.ok) {
      return { statusCode: resp.status, body: JSON.stringify({ error: "تعذر جلب التقويم الاقتصادي حاليًا" }) };
    }
    const data = await resp.json();
    return {
      statusCode: 200,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message || "خطأ غير متوقع" }) };
  }
}
