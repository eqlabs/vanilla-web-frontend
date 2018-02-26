const leverages = ["longshort.leverage.2", "longshort.leverage.5"];

const durations = [
  "longshort.duration.1-week",
  "longshort.duration.2-week",
  "longshort.duration.4-week",
  "longshort.duration.6-week",
  "longshort.duration.8-week"
];

const currencyPairs = ["longshort.currencypair.eth-usd"];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function getTemplates() {
  const N = 10;
  const delay = 500;

  const templates = [...Array(N).keys()].map((t, idx) => ({
    templateId: idx,
    leverage: randomChoice(leverages),
    duration: randomChoice(durations),
    currencyPair: randomChoice(currencyPairs)
  }));

  await new Promise(resolve => setTimeout(resolve, delay));

  return templates;
}
