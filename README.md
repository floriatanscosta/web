# Ferramentas — floriatan.com.br/web

Ferramentas e aplicações web simples, publicadas em **https://floriatan.com.br/web/** (GitHub Pages do repositório `floriatanscosta/web`).

| Página | Endereço | Script |
|---|---|---|
| Lista de ferramentas | `/web/` | — |
| Gerador de assinatura de e-mail | `/web/assinatura` | `components/gerador/app.js` |
| Custom Plate Design XML (Tecan) | `/web/custom-plate` | `components/custom-plate/app.js` |
| Calculadora de fluidodinâmica ICP-MS (em teste, fora da lista) | `/web/test-gota` | `components/gota/app.js` |
| Sobre as Ferramentas | `/web/sobre` | — |
| Aviso de uso (disclaimer) | `/web/aviso` | — |
| Página de erro | `/web/404` | — |

## Como o visual funciona

As páginas usam a **mesma base do site principal**, carregada do próprio domínio:

- `/css/global.css` e `/css/main.css` — cores, fontes, cabeçalho, rodapé, botões, cartões, formulários, modal;
- `/js/theme-init.js` e `/js/app.js` — tema (claro, escuro ou seguir o sistema), menu do celular e ano do rodapé;
- `/assets/…` — logotipo, favicon, ícones e fontes.

Assim, qualquer ajuste visual feito no site principal vale também aqui. O que é exclusivo das ferramentas fica em **`css/style.css`** (este repositório).

> Como esses arquivos vêm de `floriatan.com.br`, abrir os HTML direto do computador (duplo clique) mostra a página sem estilo. Para testar localmente, sirva o site principal na raiz e este repositório em `/web/`.

## Editar

O site é **estático**: não há script de geração. Cabeçalho e rodapé estão escritos em cada página HTML; ao incluir uma ferramenta nova, copie uma página existente, troque o conteúdo de `<main>` e adicione o link no menu (`<nav>`) de todas as páginas, um cartão em `index.html` e uma descrição em `sobre.html`. Marque o item da página atual no menu com `aria-current="page"`.

O seletor de tema do cabeçalho (`<details class="lang-menu theme-menu">`) é o mesmo do site principal; o comportamento vem de `/js/app.js`.

## Observações

- As imagens da assinatura de e-mail (`components/gerador/*.png`) são usadas com URL absoluta (`https://floriatan.com.br/web/…`) nos e-mails enviados — não renomeie nem mova esses arquivos.
- Nenhuma ferramenta envia dados a servidores; tudo roda no navegador.

O histórico de alterações está em [`CHANGELOG.md`](CHANGELOG.md).

## Licença

O **código** das ferramentas (HTML, CSS e JavaScript deste repositório) está sob a [licença MIT](LICENSE).

Ficam **fora** da licença MIT, com todos os direitos reservados: os textos das páginas, as imagens de capa e
o logotipo Fc. As imagens usadas pelo gerador de assinatura (`components/gerador/*.png`) e os nomes de
produtos e instituições citados (como Tecan) pertencem aos respectivos titulares.

A base visual compartilhada (`/css`, `/js`, fontes e ícones) vem do repositório do site principal
(`floriatanscosta.github.io`), que tem as próprias informações de licença.

