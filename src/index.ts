import {readFileSync} from 'fs'
const content = readFileSync('package.json', 'utf-8')
console.log(content)
