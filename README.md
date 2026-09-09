# My Fav Albums

Frontend em Next.js de uma seleção editorial de álbuns. O conteúdo mora no Hygraph: artistas, álbuns, capas, notas, resenhas e o que aparece em destaque na Home.

Este repositório é o projeto da **Hygraph Developer Certification**. Ele demonstra schema no Hygraph, relação Artist → Album, Content API GraphQL, estágios DRAFT vs PUBLISHED, localização de campos, e Content Federation com a API REST do MusicBrainz (faixas via Remote Source).

O Next.js só consome o GraphQL do Hygraph. As faixas não vêm de uma chamada direta do app ao MusicBrainz; o Hygraph resolve o Remote Field `musicBrainzRelease` a partir do `musicBrainzReleaseId` de cada álbum.

```text
Hygraph (CMS + federation MusicBrainz)
        │ GraphQL
        ▼
Next.js (App Router, Server Components)
        │
        ▼
Visitante  (/pt ou /en)
```

## Como rodar o projeto

Requisitos: Node.js 18.18+ e npm.

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Copie o arquivo de ambiente e preencha com o projeto Hygraph (**Project Settings → Access**):

```bash
cp .env.example .env.local
```

```env
HYGRAPH_ENDPOINT=
HYGRAPH_TOKEN=
```

- `HYGRAPH_ENDPOINT` é obrigatório (Content API).
- `HYGRAPH_TOKEN` é opcional se a Public Content API já permitir leitura de conteúdo **PUBLISHED**.
- Não use o prefixo `NEXT_PUBLIC_` nessas variáveis. O token fica só no servidor.

3. Suba o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000). A raiz redireciona para `/pt`. Troque o idioma no header para `/en`.

Outros comandos:

```bash
npm run lint
npm run build
npm start
npx tsc --noEmit
```

## O que o site mostra

- **Home** (`/pt`, `/en`): álbuns com `featured = true` no Hygraph.
- **Álbum** (`/pt/album/[slug]`): capa, nota, resenha, faixas federadas do MusicBrainz e dados do artista.

Só conteúdo **publicado** aparece na API pública. Depois de anexar capa ou imagem, publique o Asset e o entry. Sem `musicBrainzReleaseId` publicado, a lista de faixas não carrega.

Detalhes do schema: [docs/hygraph-schema.md](docs/hygraph-schema.md). Fluxo das queries: [docs/architecture.md](docs/architecture.md).
