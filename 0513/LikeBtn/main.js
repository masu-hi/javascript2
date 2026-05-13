// main.js
import { animate } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

let count = 0;
const btn = document.querySelector('#likeBtn');

btn.addEventListener('click', () => {
    count++;
    btn.textContent = `いいね！ ${count}`;

    //関数の実行　関数（引数）
    animate(btn, { scale: [1, 1.4, 1] }, { duration: 0.3 });

    // 操作フィードバック：短くキビキビと
    animate(btn, { scale: [1, 1.3, 1] }, { duration: 0.2, ease: 'ease-out' });

    // 結果の変化：少し余韻を残す
    animate(bar, { width: ['0%', '60%'] }, { duration: 0.4, ease: 'ease-out' });

    // 状態変化：ゆっくりフェード
    animate(btn, { opacity: [1, 0.4] }, { duration: 0.3 });
});