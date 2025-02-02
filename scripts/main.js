// Obtener la dirección IP y la ubicación usando ipapi.co
fetch('https://ipapi.co/json/')
  .then(response => {
    if (!response.ok) throw new Error("No se pudo obtener la IP");
    return response.json();
  })
  .then(data => {
    document.getElementById('ip').textContent = data.ip || 'No disponible';
    document.getElementById('location').textContent = `${data.city}, ${data.region}, ${data.country_name}` || 'No disponible';
    document.getElementById('isp').textContent = data.org || 'No disponible';
    document.getElementById('timezone').textContent = data.timezone || 'No disponible';
  })
  .catch(error => {
    console.error('Error al obtener la IP y ubicación:', error);
    document.getElementById('ip').textContent = 'No se pudo obtener la IP';
    document.getElementById('location').textContent = 'Error al obtener la ubicación';
  });

// Obtener información del navegador de forma más segura
if (navigator.userAgentData) {
  navigator.userAgentData.getHighEntropyValues(["platform", "architecture", "model"])
    .then(data => {
      document.getElementById('browser').textContent = navigator.userAgentData.brands.map(b => b.brand).join(', ') || 'No disponible';
      document.getElementById('os').textContent = data.platform || 'No disponible';
    });
} else {
  document.getElementById('browser').textContent = navigator.userAgent || 'No disponible';
  document.getElementById('os').textContent = navigator.platform || 'No disponible';
}

// Obtener la resolución de pantalla
document.getElementById('resolution').textContent = `${window.screen.width}x${window.screen.height}`;

// Obtener el idioma del navegador
document.getElementById('language').textContent = navigator.language || 'No disponible';

// Detectar el tipo de dispositivo
document.getElementById('device').textContent = /Mobi|Android/i.test(navigator.userAgent) ? 'Móvil' : 'Escritorio';

// Obtener información de la conexión a Internet
if (navigator.connection) {
  document.getElementById('connection').textContent = navigator.connection.effectiveType || 'No disponible';
} else {
  document.getElementById('connection').textContent = 'No compatible';
}

// Obtener información de la batería
if ('getBattery' in navigator) {
  navigator.getBattery()
    .then(battery => {
      document.getElementById('battery').textContent = `${Math.round(battery.level * 100)}%`;
    })
    .catch(() => {
      document.getElementById('battery').textContent = 'No disponible';
    });
} else {
  document.getElementById('battery').textContent = 'No compatible';
}

// Obtener información de la GPU
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
document.getElementById('gpu').textContent = gl ? gl.getParameter(gl.RENDERER) || 'No disponible' : 'No compatible';

// Obtener información de la CPU
document.getElementById('cpu').textContent = navigator.hardwareConcurrency || 'No disponible';
