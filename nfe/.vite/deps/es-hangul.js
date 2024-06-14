import "./chunk-WXXH56N5.js";

// node_modules/es-hangul/dist/index.mjs
var COMPLETE_HANGUL_START_CHARCODE = "가".charCodeAt(0);
var COMPLETE_HANGUL_END_CHARCODE = "힣".charCodeAt(0);
var NUMBER_OF_JONGSUNG = 28;
var NUMBER_OF_JUNGSUNG = 21;
var DISASSEMBLED_CONSONANTS_BY_CONSONANT = {
  // 종성이 없는 경우 '빈' 초성으로 관리하는 것이 편리하여, 빈 문자열도 포함한다.
  "": "",
  ㄱ: "ㄱ",
  ㄲ: "ㄲ",
  ㄳ: "ㄱㅅ",
  ㄴ: "ㄴ",
  ㄵ: "ㄴㅈ",
  ㄶ: "ㄴㅎ",
  ㄷ: "ㄷ",
  ㄸ: "ㄸ",
  ㄹ: "ㄹ",
  ㄺ: "ㄹㄱ",
  ㄻ: "ㄹㅁ",
  ㄼ: "ㄹㅂ",
  ㄽ: "ㄹㅅ",
  ㄾ: "ㄹㅌ",
  ㄿ: "ㄹㅍ",
  ㅀ: "ㄹㅎ",
  ㅁ: "ㅁ",
  ㅂ: "ㅂ",
  ㅃ: "ㅃ",
  ㅄ: "ㅂㅅ",
  ㅅ: "ㅅ",
  ㅆ: "ㅆ",
  ㅇ: "ㅇ",
  ㅈ: "ㅈ",
  ㅉ: "ㅉ",
  ㅊ: "ㅊ",
  ㅋ: "ㅋ",
  ㅌ: "ㅌ",
  ㅍ: "ㅍ",
  ㅎ: "ㅎ"
};
var DISASSEMBLED_VOWELS_BY_VOWEL = {
  ㅏ: "ㅏ",
  ㅐ: "ㅐ",
  ㅑ: "ㅑ",
  ㅒ: "ㅒ",
  ㅓ: "ㅓ",
  ㅔ: "ㅔ",
  ㅕ: "ㅕ",
  ㅖ: "ㅖ",
  ㅗ: "ㅗ",
  ㅘ: "ㅗㅏ",
  ㅙ: "ㅗㅐ",
  ㅚ: "ㅗㅣ",
  ㅛ: "ㅛ",
  ㅜ: "ㅜ",
  ㅝ: "ㅜㅓ",
  ㅞ: "ㅜㅔ",
  ㅟ: "ㅜㅣ",
  ㅠ: "ㅠ",
  ㅡ: "ㅡ",
  ㅢ: "ㅡㅣ",
  ㅣ: "ㅣ"
};
var HANGUL_CHARACTERS_BY_FIRST_INDEX = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ"
];
var HANGUL_CHARACTERS_BY_MIDDLE_INDEX = Object.values(DISASSEMBLED_VOWELS_BY_VOWEL);
var HANGUL_CHARACTERS_BY_LAST_INDEX = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ"
].map((consonant) => DISASSEMBLED_CONSONANTS_BY_CONSONANT[consonant]);
var QWERTY_KEYBOARD_MAP = {
  q: "ㅂ",
  Q: "ㅃ",
  w: "ㅈ",
  W: "ㅉ",
  e: "ㄷ",
  E: "ㄸ",
  r: "ㄱ",
  R: "ㄲ",
  t: "ㅅ",
  T: "ㅆ",
  y: "ㅛ",
  Y: "ㅛ",
  u: "ㅕ",
  U: "ㅕ",
  i: "ㅑ",
  I: "ㅑ",
  o: "ㅐ",
  O: "ㅒ",
  p: "ㅔ",
  P: "ㅖ",
  a: "ㅁ",
  A: "ㅁ",
  s: "ㄴ",
  S: "ㄴ",
  d: "ㅇ",
  D: "ㅇ",
  f: "ㄹ",
  F: "ㄹ",
  g: "ㅎ",
  G: "ㅎ",
  h: "ㅗ",
  H: "ㅗ",
  j: "ㅓ",
  J: "ㅓ",
  k: "ㅏ",
  K: "ㅏ",
  l: "ㅣ",
  L: "ㅣ",
  z: "ㅋ",
  Z: "ㅋ",
  x: "ㅌ",
  X: "ㅌ",
  c: "ㅊ",
  C: "ㅊ",
  v: "ㅍ",
  V: "ㅍ",
  b: "ㅠ",
  B: "ㅠ",
  n: "ㅜ",
  N: "ㅜ",
  m: "ㅡ",
  M: "ㅡ"
};
function disassembleCompleteHangulCharacter(letter) {
  const charCode = letter.charCodeAt(0);
  const isCompleteHangul = COMPLETE_HANGUL_START_CHARCODE <= charCode && charCode <= COMPLETE_HANGUL_END_CHARCODE;
  if (!isCompleteHangul) {
    return void 0;
  }
  const hangulCode = charCode - COMPLETE_HANGUL_START_CHARCODE;
  const lastIndex = hangulCode % NUMBER_OF_JONGSUNG;
  const middleIndex = (hangulCode - lastIndex) / NUMBER_OF_JONGSUNG % NUMBER_OF_JUNGSUNG;
  const firstIndex = Math.floor((hangulCode - lastIndex) / NUMBER_OF_JONGSUNG / NUMBER_OF_JUNGSUNG);
  return {
    first: HANGUL_CHARACTERS_BY_FIRST_INDEX[firstIndex],
    middle: HANGUL_CHARACTERS_BY_MIDDLE_INDEX[middleIndex],
    last: HANGUL_CHARACTERS_BY_LAST_INDEX[lastIndex]
  };
}
function hasBatchim(str) {
  const lastChar = str[str.length - 1];
  if (lastChar == null) {
    return false;
  }
  const disassembled = disassembleCompleteHangulCharacter(lastChar);
  return disassembled != null && disassembled.last !== "";
}
function hasSingleBatchim(str) {
  const lastChar = str[str.length - 1];
  if (lastChar == null || hasBatchim(lastChar) === false) {
    return false;
  }
  const disassembled = disassembleHangul(lastChar);
  return disassembled.length === 3;
}
function getChosung(word) {
  return disassembleHangulToGroups(word).reduce((chosung, [consonant]) => {
    return `${chosung}${consonant}`;
  }, "");
}
function getFirstConsonants(word) {
  return disassembleHangulToGroups(word).reduce((firstConsonants, [consonant]) => {
    return `${firstConsonants}${consonant}`;
  }, "");
}
function canBeChosung(character) {
  return hasValueInReadOnlyStringList(HANGUL_CHARACTERS_BY_FIRST_INDEX, character);
}
function canBeJungsung(character) {
  return hasValueInReadOnlyStringList(HANGUL_CHARACTERS_BY_MIDDLE_INDEX, character);
}
function canBeJongsung(character) {
  return hasValueInReadOnlyStringList(HANGUL_CHARACTERS_BY_LAST_INDEX, character);
}
function hasValueInReadOnlyStringList(list, value) {
  return list.some((item) => item === value);
}
function hasProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function disassembleHangulToGroups(str) {
  const result = [];
  for (const letter of str) {
    const disassembledComplete = disassembleCompleteHangulCharacter(letter);
    if (disassembledComplete != null) {
      result.push([...disassembledComplete.first, ...disassembledComplete.middle, ...disassembledComplete.last]);
      continue;
    }
    if (hasProperty(DISASSEMBLED_CONSONANTS_BY_CONSONANT, letter)) {
      const disassembledConsonant = DISASSEMBLED_CONSONANTS_BY_CONSONANT[letter];
      result.push([...disassembledConsonant]);
      continue;
    }
    if (hasProperty(DISASSEMBLED_VOWELS_BY_VOWEL, letter)) {
      const disassembledVowel = DISASSEMBLED_VOWELS_BY_VOWEL[letter];
      result.push([...disassembledVowel]);
      continue;
    }
    result.push([letter]);
  }
  return result;
}
function disassembleHangul(str) {
  return disassembleHangulToGroups(str).reduce((hanguls, disassembleds) => `${hanguls}${disassembleds.join("")}`, "");
}
function excludeLastElement(array) {
  const lastElement = array[array.length - 1];
  return [array.slice(0, -1), lastElement != null ? lastElement : ""];
}
function joinString(...args) {
  return args.join("");
}
function isBlank(character) {
  return /^\s$/.test(character);
}
function assert(condition, errorMessage) {
  if (condition === false) {
    throw new Error(errorMessage != null ? errorMessage : "Invalid condition");
  }
}
function combineHangulCharacter(firstCharacter, middleCharacter, lastCharacter = "") {
  if (canBeChosung(firstCharacter) === false || canBeJungsung(middleCharacter) === false || canBeJongsung(lastCharacter) === false) {
    throw new Error(`Invalid hangul Characters: ${firstCharacter}, ${middleCharacter}, ${lastCharacter}`);
  }
  const numOfMiddleCharacters = HANGUL_CHARACTERS_BY_MIDDLE_INDEX.length;
  const numOfLastCharacters = HANGUL_CHARACTERS_BY_LAST_INDEX.length;
  const firstCharacterIndex = HANGUL_CHARACTERS_BY_FIRST_INDEX.indexOf(firstCharacter);
  const middleCharacterIndex = HANGUL_CHARACTERS_BY_MIDDLE_INDEX.indexOf(middleCharacter);
  const lastCharacterIndex = HANGUL_CHARACTERS_BY_LAST_INDEX.indexOf(lastCharacter);
  const firstIndexOfTargetConsonant = firstCharacterIndex * numOfMiddleCharacters * numOfLastCharacters;
  const firstIndexOfTargetVowel = middleCharacterIndex * numOfLastCharacters;
  const unicode = COMPLETE_HANGUL_START_CHARCODE + firstIndexOfTargetConsonant + firstIndexOfTargetVowel + lastCharacterIndex;
  return String.fromCharCode(unicode);
}
var curriedCombineHangulCharacter = (firstCharacter) => (middleCharacter) => (lastCharacter = "") => combineHangulCharacter(firstCharacter, middleCharacter, lastCharacter);
var combineVowels = (vowel1, vowel2) => {
  var _a, _b;
  return (_b = (_a = Object.entries(DISASSEMBLED_VOWELS_BY_VOWEL).find(([, value]) => value === `${vowel1}${vowel2}`)) == null ? void 0 : _a[0]) != null ? _b : `${vowel1}${vowel2}`;
};
function removeLastHangulCharacter(words) {
  const disassembledGroups = disassembleHangulToGroups(words);
  const lastCharacter = disassembledGroups.at(-1);
  if (lastCharacter == null) {
    return "";
  }
  const withoutLastCharacter = disassembledGroups.filter((v) => v !== lastCharacter).map(([first2, middle2, last2]) => {
    if (middle2 != null) {
      return combineHangulCharacter(first2, middle2, last2);
    }
    return first2;
  });
  const [[first, middle, last]] = excludeLastElement(lastCharacter);
  const result = middle != null ? combineHangulCharacter(first, middle, last) : first;
  return [...withoutLastCharacter, result].join("");
}
function isHangulCharacter(character) {
  return /^[가-힣]$/.test(character);
}
function isHangulAlphabet(character) {
  return /^[ㄱ-ㅣ]$/.test(character);
}
function binaryAssembleHangulAlphabets(source, nextCharacter) {
  if (canBeJungsung(`${source}${nextCharacter}`)) {
    return combineVowels(source, nextCharacter);
  }
  const isConsonantSource = canBeJungsung(source) === false;
  if (isConsonantSource && canBeJungsung(nextCharacter)) {
    return combineHangulCharacter(source, nextCharacter);
  }
  return joinString(source, nextCharacter);
}
function linkHangulCharacters(source, nextCharacter) {
  const sourceJamo = disassembleHangulToGroups(source)[0];
  const [, lastJamo] = excludeLastElement(sourceJamo);
  return joinString(removeLastHangulCharacter(source), combineHangulCharacter(lastJamo, nextCharacter));
}
function binaryAssembleHangulCharacters(source, nextCharacter) {
  assert(
    isHangulCharacter(source) || isHangulAlphabet(source),
    `Invalid source character: ${source}. Source must be one character.`
  );
  assert(
    isHangulAlphabet(nextCharacter),
    `Invalid next character: ${nextCharacter}. Next character must be one of the chosung, jungsung, or jongsung.`
  );
  const sourceJamos = disassembleHangulToGroups(source)[0];
  const isSingleCharacter = sourceJamos.length === 1;
  if (isSingleCharacter) {
    const sourceCharacter = sourceJamos[0];
    return binaryAssembleHangulAlphabets(sourceCharacter, nextCharacter);
  }
  const [restJamos, lastJamo] = excludeLastElement(sourceJamos);
  const needLinking = canBeChosung(lastJamo) && canBeJungsung(nextCharacter);
  if (needLinking) {
    return linkHangulCharacters(source, nextCharacter);
  }
  const fixConsonant = curriedCombineHangulCharacter;
  const combineJungsung = fixConsonant(restJamos[0]);
  if (canBeJungsung(`${lastJamo}${nextCharacter}`)) {
    return combineJungsung(`${lastJamo}${nextCharacter}`)();
  }
  if (canBeJungsung(lastJamo) && canBeJongsung(nextCharacter)) {
    return combineJungsung(lastJamo)(nextCharacter);
  }
  const fixVowel = combineJungsung;
  const combineJongsung = fixVowel(restJamos[1]);
  const lastConsonant = lastJamo;
  if (hasSingleBatchim(source) && canBeJongsung(`${lastConsonant}${nextCharacter}`)) {
    return combineJongsung(`${lastConsonant}${nextCharacter}`);
  }
  return joinString(source, nextCharacter);
}
function binaryAssembleHangul(source, nextCharacter) {
  const [rest, lastCharacter] = excludeLastElement(source.split(""));
  const needJoinString = isBlank(lastCharacter) || isBlank(nextCharacter);
  return joinString(
    ...rest,
    needJoinString ? joinString(lastCharacter, nextCharacter) : binaryAssembleHangulCharacters(lastCharacter, nextCharacter)
  );
}
function assembleHangul(words) {
  const disassembled = disassembleHangul(words.join("")).split("");
  return disassembled.reduce(binaryAssembleHangul);
}
function chosungIncludes(x, y) {
  const trimmedY = y.replace(/\s/g, "");
  if (!isOnlyChosung(trimmedY)) {
    return false;
  }
  const chosungX = getChosung(x).replace(/\s/g, "");
  const chosungY = trimmedY;
  return chosungX.includes(chosungY);
}
function isOnlyChosung(str) {
  const groups = disassembleHangulToGroups(str);
  if (groups.length === 0) {
    return false;
  }
  return groups.every((disassembled) => {
    return disassembled.length === 1 && canBeChosung(disassembled[0]);
  });
}
function convertQwertyToHangulAlphabet(word) {
  return word.split("").map((inputText) => hasProperty(QWERTY_KEYBOARD_MAP, inputText) ? QWERTY_KEYBOARD_MAP[inputText] : inputText).join("");
}
function convertQwertyToHangul(word) {
  if (!word) {
    return "";
  }
  return assembleHangul([...convertQwertyToHangulAlphabet(word)]);
}
function hangulIncludes(x, y) {
  const disassembledX = disassembleHangul(x);
  const disassembledY = disassembleHangul(y);
  return disassembledX.includes(disassembledY);
}
var 로_조사 = ["으로/로", "으로서/로서", "으로써/로써", "으로부터/로부터"];
function josa(word, josa2) {
  if (word.length === 0) {
    return word;
  }
  return word + josaPicker(word, josa2);
}
josa.pick = josaPicker;
function josaPicker(word, josa2) {
  var _a;
  if (word.length === 0) {
    return josa2.split("/")[0];
  }
  const has받침 = hasBatchim(word);
  let index = has받침 ? 0 : 1;
  const is종성ㄹ = ((_a = disassembleCompleteHangulCharacter(word[word.length - 1])) == null ? void 0 : _a.last) === "ㄹ";
  const isCaseOf로 = has받침 && is종성ㄹ && 로_조사.includes(josa2);
  if (josa2 === "와/과" || isCaseOf로) {
    index = index === 0 ? 1 : 0;
  }
  const isEndsWith이 = word[word.length - 1] === "이";
  if (josa2 === "이에요/예요" && isEndsWith이) {
    index = 1;
  }
  return josa2.split("/")[index];
}
export {
  assembleHangul,
  canBeChosung,
  canBeJongsung,
  canBeJungsung,
  chosungIncludes,
  combineHangulCharacter,
  combineVowels,
  convertQwertyToHangul,
  convertQwertyToHangulAlphabet,
  curriedCombineHangulCharacter,
  disassembleCompleteHangulCharacter,
  disassembleHangul,
  disassembleHangulToGroups,
  getChosung,
  getFirstConsonants,
  hangulIncludes,
  hasBatchim,
  hasProperty,
  hasSingleBatchim,
  hasValueInReadOnlyStringList,
  josa,
  removeLastHangulCharacter
};
//# sourceMappingURL=es-hangul.js.map
