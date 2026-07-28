/**
 * yazilar/ klasöründeki Markdown dosyalarını tarayıp yazilar.json dizinini üretir.
 * GitHub Actions tarafından otomatik çalıştırılır; elle de çalıştırılabilir:
 *   node blog-index.js
 */
const fs = require('fs');
const path = require('path');

const KLASOR = path.join(__dirname, 'yazilar');
const CIKTI = path.join(__dirname, 'yazilar.json');

/** Dosya başındaki --- ... --- bloğunu ayrıştırır. */
function onBilgiOku(metin) {
  const eslesme = metin.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  const alanlar = {};
  if (!eslesme) return { alanlar, govde: metin };

  for (const satir of eslesme[1].split(/\r?\n/)) {
    const i = satir.indexOf(':');
    if (i === -1) continue;
    const anahtar = satir.slice(0, i).trim();
    let deger = satir.slice(i + 1).trim();
    deger = deger.replace(/^["']|["']$/g, '');
    if (anahtar) alanlar[anahtar] = deger;
  }
  return { alanlar, govde: metin.slice(eslesme[0].length) };
}

/** Özet yoksa gövdeden ilk paragrafı kısaltarak üretir. */
function ozetUret(govde) {
  const paragraf = govde
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#') && !p.startsWith('!['));
  if (!paragraf) return '';
  const duz = paragraf
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return duz.length > 160 ? duz.slice(0, 157).trimEnd() + '...' : duz;
}

/** Dosya adından tarih (2026-07-26-baslik.md) ve başlık tahmini. */
function dosyadanTarih(dosyaAdi) {
  const m = dosyaAdi.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : '';
}

function baslikTahmin(dosyaAdi, govde) {
  const h1 = govde.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  return dosyaAdi
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .replace(/\.md$/i, '')
    .replace(/-/g, ' ')
    .replace(/^\w/, (c) => c.toLocaleUpperCase('tr'));
}

function main() {
  if (!fs.existsSync(KLASOR)) {
    fs.writeFileSync(CIKTI, '[]\n');
    console.log('yazilar/ klasörü yok — boş dizin yazıldı.');
    return;
  }

  const yazilar = fs
    .readdirSync(KLASOR)
    .filter((d) => d.toLowerCase().endsWith('.md'))
    .map((dosya) => {
      const metin = fs.readFileSync(path.join(KLASOR, dosya), 'utf8');
      const { alanlar, govde } = onBilgiOku(metin);
      return {
        dosya,
        baslik: alanlar.baslik || baslikTahmin(dosya, govde),
        tarih: alanlar.tarih || dosyadanTarih(dosya),
        ozet: alanlar.ozet || ozetUret(govde),
      };
    })
    .sort((a, b) => (b.tarih || '').localeCompare(a.tarih || ''));

  fs.writeFileSync(CIKTI, JSON.stringify(yazilar, null, 2) + '\n');
  console.log(`${yazilar.length} yazı dizine eklendi.`);
}

main();
