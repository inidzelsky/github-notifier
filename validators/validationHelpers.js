'use strict';

const isEmail = input => {
  const regExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9.]+\.[a-zA-Z0-9.]+$/;
  return regExp.test(input);
};

const isLength = (input, { min = 1, max = input.length }) => {
  if (min > max)
    return false;

  const regExp = new RegExp(`^.{${[min, max]}}$`);
  return regExp.test(input);
};

const isEmpty = input => input === '';

const isUnique = array => {
  for (const c of array) {
    const filtered = array.filter(v => v !== c);
    if (array.length - filtered.length > 1)
      return false;
  }

  return true;
};

module.exports = {
  isEmail,
  isLength,
  isUnique,
  isEmpty
};