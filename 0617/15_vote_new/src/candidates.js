//local storage 用のキー
const STORAGE_KEY = "vote-2026";

//初期値に変更しました
const initialCandidates = [
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

// ⬇ 追加：起動時にLocalStorageから読み込む（無ければ初期値）
const loadCandidates = () => {
    //local storage から"vote-2026"をキーにもつ値を取得
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialCandidates;
};

// ⬇ 追加：投票後にlocal storageに保存する
//関数の定義（引数つき）
const saveCandidates = (candidates) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
};

// ⬇ 書き換え：const → let（map()で作り直すため）+ 初期値を loadCandidates から
//変数（let)の宣言←関数の実行した結果(return戻り値)
let candidates = loadCandidates();

console.log(candidates);

// ⬇ 既存の vote を「イミュータブル更新 + 保存」に書き換え
export const vote = (id) => {
    candidates = candidates.map((c) =>
        c.id === id ? { ...c, votes: c.votes + 1 } : c
    );
    saveCandidates(candidates);
    updateVoteText();
};
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

// ⬇ 末尾に追加：リセット用にexport
export const resetCandidates = () => {
    localStorage.removeItem(STORAGE_KEY);
    candidates = initialCandidates.map((c) => ({ ...c }));
    updateVoteText();
};

// ⬇ 末尾に追加：起動時に、読み込んだ票数を画面へ反映する
updateVoteText();
