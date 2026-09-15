/* ==========================================================================
   RAÍZES DO FUTURO - COOPERATIVA ORGÂNICA
   Arquivo Principal de Scripts (JavaScript)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 1. Menu Responsivo Mobile (Todas as páginas)
    // ==========================================================================
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            const menuAberto = menu.classList.toggle("aberto");

            menuToggle.setAttribute("aria-expanded", String(menuAberto));
            menuToggle.textContent = menuAberto ? "Fechar menu" : "Menu";
        });
    }

    // ==========================================================================
    // 2. Formulário de Cadastro (cadastro.html)
    // ==========================================================================
    const formulario = document.querySelector("#formulario-cadastro");

    if (formulario) {
        const mensagemSucesso = document.querySelector("#mensagem-sucesso");
        const cpfInput = document.querySelector("#cpf");
        const telefoneInput = document.querySelector("#telefone");
        const cepInput = document.querySelector("#cep");
        const checkboxesInteresse = document.querySelectorAll('input[name="interesses"]');

        // Máscara dinâmica de CPF (000.000.000-00)
        if (cpfInput) {
            cpfInput.addEventListener("input", (event) => {
                const numeros = event.target.value.replace(/\D/g, "").slice(0, 11);

                event.target.value = numeros
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            });
        }

        // Máscara de Telefone fixo / celular: (00) 0000-0000 ou (00) 00000-0000
        if (telefoneInput) {
            telefoneInput.addEventListener("input", (event) => {
                const numeros = event.target.value.replace(/\D/g, "").slice(0, 11);

                if (numeros.length <= 10) {
                    event.target.value = numeros
                        .replace(/(\d{2})(\d)/, "($1) $2")
                        .replace(/(\d{4})(\d)/, "$1-$2");
                    return;
                }

                event.target.value = numeros
                    .replace(/(\d{2})(\d)/, "($1) $2")
                    .replace(/(\d{5})(\d)/, "$1-$2");
            });
        }

        // Máscara de CEP (00000-000)
        if (cepInput) {
            cepInput.addEventListener("input", (event) => {
                const numeros = event.target.value.replace(/\D/g, "").slice(0, 8);

                event.target.value = numeros.replace(/(\d{5})(\d)/, "$1-$2");
            });
        }

        // Validação: Ao menos uma área de interesse deve ser selecionada
        function validarInteresses() {
            if (!checkboxesInteresse || checkboxesInteresse.length === 0) return;

            const algumInteresseSelecionado = [...checkboxesInteresse].some(
                (checkbox) => checkbox.checked
            );

            checkboxesInteresse[0].setCustomValidity(
                algumInteresseSelecionado
                    ? ""
                    : "Selecione pelo menos uma área de interesse."
            );
        }

        checkboxesInteresse.forEach((checkbox) => {
            checkbox.addEventListener("change", validarInteresses);
        });

        // Envio do formulário
        formulario.addEventListener("submit", (event) => {
            validarInteresses();

            if (!formulario.checkValidity()) {
                event.preventDefault();
                formulario.reportValidity();
                return;
            }

            event.preventDefault();

            if (mensagemSucesso) {
                mensagemSucesso.textContent =
                    "Cadastro enviado com sucesso! Em breve entraremos em contato.";
                mensagemSucesso.classList.add("visivel");
            }

            formulario.reset();
        });
    }
});
