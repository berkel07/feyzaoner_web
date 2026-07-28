# Feyza Öner Pilates — Web Sitesi

Stüdyonun tanıtım sitesi: dersler, blog, otomatik pilates haberleri, stüdyo
galerisi ve WhatsApp iletişimi. Statik site — sunucu veya aylık ücret gerektirmez.

## Yayın adresi

GitHub Pages: `https://berkel07.github.io/feyzaoner_web/`

## Düzenleme

| Ne yapmak istiyorsunuz | Nereye dokunun |
| --- | --- |
| Telefon, adres, sosyal medya, ders metinleri | `config.js` |
| Yeni blog yazısı | `yazilar/` klasörüne `.md` dosyası ekleyin |
| Fotoğraf / video | `medya/` klasörüne yükleyip `config.js` içindeki `galeri` listesine ekleyin |
| Haber kaynakları | `haberler-cek.js` içindeki `KAYNAKLAR` |

## Otomatik işler

- **Blog** (`.github/workflows/blog.yml`) — `yazilar/` klasörüne dosya eklendiğinde
  `yazilar.json` dizinini günceller.
- **Haberler** (`.github/workflows/haberler.yml`) — her gün pilates haberlerini
  derleyip `haberler.json` dosyasına yazar.

## Yerelde önizleme

```bash
python3 -m http.server 8000
```

## Testler

```bash
python3 -m http.server 8899 &
node test-site.js
```
