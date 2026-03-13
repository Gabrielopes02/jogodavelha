// toDO
/*
 colocar velha [ok]
 implementar a vitoria na diagonal principal[ok]
 quando X faz ponto, bolinha tambem faz O++
 fazer menu de config
 implementar bot
 colocar dificuldade   
 funcionar os botoes de jogar sozinho e com bot 
 */
let posicoesDisponiveis = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
let jogadasPBot = new Array();
let posicoesAJogar = posicoesDisponiveis;
let posicoesJogadasX = new Array();
let posicoesJogadasO = new Array();
let vez = "X";
let color = "";
let X = 0,
  O = 0;
let soma = 0;
let ganhouD = 0;
let ganhou = 0;
let botON = true;
let macete1 = new Array(1, 3, 7, 9);
let contadorVersiculo = 0;

let versiculos = [
  {
    titulo: "2 corintios 4:15",
    conteudo:
      "porque todas as coisas existem por amor de vos, para que a graça, multiplicando-se torne abundantes as acoes de graças por meio de muitos, para a gloria de Deus",
  },
  {
    titulo: "2 corintios 13:14",
    conteudo:
      "A graça do senhor jesus cristo e o amor de Deus e a comunhao do espirito santo sejam com todos vós",
  },
  {
    titulo: "Romanos 5:5",
    conteudo:
      "Ora a esperanca nao confunde, porque o amor de Deus é derramado em nosso coração pelo espirito santo, que mos foi outorgado ",
  },
  {
    titulo: "Romanos 5:8",
    conteudo:
      "Mas Deus prova o seu proprio  amor para conosco pelo fato de ter cristo morrido por nós, sendo mos ainda pecadores",
  },
  {
    titulo: "Efésios 2: 3,4",
    conteudo:
      "Entre os quais todos nós também antes andávamos nos desejos da nossa carne, fazendo a vontade da carne e dos pensamentos; e éramos por natureza filhos da ira, como os outros também. Mas Deus, que é riquíssimo em misericórdia, pelo seu muito amor com que nos amou",
  },
  {
    titulo: "Efésios 3:17-19",
    conteudo:
      "Para que Cristo habite pela fé nos vossos corações; a fim de, estando enraizados e fundados em amor,Poderdes perfeitamente compreender, com todos os santos, qual seja a largura, e o comprimento, e a altura, e a profundidade, E conhecer o amor de Cristo, que excede todo o entendimento, para que sejais cheios de toda a plenitude de Deus.",
  },
  {
    titulo: "Efésios 5:1,2",
    conteudo:
      "Sede, pois, imitadores de Deus, como filhos amados. E andai em amor, como também Cristo nos amou, e se entregou a si mesmo por nós, em oferta e sacrifício a Deus, em cheiro suave.",
  },
];
const modal = document.getElementById("modal");
const btnfecharModal = document.getElementById("closeModal");
const stringVitoria = document.getElementById("stringGanhou");
const btnJgrSozinho = document.getElementById("jogarSozinho");
const btn2Jogadores = document.getElementById("2jogadores");
const btnJogadas = document.getElementsByClassName("jogadas");
const btnHome = document.getElementsByClassName("options")[0];
const btnGame = document.getElementsByClassName("options")[1];
const btnConfig = document.getElementsByClassName("options")[2];
const arraybtnJogadas = Array.from(btnJogadas);
const tabuleiro = document.getElementsByClassName("game")[0];
const divHome = document.getElementsByClassName("home")[0];
const divConfig = document.getElementsByClassName("config")[0];

const frasesHome = document.getElementById("frasesHome");

const escreverVersiculos = () => {
  let frase = versiculos[contadorVersiculo].conteudo;
  let stringFrase = "";
  let i = 0;

  meuIntervalo = setInterval(() => {
    // escreve a frase letra por letra num intervalo selecionado

    frasesHome.innerText = `${versiculos[contadorVersiculo].titulo}\n${stringFrase}`;
    stringFrase += frase[i];
    if (i < frase.length) {
      i++;
    } else {
      i = 0;
      stringFrase = "";
      contadorVersiculo < versiculos.length - 1
        ? contadorVersiculo++
        : (contadorVersiculo = 0);
      clearInterval(meuIntervalo);
      escreverVersiculos();
    }
  }, 100);
};
escreverVersiculos();
btnHome.addEventListener("click", () => {
  if (window.innerWidth < 425) {

    btnHome.style.borderBottom = "none";
    btnGame.style.borderBottom = "5px solid var(--css-grid)";
    btnConfig.style.borderBottom = "5px solid var(--css-grid)";

  } else {

    btnHome.style.borderRight = "none";
    btnGame.style.borderRight = "5px solid var(--css-grid)";
    btnConfig.style.borderRight = "5px solid var(--css-grid)";

  }
  tabuleiro.style.display = "none";
  divHome.style.display = "flex";
  divConfig.style.display = "none";
  clearInterval(meuIntervalo);
  escreverVersiculos();
});
btnGame.addEventListener("click", () => {

 if (window.innerWidth < 425) {
  
    btnHome.style.borderBottom = "5px solid var(--css-grid)";
    btnGame.style.borderBottom = "none";
    btnConfig.style.borderBottom = "5px solid var(--css-grid)";

  } else {

    btnHome.style.borderRight = "none";
    btnGame.style.borderRight = "5px solid var(--css-grid)";
    btnConfig.style.borderRight = "5px solid var(--css-grid)";

  }
  tabuleiro.style.display = "flex";
  divHome.style.display = "none";
  divConfig.style.display = "none";
  clearInterval(meuIntervalo);
});
btnConfig.addEventListener("click", () => {
  if (window.innerWidth < 425) {
  
    btnHome.style.borderBottom = "5px solid var(--css-grid)";
    btnGame.style.borderBottom = "5px solid var(--css-grid)";
    btnConfig.style.borderBottom = "none";

  } else {

    btnHome.style.borderRight = "none";
    btnGame.style.borderRight = "5px solid var(--css-grid)";
    btnConfig.style.borderRight = "5px solid var(--css-grid)";

  }
  tabuleiro.style.display = "none";
  divHome.style.display = "none";
  divConfig.style.display = "flex";
});

btnJgrSozinho.addEventListener("click", () => {
  botON = true;
  X = 0;
  O = 0;
  limparTabuleiro();
  posicoesJogadasO = [];
  posicoesJogadasX = [];
});

btn2Jogadores.addEventListener("click", () => {
  botON = false;
  X = 0;
  O = 0;
  limparTabuleiro();
  posicoesJogadasO = [];
  posicoesJogadasX = [];
});

btnfecharModal.addEventListener("click", () => {
  modal.close();
  posicoesJogadasX = [];
  posicoesJogadasO = [];
  posicoesAJogar = posicoesDisponiveis;
  ganhou = 0;
  ganhouD = 0;
});

function jogadas(numero) {
  let id = numero.id % 100;
  // numero é a div botao
  let checkposicao = true;
  // array nao zerado

  posicoesJogadasX.forEach((posicao) => {
    // verifica se a posicao nao foi jogada
    if (posicao == id) {
      checkposicao = false;
    }
  });
  if (checkposicao) {
    if (vez == "X") {
      posicoesJogadasX.push(id);
    } else {
      posicoesJogadasO.push(id);
    }
  }
  if (numero.innerText == "") {
    numero.innerText = vez;
    // preencher div com X ou O
    vez == "X" ? (color = "azul") : (color = "laranja");
    numero.style.color = getComputedStyle(
      document.documentElement,
    ).getPropertyValue(`--${color}`);
    vez = vez == "O" ? "X" : "O";
  }

  posicoesAJogar = posicoesAJogar.filter(
    (i) => i != Math.trunc(numero.id / 100),
  );
  jogadasPBot.push(Math.trunc(numero.id / 100));

  quemGanhou(posicoesJogadasX, "X", posicoesAJogar);
  quemGanhou(posicoesJogadasO, "O", posicoesAJogar);
}

function quemGanhou(arrayjogadas, vez, posicoesAJogar) {
  for (let i = 0; i < arrayjogadas.length; i++) {
    // itera sobre todos os itens do array
    let stringNum = arrayjogadas[i].toString();

    for (let digito of stringNum) {
      //somar 2 algarismos para diagonal secundária
      soma += parseInt(digito);
    }
    ganhouD = soma == 4 ? (ganhouD += 1) : ganhouD;
    soma = 0;
  }

  let linhas = arrayjogadas.map((x) => Math.trunc(x / 10));
  numRepetidos(linhas);
  let colunas = arrayjogadas.map((x) => x % 10);
  numRepetidos(colunas);
  ganhadorDiagonal(arrayjogadas);

  function ganhadorDiagonal(arrayjogadas) {
    let soma = 0;

    arrayjogadas.forEach((item) => {
      let arrayString = item.toString();
      if (arrayString[0] == arrayString[1]) {
        soma++;
      }
      soma == 3 ? (ganhou = 3) : (ganhou = ganhou);
    });
  }

  function numRepetidos(vetorTeste) {
    // confere se houve ganhador

    let repetidos = vetorTeste.filter(
      (item, index) => vetorTeste.indexOf(item) !== index,
    );
    let um = 0;
    let dois = 0;
    let tres = 0;
    repetidos.forEach((i) => {
      if (i == 1) {
        um++;
      }
      if (i == 2) {
        dois++;
      }
      if (i == 3) {
        tres++;
      }
      if (um > 1 || dois > 1 || tres > 1) {
        ganhou = 3;
      }
    });
  }

  // function limparTabuleiro() {
  //   let jogadas = document.getElementsByClassName("jogadas");
  //   for (let i = 0; i < jogadas.length; i++) {
  //     limpa o tabuleiro
  //     jogadas[i].innerText = "";
  //   }
  // }

  function mostrarPlacar() {
    const placar = document.getElementsByClassName("placar")[0];
    placar.style.visibility = "visible";
    placar.innerHTML = `<span>${X}</span> X <span>${O}</span>`;
    const letraX = placar.children[0];
    letraX.style.color = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--azul");
    const letraO = placar.children[1];
    letraO.style.color = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--laranja");
  }
  if (ganhou == 3 || ganhouD == 3) {
    limparTabuleiro();
    modal.showModal();
    stringVitoria.innerText = `${vez} ganhou`;
    vez === "X" ? X++ : O++;
    mostrarPlacar();
  } else {
    if (posicoesAJogar.length == 0) {
      modal.showModal();
      stringVitoria.innerText = "Velha";

      limparTabuleiro();
      mostrarPlacar();
    }
  }
}

arraybtnJogadas.forEach((item) => {
  item.addEventListener("click", () => {
    if (botON) {
      alert("vaivaivaivai");

      // macete1.forEach((itemMacete, index) => {
      //   if (itemMacete == jogadasPBot[jogadasPBot.length - 1]) {
      //     macete1.splice(index, 1);
      //     btnJogadas[4].textContent == "" ? jogadas(btnJogadas[4]) : "";
      //   }
      // });
    }
  });
});
function limparTabuleiro() {
  let jogadas = document.getElementsByClassName("jogadas");
  for (let i = 0; i < jogadas.length; i++) {
    // limpa o tabuleiro
    jogadas[i].innerText = "";
  }
}
