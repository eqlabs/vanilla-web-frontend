import dev from "./dev.json";

function localizer(localization) {
  this.localization = Object.keys(localization).reduce(
    (tempLocalization, key) => {
      // eslint-disable-next-line
      if (typeof localization[key] === "string") {
        // eslint-disable-next-line
        tempLocalization[key] = localization[key];
      }
      return tempLocalization;
    },
    {}
  );

  this.canLocalize = function(string) {
    return this.localization.hasOwnProperty(string);
  };

  this.localize = function(string) {
    // eslint-disable-next-line
    return this.localization[string];
  };
}

const loc = new localizer(dev);

export function localize(string) {
  if (!loc.canLocalize(string)) {
    // eslint-disable-next-line
    console.warn(`No localization string for: ${string}`);
    return string;
  }
  return loc.localize(string);
}

export { localize as _ };
