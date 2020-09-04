const CryptoJS = require('crypto-js')
const key = CryptoJS.enc.Utf8.parse('1234567890123456')
const iv = CryptoJS.enc.Utf8.parse('1234567890123456')

export function Encrypt (word) {
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}
