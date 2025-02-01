const container = document.getElementById('snake-container');
const segmentSize = 20; // Tamaño de cada segmento de la serpiente
let snake = [{ x: 0, y: 0 }]; // Inicializa la serpiente con un segmento
let direction = { x: 1, y: 0 }; // Dirección inicial de la serpiente

// Función para crear un segmento de la serpiente
function createSegment(x, y) {
  const segment = document.createElement('div');
  segment.classList.add('snake-segment');
  segment.style.left = `${x * segmentSize}px`;
  segment.style.top = `${y * segmentSize}px`;
  return segment;
}

// Función para mover la serpiente
function moveSnake() {
  // Obtén la cabeza de la serpiente
  const head = { ...snake[0] };

  // Calcula la nueva posición de la cabeza
  head.x += direction.x;
  head.y += direction.y;

  // Asegúrate de que la serpiente no salga de la pantalla
  if (head.x < 0) head.x = Math.floor(container.clientWidth / segmentSize) - 1;
  if (head.x >= Math.floor(container.clientWidth / segmentSize)) head.x = 0;
  if (head.y < 0) head.y = Math.floor(container.clientHeight / segmentSize) - 1;
  if (head.y >= Math.floor(container.clientHeight / segmentSize)) head.y = 0;

  // Añade la nueva cabeza al principio del array
  snake.unshift(head);

  // Elimina el último segmento de la serpiente
  const tail = snake.pop();

  // Actualiza la posición de los segmentos en la pantalla
  container.innerHTML = ''; // Limpia el contenedor
  snake.forEach(segment => {
    container.appendChild(createSegment(segment.x, segment.y));
  });
}

// Cambia la dirección de la serpiente con las teclas de flecha
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Mueve la serpiente cada 100ms
setInterval(moveSnake, 100);
