import { useState } from 'react';
import { Copy, RotateCw, Eye, EyeOff } from 'lucide-react';
import { useProject, useRotateApiKey } from '../../hooks/use-project';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Modal } from '../../components/ui/modal';
import { Skeleton } from '../../components/ui/skeleton';
import { copyToClipboard } from '../../utils/clipboard';

export function ApiKeyCard() {
  const { data: project, isLoading } = useProject();
  const rotateKey = useRotateApiKey();
  const [showConfirm, setShowConfirm] = useState(false);
  const [revealed, setRevealed] = useState(false);

  if (isLoading) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-5 w-24" /></CardHeader>
        <CardContent><Skeleton className="h-10 w-full" /></CardContent>
      </Card>
    );
  }

  if (!project) return null;

  const handleRotate = async () => {
    await rotateKey.mutateAsync();
    setShowConfirm(false);
    setRevealed(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h3 className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">API Key</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <code className="flex-1 bg-surface-sunken px-4 py-3 rounded-xl text-[13px] font-mono font-medium text-text-primary truncate border border-border-subtle">
              {revealed ? project.api_key : '\u2022'.repeat(40)}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRevealed((r) => !r)}
            >
              {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(project.api_key, 'API key copied')}
            >
              <Copy className="w-3.5 h-3.5 mr-1.5" />
              Copy
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowConfirm(true)}
            >
              <RotateCw className="w-3.5 h-3.5 mr-1.5" />
              Rotate Key
            </Button>
          </div>
        </CardContent>
      </Card>

      <Modal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Rotate API Key?"
      >
        <p className="text-sm text-text-secondary mb-6 leading-relaxed">
          This will invalidate your current API key immediately. Any integrations using the old key
          will stop working. This action cannot be undone.
        </p>
        <div className="flex gap-2.5 justify-end">
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleRotate}
            loading={rotateKey.isPending}
          >
            Rotate Key
          </Button>
        </div>
      </Modal>
    </>
  );
}
