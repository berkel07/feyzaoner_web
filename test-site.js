/**
 * Site regresyon testleri (Playwright).
 *
 * Çalıştırma:
 *   cd site
 *   python3 -m http.server 8899 &
 *   node test-site.js
 *
 * İki durumu da sınar:
 *  1) Gerçek durum — fotoğraflar/haberler henüz yoksa sayfa düzgün bozulmadan çalışır
 *  2) Dolu durum — geçici örnek dosyalarla galeri, kapak ve haberler görünür
 */
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const TARAYICI =
  process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const B = process.env.SITE_URL || 'http://127.0.0.1:8899/';

const sonuclar = [];
const k = (ad, gecti) => sonuclar.push([ad, Boolean(gecti)]);

/* ---------- Geçici örnek dosyalar ---------- */

function pngYaz(dosya, w, h, renk) {
  const parca = (tip, veri) => {
    const g = Buffer.concat([Buffer.from(tip), veri]);
    const uzunluk = Buffer.alloc(4);
    uzunluk.writeUInt32BE(veri.length);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(zlib.crc32 ? zlib.crc32(g) >>> 0 : crc32(g));
    return Buffer.concat([uzunluk, g, crc]);
  };
  // Node 20+ zlib.crc32 yoksa basit uygulama
  function crc32(buf) {
    let c, tablo = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let m = 0; m < 8; m++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      tablo[n] = c >>> 0;
    }
    let crc = 0xffffffff;
    for (const b of buf) crc = tablo[(crc ^ b) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2;
  const satir = Buffer.concat([Buffer.from([0]), Buffer.alloc(w * 3, renk)]);
  const ham = Buffer.concat(Array.from({ length: h }, () => satir));
  fs.writeFileSync(
    dosya,
    Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      parca('IHDR', ihdr),
      parca('IDAT', zlib.deflateSync(ham)),
      parca('IEND', Buffer.alloc(0)),
    ])
  );
}

const GECICI = [];
function fixtureOlustur() {
  const cfg = fs.readFileSync('config.js', 'utf8');
  const gorseller = [...cfg.matchAll(/kaynak: '(medya\/[^']+)'/g)].map((m) => m[1]);
  const kapak = (cfg.match(/kapakGorsel: '([^']+)'/) || [])[1];
  for (const g of new Set([...gorseller, kapak].filter(Boolean))) {
    if (!fs.existsSync(g)) {
      pngYaz(g, 600, 800, 220);
      GECICI.push(g);
    }
  }
  const haberYedek = fs.readFileSync('haberler.json', 'utf8');
  fs.writeFileSync(
    'haberler.json',
    JSON.stringify({
      guncelleme: '2026-07-28T06:00:00.000Z',
      haberler: [
        { baslik: 'Test haberi bir', kaynak: 'Kaynak A', ozet: 'Özet bir.', link: 'https://ornek.com/1', tarih: '2026-07-27T09:00:00.000Z' },
        { baslik: 'Test haberi iki', kaynak: 'Kaynak B', ozet: 'Özet iki.', link: 'https://ornek.com/2', tarih: '2026-07-26T09:00:00.000Z' },
      ],
    })
  );
  return haberYedek;
}

function fixtureTemizle(haberYedek) {
  for (const g of GECICI) fs.existsSync(g) && fs.unlinkSync(g);
  fs.writeFileSync('haberler.json', haberYedek);
}

/* ---------- Testler ---------- */

async function main() {
  const tarayici = await chromium.launch({ executablePath: TARAYICI, args: ['--no-sandbox'] });
  const cfg = fs.readFileSync('config.js', 'utf8');
  const wa = (cfg.match(/whatsapp: '(\d+)'/) || [])[1];
  const eposta = (cfg.match(/eposta: '([^']+)'/) || [])[1];

  /* --- 1) Gerçek durum (görseller/haberler henüz yoksa) --- */
  {
    const s = await tarayici.newPage({ viewport: { width: 430, height: 932 } });
    const jsHatalari = [];
    s.on('pageerror', (e) => jsHatalari.push(e.message));

    await s.goto(B + 'index.html', { waitUntil: 'networkidle' });
    await s.waitForTimeout(600);
    k('Logo işareti ve yazısı yüklendi',
      (await s.locator('.brand-isaret').evaluate((e) => e.naturalWidth)) > 0 &&
      (await s.locator('.brand-yazi').evaluate((e) => e.naturalWidth)) > 0);
    k('Menü 6 bağlantı', (await s.locator('.nav-links a').count()) === 6);
    k('Ders listesi dolu', (await s.locator('#dersListesi .card').count()) >= 5);
    k('Çalışma saatleri', (await s.locator('#saatler li').count()) === 3);
    k('WhatsApp numarası doğru',
      (await s.locator('.wa-float').getAttribute('href')).includes('wa.me/' + wa));
    k('WhatsApp ön mesajı var',
      (await s.locator('a.btn-wa').first().getAttribute('href')).includes('text='));
    k('E-posta bağlantısı',
      (await s.locator('#iletisimBilgi a[href^="mailto:"]').getAttribute('href')) === 'mailto:' + eposta);
    k('Kapak görseli yoksa alan gizlendi (veya görsel var)',
      (await s.locator('#heroGorsel').count()) === 0 ||
      (await s.locator('#heroGorsel img').count()) === 1);
    k('Mobilde yatay taşma yok',
      await s.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));

    await s.goto(B + 'blog.html', { waitUntil: 'networkidle' });
    k('Blog yazıları listeleniyor', (await s.locator('#yazilar a.post').count()) >= 1);
    await s.locator('#yazilar a.post').first().click();
    await s.waitForLoadState('networkidle');
    k('Yazı sayfası açıldı ve tek başlık',
      (await s.locator('article h1').count()) === 1 && s.url().includes('yazi.html?y='));

    await s.goto(B + 'yazi.html?y=olmayan.md', { waitUntil: 'networkidle' });
    k('Olmayan yazı için uyarı',
      (await s.locator('article').textContent()).includes('bulunamadı'));

    await s.goto(B + 'destek.html', { waitUntil: 'networkidle' });
    k('Destek e-postası doğru',
      (await s.locator('#epostaBag').getAttribute('href')) === 'mailto:' + eposta);
    await s.goto(B + 'gizlilik.html', { waitUntil: 'networkidle' });
    k('Gizlilik e-postası doğru',
      (await s.locator('#epostaBag').getAttribute('href')) === 'mailto:' + eposta);

    k('Sayfa JS hatası yok', jsHatalari.length === 0);
    await s.close();
  }

  /* --- 2) Dolu durum (geçici örnek dosyalarla) --- */
  const haberYedek = fixtureOlustur();
  try {
    const s = await tarayici.newPage({ viewport: { width: 1280, height: 900 } });
    await s.goto(B + 'index.html', { waitUntil: 'networkidle' });
    await s.waitForTimeout(700);
    k('Kapak görseli göründü', (await s.locator('#heroGorsel img').count()) === 1);
    k('Masaüstünde taşma yok',
      await s.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));

    await s.goto(B + 'galeri.html', { waitUntil: 'networkidle' });
    await s.waitForTimeout(1600);
    const galeriSayisi = (JSON.parse(
      '[' + (fs.readFileSync('config.js', 'utf8').match(/kaynak: '/g) || []).length + ']'
    ))[0];
    k('Galeride görseller listelendi', (await s.locator('#galeri figure').count()) >= 1);
    k('Galeri taşmıyor',
      await s.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));

    await s.goto(B + 'haberler.html', { waitUntil: 'networkidle' });
    k('Haberler listelendi', (await s.locator('#haberler a.post').count()) === 2);
    k('Haber dış bağlantı ve yeni sekme',
      (await s.locator('#haberler a.post').first().getAttribute('target')) === '_blank');
    k('Güncelleme zamanı gösteriliyor',
      (await s.locator('#guncelleme').textContent()).includes('Son güncelleme'));

    const m = await tarayici.newPage({ viewport: { width: 430, height: 932 } });
    await m.goto(B + 'galeri.html', { waitUntil: 'networkidle' });
    await m.waitForTimeout(1200);
    k('Galeri mobilde taşmıyor',
      await m.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
    await m.close();
    await s.close();
    void galeriSayisi;
  } finally {
    fixtureTemizle(haberYedek);
  }

  await tarayici.close();

  let hepsi = true;
  for (const [ad, gecti] of sonuclar) {
    console.log((gecti ? 'PASS' : 'FAIL') + ' — ' + ad);
    if (!gecti) hepsi = false;
  }
  console.log(
    hepsi
      ? `\n>>> TÜM SİTE TESTLERİ GEÇTİ (${sonuclar.length})`
      : '\n>>> BAŞARISIZ TEST VAR'
  );
  process.exit(hepsi ? 0 : 1);
}

main().catch((h) => {
  console.error(h);
  process.exit(1);
});
