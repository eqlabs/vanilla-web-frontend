import { _ } from "../../components/Localize";

export async function getTemplates({ templateActions }) {
  let templates = [
    {
      id: 1,
      leverage: "2x",
      duration: _("longshort.duration.1-week"),
      currencyPair: "ETH-USD"
    },
    {
      id: 2,
      leverage: "2x",
      duration: _("longshort.duration.4-week"),
      currencyPair: "ETH-USD"
    }
  ];

  if (typeof templateActions === "object") {
    templates = templates.map(t => {
      t.onShortClick = event => templateActions.short(t, event);
      t.onLongClick = event => templateActions.long(t, event);
      return t;
    });
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  return templates;
}
