function atualizarAssinatura() {
    const logoUrl = document.getElementById('select-logo').value;
    const nome = document.getElementById('input-nome').value.trim();
    const cargo = document.getElementById('input-cargo').value.trim();
    const lab1 = document.getElementById('input-lab1').value.trim();
    const inst1 = document.getElementById('input-inst1').value.trim();
    const lab2 = document.getElementById('input-lab2').value.trim();
    const inst2 = document.getElementById('input-inst2').value.trim();
    const urlWeb = document.getElementById('input-url-web').value.trim();
    const urlLattes = document.getElementById('input-url-lattes').value.trim();
    const urlOrcid = document.getElementById('input-url-orcid').value.trim();
    const blocoNome = nome ? `<div style="font-size: 18px; font-weight: 800; color: #223D71; margin-bottom: 2px; letter-spacing: 0.5px;">${nome}</div>` : '';
    const blocoCargo = cargo ? `<div style="font-size: 12px; font-weight: 600; color: #4b5563; margin-bottom: 12px; letter-spacing: 0.5px;">${cargo}</div>` : '';
    const blocoLab1 = lab1 ? `<div style="font-size: 12px; color: #1f2937; font-weight: 600; margin-bottom: 1px;">${lab1}</div>` : '';
    const marginInst1 = (lab2 || inst2 || urlWeb || urlLattes || urlOrcid) ? '8px' : '0px';
    const blocoInst1 = inst1 ? `<div style="font-size: 12px; color: #6b7280; font-weight: 500; margin-bottom: ${marginInst1};">${inst1}</div>` : '';
    const blocoLab2 = lab2 ? `<div style="font-size: 12px; color: #1f2937; font-weight: 600; margin-bottom: 1px;">${lab2}</div>` : '';
    const marginInst2 = (urlWeb || urlLattes || urlOrcid) ? '20px' : '0px';
    const blocoInst2 = inst2 ? `<div style="font-size: 12px; color: #6b7280; font-weight: 500; margin-bottom: ${marginInst2};">${inst2}</div>` : '';
    const celulaWeb = urlWeb ? `
      <td style="padding-right: 14px; vertical-align: middle;">
        <a href="${urlWeb}" target="_blank" style="text-decoration: none; display: block;">
          <img src="/components/gerador/link.png" alt="CV" style="height: 20px; width: auto; display: block;" height="20" title="Currículum Vitae">
        </a>
      </td>` : '';

    const celulaLattes = urlLattes ? `
      <td style="padding-right: 14px; vertical-align: middle;">
        <a href="${urlLattes}" target="_blank" style="text-decoration: none; display: block;">
          <img src="/components/gerador/lattes.png" alt="Lattes" style="height: 20px; width: auto; display: block;" height="20" title="Currículo Lattes">
        </a>
      </td>` : '';

    const celulaOrcid = urlOrcid ? `
      <td style="vertical-align: middle;">
        <a href="${urlOrcid}" target="_blank" style="text-decoration: none; display: block;">
          <img src="/components/gerador/orcid.png" alt="ORCID" style="height: 20px; width: auto; display: block;" height="20" title="ORCID iD">
        </a>
      </td>` : '';

    const blocoSocial = (urlWeb || urlLattes || urlOrcid) ? `
      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          ${celulaWeb}
          ${celulaLattes}
          ${celulaOrcid}
        </tr>
      </table>` : '';

    const assinaturaHTML = `
<table cellpadding="0" cellspacing="0" style="font-family: 'Roboto', Helvetica, Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.2; min-width: 480px; max-width: 650px; text-align: left;">
  <tr>
    <td style="vertical-align: middle; padding-right: 20px; width: 110px;">
      <img src="${logoUrl}" alt="Logo Institucional" style="width: 110px; height: auto; display: block;" width="110">
    </td>
    <td style="vertical-align: top; width: 2px; background-color: #dfe5f1; padding: 0;"></td>
    <td style="vertical-align: middle; padding-left: 20px;">
      ${blocoNome}
      ${blocoCargo}
      ${blocoLab1}
      ${blocoInst1}
      ${blocoLab2}
      ${blocoInst2}
      ${blocoSocial}
    </td>
  </tr>
</table>`;

    document.getElementById('preview-container').innerHTML = assinaturaHTML;
}

async function copiarAssinatura() {
    const previewBox = document.getElementById('preview-container');
    const alertBox = document.getElementById('success-alert');

    try {
        const blob = new Blob([previewBox.innerHTML], { type: 'text/html' });
        const data = [new ClipboardItem({ 'text/html': blob })];

        await navigator.clipboard.write(data);

        alertBox.style.display = 'block';
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 5000);
    } catch (err) {
        alert('Falha ao copiar automaticamente. Por favor, selecione a assinatura visualmente com o mouse, use Ctrl+C e depois Ctrl+V no seu e-mail.');
    }
}

document.getElementById('select-logo').addEventListener('change', atualizarAssinatura);

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', atualizarAssinatura);
});

atualizarAssinatura();