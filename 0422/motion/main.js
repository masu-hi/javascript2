import { animate } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

//対象となる要素を取得
const box = document.querySelector("#box");
//const box = document.getElementById("box"); AI好き

//引数は３つ。１番はアニメーションさせる要素、２番はアニメーションの内容、３番はオプション（時間とかeasingの設定とか）
// animate(box, { opacity: [0, 1] }, { duration: 3 });

// 大きさが変わる
// animate(box, { scale: [1, 1.3, 1] }, { duration: 1, repeat: Infinity });

// 横に動く
// animate(box, { x: [0, 100, 0] }, { duration: 5 });

// フェードイン
// animate(box, { opacity: [0, 1] }, { duration: 3 });

// 色が変わる（背景色）
animate(box, { backgroundColor: ['#fff', '#f00'] }, { duration: 2, repeat: 5 });