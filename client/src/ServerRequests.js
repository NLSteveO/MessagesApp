import request from 'request-promise';

class ServerRequests {
  constructor() {
    this.url = 'http://localhost:4000';
  }

  async getAllMessages() {
    try {
      const options = {
        url: `${this.url}/messages`,
        json: true,
      };

      return await request(options);
    } catch (error) {
      return console.error(`Error: Failed to getAllMessages. ${error}`);
    }
  }

  async getMessageWithId(id) {
    try {
      const options = {
        url: `${this.url}/messages/${id}`,
        json: true,
      };

      return await request(options);
    } catch (error) {
      return console.error(`Error: Failed to get message with id ${id}. ${error}`);
    }
  }

  async createMessage(text) {
    try {
      const options = {
        method: 'POST',
        url: `${this.url}/messages`,
        json: true,
        body: {
          text,
        },
      };

      return await request(options);
    } catch (error) {
      return console.error(`Error: Failed to create message with text: ${text}\n\n${error}`);
    }
  }

  async patchMessage(id, text) {
    try {
        const options = {
            method: 'PATCH',
            url: `${this.url}/messages/${id}`,
            json: true,
            body: {
                text,
            },
        };

        return await request(options);
    } catch (error) {
        return console.error(`Error: Failed to patch message with id ${id} and given text: ${text}\n\n${error}`);
    }
  }

  async deleteMessage(id) {
    try {
        const options = {
            method: 'DELETE',
            url: `${this.url}/messages/${id}`,
            json: true
        };

        return await request(options);
    } catch (error) {
        return console.error(`Error: Failed to delete message with id ${id}. ${error}`);
    }
  }
}

export default ServerRequests;
