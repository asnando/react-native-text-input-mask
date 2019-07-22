const removeOptionalMaskCharacters = mask => mask.replace(/\?/g, '');

const containsCharacter = value => /[A-Za-z0-9]/.test(value);
const containsUnderscore = value => /_/.test(value);
const containsCharactersSeparatedByUnderscore = value => /[A-Za-z0-9]_[A-Za-z0-9]/.test(value);

const resolveRawMaskWithUnderscores = mask => (
  removeOptionalMaskCharacters(mask.replace(/(\d|\w)/g, '_'))
);

const removeMaskUnderscoresPreceededWithCharacters = value => value.replace(/([A-Za-z0-9])_/, '$1');

const countCharactersFromString = value => (
  /[A-Za-z0-9]/.test(value) ? value.match(/[A-Za-z0-9]/g).length : 0
);

const countUnderscoresFromString = value => (
  /_/.test(value) ? value.match(/_/g).length : 0
);

const countCharactersFromMask = countCharactersFromString;
const countCharactersFromMaskedValue = countCharactersFromString;
const countUnderscoresFromMask = countUnderscoresFromString;

const maskHaveOptionalCharacters = mask => /\?/.test(mask);

const truncateStringWithUnderscore = (string, index, pad = 0) => {
  const before = string.substring(0, index);
  const after = string.substring(index + pad, string.length);
  return `${before}_${after}`;
};

const removeSpecialCharactersFromMaskedValue = value => value.replace(/\W/g, '');

const whichIndexWasRemovedFromString = (value, prevValue) => {
  let deletedIndex = -1;
  for (let i = 0; i < prevValue.length; i += 1) {
    if (value.charAt(i) !== prevValue.charAt(i)) {
      deletedIndex = i;
      break;
    }
  }
  return deletedIndex;
};

// This will distribute every character or digit into the respectives respecting the
// underscores from the mask configuration notation.
const resolveMaskWithValue = (mask, value) => {
  let valueIndex = 0;
  let maskedValue = mask.split('').map((char) => {
    if (/\W/.test(char)) {
      return char;
    }
    valueIndex += 1;
    if (
      (value.charAt(valueIndex - 1) === '')
      || (/\d/.test(char) && !/\d/.test(value.charAt(valueIndex - 1)))
      || (containsCharacter(char) && !containsCharacter(value.charAt(valueIndex - 1)))
    ) {
      return '_';
    }
    return value.charAt(valueIndex - 1);
  }).join('');
  maskedValue = removeOptionalMaskCharacters(maskedValue);
  return maskedValue;
};

const resolveMaskedValue = (mask, value, prevValue, cursorSelection) => {
  try {
    let maskedValue = value;

    // Handle if mask have optional characters notation(?).
    if (maskHaveOptionalCharacters(mask)) {
      if (countCharactersFromMaskedValue(maskedValue) > (countCharactersFromMask(mask) - 1)) {
        // eslint-disable-next-line no-param-reassign
        mask = removeOptionalMaskCharacters(mask);
      } else if (
        countCharactersFromMaskedValue(maskedValue) === (countCharactersFromMask(mask) - 1)
      ) {
        const optionalCharactersCounter = mask.match(/\?/).length;
        const rgxpRemoveOptional = new RegExp(`_{${optionalCharactersCounter}}`);
        maskedValue = maskedValue.replace(rgxpRemoveOptional, '');
      }
    }

    // Check again if reached the max mask length after the optional
    // characters handling.
    if (countCharactersFromMaskedValue(value) > countCharactersFromMask(mask)) {
      return prevValue;
    }

    // If actual value is shorter than the previous value.
    if ((maskedValue.length - prevValue.length) === -1) {
      // Detect which character was removed from the string.
      const deletedIndex = whichIndexWasRemovedFromString(maskedValue, prevValue);
      // Could not detect what changed.
      if (deletedIndex < 0) {
        return maskedValue;
      }
      // If deleted character is a non value then erase the last valid value
      // before the position and reallocate the cursor.
      const deletedChar = prevValue.charAt(deletedIndex);
      if (/[\W_]/.test(deletedChar)) {
        for (let i = deletedIndex - 1; i >= 0; i -= 1) {
          const char = prevValue.charAt(i);
          if (containsCharacter(char)) {
            // eslint-disable-next-line no-param-reassign
            prevValue = truncateStringWithUnderscore(prevValue, i, 1);
            break;
          }
        }
        return prevValue;
      }
      return truncateStringWithUnderscore(maskedValue, deletedIndex);
    }

    // If user pasted the value with the same size of the mask.
    if (containsCharacter(maskedValue)
      && (countCharactersFromMaskedValue(maskedValue) === countCharactersFromMask(mask))) {
      maskedValue = maskedValue.replace(/(\W)|(_)/g, '');
    }

    // If user pasted a value with more than 1 character changed.
    if ((maskedValue.length - mask.length) >= 2) {
      let matches = 0;
      const size = maskedValue.length - mask.length;
      const { start: startsAt } = cursorSelection;
      maskedValue = maskedValue.split('').filter((char, index) => {
        if (containsUnderscore(char)) {
          if (matches < size) {
            if (startsAt >= 0 && index < startsAt) {
              return true;
            }
            matches += 1;
            return false;
          }
        }
        return true;
      }).join('');
    } else if (containsCharactersSeparatedByUnderscore(maskedValue)) {
      maskedValue = removeMaskUnderscoresPreceededWithCharacters(maskedValue);
    }

    // Remove all special characters remaining only characters and spaces.
    maskedValue = removeSpecialCharactersFromMaskedValue(maskedValue);
    return resolveMaskWithValue(mask, maskedValue);
  } catch (exception) {
    return prevValue;
  }
};

class Mask {
  constructor({ name, mask }) {
    Object.assign(this, { name, mask });
  }

  maskValue(value = '', prevValue, cursorSelection = { start: 0, end: 0 }) {
    const { mask } = this;
    if (typeof value === 'string') {
      return resolveMaskedValue(mask, value, prevValue, cursorSelection);
    }
    // Return raw mask without value.
    return resolveRawMaskWithUnderscores(mask);
  }
}

export default Mask;
