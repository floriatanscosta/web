# Arquitetura e estrutura

Como as Ferramentas em [floriatan.com.br/web](https://floriatan.com.br/web/) são construídas: tecnologias, base visual compartilhada com o site principal e organização dos arquivos. Visão geral do projeto no [README](../README.md).

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

Assim, qualquer ajuste visual feito no site principal vale também aqui. O que é próprio do `/web/` fica em dois arquivos deste repositório:

| Arquivo | Carregado em | Conteúdo |
|---|---|---|
| **`css/base.css`** | todas as páginas | variáveis `--web-*` (cores de erro, aviso, foco e código, com versão para o modo escuro), subtítulo do cabeçalho, cartões da lista de ferramentas, listas de texto, avisos de rodapé |
| **`css/tools.css`** | só nas ferramentas (depois de `base.css`) | layout formulário + pré-visualização, campos e mensagens, avisos, uma seção por ferramenta, folhas de impressão (PDF) e responsividade |

Cada arquivo abre com um sumário numerado das seções. `css/style.css` ficou só como compatibilidade (importa os dois) para o `design-meta.html` do site principal; não acrescente regras nele.

```text
floriatan.com.br/                    floriatan.com.br/web/  (este repositório)
├── css/global.css, css/main.css ◀── todas as páginas HTML ──▶ web/css/base.css (+ web/css/tools.css nas ferramentas)
├── js/theme-init.js, js/app.js  ◀──        │
└── assets/…                     ◀──        └──▶ web/components/<ferramenta>/app.js
```

> Como esses arquivos vêm de `floriatan.com.br`, abrir os HTML direto do computador (duplo clique) mostra a página sem estilo. Para testar localmente, sirva o site principal na raiz e este repositório em `/web/`.

Cada ferramenta tem a página `.html` na raiz e uma pasta `components/<ferramenta>/` com `app.js`, `cover.png`, `README.md` e `assets/` (ver "Padrão de cada ferramenta").

## Estrutura do repositório

Só a raiz, `components/` e `css/` são publicados. Pastas que começam com `_` ficam
fora do site (o Jekyll as ignora e elas também estão em `exclude` no `_config.yml`).

```text
web/
├── _arquivo/                    # NÃO publicado: cópias antigas sem uso (assets/, js/, robots.txt)
├── _dev/                        # NÃO publicado: desenvolvimento de novas ferramentas
│   ├── _modelo/                 # index.html, app.js e assets/ de partida (copie para começar)
│   └── README.md                # como criar, testar localmente e publicar
├── components/                  # uma pasta por ferramenta publicada
│   ├── assinatura/              # Gerador de assinatura de e-mail
│   │   ├── assets/              # logos e ícones usados nas assinaturas (URL absoluta: não mover)
│   │   ├── app.js
│   │   ├── cover.png            # capa do cartão e og:image
│   │   └── README.md            # descrição, verificações e histórico de versões
│   ├── custom-plate/            # Custom Plate Design XML (Tecan)
│   │   ├── assets/slide.svg     # desenho da lâmina da pré-visualização
│   │   ├── app.js
│   │   ├── cover.png
│   │   └── README.md
│   ├── fluidodinamica/          # Calculadora de fluidodinâmica ICP-MS (em teste)
│   │   ├── assets/              # vazia por enquanto
│   │   ├── app.js
│   │   └── README.md
│   ├── gerador/                 # LEGADO: imagens das assinaturas geradas até a versão 2.0.1 (não mover)
│   └── style.css                # LEGADO: só para o design-meta.html do site principal
├── css/
│   ├── base.css                 # estilos-base do /web (todas as páginas)
│   ├── tools.css                # estilos das ferramentas (uma seção por ferramenta)
│   └── style.css                # LEGADO: importa os dois, só para o design-meta.html do site principal
├── 404.html                     # páginas publicadas (endereços /web/<nome>, sem .html)
├── assinatura.html
├── aviso.html
├── custom-plate.html
├── fluidodinamica.html
├── index.html
├── sobre.html
├── test-gota.html               # redireciona o endereço antigo para /web/fluidodinamica
├── docs/                        # documentação técnica (não publicada)
├── .editorconfig                # padrão de formatação (UTF-8, LF, 2 espaços)
├── .gitignore
├── _config.yml                  # configuração do Jekyll / GitHub Pages
├── CHANGELOG.md
├── LICENSE
└── README.md
```

### Padrão de cada ferramenta

| O quê | Onde |
|---|---|
| Página | `<ferramenta>.html` na raiz (endereço `/web/<ferramenta>`) |
| Lógica | `components/<ferramenta>/app.js` |
| Capa (940 × 470 px) | `components/<ferramenta>/cover.png` |
| Descrição | `components/<ferramenta>/README.md` (não publicada) |
| Imagens e outros arquivos | `components/<ferramenta>/assets/` |
| Estilos | seção própria em `css/tools.css` (o que vale para todas as páginas vai em `css/base.css`) |

O nome da pasta em `components/` é o mesmo do endereço da página.

### O que não pode mudar de lugar

Alguns caminhos são usados fora deste repositório e por isso ficam onde estão:

- `components/assinatura/assets/*.png` e `components/gerador/*.png`: carregados com URL absoluta pelos e-mails já enviados (pelo GitHub e, nas assinaturas mais antigas, pelo domínio);
- `components/<ferramenta>/cover.png`: imagens de compartilhamento (`og:image`);
- `components/style.css`, `css/style.css` e `components/custom-plate/assets/slide.svg`: usados pelo `design-meta.html` do site principal.
