
// Controle Global do Modal
const modalOverlay = document.getElementById('customModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');

function showModal(title, message) {
  if (modalTitle && modalMessage && modalOverlay) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalOverlay.classList.add('active');
  }
}

function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

// Configuração do Footer (Ano Dinâmico)
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Lógica Principal da Aplicação
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('plateForm');
  if (!form) return; // Aborta se não estiver na página do gerador

  const inputs = form.querySelectorAll('input, select');
  const xmlOutput = document.getElementById('xmlOutput');
  const dropletGrid = document.getElementById('dropletGrid');
  const gridWarning = document.getElementById('gridWarning');
  const displayPlateId = document.getElementById('displayPlateId');

  // Mitigação de Injeção de Código (XSS)
  const escapeXml = (unsafe) => {
    return String(unsafe).replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  };

  const updateApp = () => {
    if (!form.checkValidity()) return;

    const data = {};
    inputs.forEach(input => {
      data[input.id] = escapeXml(input.value);
    });

    const xmlString = `<?xml version="1.0" encoding="utf-8"?>
<HPDDPlate>
    <id>${data.plateId}</id>
    <name>${data.plateId}</name>
    <rows>${data.rows}</rows>
    <cols>${data.cols}</cols>
    <rowpitch>${data.rowpitch}</rowpitch>
    <colpitch>${data.colpitch}</colpitch>
    <a1offsetx>${data.a1offsetx}</a1offsetx>
    <a1offsety>${data.a1offsety}</a1offsety>
    <defaultassayvolume>${data.defaultassayvolume}</defaultassayvolume>
    <shaketype>${data.shaketype}</shaketype>
    <shakedefault>${data.shakedefault}</shakedefault>
    <moveaccel>${data.moveaccel}</moveaccel>
    <customa1>${data.customa1}</customa1>
    <nozzlemask>${data.nozzlemask}</nozzlemask>
    <horizontaloffset>${data.horizontaloffset}</horizontaloffset>
</HPDDPlate>`;

    xmlOutput.value = xmlString;
    displayPlateId.textContent = `Plate ID: ${data.plateId}`;

    const rows = parseInt(data.rows, 10);
    const cols = parseInt(data.cols, 10);
    const totalDroplets = rows * cols;
    const rowPitch = parseFloat(data.rowpitch);
    const colPitch = parseFloat(data.colpitch);
    const dropletSizeSelection = document.getElementById('dropletsize').value;

    // Limite de segurança de interface para evitar sobrecarga de memória (DoS prevention)
    if (totalDroplets > 1536) {
      gridWarning.style.display = 'block';
      dropletGrid.innerHTML = '';
      return;
    } else {
      gridWarning.style.display = 'none';
    }

    let dropSizePx = 8;
    if (dropletSizeSelection === 'small') dropSizePx = 4;
    if (dropletSizeSelection === 'large') dropSizePx = 16;

    dropletGrid.style.gridTemplateRows = `repeat(${rows}, ${dropSizePx}px)`;
    dropletGrid.style.gridTemplateColumns = `repeat(${cols}, ${dropSizePx}px)`;
    dropletGrid.style.rowGap = `${Math.max(rowPitch * 3, 2)}px`;
    dropletGrid.style.columnGap = `${Math.max(colPitch * 3, 2)}px`;

    dropletGrid.innerHTML = '';

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < totalDroplets; i++) {
      const drop = document.createElement('div');
      drop.className = 'droplet';
      drop.style.width = `${dropSizePx}px`;
      drop.style.height = `${dropSizePx}px`;
      fragment.appendChild(drop);
    }
    dropletGrid.appendChild(fragment);
  };

  inputs.forEach(input => input.addEventListener('input', updateApp));

  document.getElementById('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(xmlOutput.value).then(() => {
      showModal('Success', 'XML configuration code has been copied to your clipboard!');
    }).catch(err => {
      showModal('Error', 'Failed to copy text. Check your browser permissions.');
      console.error(err);
    });
  });

  document.getElementById('downloadBtn').addEventListener('click', () => {
    const blob = new Blob([xmlOutput.value], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const filename = escapeXml(document.getElementById('plateId').value) || 'HPDDPlate';

    a.href = url;
    a.download = `${filename}.xml`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Inicia a aplicação populando a grid baseada nos valores iniciais
  updateApp();
});