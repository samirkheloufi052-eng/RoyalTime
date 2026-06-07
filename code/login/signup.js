// =========================
// ROYALTIME SIGNUP SYSTEM
// =========================

(function () {

    const form = document.getElementById("signupForm");

    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const pwEl = document.getElementById("password");
    const confirmEl = document.getElementById("confirm");
    const termsEl = document.getElementById("terms");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");
    const termsError = document.getElementById("termsError");

    const meter = document.getElementById("pwStrength");
    const signupBtn = document.getElementById("signupBtn");

    // =========================
    // EMAIL REGEX
    // =========================

    function validateEmail(email) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        return regex.test(email);
    }

    // =========================
    // PASSWORD SCORE
    // =========================

    function passwordScore(password) {

        let score = 0;

        if (password.length >= 8)
            score++;

        if (
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password)
        )
            score++;

        if (/\d/.test(password))
            score++;

        if (/[^A-Za-z0-9]/.test(password))
            score++;

        return score;
    }

    // =========================
    // PASSWORD METER
    // =========================

    function updateMeter() {

        const score =
            passwordScore(pwEl.value);

        meter.value = score;
    }

    pwEl.addEventListener(
        "input",
        updateMeter
    );

    updateMeter();

    // =========================
    // SHOW PASSWORD
    // =========================

    document.addEventListener(
        "click",
        function (e) {

            const btn =
                e.target.closest(".pw-toggle");

            if (!btn) return;

            if (pwEl.type === "password") {

                pwEl.type = "text";
                btn.textContent = "🙈";

            } else {

                pwEl.type = "password";
                btn.textContent = "👁";
            }
        }
    );

    // =========================
    // INSCRIPTION
    // =========================

    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            nameError.textContent = "";
            emailError.textContent = "";
            passwordError.textContent = "";
            confirmError.textContent = "";
            termsError.textContent = "";

            const nom =
                nameEl.value.trim();

            const email =
                emailEl.value.trim();

            const password =
                pwEl.value;

            const confirm =
                confirmEl.value;

            let valid = true;

            // Nom

            if (nom.length < 2) {

                nameError.textContent =
                    "Nom trop court";

                valid = false;
            }

            // Email

            if (!validateEmail(email)) {

                emailError.textContent =
                    "Adresse email invalide";

                valid = false;
            }

            // Password

            if (passwordScore(password) < 2) {

                passwordError.textContent =
                    "Mot de passe trop faible";

                valid = false;
            }

            // Confirmation

            if (password !== confirm) {

                confirmError.textContent =
                    "Les mots de passe ne correspondent pas";

                valid = false;
            }

            // Conditions

            if (!termsEl.checked) {

                termsError.textContent =
                    "Vous devez accepter les conditions";

                valid = false;
            }

            if (!valid)
                return;

            // =========================
            // UTILISATEURS
            // =========================

            const utilisateurs =
                JSON.parse(
                    localStorage.getItem("utilisateurs")
                ) || [];

            // Vérifie email déjà utilisé

            const existe =
                utilisateurs.find(
                    u => u.email === email
                );

            if (existe) {

                emailError.textContent =
                    "Cet email est déjà utilisé";

                return;
            }

            // Création utilisateur

            const nouvelUtilisateur = {

                id:
                    "u_" +
                    Math.random()
                        .toString(36)
                        .substring(2),

                nom: nom,

                email: email,

                password: password,

                dateCreation:
                    new Date().toISOString()
            };

            utilisateurs.push(
                nouvelUtilisateur
            );

            localStorage.setItem(
                "utilisateurs",
                JSON.stringify(utilisateurs)
            );

            // =========================
            // FEEDBACK
            // =========================

            signupBtn.disabled = true;

            signupBtn.textContent =
                "Création du compte...";

            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1000);
        }
    );

    // =========================
    // SOCIAL SIGNUP
    // =========================

    document.addEventListener(
        "click",
        function (e) {

            const btn =
                e.target.closest(".btn-ghost");

            if (!btn) return;

            const provider =
                btn.dataset.provider;

            localStorage.setItem(
                "royaltime_auth",
                JSON.stringify({
                    provider,
                    connecte: true
                })
            );

            window.location.href =
                "login.html";
        }
    );

    // =========================
    // DEMO ACCOUNTS — render and quick-fill
    // =========================
    function renderDemoAccounts() {
        const list = document.getElementById('demoList');
        if (!list) return;

        const stored = JSON.parse(localStorage.getItem('utilisateurs')) || [];

        // fallback defaults (same as login.js)
        const defaults = [
            { nom: 'Administrateur', email: 'admin@royaltime.com', password: 'Admin123!' },
            { nom: 'Client', email: 'client@royaltime.com', password: 'Client123!' }
        ];

        const users = stored.length ? stored : defaults;

        list.innerHTML = '';

        users.forEach(u => {
            const li = document.createElement('li');
            li.className = 'demo-item';
            li.innerHTML = `
                <div class="demo-row">
                    <strong class="demo-name">${u.nom}</strong>
                    <span class="demo-email">${u.email}</span>
                    <button type="button" class="demo-fill" data-email="${u.email}" data-password="${u.password}" data-nom="${u.nom}">Remplir</button>
                </div>
            `;
            list.appendChild(li);
        });
    }

    // Delegated click handler for demo-fill buttons
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.demo-fill');
        if (!btn) return;
        const email = btn.dataset.email || '';
        const password = btn.dataset.password || '';
        const nom = btn.dataset.nom || '';

        emailEl.value = email;
        pwEl.value = password;
        confirmEl.value = password;
        nameEl.value = nom;
        updateMeter();

        // focus password for clarity
        pwEl.focus();
    });

    // initial render
    renderDemoAccounts();

})();