# Desenvolvimento e manutenção

Como criar, editar e publicar ferramentas, e cuidados para não quebrar o que já está em uso. Arquitetura e estrutura dos arquivos em [`arquitetura.md`](arquitetura.md).

## Desenvolvimento de novas ferramentas

Ferramentas novas nascem em **`_dev/<nome-da-ferramenta>/`**, a partir de `_dev/_modelo/`,
e só vão para a raiz e para `components/` quando estiverem prontas. O passo a passo
(incluindo como testar localmente com o site principal) está em [`_dev/README.md`](../_dev/README.md).

## Editar

O site é **estático**: não há script de geração. Cabeçalho e rodapé estão escritos em cada página HTML; ao publicar uma ferramenta nova (desenvolvida em `_dev/`), crie a página na raiz, crie `components/<ferramenta>/` no padrão descrito em [`arquitetura.md`](arquitetura.md#padrão-de-cada-ferramenta) e adicione o link no menu (`<nav>`) de todas as páginas, um cartão em `index.html` e uma descrição em `sobre.html`. Marque o item da página atual no menu com `aria-current="page"`.

O seletor de tema do cabeçalho (`<details class="lang-menu theme-menu">`) é o mesmo do site principal; o comportamento vem de `/js/app.js`.

## Observações

- As imagens da assinatura de e-mail (`components/assinatura/assets/*.png`) entram nas assinaturas com URL absoluta **do GitHub** (`https://raw.githubusercontent.com/floriatanscosta/web/main/components/assinatura/assets/…`), que continua funcionando mesmo se o domínio parar. Assinaturas geradas até a versão 2.0.1 usam as imagens de `components/gerador/` (pelo GitHub ou por `https://floriatan.com.br/web/components/gerador/…`). **Não renomeie nem mova esses arquivos, não renomeie o branch `main` e mantenha o repositório público**: qualquer uma dessas mudanças tira as imagens das assinaturas já em uso.
- Nenhuma ferramenta envia dados a servidores; tudo roda no navegador.
- Indexação: as páginas das ferramentas (`assinatura`, `custom-plate`, `fluidodinamica`, `test-gota`) e a 404 têm `<meta name="robots" content="noindex, nofollow">`; a lista, "Sobre" e "Aviso de uso" podem aparecer nos buscadores.
- `assets/`, `js/` e `robots.txt`, sem uso (item I34 do `PENDENCIAS.md` do site principal), foram movidos para `_arquivo/` e saíram do site; a pasta pode ser apagada quando quiser.
- `components/style.css` continua publicado porque o `design-meta.html` do site principal depende dele.
