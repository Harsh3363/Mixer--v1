import path from 'path'
import crypto from 'crypto'

export const ellipseAddress = (address: string, width = 5) =>
  address && address.length > 2 * width
    ? `${address.slice(0, width)}...${address.slice(-width)}`
    : address

export const maskPhone = (address: string, width = 5) =>
  address && address.length > width + 2
    ? `${address.slice(0, width)}xxx${address.slice(-3)}`
    : address

export const ellipseName = (address: string, width = 15) =>
  address && address.length > width ? `${address.slice(0, width)}...` : address

export const rounded = (balance: string, length = 6) =>
  balance && balance.length > length ? balance.slice(0, length) : balance

const _baseUrl = (chainId?: number) => {
  switch (chainId) {
    case 80001:
      return 'https://mumbai.polygonscan.com/'
    case 4:
      return 'https://rinkeby.etherscan.io/'
    default:
      throw Error(`value: ${chainId} is not a valid chainId`)
  }
}

export const createUrlToken = (address = '', chainId?: number) =>
  path.join(_baseUrl(chainId), 'token', address)

export const createUrlAddress = (address = '', chainId?: number) =>
  path.join(_baseUrl(chainId), 'address', address)

export class NRegex extends RegExp {
  nonStickyTest = (str: string) => {
    this.lastIndex = 0
    let result = this.test(str)
    this.lastIndex = 0
    return result
  }
}
export const phoneRegex = new NRegex(/^[\+]?\d{7,}$/g)
export const phoneRegexLoose = new NRegex(/^[\+]?\d+$/g)
export const emailRegex = new NRegex(
  /^[^<>(){}\[\]\\/\|.\+\?!,;:\s@"'`=]+(\.[^<>(){}\[\]\\/\|.\+\?!,;:\s@"'`=]+)*@([\w\-]+\.([\w\-]{2,}\.)*[a-zA-Z]{2,9})$/g
)
export const hexRegex = new NRegex(/^(0[xX])[a-fA-F0-9]{16,}$/g)
export const hexRegexLoose = new NRegex(/^(0[xX])?[a-fA-F0-9]*$/g)
export const isNumeric = (str?: string) => !isNaN(Number(str))
export const isEmailString = (str?: string, strict = false) =>
  !emptyString(str) && emailRegex.nonStickyTest(str)
export const isPhoneString = (str?: string, strict = false) =>
  !emptyString(str) &&
  0 !== Number(str) &&
  (strict
    ? str.startsWith('+') && phoneRegex.nonStickyTest(str)
    : '+' === str || phoneRegexLoose.nonStickyTest(str))
export const isHexString = (str?: string, strict = false) =>
  !emptyString(str) &&
  (strict ? hexRegex.nonStickyTest(str) : hexRegexLoose.nonStickyTest(str))

export const emptyString = (str?: string) => !str?.trim()

export const randomString = (length = 16, format: BufferEncoding = 'hex') =>
  crypto
    .randomBytes(length * 3)
    .toString(format)
    .substring(0, length)
