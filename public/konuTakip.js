   let currentSubjectId = null;
const token = localStorage.getItem('token');

/* 1. SAYFA YÜKLENDİĞİNDE BAŞLATICI */
document.addEventListener("DOMContentLoaded", () => {
   
    const firstTab = document.querySelector(".exam-tab.active") || document.querySelector(".exam-tab");
    if (firstTab) {
       
        filterExam('TYT', firstTab);
    }
});

/* 2. SINAV TÜRÜNE GÖRE DERSLERİ FİLTRELE */
async function filterExam(kategori, element) {
    try {
        
        document.querySelectorAll(".exam-tab").forEach(btn => {
            btn.classList.remove("active");
        });

        // Tıklanan sınav türünü aktif yap
        if (element) {
            element.classList.add("active");
        }

        
        const parts = kategori.split('-');
        const anaKategori = parts[0];
        const altAlan = parts[1];

        
        const response = await fetch(`http://localhost:3000/api/konu/dersler/${anaKategori}`);
        if (!response.ok) throw new Error("Dersler çekilemedi");
        let dersler = await response.json();

     
        if (anaKategori === "AYT" && altAlan) {
            dersler = dersler.filter(ders => {
                if (altAlan === "SAY") return ders.dersin_alani === "Sayisal";
                if (altAlan === "EA") return ders.dersin_alani === "Esit Agirlik";
                if (altAlan === "SOZ") return ders.dersin_alani === "Sözel";
                return true;
            });
        }

        const dersListesi = document.getElementById("dersListesi");
        if (!dersler.length) {
            dersListesi.innerHTML = "<p class='empty-msg'>Bu alanda ders bulunamadı.</p>";
            document.getElementById("konuListesi").innerHTML = "";
            updateProgressBar([]);
            return;
        }

       
        dersListesi.innerHTML = dersler.map(ders => `
 <button 
class="ders-btn" 
id="ders-${ders.ders_id}" 
 onclick="fetchKonular(${ders.ders_id})">
${ders.ders_adi}
 </button>
 `).join("");

        fetchKonular(dersler[0].ders_id);

    } catch (err) {
        console.error("Ders yükleme hatası:", err);
    }
}

/*  SEÇİLEN DERSE AİT KONULARI GETİR (TİKLERİ HATIRLAR) */

async function fetchKonular(dersId) {
    currentSubjectId = dersId;

    
    const token = localStorage.getItem('token');

    try {
      
        document.querySelectorAll(".ders-btn").forEach(btn => btn.classList.remove("active"));
        const targetBtn = document.getElementById(`ders-${dersId}`);
        if (targetBtn) targetBtn.classList.add("active");

        const response = await fetch(`http://localhost:3000/api/konu/konular/${dersId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            if (response.status === 401) alert("Oturumunuz dolmuş, lütfen tekrar giriş yapın.");
            throw new Error("Konular çekilemedi");
        }

        const konular = await response.json();
        const grid = document.getElementById("konuListesi");

        if (!konular.length) {
            grid.innerHTML = "<div class='empty-state'>Bu derse ait henüz konu eklenmemiş.</div>";
            updateProgressBar([]);
            return;
        }

       
        grid.innerHTML = konular.map(k => {
            const isDone = (k.tamamlandi_mi == 1 || k.tamamlandi_mi == true);
            return `
                <div class="topic-card ${isDone ? 'completed' : ''}" id="card-${k.konu_id}">
                    <input type="checkbox" 
                        ${isDone ? "checked" : ""} 
                        onchange="updateTopicStatus(${k.konu_id}, this.checked)">
                    <span>${k.konu_adi}</span>
                </div>
            `;
        }).join("");

        updateProgressBar(konular);

    } catch (err) {
        console.error("Konu yükleme hatası:", err);
    }
}





async function updateTopicStatus(konuId, durum) {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch("http://localhost:3000/api/konu/guncelle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
             
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                konuId: konuId,
                tamamlandi: durum
            })
        });

        if (res.ok) {
           
            const card = document.getElementById(`card-${konuId}`);
            if (card) {
                card.classList.toggle("completed", durum);
            }

           
            if (durum) {
                showToast("Tebrikler! Bir konuyu daha fethettin. 🔥");
            }

            
            const allCheckboxes = Array.from(document.querySelectorAll("#konuListesi input[type='checkbox']"));
            const currentStatus = allCheckboxes.map(cb => ({ tamamlandi_mi: cb.checked }));
            updateProgressBar(currentStatus);
        } else {
            alert("Durum güncellenemedi, lütfen tekrar deneyin.");
        }
    } catch (err) {
        console.error("Güncelleme hatası:", err);
    }
}


function updateProgressBar(konular) {
    const total = konular.length;
    
    const completed = konular.filter(k => k.tamamlandi_mi == true || k.tamamlandi_mi == 1).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    const bar = document.getElementById("mainProgressBar");
    const text = document.getElementById("totalPercent");

    if (bar) {
        bar.style.width = percent + "%";
    }
    if (text) {
        text.innerText = percent + "%";
    }
}

//  TEBRİK BİLDİRİMİ TOAST ŞEKLİNDE 
function showToast(mesaj) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${mesaj}</span>`;

    container.appendChild(toast);

    
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.5s ease forwards";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}