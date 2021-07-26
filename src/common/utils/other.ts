export function isNil(val: any) {
  return val === null || val === undefined
}

export function isNotNil(val: any) {
  return !isNil(val)
}
