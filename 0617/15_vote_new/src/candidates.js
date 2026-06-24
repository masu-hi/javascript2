const STORAGE_KEY = "vote-2026";

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

const createInitialCandidates = () =>
  initialCandidates.map((candidate) => ({ ...candidate }));

const saveCandidates = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
};

const loadCandidates = () => {
  const savedCandidates = localStorage.getItem(STORAGE_KEY);

  if (!savedCandidates) {
    return createInitialCandidates();
  }

  try {
    return JSON.parse(savedCandidates);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return createInitialCandidates();
  }
};

let candidates = loadCandidates();

/* 投票 */

export const vote = (id) => {
  const candidate =
    candidates.find(
      candidate => candidate.id === id
    );

  if (candidate) {
    candidate.votes++;
    saveCandidates();
  }
};

/* 候補者一覧 */

export const getCandidates = () =>
  candidates.map((candidate) => ({ ...candidate }));

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
  const totalVotes =
    candidates.reduce(
      (sum, candidate) =>
        sum + candidate.votes,
      0
    );

  if (totalVotes === 0) {
    return null;
  }

  const winner =
    [...candidates].sort(
      (a, b) =>
        b.votes - a.votes
    )[0];

  return winner.id;
};

/* リセット */

export const resetCandidates = () => {
  localStorage.removeItem(STORAGE_KEY);
  candidates = createInitialCandidates();
};
