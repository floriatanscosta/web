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

- **[Gerador de assinatura de e-mail](https://floriatan.com.br/web/assinatura)** — monta uma assinatura padronizada (nome, cargo, vínculos, e-mail, telefone, logotipo e links para site, Lattes e ORCID), confere os dados, copia como texto formatado ou HTML e exporta em PDF ([descrição](components/assinatura/README.md)).
- **[Custom Plate Design XML (Tecan)](https://floriatan.com.br/web/custom-plate)** — define os parâmetros de uma placa personalizada, mostra a grade de gotas em escala sobre a lâmina, gera o XML para o Tecan Uno Dispenser e exporta placa, configurações e XML em PDF ([descrição](components/custom-plate/README.md)).
- **Calculadora de fluidodinâmica ICP-MS** (em teste, fora da lista) — calcula volume interno, velocidade linear, tempo de residência e número de Reynolds de uma câmara de nebulização e indica o regime de fluxo ([descrição](components/fluidodinamica/README.md)).
- **Páginas de apoio:** lista de ferramentas, [Sobre](https://floriatan.com.br/web/sobre) e [Aviso de uso](https://floriatan.com.br/web/aviso).
- **Privacidade:** tudo roda no navegador; nenhum dado é enviado a servidores, sem Google Analytics nem cookies. Ficam salvos no aparelho só a preferência de tema e, se a pessoa marcar essa opção, os dados da Assinatura.
- **Mesma identidade do site principal:** tema claro, escuro ou "seguir o sistema", layout para celular e o mesmo cabeçalho e rodapé.

## Documentação adicional

- [`docs/arquitetura.md`](docs/arquitetura.md) — tecnologias, base visual compartilhada, estrutura do repositório e padrão de cada ferramenta.
- [`docs/manutencao.md`](docs/manutencao.md) — como desenvolver, editar e publicar ferramentas; caminhos que não podem mudar.
- [`_dev/README.md`](_dev/README.md) — passo a passo para criar uma ferramenta nova.
- [`CHANGELOG.md`](CHANGELOG.md) — histórico de alterações. A Assinatura tem versão própria (SemVer, tags `assinatura-vX.Y.Z`); veja [`components/assinatura/README.md`](components/assinatura/README.md#versionamento).

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
