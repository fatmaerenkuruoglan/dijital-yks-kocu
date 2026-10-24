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
