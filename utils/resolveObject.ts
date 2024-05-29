import { resolveArray } from './resolveArray';

export const resolveObject = (name: string, object: any) => {
  let stringToReturn = '';
  for (const [key, value] of Object.entries(object)) {
    if (value instanceof Object) {
      stringToReturn += resolveObject(`${name}[${key}]`, value);
      continue;
    }
    if (value instanceof Array) {
      stringToReturn += resolveArray(`${name}[${key}]`, value);
      continue;
    }
    stringToReturn += `${name}[${key}]:${value}\n`;
  }
  return stringToReturn;
};
