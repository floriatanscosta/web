# _dev/ — desenvolvimento de novas ferramentas (não publicado)

Espaço para criar e testar aplicações antes de publicá-las. **Nada desta pasta vai
para o site**: o Jekyll ignora pastas que começam com `_`, e `_dev/` também está em
`exclude` no `_config.yml`. Como o repositório é público, o código fica visível no
GitHub — não guarde aqui senhas, chaves ou dados pessoais.

## Estrutura

```text
_dev/
├── _modelo/          # ponto de partida: copie esta pasta para começar
│   ├── index.html    # página com cabeçalho, rodapé e tema iguais aos das ferramentas
│   └── app.js        # script com o padrão dos demais (IIFE, 'use strict', escape de HTML)
└── <nova-ferramenta>/
    ├── index.html
    ├── app.js
    └── … imagens, notas, dados de teste
```

## Criar uma ferramenta

1. Copie `_modelo/` para `_dev/<nome-da-ferramenta>/` (minúsculas, palavras separadas por hífen).
2. Troque o título, a descrição e o `<main>` de `index.html`; no fim da página, aponte o
   `<script>` para `/web/_dev/<nome-da-ferramenta>/app.js`.
3. Escreva a lógica em `app.js`.

## Testar localmente

As páginas carregam o CSS, o JS e os ícones do site principal pelo caminho absoluto
(`/css/…`, `/js/…`, `/assets/…`). Para vê-las com estilo, sirva os dois repositórios juntos:

```bash
git clone https://github.com/floriatanscosta/floriatanscosta.github.io site
ln -s "$(pwd)/web" site/web          # este repositório em /web/
cd site && python3 -m http.server 8000
# abra http://localhost:8000/web/_dev/<nome-da-ferramenta>/
```

## Publicar

1. Mova o script para `components/<ferramenta>/app.js` (e as imagens para a mesma pasta).
2. Crie `<ferramenta>.html` na raiz a partir do `index.html` de desenvolvimento, com o
   `<script>` apontando para `/web/components/<ferramenta>/app.js` e o endereço
   `https://floriatan.com.br/web/<ferramenta>` em `canonical` e `og:url`.
3. Adicione o link no menu (`<nav>`) de todas as páginas, um cartão em `index.html` e
   uma descrição em `sobre.html`.
4. Atualize o `README.md` e o `CHANGELOG.md` e apague a pasta de `_dev/`.
