import { useState, useEffect } from 'react';
import { useProject, useUpdateWebhook } from '../../hooks/use-project';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Skeleton } from '../../components/ui/skeleton';

export function WebhookSettings() {
  const { data: project, isLoading } = useProject();
  const updateWebhook = useUpdateWebhook();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (project?.webhook_url) {
      setUrl(project.webhook_url);
    }
  }, [project?.webhook_url]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
        <CardContent><Skeleton className="h-10 w-full" /></CardContent>
      </Card>
    );
  }

  const handleSave = async () => {
    if (url && !url.startsWith('https://')) {
      setError('Webhook URL must use HTTPS');
      return;
    }
    setError('');
    await updateWebhook.mutateAsync(url);
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">Webhook URL</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="https://your-server.com/webhook"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={error}
        />
        <p className="text-[12px] text-text-tertiary leading-relaxed">
          We'll send POST requests to this URL when payment statuses change.
        </p>
        <Button
          onClick={handleSave}
          loading={updateWebhook.isPending}
          disabled={url === (project?.webhook_url ?? '')}
        >
          Save Webhook
        </Button>
      </CardContent>
    </Card>
  );
}
