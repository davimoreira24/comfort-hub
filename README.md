# Um cantinho pra você 💗

Um pequeno site, feito com calma, pra alguém especial. Sem cobrança, sem pressa, no ritmo dela.

> "Autonomia, baixa fricção, presença silenciosa."

## O que tem

- **Tela inicial** com duas opções suaves: `Quero um mimo` e `Quero meu espaço`.
- **Mimos** — 9 vales interativos (Cinema, Jantar, Massagem, Gameplay, Praia, Café na Cama, Maratona, Doce, Preguiça) em formato de "ticket", com tilt 3D, brilho que segue o cursor, carimbo "resgatado" e mini chuva de coraçõezinhos quando ela toca em **Resgatar**. Ao resgatar, abre um **voucher elegante** com código único de resgate (`AC260428-GAM-4K1R`), data/hora, dados de "para/de", botão pra **copiar o código**, **compartilhar no WhatsApp** já com a mensagem pronta pro número configurado, e **imprimir** com layout otimizado em A5. Os resgates ficam salvos no `localStorage`, então ela pode reabrir o vale a qualquer momento via "Ver vale ♡".
- **Espaço** — carrossel infinito e contínuo, com fotos (placeholder de gradiente + emoji — basta substituir por `<img />` em `src/data/carousel.ts`) e cartões de mensagem. Ele desacelera com o toque/hover, sem cobrar nada.
- **Botão flutuante** `Me dê um motivo para sorrir` (compactado em mobile como `um sorriso`) que abre um cartão com uma frase aleatória de uma lista personalizada.
- **Transições suaves entre telas** com GSAP — efeito "suspiro" (escala leve, blur, fade), nada brusco.
- Suporte a `prefers-reduced-motion`.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [GSAP 3](https://gsap.com/) + [@gsap/react](https://gsap.com/resources/React/)
- Fontes: [Quicksand](https://fonts.google.com/specimen/Quicksand) (UI), [Fraunces](https://fonts.google.com/specimen/Fraunces) (display itálico) e [Caveat](https://fonts.google.com/specimen/Caveat) (manuscrita)

## Rodando

Requer **Node 22** e **pnpm**.

```bash
nvm use 22
pnpm install
pnpm dev
```

Build de produção:

```bash
pnpm build
pnpm start
```

## Personalizando para ela

Tudo que importa fica em `src/data/`:

- `src/data/smiles.ts` — array de elogios / piadas internas / lembretes pro botão flutuante.
- `src/data/vouchers.ts` — vales (título, descrição, emoji, cor de cada um).
- `src/data/carousel.ts` — slides do carrossel "espaço". Cada item pode ser `type: "message"` (cartão de texto) ou `type: "photo"` (cartão de foto).

Para usar fotos reais no carrossel:

1. Adicione as imagens em `public/fotos/` (ex.: `public/fotos/01.jpg`).
2. Em `src/data/carousel.ts`, troque o objeto `photo` por algo como:

   ```ts
   { id: "photo-1", type: "photo", caption: "Bali, 2024", emoji: "", gradient: "linear-gradient(...)" }
   ```

3. No componente `src/components/EspacoScreen.tsx`, substitua o bloco do emoji por `<img src="/fotos/01.jpg" alt="..." className="w-full h-full object-cover" />` quando o item tiver um campo de imagem.

## Paleta

Definida em `src/app/globals.css` (variáveis CSS com escopo de tema do Tailwind 4):

- Lavanda: `#d6c8ec` / `#b9a4dc`
- Rosa suave: `#f3d7e2` / `#e7b3c6`
- Fundo creme: `#fbf7fb`
- Texto: `#4a3a55`

## Estrutura

```
src/
  app/
    layout.tsx                  # fontes + metadados
    page.tsx                    # ponto de entrada
    globals.css                 # paleta lavanda/rosa, utilidades + @media print
  components/
    StageRouter.tsx             # gerencia transições "suspiro" entre telas
    HomeScreen.tsx              # tela inicial com dois CTAs
    MimosScreen.tsx             # vales interativos com GSAP
    EspacoScreen.tsx            # carrossel infinito suave
    SmileButton.tsx             # botão flutuante "me dê um motivo para sorrir"
    RedeemedVoucherModal.tsx    # voucher de resgate elegante (print + WhatsApp)
  lib/
    voucher-utils.ts            # geração de código, persistência, link WhatsApp
  data/
    smiles.ts
    vouchers.ts
    carousel.ts
```

## Mudando o número do WhatsApp

O número de destino do botão "Compartilhar no WhatsApp" fica em `src/lib/voucher-utils.ts`:

```ts
export const TARGET_WHATSAPP = "5585999393807";
```

Formato: `55` (BR) + DDD + número, sem espaços/símbolos.

Feito com calma, pra ela. 🌷
