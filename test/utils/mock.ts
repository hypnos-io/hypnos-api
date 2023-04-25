import {randomUUID} from 'crypto'

export function generateMockName(prefix = 'TEST') {
  const uuid = randomUUID().toString()
  return `${prefix}-${uuid}`
}
