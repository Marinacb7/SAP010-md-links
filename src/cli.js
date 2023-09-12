#!/usr/bin/env node
const program = require('commander');
const mdLinks = require('./index'); // Importe a função mdLinks
const chalk = require('chalk');
const Table = require('cli-table');

// Defina as opções de linha de comando
program
  .version('1.0.0')
  .description('CLI for mdLinks')
  .arguments('<path-to-file>')
  .option('--validate', 'Validate links')
  .option('--stats', 'Show link statistics')
  .parse(process.argv);

const filePath = program.args[0];
const options = {
  validate: program.validate || false,
  stats: program.stats || false,
};

mdLinks(filePath, options)
  .then((links) => {
    if (options.stats) {
      const stats = getStats(links);
      console.log(stats);
    } else {
      printLinks(links);
    }
  })
  .catch((error) => {
    console.error(chalk.red(error.message));
  });

function getStats(links) {
  const totalLinks = links.length;
  const uniqueLinks = Array.from(new Set(links.map((link) => link.href))).length;
  return `Total: ${totalLinks}\nUnique: ${uniqueLinks}`;
}

function printLinks(links) {
  const table = new Table({
    head: ['File', 'Link', 'Text'],
    colWidths: [30, 40, 40],
  });

  links.forEach((link) => {
    table.push([link.file, link.href, link.text]);
  });

  console.log(table.toString());
}
