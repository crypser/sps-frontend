import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/project';
import toast from 'react-hot-toast';

const PROJECT_KEY = ['project'] as const;

export function useProject() {
  return useQuery({
    queryKey: PROJECT_KEY,
    queryFn: projectService.get,
  });
}

export function useUpdateWebhook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (webhookUrl: string) => projectService.updateWebhook(webhookUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEY });
      toast.success('Webhook URL updated');
    },
    onError: () => {
      toast.error('Failed to update webhook');
    },
  });
}

export function useRotateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectService.rotateApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEY });
      toast.success('API key rotated');
    },
    onError: () => {
      toast.error('Failed to rotate API key');
    },
  });
}
