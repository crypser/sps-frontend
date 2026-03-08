import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-6">
      <Inbox className="w-8 h-8 text-white mx-auto mb-4" />
      <h3 className="text-sm font-semibold text-text-primary tracking-[-0.01em]">{title}</h3>
      <p className="mt-1 text-sm text-text-secondary max-w-xs mx-auto">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
