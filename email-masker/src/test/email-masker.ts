/**
 * Given a valid email address, return that addresss with asterisks in place of certain characters.
 * By default, replace every character in the username except the first and last with asterisks.
 * If the optional second parameter is given as true, also replace all but the first character
 * of the first segment of the domain name with asterisks.
 * Returns an empty string when inAddr is not a valid email address, according to my fairly lazy checking.
 * @param {string} inAddr Email address.
 * @param {boolean} hideDomain If true, also masks the first segment of the domain name. Defaults to false.
 * @returns {string} Masked email address or empty string if inAddr didn't look like a valid email address.
 */
export default function hideEmail(inAddr: string, hideDomain = false): string {
    return inAddr;
}
