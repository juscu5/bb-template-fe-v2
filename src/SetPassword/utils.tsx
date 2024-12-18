import sha1 from "crypto-js/sha1";
import hex from "crypto-js/enc-hex";

export const PassEncrypt = (password: string) => {
  const hash = sha1(password);
  return hash.toString(hex);
};
