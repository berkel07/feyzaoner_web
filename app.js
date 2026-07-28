/**
 * Ortak site betiği: menü/altbilgi üretimi, WhatsApp bağlantıları,
 * blog dizinini okuma ve Markdown yazıları görüntüleme.
 * Dış kütüphane kullanmaz.
 */
(function () {
  var S = window.SITE || {};

  /* ---------- WhatsApp ---------- */
  function waLink(mesaj) {
    var no = (S.whatsapp || '').replace(/\D/g, '');
    var m = encodeURIComponent(mesaj || S.whatsappMesaj || 'Merhaba');
    return 'https://wa.me/' + no + '?text=' + m;
  }
  window.waLink = waLink;

  /* ---------- Menü ve alt bilgi ---------- */
  function sayfaAdi() {
    var p = location.pathname.split('/').pop();
    return p === '' ? 'index.html' : p;
  }

  /** Doldurulmuş sosyal medya hesapları. */
  function sosyalListe() {
    var s = (S.sosyal || {});
    var adlar = { instagram: 'Instagram', youtube: 'YouTube', tiktok: 'TikTok', facebook: 'Facebook' };
    return Object.keys(adlar)
      .filter(function (k) { return s[k]; })
      .map(function (k) { return { ad: adlar[k], href: s[k] }; });
  }
  window.sosyalListe = sosyalListe;

  function menuYaz() {
    var el = document.querySelector('[data-nav]');
    if (!el) return;
    var aktif = sayfaAdi();
    var baglantilar = [
      { ad: 'Ana Sayfa', href: 'index.html' },
      { ad: 'Dersler', href: 'index.html#dersler' },
      { ad: 'Stüdyo', href: 'galeri.html' },
      { ad: 'Blog', href: 'blog.html' },
      { ad: 'Haberler', href: 'haberler.html' },
      { ad: 'İletişim', href: 'index.html#iletisim' },
    ];
    var ad = S.studyoAdi || 'Pilates';
    el.innerHTML =
      '<a class="brand" href="index.html" aria-label="' + ad + '">' +
      '<img class="brand-isaret" src="medya/logo-isaret.svg" alt="" ' +
      'onerror="this.style.display=\'none\'">' +
      '<img class="brand-yazi" src="medya/logo-yazi.svg" alt="' + ad + '" ' +
      'onerror="this.replaceWith(document.createTextNode(\'' + ad + '\'))">' +
      '</a>' +
      '<nav class="nav-links">' +
      baglantilar
        .map(function (b) {
          var cls = b.href === aktif ? ' class="active"' : '';
          return '<a href="' + b.href + '"' + cls + '>' + b.ad + '</a>';
        })
        .join('') +
      '</nav>';
  }

  function altBilgiYaz() {
    var el = document.querySelector('[data-footer]');
    if (!el) return;
    var yil = new Date().getFullYear();
    el.innerHTML =
      '<div class="wrap">' +
      '<div>© ' + yil + ' ' + (S.studyoAdi || '') + '</div>' +
      '<nav>' +
      '<a href="index.html">Ana Sayfa</a>' +
      '<a href="blog.html">Blog</a>' +
      '<a href="haberler.html">Haberler</a>' +
      '<a href="destek.html">Destek</a>' +
      '<a href="gizlilik.html">Gizlilik</a>' +
      sosyalListe()
        .map(function (o) {
          return '<a href="' + o.href + '" target="_blank" rel="noopener">' + o.ad + '</a>';
        })
        .join('') +
      '</nav></div>';
  }

  function waButonlariBagla() {
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      a.href = waLink(a.getAttribute('data-wa') || '');
      a.target = '_blank';
      a.rel = 'noopener';
    });
    var float = document.querySelector('[data-wa-float]');
    if (float) {
      float.href = waLink();
      float.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.4 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2z"/></svg>';
      float.target = '_blank';
      float.rel = 'noopener';
      float.setAttribute('aria-label', 'WhatsApp ile yazın');
    }
  }

  /* ---------- Basit Markdown çevirici ---------- */
  function kacir(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function satirIci(s) {
    return kacir(s)
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function markdownToHtml(md) {
    var satirlar = String(md).split(/\r?\n/);
    var html = '';
    var liste = null; // 'ul' | 'ol'
    var paragraf = [];
    var tablo = null; // biriken tablo satırları

    function paragrafKapat() {
      if (paragraf.length) {
        html += '<p>' + satirIci(paragraf.join(' ')) + '</p>';
        paragraf = [];
      }
    }
    function listeKapat() {
      if (liste) {
        html += '</' + liste + '>';
        liste = null;
      }
    }
    function hucreler(satir) {
      return satir
        .replace(/^\||\|$/g, '')
        .split('|')
        .map(function (h) { return h.trim(); });
    }
    function tabloKapat() {
      if (!tablo) return;
      // İkinci satır ayraç ise (|---|---|) başlıklı tablo kur.
      var ayrac = tablo.length > 1 && /^\|?[\s:-]+\|[\s|:-]*$/.test(tablo[1]);
      var basSatir = ayrac ? tablo[0] : null;
      var govdeSatirlari = ayrac ? tablo.slice(2) : tablo;
      var t = '<table>';
      if (basSatir) {
        t += '<thead><tr>' +
          hucreler(basSatir).map(function (h) { return '<th>' + satirIci(h) + '</th>'; }).join('') +
          '</tr></thead>';
      }
      t += '<tbody>' +
        govdeSatirlari.map(function (r) {
          return '<tr>' + hucreler(r).map(function (h) { return '<td>' + satirIci(h) + '</td>'; }).join('') + '</tr>';
        }).join('') +
        '</tbody></table>';
      html += t;
      tablo = null;
    }

    satirlar.forEach(function (ham) {
      var satir = ham.trim();

      if (satir === '') {
        paragrafKapat();
        listeKapat();
        tabloKapat();
        return;
      }

      if (satir.indexOf('|') !== -1 && /^\|.*\|$/.test(satir)) {
        paragrafKapat();
        listeKapat();
        if (!tablo) tablo = [];
        tablo.push(satir);
        return;
      }
      tabloKapat();

      var baslik = satir.match(/^(#{1,4})\s+(.*)$/);
      if (baslik) {
        paragrafKapat();
        listeKapat();
        var seviye = baslik[1].length;
        html += '<h' + seviye + '>' + satirIci(baslik[2]) + '</h' + seviye + '>';
        return;
      }

      if (/^>\s?/.test(satir)) {
        paragrafKapat();
        listeKapat();
        html += '<blockquote>' + satirIci(satir.replace(/^>\s?/, '')) + '</blockquote>';
        return;
      }

      var madde = satir.match(/^[-*]\s+(.*)$/);
      if (madde) {
        paragrafKapat();
        if (liste !== 'ul') {
          listeKapat();
          html += '<ul>';
          liste = 'ul';
        }
        html += '<li>' + satirIci(madde[1]) + '</li>';
        return;
      }

      var sirali = satir.match(/^\d+[.)]\s+(.*)$/);
      if (sirali) {
        paragrafKapat();
        if (liste !== 'ol') {
          listeKapat();
          html += '<ol>';
          liste = 'ol';
        }
        html += '<li>' + satirIci(sirali[1]) + '</li>';
        return;
      }

      listeKapat();
      paragraf.push(satir);
    });

    paragrafKapat();
    listeKapat();
    tabloKapat();
    return html;
  }
  window.markdownToHtml = markdownToHtml;

  /* ---------- Blog ---------- */
  function tarihYaz(iso) {
    if (!iso) return '';
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  window.tarihYaz = tarihYaz;

  window.yazilariGetir = function () {
    return fetch('yazilar.json?v=' + Date.now())
      .then(function (r) {
        if (!r.ok) throw new Error('yazilar.json okunamadı');
        return r.json();
      })
      .then(function (liste) {
        return (liste || []).sort(function (a, b) {
          return (b.tarih || '').localeCompare(a.tarih || '');
        });
      })
      .catch(function () {
        return [];
      });
  };

  window.yaziKarti = function (y) {
    return (
      '<a class="post" href="yazi.html?y=' + encodeURIComponent(y.dosya) + '">' +
      '<div class="date">' + tarihYaz(y.tarih) + '</div>' +
      '<h3>' + y.baslik + '</h3>' +
      (y.ozet ? '<p>' + y.ozet + '</p>' : '') +
      '</a>'
    );
  };

  /* ---------- Başlat ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    menuYaz();
    altBilgiYaz();
    waButonlariBagla();
    document.querySelectorAll('[data-site]').forEach(function (el) {
      var anahtar = el.getAttribute('data-site');
      if (S[anahtar]) el.textContent = S[anahtar];
    });
  });
})();
