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

const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('plateForm');
    if (!form) return; 

    const inputs = form.querySelectorAll('input, select');
    const xmlOutput = document.getElementById('xmlOutput');
    const dropletGrid = document.getElementById('dropletGrid');
    const glassSlide = document.getElementById('glassSlide');
    const gridWarning = document.getElementById('gridWarning');
    const displayPlateId = document.getElementById('displayPlateId');
    
    // Mitigação contra injeção de dados (XSS)
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

        // Rate Limiting Visual / Prevenção de travamento no DOM (Max 1536)
        if (totalDroplets > 1536) {
             gridWarning.style.display = 'block';
             dropletGrid.innerHTML = ''; 
             return;
        } else {
             gridWarning.style.display = 'none';
        }
        
        // ==========================================
        // LÓGICA MATEMÁTICA DE ESCALA E POSICIONAMENTO
        // ==========================================
        const SCALE = 6; // Fator de escala: 1 mm = 6 px
        
        // Dimensões físicas da lâmina
        const slideWidthMm = 30;
        const slideHeightMm = 80;
        
        // Ponto central da primeira gota (A1)
        const offsetLeftMm = 4;
        const offsetTopMm = 15;

        // Redimensiona o container da lâmina (SVG)
        glassSlide.style.width = `${slideWidthMm * SCALE}px`;
        glassSlide.style.height = `${slideHeightMm * SCALE}px`;

        const rowPitchPx = rowPitch * SCALE;
        const colPitchPx = colPitch * SCALE;

        // Posiciona a grade inteira subtraindo metade da célula para que o *centro* da primeira célula caia exato no offset
        dropletGrid.style.left = `${(offsetLeftMm * SCALE) - (colPitchPx / 2)}px`;
        dropletGrid.style.top = `${(offsetTopMm * SCALE) - (rowPitchPx / 2)}px`;
        
        // Estrutura a grade baseada no pitch exato
        dropletGrid.style.gridTemplateRows = `repeat(${rows}, ${rowPitchPx}px)`;
        dropletGrid.style.gridTemplateColumns = `repeat(${cols}, ${colPitchPx}px)`;

        // Configuração visual das gotas (não altera as distâncias centro a centro)
        let dropSizePx = 6; 
        if (dropletSizeSelection === 'small') dropSizePx = 3;   
        if (dropletSizeSelection === 'large') dropSizePx = 10;  

        dropletGrid.innerHTML = ''; 
        
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < totalDroplets; i++) {
            // A célula garante o espaçamento geométrico perfeito da matriz
            const cell = document.createElement('div');
            cell.className = 'droplet-cell';
            cell.style.width = `${colPitchPx}px`;
            cell.style.height = `${rowPitchPx}px`;

            const drop = document.createElement('div');
            drop.className = 'droplet';
            drop.style.width = `${dropSizePx}px`;
            drop.style.height = `${dropSizePx}px`;

            cell.appendChild(drop);
            fragment.appendChild(cell);
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

    updateApp();
});