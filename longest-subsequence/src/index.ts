/**
 * Given an input string, construct a regular expression that matches strings that the input string is a subsequence of.
 * @param {string} inStr
 * @returns {RegExp}
 */
const getPattern = (inStr: string): RegExp => (new RegExp(
  inStr.split('').reduce(
    (pattern: string, char: string): string => (
      pattern + char.replace(/([\\.^$*+?{}|])/i, '\\$1') + '.*'
    ), '.*'
  ), 'i'
));

/**
 * A string is a subsequence of another string if the second string contains every character in the first string in the same order.
 * @param {string} str
 * @param {Set<string>} dict
 * @returns {string} Either the longest word in dict of which str is a subsequence or "" if no words in dict are subsequences of str.
 */
const longestWord = (str: string, dict: Set<string>): string => {
  const orderedDict: string[] = Array.from(dict)
    .sort((a: string, b: string): number => (b.length - a.length)); // sort by decreasing length to satisfy the "longest word" property
  for (let i: number = 0; i < orderedDict.length; i++) {
    // wait to get the pattern until we're about to use it so we don't unecessesarily generate patterns for later strings if we find our winner.
    if (getPattern(orderedDict[i]).test(str)) {
      return orderedDict[i];
    }
  }
  // Did not find a match, return empty string.
  return '';
};
export default longestWord;
