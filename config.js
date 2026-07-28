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
    youtube: '',   // örn. 'https://youtube.com/@feyzaonerpilates'
    tiktok: '',
    facebook: '',
  },

  calismaSaatleri: [
    { gun: 'Pazartesi – Cuma', saat: '07:00 – 22:00' },
    { gun: 'Cumartesi', saat: '09:00 – 16:00' },
    { gun: 'Pazar', saat: 'Kapalı' },
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
