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
    hintOneShow = false
    hintTwoShow = false
}

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
        console.log("é isso ai")
        dadosPokemon()
    }
}



function WriteHintOne(){
    if(currentPlayerMoney >= 15 & !hintOneShow){
        var hintOne = document.querySelector('#hint-one')
        hintOne.innerHTML = `<div>The pokemon is type(s): ${pokemonOnScreen.types}<\div>`
        
        currentPlayerMoney -= 15
        let moneyPlayer = document.querySelector('.money-player')
        moneyPlayer.innerHTML = `${currentPlayerMoney}`
        hintOneShow = true
    }

}

function WriteHintTwo(){
    if(currentPlayerMoney >= 25 & !hintTwoShow)
        var hintTwo = document.querySelector('#hint-two')
        hintTwo.innerHTML = `<div>The firt letter of the Pokemon is : ${pokemonOnScreen.name[0].toUpperCase()}<\div>`

        currentPlayerMoney -= 25
        let moneyPlayer = document.querySelector('.money-player')
        moneyPlayer.innerHTML = `${currentPlayerMoney}`
        hintTwoShow = true
    }

function WriteHintThree(){
    var hintThree = document.querySelector('#hint-three')
    var imagem = document.getElementById("filtro")
    imagem.style.filter = "brightness(20%)"

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