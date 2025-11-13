// ---------------------------------------
// TP FINAL PARTE 1
// Juana Lopez y Camila Martinez
// ---------------------------------------
// Resolución: 640x480
// Uso de: Arreglos, Funciones (con parámetros), Imágenes y Sonido
// ---------------------------------------

let escenas = [];       // Array para guardar las imágenes
let escenaActual = 0;   // Escena que se muestra
let totalEscenas = 18;  // Total de imágenes
let efectoPasar;        // Sonido

// ---------------------------------------
// PRELOAD: Carga las imágenes y el sonido
// ---------------------------------------
function preload() {
  for (let i = 0; i < totalEscenas; i++) {
    // Ahora apunta a tu carpeta "img"
    escenas[i] = loadImage("img/img" + (i + 1) + ".jpg");
  }

  // Y si el sonido también está en esa carpeta:
  efectoPasar = loadSound("img/pasar.mp3");
  
    textos = [
    "Dipper y sus amigos se preparan para una nueva aventura.",
    "Dipper encuentra la fotocopiadora mágica.",
    "Decide probarla por curiosidad...",
    "Comienza a experimentar con clones para preparar una fiesta.",
    "Los clones se emocionan demasiado y empiezan a comportarse raro.",
    "Dipper nota un error en las copias.",
    "La fiesta se sale de control.",
    "La situación se vuelve caótica y todos se enojan.",
    "Soos aparece y trata de poner orden.",
    "La fiesta se calma y vuelve la tranquilidad.",
    "Dipper intenta impresionar a Wendy.",
    "Pero su clon empieza a actuar de manera extraña.",
    "Los clones discuten quién es el verdadero Dipper.",
    "Wendy aparece y debe decidir qué hacer.",
    "Dipper enfrenta a los clones.",
    "Los clones se esconden para rebelarse.",
    "Todo termina en un gran apagón.",
    "Finalmente, todos bailan y aprenden la lección."
  ];
}

// ---------------------------------------
// SETUP: Se ejecuta una sola vez al inicio
// ---------------------------------------
function setup() {
  createCanvas(640, 480);
  textAlign(CENTER, TOP);
  textSize(18);
}

// ---------------------------------------
// DRAW: Dibuja la escena actual
// ---------------------------------------
function draw() {
  background(0);

  if (escenaActual === -1) {
    pantallaInicio();  // muestra el botón inicial
  } else {
    mostrarEscena(escenaActual); // muestra imágenes y texto
    dibujarBoton();              // muestra el botón de avance
  }
}

// ---------------------------------------
// FUNCIÓN CON PARÁMETRO
// Muestra una imagen y su número
// ---------------------------------------
function mostrarEscena(i) {
  if (i>= 0 && i< totalEscenas) {
    image(escenas[i], 0, 0, width, height);

    fill(0, 150);
    rect(0, height - 50, width, 50);

    fill(255);
    text("Escena " + (i+ 1) + " de " + totalEscenas, width / 2, height - 40);
  }
}

// ---------------------------------------
// FUNCIÓN: mostrar imagen y texto narrativo
// ---------------------------------------
function mostrarEscena(i) {
  image(escenas[i], 0, 0, width, height);

  fill(0, 150);
  rect(0, height - 60, width, 60);

  fill(255);
  textSize(18);
  text(textos[i], width / 2, height - 30);
}

// ---------------------------------------
// Función: dibujar el círculo de avance
// ---------------------------------------
function dibujarBoton() {
  const x = width - 40;
  const y = height - 40;
  const r = 25;

  noStroke();

  // Si es la última escena → botón de reinicio (rojo)
  if (escenaActual === totalEscenas - 1) {
    fill(255, 80, 80); // rojo
    ellipse(x, y, r * 2);

    // Icono de reinicio (flecha circular)
    fill(255);
    arc(x, y, 30, 30, PI * 0.2, PI * 1.8);
    line(x + 10, y - 5, x + 16, y - 12);
  } 
  else {
    // Botón normal (flecha azul)
    fill(70, 120, 255); 
    ellipse(x, y, r * 2);

    fill(255);
    triangle(x - 5, y - 8, x - 5, y + 8, x + 8, y);
  }
}

// ---------------------------------------
// INTERACCIÓN CON EL USUARIO
// ---------------------------------------
function mousePressed() {
  const x = width - 40;
  const y = height - 40;
  const r = 25;
  const distancia = dist(mouseX, mouseY, x, y);

  if (distancia < r) {
    efectoPasar.play();

    // Pantalla de inicio (-1) → comenzar
    if (escenaActual === -1) {
      escenaActual = 0;
    }
    // Última escena → REINICIAR
    else if (escenaActual === totalEscenas - 1) {
      escenaActual = 0;   // vuelve a la primera imagen
    }
    // En cualquier otra → avanzar normalmente
    else {
      escenaActual++;
    }
  }
}
