/* Gerador de assinatura de e-mail (/web/assinatura)
   Monta a assinatura em HTML com estilos inline (compatível com clientes de e-mail)
   e a copia como texto formatado para colar no Gmail, Outlook, Thunderbird etc.
   © 2026 Floriatan Santos Costa. Todos os direitos reservados. Ver LICENSE. */
(function () {
  'use strict';

  // As imagens da assinatura precisam de URL absoluta para aparecer nos e-mails enviados
  var BASE_URL = 'https://floriatan.com.br/web';
  var SITE_URL = 'https://floriatan.com.br';

  var $ = function (id) { return document.getElementById(id); };
  var form = $('assinaturaForm');
  var preview = $('preview-container');
  var copyBtn = $('copyBtn');
  var modal = $('customModal');
  if (!form || !preview) return;

  /* ---------- utilitários ---------- */

  // Escapa texto digitado pelo usuário antes de inseri-lo no HTML (evita injeção de código)
  function escaparHTML(texto) {
    return String(texto)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Completa o protocolo (ex.: "lattes.cnpq.br/123" → "https://lattes.cnpq.br/123")
  // e aceita apenas links http/https
  function formatarURL(url) {
    if (!url) return '';
    var u = /^https?:\/\//i.test(url) ? url : 'https://' + url.replace(/^\/+/, '');
    try {
      var parsed = new URL(u);
      return (parsed.protocol === 'http:' || parsed.protocol === 'https:') ? escaparHTML(u) : '';
    } catch (e) {
      return '';
    }
  }

  function valor(id) { var el = $(id); return el ? el.value.trim() : ''; }

  /* ---------- montagem da assinatura ---------- */

  function atualizarAssinatura() {
    var logoUrl = valor('select-logo');
    var nome = escaparHTML(valor('input-nome'));
    var cargo = escaparHTML(valor('input-cargo'));
    var lab1 = escaparHTML(valor('input-lab1'));
    var inst1 = escaparHTML(valor('input-inst1'));
    var lab2 = escaparHTML(valor('input-lab2'));
    var inst2 = escaparHTML(valor('input-inst2'));
    var urlWeb = formatarURL(valor('input-url-web'));
    var urlLattes = formatarURL(valor('input-url-lattes'));
    var urlOrcid = formatarURL(valor('input-url-orcid'));

    var logoAbsoluto = logoUrl;
    if (logoUrl.indexOf('./') === 0) logoAbsoluto = BASE_URL + logoUrl.substring(1);
    else if (logoUrl.indexOf('/') === 0) logoAbsoluto = SITE_URL + logoUrl;
    logoAbsoluto = escaparHTML(logoAbsoluto);

    var temLinks = urlWeb || urlLattes || urlOrcid;

    var blocoNome = nome ? '<div style="font-size: 18px; font-weight: 800; color: #3a4d74; margin-bottom: 2px; letter-spacing: 0.5px;">' + nome + '</div>' : '';
    var blocoCargo = cargo ? '<div style="font-size: 12px; font-weight: 600; color: #4b5563; margin-bottom: 12px; letter-spacing: 0.5px;">' + cargo + '</div>' : '';
    var blocoLab1 = lab1 ? '<div style="font-size: 12px; color: #1f2937; font-weight: 600; margin-bottom: 1px;">' + lab1 + '</div>' : '';
    var marginInst1 = (lab2 || inst2 || temLinks) ? '8px' : '0px';
    var blocoInst1 = inst1 ? '<div style="font-size: 12px; color: #6b7280; font-weight: 500; margin-bottom: ' + marginInst1 + ';">' + inst1 + '</div>' : '';
    var blocoLab2 = lab2 ? '<div style="font-size: 12px; color: #1f2937; font-weight: 600; margin-bottom: 1px;">' + lab2 + '</div>' : '';
    var marginInst2 = temLinks ? '20px' : '0px';
    var blocoInst2 = inst2 ? '<div style="font-size: 12px; color: #6b7280; font-weight: 500; margin-bottom: ' + marginInst2 + ';">' + inst2 + '</div>' : '';

    function celula(url, img, alt, title, ultima) {
      if (!url) return '';
      return '\n      <td style="' + (ultima ? '' : 'padding-right: 14px; ') + 'vertical-align: middle;">' +
        '\n        <a href="' + url + '" target="_blank" style="text-decoration: none; display: block;">' +
        '\n          <img src="' + BASE_URL + '/components/gerador/' + img + '" alt="' + alt + '" style="height: 20px; width: auto; display: block;" height="20" title="' + title + '">' +
        '\n        </a>\n      </td>';
    }

    var blocoSocial = temLinks ?
      '\n      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">\n        <tr>' +
      celula(urlWeb, 'link.png', 'CV', 'Currículum Vitae', false) +
      celula(urlLattes, 'lattes.png', 'Lattes', 'Currículo Lattes', false) +
      celula(urlOrcid, 'orcid.png', 'ORCID', 'ORCID iD', true) +
      '\n        </tr>\n      </table>' : '';

    preview.innerHTML =
      '\n<table cellpadding="0" cellspacing="0" style="font-family: \'Roboto\', Helvetica, Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.2; max-width: 650px; text-align: left;">' +
      '\n  <tr>' +
      '\n    <td style="vertical-align: middle; padding-right: 20px; width: 110px;">' +
      '\n      <img src="' + logoAbsoluto + '" alt="Logo Institucional" style="width: 110px; height: auto; display: block;" width="110">' +
      '\n    </td>' +
      '\n    <td style="vertical-align: top; width: 2px; background-color: #dfe5f1; padding: 0;"></td>' +
      '\n    <td style="vertical-align: middle; padding-left: 20px;">' +
      blocoNome + blocoCargo + blocoLab1 + blocoInst1 + blocoLab2 + blocoInst2 + blocoSocial +
      '\n    </td>' +
      '\n  </tr>' +
      '\n</table>';
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

  /* ---------- copiar ---------- */

  // Método antigo (seleção + execCommand): funciona em mais clientes, inclusive fora de HTTPS
  function copiarPorSelecao(node) {
    var sel = window.getSelection();
    var range = document.createRange();
    range.selectNode(node);
    sel.removeAllRanges();
    sel.addRange(range);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    sel.removeAllRanges();
    return ok;
  }

  function sucesso() {
    showModal('Sucesso!', 'A assinatura foi copiada para a área de transferência. Agora é só colar (Ctrl+V) nas configurações do seu cliente de e-mail.');
  }
  function erro(err) {
    if (err) console.error('Erro ao copiar', err);
    showModal('Erro', 'Não foi possível copiar a assinatura. Tente novamente!');
  }

  function copiarAssinatura() {
    var tabela = preview.querySelector('table');
    if (!tabela) return;
    // Preferência: API moderna, copiando como HTML (formatação) + texto simples
    if (navigator.clipboard && window.ClipboardItem && window.isSecureContext) {
      var item = new window.ClipboardItem({
        'text/html': new Blob([tabela.outerHTML], { type: 'text/html' }),
        'text/plain': new Blob([tabela.innerText], { type: 'text/plain' })
      });
      navigator.clipboard.write([item]).then(sucesso, function (err) {
        if (copiarPorSelecao(tabela)) sucesso(); else erro(err);
      });
    } else if (copiarPorSelecao(tabela)) {
      sucesso();
    } else {
      erro();
    }
  }

  /* ---------- eventos ---------- */

  form.addEventListener('input', atualizarAssinatura);
  form.addEventListener('change', atualizarAssinatura);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  if (copyBtn) copyBtn.addEventListener('click', copiarAssinatura);

  // Compatibilidade com chamadas antigas (ex.: onclick="copiarAssinatura()")
  window.copiarAssinatura = copiarAssinatura;
  window.closeModal = closeModal;

  atualizarAssinatura();
})();
