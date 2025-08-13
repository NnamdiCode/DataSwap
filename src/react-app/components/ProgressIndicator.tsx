import { CheckCircle, Circle, Loader2 } from 'lucide-react';
import { UploadProgress } from '@/react-app/hooks/useWeb3';

interface ProgressIndicatorProps {
  progress: UploadProgress;
}

export default function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  const steps = [
    { key: 'uploading', label: 'Uploading to Irys', description: 'Storing data on Irys blockchain' },
    { key: 'tokenizing', label: 'Creating Tokens', description: 'Generating ERC-20 tokens for your data' },
    { key: 'creating_pool', label: 'Setting up Pool', description: 'Creating AMM liquidity pool' },
    { key: 'completed', label: 'Completed', description: 'Ready for trading!' },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === progress.step);
  };

  const isStepCompleted = (stepIndex: number) => {
    return stepIndex < getCurrentStepIndex() || progress.step === 'completed';
  };

  const isStepActive = (stepIndex: number) => {
    return stepIndex === getCurrentStepIndex() && progress.step !== 'completed';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-card border border-dark-border rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold mb-2">Processing Your Data</h3>
          <p className="text-gray-400 text-sm">{progress.message}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{progress.progress}%</span>
          </div>
          <div className="w-full bg-dark-border rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-neon-green to-neon-blue rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress.progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {isStepCompleted(index) ? (
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                ) : isStepActive(index) ? (
                  <Loader2 className="w-5 h-5 text-neon-blue animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium text-sm ${
                  isStepCompleted(index) ? 'text-neon-green' : 
                  isStepActive(index) ? 'text-neon-blue' : 'text-gray-500'
                }`}>
                  {step.label}
                </p>
                <p className="text-xs text-gray-400 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {progress.step === 'completed' && (
          <div className="mt-6 p-4 bg-neon-green/10 border border-neon-green/20 rounded-lg">
            <p className="text-neon-green text-sm font-medium text-center">
              🎉 Your data has been successfully tokenized and is ready for trading!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
