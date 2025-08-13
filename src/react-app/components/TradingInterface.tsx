import { useState } from 'react';
import { ArrowUpDown, TrendingUp, Zap } from 'lucide-react';

interface TradingInterfaceProps {
  onSwap: (fromToken: string, toToken: string, amount: string) => Promise<string>;
}

interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  logo: string;
}

const mockTokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', price: 2340.50, change24h: 2.5, logo: '🔷' },
  { symbol: 'DATA1', name: 'Climate Dataset', price: 45.20, change24h: -1.2, logo: '🌍' },
  { symbol: 'DATA2', name: 'Market Research', price: 78.90, change24h: 5.8, logo: '📊' },
  { symbol: 'DATA3', name: 'Medical Records', price: 156.00, change24h: 3.2, logo: '🏥' },
];

export default function TradingInterface({ onSwap }: TradingInterfaceProps) {
  const [fromToken, setFromToken] = useState(mockTokens[0]);
  const [toToken, setToToken] = useState(mockTokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [slippage, setSlippage] = useState('0.5');

  const calculateToAmount = (amount: string) => {
    if (!amount || isNaN(Number(amount))) return '';
    const rate = fromToken.price / toToken.price;
    return (Number(amount) * rate * 0.997).toFixed(6); // 0.3% fee
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  const swapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) return;
    
    setIsSwapping(true);
    try {
      await onSwap(fromToken.symbol, toToken.symbol, fromAmount);
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      console.error('Swap failed:', error);
    } finally {
      setIsSwapping(false);
    }
  };

  const isSwapReady = fromAmount && toAmount && Number(fromAmount) > 0;

  return (
    <div className="space-y-6">
      {/* Trading Pair Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">AMM Trading</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <TrendingUp className="w-4 h-4" />
          <span>24h Volume: $2.4M</span>
        </div>
      </div>

      {/* Trading Form */}
      <div className="glass rounded-xl border border-dark-border p-6">
        {/* From Token */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-400">From</label>
            <span className="text-sm text-gray-400">Balance: 2.45</span>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={fromToken.symbol}
              onChange={(e) => setFromToken(mockTokens.find(t => t.symbol === e.target.value) || mockTokens[0])}
              className="flex-shrink-0 bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-green/50"
            >
              {mockTokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.logo} {token.symbol}
                </option>
              ))}
            </select>
            
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent text-right text-xl font-medium focus:outline-none"
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-400">
            <span>{fromToken.name}</span>
            <span>${fromToken.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center my-4">
          <button
            onClick={swapTokens}
            className="p-2 bg-dark-card border border-dark-border rounded-lg hover:border-neon-green/50 transition-all duration-200"
            aria-label="Swap token positions"
          >
            <ArrowUpDown className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* To Token */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-400">To</label>
            <span className="text-sm text-gray-400">Balance: 0.00</span>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={toToken.symbol}
              onChange={(e) => setToToken(mockTokens.find(t => t.symbol === e.target.value) || mockTokens[1])}
              className="flex-shrink-0 bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-blue/50"
            >
              {mockTokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.logo} {token.symbol}
                </option>
              ))}
            </select>
            
            <input
              type="number"
              value={toAmount}
              readOnly
              placeholder="0.00"
              className="flex-1 bg-transparent text-right text-xl font-medium text-gray-400"
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-400">
            <span>{toToken.name}</span>
            <span>${toToken.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Slippage Settings */}
        <div className="mt-6 p-4 bg-dark-card/50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Slippage Tolerance</span>
            <div className="flex space-x-2">
              {['0.1', '0.5', '1.0'].map((value) => (
                <button
                  key={value}
                  onClick={() => setSlippage(value)}
                  className={`px-2 py-1 text-xs rounded ${
                    slippage === value 
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/30' 
                      : 'bg-dark-border text-gray-400'
                  }`}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Your transaction will revert if the price changes unfavorably by more than this percentage.
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!isSwapReady || isSwapping}
          className={`w-full mt-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isSwapReady && !isSwapping
              ? 'bg-gradient-to-r from-neon-green to-neon-blue hover:shadow-lg hover:shadow-neon-green/20'
              : 'bg-dark-border text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSwapping ? (
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-4 h-4 animate-pulse" />
              <span>Swapping...</span>
            </div>
          ) : (
            'Swap Tokens'
          )}
        </button>

        {isSwapReady && (
          <div className="mt-4 text-xs text-gray-400 text-center">
            Rate: 1 {fromToken.symbol} = {(toToken.price / fromToken.price).toFixed(6)} {toToken.symbol}
          </div>
        )}
      </div>
    </div>
  );
}
