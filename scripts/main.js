// Obtener la dirección IP y la ubicación usando ipapi.co
fetch('https://ipapi.co/json/')
  .then(response => response.json())
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

// Obtener información del navegador y sistema operativo
const browserInfo = navigator.userAgent || 'No disponible';
document.getElementById('browser').textContent = browserInfo;

const osInfo = navigator.platform || 'No disponible';
document.getElementById('os').textContent = osInfo;

// Obtener la resolución de pantalla
const screenResolution = `${window.screen.width}x${window.screen.height}`;
document.getElementById('resolution').textContent = screenResolution;

// Obtener el idioma del navegador
const browserLanguage = navigator.language || 'No disponible';
document.getElementById('language').textContent = browserLanguage;

// Detectar el tipo de dispositivo
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const deviceType = isMobile ? 'Móvil' : 'Escritorio';
document.getElementById('device').textContent = deviceType;

// Obtener información de la conexión a Internet
if (navigator.connection) {
  const connectionType = navigator.connection.effectiveType || 'No disponible';
  document.getElementById('connection').textContent = connectionType;
} else {
  document.getElementById('connection').textContent = 'No compatible';
}

// Obtener información de la batería
if ('getBattery' in navigator) {
  navigator.getBattery()
    .then(battery => {
      const batteryLevel = Math.round(battery.level * 100);
      document.getElementById('battery').textContent = `${batteryLevel}%`;
    })
    .catch(error => {
      console.error('Error al obtener la información de la batería:', error);
      document.getElementById('battery').textContent = 'No disponible';
    });
} else {
  document.getElementById('battery').textContent = 'No compatible';
}

// Obtener información de la GPU
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
if (gl) {
  const rendererInfo = gl.getParameter(gl.RENDERER) || 'No disponible';
  document.getElementById('gpu').textContent = rendererInfo;
} else {
  document.getElementById('gpu').textContent = 'No compatible';
}

// Obtener información de la CPU
const hardwareConcurrency = navigator.hardwareConcurrency || 'No disponible';
document.getElementById('cpu').textContent = hardwareConcurrency;
