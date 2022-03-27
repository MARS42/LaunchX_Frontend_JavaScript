let imgs = [];

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    // const info = "Cargando...";
    // llenarInput("nombre", info);
    // llenarInput("ide", info);
    // llenarInput("height", info);
    // llenarInput("weight", info);

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

            NoID.innerHTML = "# " + id;

            // llenarInput("nombre", name);
            // llenarInput("ide", id);
            // llenarInput("height", height);
            // llenarInput("weight", weight);

            document.getElementById("peso").innerHTML = "Peso: " + weight + " Kg";
            document.getElementById("altura").innerHTML = "Altura: " + height + " m";

            const movesNames = moves.map((element) => element.move.name);
            // llenarLista("moves", movesNames);
            llenarAttacks(movesNames);

            const typesNames = types.map((element) => element.type.name);
            // llenarLista("types", typesNames);
            llenarTipos(typesNames);

            const statsValueName = stats.map((element) => element.base_stat);
            llenarStats(statsValueName);

            let pokeImg = sprites.front_default;
            imgs = [sprites.front_default, sprites.back_default];
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

const llenarTipos = (valueNames) => {
    const contenedor = document.getElementById("tipos");
    contenedor.innerHTML = '';
    valueNames.forEach((e) => {
        contenedor.innerHTML += `<div class="tipo ${e}">${e}</div>`;
    });
}

const llenarStats = (valueNames) => {
    const hp = document.getElementById("ps");
    const atk = document.getElementById("atk");
    const def = document.getElementById("def");
    const spatk = document.getElementById("spatk");
    const spdef = document.getElementById("spdef");
    const speed = document.getElementById("speed");

    hp.innerHTML = valueNames[0];
    atk.innerHTML = valueNames[1];
    def.innerHTML = valueNames[2];
    spatk.innerHTML = valueNames[3];
    spdef.innerHTML = valueNames[4];
    speed.innerHTML = valueNames[5];
}

const llenarAttacks = (moves) => {
    const cont = document.getElementById("attacks");
    cont.innerHTML = "";
    moves.forEach((e) => {
        cont.innerHTML += "<p>" + e + "</p>";
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}