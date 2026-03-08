import { apiClient } from '../lib/axios';
import type { Project, UpdateWebhookResponse, RotateApiKeyResponse } from '../types';

export const projectService = {
  async get(): Promise<Project> {
    const { data } = await apiClient.get<Project>('/project');
    return data;
  },

  async updateWebhook(webhook_url: string): Promise<UpdateWebhookResponse> {
    const { data } = await apiClient.post<UpdateWebhookResponse>('/project/webhook', {
      webhook_url,
    });
    return data;
  },

  async rotateApiKey(): Promise<RotateApiKeyResponse> {
    const { data } = await apiClient.post<RotateApiKeyResponse>('/project/rotate-api-key');
    return data;
  },
};
