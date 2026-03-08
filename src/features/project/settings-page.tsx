import { ApiKeyCard } from './api-key-card';
import { WebhookSettings } from './webhook-settings';

export function SettingsPage() {
  return (
    <div className="space-y-6 animate-page-enter">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">Settings</h1>
        <p className="mt-1 text-sm text-text-secondary">Manage your project configuration</p>
      </div>

      <div className="max-w-2xl space-y-5">
        <ApiKeyCard />
        <WebhookSettings />
      </div>
    </div>
  );
}
