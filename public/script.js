document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const toast = document.getElementById("toast");

    function showToast(message, type = "success") {
        toast.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.className = "toast";
        }, 3000);
    }

    const data = {
        ad: document.getElementById("ad").value,
        soyad: document.getElementById("soyad").value,
        email: document.getElementById("email").value,
        sifre: document.getElementById("sifre").value,
        cinsiyet: document.getElementById("cinsiyet").value,
        dogum_gunu: document.getElementById("dogum_gunu").value,
        city: document.getElementById("city").value
    };

    try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const text = await res.text();

        if (res.ok) {
            showToast("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsun.", "success");

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {
           
            if (text.includes("duplicate key")) {
                showToast("Bu e-posta zaten kayıtlı!", "error");
            } else {
                showToast("Hata: " + text, "error");
            }
        }

    } catch (err) {
        showToast("Sunucuya ulaşılamıyor!", "error");
    }
});