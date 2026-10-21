# Histórico de alterações — Ferramentas (/web)

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
- Gerador de assinatura e Custom Plate preservados e revisados (escape contra injeção de HTML/XML, cópia com formatação, validação de limites, nome de arquivo seguro).
- Ajuste do autor: rótulos do menu encurtados ("Assinatura", "Custom Plate") e link "Site principal" retirado do menu.
