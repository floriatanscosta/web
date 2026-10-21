# Histórico de alterações — Ferramentas (/web)

> **Versões das ferramentas.** A Assinatura tem versão própria (SemVer), com tag `assinatura-vX.Y.Z`
> no Git; o histórico resumido está em [`components/gerador/README.md`](components/gerador/README.md#histórico-de-versões).
> Os títulos abaixo indicam a versão quando a mudança é da Assinatura.

## 2026-10-21 — Custom Plate: exportar em PDF
- **Botão "Export PDF"**: folha A4 (em inglês, como a interface) com a lâmina em escala (A1 destacado, posição de A1, extensão da grade e aviso de grade fora do vidro), a tabela de configurações com o elemento XML de cada campo, o XML completo e a data de geração. Tudo em uma página.
- Gerado pela impressão do navegador ("Salvar como PDF"), sem biblioteca externa; nome sugerido `Custom Plate - <ID>`. Bloqueado enquanto houver erro de configuração.
- Script carregado com `?v=20261021`, para o navegador não usar a versão antiga em cache.
- `components/custom-plate/README.md`, `README.md` e "Sobre" atualizados.

## 2026-10-21 — Assinatura 2.0.1: versionamento e correção
- **Versionamento** da Assinatura: versão semântica (`MAIOR.MENOR.CORREÇÃO`), exibida no rodapé da página (com link para o histórico), no rodapé do PDF e num comentário no início do código de "Copiar HTML".
- Histórico reconstruído a partir dos commits, com tags no Git: `assinatura-v1.0.0` (27/09/2026), `v1.1.0` (18/10), `v1.2.0`, `v1.3.0`, `v2.0.0` e `v2.0.1` (21/10).
- Script carregado com `?v=2.0.1`, para o navegador não usar uma versão antiga em cache.
- Correção: o campo de telefone aparecia sem estilo (o site principal não estiliza `input[type="tel"]`); agora tem o mesmo visual dos demais campos.

## 2026-10-21 — Assinatura 2.0.0: modo escuro, contato, HTML, PDF e instruções
- **Logos com fundo branco** (`logo-N-branco.png`, cantos arredondados): continuam legíveis quando o cliente de e-mail usa fundo escuro. Os logos transparentes antigos ficam no repositório para as assinaturas já enviadas.
- **Logo 4** (UFPR e Universidad de Zaragoza) incluído na lista; texto alternativo de cada logo com o nome das instituições (aparece quando o Outlook bloqueia as imagens).
- **Texto simples com os links por extenso** ao copiar (antes saíam só nome e instituição).
- Ícone do site com rótulo "Site" (antes "CV / Curriculum Vitae"); ícones de 20 para 24 px.
- **Nome obrigatório**; nome e cargo vêm vazios, com exemplo (antes "Nome" e "Cargo ou Função" podiam ir para a assinatura).
- **Novos campos opcionais: e-mail e telefone**, verificados e com links `mailto:` e `tel:`.
- **Botão "Copiar HTML"** e **botão "Exportar PDF"** (folha A4 com a assinatura e os dados, pela impressão do navegador, sem biblioteca externa).
- **Como instalar**: passo a passo para Gmail, Outlook na web/novo Outlook, Outlook clássico, Apple Mail e Thunderbird.
- **Lembrar meus dados neste navegador** (opcional, desmarcado por padrão); textos de privacidade de "Sobre", "Aviso de uso" e README atualizados.
- Correção: as listas com marcadores do "Aviso de uso" apareciam sem marcador (a regra `ul[class]` do site principal se sobrepunha).
- Descrição da ferramenta em `components/gerador/README.md` (não publicada).

## 2026-10-21 — Assinatura 1.3.0: verificação dos links
- **Lattes**: aceita `http://lattes.cnpq.br/` + 16 dígitos (com ou sem `https`, `www` e barra final), só os 16 dígitos ou o link do buscatextual com identificador K (`visualizacv.do?id=K0000000A0`). O link é gravado na forma padrão `http://lattes.cnpq.br/0000000000000000`.
- **ORCID**: aceita `https://orcid.org/0000-0000-0000-0000` ou só o identificador (com ou sem hífens) e confere o **dígito verificador** (ISO 7064 MOD 11-2, o mesmo cálculo do ORCID). O link é gravado como `https://orcid.org/…`, com `X` maiúsculo.
- **Site pessoal**: só links `http`/`https` com domínio válido (ex.: `exemplo.com.br`); recusa espaços, outros protocolos (`mailto:`, `javascript:`), endereços sem domínio (`localhost`, IP) e links com usuário/senha (`https://banco.com@outro.site`).
- O erro aparece abaixo do campo quando você sai dele; o link inválido fica fora da pré-visualização, e a cópia só é feita depois de corrigir ou apagar o campo.
- Lattes e ORCID passam a vir vazios, com o formato como exemplo (antes vinham com `XXXX`, que não é um link válido).

## 2026-10-21 — Assinatura 1.2.0: imagens pelo GitHub, revisão e compressão
- **Imagens da assinatura** (logo e ícones) passam a vir de `raw.githubusercontent.com/floriatanscosta/web/main/components/gerador/`, que não depende do domínio. Os arquivos continuam no mesmo lugar, e as assinaturas antigas, que apontam para `floriatan.com.br/web/…`, seguem funcionando.
- **Compressão das imagens** (de 284 KB para 43 KB no total): ícones reduzidos de 200 × 200 para 60 × 60 px (são exibidos com 20 px; 3x para telas de alta densidade), logos e capas convertidos para paleta de 256 cores e otimizados com oxipng, sem diferença visível.
- **Segurança (Assinatura)**: só os logos da lista são aceitos (um valor alterado no navegador não entra na assinatura); links com `rel="noopener noreferrer"`.
- **Correções (Assinatura)**: ícones com `width` e `height` fixos (o Outlook ignora `width: auto`); "Currículum" → "Curriculum"; a pré-visualização não é mais lida inteira pelo leitor de tela a cada tecla; a assinatura não é mais montada duas vezes a cada alteração.
- Calculadora em teste: o cálculo não é mais feito duas vezes a cada alteração.

## 2026-10-21 — Licença: todos os direitos reservados
- `LICENSE`: a licença MIT foi substituída por uma licença proprietária (todos os direitos reservados, Leis nº 9.610/1998 e nº 9.609/1998). Copiar, modificar, redistribuir, republicar ou usar comercialmente depende de autorização por escrito; continuam permitidos o uso das ferramentas no site, o uso dos resultados gerados e o que os Termos de Serviço do GitHub exigem.
- Aviso de copyright no cabeçalho dos scripts (`components/*/app.js`) e das folhas de estilo.
- "Aviso de uso" ganhou a seção "Direitos autorais"; "Sobre" deixou de dizer que o código está sob a MIT.
- README: seção de licença reescrita, com a observação sobre as cópias obtidas enquanto valia a MIT.

## 2026-10-21 — Custom Plate
- **A1 Offset X e A1 Offset Y passam a mover a grade na pré-visualização** (X = 5,35 + offset; Y = 7 + offset, em mm na imagem da lâmina). A referência foi calibrada para que os valores padrão mantenham a posição anterior.
- Gota A1 destacada em laranja, com legenda; a pré-visualização mostra a posição de A1 e a extensão da grade.
- Novo aviso (não bloqueia) quando parte da grade sai do vidro da lâmina; o que passa da borda da imagem é cortado.
- Correção: o pitch só aceitava múltiplos de 0,1 mm (2,25 mm, por exemplo, era recusado); agora aceita 0,01 mm.
- Correção: um ID só com espaços gerava `<id></id>`; agora é recusado.
- Correção: os números vão para o XML na forma simples (`2.0` → `2`, `1e1` → `10`).
- "Default volume" não aceita mais valores negativos.
- A gota desenhada não fica maior que a célula quando o pitch é pequeno; a grade não é mais redesenhada duas vezes a cada alteração.
- O ID da placa aparece abaixo da pré-visualização; o botão de fechar do aviso foi traduzido para inglês ("Close"), como o resto da página.
- Descrição da ferramenta em `components/custom-plate/README.md` (não publicada).

## 2026-10-21 — Organização do repositório
- **Nova pasta `_dev/`** (não publicada) para desenvolver ferramentas novas, com um modelo em `_dev/_modelo/` (página com cabeçalho, rodapé e tema, e script de partida) e um guia em `_dev/README.md` (criar, testar localmente, publicar).
- **Limpeza (item I34 do site principal)**: `assets/`, `js/` e `robots.txt`, que nenhuma página usava, foram movidos para `_arquivo/` (não publicada). Saem do site: `/web/assets/…`, `/web/js/app.js` e `/web/robots.txt`.
- `_config.yml`: `_dev/`, `_arquivo/` e `.editorconfig` em `exclude`.
- `.editorconfig` com o padrão de formatação (UTF-8, LF, indentação de 2 espaços).
- Endereços das páginas e caminhos de `components/` mantidos (assinaturas já enviadas, imagens de compartilhamento e `design-meta.html` do site principal dependem deles).
- README: estrutura revisada, motivo da organização e seção sobre desenvolvimento.

## 2026-10-19 — Documentação
- README revisado: descrição da Calculadora de fluidodinâmica, indexação das páginas e arquivos que não são usados (`assets/`, `js/`, `components/style.css`, `robots.txt`).

## 2026-10-18 — Tema, páginas institucionais e licença
- **Tema com três opções** (claro, escuro e seguir o sistema), com o mesmo seletor do site principal; a escolha vale para o site e para as Ferramentas.
- **Menu**: item "Sobre" e marcação da página atual (`aria-current="page"`), mantendo os rótulos curtos definidos pelo autor.
- **Nova página `/web/sobre`**: o que são as ferramentas, como funcionam (tudo no navegador, sem cadastro), privacidade (sem Google Analytics nem cookies), tecnologia e código.
- **Nova página `/web/aviso` (Aviso de uso)**: funções podem ser alteradas ou ficar indisponíveis sem aviso prévio; sem garantias; conferência dos resultados antes do uso; privacidade; marcas; links externos.
- Avisos curtos com link para o Aviso de uso na lista de ferramentas, na Assinatura, no Custom Plate (em inglês) e na Calculadora em teste.
- Rodapé com links para "Sobre" e "Aviso de uso".
- **Licença MIT** para o código (`LICENSE`); textos, imagens e logotipo ficam fora da licença.
- README atualizado (páginas novas, seletor de tema, licença).

## 2026-10-18 — Novo visual (primeira versão publicada neste repositório)
- Diretório refeito com a mesma base visual do site principal (`/css/global.css`, `/css/main.css`, `/js/app.js`), sem script de geração.
- CSS exclusivo das ferramentas em `css/style.css`; rodapé apenas com os ícones do site e do Lattes.
- Gerador de assinatura (**Assinatura 1.1.0**) e Custom Plate preservados e revisados (escape contra injeção de HTML/XML, cópia com formatação, validação de limites, nome de arquivo seguro).
- Ajuste do autor: rótulos do menu encurtados ("Assinatura", "Custom Plate") e link "Site principal" retirado do menu.
