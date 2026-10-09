// Catálogo fictício do Streamora. Nenhum título, imagem ou marca é real.
// hue: matiz usado para gerar a arte do pôster (ver art() em app.js)
window.CATALOG = [
  { id: 1,  title: "Eclipse Zero",        type: "Filme", year: 2025, age: "14", dur: "2h 04min", match: 98, hue: 265, genres: ["Ficção científica", "Suspense"], cast: ["Lara Mendes", "Caio Ventura"], desc: "Quando o sol some por 72 horas, uma astrofísica descobre que o apagão foi planejado por alguém dentro da própria agência espacial." },
  { id: 2,  title: "Rota 66 Norte",        type: "Série", year: 2024, age: "16", dur: "3 temporadas", match: 95, hue: 18,  genres: ["Ação", "Drama"], cast: ["Bruno Castelli", "Dora Neves"], desc: "Um caminhoneiro aposentado é arrastado de volta ao crime quando a filha desaparece numa estrada sem sinal." },
  { id: 3,  title: "Casa dos Ecos",        type: "Filme", year: 2023, age: "16", dur: "1h 38min", match: 91, hue: 340, genres: ["Terror", "Suspense"], cast: ["Marta Quintana", "Iago Prado"], desc: "Uma família herda um sobrado onde cada cômodo repete conversas que ainda não aconteceram." },
  { id: 4,  title: "Tempero Brasileiro",   type: "Série", year: 2025, age: "L",  dur: "2 temporadas", match: 93, hue: 32,  genres: ["Documentário", "Culinária"], cast: ["Chef Ana Lídia"], desc: "Uma chef viaja de norte a sul do país atrás das receitas que as avós guardam de cabeça." },
  { id: 5,  title: "Último Round",         type: "Filme", year: 2024, age: "12", dur: "1h 55min", match: 89, hue: 8,   genres: ["Drama", "Esporte"], cast: ["Téo Barreto", "Nina Alcântara"], desc: "Aos 41 anos, um boxeador esquecido aceita uma luta que pode custar tudo, ou devolver o que perdeu." },
  { id: 6,  title: "Código Aurora",        type: "Série", year: 2025, age: "14", dur: "1 temporada", match: 97, hue: 190, genres: ["Ficção científica", "Ação"], cast: ["Yasmin Duarte", "Otto Klein"], desc: "Hackers de cinco países têm 48 horas para impedir que uma IA reescreva a história dos bancos de dados mundiais." },
  { id: 7,  title: "Riso Frouxo",          type: "Filme", year: 2024, age: "12", dur: "1h 29min", match: 86, hue: 48,  genres: ["Comédia"], cast: ["Beto Salles", "Kiara Lopes"], desc: "Dois dublês de aniversário infantil precisam salvar uma festa de 200 crianças depois que o bolo some." },
  { id: 8,  title: "Planeta Cinza",        type: "Série", year: 2023, age: "L",  dur: "1 temporada", match: 94, hue: 160, genres: ["Documentário", "Natureza"], cast: ["Narração: Eduardo Reis"], desc: "Oito episódios sobre os últimos ecossistemas intocados e as pessoas que se recusam a deixá-los desaparecer." },
  { id: 9,  title: "Noite em Valência",    type: "Filme", year: 2022, age: "14", dur: "1h 47min", match: 84, hue: 310, genres: ["Romance", "Drama"], cast: ["Sofia Marini", "Lucas Aranha"], desc: "Dois desconhecidos perdem o último trem e passam uma madrugada inteira contando mentiras honestas." },
  { id: 10, title: "Brigada 13",           type: "Série", year: 2024, age: "16", dur: "4 temporadas", match: 92, hue: 0,   genres: ["Ação", "Policial"], cast: ["Renan Siqueira", "Paula Tavares"], desc: "A unidade mais indisciplinada da polícia é a única que a cidade ainda consegue chamar." },
  { id: 11, title: "O Jardim Submerso",    type: "Filme", year: 2025, age: "10", dur: "1h 41min", match: 90, hue: 200, genres: ["Fantasia", "Animação"], cast: ["Vozes: Duda Ramos, Pietro Lins"], desc: "Uma menina descobre uma porta no fundo da piscina que leva a um reino onde as plantas guardam memórias." },
  { id: 12, title: "Cartas para Marte",    type: "Série", year: 2025, age: "10", dur: "2 temporadas", match: 88, hue: 24,  genres: ["Fantasia", "Família"], cast: ["Vozes: Lia Conti"], desc: "Um garoto escreve cartas para o planeta vermelho e, um dia, recebe resposta." },
  { id: 13, title: "Pé na Areia",          type: "Série", year: 2023, age: "12", dur: "3 temporadas", match: 85, hue: 175, genres: ["Comédia", "Drama"], cast: ["Cássio Moura", "Elis Fontes"], desc: "Uma pousada falida no litoral vira refúgio de gente que fugiu da vida que tinha." },
  { id: 14, title: "Sinal Perdido",        type: "Filme", year: 2024, age: "14", dur: "1h 52min", match: 87, hue: 230, genres: ["Suspense", "Ficção científica"], cast: ["Vera Lacerda", "Hugo Pinheiro"], desc: "Uma radioamadora capta uma transmissão que descreve com precisão o que ela fará amanhã." },
  { id: 15, title: "Lâmina de Jade",       type: "Filme", year: 2023, age: "16", dur: "2h 12min", match: 90, hue: 140, genres: ["Ação", "Fantasia"], cast: ["Kenji Arakaki", "Mei Tanaka"], desc: "Uma espadachim sem clã atravessa três reinos para devolver a arma que roubou do próprio mestre." },
  { id: 16, title: "Toca do Coelho Pop",   type: "Série", year: 2024, age: "L",  dur: "5 temporadas", match: 82, hue: 330, genres: ["Animação", "Família"], cast: ["Vozes: Bia Torres"], desc: "Um coelho músico e seus amigos transformam qualquer problema da vizinhança em canção." },
  { id: 17, title: "Fronteira de Vidro",   type: "Série", year: 2025, age: "16", dur: "1 temporada", match: 96, hue: 215, genres: ["Drama", "Suspense"], cast: ["Alma Cordeiro", "Félix Duran"], desc: "Em uma cidade dividida por um muro transparente, é possível ver tudo e falar com ninguém." },
  { id: 18, title: "Domingo de Clássico",  type: "Filme", year: 2022, age: "10", dur: "1h 36min", match: 83, hue: 120, genres: ["Esporte", "Comédia"], cast: ["Zeca Moraes", "Tânia Brito"], desc: "O time da várzea que nunca ganhou nada recebe a chance de enfrentar o campeão da cidade." },
  { id: 19, title: "Memória de Sal",       type: "Filme", year: 2025, age: "14", dur: "1h 58min", match: 92, hue: 205, genres: ["Drama", "Romance"], cast: ["Helena Vaz", "Dário Quadros"], desc: "Na volta à vila de pescadores, uma tradutora precisa decidir o que vale mais: a verdade ou a paz da família." },
  { id: 20, title: "Cidade Neon 2099",     type: "Série", year: 2024, age: "16", dur: "2 temporadas", match: 94, hue: 290, genres: ["Ficção científica", "Ação"], cast: ["Ravi Shah", "Cléo Nunes"], desc: "Num futuro em que memórias são moeda, uma detetive tenta recuperar a única lembrança que não pode ser vendida." },
  { id: 21, title: "Mistério no Colégio",  type: "Série", year: 2023, age: "12", dur: "2 temporadas", match: 81, hue: 55,  genres: ["Suspense", "Família"], cast: ["Turma 8B"], desc: "Cinco colegas montam um clube de detetives depois que o troféu da escola desaparece na véspera da formatura." },
  { id: 22, title: "Vozes do Sertão",      type: "Série", year: 2024, age: "L",  dur: "1 temporada", match: 91, hue: 28,  genres: ["Documentário", "Música"], cast: ["Narração: Marlene Dias"], desc: "Repentistas, sanfoneiros e cantadeiras contam como a música mantém viva uma região inteira." },
  { id: 23, title: "A Última Estação",     type: "Filme", year: 2024, age: "12", dur: "2h 01min", match: 88, hue: 250, genres: ["Drama"], cast: ["Ivo Brandão", "Celina Rocha"], desc: "O último dia de um chefe de estação que viu três gerações passarem pela mesma plataforma." },
  { id: 24, title: "Pulso Selvagem",       type: "Série", year: 2025, age: "14", dur: "1 temporada", match: 93, hue: 100, genres: ["Documentário", "Natureza"], cast: ["Narração: Clara Beck"], desc: "Câmeras de última geração acompanham predadores e presas durante um ano inteiro no Pantanal." }
];

// Cada fileira é definida por uma função de filtro sobre o catálogo.
window.ROWS = [
  { title: "Em alta no Brasil",        pick: c => [6, 17, 20, 2, 1, 10, 19, 15].map(i => c.find(t => t.id === i)) },
  { title: "Séries para maratonar",    pick: c => c.filter(t => t.type === "Série") },
  { title: "Ficção científica",        pick: c => c.filter(t => t.genres.includes("Ficção científica")) },
  { title: "Filmes para assistir hoje",pick: c => c.filter(t => t.type === "Filme") },
  { title: "Ação e adrenalina",        pick: c => c.filter(t => t.genres.includes("Ação")) },
  { title: "Para toda a família",      pick: c => c.filter(t => ["L", "10"].includes(t.age)) },
  { title: "Drama e emoção",           pick: c => c.filter(t => t.genres.includes("Drama") || t.genres.includes("Romance")) },
  { title: "Documentários",            pick: c => c.filter(t => t.genres.includes("Documentário")) }
];

window.PROFILES = [
  { id: "p1", name: "Rômulo",   from: "#e50914", to: "#ff7a45" },
  { id: "p2", name: "Visitante", from: "#2563eb", to: "#22d3ee" },
  { id: "p3", name: "Família",  from: "#16a34a", to: "#a3e635" },
  { id: "p4", name: "Crianças", from: "#9333ea", to: "#f472b6" }
];
