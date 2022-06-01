function exibirCardProduto(produtos) {
    const containerProdutos = document.querySelector(".containerListaProdutos__listaDeProdutos")
    containerProdutos.innerHTML = ""
    produtos.length <= 3 ? containerProdutos.classList.add("containerListaProdutos__listaDeProdutos--alinhar") : containerProdutos.classList.remove("containerListaProdutos__listaDeProdutos--alinhar")
    produtos.forEach(element => {
        const cardProduto = criarCardProduto(element)
        containerProdutos.append(cardProduto)

    })
}

function criarCardProduto(produto) {
    const imageProduto = document.createElement("img")
    imageProduto.src = produto.img

    const nomeProduto = document.createElement("h3")
    nomeProduto.innerText = produto.nome

    const secaoProduto = document.createElement("p")
    secaoProduto.innerText = produto.secao

    const precoProduto = document.createElement("strong")
    precoProduto.innerText = produto.promocao ? `R$${produto.precoPromocao}` : `R$${produto.preco}`

    const containerComponentesProduto = criarListaNutrientes(produto)
    containerComponentesProduto.classList.add("containerListaProdutos__listaComponentes")

    const adicionarProdutoCarrinho = document.createElement("button")
    adicionarProdutoCarrinho.classList.add("containerListaProdutos__adicionarCarrinho")
    adicionarProdutoCarrinho.innerText = "Comprar"

    const containerPrecoEButton = document.createElement("div")
    containerPrecoEButton.classList.add("containerListaProdutos__containerPrecoEButton")

    const cardProduto = document.createElement("li")
    cardProduto.classList.add("containerListaProdutos__cardProduto")
    containerPrecoEButton.append(precoProduto, adicionarProdutoCarrinho)
    cardProduto.append(imageProduto, nomeProduto, secaoProduto, containerComponentesProduto, containerPrecoEButton)
    cardProduto.classList.add("cardProduto")

    return cardProduto
}

function criarListaNutrientes(produto) {
    const containerComponentesProduto = document.createElement("ul")
    const { componentes } = produto
    componentes.forEach(element => {
        const componentesProduto = document.createElement("li")
        containerComponentesProduto.classList.add("containerListaProdutos__componentes")
        componentesProduto.innerText = element
        containerComponentesProduto.append(componentesProduto)
    })
    return containerComponentesProduto
}

function criarCardCarrinho(produto) {
    const containerDescricaoProduto = document.createElement("div")
    containerDescricaoProduto.classList.add("containerListaCarrinho__containerDescricaoProduto")

    const imagemProduto = document.createElement("img")
    imagemProduto.src = produto.img
    imagemProduto.classList.add("containerListaCarrinho__cardImagem")

    const nomeProduto = document.createElement("h3")
    nomeProduto.innerText = produto.nome

    const secaoProduto = document.createElement("p")
    secaoProduto.innerText = produto.secao

    const precoProduto = document.createElement("strong")
    precoProduto.innerText = produto.promocao ? `R$${produto.precoPromocao}` : `R$${produto.preco}`

    const buttonDeletarProduto = document.createElement("button")
    buttonDeletarProduto.classList.add("containerListaCarrinho__cardButtonDelete")

    const imagemDeleteProduto = document.createElement("figure")
    imagemDeleteProduto.innerHTML = `<i class="fa-solid fa-trash"></i>`
    imagemDeleteProduto.classList.add("containerListaCarrinho__buttonDelete")

    const containerImagemDescricaoProduto = document.createElement("div")
    containerImagemDescricaoProduto.classList.add("containerListaCarrinho__containerImagemDescricao")

    const containerQuantidadeItemCarrinho = document.createElement("div")
    containerQuantidadeItemCarrinho.classList.add("containerListaCarrinho__containerQuantidade")

    const cardItemCarrinho = document.createElement("li")
    cardItemCarrinho.classList.add("containerListaCarrinho__cardItem")

    buttonDeletarProduto.append(imagemDeleteProduto)
    containerDescricaoProduto.append(nomeProduto, secaoProduto, precoProduto)
    containerImagemDescricaoProduto.append(imagemProduto, containerDescricaoProduto)
    cardItemCarrinho.append(containerImagemDescricaoProduto, buttonDeletarProduto)

    return cardItemCarrinho
}

function adicionarItemCarrinho(produtos) {
    const buttonAdicionarAoCarrinho = document.querySelectorAll(".containerListaProdutos__adicionarCarrinho")
    buttonAdicionarAoCarrinho.forEach((element, index) => {
        element.addEventListener("click", () => {
            listaCarrinho.push(produtos[index])
            exibirCardItemCarrinho(listaCarrinho)
        })
    })
}

function removerItemCarrinho() {
    const buttonDeletarDoCarrinho = document.querySelectorAll(".containerListaCarrinho__buttonDelete")
    buttonDeletarDoCarrinho.forEach((element, index) => {
        element.addEventListener("click", () => {
            listaCarrinho.splice(index, 1)
            exibirCardItemCarrinho(listaCarrinho)
        })
    })
}

function exibirCardItemCarrinho(produtos) {
    const quantidadeItens = document.querySelector(".containerListaCarrinho__quantidade")
    const containerValorTotal = document.querySelector(".containerListaCarrinho__containerValorTotal")
    const containerQuantidade = document.querySelector(".containerListaCarrinho__containerQuantidade")
    const carrinhoVazio = document.querySelectorAll(".semItens")
    const containerItensCarrinho = document.querySelector(".containerListaCarrinho__itens")
    containerItensCarrinho.innerHTML = ""
    produtos.forEach(element => {
        const cardItemCarrinho = criarCardCarrinho(element)
        containerItensCarrinho.append(cardItemCarrinho)
    })
    quantidadeItens.innerText = produtos.length
    produtos.length > 0 ? (carrinhoVazio[0].classList.add("hidden"), carrinhoVazio[1].classList.add("hidden"), containerValorTotal.classList.remove("hidden"), containerQuantidade.classList.remove("hidden"))
        : (carrinhoVazio[0].classList.remove("hidden"), carrinhoVazio[1].classList.remove("hidden"), containerValorTotal.classList.add("hidden"), containerQuantidade.classList.add("hidden"))
    calcularValorCarrinho(produtos)
    removerItemCarrinho()
}

function filtrarHortifruti() {
    const buttonMostrarHortifruti = document.querySelector(".estiloGeralBotoes--filtrarHortifruti")
    buttonMostrarHortifruti.addEventListener("click", () => {
        const filtroHortifruti = produtos.filter(element => element.secao === 'Hortifruti')
        exibirCardProduto(filtroHortifruti)
        adicionarItemCarrinho(filtroHortifruti)
    })
}

function filtrarPanificadora() {
    const buttonMostrarPanificadora = document.querySelector(".estiloGeralBotoes--filtrarPanificadora")
    buttonMostrarPanificadora.addEventListener("click", () => {
        const filtroPanificadora = produtos.filter(element => element.secao === 'Panificadora')
        exibirCardProduto(filtroPanificadora)
        adicionarItemCarrinho(filtroPanificadora)
    })
}

function filtrarLactineos() {
    const buttonMostrarPanificadora = document.querySelector(".estiloGeralBotoes--filtrarLactineos")
    buttonMostrarPanificadora.addEventListener("click", () => {
        const filtroLactineos = produtos.filter(element => element.secao === 'Laticínio')
        exibirCardProduto(filtroLactineos)
        adicionarItemCarrinho(filtroLactineos)
    })
}

function filtrarTodos() {
    const buttonMostrarTodos = document.querySelector(".estiloGeralBotoes--mostrarTodos")
    buttonMostrarTodos.addEventListener("click", () => {
        exibirCardProduto(produtos)
        adicionarItemCarrinho(produtos)
    })
}

function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function filtrarPorBusca() {
    const inputPesquisa = document.querySelector(".filtersContainer__campoBuscaPorNome")
    const buttonPesquisa = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")
    buttonPesquisa.addEventListener("click", () => {
        const filtroPesquisa = produtos.filter(element => removerAcentos(element.nome.toLocaleLowerCase()).includes(removerAcentos(inputPesquisa.value.toLocaleLowerCase()))
            || removerAcentos(element.categoria.toLocaleLowerCase()).includes(removerAcentos(inputPesquisa.value.toLocaleLowerCase()))
            || removerAcentos(element.secao.toLocaleLowerCase()).includes(removerAcentos(inputPesquisa.value.toLocaleLowerCase())))
        exibirCardProduto(filtroPesquisa)
        adicionarItemCarrinho(filtroPesquisa)
        inputPesquisa.value = ""
    })
}

function calcularValorCarrinho(produtos) {
    const valorFinal = document.querySelector(".containerListaCarrinho__total")
    let precoTotal = 0
    produtos.forEach(element => {
        element.promocao ? precoTotal += Number(element.precoPromocao) : precoTotal += Number(element.preco)
    })
    valorFinal.innerText = `R$${precoTotal.toFixed(2)}`
}

function montarEstruturaFuncional() {
    exibirCardProduto(produtos)
    filtrarHortifruti()
    filtrarPanificadora()
    filtrarLactineos()
    filtrarTodos()
    filtrarPorBusca()
    adicionarItemCarrinho(produtos)
}

montarEstruturaFuncional()


