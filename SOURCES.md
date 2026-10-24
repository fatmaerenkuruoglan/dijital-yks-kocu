# Kaynaklar ve veri kullanımı

## 1. Hedef üniversite ve bölüm verileri

**Ramazan İzci — Turkish University Admissions & Stats.**

- [Kaggle veri seti](https://www.kaggle.com/datasets/ramazanizci/turkish-university-admissions)
- [Hazırlayıcının kaynak deposu](https://github.com/izcir/turkish-university-admissions-dataset)

Projenin final sunumu ve raporunda, hedef üniversite/bölüm modülü için bu kaynak belirtilmiştir. Üniversite, şehir, bölüm, puan türü, taban puan ve başarı sırası bilgileri hedef seçimi ekranlarında kullanılmaktadır. Kaynak hazırlayıcısı, verilerin YÖK Atlas ve ÖSYM kaynaklarından derlendiğini açıklamaktadır. Bu projenin geliştiricileri, asıl verinin üreticisi olarak sunulmaz.

Proje belgelerine göre veriler temizlenip standartlaştırılarak SQL Server veritabanına aktarılmıştır. Bu işlem için yeniden çalıştırılabilir bir betik mevcut kod paketinde bulunmamaktadır. Kod doğrudan Kaggle API'sine bağlanmaz; yerel veritabanındaki `HedefProgramlar` tablosunu sorgular.

Arşivdeki `deneme3.csv` sütunları üniversite/program bilgileri ile uyumludur. Dosyanın içerik ve sürüm eşleşmesi bütünüyle doğrulanmadığı için bu dosya yeniden dağıtılmamıştır. Kaynaktan veri edinilirken ilgili sürümün kullanım ve lisans koşulları ayrıca kontrol edilmelidir; kaynak gösterilmesi tek başına yeniden dağıtım izni yerine geçmez.

## 2. Diğer öğrenci verisi dosyaları

Arşivde ayrıca öğrenci kimliği, çalışma süresi, okul türü, stres ve TYT/AYT puanları gibi sütunlar içeren CSV'ler vardır. Bunlar üniversite/program istatistikleriyle aynı veri yapısı değildir. Bu dosyaların üreticisi, sentetik olup olmadığı ve lisansı doğrulanmadığından, Ramazan İzci'nin üniversite veri setine aitmiş gibi gösterilmemiş ve public pakete alınmamıştır. Mevcut kodda bu CSV'lerden doğrudan okuma görülmemiştir.

## 3. Rapor ve sunumda belirtilen arayüz/ürün referansları

Bu kaynaklar rapor ve sunumda tasarım ve işlev araştırması amacıyla belirtilmiştir; bağlantı verilmesi ortaklık, onay veya kaynak kod kullanım izni anlamına gelmez.

- [Akıllı YKS Koçu](https://akilliykskocu.com.tr/): Hedef/özet, günlük görev, konu ilerlemesi ve deneme geçmişi gibi ekranların fikir/tasarım incelemesi.
- [Online Koçunuz](https://onlinekocunuz.com/): Çalışma planı, öğrenci motivasyonu ve performans takibi yaklaşımlarının incelenmesi.
- **YKS Koçu mobil uygulaması / YKS Koçu 2026:** Belgelerde haftalık plan, hedef özeti ve Pomodoro incelemesi için adı geçmektedir. Tam mağaza bağlantısı ve geliştirici kimliği belgelerden kesinleştirilemediği için başka bir uygulamaya bağlantı verilmemiştir.

## 4. Raporun akademik kaynakçası

Proje raporunda şu kayıt yer almaktadır:

Kacan, A. ve Gelen, İ. (2019). *Türkiye'de uzaktan eğitim programlarının incelenmesi.* Uluslararası 100. Yıl Eğitim Sempozyumu.

Bu bibliyografik kayıt rapordan aktarılmıştır; yayın künyesi ve tam metin bağlantısı bağımsız olarak doğrulanmamıştır. Kesin akademik kaynakça hazırlanırken yazar yazımı ve yayın bilgileri kontrol edilmelidir.

## 5. Proje ekibi ve kapsam

Projenin final sunumu, **Fatmaeren Kuruoğlan ve Saliha Bayram** isimlerini proje ekibi olarak belirtir. Proje Bilişim Teknolojileri Uygulaması dersi kapsamındadır. Kişi bazında kod yazarlığı ve görev dağılımı belgelerden kesinleştirilmemiştir; tüm çalışmanın yalnızca tek kişi tarafından yazıldığı iddia edilmez.

Bu pakette tam raporlar, sunumlar, kullanıcı kayıtları ve öğrenci numaraları yayımlanmamıştır. Üçüncü taraf içeriklere geliştiriciler adına yeni bir lisans verilmemiştir.


## 6. Figma tasarım ve görsel referansları

Aşağıdaki dosyalar proje geliştirilirken tasarım referansı veya uyarlama kaynağı olarak kullanılmıştır. Renkler, metinler, alanlar ve düzenler proje ihtiyaçlarına göre değiştirilmiştir. Bu şablonların, karakter görsellerinin ve tüm tasarım öğelerinin proje ekibi tarafından sıfırdan üretildiği iddia edilmez. Uygulamanın sunucu/veritabanı işlevleri ile arayüz tasarım referansları ayrı değerlendirilmelidir.

Verilen bağlantılar kullanıcının Figma'da açtığı tasarım dosyalarına/kopyalarına aittir; doğrulanmış orijinal Community yayın sayfaları olarak sunulmaz. Erişim, dosyaların paylaşım ayarlarına bağlı olabilir.

| Tasarım dosyası | Projede referans alınan bölüm / inceleme kapsamı |
|---|---|
| [Smart Education - Dashboard](https://www.figma.com/design/12o5OodiY6Un5Aec05Oiz4/Smart-Education---Dashboard--Community-) | Ana sayfa/özet paneli, yan menü, kartlar ve görseller. Logo ve karakter öğelerinin tasarım kaynağı da bu referans kapsamında belirtilir; ayrı öğe lisansları ayrıca kontrol edilmelidir. |
| [LOGIFY - WEB LOGIN UI KIT](https://www.figma.com/design/o8Dob72ajZRFFzZOXMcC78/LOGIFY---WEB-LOGIN-UI-KIT--Community-) | Login 3 ve Login 3 Register tasarımları; giriş/kayıt ekranındaki masa başı karakteri ve iki sütunlu düzen. Aynı karakter şifre yenileme ekranında da kullanılmıştır. |
| [Sign in & Sign up Page](https://www.figma.com/design/AFk6yXxgyzgupNDUuzEnwj/Sign-in---Sign-up-Page--Community---Community-) | Kullanıcının belirttiği giriş/kayıt arayüz referansı. Bu dosyadaki mavi soyut görseller, projedeki mor karakterin kaynağı değildir; karakter için LOGIFY kaydı geçerlidir. |
| [Calendar Desktop and Mobile](https://www.figma.com/design/q3AwpCYsCyIxdzd8q8pxp4/Calendar-Desktop-and-Mobile--Community-) | Takvim sayfası, yan mini takvim ve renklerle ayrılan etkinlik/görev kartlarının tasarım referansı. |
| [Pomodoro Timer](https://www.figma.com/design/FnVxVlmzyiB2PTE4SaiZlf/Pomodoro-Timer--Community-) | Pomodoro sayacı, başlat/sıfırla ve çalışma/mola süresi ayarları için kullanılan tasarım referansı. |
| [31 Free Smart Charts Kit](https://www.figma.com/design/J5RCznweC7xYVUj90kp5sT/31-Free-Smart--Charts-Kit---If-you-enjoyed--Press-like-and-follow-Btn.--Community-) | Grafik tasarımı referansı. Figma tasarımındaki halka/sütun grafiklerinin görsel araştırması kapsamında belirtilmiştir; çalışan uygulamadaki grafikler Chart.js ile oluşturulur. |

### Atıf ve lisans doğrulamasında kalan bilgiler

Dosya adları ve kullanılan tasarım kopyalarının bağlantıları kaydedilmiştir. Her dosyanın orijinal Community yayın bağlantısı, tasarımcı adı ve kaynak özelindeki lisans bilgisi henüz doğrulanmamıştır. Bunlar doğrulanmadan atıf/lisans işlemlerinin bütünüyle tamamlandığı iddia edilmez. Görsel eşleşmesi, tasarımın yayıncısını veya ayrı görsellerin asıl üreticisini tek başına kanıtlamaz.

Figma'nın [Community telif ve lisans açıklaması](https://help.figma.com/hc/en-us/articles/360042296374-Figma-Community-copyright-and-licensing), ücretsiz Community dosyaları için CC BY 4.0 çerçevesini açıklar. Bu genel açıklama, yukarıdaki belirli kopyaların veya içlerindeki tüm üçüncü taraf öğelerin lisansının doğrulandığı anlamına gelmez. Orijinal kaynak bulunduğunda tasarımcı, kaynak/lisans bağlantısı ve yapılan değişiklik bilgisiyle kayıt tamamlanmalıdır.

## 7. Kullanılan arayüz kütüphaneleri

- [Chart.js](https://www.chartjs.org/): Çalışma, konu ve deneme grafiklerinin oluşturulması.
- [Font Awesome](https://fontawesome.com/): Arayüz simgeleri.
- [Google Fonts](https://fonts.google.com/): Web yazı tipleri.

Bunlar tasarım şablonlarından ayrı yazılım/font kaynaklarıdır; kendi lisans ve atıf koşulları geçerlidir. Sunumlarda kullanılan, uygulama paketinde bulunmayan diğer dekoratif görseller için bu liste tam bir görsel envanteri değildir.
