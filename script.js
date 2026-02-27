// toDO
/**



  
 

 implementar a vitoria na diagonal principal
 fazer menu de config
 implementar bot
 colocar dificuldade   
 funcionar os botoes de jogar sozinho e com bot 
 */
let posicoesDisponiveis = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
let posicoesAJogar = posicoesDisponiveis;
let posicoesJogadasX = new Array();
let posicoesJogadasO = new Array();
let vez = "X";
let color = "";
 let X = 0,
      O = 0;
const buttonHome = document.getElementById("buttonHome");
const modal = document.getElementById("modal");
const btnfecharModal = document.getElementById("closeModal");
const stringVitoria = document.getElementById("stringGanhou");

btnfecharModal.addEventListener("click", () => {
  modal.close();
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

  quemGanhou(posicoesJogadasX, "X");
  quemGanhou(posicoesJogadasO, "O");
}

function quemGanhou(arrayjogadas, vez) {
  let soma = 0;
  let ganhouD = 0;
  let ganhou = 0;

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

  function numRepetidos(vetorTeste) {
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

  if (ganhou == 3 || ganhouD == 3) {
   
    let jogadas = document.getElementsByClassName("jogadas");
    const placar = document.getElementsByClassName("placar")[0];
    for (let i = 0; i < jogadas.length; i++) {
      // limpa o tabuleiro
      jogadas[i].innerText = "";
    }

    vez === "X" ? X++ : O++;
    placar.innerHTML = `<span>${X}</span> X <span>${O}</span>`;
    placar.style.visibility = "visible";

    const letraX = placar.children[0];
    letraX.style.color = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--azul");
    const letraO = placar.children[1];
    letraO.style.color = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--laranja");

    modal.showModal();
    stringVitoria.innerText = `${vez} ganhou`;
    posicoesJogadasX = [];
    posicoesJogadasO = [];
    posicoesAJogar = posicoesDisponiveis;
  }
}
