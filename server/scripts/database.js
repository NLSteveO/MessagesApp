/* eslint-disable no-console */ // Remove once a logger is added
'use strict';

const path = require('path');
const Promise = require('bluebird');
const pgPromise = require('pg-promise')({ promiseLib: Promise });
const database = pgPromise('postgres://messenger:messenger@127.0.0.1:5432/messages_app');

function getQueryFile(file) {
  const fullPath = path.join(__dirname, 'sql', file);
  return new pgPromise.QueryFile(fullPath, { minify: true });
}

async function initialize() {
  await database.any(getQueryFile('createTables.sql'))
    .then(() => {
      return console.log('Initialize success!');
    })
    .catch((error) => {
      throw new Error(`Failed to create tables in createTables.sql\n\n${error}`);
    });
}

async function seed() {
  await database.any(getQueryFile('insertSampleMessages.sql'))
    .then(() => {
      return console.log('Database seeding success!');
    })
    .catch((error) => {
      throw new Error(`Failed to seed tables in database\n\n${error}`);
    });
}

async function main() {
  if (process.argv.length < 3) {
    console.log('An argument of initialize or seed must be provided.');
  } else if (process.argv[2] === 'initialize') {
    try {
      await initialize();
    } catch (error) {
      console.error('Initialise Error:', error);
    }
  } else if (process.argv[2] === 'seed') {
    try {
      await seed();
    } catch (error) {
      console.error('Seed Error:', error);
    }
  } else {
    console.log('The argument provided was invalid.');
  }
}

main();
