import { animate, inView } from "motion";

const card = document.querySelector(".card");
const errorEl = document.querySelector(".error");
const loader = document.querySelector(".loader");



const typeMap = {
    normal: "ノーマル",
    fire: "ほのお",
    water: "みず",
    electric: "でんき",
    grass: "くさ",
    ice: "こおり",
    fighting: "かくとう",
    poison: "どく",
    ground: "じめん",
    flying: "ひこう",
    psychic: "エスパー",
    bug: "むし",
    rock: "いわ",
    ghost: "ゴースト",
    dragon: "ドラゴン",
    dark: "あく",
    steel: "はがね",
    fairy: "フェアリー"
};

export const renderPokemon = (data) => {
    const firstType = data.types[0].type.name;

    const types =
        data.types
            .map(type =>
                typeMap[type.type.name]
            )
            .join(" / ");

    card.innerHTML = `
    <div class="pokemon-card ${firstType}">

        <div class="card-header">
            <h2>${data.japaneseName}</h2>
            <div class="type-icon">
                ${types}
            </div>
            <div class="hp">
                HP ${data.stats[0].base_stat}
            </div>
        </div>

        <div class="card-image">
            <img
                src="${data.sprites.front_default}"
                alt="${data.name}"
            >
        </div>

        <div class="card-info">

            <p>
                <span>タイプ</span>
                ${types}
            </p>

            <p>
                <span>身長</span>
                ${data.height / 10}m
            </p>

            <p>
                <span>体重</span>
                ${data.weight / 10}kg
            </p>

        </div>

    </div>
`;

    card.hidden = false;
    errorEl.hidden = true;

    animate(
        card,
        {
            opacity: [0, 1],
            y: [80, 0],
            scale: [0.8, 1]
        },
        {
            duration: 0.8
        }
    );

    const pokemonCard =
        document.querySelector(".pokemon-card");

    pokemonCard.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                pokemonCard.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateY =
                (x / rect.width - 0.5) * 20;

            const rotateX =
                (y / rect.height - 0.5) * -20;

            pokemonCard.style.transform =

                `perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)`;

        });
};

export const showError = (message) => {

    errorEl.textContent = message;

    errorEl.hidden = false;

    card.hidden = true;
};

export const setLoading = (isLoading) => {

    loader.hidden = !isLoading;

    if (isLoading) {

        card.hidden = true;

        errorEl.hidden = true;

    }

};