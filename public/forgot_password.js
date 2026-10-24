document.getElementById("forgotForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const toast = document.getElementById("toast");

    function showToast(message, type = "success") {

        toast.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.className = "toast";
        }, 2500);
    }

    const email =
        document.getElementById("email").value.trim();

    const newPassword =
        document.getElementById("newPassword").value;

    try {

        const res = await fetch(
            "http://localhost:3000/api/auth/forgot_password",
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    sifre: newPassword
                })
            }
        );

        const text = await res.text();

        if (res.ok) {

            showToast(
                "Şifren başarıyla güncellendi.",
                "success"
            );

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        } else {

            showToast(
                text || "Şifre güncellenemedi.",
                "error"
            );
        }

    } catch (err) {

        console.error(err);

        showToast(
            "Sunucuya ulaşılamıyor!",
            "error"
        );
    }
});