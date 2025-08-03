import { Client } from "./client";
import { PollOptions, Task, TaskPayload } from "./types";

export class CrawlbyteSDK {
  private client: Client;

  constructor(apiKey: string) {
    this.client = new Client("https://api.crawlbyte.ai/api", apiKey);
  }

  async createTask(payload: TaskPayload): Promise<Task> {
    return this.client.doRequest<Task>("POST", "/tasks", payload);
  }

  async getTask(id: string): Promise<Task> {
    return this.client.doRequest<Task>("GET", `/tasks/${id}`);
  }

  async pollTask(id: string, opts: PollOptions): Promise<Task> {
    const interval = opts.intervalSeconds * 1000;
    const timeout = opts.timeoutSeconds * 1000;
    const deadline = Date.now() + timeout;

    while (true) {
      const task = await this.getTask(id);

      if (task.status === "completed" || task.status === "failed") {
        return task;
      }

      if (Date.now() > deadline) {
        throw new Error(`Timeout reached while polling task ${id}`);
      }

      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}
