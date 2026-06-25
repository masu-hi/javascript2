import "./style.css";
import { getPokemon } from "./api.js";
import { renderPokemon, showError, setLoading } from "./view.js";

let controller;
let activeLoadId = 0;
const MIN_LOADING_MS = 4200;

const load = async (name) => {
    const loadId = ++activeLoadId;
    let result = null;
    let failed = false;

    if (controller) controller.abort();
    controller = new AbortController();

    setLoading(true);
    const startedAt = performance.now();

    try {
        const data = await getPokemon(name, controller.signal);
        if (loadId !== activeLoadId) return;
        result = data;
    } catch (err) {
        if (loadId !== activeLoadId) return;
        if (err.name === "AbortError") return;
        console.error(err);
        failed = true;
    } finally {
        if (loadId !== activeLoadId) return;
        const elapsed = performance.now() - startedAt;
        if (elapsed < MIN_LOADING_MS) {
            await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS - elapsed));
        }
        if (loadId !== activeLoadId) return;
        setLoading(false);
    }

    if (failed) {
        showError("見つかりませんでした");
        return;
    }

    if (result) {
        renderPokemon(result);
    }
};

document.querySelector("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    load(document.querySelector("#keyword").value.trim().toLowerCase());
});
// //アロー関数 async(非同期通信)
// const getPokemon = async (name) => {
//     try {
//         const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

//         if (!res.ok) {
//             throw new Error(`HTTPエラー: ${res.status}`);
//         }

//         const data = await res.json();
//         return data;
//     } catch (err) {
//         console.error("取得に失敗しました", err);
//         throw err; // 呼び出し側にも知らせる
//     }
// };

// //戻り値を受けて、処理
// getPokemon("pikachu");

// //APIを取得して、表示する処理
// const card = document.querySelector(".card");
// const loader = document.querySelector(".loader");
// const errorEl = document.querySelector(".error");

// //アロー関数（引数name)
// const load = async (name) => {
//     loader.hidden = false;
//     errorEl.hidden = true;
//     card.hidden = true;

//     try {
//         //getPokemon関数（戻り値でポケモンのデータを消す)の実行
//         const data = await getPokemon(name);
//         //dataの中に呼び出したポケモンのデータが収集される
//         card.innerHTML = `
//       <h2>${data.name}</h2>
//       <img src="${data.sprites.front_default}" alt="${data.name}">
//     `;
//         card.hidden = false;
//     } catch (err) {
//         errorEl.textContent = "読み込みに失敗しました";
//         errorEl.hidden = false;
//     } finally {
//         loader.hidden = true;
//     }
// };

// //関数の実行
// load("bulbasaur");

// //どこかでキャンセルを実行
// controller.abort();
