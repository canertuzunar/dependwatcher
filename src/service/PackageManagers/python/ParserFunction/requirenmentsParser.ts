import { pt2json } from 'pt2json/lib';

/**
 * @param text
 * @returns object
 * replace semantic version symbols to equal symbol
 * convert text to json with pt2json
 * delete __params field
 */
export default function requirenmentParser(text: string): {
  [key: string]: { [key: string]: string };
} {
  const removeEqualitySymbol = text.trim().replace(/(==|<=|~=|>=)/gm, '=');
  const convertedToJSON = pt2json(removeEqualitySymbol, {});
  delete convertedToJSON.__params;
  return { dependencies: convertedToJSON };
}
