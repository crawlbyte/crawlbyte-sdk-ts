export interface Task {
  id: string;
  type: string;
  status: string;
  url?: string;
  input?: string[];
  fields?: string[];
  method?: string;
  body?: string;
  proxy?: string;
  customHeaders?: Record<string, string>;
  customHeaderOrder?: string[];
  jsRendering?: boolean;
  customSelector?: string;
  userAgentPreset?: string;
  userAgentCustom?: string;
  dataType?: string;
  location?: string;
  sortBy?: string;
  result?: any;
  startTime?: string;
  endTime?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TaskPayload {
  type: string;
  url?: string;
  location?: string;
  sortBy?: string;
  dataType?: string;
  method?: string;
  jsRendering?: boolean;
  customSelector?: string;
  userAgentPreset?: string;
  userAgentCustom?: string;
  proxy?: string;
  customHeaderOrder?: string[];
  input?: string[];
  customHeaders?: Record<string, string>;
  fields?: string[];
  body?: string;
  multithread?: boolean;
}

export interface PollOptions {
  intervalSeconds: number;
  timeoutSeconds: number;
}
