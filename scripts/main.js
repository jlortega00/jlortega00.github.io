// Obtener la dirección IP y la ubicación
fetch('http://ip-api.com/json')
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      document.getElementById('ip').textContent = data.query;
      const location = `${data.city}, ${data.regionName}, ${data.country}`;
      document.getElementById('location').textContent = location;
      document.getElementById('isp').textContent = data.isp;
      document.getElementById('timezone').textContent = data.timezone;
    } else {
      document.getElementById('ip').textContent = 'No se pudo obtener la IP';
      document.getElementById('location').textContent = 'Ubicación no disponible';
    }
  })
  .catch(error => {
    console.error('Error al obtener la IP y ubicación:', error);
    document.getElementById('ip').textContent = 'No se pudo obtener la IP';
    document.getElementById('location').textContent = 'Error al obtener la ubicación';
  });

// Obtener información del navegador
const browserInfo = navigator.userAgentData ? navigator.userAgentData.brands.map(brand => `${brand.brand} ${brand.version}`).join(', ') : navigator.userAgent;
document.getElementById('browser').textContent = browserInfo;

// Obtener información del sistema operativo
const osInfo = navigator.platform;
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
