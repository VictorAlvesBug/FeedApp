let mockComentario = {
  nomeCriador: "Fulano de Tal",
  dataHoraCadastro: new Date(2021, 7, 18, 13, 0, 0, 0),
  texto: "Muito legal sua postagem"
};

let mockPost = {
  nomeCriador: "Fulano de Tal",
  dataHoraCadastro: new Date(2021, 7, 18, 13, 0, 0, 0),
  legenda:
    "Aqui ficará a descrição da postagem<br/>Que pode ter mais de uma linha<br/>Várias, inclusive",
  srcImagem: "./imgs/post1.png",
  forImagem: "Linda paisagem",
  tecnologias: ["Front-end", "CSS", "JS"],
  comentarios: [
    mockComentario,
    mockComentario,
    mockComentario
  ],
};

let dados = [
    mockPost,
    mockPost
]

