import { resolveObject } from './resolveObject';

export const resolveArray = (name: string, array: any) => {
  let stringToReturn = '';
  array.forEach((value: any, index: number) => {
    if (value instanceof Object) {
      stringToReturn += resolveObject(`${name}[${index}]`, value);
      return;
    }

    if (value instanceof Array) {
      stringToReturn += resolveArray(`${name}[${index}]`, value);
      return;
    }

    stringToReturn += `${name}[${index}]:${value}\n`;
  });
  return stringToReturn;
};
