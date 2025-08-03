import { describe, expect, it } from "vitest";
import { CrawlbyteSDK } from "./sdk";
import { TaskPayload } from "./types";
import "dotenv/config";

const sdk = new CrawlbyteSDK(process.env.API_KEY || "");

describe("CrawlbyteSDK", () => {
  it("should create a task successfully", async () => {
    const payload: TaskPayload = {
      type: "universal",
      input: ["https://example.com"],
    };

    const task = await sdk.createTask(payload);

    expect(task).toHaveProperty("id");
    expect(task.type).toBe("universal");
  });
});
