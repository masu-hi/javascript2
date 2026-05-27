import {
    animate,
    stagger
} from 'motion';

import {
    vote,
    getRates,
    getWinner
} from './candidates.js';

/* =========================
   カード登場アニメーション
========================= */

const cards =
    document.querySelectorAll('.card');

animate(
    cards,
    {
        opacity: [0, 1],
        y: [50, 0],
        scale: [0.9, 1]
    },
    {
        duration: 0.7,
        delay: stagger(0.2),
        easing: 'ease-out'
    }
);

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

    });