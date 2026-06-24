import {
  animate,
  inView,
  stagger
} from 'motion';
import {
  vote,
  getCandidates,
  getRates,
  getWinner,
  resetCandidates
} from './candidates.js';

/* 票数表示 */

const updateVoteText = () => {

  getCandidates().forEach(({ id, votes }) => {

    const card =
      document.querySelector(
        `[data-id="${id}"]`
      );

    card.querySelector('.votes')
      .textContent =
      `${votes}票`;

  });

};

/* バー更新 */

const animateBars = () => {

  getRates().forEach(({ id, rate }) => {

    const bar =
      document.querySelector(
        `[data-id="${id}"] .bar`
      );

    animate(
      bar,
      {
        width: `${rate}%`
      },
      {
        duration: 0.5,
        easing: 'ease-out'
      }
    );

  });

};

/* No.1表示 */

const updateWinner = () => {

  const winnerId = getWinner();

  document.querySelectorAll('.card')
    .forEach((card) => {

      card.classList.remove('winner');

      if (
        winnerId !== null &&
        Number(card.dataset.id) === winnerId
      ) {

        card.classList.add('winner');

      }

    });

};

/* ボタンクリック */

document
  .querySelectorAll('.card')
  .forEach((card) => {

    const id =
      Number(card.dataset.id);

    const btn =
      card.querySelector('.vote-btn');

    btn.addEventListener('click', () => {

      /* 投票 */

      vote(id);
      updateVoteText();

      /* ボタン */

      animate(
        btn,
        {
          scale: [1, 0.9, 1.2, 1],
          rotate: [0, -5, 5, 0]
        },
        {
          duration: 0.5
        }
      );

      /* カード */

      animate(
        card,
        {
          y: [0, -15, 0]
        },
        {
          duration: 0.4
        }
      );

      /* 票数 */

      const voteText =
        card.querySelector('.votes');

      animate(
        voteText,
        {
          scale: [1, 1.5, 1]
        },
        {
          duration: 0.4
        }
      );

      animateBars();

      updateWinner();

    });
    /* =========================
   セクションフェードイン
========================= */

    const sections =
      document.querySelectorAll('.fade-section');

    sections.forEach((section) => {

      section.style.opacity = 0;

      inView(section, () => {

        animate(
          section,
          {
            opacity: [0, 1],
            y: [80, 0]
          },
          {
            duration: 0.8,
            easing: 'ease-out'
          }
        );

      });

    });

    /* =========================
       カードスタガー
    ========================= */

    const cards =
      document.querySelectorAll('.card');

    cards.forEach((card) => {

      card.style.opacity = 0;

    });

    inView(
      '#voteList',
      () => {

        animate(
          cards,
          {
            opacity: [0, 1],
            y: [100, 0],
            scale: [0.8, 1]
          },
          {
            duration: 0.7,
            delay: stagger(0.2),
            easing: 'ease-out'
          }
        );

      }
    );
  });

const resetButton = document.querySelector("#resetBtn");
resetButton.addEventListener("click", () => {
  if (!confirm("票数をリセットしますか？")) return;
  resetCandidates();
  updateVoteText();
  animateBars();          // ← リセット後にバーも初期状態へ戻す
  updateWinner();
});

updateVoteText();
animateBars();
updateWinner();
