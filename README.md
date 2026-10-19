# Ferramentas — floriatan.com.br/web

**Pequenas aplicações web para o laboratório e a comunicação acadêmica, que rodam inteiramente no navegador.**

Ferramentas e aplicações web simples, publicadas em **https://floriatan.com.br/web/** (GitHub Pages do repositório `floriatanscosta/web`).

---

## Sobre o projeto

Tarefas pequenas e repetidas, como montar uma assinatura de e-mail institucional ou gerar o
arquivo de configuração de uma placa para um dispensador, ganham aqui uma página própria.
Os dados digitados são processados no próprio dispositivo: nenhuma ferramenta envia
informações a servidores, e não é preciso instalar nada nem criar conta.

## Funcionalidades

| Página | Endereço | Script | O que faz |
|---|---|---|---|
| Lista de ferramentas | `/web/` | — | Cartões com as ferramentas disponíveis |
| Gerador de assinatura de e-mail | `/web/assinatura` | `components/gerador/app.js` | Monta uma assinatura padronizada (nome, cargo, vínculos, logotipo e links para site, Lattes e ORCID) pronta para colar no Gmail, Outlook, Thunderbird e outros |
| Custom Plate Design XML (Tecan) | `/web/custom-plate` | `components/custom-plate/app.js` | Define os parâmetros de uma placa personalizada, mostra a grade de gotas em escala sobre a lâmina e gera o XML para o Tecan Uno Dispenser |
| Calculadora de fluidodinâmica ICP-MS (em teste, fora da lista) | `/web/test-gota` | `components/gota/app.js` | — |
| Sobre as Ferramentas | `/web/sobre` | — | O que são, como funcionam, privacidade, tecnologia e código |
| Aviso de uso (disclaimer) | `/web/aviso` | — | Condições de uso e conferência dos resultados |
| Página de erro | `/web/404` | — | — |

Todas as páginas têm tema claro, escuro ou "seguir o sistema", layout para celular e o mesmo
cabeçalho e rodapé do site principal. As Ferramentas não usam Google Analytics nem cookies;
só a preferência de tema fica salva no navegador.

## Tecnologias

- HTML, CSS e JavaScript sem frameworks nem etapa de build.
- Hospedagem no **GitHub Pages** (Jekyll apenas copia os arquivos; `baseurl: /web` em `_config.yml`).
- Base visual compartilhada com o repositório [`floriatanscosta.github.io`](https://github.com/floriatanscosta/floriatanscosta.github.io).

## Arquitetura

### Como o visual funciona

As páginas usam a **mesma base do site principal**, carregada do próprio domínio:

- `/css/global.css` e `/css/main.css` — cores, fontes, cabeçalho, rodapé, botões, cartões, formulários, modal;
- `/js/theme-init.js` e `/js/app.js` — tema (claro, escuro ou seguir o sistema), menu do celular e ano do rodapé;
- `/assets/…` — logotipo, favicon, ícones e fontes.

Assim, qualquer ajuste visual feito no site principal vale também aqui. O que é exclusivo das ferramentas fica em **`css/style.css`** (este repositório).

```text
floriatan.com.br/                    floriatan.com.br/web/  (este repositório)
├── css/global.css, css/main.css ◀── todas as páginas HTML ──▶ web/css/style.css
├── js/theme-init.js, js/app.js  ◀──        │
└── assets/…                     ◀──        └──▶ web/components/<ferramenta>/app.js
```

> Como esses arquivos vêm de `floriatan.com.br`, abrir os HTML direto do computador (duplo clique) mostra a página sem estilo. Para testar localmente, sirva o site principal na raiz e este repositório em `/web/`.

Cada ferramenta tem a página `.html` na raiz e a lógica em `components/<ferramenta>/app.js`.

## Estrutura do repositório

```text
web/
├── assets/
│   ├── icons/                   # ícones SVG (tema, Lattes, ORCID, DOI, PDF…)
│   ├── img/cover.png            # imagem de compartilhamento
│   ├── favicon.svg
│   └── logo.svg
├── components/
│   ├── custom-plate/            # app.js, cover.png, slide.svg
│   ├── gerador/                 # app.js, cover.png e imagens da assinatura (*.png)
│   ├── gota/                    # app.js (calculadora em teste)
│   └── style.css                # não referenciado pelas páginas atuais
├── css/
│   └── style.css                # estilos exclusivos das ferramentas
├── js/
│   └── app.js                   # não referenciado (as páginas usam /js/app.js do site principal)
├── .gitignore
├── 404.html
├── _config.yml                  # configuração do Jekyll / GitHub Pages
├── assinatura.html
├── aviso.html
├── CHANGELOG.md
├── custom-plate.html
├── index.html
├── LICENSE
├── README.md
├── robots.txt                   # bloqueia a indexação (Disallow: /)
├── sobre.html
└── test-gota.html
```

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
