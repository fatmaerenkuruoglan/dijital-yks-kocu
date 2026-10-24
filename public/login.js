document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('sifre');
    const togglePassword = document.getElementById('togglePassword');
    const toast = document.getElementById('toast');
    const rememberMeInput = document.getElementById("rememberMe");
    const emailInput = document.getElementById("email");

    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail && emailInput && rememberMeInput) {
        emailInput.value = savedEmail;
        rememberMeInput.checked = true;
    }

    function showToast(message, type = "success") {
        toast.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.className = "toast";
        }, 2500);
    }

    if (togglePassword && passwordInput) {
        togglePassword.textContent = "🙈";
        passwordInput.type = "password";

        togglePassword.addEventListener("click", () => {
            const isHidden = passwordInput.type === "password";

            if (isHidden) {
                passwordInput.type = "text";
                togglePassword.textContent = "👁";
            } else {
                passwordInput.type = "password";
                togglePassword.textContent = "🙈";
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, sifre: password })
                });

                const contentType = response.headers.get("content-type");
                let data;

                if (contentType && contentType.includes("application/json")) {
                    data = await response.json();
                } else {
                    const text = await response.text();
                    data = { message: text };
                }

                if (response.ok) {
                    if (rememberMeInput.checked) {
                        localStorage.setItem("rememberedEmail", email);
                    } else {
                        localStorage.removeItem("rememberedEmail");
                    }

                    localStorage.setItem('token', data.token);

                    if (data.user) {
                        localStorage.setItem('user', JSON.stringify(data.user));
                    }

                    showToast("Giriş başarılı, yönlendiriliyorsunuz.", "success");

                    setTimeout(() => {
                        window.location.href = '/anasayfa.html';
                    }, 1200);
                } else {
                    showToast(data.message || "E-posta veya şifre hatalı.", "error");
                }
            } catch (error) {
                console.error('Bağlantı Hatası:', error);
                showToast("Sunucuya ulaşılamıyor. Node.js sunucunu kontrol et.", "error");
            }
        });
    }
});