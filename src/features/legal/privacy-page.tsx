import { Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Nav */}
      <nav className="border-b border-white/[0.06] px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="w-[18px] h-[18px] text-white" />
          <span className="text-[14px] font-semibold text-text-primary tracking-[-0.02em]">SolPay</span>
        </Link>
      </nav>

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="max-w-[1000px] w-full border border-white/[0.06] h-fit animate-page-enter">
          {/* Header */}
          <div className="px-6 sm:px-10 py-10 border-b border-white/[0.06]">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-[12px] text-text-tertiary hover:text-text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to login
            </Link>
            <h1 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">Privacy Policy</h1>
            <p className="text-[12px] text-text-tertiary mt-1">Last updated: March 6, 2026</p>
          </div>

          {/* Content */}
          <div className="divide-y divide-white/[0.06]">
            {[
              {
                title: '1. Beta Notice',
                content: (
                  <p>
                    SolPay is in <strong className="text-text-primary">beta</strong>. Our data handling practices may evolve as
                    the platform develops. We recommend reviewing this policy periodically for updates.
                  </p>
                ),
              },
              {
                title: '2. Information We Collect',
                content: (
                  <>
                    <p>SolPay collects minimal information necessary to operate the service:</p>
                    <ul className="list-disc pl-6 mt-3 space-y-1.5">
                      <li><strong className="text-text-primary">Wallet address</strong> — your public Solana wallet address, used for authentication and identification</li>
                      <li><strong className="text-text-primary">Transaction data</strong> — payment amounts, addresses, timestamps, and transaction hashes generated through platform use</li>
                      <li><strong className="text-text-primary">Webhook URLs</strong> — endpoint URLs you configure for payment notifications</li>
                    </ul>
                    <p className="mt-3">
                      We do not collect personal information such as names, emails, phone numbers, or physical addresses.
                      Authentication is wallet-based only.
                    </p>
                  </>
                ),
              },
              {
                title: '3. How We Use Information',
                content: (
                  <>
                    <p>Collected information is used exclusively to:</p>
                    <ul className="list-disc pl-6 mt-3 space-y-1.5">
                      <li>Authenticate your identity via wallet signature verification</li>
                      <li>Process and track payments and withdrawals</li>
                      <li>Send webhook notifications to your configured endpoints</li>
                      <li>Display transaction history and balance information in your dashboard</li>
                    </ul>
                  </>
                ),
              },
              {
                title: '4. Blockchain Data',
                content: (
                  <p>
                    All transactions processed through SolPay are recorded on the Solana blockchain, which is a public,
                    immutable ledger. Transaction data on the blockchain is permanently visible to anyone and cannot be deleted
                    or modified by SolPay or any other party.
                  </p>
                ),
              },
              {
                title: '5. Data Sharing',
                content: (
                  <p>
                    We do not sell, rent, or share your data with third parties for marketing purposes. Data may be disclosed
                    only if required by law or to protect the security and integrity of the platform.
                  </p>
                ),
              },
              {
                title: '6. Data Security',
                content: (
                  <p>
                    We implement reasonable security measures to protect data stored on our servers. However, no system is
                    perfectly secure. We cannot guarantee the absolute security of your information. As a beta platform,
                    security measures are continuously being improved.
                  </p>
                ),
              },
              {
                title: '7. Data Retention',
                content: (
                  <p>
                    Transaction and account data is retained for the duration of your use of the platform and for a reasonable
                    period thereafter. We may delete data associated with inactive accounts at our discretion.
                  </p>
                ),
              },
              {
                title: '8. Restricted Jurisdictions',
                content: (
                  <p>
                    This service is not intended for users in the United States or the European Union. If you access SolPay
                    from a restricted jurisdiction, you do so at your own risk and are responsible for compliance with local
                    laws.
                  </p>
                ),
              },
              {
                title: '9. Changes to This Policy',
                content: (
                  <p>
                    We may update this Privacy Policy at any time. Continued use of SolPay after changes constitutes acceptance
                    of the revised policy.
                  </p>
                ),
              },
            ].map(({ title, content }) => (
              <div key={title} className="px-6 sm:px-10 py-8">
                <h2 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em] mb-3">{title}</h2>
                <div className="text-[13px] text-text-secondary leading-relaxed">{content}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-10 py-6 border-t border-white/[0.06] bg-white/[0.01]">
            <p className="text-text-tertiary text-[11px]">
              By connecting your wallet and using SolPay, you acknowledge that you have read and understood this Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
