async function getPokemon(pokemonId) {
    let pokemonData = {};
    
    await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
        .then(response => response.json())
        .then(poke => {
            pokemonData.id = poke.id
            pokemonData.name = poke.name
            pokemonData.types = poke.types.map(types => { return types.type.name; })
            pokemonData.image = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + ("00" + pokemonId).slice(-3) + ".png"
            console.log("bbbb")
            var el = document.querySelector(".cards")
            el.innerHTML += `<div class="youare" id ="bulba">
                                <img src="${pokemonData.image}" alt="imagem do ${pokemonData.name}">
                                <div class="container">
                                    <h4><strong class="nome">${pokemonData.name}</strong></h4> 
                                    <p>${pokemonData.types}</p>
                                </div>
                            </div>
                            `
            })
        .catch(() => {
            console.log("Error request pokémon. Id: " + pokemonId)
        })
    return pokemonData;
}
escrevePokemons()
async function escrevePokemons(){
    for (var i = 1;i<100; i++){
        var aa = await getPokemon(i.toString())
        console.log(aa.types)
    }
}
