const objKeys = Object.keys

export const reduce = (obj = {}, fn) => objKeys(obj).reduce((res, key) => fn(res, obj[key], key), {})

export const mapValues = (obj, fn) => reduce(obj, (res, val, key) => Object.assign(res, { [key]: fn(val, key) }))

export const map = (obj, fn) => reduce(obj, (res, val, key) => fn(val, key))

export const filter = (obj, fn) => reduce(obj, (res, val, key) => (fn(val, key) ? Object.assign(res, { [key]: val }) : res))

export const pick = (obj, keys = []) => filter(obj, (val, key) => keys.indexOf(key) !== -1)