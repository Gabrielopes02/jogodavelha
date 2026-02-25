var posicoesAJogar = new Array(1,2,3,4,5,6,7,8,9)
var posicoesJogadasX = new Array()
var posicoesJogadasO = new Array()
var vez = 'X'
const buttonHome = document.getElementById('buttonHome')
const modal = document.getElementById('modal')
const btnfecharModal = document.getElementById('closeModal')

btnfecharModal.addEventListener('click', () => {
    modal.close()
    
})





function jogadas(numero) {
let achei = true
    if (posicoesJogadasX.length == 0) {// começo do jogo arrayX zerado
        posicoesJogadasX.push(numero.id)
        numero.innerText = vez
    }
    else {// array nao zerado
        posicoesJogadasX.forEach((i) => {// verifica se a posicao nao foi jogada
           
            if (i == numero.id) {
                alert('numeros iguais')
                achei = false
            }
            else {
                
            }
        })
        if (achei) {
           if(vez == 'X'){
           posicoesJogadasX.push(numero.id)
               
           } else {
               posicoesJogadasO.push(numero.id)
            }
            numero.innerText = vez
       }
    }
    posicoesAJogar = posicoesAJogar.filter((i) => i != numero.id)



    vez = vez == 'O' ? 'X' : 'O'
    
        let arrayteste = new Array(23,22,12,22,13)
        quemGanhou(posicoesJogadasX,'X')
         quemGanhou(posicoesJogadasO,'O')
    
}



function quemGanhou(arrayjogadas,vez) {
    let soma = 0
    let ganhouD = 0
    let ganhouD2 = 0
    let ganhou = 0 
    let suporte = [1, 2, 3]
  
    for ( let i = 0; i < arrayjogadas.length; i++){

        let stringNumX = arrayjogadas[i].toString()
        for (let digitoX of stringNumX) {//somar 2 algarismos em x
            soma+= parseInt(digitoX)
        }
        ganhouD = soma == 4 ? ganhouD += 1 : ganhouD
        
        
        soma = 0 
        

      
         
    }

   
    let linhas = arrayjogadas.map((x) => Math.trunc(x / 10))
    numRepetidos(linhas)
    let colunas = arrayjogadas.map((x) => x % 10)
    numRepetidos(colunas)


    function numRepetidos(vetorTeste) {
        let repetidos = vetorTeste.filter((item, index) => vetorTeste.indexOf(item) !== index)
        let um = 0
        let dois = 0
        let tres = 0
        repetidos.forEach((i) => {
            if (i == 1) {
            um++
            }
            if (i == 2) {
            dois++
            }
            if (i == 3) {
            tres++
            }
            if (um > 1 || dois > 1 || tres > 1) {
                ganhou = 3
                
            }

        })
    }
   



      if (ganhou == 3|| ganhouD == 3) {
        
          let jogadas = document.getElementsByClassName('jogadas')
         
          for (let i = 0; i < jogadas.length;i++) {
             jogadas[i].innerText = ''
            
              
          }
        
        modal.showModal()
    }
}

