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

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('plateForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select');
    const xmlOutput = document.getElementById('xmlOutput');
    const dropletGrid = document.getElementById('dropletGrid');
    const glassSlide = document.getElementById('glassSlide');
    const gridWarning = document.getElementById('gridWarning');
    const idText = document.getElementById('idText');
    const displayTotalDroplets = document.getElementById('displayTotalDroplets');

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

        const rows = parseInt(data.rows, 10);
        const cols = parseInt(data.cols, 10);
        const totalDroplets = rows * cols;
        const rowPitch = parseFloat(data.rowpitch);
        const colPitch = parseFloat(data.colpitch);
        const dropletSizeSelection = document.getElementById('dropletsize').value;

        // Atualiza a exibição de texto
        idText.textContent = data.plateId;
        displayTotalDroplets.textContent = totalDroplets;

        // ==========================================
        // LÓGICA DE LIMITES DE SEGURANÇA E ESPAÇAMENTO
        // ==========================================
        let maxRows = Infinity;
        if (rowPitch > 3) maxRows = 13;
        else if (rowPitch > 2) maxRows = 20;
        else if (rowPitch > 1.5) maxRows = 25;
        else if (rowPitch > 1) maxRows = 36;

        let maxCols = Infinity;
        if (colPitch > 3) maxCols = 8;
        else if (colPitch > 2) maxCols = 12;
        else if (colPitch > 1.5) maxCols = 16;
        else if (colPitch > 1) maxCols = 24;

        let warningMessage = "";

        if (totalDroplets > 1536) {
            warningMessage = `Warning: Limit exceeded. Max total droplets is 1536 (Current: ${totalDroplets}).`;
        } else if (rows > maxRows) {
            warningMessage = `Warning: For a Row pitch > ${rowPitch > 3 ? 3 : rowPitch > 2 ? 2 : rowPitch > 1.5 ? 1.5 : 1} mm, maximum allowed rows is ${maxRows}.`;
        } else if (cols > maxCols) {
            warningMessage = `Warning: For a Col pitch > ${colPitch > 3 ? 3 : colPitch > 2 ? 2 : colPitch > 1.5 ? 1.5 : 1} mm, maximum allowed cols is ${maxCols}.`;
        }

        if (warningMessage !== "") {
            gridWarning.textContent = warningMessage;
            gridWarning.style.display = 'block';
            dropletGrid.innerHTML = '';
            xmlOutput.value = '<!-- Fix configuration errors to generate XML -->';
            return;
        } else {
            gridWarning.style.display = 'none';
        }

        // ==========================================
        // GERAÇÃO DO XML 
        // ==========================================
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

        // ==========================================
        // LÓGICA MATEMÁTICA DE ESCALA E POSICIONAMENTO DA MATRIZ
        // ==========================================
        const SCALE = 6; // Fator de escala: 1 mm = 6 px

        const slideWidthMm = 30;
        const slideHeightMm = 80;

        const offsetLeftMm = 4;
        const offsetTopMm = 15;

        glassSlide.style.width = `${slideWidthMm * SCALE}px`;
        glassSlide.style.height = `${slideHeightMm * SCALE}px`;

        const rowPitchPx = rowPitch * SCALE;
        const colPitchPx = colPitch * SCALE;

        dropletGrid.style.left = `${(offsetLeftMm * SCALE) - (colPitchPx / 2)}px`;
        dropletGrid.style.top = `${(offsetTopMm * SCALE) - (rowPitchPx / 2)}px`;

        dropletGrid.style.gridTemplateRows = `repeat(${rows}, ${rowPitchPx}px)`;
        dropletGrid.style.gridTemplateColumns = `repeat(${cols}, ${colPitchPx}px)`;

        let dropSizePx = 6;
        if (dropletSizeSelection === 'small') dropSizePx = 3;
        if (dropletSizeSelection === 'large') dropSizePx = 10;

        dropletGrid.innerHTML = '';

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < totalDroplets; i++) {
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
            showModal('Success', 'XML code has been copied with success!');
        }).catch(err => {
            showModal('Error', 'Failed to copy text. Check your browser permissions.');
            console.error(err);
        });
    });

    document.getElementById('downloadBtn').addEventListener('click', () => {
        // Se houver erro, impede o download de um XML quebrado
        if (gridWarning.style.display === 'block') {
            showModal('Error', 'Please resolve the matrix configuration limits before downloading.');
            return;
        }

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