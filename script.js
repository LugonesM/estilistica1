
let audios = [];

let audioActual = null;

const player = document.getElementById("audioPlayer");

const tema = document.getElementById("tema");
const interprete = document.getElementById("interprete");
const genero = document.getElementById("genero");

const respuesta = document.getElementById("respuesta");

const btnRespuesta = document.getElementById("btnRespuesta");
const btnSiguiente = document.getElementById("btnSiguiente");

let audiosPendientes = [];

async function cargarAudios() {

    const response = await fetch("audios.json");

    audios = await response.json();

    reiniciarBolsa();

    cargarAudioAleatorio();
}

function reiniciarBolsa() {

    audiosPendientes = [...audios];

    mezclar(audiosPendientes);
}

function mezclar(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}

function cargarAudioAleatorio() {

    if (audiosPendientes.length === 0) {

        reiniciarBolsa();
    }

    audioActual = audiosPendientes.pop();

    player.src = audioActual.url;

    // Ocultar respuesta anterior
    respuesta.classList.add("oculto");

    // Limpiar texto anterior
    tema.textContent = "";
    interprete.textContent = "";
    genero.textContent = "";

    player.load();
}

btnRespuesta.addEventListener("click", () => {

    if (!audioActual) return;

    console.log(audioActual);

    tema.textContent = audioActual.title;
    interprete.textContent = "-";
    genero.textContent = audioActual.playlist;

    respuesta.classList.remove("oculto");
});

btnSiguiente.addEventListener("click", () => {

    cargarAudioAleatorio();
});

cargarAudios();

