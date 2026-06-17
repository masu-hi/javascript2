export const getPokemon = async (name, signal) => {

    // 日本語→英語変換

    const speciesRes =
        await fetch(
            "https://pokeapi.co/api/v2/pokemon-species?limit=1025"
        );

    const speciesData =
        await speciesRes.json();

    const match =
        await Promise.all(
            speciesData.results.map(async (pokemon) => {

                const res =
                    await fetch(pokemon.url);

                const data =
                    await res.json();

                const jaName =
                    data.names.find(
                        n => n.language.name === "ja"
                    );

                return {
                    ja: jaName?.name,
                    en: pokemon.name
                };

            })
        );
    console.log(
        match.find(
            p => p.en === "pikachu"
        )
    );

    const found =
        match.find(
            p => p.ja === name
        );

    const pokemonName =
        found ? found.en : name;

    // ポケモン取得

    const res =
        await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
            { signal }
        );

    if (!res.ok) {
        throw new Error(
            `HTTPエラー: ${res.status}`
        );
    }

    const data =
        await res.json();

    // 日本語名取得

    const species =
        await fetch(
            data.species.url
        );

    const speciesDetail =
        await species.json();

    const japaneseName =
        speciesDetail.names.find(
            n => n.language.name === "ja"
        );

    return {
        ...data,
        japaneseName:
            japaneseName?.name || data.name
    };

};