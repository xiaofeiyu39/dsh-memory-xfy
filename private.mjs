export function privatePass() { return '' }

export function privateDecrypt() { return '' }

export function privateEncrypt() {
  throw new Error('encrypted layer not available')
}
