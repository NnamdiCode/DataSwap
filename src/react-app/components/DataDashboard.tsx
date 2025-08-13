import { useState } from 'react';
import { ExternalLink, TrendingUp, TrendingDown, Database, Calendar } from 'lucide-react';

interface DataAsset {
  id: string;
  name: string;
  type: string;
  tokenSymbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  totalSupply: number;
  uploadDate: string;
  irysId: string;
  description: string;
}

const mockDataAssets: DataAsset[] = [
  {
    id: '1',
    name: 'Global Climate Dataset 2024',
    type: 'Environmental Data',
    tokenSymbol: 'CLIMATE24',
    price: 45.20,
    change24h: -1.2,
    volume24h: 12500,
    totalSupply: 1000000,
    uploadDate: '2024-08-10',
    irysId: 'irys_1723456789_abc123def',
    description: 'Comprehensive climate data including temperature, precipitation, and weather patterns from 500+ global stations.'
  },
  {
    id: '2',
    name: 'E-commerce Market Research',
    type: 'Market Analysis',
    tokenSymbol: 'ECOMM24',
    price: 78.90,
    change24h: 5.8,
    volume24h: 8750,
    totalSupply: 500000,
    uploadDate: '2024-08-12',
    irysId: 'irys_1723567890_def456ghi',
    description: 'Consumer behavior analysis and market trends for e-commerce platforms across 15 countries.'
  },
  {
    id: '3',
    name: 'Medical Research Anonymized',
    type: 'Healthcare Data',
    tokenSymbol: 'MEDRES24',
    price: 156.00,
    change24h: 3.2,
    volume24h: 15600,
    totalSupply: 250000,
    uploadDate: '2024-08-13',
    irysId: 'irys_1723678901_ghi789jkl',
    description: 'Anonymized medical research data from clinical trials and patient outcomes.'
  }
];

export default function DataDashboard() {
  const [selectedAsset, setSelectedAsset] = useState<DataAsset | null>(null);

  const handleViewData = (asset: DataAsset) => {
    // Open data in new tab with Irys viewer URL (placeholder)
    const irysViewerUrl = `https://gateway.irys.xyz/${asset.irysId}`;
    window.open(irysViewerUrl, '_blank', 'noopener,noreferrer');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Your Data Assets</h3>
          <p className="text-gray-400 text-sm mt-1">Manage and trade your tokenized data</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-neon-green" />
            <span className="text-gray-400">Total Assets: {mockDataAssets.length}</span>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDataAssets.map((asset) => (
          <div
            key={asset.id}
            className="glass rounded-xl border border-dark-border p-6 hover:border-neon-green/30 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedAsset(asset)}
          >
            {/* Asset Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-1 line-clamp-2">{asset.name}</h4>
                <p className="text-xs text-gray-400 mb-2">{asset.type}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono bg-dark-card px-2 py-1 rounded">
                    {asset.tokenSymbol}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Info */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Price</span>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(asset.price)}</div>
                  <div className={`text-xs flex items-center space-x-1 ${
                    asset.change24h >= 0 ? 'text-neon-green' : 'text-red-400'
                  }`}>
                    {asset.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">24h Volume</span>
                <span>{formatCurrency(asset.volume24h)}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Total Supply</span>
                <span>{formatNumber(asset.totalSupply)}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Upload Date</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(asset.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* View Data Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewData(asset);
              }}
              className="w-full mt-4 py-2 bg-neon-blue/20 border border-neon-blue/30 rounded-lg 
                         hover:bg-neon-blue/30 hover:border-neon-blue/50 transition-all duration-200
                         flex items-center justify-center space-x-2 text-sm font-medium"
              aria-label={`View ${asset.name} data`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Data</span>
            </button>
          </div>
        ))}
      </div>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" 
             onClick={() => setSelectedAsset(null)}>
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl"
               onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{selectedAsset.name}</h3>
                <p className="text-gray-400">{selectedAsset.type}</p>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-300">{selectedAsset.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Token Symbol:</span>
                  <span className="ml-2 font-mono">{selectedAsset.tokenSymbol}</span>
                </div>
                <div>
                  <span className="text-gray-400">Irys ID:</span>
                  <span className="ml-2 font-mono text-xs">{selectedAsset.irysId}</span>
                </div>
                <div>
                  <span className="text-gray-400">Current Price:</span>
                  <span className="ml-2">{formatCurrency(selectedAsset.price)}</span>
                </div>
                <div>
                  <span className="text-gray-400">Total Supply:</span>
                  <span className="ml-2">{formatNumber(selectedAsset.totalSupply)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleViewData(selectedAsset)}
              className="w-full py-3 bg-gradient-to-r from-neon-green to-neon-blue rounded-lg 
                         hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-200
                         flex items-center justify-center space-x-2 font-medium"
            >
              <ExternalLink className="w-5 h-5" />
              <span>View Data on Irys</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
