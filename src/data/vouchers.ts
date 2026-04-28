export type Voucher = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  accent: string;
  glow: string;
  note: string;
};

export const vouchers: Voucher[] = [
  {
    id: "cinema",
    title: "Sessão Cinema",
    subtitle: "Vale uma noite de pipoca",
    description:
      "Você escolhe o filme, eu cuido da pipoca, do cobertor e do colo. Sem celular, só nós dois.",
    emoji: "🎬",
    accent: "#c9a7e0",
    glow: "rgba(201, 167, 224, 0.55)",
    note: "Resgatável a qualquer dia, até nos dias preguiça.",
  },
  {
    id: "jantar",
    title: "Jantar Especial",
    subtitle: "Vale uma mesa só sua",
    description:
      "Você diz onde, eu reservo. Pode ser sushi, pode ser hambúrguer no chão da sala. O importante é a sua companhia.",
    emoji: "🍝",
    accent: "#e7b3c6",
    glow: "rgba(231, 179, 198, 0.55)",
    note: "Inclui sobremesa, claro. Você merece duas.",
  },
  {
    id: "massagem",
    title: "Massagem Relax",
    subtitle: "Vale ombros leves",
    description:
      "30 minutinhos só pra você relaxar. Luz baixa, música calma, e zero cobrança de qualquer coisa.",
    emoji: "🌸",
    accent: "#b9a4dc",
    glow: "rgba(185, 164, 220, 0.55)",
    note: "Pode pedir em silêncio, eu entendo.",
  },
  {
    id: "gameplay",
    title: "Gameplay Duo",
    subtitle: "Vale um Paladins sem reclamar",
    description:
      "Eu pego o suporte, você escolhe o personagem. Promessa: zero rage, só risada e voice chat besta no Discord.",
    emoji: "🎮",
    accent: "#b8b3e8",
    glow: "rgba(184, 179, 232, 0.55)",
    note: "Carry garantido (ou pelo menos a tentativa).",
  },
  {
    id: "praia",
    title: "Dia de Praia",
    subtitle: "Vale areia, mar e sol",
    description:
      "Eu monto o guarda-sol, levo a água gelada, passo o protetor nas suas costas. Você só precisa aparecer de biquíni e relaxar.",
    emoji: "🏖️",
    accent: "#a9d4e0",
    glow: "rgba(169, 212, 224, 0.55)",
    note: "Inclui açaí na volta. Não negociável.",
  },
  {
    id: "cafe",
    title: "Café na Cama",
    subtitle: "Vale acordar sem motivo",
    description:
      "Eu levanto antes, faço seu café do jeitinho que você gosta e te entrego na cama. Você nem precisa abrir os dois olhos.",
    emoji: "☕",
    accent: "#e8c9a8",
    glow: "rgba(232, 201, 168, 0.55)",
    note: "Pão na chapa ou bolinho? Você escolhe ao acordar.",
  },
  {
    id: "serie",
    title: "Maratona Série",
    subtitle: "Vale um episódio (ou dez)",
    description:
      "Você puxa a série, eu prometo não dormir antes do terceiro episódio. Cobertor compartilhado, pernas embaraçadas, sem culpa.",
    emoji: "📺",
    accent: "#d6b3e7",
    glow: "rgba(214, 179, 231, 0.55)",
    note: "Pausa pra ir ao banheiro respeitada.",
  },
  {
    id: "doce",
    title: "Dia do Doce",
    subtitle: "Vale uma volta pra adoçar",
    description:
      "Sorveteria, doceria, padaria do bolo bom — você escolhe o destino, eu pago. Sem caloria, sem cálculo, só prazer.",
    emoji: "🍰",
    accent: "#f3c4d8",
    glow: "rgba(243, 196, 216, 0.55)",
    note: "Pode resgatar em dia de TPM, é estratégico.",
  },
  {
    id: "preguica",
    title: "Dia da Preguiça",
    subtitle: "Vale ficar de pijama",
    description:
      "Cancela tudo. A gente fica em casa, comida pedida, manta, almofadas, nada de obrigação. O mundo pode esperar.",
    emoji: "🛋️",
    accent: "#c8b8e0",
    glow: "rgba(200, 184, 224, 0.55)",
    note: "Banho é opcional. Carinho é obrigatório.",
  },
];
