/**
 * SİTE AYARLARI — Değiştirmeniz gereken tek dosya burası.
 * Telefon, adres, sosyal medya, dersler, galeri buradan düzenlenir.
 */
window.SITE = {
  studyoAdi: 'Feyza Öner Pilates',
  slogan: 'Bedeninizi dinleyin, hareketle güçlenin',
  aciklama:
    'Reformer ve mat pilates derslerinde kişiye özel programlarla ' +
    'duruşunuzu düzeltin, esneyin ve güçlenin.',

  // WhatsApp numarası — ülke kodu ile, boşluksuz ve + işaretsiz.
  whatsapp: '905423658676',
  whatsappMesaj: 'Merhaba, randevu almak istiyorum.',

  telefonGorunen: '+90 542 365 86 76',
  eposta: 'feyzaonr@gmail.com',
  adres: 'Şirinyalı, İsmet Gökşen Cd. No:13, 07160 Muratpaşa/Antalya',

  /**
   * Haritada açılacak konum.
   * Boş bırakırsanız yukarıdaki adres metniyle harita araması yapılır.
   * Kesin konum için Google Haritalar'da işletmenizi açıp "Paylaş" ile
   * aldığınız bağlantıyı buraya yapıştırın (örn. https://maps.app.goo.gl/xxxx).
   */
  haritaLinki: '',

  /** Ana sayfadaki kapak görseli. Dosya yoksa alan otomatik gizlenir. */
  kapakGorsel: 'medya/studyo1.jpeg',

  /**
   * Sosyal medya — doldurduklarınız menüde, iletişimde ve alt bilgide görünür.
   * Boş bırakılanlar hiç gösterilmez.
   */
  sosyal: {
    instagram: 'https://instagram.com/feyzaonr',
    facebook: 'https://facebook.com/feyzaonr',
    /**
     * Google işletme kaydınız. Şimdilik adres araması kullanılıyor.
     * Kesin bağlantı için Google Haritalar'da işletmenizi açın →
     * "Paylaş" → aldığınız adresi (https://maps.app.goo.gl/...) buraya yazın.
     */
    google: 'https://www.google.com/maps/search/?api=1&query=Feyza%20%C3%96ner%20Pilates%20%C5%9Eirinyal%C4%B1%20%C4%B0smet%20G%C3%B6k%C5%9Fen%20Cd.%20No%3A13%20Muratpa%C5%9Fa%20Antalya',
    youtube: '',   // örn. 'https://youtube.com/@feyzaonerpilates'
    tiktok: '',
  },

  calismaSaatleri: [
    { gun: 'Pazartesi – Cuma', saat: '07:00 – 22:00' },
    { gun: 'Cumartesi', saat: '09:00 – 16:00' },
    { gun: 'Pazar', saat: 'Kapalı' },
  ],

  /**
   * EĞİTMENLER — "Hakkımızda" bölümünde görünür.
   * `foto` dosyası yoksa görsel alanı sessizce gizlenir, metin yine görünür.
   */
  ekip: [
    {
      ad: 'Emel Kula',
      unvan: 'Pilates, EMS ve Yoga Eğitmeni',
      foto: 'medya/emel.jpeg',
      // Yatay fotoğraf, kişi solda — dikey çerçevede sol taraf korunur.
      odak: 'left center',
      metin: [
        '02.01.1989 tarihinde Antalya’da doğdum. Antalya’da büyüdüm ve eğitim ' +
        'hayatımı Atatürk Anadolu Lisesi’nde tamamladıktan sonra Akdeniz ' +
        'Üniversitesi Beden Eğitimi ve Spor Yüksekokulu Yöneticilik Bölümü’nden ' +
        'mezun oldum.',
        'Spor hayatım çocuk yaşlarda başladı. 4 yıl atletizm, 5 yıl hentbol ve ' +
        '3 yıl masa tenisi ile aktif olarak ilgilendim. Üniversite yıllarımda ise ' +
        'tırmanış, badminton ve tenis branşlarında kendimi geliştirmeye devam ettim. ' +
        'Eğitim hayatım boyunca farklı branşlarda aldığım eğitimlerle bilgi ve ' +
        'deneyimimi sürekli zenginleştirdim.',
      ],
      deneyim: [
        '12 yıldır Reformer ve Mat Pilates',
        '11 yıldır EMS',
        '10 yıldır Hamile Pilatesi',
        '5 yıldır Yoga',
        'Skolyoz ve postür analizi eğitimi',
      ],
      kapanis:
        'Benim için hareket etmek sadece fiziksel olarak güçlenmek değil; bedenin ' +
        'ihtiyaçlarını doğru anlamak, sağlıklı bir duruş kazanmak ve yaşam kalitesini ' +
        'artırmaktır. Her danışanımın hedefi ve ihtiyaçları farklıdır; bu nedenle ' +
        'derslerimi tamamen kişiye özel planlıyor, güvenli, bilinçli ve keyifli bir ' +
        'egzersiz deneyimi sunmaya özen gösteriyorum.',
    },
    {
      ad: 'Feyza Öner',
      unvan: 'Kurucu · Fitness Lideri, Pilates ve Fonksiyonel Antrenman Eğitmeni',
      foto: 'medya/feyza.jpeg',
      odak: 'center top',
      metin: [
        '26 Kasım 1989 tarihinde Erzincan’da doğdum, çocukluğumdan bu yana ' +
        'Antalya’da yaşıyorum. Antalya Lisesi’nden mezun olduktan sonra Akdeniz ' +
        'Üniversitesi Beden Eğitimi ve Spor Yüksekokulu Antrenörlük Bölümü’nü ' +
        'tamamladım.',
        'Asıl uzmanlık alanım Fitness Liderliği. Eğitimim kapsamında pilates, yoga, ' +
        'step aerobik ve kişiye özel egzersiz programları hazırlama alanlarında ' +
        'eğitim aldım; yardımcı branşım tenis.',
        'Ortaokul ve lise yıllarım boyunca 7 yıl lisanslı voleybol oynadım. Sporun ' +
        'bana kazandırdığı disiplin, azim ve takım ruhu bugün de mesleğimin temelini ' +
        'oluşturuyor.',
      ],
      deneyim: [
        '14 yılı aşkın eğitmenlik',
        'Hamile Pilatesi',
        'Reformer Pilates',
        'Mat Pilates',
        'Fonksiyonel Antrenman',
      ],
      kapanis:
        'Her danışanımın ihtiyaçlarına, hedeflerine ve yaşam tarzına uygun programlar ' +
        'hazırlıyorum. Benim için pilates sadece egzersiz değil; daha güçlü, daha ' +
        'sağlıklı ve daha kaliteli bir yaşamın anahtarı. Derslerimde doğru teknik, ' +
        'güvenli hareket ve sürdürülebilir gelişimi ön planda tutuyorum.',
    },
  ],

  dersler: [
    {
      ad: 'Reformer Pilates',
      metin: 'Reformer aleti üzerinde birebir çalışma; duruş, kor gücü ve esneklik için en etkili yöntem.',
    },
    {
      ad: 'Mat Pilates',
      metin: 'Küçük gruplarla mat üzerinde nefes, denge ve kontrol odaklı dersler.',
    },
    {
      ad: 'Özel Ders',
      metin: 'Tamamen size özel program; sakatlık sonrası dönüş ve hedefe yönelik çalışma.',
    },
    {
      ad: 'Düet Ders',
      metin: 'Arkadaşınız veya eşinizle iki kişilik, keyifli ve motive edici seanslar.',
    },
    {
      ad: 'Hamile Pilatesi',
      metin: 'Gebelik döneminde güvenli, uzman eşliğinde nefes ve güçlendirme çalışmaları.',
    },
    {
      ad: 'EMS Antrenman',
      metin: 'Elektro kas uyarımıyla 20 dakikada yoğun çalışma; zamanı kısıtlı olanlar için birebir seans.',
    },
    {
      ad: 'Fonksiyonel Antrenman',
      metin: 'Günlük hayattaki hareketleri güçlendiren, tüm vücudu çalıştıran dinamik seanslar.',
    },
    {
      ad: 'Yoga',
      metin: 'Nefes, esneklik ve zihinsel dinginlik odaklı akışlar; her seviyeye uygun dersler.',
    },
  ],

  /**
   * GALERİ — fotoğraf ve videolar.
   * Dosyaları `medya/` klasörüne yükleyip buraya bir satır ekleyin.
   *
   *   { tur: 'foto',    kaynak: 'medya/studyo1.jpeg', baslik: 'Reformer odası' }
   *   { tur: 'video',   kaynak: 'medya/ders.mp4',      baslik: 'Ders anı', kapak: 'medya/kapak.jpg' }
   *   { tur: 'youtube', kaynak: 'VIDEO_KIMLIGI',       baslik: 'Tanıtım videosu' }
   *
   * YouTube kimliği: youtube.com/watch?v=ABC123 adresindeki "ABC123" kısmı.
   */
  galeri: [
    { tur: 'foto', kaynak: 'medya/studyo1.jpeg', baslik: 'Reformer alanı' },
    { tur: 'foto', kaynak: 'medya/studyo2.jpeg', baslik: 'Cadillac çalışması' },
    { tur: 'foto', kaynak: 'medya/studyo3.jpeg', baslik: 'Ters sarkma — omurga boşaltma' },
    { tur: 'foto', kaynak: 'medya/studyo4.jpeg', baslik: 'Ladder barrel ile yan esneme' },
    { tur: 'foto', kaynak: 'medya/studyo5.jpeg', baslik: 'Reformer üzerinde uzama' },
    { tur: 'foto', kaynak: 'medya/studyo6.jpeg', baslik: 'Cadillac — bacak serisi' },
  ],
};
