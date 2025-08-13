import { useState } from 'react';
import { useWeb3 } from '@/react-app/hooks/useWeb3';
import WalletConnect from '@/react-app/components/WalletConnect';
import FileUpload from '@/react-app/components/FileUpload';
import ProgressIndicator from '@/react-app/components/ProgressIndicator';
import TradingInterface from '@/react-app/components/TradingInterface';
import DataDashboard from '@/react-app/components/DataDashboard';
import { Database, TrendingUp, Upload, Zap } from 'lucide-react';

export default function Home() {
  const { wallet, uploadProgress, connectWallet, disconnectWallet, uploadAndTokenizeData, executeSwap } = useWeb3();
  const [activeTab, setActiveTab] = useState<'upload' | 'trade' | 'dashboard'>('upload');
  const handleFileSelect = (_file: File) => {
    // File selection handled in FileUpload component
  };

  const handleFileUpload = async (file: File) => {
    if (!wallet.isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    await uploadAndTokenizeData(file);
  };

  const handleSwap = async (fromToken: string, toToken: string, amount: string) => {
    if (!wallet.isConnected) {
      alert('Please connect your wallet first');
      return '';
    }
    return await executeSwap(fromToken, toToken, amount);
  };

  const tabs = [
    { id: 'upload', label: 'Upload Data', icon: Upload },
    { id: 'trade', label: 'Trade', icon: TrendingUp },
    { id: 'dashboard', label: 'My Assets', icon: Database },
  ] as const;

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Progress Indicator Overlay */}
      {uploadProgress && <ProgressIndicator progress={uploadProgress} />}

      {/* Header */}
      <header className="border-b border-dark-border bg-dark-bg/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
                IrysFlow
              </h1>
            </div>

            {/* Wallet Connection */}
            <WalletConnect 
              wallet={wallet} 
              onConnect={connectWallet} 
              onDisconnect={disconnectWallet}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Trade Data Like
            <span className="bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent block">
              Digital Assets
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Upload, tokenize, and trade your data on the Irys blockchain. 
            Create liquidity pools and discover value in decentralized data markets.
          </p>
          
          {!wallet.isConnected && (
            <div className="flex justify-center">
              <WalletConnect 
                wallet={wallet} 
                onConnect={connectWallet} 
                onDisconnect={disconnectWallet}
              />
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      {wallet.isConnected && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Navigation Tabs */}
          <nav className="flex space-x-1 mb-8 bg-dark-card/50 rounded-lg p-1" role="tablist">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-neon-green/20 to-neon-blue/20 border border-neon-green/30 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-dark-border/50'
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'upload' && (
              <div 
                id="upload-panel" 
                role="tabpanel" 
                aria-labelledby="upload-tab"
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-semibold mb-2">Upload & Tokenize Data</h3>
                  <p className="text-gray-400">
                    Transform your data into tradeable tokens on the Irys blockchain
                  </p>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    onUpload={handleFileUpload}
                    disabled={!!uploadProgress}
                  />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-neon-green/20 rounded-lg flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6 text-neon-green" />
                    </div>
                    <h4 className="font-semibold">Secure Upload</h4>
                    <p className="text-sm text-gray-400">
                      Data stored permanently on Irys with cryptographic proofs
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mx-auto">
                      <Zap className="w-6 h-6 text-neon-blue" />
                    </div>
                    <h4 className="font-semibold">Auto Tokenization</h4>
                    <p className="text-sm text-gray-400">
                      Automatic ERC-20 token creation with built-in liquidity pools
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="font-semibold">Instant Trading</h4>
                    <p className="text-sm text-gray-400">
                      Start trading immediately with automated market making
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trade' && (
              <div 
                id="trade-panel" 
                role="tabpanel" 
                aria-labelledby="trade-tab"
                className="max-w-2xl mx-auto"
              >
                <TradingInterface onSwap={handleSwap} />
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div 
                id="dashboard-panel" 
                role="tabpanel" 
                aria-labelledby="dashboard-tab"
              >
                <DataDashboard />
              </div>
            )}
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-dark-border bg-dark-bg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <span className="font-semibold">IrysFlow</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-neon-green transition-colors">Documentation</a>
              <a href="#" className="hover:text-neon-green transition-colors">API</a>
              <a href="#" className="hover:text-neon-green transition-colors">Support</a>
              <a href="#" className="hover:text-neon-green transition-colors">GitHub</a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-dark-border text-center text-sm text-gray-500">
            © 2024 IrysFlow. Built on Irys blockchain for decentralized data trading.
          </div>
        </div>
      </footer>
    </div>
  );
}
