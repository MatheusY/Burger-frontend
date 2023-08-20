import _ from "lodash";
export interface IURLParameters {
  [_key: string]: any;
}

export function buildUrl(
  urlPattern: string,
  urlParameters: IURLParameters,
  slugFunction: (value: string) => string = slug
): string {
  return _.reduce(
    _.keys(urlParameters),
    (url: string, key: string) => {
      const value = urlParameters[key];
      return url.replace(":" + key, slugFunction("" + value));
    },
    urlPattern
  );
}

export function slug(text: string) {
  return encodeURIComponent(
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") //remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
      .replace(/[\s_-]+/g, "-") //swap any length of whitespace, underscore, hyphen characters with a single -
      .replace(/^-+|-+$/g, "") //remove leading, trailing -
  );
}
