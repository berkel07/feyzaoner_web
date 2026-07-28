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
  adres: 'Stüdyo adresinizi buraya yazın',

  /** Ana sayfadaki kapak görseli. Dosya yoksa alan otomatik gizlenir. */
  kapakGorsel: 'medya/studyo-1.jpg',

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
    { gun: 'Pazartesi – Cuma', saat: '08:00 – 21:00' },
    { gun: 'Cumartesi', saat: '09:00 – 17:00' },
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
    {
      ad: 'Deneme Dersi',
      metin: 'İlk kez pilates yapacaklar için tanışma dersi — size uygun mu birlikte görelim.',
    },
  ],

  /**
   * GALERİ — fotoğraf ve videolar.
   * Dosyaları `medya/` klasörüne yükleyip buraya bir satır ekleyin.
   *
   *   { tur: 'foto',    kaynak: 'medya/studyo-1.jpg',  baslik: 'Reformer odası' }
   *   { tur: 'video',   kaynak: 'medya/ders.mp4',      baslik: 'Ders anı', kapak: 'medya/kapak.jpg' }
   *   { tur: 'youtube', kaynak: 'VIDEO_KIMLIGI',       baslik: 'Tanıtım videosu' }
   *
   * YouTube kimliği: youtube.com/watch?v=ABC123 adresindeki "ABC123" kısmı.
   */
  galeri: [
    { tur: 'foto', kaynak: 'medya/studyo-1.jpg', baslik: 'Reformer alanı' },
    { tur: 'foto', kaynak: 'medya/studyo-2.jpg', baslik: 'Cadillac çalışması' },
    { tur: 'foto', kaynak: 'medya/studyo-3.jpg', baslik: 'Ters sarkma — omurga boşaltma' },
    { tur: 'foto', kaynak: 'medya/studyo-4.jpg', baslik: 'Ladder barrel ile esneme' },
    { tur: 'foto', kaynak: 'medya/studyo-5.jpg', baslik: 'Reformer üzerinde uzama' },
  ],
};
