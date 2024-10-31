import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import getRanking from './utils/getRanking.js'

// Create a readline interface for reading from stdin
const rl = readline.createInterface({
  input,
  output,
  terminal: false
});

let results = '';

// Listen for new lines and add them to `results`
rl.on('line', (line) => {
  results += line + '\n';
});

// Handle the end of input
rl.on('close', () => {
  const ranking = getRanking(results.trimEnd())
  console.log(ranking);
});