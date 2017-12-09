#!/usr/bin/env node

import program from 'commander';

program.description('Moves CLI')
  .command('setup', 'Authentication')
  .command('summary', 'Summary')
  .parse(process.argv);
