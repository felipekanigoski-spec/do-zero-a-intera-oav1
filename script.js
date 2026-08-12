function mensagemAlien() {

    abrirPopup(`
        <h3>👽 TRANSMISSÃO RECEBIDA</h3>

        <p>
            "Brawler... conseguimos detectar sua presença."
        </p>

        <br>

        <p>
            Um portal desconhecido acaba de aparecer.
            Você está preparado para entrar?
        </p>
    `);
}


function lerNoticia(tipo) {

    let conteudo = "";

    if (tipo === "portal") {

        conteudo = `
            <h3>🌌 PORTAL ABERTO</h3>

            <p>
                Os sensores detectaram uma enorme anomalia
                espacial próxima aos limites da galáxia.
            </p>
        `;

    } else if (tipo === "alien") {

        conteudo = `
            <h3>👽 VIDA ALIENÍGENA</h3>

            <p>
                Uma transmissão misteriosa foi encontrada.
                Os cientistas ainda estão tentando descobrir
                quem está enviando o sinal.
            </p>
        `;

    } else {

        conteudo = `
            <h3>🚀 NOVA MISSÃO</h3>

            <p>
                Reúna seus melhores Brawlers e prepare-se
                para explorar uma região desconhecida do espaço.
            </p>
        `;
    }

    abrirPopup(conteudo);
}


function abrirPopup(conteudo) {

    document.getElementById("popup-content").innerHTML = conteudo;

    document.getElementById("popup").classList.add("active");
}


function fecharPopup() {

    document.getElementById("popup").classList.remove("active");
}


document.getElementById("popup").addEventListener("click", function(event) {

    if (event.target === this) {
        fecharPopup();
    }

});
