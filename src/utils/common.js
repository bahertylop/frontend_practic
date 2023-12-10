export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);