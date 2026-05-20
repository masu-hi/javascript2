import { animate } from "motion";
//nodemoduleからmotionを読み込んでいる。

const btn = document.querySelector("#copyBtn");
//btn (id="copyBtn")の中の要素を取得する。
const icon = btn.querySelector(".copy-icon");
const label = btn.querySelector(".copy-label");
//letで書かれているということは、後で値が変わる可能性がある。
//フラグ
let isCopying = false;

// コピー後の状態に切り替える
//普通の関数の定義
function showCopied() {
  icon.textContent = "✅";
  label.textContent = "コピーしました";
  btn.classList.add("copied");
  animate(btn, { scale: [1, 1.08, 1] }, { duration: 0.25 });
}

// 元の状態に戻す
//関数式の関数の定義
const resetButton = function () {
  icon.textContent = "📋";
  label.textContent = "コピー";
  btn.classList.remove("copied");
  isCopying = false;
};

btn.addEventListener("click", () => {
  if (isCopying) return;
  isCopying = true;

  showCopied();
  setTimeout(resetButton, 2000);
});


//リップルボタンのJavaScript

const rippleButton = document.querySelector("#rippleBtn");
//定数を定義する場合は、大文字のスネーク記法で記述するのが慣例
const RIPPLE_SIZE = 80; // CSSのwidthと合わせる

// 左下・右下のうちクリック位置に近い方を返す
//アロー関数の関数式
const getNearestCorner = (rect, x, y) => {
  const corners = [
    { x: 0, y: rect.height },
    { x: rect.width, y: rect.height },
  ];
  return corners.reduce((a, b) => {
    const da = (a.x - x) ** 2 + (a.y - y) ** 2;
    const db = (b.x - x) ** 2 + (b.y - y) ** 2;
    return da < db ? a : b;
  });
};

// 指定位置に波紋要素を生成して追加する
function createRipple(parent, x, y, size) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  ripple.style.left = `${x - size / 2}px`;
  ripple.style.top = `${y - size / 2}px`;
  parent.appendChild(ripple);
  return ripple;
}

// 波紋を広げて消すアニメーション
const playRipple = function (ripple) {
  return animate(
    ripple,
    { scale: [0, 5], opacity: [1, 0] },
    { duration: 0.8, ease: [0.2, 0, 0.4, 1] },
  ).then(() => ripple.remove());
  //remove()は
};

rippleButton.addEventListener("click", (e) => {
  //eの引数を設定すると、clickしたelement(要素)
  console.log(e);
  //要素のサイズとブラウザ画面上での位置を取得するためのJavaScriptメソッド
  const rect = rippleButton.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;

  //関数の実行した値が変数に入る
  const nearest = getNearestCorner(rect, cx, cy);
  //入った変数の値をさらに関数に入れて、戻ってきた値がripple
  const ripple = createRipple(rippleButton, nearest.x, nearest.y, RIPPLE_SIZE);
  //rippleでアニメーションさせる関数を実行
  playRipple(ripple);
});


//チルトカードのJavaScript

const tiltCard = document.querySelector("#tiltCard");

// カード内でのマウス位置を -0.5〜0.5 の範囲に正規化する
function getNormalizedPosition(rect, clientX, clientY) {
  const x = (clientX - rect.left) / rect.width - 0.5;
  const y = (clientY - rect.top) / rect.height - 0.5;
  return { x, y };
}

// カードを傾ける
//①function 関数名
//②const 関数名　= function(){} 関数式
const tilt = function (card, x, y) {
  //motionの設定が引数の値で変化する
  animate(
    card,
    { rotateX: -y * 40, rotateY: x * 40, scale: 1.1 },
    { duration: 0.1, ease: "linear" },
  );
};

// カードを元に戻す
const resetTilt = (card) => {
  animate(
    card,
    { rotateX: 0, rotateY: 0, scale: 1 },
    { duration: 0.4, ease: "ease-out" },
  );
};

//イベントの設定（マウスを乗せたとき）
tiltCard.addEventListener("mousemove", (e) => {
  //対象となるelement
  const rect = tiltCard.getBoundingClientRect();
  //この仮数は、要素の中でのマウス位置を「-0.5~0.5」の範囲に変換します。
  //戻された値が、分割代入
  const { x, y } = getNormalizedPosition(rect, e.clientX, e.clientY);
  tilt(tiltCard, x, y);
});


//イベントの設定で、マウスを外したときに
tiltCard.addEventListener("mouseleave", () => {
  //リセットする関数の実行
  resetTilt(tiltCard);
});
