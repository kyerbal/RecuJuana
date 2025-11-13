let pantallas;
let botonInicio;
let soos;
let deapers = [];
let balas = [];

let tiempoInicio;
let limite = 15000;

let imgSoos;
let imgDiper;
let imgFondo;
let imgBola;

function preload() {
  imgSoos  = loadImage("img/Soos.png");
  imgDiper = loadImage("img/Diper.png");
  imgFondo = loadImage("img/Fondo.png");
  imgBola  = loadImage("img/Bola.png");
}

function setup() {
  createCanvas(680, 480);

  pantallas = new Pantallas();

  botonInicio = new BotonInicio(() => {
    pantallas.cambiar(2);
  }
  );

  soos = new Soos(80, height / 2);
  crearDeapers();
}

function draw() {
  background(20);

  pantallas.update();
  pantallas.mostrar();

  // mostrar botón solo en estado 0
  if (pantallas.estado === 0) botonInicio.show();
  else botonInicio.hide();

  // -----------------------------
  //   LÓGICA DEL JUEGO (estado 3)
  // -----------------------------
  if (pantallas.estado === 3) {

    // Soos
    soos.mover();
    soos.mostrar();

    // Deapers
    for (let d of deapers) {
      d.mover();
      d.mostrar();
    }

    // Balas
    for (let i = balas.length - 1; i >= 0; i--) {
      let b = balas[i];
      b.update();
      b.mostrar();

      for (let j = deapers.length - 1; j >= 0; j--) {
        if (b.choca(deapers[j])) {
          deapers.splice(j, 1);
          balas.splice(i, 1);
          break;
        }
      }

      if (b.x > width) {
        balas.splice(i, 1);
      }
    }

    // ¿GANASTE?
    if (deapers.length === 0) {
      pantallas.cambiar(4);
    }
  }
}

function keyPressed() {

  if (!pantallas) return;  // <- SOLUCIÓN SEGURA

  if (pantallas.estado === 3 && key === " ") {
    balas.push(new Bola(soos.x + 40, soos.y));
  }

  if (pantallas.estado === 1 && key === "b") pantallas.cambiar(0);

  if (pantallas.estado === 2 && key === "j") {
    tiempoInicio = millis();
    pantallas.cambiar(3);
  }

  if ((pantallas.estado === 4 || pantallas.estado === 5) && key === "r") {
    reiniciarJuego();
  }

  if (pantallas.estado === 0 && key === "c") pantallas.cambiar(1);
}


function crearDeapers() {
  deapers = [];
  for (let i = 0; i < 5; i++) {
    deapers.push(new Deaper(
      random(width/2, width - 50),
      random(50, height - 50)
      ));
  }
}

function reiniciarJuego() {
  soos = new Soos(80, height / 2);
  balas = [];
  crearDeapers();
  tiempoInicio = millis();
  pantallas.cambiar(3);
}
