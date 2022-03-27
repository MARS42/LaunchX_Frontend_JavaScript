const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    const info = "Cargando...";
    llenarInput("nombre", info);
    llenarInput("ide", info);
    llenarInput("height", info);
    llenarInput("weight", info);

    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);

            const { id, name, height, weight, moves, types, sprites, stats } = data;

            llenarInput("nombre", name);
            llenarInput("ide", id);
            llenarInput("height", height);
            llenarInput("weight", weight);

            const movesNames = moves.map((element) => element.move.name);
            llenarLista("moves", movesNames);

            const typesNames = types.map((element) => element.type.name);
            llenarLista("types", typesNames);

            const statsValueName = stats.map((element) => [element.base_stat, element.stat.name]);

            let pokeImg = sprites.front_default;
            pokeImage(pokeImg);
        }
    });
}

const llenarInput = (id, info) => {
    const input = document.getElementById(id);
    input.value = info;
}

const llenarLista = (id, items) => {
    const ul = document.getElementById(id);
    const listItems = items.reduce((acc, i) => acc + `<li>${ i }</li>`, "");
    ul.innerHTML = listItems;
}

const

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}