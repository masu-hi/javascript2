const candidates = [

    {
        id: 1,
        votes: 0
    },

    {
        id: 2,
        votes: 0
    },

    {
        id: 3,
        votes: 0
    },

];

/* 票数更新 */

const updateVoteText = () => {

    candidates.forEach((item) => {

        const card =
            document.querySelector(
                `[data-id="${item.id}"]`
            );

        card.querySelector('.votes')
            .textContent =
            `${item.votes}票`;

    });

};

/* 得票率 */

export const getRates = () => {

    const total =
        candidates.reduce(
            (sum, item) =>
                sum + item.votes,
            0
        );

    return candidates.map((item) => ({

        id: item.id,

        rate:
            total > 0
                ? Math.round(
                    (item.votes / total) * 100
                )
                : 0,

    }));

};

/* 1位 */

export const getWinner = () => {

    let winner = candidates[0];

    candidates.forEach((item) => {

        if (item.votes > winner.votes) {

            winner = item;

        }

    });

    return winner.id;

};

/* 投票 */

export const vote = (id) => {

    const target =
        candidates.find(
            (item) => item.id === id
        );

    if (!target) return;

    target.votes++;

    updateVoteText();

};