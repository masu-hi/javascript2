import { animate } from "motion";

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

const typeThemeMap = {
    normal: { accent: "#8b93a1", strong: "#5f6877", soft: "rgba(139, 147, 161, 0.16)", wash: "rgba(226, 232, 240, 0.72)" },
    fire: { accent: "#e4572e", strong: "#b83218", soft: "rgba(228, 87, 46, 0.16)", wash: "rgba(255, 234, 224, 0.78)" },
    water: { accent: "#2484c6", strong: "#1e6091", soft: "rgba(36, 132, 198, 0.16)", wash: "rgba(226, 244, 255, 0.78)" },
    electric: { accent: "#d4a017", strong: "#a8790a", soft: "rgba(212, 160, 23, 0.18)", wash: "rgba(255, 247, 199, 0.82)" },
    grass: { accent: "#4b9f50", strong: "#2f7a39", soft: "rgba(75, 159, 80, 0.16)", wash: "rgba(228, 247, 229, 0.8)" },
    ice: { accent: "#4aa8c7", strong: "#2b7f9c", soft: "rgba(74, 168, 199, 0.16)", wash: "rgba(225, 248, 251, 0.8)" },
    fighting: { accent: "#d06826", strong: "#a24719", soft: "rgba(208, 104, 38, 0.16)", wash: "rgba(255, 236, 224, 0.8)" },
    poison: { accent: "#9b5cf6", strong: "#6f35d9", soft: "rgba(155, 92, 246, 0.16)", wash: "rgba(243, 233, 255, 0.8)" },
    ground: { accent: "#c07d28", strong: "#8f5b1b", soft: "rgba(192, 125, 40, 0.16)", wash: "rgba(255, 240, 217, 0.82)" },
    flying: { accent: "#53a7d8", strong: "#2f83b4", soft: "rgba(83, 167, 216, 0.16)", wash: "rgba(229, 245, 255, 0.8)" },
    psychic: { accent: "#d95f95", strong: "#b03e75", soft: "rgba(217, 95, 149, 0.16)", wash: "rgba(255, 232, 241, 0.82)" },
    bug: { accent: "#86b420", strong: "#628310", soft: "rgba(134, 180, 32, 0.16)", wash: "rgba(242, 249, 221, 0.8)" },
    rock: { accent: "#7a8595", strong: "#596476", soft: "rgba(122, 133, 149, 0.16)", wash: "rgba(233, 238, 245, 0.8)" },
    ghost: { accent: "#6b63c7", strong: "#4b43a1", soft: "rgba(107, 99, 199, 0.16)", wash: "rgba(233, 232, 251, 0.8)" },
    dragon: { accent: "#c79d2a", strong: "#9b7713", soft: "rgba(199, 157, 42, 0.16)", wash: "rgba(255, 244, 211, 0.82)" },
    dark: { accent: "#7a675c", strong: "#57463c", soft: "rgba(122, 103, 92, 0.16)", wash: "rgba(237, 232, 227, 0.8)" },
    steel: { accent: "#8ea0b7", strong: "#64748b", soft: "rgba(142, 160, 183, 0.16)", wash: "rgba(233, 239, 246, 0.8)" },
    fairy: { accent: "#e36cae", strong: "#b54f86", soft: "rgba(227, 108, 174, 0.16)", wash: "rgba(255, 236, 246, 0.82)" }
};

export const renderPokemon = (data) => {
    const firstType = data.types[0].type.name;
    const theme = typeThemeMap[firstType] ?? typeThemeMap.normal;

    const types =
        data.types
            .map(type =>
                typeMap[type.type.name]
            )
            .join(" / ");

    card.innerHTML = `
    <div class="pokemon-card ${firstType}" style="--type-accent: ${theme.accent}; --type-accent-strong: ${theme.strong}; --type-accent-soft: ${theme.soft}; --type-wash: ${theme.wash};">

        <div class="card-header">
            <div class="header-left">
                <h2>${data.japaneseName}</h2>
            </div>
            <div class="header-right">
                <span class="hp-label">HP</span>
                <span class="hp-value">${data.stats[0].base_stat}</span>
            </div>
        </div>

        <div class="card-image">
            <img
                src="${data.sprites.front_default}"
                alt="${data.name}"
            >
        </div>

        <div class="card-sub-info">
            全国図鑑 No.${String(data.id).padStart(4, '0')} | ${types}
        </div>

        <div class="card-profile">
            <div class="profile-item">
                <span class="profile-label">図鑑番号</span>
                <span class="profile-value">No.${String(data.id).padStart(4, '0')}</span>
            </div>
            <div class="profile-item">
                <span class="profile-label">高さ</span>
                <span class="profile-value">${data.height / 10}m</span>
            </div>
            <div class="profile-item">
                <span class="profile-label">重さ</span>
                <span class="profile-value">${data.weight / 10}kg</span>
            </div>
        </div>

        <div class="card-footer">
            <span class="illus">illus. PokeAPI</span>
            <span class="rarity">◆ rarity: rare</span>
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

    if (isLoading) {
        loader.hidden = false;
        loader.classList.remove("is-active");
        void loader.offsetWidth;
        loader.classList.add("is-active");
    } else {
        loader.classList.remove("is-active");
        loader.hidden = true;
    }

    if (isLoading) {

        card.hidden = true;

        errorEl.hidden = true;

    }

};

//関数式＋アロー関数　関数の定義　exportされている
// export const renderPokemon = (data, jpName) => {
//     const displayName = jpName ?? data.name;
//     card.innerHTML = `
//     <h2>${displayName} <small>(${data.name})</small></h2>
//     <img src="${data.sprites.front_default}" alt="${displayName}">
//   `;
//     card.hidden = false;
//     errorEl.hidden = true;
// };
