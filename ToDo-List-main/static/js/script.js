// seleciona elementos do DOM e armazena em variáveis
const tarefaInput = document.getElementById("tarefaInput");
const btn_adicionar = document.getElementById("btn_adicionar");
const btn_limpar = document.getElementById("btn_limpar");
const lista = document.getElementById("lista");

// função para adicionar tarefa
function adicionarTarefa() {
    const texto = tarefaInput.value.trim();

    // verificando se o campo está vazio
    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    // criar um novo item na lista
    const li = document.createElement("li");
    li.style.opacity = "0";
    li.style.transform = "translateY(-10px)";
    li.style.transition = "all 0.3s ease";

    // criar um span para armazenar o texto no app
    const span = document.createElement("span");
    span.textContent = texto;

    // evento para editar tarefa ao clicar
    span.addEventListener("click", function () {
        // se já estiver concluída, não editar
        if (span.classList.contains("concluida")) return;

        const inputEdicao = document.createElement("input");
        inputEdicao.type = "text";
        inputEdicao.value = span.textContent;
        inputEdicao.style.width = "80%";
        inputEdicao.style.padding = "5px";
        inputEdicao.style.fontSize = "1em";
        inputEdicao.style.border = "1px solid rgb(167, 34, 255)";
        inputEdicao.style.borderRadius = "4px";
        inputEdicao.style.background = "rgba(0,0,0,0.5)";
        inputEdicao.style.color = "rgb(167, 34, 255)";
        inputEdicao.style.outline = "none";

        // substituir o span pelo input
        li.replaceChild(inputEdicao, span);
        inputEdicao.focus();

        // salvar ao pressionar Enter
        inputEdicao.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                salvarEdicao(inputEdicao, span, li);
            }
        });

        // salvar ao perder o foco
        inputEdicao.addEventListener("blur", function () {
            salvarEdicao(inputEdicao, span, li);
        });
    });

    // função para marcar/desmarcar como concluída (com efeito)
    span.addEventListener("dblclick", function () {
        span.classList.toggle("concluida");
        span.style.transition = "all 0.3s ease";
        span.style.transform = span.classList.contains("concluida")
            ? "scale(1.05)"
            : "scale(1)";
    });

    // criar botão de remover
    const btn_remover = document.createElement("button");
    btn_remover.textContent = "❌";

    // criar evento de remover tarefa com efeito fade-out
    btn_remover.addEventListener("click", function () {
        li.style.opacity = "0";
        li.style.transform = "translateX(50px)";
        setTimeout(() => {
            lista.removeChild(li);
        }, 300);
    });

    // adicionar o texto e o botão dentro da li
    li.appendChild(span);
    li.appendChild(btn_remover);

    // adicionar os elementos dentro da lista
    lista.appendChild(li);

    // animação de entrada
    setTimeout(() => {
        li.style.opacity = "1";
        li.style.transform = "translateY(0)";
    }, 10);

    // limpa e foca o campo input
    tarefaInput.value = "";
    tarefaInput.focus();
}

// função para salvar edição
function salvarEdicao(inputEdicao, span, li) {
    const novoTexto = inputEdicao.value.trim();
    span.textContent = novoTexto || "(Sem título)";
    li.replaceChild(span, inputEdicao);
}

// evento do botão de adicionar
btn_adicionar.addEventListener("click", adicionarTarefa);

// evento para adicionar tarefa pressionando Enter
tarefaInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

// evento de limpar lista com efeito
btn_limpar.addEventListener("click", function () {
    const itens = lista.querySelectorAll("li");
    itens.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = "0";
            item.style.transform = "translateX(50px)";
            setTimeout(() => {
                item.remove();
            }, 300);
        }, index * 100); // atraso para efeito cascata
    });
});
