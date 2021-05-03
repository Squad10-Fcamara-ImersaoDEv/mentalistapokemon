// ===== VARIABLES
let baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

// Gera um número inteiro aleatório entre 1 e 898
function getRandomPokemon() {
    min = Math.ceil(1);
    max = Math.floor(150);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Busca dados do jogador
//function getPlayerData() {}

// Seta o tempo para 30 seg

// Carrega o card da sorte
async function showPokemon(id) {
    let pokemonData = {};

    await fetch(baseUrl + id)
        .then(response => response.json())
        .then(data => {
            pokemonData.id = data.id
            pokemonData.name = data.name
            pokemonData.types = data.types.map(types => { return types.type.name; })
            pokemonData.image = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + ("00" + id).slice(-3) + ".png"
            id = ("00" + id).slice(-3)
        })
        .catch(() => {
            console.log("Error request pokémon. Id: " + id)
        })

    console.log(pokemonData.id)
    console.log(pokemonData.name)
    console.log(pokemonData.types[0])
    return pokemonData;
}
var pokemonOnScreen = []

async function dadosPokemon(){
    pokemonOnScreen = await showPokemon(getRandomPokemon())
    
    let containerMain = document.querySelector('#imagem-pokemon')
    containerMain.innerHTML = ` <img class="card-imagempokemonMedium" id="filtro" src="${pokemonOnScreen.image}" >`

    let moneyPlayer = document.querySelector('.money-player')
    moneyPlayer.innerHTML = `${currentPlayerMoney}`
    
    if (hintOneShow == true){
        var hintOne = document.querySelector('#hint-one')
        hintOne.innerHTML = ''

        var hintOneOriginal = document.querySelector('#hint-one-original')
        hintOneOriginal.classList.remove('hidden-hint')

        var buttonHintOne = document.getElementById('button-hint-one')
        buttonHintOne.classList.remove('button-used')

        hintOneShow = false
    }
    
    if (hintTwoShow == true){
        var hintTwo = document.querySelector('#hint-two')
        hintTwo.innerHTML = ''

        var hintTwoOriginal = document.querySelector('#hint-two-original')
        hintTwoOriginal.classList.remove('hidden-hint')

        var buttonHintTwo = document.getElementById('button-hint-two')
        buttonHintTwo.classList.remove('button-used')

        hintTwoShow = false
    }

    if (hintThreeShow == true){
        var hintThree = document.querySelector('#hint-three')
        hintThree.innerHTML = ''

        var hintThreeOriginal = document.querySelector('#hint-three-original')
        hintThreeOriginal.classList.remove('hidden-hint')

        var buttonHintThree = document.getElementById('button-hint-three')
        buttonHintThree.classList.remove('button-used')

        hintThreeShow = false
    }
}

var hintTwoShow = false
var hintThreeShow = false
var hintOneShow = false

//Geracoes de pokemon
var Geracoes = {
    1: {
        inicio: 1,
        fim: 151,
    },
    2: {
        inicio: 152,
        fim: 251,
    },
    3: {
        inicio: 252,
        fim: 386,
    },
    4: {
        inicio: 387,
        fim: 493,
    },
    5: {
        inicio: 494,
        fim: 649,
    },
    6: {
        inicio: 650,
        fim: 721,
    },
    7: {
        inicio: 722,
        fim: 807,
    },
    8: {
        inicio: 808,
        fim: 898,
    },
};

dadosPokemon()

//Variavel que guarda dinheiro do jogador
var currentPlayerMoney = 100

//função linkada ao botão enviar que a pessoa envia o que ta dentro do input
function sendNamePokemon(){
    var inputNomePokemon = document.querySelector('#nome-pokemon')
    inputNomePokemon = inputNomePokemon.value.toLowerCase()
    console.log(inputNomePokemon)
    console.log(pokemonOnScreen)
    if(inputNomePokemon == pokemonOnScreen.name){
        currentPlayerMoney += 25
        var imagemPokemon = document.getElementById('filtro')
        imagemPokemon.style.filter = "brightness(100%)" 
        setTimeout(dadosPokemon,3000)
        document.querySelector('#nome-pokemon').value = ""
    }
}



function WriteHintOne(){
    if(currentPlayerMoney >= 15 & !hintOneShow){
        var hintOneOriginal = document.querySelector('#hint-one-original')
        hintOneOriginal.classList.add('hidden-hint')
        var hintOne = document.querySelector('#hint-one')
        hintOne.innerHTML = `<div>Pokemon type(s): ${pokemonOnScreen.types}<\div>`
        
        var buttonHintOne = document.getElementById('button-hint-one')
        buttonHintOne.classList.add('button-used')

        currentPlayerMoney -= 15
        let moneyPlayer = document.querySelector('.money-player')
        moneyPlayer.innerHTML = `${currentPlayerMoney}`
        hintOneShow = true
    }

}

function WriteHintTwo(){
    if(currentPlayerMoney >= 25 & !hintTwoShow){
        var hintTwoOriginal = document.querySelector('#hint-two-original')
        hintTwoOriginal.classList.add('hidden-hint')
        var hintTwo = document.querySelector('#hint-two')
        hintTwo.innerHTML = `<div>Firt letter: ${pokemonOnScreen.name[0].toUpperCase()}<\div>`

        var buttonHintTwo = document.getElementById('button-hint-two')
        buttonHintTwo.classList.add('button-used')


        currentPlayerMoney -= 25
        let moneyPlayer = document.querySelector('.money-player')
        moneyPlayer.innerHTML = `${currentPlayerMoney}`
        hintTwoShow = true
    }
}

function WriteHintThree(){
    if(currentPlayerMoney >= 35 & !hintThreeShow){
        var imagem = document.getElementById("filtro")
        imagem.style.filter = "brightness(20%)"
    
        var hintThreeOriginal = document.querySelector('#hint-three-original')
        hintThreeOriginal.classList.add('hidden-hint')

        var hintThree = document.querySelector('#hint-three')
        hintThree.innerHTML = `<div>The image is already clearer<\div>`

        var buttonHintThree = document.getElementById('button-hint-three')
        buttonHintThree.classList.add('button-used')


        currentPlayerMoney -= 35
        let moneyPlayer = document.querySelector('.money-player')
        moneyPlayer.innerHTML = `${currentPlayerMoney}`
        
        hintThreeShow = true
    }
}

// function definirDificuldade(dificuldadeSelecionada) {
//     if (dificuldadeSelecionada == dificuldadeFacil || selectedDifficulty == dificuldadeNormal) {
//         imageDirectory = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'
//     } 
//     // nao funciona para geração 6/7/8
//     else if (dificuldadeSelecionada == dificuldadeDificil) {
//         imageDirectory = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/'
//     }
// }