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
    }
];

/* 投票 */

export const vote = (id) => {

    const candidate =
        candidates.find(
            candidate => candidate.id === id
        );

    if (candidate) {

        candidate.votes++;

        const card =
            document.querySelector(
                `[data-id="${id}"]`
            );

        card.querySelector('.votes')
            .textContent =
            `${candidate.votes}票`;

    }

};

/* 得票率 */

export const getRates = () => {

    const totalVotes =
        candidates.reduce(
            (sum, candidate) =>
                sum + candidate.votes,
            0
        );

    return candidates.map(
        (candidate) => ({

            id: candidate.id,

            rate:
                totalVotes === 0
                    ? 0
                    : candidate.votes /
                    totalVotes * 100

        })
    );

};

/* 現在1位 */

export const getWinner = () => {

    const winner =
        [...candidates].sort(
            (a, b) =>
                b.votes - a.votes
        )[0];

    return winner.id;

};