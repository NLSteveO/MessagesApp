'use strict';

const promise = require('bluebird');
const pgPromise = require('pg-promise')({ promiseLib: promise });

class Messages {
  constructor() {
    this._database = pgPromise('postgres://messenger:messenger@127.0.0.1:5432/messages_app');
  }

  async find() {
    try {
      return await this._database.any('SELECT * FROM messages;');
    } catch (error) {
      throw new Error(`Could not get messages. Error: ${error}`);
    }
  }

  async get(id) {
    try {
      return await this._database.one(`SELECT * FROM messages WHERE id = ${id};`, { id });
    } catch (error) {
      throw new Error(`Message with id ${id} not found. Error: ${error}`);
    }
  }

  async create({ text }) {
    try {
      return await this._database.none(`INSERT INTO messages(text) VALUES(${text});`, { text });
    } catch (error) {
      throw new Error(`Failed to create message with ${text}. Error: ${error}`);
    }
  }

  async patch(id, { text }) {
    try {
      return await this._database.none(`UPDATE messages SET text = ${text} WHERE id = ${id};`, { id, text });
    } catch (error) {
      throw new Error(`Failed to update message with ${text} for message with id ${id}. Error: ${error}`);
    }
  }

  async remove(id) {
    try {
      return await this._database.none(`DELETE FROM messages WHERE id = ${id};`, { id });
    } catch (error) {
      throw new Error(`Failed to delete message with id ${id}. Error: ${error}`);
    }
  }
}

module.exports = Messages;
