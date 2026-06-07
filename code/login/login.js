// =========================
// ROYALTIME LOGIN SYSTEM
// =========================

(function () {

    const form = document.getElementById('loginForm');
    const emailEl = document.getElementById('email');
    const pwEl = document.getElementById('password');

    const emailError = document.getElementById('emailError');
    const pwError = document.getElementById('passwordError');

    const pwMeter = document.getElementById('pwStrength');
    const submitBtn = document.getElementById('submitBtn');

    // =========================
    // UTILISATEURS PAR DEFAUT
    // =========================

    const defaultUsers = [
        {
            nom: "Administrateur",
            email: "admin@royaltime.com",
            password: "Admin123!"
        },
        {
            nom: "Client",
            email: "client@royaltime.com",
            password: "Client123!"
        }
    ];

    // Création automatique si aucun utilisateur n'existe
    if (!localStorage.getItem("utilisateurs")) {
        localStorage.setItem(
            "utilisateurs",
            JSON.stringify(defaultUsers)
        );
    }

    // =========================
    // EMAIL
    // =========================

    function validateEmail(email) {

        if (!email)
            return "Email requis";

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!regex.test(email))
            return "Adresse email invalide";

        return "";
    }

    // =========================
    // FORCE MOT DE PASSE
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

    function updateMeter() {

        const score =
            passwordScore(pwEl.value);

        pwMeter.value = score;
    }

    // =========================
    // AFFICHER / MASQUER MDP
    // =========================

    document.addEventListener("click", function (e) {

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
    });

    // =========================
    // INPUT EVENTS
    // =========================

    emailEl.addEventListener("input", () => {

        emailError.textContent = "";
    });

    pwEl.addEventListener("input", () => {

        updateMeter();
        pwError.textContent = "";
    });

    // =========================
    // CONNEXION
    // =========================

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        emailError.textContent = "";
        pwError.textContent = "";

        const email =
            emailEl.value.trim();

        const password =
            pwEl.value;

        let valid = true;

        // Validation email

        const emailValidation =
            validateEmail(email);

        if (emailValidation) {

            emailError.textContent =
                emailValidation;

            valid = false;
        }

        // Validation mdp

        if (password.length < 8) {

            pwError.textContent =
                "Minimum 8 caractères";

            valid = false;
        }

        if (!valid) return;

        // =========================
        // RECUPERATION UTILISATEURS
        // =========================

        const utilisateurs =
            JSON.parse(
                localStorage.getItem("utilisateurs")
            ) || [];

        // =========================
        // VERIFICATION LOGIN
        // =========================

        const utilisateur =
            utilisateurs.find(user =>
                user.email === email &&
                user.password === password
            );

        if (!utilisateur) {

            pwError.textContent =
                "Email ou mot de passe incorrect";

            return;
        }

        // =========================
        // CREATION SESSION
        // =========================

        const session = {

            nom: utilisateur.nom,

            email: utilisateur.email,

            connecte: true,

            dateConnexion:
                new Date().toISOString()
        };

        localStorage.setItem(
            "royaltime_auth",
            JSON.stringify(session)
        );

        // =========================
        // REMEMBER ME
        // =========================

        const remember =
            document.getElementById("remember");

        if (remember.checked) {

            localStorage.setItem(
                "royaltime_remember",
                email
            );
        }

        // =========================
        // FEEDBACK
        // =========================

        submitBtn.disabled = true;
        submitBtn.textContent = "Connexion...";

        setTimeout(() => {

            window.location.href =
                "../home-page/index.html";

        }, 1000);

    });

    // =========================
    // REMEMBER EMAIL
    // =========================

    const rememberedEmail =
        localStorage.getItem(
            "royaltime_remember"
        );

    if (rememberedEmail) {

        emailEl.value =
            rememberedEmail;

        document.getElementById(
            "remember"
        ).checked = true;
    }

    // =========================
    // SOCIAL LOGIN SIMULÉ
    // =========================

    document.addEventListener(
        "click",
        function (e) {

            const btn =
                e.target.closest(".btn-ghost");

            if (!btn) return;

            const provider =
                btn.dataset.provider;

            const session = {

                provider: provider,

                connecte: true,

                dateConnexion:
                    new Date().toISOString()
            };

            localStorage.setItem(
                "royaltime_auth",
                JSON.stringify(session)
            );

            submitBtn.disabled = true;

            submitBtn.textContent =
                "Connexion via " + provider + "...";

            setTimeout(() => {

                window.location.href =
                    "../home-page/index.html";

            }, 1000);
        }
    );

    // =========================
    // DEMO ACCOUNTS — render list and quick actions
    // =========================
    function renderDemoAccounts() {
        const list = document.getElementById('demoList');
        if (!list) return;

        const stored = JSON.parse(localStorage.getItem('utilisateurs')) || [];
        const users = stored.length ? stored : defaultUsers;

        list.innerHTML = '';

        users.forEach(u => {
            const li = document.createElement('li');
            li.className = 'demo-item';
            li.innerHTML = `
                <div class="demo-row">
                    <div>
                      <strong class="demo-name">${u.nom}</strong>
                      <div class="demo-email">${u.email}</div>
                    </div>
                    <div class="demo-actions">
                      <button type="button" class="demo-fill" data-email="${u.email}" data-password="${u.password}">Remplir</button>
                      <button type="button" class="demo-login" data-email="${u.email}" data-password="${u.password}">Se connecter</button>
                    </div>
                </div>
            `;
            list.appendChild(li);
        });
    }

    // Delegated handler for demo buttons
    document.addEventListener('click', function (e) {
        const fill = e.target.closest('.demo-fill');
        if (fill) {
            const email = fill.dataset.email || '';
            const password = fill.dataset.password || '';
            emailEl.value = email;
            pwEl.value = password;
            updateMeter();
            pwEl.focus();
            return;
        }

        const loginBtn = e.target.closest('.demo-login');
        if (loginBtn) {
            const email = loginBtn.dataset.email || '';
            const password = loginBtn.dataset.password || '';
            emailEl.value = email;
            pwEl.value = password;
            updateMeter();
            // submit the form programmatically
            if (typeof form.requestSubmit === 'function') form.requestSubmit();
            else submitBtn.click();
            return;
        }
    });

    // initial render of demo accounts
    renderDemoAccounts();

    updateMeter();

})();
