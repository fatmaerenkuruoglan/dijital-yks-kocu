# Dijital YKS Koçu

YKS hazırlık sürecinde konu takibi, günlük görev planlama, deneme analizi, Pomodoro çalışma takibi ve hedef üniversite/bölüm seçimini tek platformda birleştiren web tabanlı dönem projesi.

**Proje ekibi:** Fatmaeren Kuruoğlan ve Saliha Bayram. Proje, Bilişim Teknolojileri Uygulaması dersi kapsamında geliştirilmiştir. Bu depo, ortak çalışmanın kaynak kodlarını ve paylaşım için hazırlanmış belgelerini içerir; bireysel görev dağılımı belirtilmemiştir.

## Amaç ve hedef kitle

TYT ve AYT hazırlığı yapan öğrencilerin çalışma düzenini planlaması, eksik konularını görmesi ve zaman içindeki gelişimini takip etmesi amaçlanır. Platform; konu listeleri, görev takvimi, çalışma süresi, deneme netleri ve hedef program bilgilerini bir araya getirir.

## Kullanım akışı

**Kayıt → Giriş → Özet paneli → Konu takibi / görev planlama / Pomodoro → Deneme analizi → Hedef takibi**

Ana sayfada sınava kalan süre, hedef özeti, son deneme netleri, konu ilerlemesi ve haftalık çalışma göstergeleri sunulur. Hedef seçimi şehir, üniversite ve bölüm filtreleri üzerinden yapılır. Ayrıntılar ve belgelerle kod arasındaki farklar [Proje kapsamı](docs/PROJE_KAPSAMI.md) dosyasındadır.

## Kaynaklar ve kullanılan veriler

Hedef program modülü için proje belgelerinde **Ramazan İzci — Turkish University Admissions & Stats** veri seti belirtilmiştir:

- [Kaggle veri seti](https://www.kaggle.com/datasets/ramazanizci/turkish-university-admissions)
- [Veri hazırlayıcısının kaynak deposu](https://github.com/izcir/turkish-university-admissions-dataset)

Rapor ve sunuma göre üniversite/bölüm, şehir, puan ve başarı sırası alanları düzenlenerek SQL Server yapısına aktarılmıştır. Bu depoda veri seti, öğrenci kayıtları ve veri temizleme/aktarım betikleri bulunmaz. Hedef program sorguları yerel SQL Server veritabanını kullanır; mevcut kod Kaggle API'sinden veri indirmez.

Diğer araştırma ve arayüz referansları, kullanım kapsamları ve belirsizlikler **[SOURCES.md](SOURCES.md)** dosyasında açıklanmıştır.

**Durum: Geliştirme aşamasında.** Kaynak kod, öğrenme ve portföy amacıyla paylaşılmaktadır. Mevcut kimlik doğrulama ve şifre sıfırlama uygulaması gerçek kullanıcılarla canlı kullanıma hazır değildir.

## Kodda bulunan modüller

- Kullanıcı kaydı ve JWT ile giriş.
- TYT/AYT ders ve konu ilerlemesi takibi.
- Tarihe göre görev oluşturma ve durum takibi.
- Takvim üzerinden görev yönetimi.
- Deneme sonuçlarını kaydetme ve analiz ekranları.
- Pomodoro sayacı ve çalışma oturumlarının kaydı.
- Şehir, üniversite ve bölüm bazında hedef seçimi.

Bu özellikler kaynak kod incelemesine göre listelenmiştir; veritabanıyla uçtan uca doğrulanmış özellik listesi değildir.

## Teknolojiler

Node.js, Express, Microsoft SQL Server (`mssql`), JSON Web Token, HTML, CSS, JavaScript ve Chart.js. Bazı arayüz kaynakları Google Fonts ve Font Awesome gibi harici servislerden yüklenir.

## Klasör yapısı

```text
controllers/    İş kuralları ve veritabanı sorguları
middleware/     JWT doğrulama
routes/         API yolları
public/         Sayfalar, stiller, tarayıcı kodu ve arayüz görselleri
docs/           Rapor ve sunuma göre hazırlanmış kapsam notu
SOURCES.md      Veri ve tasarım/araştırma kaynakları
app.js          Express sunucusu
db.js          Veritabanı bağlantı yardımcısı
dbconfig.js    Yalnızca ortam değişkenlerini okuyan örnek bağlantı ayarları
.env.example    Boş/gizli bilgi içermeyen ayar şablonu
```

## Yerel kurulum

Node.js/npm ve Microsoft SQL Server gereklidir.

```sh
npm ci
```

`.env.example` dosyasını `.env` adıyla kopyalayın. Kendi yerel veritabanı bilgilerinizi doldurun ve uzun, rastgele bir `JWT_SECRET` belirleyin. `DB_PASSWORD` ve `JWT_SECRET` örnekte bilinçli olarak boştur. Gerçek ayarlarınızı paylaşmayın.

Örnek `dbconfig.js`, SQL kullanıcı adı/şifre ve TCP portu üzerinden bağlantı içindir. Windows kimlik doğrulaması veya adlandırılmış SQL Server örneği kullanan ortamlarda yerel bağlantı ayarları ayrıca uyarlanmalıdır. Özgün özel bağlantı dosyası okunmadan bu şablon hazırlanmıştır.

**Veritabanı ve tablo oluşturma betikleri bu pakette bulunmaz.** Kod; öğrenci, ders/konu, görev/takvim, deneme, pomodoro ve hedef tablolarına ihtiyaç duyar. Tablo adları, kolonlar ve ilişkiler controller dosyalarındaki sorgularla uyumlu hazırlanmalıdır. Sadece bağımlılıkları kurmak uygulamanın çalışması için yeterli değildir.

Ortam ayarları ve veritabanı hazır olduğunda:

```sh
npm start
```

Tarayıcıdan `http://localhost:3000` adresini açın. Arayüzde birçok API adresi bu adrese sabitlenmiştir; farklı port veya sunucu kullanıldığında güncellenmelidir.

## Projenin mevcut kapsamı

Kodda öğrenci odaklı kullanım akışı bulunur. Raporlarda geçen eğitmen paneli, ayrıntılı rol yönetimi, otomatik yedekleme/arşivleme, bulut kurulumu, yapay zekâ önerileri ve mobil uygulama mevcut kaynak dosyalarda tamamlanmış özellikler olarak doğrulanmamıştır. Bunlar mevcut özellik listesine dahil edilmemiştir. Mobil uyumlu web arayüzü, ayrı bir mobil uygulama anlamına gelmez.

## Bilinen eksikler

- Kullanıcı şifreleri mevcut kodda hashlenmeden kaydedilir ve sorgulanır. Şifre hashleme ve mevcut kayıtlar için geçiş planı gereklidir.
- Şifre sıfırlama, yalnızca e-posta ve yeni şifre alır; e-posta sahipliğini doğrulayan tek kullanımlık, süreli sıfırlama bağlantısı/anahtarı eklenmelidir.
- Girdi doğrulama, hata mesajları, erişim kontrolleri ve oturum güvenliği ayrıca gözden geçirilmelidir.
- Veritabanı şeması, kişisel veri içermeyen örnek veriler ve otomatik testler eklenmelidir.
- Paket içindeki `npm test` komutu henüz gerçek bir test paketi çalıştırmaz.

## Paylaşım hazırlığı

Gerçek `.env` ve kullanıcının ayırdığı özel `dbconfig.js` dosyası okunmamış veya kopyalanmamıştır. Paylaşılan raporlar/sunum açıklamaları belge hazırlamak için incelenmiş; raporların tamamı, sunumlar, öğrenci numaraları ve CSV verileri bu pakete eklenmemiştir. `node_modules`, editör ayarları ve eski Git geçmişi pakete alınmamıştır. `db.js` bağlantı yardımcısı gizli bilgi içermediği için korunmuş; gerektirdiği `dbconfig.js` sıfırdan ortam değişkenleriyle hazırlanmıştır.

Kodda kullanılan ancak `package.json` bağımlılık listesinde eksik olan `jsonwebtoken`, mevcut kilit dosyasındaki sürümle listeye eklenmiştir. `npm start` komutu tanımlanmıştır. İşlevsel uygulama kodu bu hazırlık kapsamında değiştirilmemiştir.

JavaScript sözdizimi ve yaygın gömülü şifre/anahtar kalıpları kontrol edilmiştir. Bu işlem tüm güvenlik açıklarının bulunması veya canlı kullanım güvenliği garantisi değildir. Gerçek veritabanına bağlanılmamış ve uygulama canlıya alınmamıştır.
