/* Custom Plate Design XML Generator (/web/custom-plate)
   Generates the HPDDPlate XML for the Tecan Uno Dispenser and draws a
   to-scale preview of the droplet grid on the glass slide. */
(function () {
  'use strict';

  /* ---------- limits and drawing constants ---------- */
  var MAX_TOTAL_DROPLETS = 1536;   // absolute limit
  var MAX_ROWS_SPAN_MM = 41;       // usable physical span (rows)
  var MAX_COLS_SPAN_MM = 24.5;     // usable physical span (cols)
  var SCALE = 6;                   // 1 mm = 6 px in the preview
  var SLIDE_WIDTH_MM = 30;         // background SVG size
  var SLIDE_HEIGHT_MM = 80;
  var OFFSET_LEFT_MM = 4;          // visual position of the first droplet
  var OFFSET_TOP_MM = 15;
  var DROP_SIZES = { small: 2, medium: 4, large: 6 };

  var $ = function (id) { return document.getElementById(id); };
  var form = $('plateForm');
  if (!form) return;

  var inputs = form.querySelectorAll('input, select');
  var xmlOutput = $('xmlOutput');
  var dropletGrid = $('dropletGrid');
  var glassSlide = $('glassSlide');
  var gridWarning = $('gridWarning');
  var idText = $('idText');
  var displayTotal = $('displayTotalDroplets');
  var modal = $('customModal');
  var hasError = false;

  /* ---------- helpers ---------- */

  // Escapes values written into the XML (prevents broken/injected markup)
  function escapeXml(unsafe) {
    return String(unsafe).replace(/[<>&'"]/g, function (c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c];
    });
  }

  // Safe file name: keeps letters, numbers, dot, dash and underscore
  function safeFileName(name) {
    var clean = String(name).trim().replace(/[^\w.\-]+/g, '_').replace(/^_+|_+$/g, '');
    return clean || 'HPDDPlate';
  }

  function showWarning(message) {
    hasError = true;
    gridWarning.textContent = message;
    gridWarning.hidden = false;
    dropletGrid.innerHTML = '';
    xmlOutput.value = '<!-- Fix configuration errors to generate XML -->';
  }

  /* ---------- modal ---------- */

  var lastFocus = null;
  function showModal(title, message) {
    if (!modal) { window.alert(title + '\n' + message); return; }
    $('modalTitle').textContent = title;
    $('modalMessage').textContent = message;
    lastFocus = document.activeElement;
    modal.hidden = false;
    modal.classList.add('active');
    var ok = modal.querySelector('.btn');
    if (ok) ok.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.hidden = true;
    if (lastFocus) lastFocus.focus();
  }
  if (modal) {
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    modal.querySelectorAll('[data-modal-close]').forEach(function (b) { b.addEventListener('click', closeModal); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  }
  window.closeModal = closeModal; // compatibility with old onclick attributes

  /* ---------- main update ---------- */

  function updateApp() {
    // Invalid or empty field: do not keep an outdated XML on screen
    if (!form.checkValidity()) {
      var bad = form.querySelector(':invalid');
      var label = bad && form.querySelector('label[for="' + bad.id + '"]');
      var name = label ? label.textContent.replace('ⓘ', '').trim() : 'a field';
      showWarning('Warning: invalid value in "' + name + '". ' + (bad && bad.validationMessage ? bad.validationMessage : ''));
      return;
    }

    var data = {};
    inputs.forEach(function (input) { data[input.id] = escapeXml(input.value.trim()); });

    var rows = parseInt(data.rows, 10);
    var cols = parseInt(data.cols, 10);
    var rowPitch = parseFloat(data.rowpitch);
    var colPitch = parseFloat(data.colpitch);
    var totalDroplets = rows * cols;

    idText.textContent = $('plateId').value;
    displayTotal.textContent = totalDroplets;

    // Safety limits: absolute droplet count first, then physical span for the chosen pitch
    var maxRowsAllowed = Math.floor(MAX_ROWS_SPAN_MM / rowPitch) + 1;
    var maxColsAllowed = Math.floor(MAX_COLS_SPAN_MM / colPitch) + 1;
    if (totalDroplets > MAX_TOTAL_DROPLETS) {
      showWarning('Warning: Absolute limit exceeded. Max total droplets is ' + MAX_TOTAL_DROPLETS + ' (Current: ' + totalDroplets + ').');
      return;
    }
    if (rows > maxRowsAllowed) {
      showWarning('Warning: Physical limit exceeded. For a Row pitch of ' + rowPitch + ' mm, maximum allowed rows is ' + maxRowsAllowed + ' (Max span: ' + MAX_ROWS_SPAN_MM + ' mm).');
      return;
    }
    if (cols > maxColsAllowed) {
      showWarning('Warning: Physical limit exceeded. For a Col pitch of ' + colPitch + ' mm, maximum allowed cols is ' + maxColsAllowed + ' (Max span: ' + MAX_COLS_SPAN_MM + ' mm).');
      return;
    }
    hasError = false;
    gridWarning.hidden = true;

    /* XML */
    xmlOutput.value =
      '<?xml version="1.0" encoding="utf-8"?>\n' +
      '<HPDDPlate>\n' +
      '  <id>' + data.plateId + '</id>\n' +
      '  <name>' + data.plateId + '</name>\n' +
      '  <rows>' + data.rows + '</rows>\n' +
      '  <cols>' + data.cols + '</cols>\n' +
      '  <rowpitch>' + data.rowpitch + '</rowpitch>\n' +
      '  <colpitch>' + data.colpitch + '</colpitch>\n' +
      '  <a1offsetx>' + data.a1offsetx + '</a1offsetx>\n' +
      '  <a1offsety>' + data.a1offsety + '</a1offsety>\n' +
      '  <defaultassayvolume>' + data.defaultassayvolume + '</defaultassayvolume>\n' +
      '  <shaketype>' + data.shaketype + '</shaketype>\n' +
      '  <shakedefault>' + data.shakedefault + '</shakedefault>\n' +
      '  <moveaccel>' + data.moveaccel + '</moveaccel>\n' +
      '  <customa1>' + data.customa1 + '</customa1>\n' +
      '  <nozzlemask>' + data.nozzlemask + '</nozzlemask>\n' +
      '  <horizontaloffset>' + data.horizontaloffset + '</horizontaloffset>\n' +
      '</HPDDPlate>';

    /* Preview (to scale) */
    var rowPitchPx = rowPitch * SCALE;
    var colPitchPx = colPitch * SCALE;
    glassSlide.style.width = (SLIDE_WIDTH_MM * SCALE) + 'px';
    glassSlide.style.height = (SLIDE_HEIGHT_MM * SCALE) + 'px';
    // Aligned by the center of the first cell
    dropletGrid.style.left = (OFFSET_LEFT_MM * SCALE - colPitchPx / 2) + 'px';
    dropletGrid.style.top = (OFFSET_TOP_MM * SCALE - rowPitchPx / 2) + 'px';
    dropletGrid.style.gridTemplateRows = 'repeat(' + rows + ', ' + rowPitchPx + 'px)';
    dropletGrid.style.gridTemplateColumns = 'repeat(' + cols + ', ' + colPitchPx + 'px)';

    var dropSizePx = DROP_SIZES[$('dropletsize').value] || DROP_SIZES.medium;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < totalDroplets; i++) {
      var cell = document.createElement('div');
      cell.className = 'droplet-cell';
      cell.style.width = colPitchPx + 'px';
      cell.style.height = rowPitchPx + 'px';
      var drop = document.createElement('div');
      drop.className = 'droplet';
      drop.style.width = dropSizePx + 'px';
      drop.style.height = dropSizePx + 'px';
      cell.appendChild(drop);
      fragment.appendChild(cell);
    }
    dropletGrid.replaceChildren(fragment);
  }

  /* ---------- copy & download ---------- */

  function copyFallback() {
    xmlOutput.focus();
    xmlOutput.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    window.getSelection().removeAllRanges();
    return ok;
  }

  $('copyBtn').addEventListener('click', function () {
    if (hasError) {
      showModal('Error', 'Please resolve the matrix configuration limits before copying.');
      return;
    }
    var done = function () { showModal('Success', 'XML code has been copied with success!'); };
    var fail = function (err) {
      if (err) console.error(err);
      showModal('Error', 'Failed to copy text. Check your browser permissions.');
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(xmlOutput.value).then(done, function (err) {
        if (copyFallback()) done(); else fail(err);
      });
    } else if (copyFallback()) {
      done();
    } else {
      fail();
    }
  });

  $('downloadBtn').addEventListener('click', function () {
    // Prevents downloading an invalid file
    if (hasError) {
      showModal('Error', 'Please resolve the matrix configuration limits before downloading.');
      return;
    }
    var blob = new Blob([xmlOutput.value], { type: 'application/xml' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = safeFileName($('plateId').value) + '.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });

  inputs.forEach(function (input) {
    input.addEventListener('input', updateApp);
    input.addEventListener('change', updateApp);
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  // Initial render with the default values
  updateApp();
})();
