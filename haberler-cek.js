/**
 * Pilates ve hareket sağlığı haberlerini RSS kaynaklarından toplar,
 * haberler.json dosyasını üretir. GitHub Actions her gün otomatik çalıştırır.
 *
 * Dış kütüphane kullanmaz (Node 18+ yerleşik fetch).
 * Yalnızca başlık, özet ve kaynak bağlantısı saklanır; okuyucu tıklayınca
 * haberin kendi sitesine gider.
 */

const fs = require('fs');
const path = require('path');

/** Haber kaynakları — istediğinizi ekleyip çıkarabilirsiniz. */
const KAYNAKLAR = [
  {
    ad: 'Pilates Haberleri',
    url: 'https://news.google.com/rss/search?q=pilates&hl=tr&gl=TR&ceid=TR:tr',
  },
  {
    ad: 'Egzersiz ve Sağlık',
    url: 'https://news.google.com/rss/search?q=%22pilates%22+OR+%22postur%22+OR+%22esneklik+egzersizi%22&hl=tr&gl=TR&ceid=TR:tr',
  },
  {
    ad: 'Reformer Pilates',
    url: 'https://news.google.com/rss/search?q=%22reformer+pilates%22&hl=tr&gl=TR&ceid=TR:tr',
  },
];

const CIKTI = path.join(__dirname, 'haberler.json');
const AZAMI_HABER = 24;

/* ---------- Yardımcılar ---------- */

function varlikCoz(s) {
  return String(s)
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, function (_, kod) {
      return String.fromCharCode(parseInt(kod, 10));
    })
    .replace(/&amp;/g, '&');
}

/**
 * Besleme metnini düz yazıya çevirir.
 * Kaçırılmış HTML (&lt;p&gt;) da temizlensin diye önce varlıklar çözülür,
 * sonra etiketler atılır; kalan varlıklar bir kez daha çözülür.
 */
function etiketTemizle(s) {
  var metin = String(s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  metin = varlikCoz(metin).replace(/<[^>]*>/g, ' ');
  return varlikCoz(metin).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function ilkEslesme(blok, etiketler) {
  for (const etiket of etiketler) {
    const m = blok.match(new RegExp('<' + etiket + '[^>]*>([\\s\\S]*?)</' + etiket + '>', 'i'));
    if (m) return m[1];
  }
  return '';
}

function baglantiBul(blok) {
  const duz = blok.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
  if (duz && etiketTemizle(duz[1])) return etiketTemizle(duz[1]);
  const atom = blok.match(/<link[^>]*href=["']([^"']+)["']/i);
  return atom ? atom[1] : '';
}

/** Google News başlıkları "Başlık - Kaynak Adı" biçiminde gelir; kaynağı ayır. */
function baslikVeKaynak(ham, varsayilanKaynak) {
  const temiz = etiketTemizle(ham);
  const i = temiz.lastIndexOf(' - ');
  if (i > 20 && temiz.length - i < 45) {
    return { baslik: temiz.slice(0, i).trim(), kaynak: temiz.slice(i + 3).trim() };
  }
  return { baslik: temiz, kaynak: varsayilanKaynak };
}

function tarihIso(ham) {
  const t = new Date(etiketTemizle(ham));
  return isNaN(t.getTime()) ? '' : t.toISOString();
}

/** RSS veya Atom içeriğini haber listesine çevirir. */
function ayristir(xml, kaynakAdi) {
  const bloklar = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) || [];
  return bloklar
    .map(function (blok) {
      const { baslik, kaynak } = baslikVeKaynak(ilkEslesme(blok, ['title']), kaynakAdi);
      const ozetHam = ilkEslesme(blok, ['description', 'summary', 'content']);
      let ozet = etiketTemizle(ozetHam);
      if (ozet.length > 180) ozet = ozet.slice(0, 177).trimEnd() + '...';
      return {
        baslik,
        kaynak,
        ozet,
        link: baglantiBul(blok),
        tarih: tarihIso(ilkEslesme(blok, ['pubDate', 'published', 'updated'])),
      };
    })
    .filter(function (h) {
      return h.baslik && h.link;
    });
}

module.exports = { ayristir, etiketTemizle, baslikVeKaynak };

/* ---------- Ana akış ---------- */

async function main() {
  const tumu = [];

  for (const kaynak of KAYNAKLAR) {
    try {
      const yanit = await fetch(kaynak.url, {
        headers: { 'user-agent': 'FeyzaOnerPilatesSite/1.0 (+haber toplayıcı)' },
      });
      if (!yanit.ok) {
        console.warn(kaynak.ad + ': HTTP ' + yanit.status);
        continue;
      }
      const xml = await yanit.text();
      const haberler = ayristir(xml, kaynak.ad);
      console.log(kaynak.ad + ': ' + haberler.length + ' haber');
      tumu.push(...haberler);
    } catch (hata) {
      console.warn(kaynak.ad + ' alınamadı: ' + hata.message);
    }
  }

  // Aynı haberi başlığa göre teke indir, tarihe göre sırala
  const gorulen = new Set();
  const benzersiz = tumu
    .filter(function (h) {
      const anahtar = h.baslik.toLocaleLowerCase('tr').replace(/[^\wçğıöşü ]/g, '').slice(0, 60);
      if (gorulen.has(anahtar)) return false;
      gorulen.add(anahtar);
      return true;
    })
    .sort(function (a, b) {
      return (b.tarih || '').localeCompare(a.tarih || '');
    })
    .slice(0, AZAMI_HABER);

  if (benzersiz.length === 0 && fs.existsSync(CIKTI)) {
    // Kaynaklara ulaşılamadıysa eski listeyi koru, siteyi boşaltma.
    console.warn('Hiç haber alınamadı; mevcut liste korunuyor.');
    return;
  }

  fs.writeFileSync(
    CIKTI,
    JSON.stringify({ guncelleme: new Date().toISOString(), haberler: benzersiz }, null, 2) + '\n'
  );
  console.log(benzersiz.length + ' haber yazıldı.');
}

if (require.main === module) {
  main().catch(function (hata) {
    console.error('Haber toplama hatası:', hata);
    process.exit(1);
  });
}
