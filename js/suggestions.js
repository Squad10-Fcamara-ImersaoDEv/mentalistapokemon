let suggestions = []

const getPokemonsList = async function() {
    await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898')
        .then(resolve => resolve.json())
        .then(data => {
            for (let i = 0; i < data.results.length; i++) {
                suggestions.push(data.results[i].name)
            }
        })
}

getPokemonsList()