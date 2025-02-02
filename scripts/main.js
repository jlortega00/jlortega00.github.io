// Obtener la dirección IP y la ubicación usando ipapi.co
fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(data => {
    document.getElementById('ip').textContent = data.ip || 'No disponible';
    document.getElementById('location').textContent = `${data.city}, ${data.region}, ${data.country_name}` || 'No disponible';
    document.getElementById('isp').textContent = data.org || 'No disponible';
    document.getElementById('timezone').textContent = data.timezone || 'No disponible';
  })
  .catch(() => {
    document.getElementById('ip').textContent = 'No se pudo obtener la IP';
  });

// Obtener la IP local con WebRTC
function getLocalIP() {
  const pc = new RTCPeerConnection({ iceServers: [] });
  pc.createDataChannel("");
  pc.createOffer().then(o => pc.setLocalDescription(o));

  pc.onicecandidate = event => {
    if (event && event.candidate) {
      const ip = event.candidate.candidate.split(" ")[4];
      document.getElementById("local-ip").textContent = ip;
      pc.close();
    }
  };
}
getLocalIP();

// Fingerprinting del navegador
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
document.getElementById('language').textContent = navigator.language || 'No disponible';
document.getElementById('device').textContent = /Mobi|Android/i.test(navigator.userAgent) ? 'Móvil' : 'Escritorio';

// Detección de conexión a Internet
if (navigator.connection) {
  document.getElementById('connection').textContent = navigator.connection.effectiveType || 'No disponible';
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
}

// Fingerprint de la GPU
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
document.getElementById('gpu').textContent = gl ? gl.getParameter(gl.RENDERER) : 'No disponible';

// Detectar núcleos de CPU
document.getElementById('cpu').textContent = navigator.hardwareConcurrency || 'No disponible';

// Detectar AdBlock
function detectAdBlock() {
  const ad = document.createElement("div");
  ad.className = "adsbox";
  document.body.appendChild(ad);

  setTimeout(() => {
    if (ad.offsetHeight === 0) {
      document.getElementById("adblock").textContent = "Activado";
    } else {
      document.getElementById("adblock").textContent = "No detectado";
    }
    ad.remove();
  }, 100);
}
detectAdBlock();

// Historial de navegación usando CSS (solo en navegadores antiguos)
function detectGoogleHistory() {
  const testLink = document.createElement("a");
  testLink.href = "https://www.google.com/";
  testLink.style.display = "none";
  document.body.appendChild(testLink);

  setTimeout(() => {
    const color = window.getComputedStyle(testLink).color;
    if (color === "rgb(255, 0, 0)") {
      document.getElementById("history").textContent = "Visitó Google";
    } else {
      document.getElementById("history").textContent = "No detectado";
    }
    testLink.remove();
  }, 100);
}
detectGoogleHistory();

// Acceso a cámara
navigator.mediaDevices.getUserMedia({ video: true })
  .then(() => {
    document.getElementById("camera").textContent = "Acceso concedido";
  })
  .catch(() => {
    document.getElementById("camera").textContent = "Acceso denegado";
  });
