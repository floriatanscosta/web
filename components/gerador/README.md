# Gerador de assinatura de e-mail

Página: **https://floriatan.com.br/web/assinatura** (`assinatura.html`)
Script: `components/gerador/app.js` · Estilos: seções 3 e 4 de `css/style.css`
Versão atual: **2.0.1** (21/10/2026)

Monta uma assinatura de e-mail institucional padronizada, confere os dados e a entrega
pronta para colar no cliente de e-mail, como código HTML ou em PDF. Tudo roda no
navegador: nada é enviado a servidores.

## Como usar

1. Escolha o logo e preencha os campos. Só o **nome** é obrigatório; campo vazio some da assinatura.
2. Confira a pré-visualização. Um campo com erro fica destacado e fora da assinatura.
3. Use um dos botões:
   - **Copiar assinatura**: copia como texto formatado, com uma versão em texto simples
     que traz os links por extenso. Serve para Gmail, Outlook e Apple Mail.
   - **Copiar HTML**: copia o código HTML, para clientes em que se cola o HTML (Thunderbird).
   - **Exportar PDF**: monta uma folha A4 com a assinatura e os dados e abre a impressão
     do navegador; escolha **Salvar como PDF**. O nome sugerido do arquivo é
     "Assinatura de e-mail - <nome>". Os links do PDF são clicáveis.
4. Siga o passo a passo de **Como instalar** na própria página.

A opção **Lembrar meus dados neste navegador** guarda os campos no `localStorage` (chave
`web.assinatura.v1`) apenas enquanto estiver marcada; desmarcar apaga os dados.

## Campos e verificações

| Campo | Regra | Na assinatura |
|---|---|---|
| Logo | Um dos quatro da lista (outro valor é recusado) | Imagem de 120 px, com texto alternativo com o nome das instituições |
| Nome | Obrigatório | Destaque, 18 px |
| Cargo, laboratórios, instituições | Livres | Linhas de 12 px |
| E-mail | `nome@dominio` com domínio válido | Link `mailto:` |
| Telefone | 8 a 15 dígitos, `+` opcional; aceita espaços, hífens, pontos e parênteses | Link `tel:` |
| Site | `http`/`https` com domínio válido; recusa espaços, outros protocolos, `localhost`, IP e `usuario@host` | Ícone "Site" |
| Currículo Lattes | `lattes.cnpq.br/` + 16 dígitos, só os 16 dígitos ou link do buscatextual com identificador K | Ícone "Lattes", link `http://lattes.cnpq.br/…` |
| ORCID | `orcid.org/0000-0000-0000-0000` ou só o identificador, com **dígito verificador** (ISO 7064 MOD 11-2) | Ícone "ORCID", link `https://orcid.org/…` |

O erro de cada campo aparece quando a pessoa sai dele. Copiar ou exportar com nome vazio
ou campo inválido mostra um aviso e não faz nada até a correção.

Todo texto digitado é escapado antes de entrar no HTML, e os links levam
`rel="noopener noreferrer"`.

## Imagens

As imagens entram na assinatura com URL absoluta do GitHub, que não depende do domínio:
`https://raw.githubusercontent.com/floriatanscosta/web/main/components/gerador/<arquivo>`.

| Arquivo | Uso |
|---|---|
| `logo-1-branco.png` … `logo-4-branco.png` | Logos atuais: 224 × 254 px, com fundo branco e cantos arredondados, legíveis no modo escuro dos clientes de e-mail |
| `logo-1.png` … `logo-4.png` | Logos antigos, transparentes: usados pelas assinaturas geradas antes de 21/10/2026 |
| `link.png`, `lattes.png`, `orcid.png` | Ícones, 60 × 60 px (exibidos com 24 px) |
| `cover.png` | Imagem do cartão em `/web/` e de compartilhamento (`og:image`) |

**Não renomeie nem mova esses arquivos, não renomeie o branch `main` e mantenha o
repositório público**: as assinaturas já em uso carregam as imagens desses endereços. As
assinaturas mais antigas usam `https://floriatan.com.br/web/components/gerador/…`.

## Limitações conhecidas

- O Outlook bloqueia imagens externas por padrão; até quem recebe liberar, aparece o texto alternativo.
- Clientes que invertem as cores no modo escuro podem alterar as cores do texto; o logo continua legível por ter fundo branco próprio.
- A fonte Roboto só aparece onde estiver instalada; nos demais casos, Helvetica ou Arial.
- O Lattes não tem dígito verificador público: a verificação é só de formato.

## Versionamento

A ferramenta segue o [versionamento semântico](https://semver.org/lang/pt-BR/) (`MAIOR.MENOR.CORREÇÃO`):

- **MAIOR**: muda o que é gerado ou como a ferramenta é usada de um jeito que exige atenção de
  quem já a usava (por exemplo, campo novo obrigatório ou troca dos arquivos de imagem);
- **MENOR**: função nova que não altera o uso anterior;
- **CORREÇÃO**: correção de erro, sem função nova.

A versão aparece no rodapé da página, no rodapé do PDF e num comentário no início do código
copiado por "Copiar HTML", o que permite identificar com que versão uma assinatura foi gerada.
Cada versão tem uma tag no Git: `assinatura-vX.Y.Z`.

Ao lançar uma versão:

1. atualize `VERSAO` em `app.js` e o `?v=` do `<script>` em `assinatura.html` (força o navegador a baixar o script novo);
2. atualize o número fixo de `#versao-ferramenta` em `assinatura.html` e a "Versão atual" acima;
3. acrescente a versão na tabela abaixo e no `CHANGELOG.md`;
4. depois do commit, crie e envie a tag: `git tag -a assinatura-vX.Y.Z -m "Assinatura X.Y.Z" && git push origin assinatura-vX.Y.Z`.

## Histórico de versões

| Versão | Data | Tag | Principais mudanças |
|---|---|---|---|
| **2.0.1** | 21/10/2026 | `assinatura-v2.0.1` | Campo de telefone com o mesmo estilo dos demais; versão exibida na página, no PDF e no HTML copiado |
| **2.0.0** | 21/10/2026 | `assinatura-v2.0.0` | Logos com fundo branco (modo escuro) e Logo 4; nome obrigatório; e-mail e telefone; texto simples com links; "Copiar HTML"; "Exportar PDF"; "Como instalar"; opção de lembrar os dados |
| 1.3.0 | 21/10/2026 | `assinatura-v1.3.0` | Verificação dos links: Lattes (16 dígitos), ORCID (dígito verificador) e site (domínio válido) |
| 1.2.0 | 21/10/2026 | `assinatura-v1.2.0` | Imagens servidas pelo GitHub; compressão das imagens; só logos da lista; `rel="noopener"` |
| 1.1.0 | 18/10/2026 | `assinatura-v1.1.0` | Novo visual do site; escape contra injeção de HTML; cópia com formatação; tema claro/escuro |
| 1.0.0 | 27/09/2026 | `assinatura-v1.0.0` | Primeira versão publicada |

A 2.0.0 é uma versão maior porque o nome passou a ser obrigatório e a assinatura passou a usar
outros arquivos de logo (`logo-N-branco.png`). Assinaturas antigas continuam funcionando.
