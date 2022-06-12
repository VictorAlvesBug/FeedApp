let mockComentario = {
  nomeCriador: "Fulano de Tal",
  dataHoraCadastro: new Date(2021, 7, 18, 13, 0, 0, 0),
  texto: "Muito legal sua postagem",
};

let mockPost = {
  nomeCriador: "Fulano de Tal",
  titulo: "Título da Postagem",
  dataHoraCadastro: new Date(2021, 7, 18, 13, 0, 0, 0),
  legenda:
    "Aqui ficará a descrição da postagem<br/>Que pode ter mais de uma linha<br/>Várias, inclusive",
  srcImagem: "./imgs/post1.png",
  forImagem: "Linda paisagem",
  tecnologias: ["Front-end", "CSS", "JS"],
  comentarios: [mockComentario, mockComentario],
};

let dados = {
  posts: [mockPost, mockPost, mockPost, mockPost],
};

const feedElement = document.querySelector(".feed");

if (dados.posts.length === 0) {
  feedElement.innerHTML = `<p class="nenhum-post">Os posts dos seus seguidores aparecerão aqui...</p>`;
} else {
    let listaPostHtml = [];

    dados.posts.forEach(async post => {
      get('./post.html').then(postHtml => {
        let postElement = document.createElement('div');
  
        postElement.innerHTML = postHtml;
    
        const dataPost = post.dataHoraCadastro.toLocaleDateString();
        const horarioPost = post.dataHoraCadastro.toLocaleTimeString();
    
        postElement.querySelector('.nome-criador').innerText = post.nomeCriador;
        postElement.querySelector('.data-hora-cadastro').innerText = `em ${dataPost} às ${horarioPost}`;
        postElement.querySelector('.titulo').innerText = post.titulo;
        postElement.querySelector('.legenda').innerHTML = post.legenda;
        
        postElement.querySelector('.tecnologias').innerHTML = post.tecnologias.reduce((acc, tecnologia) => {
            return `${acc}<span>${tecnologia}</span>`
        }, "")

        if (post.comentarios.length === 0) {
            postElement.querySelector('.comentarios').innerHTML = `<p class="nenhum-comentario">Nenhum comentário</p>`;
        } else {
            let listaComentariosHtml = [];
        
            post.comentarios.forEach(async comentario => {
                get('./comentario.html').then(comentarioHtml => {
                let comentarioElement = document.createElement('div');
            
                comentarioElement.innerHTML = comentarioHtml;
            
                const dataComentario = comentario.dataHoraCadastro.toLocaleDateString();
                const horarioComentario = comentario.dataHoraCadastro.toLocaleTimeString();
            
                comentarioElement.querySelector('.nome-criador').innerText = comentario.nomeCriador;
                comentarioElement.querySelector('.data-hora-cadastro').innerText = `em ${dataComentario} às ${horarioComentario}`;
                comentarioElement.querySelector('.texto').innerText = comentario.texto;
                
                listaComentariosHtml.push(comentarioElement);
                });
            });
        
            setTimeout(() => {
                postElement.querySelector('.comentarios').innerHTML = listaComentariosHtml.reduce((acc, comentarioHtml) => {
                    return `${acc}${comentarioHtml.innerHTML}`;
                }, "");
            }, 200)
        }

        listaPostHtml.push(postElement);
      });
    });

    setTimeout(() => {
        feedElement.innerHTML = listaPostHtml.reduce((acc, postHtml) => {
            return `${acc}${postHtml.innerHTML}`;
        }, "");
    }, 400)
}

function get(urlArquivo) {
  return new Promise((resolve, reject) => {
    const xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
            resolve(xmlHttp.responseText);
        } else {
          reject(xmlHttp);
        }
      }
    };

    xmlHttp.open("GET", urlArquivo, true);
    xmlHttp.send(null);
  });
}
