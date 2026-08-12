/* =========================
   MENU MOBILE
========================= */

const menuBtn =
    document.getElementById("menuBtn");

const menu =
    document.getElementById("menu");

menuBtn.addEventListener("click", () => {

    menu.classList.toggle("active");

});


document.querySelectorAll(".menu a")
    .forEach(link => {
function mAlien() {

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



        link.addEventListener("click", () => {

            menu.classList.remove("active");

        });

    });


/* =========================
   POPUP
========================= */

const popup =
    document.getElementById("popup");

const popupContent =
    document.getElementById("popupContent");

const closePopup =
    document.getElementById("closePopup");


function openPopup(content) {

    popupContent.innerHTML = content;

    popup.classList.add("active");

}


function closePopupFunction() {

    popup.classList.remove("active");

}


closePopup.addEventListener(
    "click",
    closePopupFunction
);


popup.addEventListener(
    "click",
    event => {

        if (event.target === popup) {

            closePopupFunction();

        }

    }
);


/* =========================
   PORTAL
========================= */

const portalButton =
    document.getElementById("portalButton");


portalButton.addEventListener(
    "click",
    () => {

        openPopup(`

            <h3>
                👽 TRANSMISSÃO RECEBIDA
            </h3>

            <p>
                "Brawler... conseguimos
                detectar sua presença."
            </p>

            <br>

            <p>
                Um portal desconhecido
                acaba de aparecer nos
                limites da galáxia.
            </p>

            <br>

            <p>
                Prepare-se para a batalha!
                🚀
            </p>

        `);

    }
);


/* =========================
   NOTÍCIAS
========================= */

const newsButtons =
    document.querySelectorAll(
        ".news-button"
    );


newsButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const type =
                button.dataset.news;

            let content = "";


            if (type === "portal") {

                content = `

                    <h3>
                        🌌 PORTAL ABERTO
                    </h3>

                    <p>
                        Os sensores detectaram
                        uma enorme anomalia
                        espacial próxima aos
                        limites da galáxia.
                    </p>

                `;

            }


            if (type === "alien") {

                content = `

                    <h3>
                        👽 VIDA ALIENÍGENA
                    </h3>

                    <p>
                        Uma transmissão misteriosa
                        foi encontrada.
                        Os cientistas ainda estão
                        tentando descobrir quem
                        está enviando o sinal.
                    </p>

                `;

            }


            if (type === "missao") {

                content = `

                    <h3>
                        🚀 NOVA MISSÃO
                    </h3>

                    <p>
                        Reúna seus melhores
                        Brawlers e prepare-se
                        para explorar uma região
                        desconhecida do espaço.
                    </p>

                `;

            }


            openPopup(content);

        }
    );

});


/* =========================
   MINI GAME
   ALIEN FLIGHT
========================= */

const canvas =
    document.getElementById(
        "gameCanvas"
    );

const ctx =
    canvas.getContext("2d");

const scoreElement =
    document.getElementById("score");

const bestElement =
    document.getElementById(
        "bestScore"
    );

const gameMessage =
    document.getElementById(
        "gameMessage"
    );

const startButton =
    document.getElementById(
        "startButton"
    );


/* =========================
   CONFIGURAÇÃO
========================= */

let alien;

let pipes;

let score;

let bestScore =
    Number(
        localStorage.getItem(
            "alienFlightBest"
        )
    ) || 0;

let gameRunning;

let frame;

let speed;


bestElement.textContent =
    bestScore;


/* =========================
   INICIAR VARIÁVEIS
========================= */

function resetPlayer() {

    alien = {

        x: 130,

        y: 220,

        width: 42,

        height: 42,

        velocity: 0,

        gravity: 0.42,

        jump: -7

    };

}


/* =========================
   FUNDO
========================= */

function drawBackground() {

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            canvas.height
        );


    gradient.addColorStop(
        0,
        "#05052a"
    );

    gradient.addColorStop(
        1,
        "#11105c"
    );


    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* estrelas */

    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const x =
            (i * 137) %
            canvas.width;

        const y =
            (i * 83) %
            canvas.height;

        const size =
            (i % 3) + 1;


        ctx.fillStyle =
            "rgba(255,255,255,.7)";


        ctx.fillRect(
            x,
            y,
            size,
            size
        );

    }


    /* planeta */

    ctx.beginPath();

    ctx.arc(
        680,
        80,
        55,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#5725a8";

    ctx.shadowBlur = 25;

    ctx.shadowColor =
        "#a800ff";

    ctx.fill();

    ctx.shadowBlur = 0;


    /* anel do planeta */

    ctx.beginPath();

    ctx.ellipse(
        680,
        80,
        85,
        20,
        -.2,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "#00ffff";

    ctx.lineWidth = 4;

    ctx.stroke();

}


/* =========================
   ALIEN
========================= */

function drawAlien() {

    ctx.save();

    ctx.translate(
        alien.x,
        alien.y
    );


    /* corpo */

    ctx.beginPath();

    ctx.ellipse(
        0,
        0,
        21,
        17,
        0,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#72ff00";

    ctx.shadowBlur = 18;

    ctx.shadowColor =
        "#72ff00";

    ctx.fill();

    ctx.shadowBlur = 0;


    /* olhos */

    ctx.fillStyle =
        "#050513";


    ctx.beginPath();

    ctx.ellipse(
        -8,
        -3,
        5,
        8,
        -.3,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.beginPath();

    ctx.ellipse(
        8,
        -3,
        5,
        8,
        .3,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* antenas */

    ctx.strokeStyle =
        "#72ff00";

    ctx.lineWidth = 3;


    ctx.beginPath();

    ctx.moveTo(-10, -13);

    ctx.lineTo(-15, -23);

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(10, -13);

    ctx.lineTo(15, -23);

    ctx.stroke();


    ctx.restore();

}


/* =========================
   CRIAR PORTAL
========================= */

function createPipe() {

    const gap = 155;

    const minHeight = 70;

    const maxHeight =
        canvas.height -
        gap -
        70;


    const topHeight =
        Math.floor(
            Math.random() *
            (maxHeight - minHeight)
        ) + minHeight;


    pipes.push({

        x: canvas.width,

        width: 75,

        top: topHeight,

        bottom:
            topHeight + gap,

        passed: false

    });

}


/* =========================
   DESENHAR PORTAIS
========================= */

function drawPipes() {

    pipes.forEach(pipe => {

        /* portal superior */

        ctx.fillStyle =
            "#7200ff";

        ctx.shadowBlur = 20;

        ctx.shadowColor =
            "#00ffff";


        ctx.fillRect(
            pipe.x,
            0,
            pipe.width,
            pipe.top
        );


        /* portal inferior */

        ctx.fillRect(
            pipe.x,
            pipe.bottom,
            pipe.width,
            canvas.height -
            pipe.bottom
        );


        ctx.shadowBlur = 0;


        /* bordas */

        ctx.strokeStyle =
            "#00ffff";

        ctx.lineWidth = 4;


        ctx.strokeRect(
            pipe.x,
            0,
            pipe.width,
            pipe.top
        );


        ctx.strokeRect(
            pipe.x,
            pipe.bottom,
            pipe.width,
            canvas.height -
            pipe.bottom
        );


        /* detalhes */

        ctx.fillStyle =
            "#00ffff";


        ctx.fillRect(
            pipe.x - 7,
            pipe.top - 12,
            pipe.width + 14,
            12
        );


        ctx.fillRect(
            pipe.x - 7,
            pipe.bottom,
            pipe.width + 14,
            12
        );

    });

}


/* =========================
   COLISÃO
========================= */

function checkCollision(pipe) {

    const left =
        alien.x -
        alien.width / 2;

    const right =
        alien.x +
        alien.width / 2;

    const top =
        alien.y -
        alien.height / 2;

    const bottom =
        alien.y +
        alien.height / 2;


    /* portal */

    if (
        right > pipe.x &&
        left < pipe.x + pipe.width
    ) {

        if (
            top < pipe.top ||
            bottom > pipe.bottom
        ) {

            return true;

        }

    }


    /* chão */

    if (
        top <= 0 ||
        bottom >= canvas.height
    ) {

        return true;

    }


    return false;

}


/* =========================
   GAME LOOP
========================= */

function gameLoop() {

    if (!gameRunning) {
        return;
    }


    frame++;


    /* fundo */

    drawBackground();


    /* gravidade */

    alien.velocity +=
        alien.gravity;

    alien.y +=
        alien.velocity;


    /* criar portais */

    if (frame % 100 === 0) {

        createPipe();

    }


    /* mover portais */

    pipes.forEach(pipe => {

        pipe.x -= speed;


        /* pontuação */

        if (
            !pipe.passed &&
            pipe.x + pipe.width <
            alien.x
        ) {

            pipe.passed = true;

            score++;

            scoreElement.textContent =
                score;


            /* dificuldade */

            if (
                score % 5 === 0
            ) {

                speed += .3;

            }

        }


        /* colisão */

        if (
            checkCollision(pipe)
        ) {

            endGame();

        }

    });


    /* remover portais */

    pipes =
        pipes.filter(
            pipe =>
                pipe.x +
                pipe.width >
                0
        );


    drawPipes();

    drawAlien();


    requestAnimationFrame(
        gameLoop
    );

}


/* =========================
   PULAR
========================= */

function jump() {

    if (!gameRunning) {

        startGame();

        return;

    }


    alien.velocity =
        alien.jump;

}


/* =========================
   COMEÇAR
========================= */

function startGame() {

    resetPlayer();


    pipes = [];

    score = 0;

    frame = 0;

    speed = 3;

    gameRunning = true;


    scoreElement.textContent =
        "0";


    gameMessage.classList.add(
        "hidden"
    );


    createPipe();


    requestAnimationFrame(
        gameLoop
    );

}


/* =========================
   GAME OVER
========================= */

function endGame() {

    if (!gameRunning) {
        return;
    }


    gameRunning = false;


    /* recorde */

    if (score > bestScore) {

        bestScore = score;


        localStorage.setItem(
            "alienFlightBest",
            bestScore
        );


        bestElement.textContent =
            bestScore;

    }


    gameMessage.innerHTML = `

        <div class="game-title">
            💥 GAME OVER
        </div>

        <p>
            Você conseguiu
            <strong
                style="color:#00ffff">
                ${score}
            </strong>
            pontos!
        </p>

        <button
            class="btn primary"
            id="restartButton">

            🚀 JOGAR NOVAMENTE

        </button>

    `;


    gameMessage.classList.remove(
        "hidden"
    );


    document
        .getElementById(
            "restartButton"
        )
        .addEventListener(
            "click",
            startGame
        );

}


/* =========================
   CONTROLES
========================= */


/* teclado */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.code === "Space" ||
            event.code === "ArrowUp"
        ) {

            event.preventDefault();

            jump();

        }

    }
);


/* mouse */

canvas.addEventListener(
    "click",
    () => {

        jump();

    }
);


/* celular */

canvas.addEventListener(
    "touchstart",
    event => {

        event.preventDefault();

        jump();

    },
    {
        passive: false
    }
);


/* botão começar */

startButton.addEventListener(
    "click",
    startGame
);


/* =========================
   TELA INICIAL
========================= */

resetPlayer();

drawBackground();

drawAlien();
