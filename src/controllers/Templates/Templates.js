export async function getTemplates() {
  let templates = [
    {
      id: 1,
      leverage: "longshort.leverage.2x",
      duration: "longshort.duration.1-week",
      currencyPair: "longshort.currencypair.eth-usd"
    },
    {
      id: 2,
      leverage: "longshort.leverage.2x",
      duration: "longshort.duration.1-week",
      currencyPair: "longshort.currencypair.eth-btc"
    }
  ];

  await new Promise(resolve => setTimeout(resolve, 500));

  return templates;
}
