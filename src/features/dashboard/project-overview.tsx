import { Copy } from 'lucide-react';
import { useProject } from '../../hooks/use-project';
import { Card, CardContent } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { copyToClipboard } from '../../utils/clipboard';
import { truncateAddress } from '../../utils/format';

function CopyButton({ text, label }: { text: string; label: string }) {
  return (
    <button
      onClick={() => copyToClipboard(text, `${label} copied`)}
      className="text-text-tertiary hover:text-text-primary transition-colors flex-shrink-0 p-1 -m-1 rounded-lg hover:bg-white/[0.04] cursor-pointer"
      title={`Copy ${label}`}
    >
      <Copy className="w-3.5 h-3.5" />
    </button>
  );
}

export function ProjectOverview() {
  const { data: project, isLoading } = useProject();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="py-6">
              <Skeleton className="h-3.5 w-24 mb-3" />
              <Skeleton className="h-5 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!project) return null;

  const items = [
    { label: 'Project ID', value: truncateAddress(project.id, 6), copyValue: project.id },
    { label: 'API Key', value: `${project.api_key.slice(0, 14)}...`, copyValue: project.api_key },
    { label: 'Webhook URL', value: project.webhook_url ?? 'Not configured', copyValue: project.webhook_url },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {items.map(({ label, value, copyValue }) => (
        <Card key={label}>
          <CardContent className="py-6">
            <p className="text-[13px] font-medium text-text-tertiary mb-1.5">{label}</p>
            <div className="flex items-center gap-2">
              <p className="text-[15px] font-semibold text-text-primary truncate font-mono tracking-tight">
                {value}
              </p>
              {copyValue && <CopyButton text={copyValue} label={label} />}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
