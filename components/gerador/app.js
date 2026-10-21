/* Gerador de assinatura de e-mail (/web/assinatura)
   Monta a assinatura em HTML com estilos inline (compatível com clientes de e-mail)
   e a copia como texto formatado para colar no Gmail, Outlook, Thunderbird etc.
   © 2026 Floriatan Santos Costa. Todos os direitos reservados. Ver LICENSE. */
(function () {
  'use strict';

  // As imagens da assinatura precisam de URL absoluta para aparecer nos e-mails enviados.
  // Vêm direto do GitHub (raw.githubusercontent.com), que não depende do domínio do site.
  // Não renomeie nem mova os arquivos de components/gerador/ e mantenha o repositório público.
  var IMG_URL = 'https://raw.githubusercontent.com/floriatanscosta/web/main/components/gerador/';
  var LOGOS = ['logo-1.png', 'logo-2.png', 'logo-3.png', 'logo-4.png'];

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

  /* ---------- verificação dos links ---------- */
  // Cada função devolve { url: link normalizado } ou { erro: mensagem }. Campo vazio: { url: '' }.

  // Completa o protocolo e interpreta o endereço; null se não for um link http/https
  function lerURL(texto, protocolo) {
    var u = /^https?:\/\//i.test(texto) ? texto : protocolo + texto.replace(/^\/+/, '');
    try {
      var parsed = new URL(u);
      return (parsed.protocol === 'http:' || parsed.protocol === 'https:') ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  // Site: link http/https com domínio de verdade (ex.: exemplo.com.br)
  function verificarSite(texto) {
    if (!texto) return { url: '' };
    if (/\s/.test(texto)) return { erro: 'O link não pode ter espaços.' };
    // Outro protocolo (mailto:, javascript:, ftp: …); "site.com:8080" não conta
    if (/^[a-z][a-z0-9+.-]*:(?!\d)/i.test(texto) && !/^https?:\/\//i.test(texto)) {
      return { erro: 'Use um link que comece com https:// ou http://.' };
    }
    var u = lerURL(texto, 'https://');
    if (!u) return { erro: 'Isto não é um link válido. Exemplo: https://www.exemplo.com.br' };
    // Usuário/senha no link disfarçam o destino real (ex.: https://banco.com@outro.site)
    if (u.username || u.password) return { erro: 'O link não pode conter usuário ou senha (@).' };
    var partes = u.hostname.split('.');
    var tld = partes[partes.length - 1];
    var rotulosOk = partes.every(function (r) { return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(r); });
    if (partes.length < 2 || !rotulosOk || !/^(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/.test(tld)) {
      return { erro: 'O endereço precisa de um domínio válido. Exemplo: https://www.exemplo.com.br' };
    }
    return { url: u.href };
  }

  // Lattes: http://lattes.cnpq.br/ + 16 dígitos (ou só os 16 dígitos), ou o link
  // do buscatextual com o identificador K (ex.: visualizacv.do?id=K1234567A8)
  function verificarLattes(texto) {
    if (!texto) return { url: '' };
    var padrao = 'Use o formato http://lattes.cnpq.br/0000000000000000.';
    var id = texto.replace(/\s+/g, '');
    if (/^\d{16}$/.test(id)) return { url: 'http://lattes.cnpq.br/' + id };
    var u = lerURL(id, 'http://');
    if (!u) return { erro: padrao };
    var host = u.hostname.replace(/^www\./, '');
    if (host === 'lattes.cnpq.br') {
      var m = u.pathname.match(/^\/(\d{16})\/?$/);
      if (!m) return { erro: 'O identificador Lattes tem 16 dígitos. ' + padrao };
      return { url: 'http://lattes.cnpq.br/' + m[1] };
    }
    if (host === 'buscatextual.cnpq.br' && /^\/buscatextual\/visualizacv\.do$/i.test(u.pathname)) {
      var k = (u.searchParams.get('id') || '').toUpperCase();
      if (/^K\d{7}[A-Z]\d$/.test(k)) return { url: 'http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=' + k };
      return { erro: 'Identificador K inválido no link do buscatextual. ' + padrao };
    }
    return { erro: 'O link não é do Lattes. ' + padrao };
  }

  // Dígito verificador do ORCID (ISO 7064 MOD 11-2), calculado sobre os 15 primeiros dígitos
  function digitoOrcid(digitos) {
    var total = 0;
    for (var i = 0; i < digitos.length; i++) total = (total + Number(digitos[i])) * 2;
    var resultado = (12 - (total % 11)) % 11;
    return resultado === 10 ? 'X' : String(resultado);
  }

  // ORCID: https://orcid.org/0000-0000-0000-0000 (ou só o identificador), com dígito verificador
  function verificarOrcid(texto) {
    if (!texto) return { url: '' };
    var padrao = 'Use o formato https://orcid.org/0000-0000-0000-0000.';
    var id = texto.replace(/\s+/g, '');
    if (!/^\d{4}-?\d{4}-?\d{4}-?\d{3}[\dXx]$/.test(id)) {
      var u = lerURL(id, 'https://');
      if (!u) return { erro: padrao };
      if (u.hostname.replace(/^www\./, '') !== 'orcid.org') return { erro: 'O link não é do ORCID. ' + padrao };
      id = u.pathname.replace(/^\/+|\/+$/g, '');
      if (!/^\d{4}-?\d{4}-?\d{4}-?\d{3}[\dXx]$/.test(id)) return { erro: 'O identificador ORCID tem 16 caracteres. ' + padrao };
    }
    var limpo = id.replace(/-/g, '').toUpperCase();
    if (digitoOrcid(limpo.slice(0, 15)) !== limpo[15]) {
      return { erro: 'Identificador ORCID inválido: o dígito verificador não confere. Confira o número no seu perfil.' };
    }
    return { url: 'https://orcid.org/' + limpo.replace(/(.{4})(?!$)/g, '$1-') };
  }

  var VERIFICADORES = {
    'input-url-web': verificarSite,
    'input-url-lattes': verificarLattes,
    'input-url-orcid': verificarOrcid
  };
  // Campos que o usuário já deixou (o erro só aparece depois disso, para não incomodar durante a digitação)
  var tocados = {};

  // Verifica os três links e mostra (ou esconde) a mensagem de erro de cada campo
  function verificarLinks() {
    var resultado = { erros: 0 };
    Object.keys(VERIFICADORES).forEach(function (id) {
      var campo = $(id);
      var r = VERIFICADORES[id](valor(id));
      var msg = $('erro-' + id.replace('input-', ''));
      var mostrar = Boolean(r.erro) && tocados[id];
      if (r.erro) resultado.erros++;
      campo.setAttribute('aria-invalid', mostrar ? 'true' : 'false');
      if (msg) {
        msg.textContent = mostrar ? r.erro : '';
        msg.hidden = !mostrar;
      }
      resultado[id] = r.url ? escaparHTML(r.url) : '';
    });
    return resultado;
  }

  function valor(id) { var el = $(id); return el ? el.value.trim() : ''; }

  /* ---------- montagem da assinatura ---------- */

  function atualizarAssinatura() {
    // Só aceita os logos conhecidos (o valor do <select> pode ser alterado no navegador)
    var logo = valor('select-logo');
    if (LOGOS.indexOf(logo) === -1) logo = LOGOS[0];
    var nome = escaparHTML(valor('input-nome'));
    var cargo = escaparHTML(valor('input-cargo'));
    var lab1 = escaparHTML(valor('input-lab1'));
    var inst1 = escaparHTML(valor('input-inst1'));
    var lab2 = escaparHTML(valor('input-lab2'));
    var inst2 = escaparHTML(valor('input-inst2'));
    // Links inválidos ficam fora da assinatura
    var links = verificarLinks();
    var urlWeb = links['input-url-web'];
    var urlLattes = links['input-url-lattes'];
    var urlOrcid = links['input-url-orcid'];

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
        '\n        <a href="' + url + '" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block;">' +
        '\n          <img src="' + IMG_URL + img + '" alt="' + alt + '" style="height: 20px; width: 20px; display: block;" width="20" height="20" title="' + title + '">' +
        '\n        </a>\n      </td>';
    }

    var blocoSocial = temLinks ?
      '\n      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">\n        <tr>' +
      celula(urlWeb, 'link.png', 'CV', 'Curriculum Vitae', false) +
      celula(urlLattes, 'lattes.png', 'Lattes', 'Currículo Lattes', false) +
      celula(urlOrcid, 'orcid.png', 'ORCID', 'ORCID iD', true) +
      '\n        </tr>\n      </table>' : '';

    preview.innerHTML =
      '\n<table cellpadding="0" cellspacing="0" style="font-family: \'Roboto\', Helvetica, Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.2; max-width: 650px; text-align: left;">' +
      '\n  <tr>' +
      '\n    <td style="vertical-align: middle; padding-right: 20px; width: 110px;">' +
      '\n      <img src="' + IMG_URL + logo + '" alt="Logo institucional" style="width: 110px; height: auto; display: block;" width="110">' +
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
    // Mostra todos os erros antes de copiar; com link inválido, não copia
    Object.keys(VERIFICADORES).forEach(function (id) { tocados[id] = true; });
    atualizarAssinatura();
    if (verificarLinks().erros) {
      showModal('Confira os links', 'Há links inválidos, destacados no formulário. Corrija ou apague esses campos antes de copiar a assinatura.');
      return;
    }
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

  // "input" também dispara em <select>; "change" redesenharia duas vezes
  form.addEventListener('input', atualizarAssinatura);
  // Ao sair de um campo de link, passa a mostrar o erro dele
  form.addEventListener('focusout', function (e) {
    if (VERIFICADORES[e.target.id]) {
      tocados[e.target.id] = true;
      verificarLinks();
    }
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  if (copyBtn) copyBtn.addEventListener('click', copiarAssinatura);

  // Compatibilidade com chamadas antigas (ex.: onclick="copiarAssinatura()")
  window.copiarAssinatura = copiarAssinatura;
  window.closeModal = closeModal;

  atualizarAssinatura();
})();
