const botoesFavorito = document.querySelectorAll(".favorito-btn");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];


botoesFavorito.forEach(function (botao) {

    const livro = botao.closest(".livro");
    const idLivro = livro.dataset.id;

    if (favoritos.includes(idLivro)) {
        botao.classList.add("favoritado");
        botao.textContent = "♥";
    }


    botao.addEventListener("click", function () {

        botao.classList.toggle("favoritado");

        if (botao.classList.contains("favoritado")) {

            botao.textContent = "♥";

            favoritos.push(idLivro);

        } else {

            botao.textContent = "♡";

            favoritos = favoritos.filter(function (id) {
                return id !== idLivro;
            });

        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        atualizarEstante();

    });

});

const botoesDetalhes = document.querySelectorAll(".detalhes-btn");

const modal = document.querySelector("#modal");
const modalTitulo = document.querySelector("#modal-titulo");
const modalCategoria = document.querySelector("#modal-categoria");
const modalDescricao = document.querySelector("#modal-descricao");

const modalAutor = document.querySelector("#modal-autor");
const modalPaginas = document.querySelector("#modal-paginas");
const modalAno = document.querySelector("#modal-ano");

const botaoFechar = document.querySelector(".fechar-modal");

botoesDetalhes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const livro = botao.closest(".livro");

        const titulo = livro.querySelector(".livro-info h3").textContent;
        const categoria = livro.querySelector(".livro-info p").textContent;

        const autor = livro.dataset.autor;
        const paginas = livro.dataset.paginas;
        const ano = livro.dataset.ano;

        modalTitulo.textContent = titulo;
        modalCategoria.textContent = categoria;

        modalAutor.textContent = autor;
        modalPaginas.textContent = paginas;
        modalAno.textContent = ano;

        modalDescricao.textContent = livro.dataset.descricao;

        modal.classList.add("aberta");

    });

});

botaoFechar.addEventListener("click", function () {

    modal.classList.remove("aberta");

});

const botoesCategoria = document.querySelectorAll(".categoria-btn");
const livros = document.querySelectorAll(".livro");

botoesCategoria.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const filtro = botao.dataset.filtro;

        botoesCategoria.forEach(function (outroBotao) {
            outroBotao.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        livros.forEach(function (livro) {

            const categoria = livro.dataset.categoria;

            if (filtro === "todos" || categoria === filtro) {
                livro.style.display = "block";
            } else {
                livro.style.display = "none";
            }

        });

    });

});

const explorarBotao = document.querySelector("#explorar-btn");
const secaoLivros = document.querySelector("#livros");

explorarBotao.addEventListener("click", function () {

    secaoLivros.scrollIntoView({
        behavior: "smooth"
    });

});

const estanteContainer = document.querySelector(".estante-container");
const mensagemEstante = document.querySelector(".estante-vazia");
const todosOsLivros = document.querySelectorAll(".livro");

function atualizarEstante() {

    estanteContainer.innerHTML = "";

    let quantidadeFavoritos = 0;

    todosOsLivros.forEach(function (livro) {

        const idLivro = livro.dataset.id;

        if (favoritos.includes(idLivro)) {

            const copia = livro.cloneNode(true);

            estanteContainer.appendChild(copia);

            const botaoFavorito = copia.querySelector(".favorito-btn");

            botaoFavorito.addEventListener("click", function () {

                favoritos = favoritos.filter(function (id) {
                    return id !== idLivro;
                });

                localStorage.setItem(
                    "favoritos",
                    JSON.stringify(favoritos)
                );

                atualizarEstante();

                const livroOriginal = document.querySelector(
                    `.livro[data-id="${idLivro}"]`
                );

                const botaoOriginal =
                    livroOriginal.querySelector(".favorito-btn");

                botaoOriginal.classList.remove("favoritado");
                botaoOriginal.textContent = "♡";

            });

            quantidadeFavoritos++;

        }

    });

    if (quantidadeFavoritos === 0) {
        mensagemEstante.style.display = "block";
    } else {
        mensagemEstante.style.display = "none";
    }

}

atualizarEstante();

const pesquisaLivros = document.querySelector("#pesquisa-livros");

pesquisaLivros.addEventListener("input", function () {

    const pesquisa = pesquisaLivros.value
        .toLowerCase()
        .trim();

    const palavrasPesquisa = pesquisa.split(/\s+/);

    livros.forEach(function (livro) {

        const titulo = livro
            .querySelector(".livro-info h3")
            .textContent
            .toLowerCase();

        const categoria = livro.dataset.categoria.toLowerCase();
        const autor = livro.dataset.autor.toLowerCase();

        const textoLivro = `${titulo} ${categoria} ${autor}`;

        const encontrou = palavrasPesquisa.every(function (palavra) {
            return textoLivro.includes(palavra);
        });

        if (encontrou || pesquisa === "") {
            livro.style.display = "block";
        } else {
            livro.style.display = "none";
        }

    });

});