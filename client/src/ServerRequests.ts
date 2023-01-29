import axios, { Axios } from 'axios';
import Message from './types/Message';

class ServerRequests {
  instance: Axios;

  constructor() {
    this.instance = axios.create({ baseURL: 'http://localhost:4000' });
  }

  checkResponseAndReturn(status: Number, statusText: string): string | Error {
    if (status < 200 || status >= 300) {
      return new Error(`Did not return a status 200, instead returned status ${status} with statusText ${statusText}`);
    }
    return 'success';
  }

  async getAllMessages(): Promise<Message[] | Error> {
    try {
      const { status, statusText, data } = await this.instance.get<Message[]>('/messages');
      if (status < 200 || status >= 300) {
        return new Error(`Did not return a status 200, instead returned status ${status} with statusText ${statusText}`);
      }
      return data;
    } catch (error) {
      return new Error(`Failed to getAllMessages. ${error}`);
    }
  }

  async getMessageWithId(id: Number): Promise<Message | Error> {
    try {
      const { status, statusText, data } = await this.instance.get<Message>(`/messages/${id}`);
      if (status < 200 || status >= 300) {
        return new Error(`Did not return a status 200, instead returned status ${status} with statusText ${statusText}`);
      }
      return data;
    } catch (error) {
      return new Error(`Failed to get message with id ${id}. ${error}`);
    }
  }

  async createMessage(text: string): Promise<string | Error> {
    try {
      const { status, statusText } = await this.instance.post('/messages', { text });
      return this.checkResponseAndReturn(status, statusText);
    } catch (error) {
      return new Error(`Failed to create message with text: ${text}\n\n${error}`);
    }
  }

  async patchMessage(id: Number, text:string): Promise<string | Error> {
    try {
        const { status, statusText } = await this.instance.patch(`/messages/${id}`, { text });
        return this.checkResponseAndReturn(status, statusText);
    } catch (error) {
        return new Error(`Error: Failed to patch message with id ${id} and given text: ${text}\n\n${error}`);
    }
  }

  async deleteMessage(id: Number): Promise<string | Error> {
    try {
        const { status, statusText } = await this.instance.delete(`/messages/${id}`);
        return this.checkResponseAndReturn(status, statusText);
    } catch (error) {
        return new Error(`Error: Failed to delete message with id ${id}. ${error}`);
    }
  }
}

export default ServerRequests;
