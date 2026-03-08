import { Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Nav */}
      <nav className="border-b border-white/[0.06] px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="w-[18px] h-[18px] text-white" />
          <span className="text-[14px] font-semibold text-text-primary tracking-[-0.02em]">Pazen</span>
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
            <h1 className="text-2xl font-bold text-text-primary tracking-[-0.03em]">Terms of Service</h1>
            <p className="text-[12px] text-text-tertiary mt-1">Last updated: March 6, 2026</p>
          </div>

          {/* Content */}
          <div className="divide-y divide-white/[0.06]">
            {[
              {
                title: '1. Beta Disclaimer',
                content: (
                  <p>
                    Pazen is currently in <strong className="text-text-primary">beta</strong>. The platform is provided on an
                    "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the reliability,
                    availability, accuracy, or completeness of the service. Features may change, break, or be removed without
                    prior notice.
                  </p>
                ),
              },
              {
                title: '2. Limitation of Liability',
                content: (
                  <>
                    <p>
                      To the fullest extent permitted by applicable law, Pazen and its operators shall not be liable for any
                      direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-1.5">
                      <li>Loss of funds, tokens, or digital assets of any kind</li>
                      <li>Loss of profits, revenue, or anticipated savings</li>
                      <li>Loss of data or business interruption</li>
                      <li>Damages arising from unauthorized access to your account or wallet</li>
                      <li>Damages arising from bugs, errors, or downtime in the platform</li>
                      <li>Damages resulting from blockchain network failures, delays, or congestion</li>
                    </ul>
                    <p className="mt-3">
                      You acknowledge that you use Pazen entirely at your own risk. We are not responsible for any financial
                      losses incurred through the use of this platform.
                    </p>
                  </>
                ),
              },
              {
                title: '3. Restricted Jurisdictions',
                content: (
                  <>
                    <p>
                      Pazen is <strong className="text-text-primary">not available</strong> to users located in, incorporated in,
                      or residents of the United States of America, the European Union, or any jurisdiction where the use of
                      cryptocurrency payment processing services is prohibited or restricted by law.
                    </p>
                    <p className="mt-3">
                      By using Pazen, you represent and warrant that you are not subject to the laws of any restricted
                      jurisdiction and that your use of the platform does not violate any applicable laws or regulations.
                    </p>
                  </>
                ),
              },
              {
                title: '4. Use at Your Own Risk',
                content: (
                  <>
                    <p>
                      Cryptocurrency transactions are irreversible. Once a transaction is broadcast to the Solana blockchain, it
                      cannot be reversed, cancelled, or refunded. You are solely responsible for verifying all transaction details
                      before confirming any payment or withdrawal.
                    </p>
                    <p className="mt-3">
                      Pazen does not custody your funds. Payments are processed through temporary escrow addresses and swept to
                      a treasury wallet. Withdrawals are sent directly to the destination address you provide. We cannot recover
                      funds sent to incorrect addresses.
                    </p>
                  </>
                ),
              },
              {
                title: '5. Platform Fees',
                content: (
                  <p>
                    Pazen charges a 1% platform fee on confirmed payments, deducted during the sweep process. Withdrawals
                    incur a flat network fee of 0.001 SOL. Fee structures may change at any time with or without notice.
                  </p>
                ),
              },
              {
                title: '6. Account Termination',
                content: (
                  <p>
                    We reserve the right to suspend or terminate access to Pazen at any time, for any reason, without prior
                    notice. Upon termination, you should withdraw any remaining balance promptly. We are not obligated to
                    maintain access to funds indefinitely after termination.
                  </p>
                ),
              },
              {
                title: '7. Changes to Terms',
                content: (
                  <p>
                    We may update these Terms of Service at any time. Continued use of Pazen after changes constitutes
                    acceptance of the revised terms.
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
              By connecting your wallet and using Pazen, you acknowledge that you have read, understood, and agree to
              be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
