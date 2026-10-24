# Proje kapsamı ve belge/kod karşılaştırması

Bu not, paylaşılan dönem projesi raporları ve final sunumu ile mevcut kaynak kodun birlikte incelenmesiyle hazırlanmıştır. Raporlarda bir özelliğin anlatılması, bu pakette eksiksiz uygulandığı ve test edildiği anlamına gelmez.

## Proje bağlamı

- **Adı:** Dijital YKS Koçu.
- **Türü:** Bilişim Teknolojileri Uygulaması dersi dönem projesi.
- **Ekip:** Fatmaeren Kuruoğlan ve Saliha Bayram.
- **Amaç:** TYT/AYT çalışma planını, konu ilerlemesini, deneme sonuçlarını, odaklanma süresini ve hedef üniversite/bölüm bilgisini aynı platformda takip etmek.

## Modüller

| Modül | Belgelerde anlatılan kullanım | Mevcut paketteki karşılığı |
|---|---|---|
| Kayıt ve giriş | Öğrenci hesabı oluşturma ve oturum açma | `authController.js`, JWT doğrulama ve kayıt/giriş sayfaları |
| Özet paneli | Hedef, süre, son netler, konu ve haftalık ilerleme | `anasayfa.*`, görev ve hedef controller dosyaları |
| Konu takibi | TYT ve AYT alanlarına göre ders/konu ilerlemesi | `konuTakip.*`, `konuController.js` |
| Görev/takvim | Tarihe ve önceliğe göre görev ekleme, izleme, silme | `takvim.*`, görev/takvim controller dosyaları |
| Pomodoro | Çalışma/mola/tur ayarları ve dersle ilişkili oturumlar | `pomodoro.*`, `pomodoroController.js` |
| Deneme analizi | TYT/AYT doğru-yanlış-boş girişi, netler ve geçmiş | `analiz.*`, `analizController.js` |
| Hedef program | Şehir/üniversite/bölüm seçimi ve program bilgileri | `hedefController.js`, `HedefProgramlar` sorguları |

Kodda bu bölümler bulunur; mevcut hazırlık sırasında gerçek veritabanına bağlanarak doğrulanmamıştır.

## Belgeden doğrudan tamamlanmış özellik olarak alınmayanlar

Raporlarda eğitmen rolleri, yönetim, otomatik yedekleme/arşivleme, bulut kurulumu, çeşitli SQL VIEW yapıları ve gelecek geliştirmeler anlatılmaktadır. İlgili sunucu kodları veya veritabanı kurulum betikleri mevcut pakette doğrulanmadığı için tamamlanmış özellikler arasında gösterilmemiştir.

Yapay zekâ önerileri, başarı tahmini, bildirim sistemi, sesli asistan, koç–öğrenci iletişimi ve ayrı mobil uygulama sonraki geliştirme fikirleri olarak ele alınmalıdır. Mobil uyumlu web arayüzü bunların tamamlandığı anlamına gelmez.

## Veriler

Hedef program verisinin kaynağı Ramazan İzci'nin Kaggle veri seti olarak açıklanmıştır. Arşivdeki diğer öğrenci verisi CSV'leri ayrı tutulmuştur; kaynak ve lisansları doğrulanmadan bunlara aynı atıf verilmemiştir. Ayrıntılı kaynakça [SOURCES.md](../SOURCES.md) dosyasındadır.

## Güvenlik ve paylaşım durumu

Belgelerde güvenlik hakkında genel ifadeler bulunsa da mevcut kod, şifreleri hashlemeden işler ve şifre sıfırlamada e-posta sahipliği doğrulaması içermez. Bu eksikler giderilmeden gerçek kullanıcı verileriyle canlıya alınmamalıdır. Kaynak kod paylaşımı ile güvenli canlı uygulama kurulumu ayrı aşamalardır.

Tam raporlar, sunum dosyaları, CSV'ler, özel ortam ayarları ve veritabanı yedekleri public pakete dahil edilmemiştir. İşlevsel uygulama kodu bu belge güncellemesinde değiştirilmemiştir.
