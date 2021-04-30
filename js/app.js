// ===== VARIABLES
let baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

// Gera um número inteiro aleatório entre 1 e 898
function getRandomPokemon() {
    min = Math.ceil(1);
    max = Math.floor(898);
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

showPokemon(getRandomPokemon())