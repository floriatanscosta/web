# Histórico de alterações — Ferramentas (/web)

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
- Gerador de assinatura e Custom Plate preservados e revisados (escape contra injeção de HTML/XML, cópia com formatação, validação de limites, nome de arquivo seguro).
- Ajuste do autor: rótulos do menu encurtados ("Assinatura", "Custom Plate") e link "Site principal" retirado do menu.
