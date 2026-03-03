// ================================
// PALABRAS Y PISTAS (FRONTEND)
// ================================
const palabras = [
  { palabra: "HTML", pista: "Lenguaje de marcado para estructurar páginas web" },
  { palabra: "CSS", pista: "Lenguaje para dar estilos a una web" },
  { palabra: "JAVASCRIPT", pista: "Lenguaje que da interactividad" },
  { palabra: "BOOTSTRAP", pista: "Framework CSS para diseño responsive" },
  { palabra: "RESPONSIVE", pista: "Adaptación a distintos dispositivos" },
  { palabra: "DOM", pista: "Representación del HTML en memoria" },
  { palabra: "FLEXBOX", pista: "Sistema de diseño flexible en CSS" }
];

// Estados visuales (abstractos)
const estados = [
  '<img src="assets/img/IMG08.png" alt="">',
  '<img src="assets/img/IMG07.png" alt="">',
  '<img src="assets/img/IMG06.png" alt="">',
  '<img src="assets/img/IMG05.png" alt="">',
  '<img src="assets/img/IMG04.png" alt="">',
  '<img src="assets/img/IMG03.png" alt="">',
  '<img src="assets/img/IMG02.png" alt="">'
];

let palabraSeleccionada;
let palabraOculta = [];
let intentos;
let maxIntentos;

// ================================
// INICIAR JUEGO
// ================================
function iniciarJuego() {

  maxIntentos = parseInt(document.getElementById("modo").value);
  intentos = maxIntentos;

  const indice = Math.floor(Math.random() * palabras.length);
  palabraSeleccionada = palabras[indice];
  palabraOculta = [];

  for (let i = 0; i < palabraSeleccionada.palabra.length; i++) {
    palabraOculta.push("_");
  }

  document.getElementById("pista").textContent = palabraSeleccionada.pista;
  document.getElementById("intentos").textContent = intentos;

  actualizarEstadoVisual();
  mostrarPalabra();
  crearBotonesLetras();
}

// ================================
// MOSTRAR PALABRA
// ================================
function mostrarPalabra() {
  const contenedor = document.getElementById("palabra");
  contenedor.innerHTML = "";

  palabraOculta.forEach(letra => {
    const span = document.createElement("span");
    span.textContent = letra;
    contenedor.appendChild(span);
  });
}

// ================================
// CREAR BOTONES
// ================================
function crearBotonesLetras() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const contenedor = document.getElementById("letras");
  contenedor.innerHTML = "";

  for (let i = 0; i < letras.length; i++) {
    const boton = document.createElement("button");
    boton.textContent = letras[i];
    boton.className = "btn btn-primary letra";

    boton.addEventListener("click", function () {
      seleccionarLetra(letras[i], boton);
    });

    contenedor.appendChild(boton);
  }
}

// ================================
// SELECCIONAR LETRA
// ================================
function seleccionarLetra(letra, boton) {

  boton.disabled = true;
  let acierto = false;

  for (let i = 0; i < palabraSeleccionada.palabra.length; i++) {
    if (palabraSeleccionada.palabra[i] === letra) {
      palabraOculta[i] = letra;
      acierto = true;
    }
  }

  if (!acierto) {
    intentos--;
    document.getElementById("intentos").textContent = intentos;
    actualizarEstadoVisual();
  }

  mostrarPalabra();
  verificarEstado();
}

// ================================
// ACTUALIZAR ESTADO VISUAL
// ================================
function actualizarEstadoVisual() {

  document.getElementById("estadoVisual").innerHTML = estados[intentos];

  const barra = document.getElementById("barraIntentos");
  const porcentaje = (intentos / maxIntentos) * 100;

  barra.style.width = porcentaje + "%";
  barra.textContent = intentos + " intentos";
}

// ================================
// VERIFICAR GANAR / PERDER
// ================================
function verificarEstado() {

  if (!palabraOculta.includes("_")) {
    alert("🎉 ¡Ganaste! Palabra: " + palabraSeleccionada.palabra);
    desactivarBotones();
  }

  if (intentos === 0) {
    alert("💀 Perdiste. Palabra: " + palabraSeleccionada.palabra);
    desactivarBotones();
  }
}

// ================================
// DESACTIVAR LETRAS
// ================================
function desactivarBotones() {
  document.querySelectorAll(".letra").forEach(b => b.disabled = true);
}

// ================================
// REINICIAR
// ================================
function reiniciarJuego() {
  iniciarJuego();
}

// ================================
// INICIO AUTOMÁTICO
// ================================
iniciarJuego();