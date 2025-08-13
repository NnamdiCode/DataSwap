import { Wallet, LogOut } from 'lucide-react';
import { useWeb3 } from '@/react-app/hooks/useWeb3';

interface WalletConnectProps {
  wallet: ReturnType<typeof useWeb3>['wallet'];
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function WalletConnect({ wallet, onConnect, onDisconnect }: WalletConnectProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (wallet.isConnected && wallet.address) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 glass rounded-lg border border-neon-green/20">
        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">
            {formatAddress(wallet.address)}
          </span>
          <span className="text-xs text-gray-400">
            {wallet.balance} ETH
          </span>
        </div>
        <button
          onClick={onDisconnect}
          className="p-2 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-red-400 hover:text-red-300"
          aria-label="Disconnect wallet"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onConnect}
      disabled={wallet.isConnecting}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-green/20 to-neon-blue/20 
                 border border-neon-green/30 rounded-lg hover:border-neon-green/50 
                 hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-300
                 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      aria-label={wallet.isConnecting ? 'Connecting wallet...' : 'Connect wallet'}
    >
      <Wallet className={`w-5 h-5 ${wallet.isConnecting ? 'animate-spin' : ''}`} />
      {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
