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
| Gerador de assinatura de e-mail | `/web/assinatura` | `components/assinatura/app.js` | Monta uma assinatura padronizada (nome, cargo, vínculos, e-mail, telefone, logotipo e links para site, Lattes e ORCID), confere os dados, copia como texto formatado ou HTML e exporta em PDF ([descrição](components/assinatura/README.md)) |
| Custom Plate Design XML (Tecan) | `/web/custom-plate` | `components/custom-plate/app.js` | Define os parâmetros de uma placa personalizada, mostra a grade de gotas em escala sobre a lâmina, gera o XML para o Tecan Uno Dispenser e exporta placa, configurações e XML em PDF ([descrição](components/custom-plate/README.md)) |
| Calculadora de fluidodinâmica ICP-MS (em teste, fora da lista) | `/web/fluidodinamica` (antes `/web/test-gota`, que redireciona) | `components/fluidodinamica/app.js` | Calcula volume interno, velocidade linear, tempo de residência e número de Reynolds de uma câmara de nebulização e indica o regime de fluxo ([descrição](components/fluidodinamica/README.md)) |
| Sobre as Ferramentas | `/web/sobre` | — | O que são, como funcionam, privacidade, tecnologia e código |
| Aviso de uso (disclaimer) | `/web/aviso` | — | Condições de uso e conferência dos resultados |
| Página de erro | `/web/404` | — | — |

Todas as páginas têm tema claro, escuro ou "seguir o sistema", layout para celular e o mesmo
cabeçalho e rodapé do site principal. As Ferramentas não usam Google Analytics nem cookies;
ficam salvos no navegador só a preferência de tema e, se a pessoa marcar essa opção, os dados da Assinatura.

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

## Desenvolvimento de novas ferramentas

Ferramentas novas nascem em **`_dev/<nome-da-ferramenta>/`**, a partir de `_dev/_modelo/`,
e só vão para a raiz e para `components/` quando estiverem prontas. O passo a passo
(incluindo como testar localmente com o site principal) está em [`_dev/README.md`](_dev/README.md).

## Editar

O site é **estático**: não há script de geração. Cabeçalho e rodapé estão escritos em cada página HTML; ao publicar uma ferramenta nova (desenvolvida em `_dev/`), crie a página na raiz, crie `components/<ferramenta>/` no padrão acima e adicione o link no menu (`<nav>`) de todas as páginas, um cartão em `index.html` e uma descrição em `sobre.html`. Marque o item da página atual no menu com `aria-current="page"`.

O seletor de tema do cabeçalho (`<details class="lang-menu theme-menu">`) é o mesmo do site principal; o comportamento vem de `/js/app.js`.

## Observações

- As imagens da assinatura de e-mail (`components/assinatura/assets/*.png`) entram nas assinaturas com URL absoluta **do GitHub** (`https://raw.githubusercontent.com/floriatanscosta/web/main/components/assinatura/assets/…`), que continua funcionando mesmo se o domínio parar. Assinaturas geradas até a versão 2.0.1 usam as imagens de `components/gerador/` (pelo GitHub ou por `https://floriatan.com.br/web/components/gerador/…`). **Não renomeie nem mova esses arquivos, não renomeie o branch `main` e mantenha o repositório público**: qualquer uma dessas mudanças tira as imagens das assinaturas já em uso.
- Nenhuma ferramenta envia dados a servidores; tudo roda no navegador.
- Indexação: as páginas das ferramentas (`assinatura`, `custom-plate`, `fluidodinamica`, `test-gota`) e a 404 têm `<meta name="robots" content="noindex, nofollow">`; a lista, "Sobre" e "Aviso de uso" podem aparecer nos buscadores.
- `assets/`, `js/` e `robots.txt`, sem uso (item I34 do `PENDENCIAS.md` do site principal), foram movidos para `_arquivo/` e saíram do site; a pasta pode ser apagada quando quiser.
- `components/style.css` continua publicado porque o `design-meta.html` do site principal depende dele.

O histórico de alterações está em [`CHANGELOG.md`](CHANGELOG.md).
A Assinatura tem versão própria (SemVer, tags `assinatura-vX.Y.Z`); veja [`components/assinatura/README.md`](components/assinatura/README.md#versionamento).

## Licença

**Todos os direitos reservados.** O código (HTML, CSS e JavaScript), os textos, as imagens, o
logotipo e a documentação deste repositório são de Floriatan Santos Costa e **não podem ser
copiados, modificados, redistribuídos, republicados ou usados comercialmente sem autorização
prévia e por escrito**. Os termos estão em [`LICENSE`](LICENSE).

Sem autorização, é permitido apenas: usar as ferramentas em `floriatan.com.br/web/`, usar os
resultados gerados por você (XML, assinatura etc.), ver e fazer *fork* no GitHub nos limites dos
Termos de Serviço do GitHub e citar trechos curtos com indicação da fonte.

Nomes e logotipos de instituições e fabricantes (como UFPR e Tecan) e a base visual carregada do
site principal (`floriatanscosta.github.io`) pertencem aos respectivos titulares.

> Até 20/10/2026 o código deste repositório esteve sob a licença MIT. Quem obteve uma cópia
> naquele período mantém, para aquela versão, as permissões da MIT; a nova licença vale para
> as versões publicadas a partir de 21/10/2026.
