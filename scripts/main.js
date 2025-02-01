// Obtener la dirección IP y la ubicación
fetch('https://ipinfo.io/json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('ip').textContent = data.ip;
    document.getElementById('location').textContent = `${data.city}, ${data.region}, ${data.country}`;
    document.getElementById('isp').textContent = data.org;
    document.getElementById('timezone').textContent = data.timezone;
  })
  .catch(error => {
    console.error('Error al obtener la IP y ubicación:', error);
    document.getElementById('ip').textContent = 'No se pudo obtener la IP';
    document.getElementById('location').textContent = 'No se pudo obtener la ubicación';
  });

// Obtener información del navegador y sistema operativo
const browserInfo = navigator.userAgent;
const osInfo = navigator.platform;
document.getElementById('browser').textContent = browserInfo;
document.getElementById('os').textContent = osInfo;

// Obtener la resolución de pantalla
const screenResolution = `${window.screen.width}x${window.screen.height}`;
document.getElementById('resolution').textContent = screenResolution;

// Obtener el idioma del navegador
const browserLanguage = navigator.language;
document.getElementById('language').textContent = browserLanguage;

// Detectar el tipo de dispositivo
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const deviceType = isMobile ? 'Móvil' : 'Escritorio';
document.getElementById('device').textContent = deviceType;

// Obtener información de la conexión a Internet
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if (connection) {
  const connectionType = connection.effectiveType;
  document.getElementById('connection').textContent = connectionType;
}

// Obtener información de la batería
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
    const batteryLevel = Math.round(battery.level * 100);
    document.getElementById('battery').textContent = `${batteryLevel}%`;
  });
}

// Obtener información de la GPU
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
if (gl) {
  const rendererInfo = gl.getParameter(gl.RENDERER);
  document.getElementById('gpu').textContent = rendererInfo;
}

// Obtener información de la CPU
const hardwareConcurrency = navigator.hardwareConcurrency;
document.getElementById('cpu').textContent = hardwareConcurrency;
