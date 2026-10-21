# Gerador de assinatura de e-mail

Página: **https://floriatan.com.br/web/assinatura** (`assinatura.html`)
Script: `components/gerador/app.js` · Estilos: seções 3 e 4 de `css/style.css`

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
