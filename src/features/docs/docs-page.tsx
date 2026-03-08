import { useState } from 'react';
import { Copy } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { useProject } from '../../hooks/use-project';
import { copyToClipboard } from '../../utils/clipboard';
import { API_BASE_URL } from '../../lib/constants';

type HttpMethod = 'GET' | 'POST';

interface Endpoint {
  method: HttpMethod;
  path: string;
  description: string;
  auth: 'none' | 'jwt' | 'jwt_or_api_key';
  request?: object;
  response: object;
  responseStatus?: number;
}

const sections: { title: string; endpoints: Endpoint[] }[] = [
  {
    title: 'Authentication',
    endpoints: [
      {
        method: 'POST',
        path: '/auth/challenge',
        description: 'Request a sign-in challenge for a wallet address.',
        auth: 'none',
        request: { wallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU' },
        response: {
          message: 'Sign this message to authenticate with PayZen.\n\nNonce: 0c974c1c...',
          nonce: '0c974c1c9e76fc056941133188f9894a6bf4e4c1b7d719e0a1b8cf339eb1ad15',
        },
      },
      {
        method: 'POST',
        path: '/auth/verify',
        description: 'Submit the signed challenge to receive a JWT token.',
        auth: 'none',
        request: {
          wallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
          message: 'Sign this message to authenticate with PayZen.\n\nNonce: 0c974c1c...',
          signature: '5TxKz...base58_encoded_signature',
        },
        response: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
    ],
  },
  {
    title: 'Project',
    endpoints: [
      {
        method: 'GET',
        path: '/project',
        description: 'Get your project details including API key and webhook URL.',
        auth: 'jwt',
        response: {
          id: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
          api_key: 'sk_e3b0c44298fc1c149afbf4c8996fb924...',
          webhook_url: 'https://example.com/webhook',
          created_at: '2026-03-05T18:00:00.000Z',
        },
      },
      {
        method: 'POST',
        path: '/project/webhook',
        description: 'Set or update your webhook URL for payment notifications.',
        auth: 'jwt',
        request: { webhook_url: 'https://example.com/my-webhook' },
        response: { success: true, webhook_url: 'https://example.com/my-webhook' },
      },
      {
        method: 'POST',
        path: '/project/rotate-api-key',
        description: 'Rotate your API key. The old key is invalidated immediately.',
        auth: 'jwt',
        response: { api_key: 'sk_new_generated_api_key_hex_string_here' },
      },
    ],
  },
  {
    title: 'Payments',
    endpoints: [
      {
        method: 'POST',
        path: '/payments',
        description: 'Create a new payment. Returns a payment address and checkout URL.',
        auth: 'jwt_or_api_key',
        request: { amount_sol: 1.5, order_id: 'order_123', description: 'Premium subscription' },
        response: {
          payment_id: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
          payment_address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
          amount_sol: 1.5,
          expires_at: '2026-03-05T18:30:00.000Z',
          checkout_url: 'http://localhost:3000/pay/a1b2c3d4...',
        },
        responseStatus: 201,
      },
      {
        method: 'GET',
        path: '/payments',
        description: 'List all payments for your project.',
        auth: 'jwt_or_api_key',
        response: [{
          id: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
          payment_address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
          amount_sol: 1.5, status: 'confirmed',
          tx_hash: '5VERv8NMvzbJMEkV8xnrLkEaWRtSz9CosKDYjCJjBRnbJLgp8...',
          order_id: 'order_123', description: 'Premium subscription',
          created_at: '2026-03-05T18:15:00.000Z', expires_at: '2026-03-05T18:30:00.000Z',
        }],
      },
      {
        method: 'GET',
        path: '/payments/:id',
        description: 'Get a single payment by ID.',
        auth: 'jwt_or_api_key',
        response: {
          id: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
          payment_address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
          amount_sol: 1.5, status: 'pending', tx_hash: null,
          order_id: 'order_123', description: 'Premium subscription',
          created_at: '2026-03-05T18:15:00.000Z', expires_at: '2026-03-05T18:30:00.000Z',
        },
      },
    ],
  },
  {
    title: 'Balance',
    endpoints: [{
      method: 'GET',
      path: '/balance',
      description: 'Get your merchant balance breakdown: available, pending, total earned, and total fees.',
      auth: 'jwt_or_api_key',
      response: {
        available_balance: 4.95, pending_balance: 1.5,
        total_earned: 14.85, total_fees: 0.15,
        updated_at: '2026-03-06T12:30:00.000Z',
      },
    }],
  },
  {
    title: 'Withdrawals',
    endpoints: [
      {
        method: 'POST',
        path: '/withdrawals',
        description: 'Request a withdrawal from your available balance. Network fee of 0.001 SOL is deducted from the amount. Minimum withdrawal is 0.01 SOL.',
        auth: 'jwt_or_api_key',
        request: { amount: 2.0, destination_address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU' },
        response: { id: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4', amount: 2.0, fee: 0.001, net_amount: 1.999, status: 'pending' },
        responseStatus: 201,
      },
      {
        method: 'GET',
        path: '/withdrawals',
        description: 'List all withdrawals for your project.',
        auth: 'jwt_or_api_key',
        response: [{
          id: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4', amount: 2.0, fee: 0.001, net_amount: 1.999,
          status: 'completed', tx_hash: '4hXTCkRzt9WyecNzV1XPgCDfGAZzQKNxLXgynz5QDuWWPSAkosir...',
          destination_address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
          failure_reason: null, created_at: '2026-03-06T12:00:00.000Z',
        }],
      },
      {
        method: 'GET',
        path: '/withdrawals/:id',
        description: 'Get a single withdrawal by ID.',
        auth: 'jwt_or_api_key',
        response: {
          id: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4', amount: 2.0, fee: 0.001, net_amount: 1.999,
          status: 'completed', tx_hash: '4hXTCkRzt9WyecNzV1XPgCDfGAZzQKNxLXgynz5QDuWWPSAkosir...',
          destination_address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
          failure_reason: null, created_at: '2026-03-06T12:00:00.000Z',
        },
      },
    ],
  },
  {
    title: 'Checkout (Public)',
    endpoints: [{
      method: 'GET',
      path: '/pay/:payment_id',
      description: 'Public endpoint to get payment info for the checkout page. No auth required.',
      auth: 'none',
      response: { payment_address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', amount_sol: 1.5, status: 'pending' },
    }],
  },
];

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  POST: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
};

const AUTH_LABELS: Record<string, string> = {
  none: 'No auth',
  jwt: 'JWT only',
  jwt_or_api_key: 'JWT or API Key',
};

function CodeBlock({ content, label }: { content: string; label?: string }) {
  return (
    <div className="relative group">
      {label && (
        <span className="text-[10px] uppercase tracking-wider text-text-tertiary font-semibold">{label}</span>
      )}
      <pre className="bg-surface-sunken text-text-primary rounded-xl p-4 text-[13px] font-mono overflow-x-auto mt-1 leading-relaxed border border-border-subtle">
        {content}
      </pre>
      <button
        onClick={() => copyToClipboard(content, 'Copied')}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-text-tertiary hover:text-text-primary p-1.5 rounded-lg bg-surface-raised border border-border-subtle cursor-pointer"
      >
        <Copy className="w-4 h-4" />
      </button>
    </div>
  );
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border-subtle rounded-xl overflow-hidden bg-surface-raised">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-surface-sunken/50 transition-colors duration-150 text-left cursor-pointer"
      >
        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${METHOD_COLORS[endpoint.method]}`}>
          {endpoint.method}
        </span>
        <code className="text-[13px] font-mono text-text-primary font-medium">{endpoint.path}</code>
        <span className="ml-auto text-[11px] text-text-tertiary font-medium">{AUTH_LABELS[endpoint.auth]}</span>
        <svg
          className={`w-4 h-4 text-text-tertiary transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-border-subtle space-y-4 pt-4">
          <p className="text-sm text-text-secondary leading-relaxed">{endpoint.description}</p>

          {endpoint.auth !== 'none' && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-[13px] text-amber-400">
              <span className="font-semibold">Authorization:</span>{' '}
              {endpoint.auth === 'jwt'
                ? 'Bearer <jwt_token>'
                : 'Bearer <jwt_token> or Bearer sk_<api_key>'}
            </div>
          )}

          {endpoint.request && (
            <CodeBlock
              label="Request Body"
              content={JSON.stringify(endpoint.request, null, 2)}
            />
          )}

          <CodeBlock
            label={`Response ${endpoint.responseStatus ?? 200}`}
            content={JSON.stringify(endpoint.response, null, 2)}
          />
        </div>
      )}
    </div>
  );
}

export function DocsPage() {
  const { data: project } = useProject();

  const curlExample = project
    ? `curl -X POST ${API_BASE_URL}/payments \\
  -H "Authorization: Bearer ${project.api_key}" \\
  -H "Content-Type: application/json" \\
  -d '{"amount_sol": 1.5, "order_id": "order_123"}'`
    : `curl -X POST ${API_BASE_URL}/payments \\
  -H "Authorization: Bearer sk_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"amount_sol": 1.5, "order_id": "order_123"}'`;

  return (
    <div className="space-y-8 max-w-4xl animate-page-enter">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">API Documentation</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Integrate PayZen into your application using the REST API
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">Getting Started</h2>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-text-tertiary font-semibold">Base URL</span>
            <div className="mt-1.5 flex items-center gap-2">
              <code className="bg-surface-sunken px-4 py-2.5 rounded-xl text-[13px] font-mono font-medium text-text-primary border border-border-subtle">{API_BASE_URL}</code>
              <button
                onClick={() => copyToClipboard(API_BASE_URL, 'Base URL copied')}
                className="text-text-tertiary hover:text-text-primary transition-colors duration-150 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-text-tertiary font-semibold">Authentication</span>
            <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
              Protected endpoints accept either a JWT token or your project API key via the Authorization header:
            </p>
            <div className="mt-2 space-y-1.5">
              <code className="block bg-surface-sunken px-4 py-2.5 rounded-xl text-[13px] font-mono font-medium text-text-primary border border-border-subtle">
                Authorization: Bearer {'<jwt_token>'}
              </code>
              <code className="block bg-surface-sunken px-4 py-2.5 rounded-xl text-[13px] font-mono font-medium text-text-primary border border-border-subtle">
                Authorization: Bearer sk_{'<api_key>'}
              </code>
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-text-tertiary font-semibold">Quick Example</span>
            <CodeBlock content={curlExample} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">Payment Status Flow</h2>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 flex-wrap text-[13px] font-mono">
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg font-medium">pending</span>
            <span className="text-text-tertiary">&rarr;</span>
            <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1.5 rounded-lg font-medium">detected</span>
            <span className="text-text-tertiary">&rarr;</span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg font-medium">confirmed</span>
            <span className="text-text-tertiary">&rarr;</span>
            <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-3 py-1.5 rounded-lg font-medium">swept</span>
            <span className="text-text-tertiary text-[12px] ml-2">(funds moved to treasury, balance credited)</span>
          </div>
          <div className="flex items-center gap-3 mt-3 text-[13px] font-mono">
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg font-medium">pending</span>
            <span className="text-text-tertiary">&rarr;</span>
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg font-medium">expired</span>
            <span className="text-text-tertiary text-[12px] ml-2">(after 15 minutes)</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">Webhook Payload</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-text-secondary leading-relaxed">
            When a payment is confirmed, a POST request is sent to your configured webhook URL:
          </p>
          <CodeBlock
            content={JSON.stringify({
              event: 'payment.confirmed',
              payment_id: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
              amount_sol: 1.5,
              tx_hash: '5VERv8NMvzbJMEkV8xnrLkEaWRtSz9CosKDYjCJjBRnbJLgp8...',
              order_id: 'order_123',
            }, null, 2)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">Withdrawal Status Flow</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap text-[13px] font-mono">
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg font-medium">pending</span>
            <span className="text-text-tertiary">&rarr;</span>
            <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1.5 rounded-lg font-medium">processing</span>
            <span className="text-text-tertiary">&rarr;</span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg font-medium">completed</span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-[13px] font-mono">
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg font-medium">pending</span>
            <span className="text-text-tertiary">&rarr;</span>
            <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1.5 rounded-lg font-medium">processing</span>
            <span className="text-text-tertiary">&rarr;</span>
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg font-medium">failed</span>
            <span className="text-text-tertiary text-[12px] ml-2">(balance refunded)</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">Fee Summary</h2>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-2.5 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Fee</th>
                <th className="text-left py-2.5 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Amount</th>
                <th className="text-left py-2.5 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/50">
              <tr>
                <td className="py-3 text-[13px] text-text-primary font-medium">Platform fee</td>
                <td className="py-3 text-[13px] font-mono text-text-secondary">1% of payment</td>
                <td className="py-3 text-[13px] text-text-secondary">Deducted during sweep</td>
              </tr>
              <tr>
                <td className="py-3 text-[13px] text-text-primary font-medium">Withdrawal network fee</td>
                <td className="py-3 text-[13px] font-mono text-text-secondary">0.001 SOL flat</td>
                <td className="py-3 text-[13px] text-text-secondary">Deducted from withdrawal amount</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {sections.map((section) => (
        <div key={section.title} className="space-y-3">
          <h2 className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">{section.title}</h2>
          <div className="space-y-2">
            {section.endpoints.map((endpoint) => (
              <EndpointCard key={`${endpoint.method}-${endpoint.path}`} endpoint={endpoint} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
