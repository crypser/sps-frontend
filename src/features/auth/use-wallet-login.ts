import { useCallback, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { authService } from '../../services/auth';
import { useAuth } from './auth-context';

interface UseWalletLoginReturn {
  login: () => Promise<void>;
  isLoggingIn: boolean;
  error: string | null;
}

export function useWalletLogin(): UseWalletLoginReturn {
  const { publicKey, signMessage, connected } = useWallet();
  const { setToken } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async () => {
    if (!publicKey || !signMessage || !connected) {
      setError('Wallet not connected');
      return;
    }

    setIsLoggingIn(true);
    setError(null);

    try {
      const walletAddress = publicKey.toBase58();

      // 1. Request challenge from backend
      const { message } = await authService.getChallenge(walletAddress);

      // 2. Sign the message with wallet
      const encodedMessage = new TextEncoder().encode(message);
      const signatureBytes = await signMessage(encodedMessage);
      const signature = bs58.encode(signatureBytes);

      // 3. Verify signature with backend
      const { token } = await authService.verify(walletAddress, signature, message);

      // 4. Store JWT
      setToken(token);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  }, [publicKey, signMessage, connected, setToken]);

  return { login, isLoggingIn, error };
}
