import "./style.css";
import { animate } from "motion";
import { getPokemon } from "./api.js";
import { renderPokemon, showError, setLoading } from "./view.js";

animate(document.querySelector(".spinner"), { rotate: [0, 360] }, { duration: 1, repeat: Infinity, ease: "linear" });

let controller;

const load = async (name) => {
    if (controller) controller.abort();
    controller = new AbortController();

    setLoading(true);

    try {
        const data = await getPokemon(name, controller.signal);
        renderPokemon(data);
    } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
        showError("見つかりませんでした");
    } finally {
        setLoading(false);
    }
};

document.querySelector("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    load(document.querySelector("#keyword").value.trim().toLowerCase());
});


//スピナーをアニメーションさせる
// const spinner = document.querySelector(".spinner");
// animate(spinner, { rotate: [0, 360] }, { duration: 1, repeat: Infinity, ease: "linear" });

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