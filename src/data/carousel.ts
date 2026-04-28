export type CarouselItem =
  | {
      id: string;
      type: "photo";
      src: string;
      caption: string;
      sub?: string;
      gradient?: string;
    }
  | {
      id: string;
      type: "message";
      title: string;
      body: string;
      gradient: string;
    };

// Sequência intercalada: mensagem → foto → mensagem → foto…
// As fotos vivem em /public.
export const carouselItems: CarouselItem[] = [
  {
    id: "msg-1",
    type: "message",
    title: "Você não precisa fazer nada agora",
    body: "Pode só estar. Eu sigo aqui, do seu lado, no silêncio.",
    gradient: "linear-gradient(135deg, #f1e3f5, #e2d3f3)",
  },
  {
    id: "photo-us-1",
    type: "photo",
    src: "/10.jpg",
    caption: "a gente, do nosso jeito",
    sub: "eu sempre vou estar aqui",
  },
  {
    id: "msg-2",
    type: "message",
    title: "Respira fundo",
    body: "Inspira por 4 segundos. Segura por 4. Solta por 6. Eu respiro junto.",
    gradient: "linear-gradient(135deg, #ece1f7, #d6c8ec)",
  },
  {
    id: "photo-family-future",
    type: "photo",
    src: "/14.jpg",
    caption: "nossa família, crescendo juntinho",
    sub: "ele ama você (e eu também)",
  },
  {
    id: "msg-3",
    type: "message",
    title: "É temporário",
    body: "O que dói hoje não dura sempre. E até passar, eu fico.",
    gradient: "linear-gradient(135deg, #f5edf6, #ece1f7)",
  },
  {
    id: "photo-us-2",
    type: "photo",
    src: "/18.jpg",
    caption: "seu sorriso preferido",
    sub: "(o meu também)",
  },
  {
    id: "msg-4",
    type: "message",
    title: "Você é amada",
    body: "Olha à sua volta. Tem gente que te ama infinitamente, em silêncio, todo dia.",
    gradient: "linear-gradient(135deg, #d6c8ec, #f1e3f5)",
  },
  {
    id: "photo-parents",
    type: "photo",
    src: "/15.jpg",
    caption: "olha quem te ama",
    sub: "a gente todo, do seu lado",
  },
  {
    id: "msg-5",
    type: "message",
    title: "Sem pressão",
    body: "Não precisa responder, não precisa estar bem. Só saber que você existe já me alegra o dia.",
    gradient: "linear-gradient(135deg, #fde2ec, #ece1f7)",
  },
];
