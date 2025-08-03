# Crawlbyte TypeScript SDK

Official TypeScript/JavaScript SDK for interacting with the [Crawlbyte API](https://crawlbyte.ai).

## Features

- Create scraping tasks with various templates and configurations
- Poll task status until completion
- Retrieve task results
- Support for all Crawlbyte API parameters and options
- Full TypeScript support with type definitions

## Installation

```bash
npm install @crawlbyte/crawlbyte-sdk-ts
# or
yarn add @crawlbyte/crawlbyte-sdk-ts
# or
pnpm add @crawlbyte/crawlbyte-sdk-ts
```

## Quick Start

### Initialize SDK

```typescript
import { CrawlbyteSDK } from "crawlbyte-sdk-ts";

const sdk = new CrawlbyteSDK("your-api-key");
```

### Create and Handle Tasks

```typescript
// Create a task
const task = await sdk.createTask({
  type: "universal",
  input: ["https://www.walmart.com/"],
});

console.log("Task ID:", task.id);

// Check if task completed immediately (under 20 seconds)
if (task.status === "completed" || task.status === "failed") {
  console.log("Task completed immediately");
  console.log("Result:", task.result);
  return;
}

// If still processing, poll until completion
const result = await sdk.pollTask(task.id, {
  intervalSeconds: 5,
  timeoutSeconds: 60,
});

console.log("Final Status:", result.status);
console.log("Result:", result.result);
```

### Get Task Status

```typescript
const task = await sdk.getTask("task-id");
console.log("Status:", task.status);
```

## Available Methods

- `createTask(payload: TaskPayload): Promise<Task>` - Create a new scraping task. Returns results immediately if completed within 20 seconds, otherwise returns task details for polling.
- `getTask(id: string): Promise<Task>` - Get task status and results.
- `pollTask(id: string, opts: PollOptions): Promise<Task>` - Poll task until completion (only needed if task takes longer than 20 seconds).

## Type Definitions

### TaskPayload Interface

```typescript
interface TaskPayload {
  type: string;
  url?: string;
  input?: string[];
  fields?: string[];
  dataType?: string;
  method?: string;
  jsRendering?: boolean;
  customSelector?: string;
  userAgentPreset?: string;
  userAgentCustom?: string;
  proxy?: string;
  customHeaders?: Record<string, string>;
  customHeaderOrder?: string[];
  body?: string;
  location?: string;
  sortBy?: string;
  multithread?: boolean;
}
```

### Task Interface

```typescript
interface Task {
  id: string;
  type: string;
  status: string;
  result?: any;
  // ... other fields
}
```

### PollOptions Interface

```typescript
interface PollOptions {
  intervalSeconds: number;
  timeoutSeconds: number;
}
```

## Task Configuration

The `TaskPayload` interface supports all Crawlbyte API parameters. Common fields include:

- `type` - The scraping template to use (e.g., "walmart", "universal")
- `input` - Array of URLs/Product IDs to scrape
- `fields` - Specific data fields to extract (sites that support this)
- `dataType` - Type of data to extract
- `jsRendering` - Enable JavaScript rendering
- `proxy` - Proxy configuration
- `customHeaders` - Custom HTTP headers

For a complete list of all available fields, configuration options, required parameters for each template, and detailed API documentation, visit: **[https://developers.crawlbyte.ai/](https://developers.crawlbyte.ai/)**

## Task Statuses

- `queued` - Task is waiting to be processed
- `processing` - Task is currently being executed
- `completed` - Task finished successfully
- `failed` - Task encountered an error

## Error Handling

The SDK throws detailed error messages for HTTP errors and API failures:

```typescript
try {
  const task = await sdk.createTask(payload);
} catch (error) {
  console.error("Error creating task:", error.message);
}
```

## Examples

### Universal Template with Multiple URLs

```typescript
const task = await sdk.createTask({
  type: "universal",
  input: ["https://example1.com", "https://example2.com"],
  jsRendering: true,
});
```

## JavaScript Usage

The SDK works with plain JavaScript as well:

```javascript
const { CrawlbyteSDK } = require("crawlbyte-sdk-ts");

const sdk = new CrawlbyteSDK("your-api-key");

async function scrapeData() {
  const task = await sdk.createTask({
    type: "universal",
    input: ["https://example.com"],
  });

  console.log("Task created:", task.id);
}

scrapeData().catch(console.error);
```

## Documentation

For comprehensive API documentation, template specifications, and field requirements, please visit:
**[https://developers.crawlbyte.ai/](https://developers.crawlbyte.ai/)**

## License

MIT
