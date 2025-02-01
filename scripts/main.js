// Obtener la dirección IP y la ubicación usando ipify y ipstack
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ip = data.ip;
    document.getElementById('ip').textContent = ip;

    // Usar ipstack para obtener detalles adicionales sobre la IP
    fetch(`https://api.ipstack.com/${ip}?access_key=YOUR_ACCESS_KEY`)
      .then(response => response.json())
      .then(locationData => {
        if (locationData && locationData.city) {
          const location = `${locationData.city}, ${locationData.region_name}, ${locationData.country_name}`;
          document.getElementById('location').textContent = location;
          document.getElementById('isp').textContent = locationData.connection.isp || 'Desconocido';
          document.getElementById('timezone').textContent = locationData.location.timezone || 'Desconocido';
        } else {
          document.getElementById('location').textContent = 'Ubicación no disponible';
          document.getElementById('isp').textContent = 'ISP no disponible';
          document.getElementById('timezone').textContent = 'Zona horaria no disponible';
        }
      })
      .catch(error => {
        console.error('Error al obtener la información de la ubicación:', error);
        document.getElementById('location').textContent = 'Error al obtener la ubicación';
      });
  })
  .catch(error => {
    console.error('Error al obtener la IP:', error);
    document.getElementById('ip').textContent = 'No se pudo obtener la IP';
  });

// Obtener información del navegador
const browserInfo = navigator.userAgentData 
  ? navigator.userAgentData.brands.map(brand => `${brand.brand} ${brand.version}`).join(', ') 
  : navigator.userAgent;
document.getElementById('browser').textContent = browserInfo || 'Desconocido';

// Obtener información del sistema operativo
const osInfo = navigator.platform || 'Desconocido';
document.getElementById('os').textContent = osInfo;

// Obtener la resolución de pantalla
const screenResolution = `${window.screen.width}x${window.screen.height}`;
document.getElementById('resolution').textContent = screenResolution;

// Obtener el idioma del navegador
const browserLanguage = navigator.language || 'Desconocido';
document.getElementById('language').textContent = browserLanguage;

// Detectar el tipo de dispositivo
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const deviceType = isMobile ? 'Móvil' : 'Escritorio';
document.getElementById('device').textContent = deviceType;

// Obtener información de la conexión a Internet
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if (connection) {
  const connectionType = connection.effectiveType || 'Desconocido';
  document.getElementById('connection').textContent = connectionType;
} else {
  document.getElementById('connection').textContent = 'Desconocido';
}

// Obtener información de la batería
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
    const batteryLevel = Math.round(battery.level * 100);
    document.getElementById('battery').textContent = `${batteryLevel}%`;
  }).catch(error => {
    console.error('Error al obtener la información de la batería:', error);
    document.getElementById('battery').textContent = 'Desconocido';
  });
} else {
  document.getElementById('battery').textContent = 'Desconocido';
}

// Obtener información de la GPU
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
if (gl) {
  const rendererInfo = gl.getParameter(gl.RENDERER);
  document.getElementById('gpu').textContent = rendererInfo || 'Desconocido';
} else {
  document.getElementById('gpu').textContent = 'Desconocido';
}

// Obtener información de la CPU
const hardwareConcurrency = navigator.hardwareConcurrency || 'Desconocido';
document.getElementById('cpu').textContent = hardwareConcurrency;
