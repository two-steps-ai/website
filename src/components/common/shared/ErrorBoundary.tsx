import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  FallbackComponent?: React.ComponentType<{ error: Error }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Default fallback UI if no FallbackComponent is provided.
const DefaultFallback: React.FC<{ error: Error; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center p-8">
      <h2 className="text-xl font-bold text-red-500 mb-4">Something went wrong</h2>
      <p className="text-gray-400 mb-4">{error.message}</p>
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  // Update state when an error is encountered.
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Log error details for debugging.
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  // Retry handler can reset error state or reload the page.
  // Uncomment the setState call if you prefer a state reset over a full reload.
  private handleRetry = () => {
    // this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    const { hasError, error } = this.state;
    if (hasError && error) {
      const { FallbackComponent } = this.props;
      return FallbackComponent ? (
        <FallbackComponent error={error} />
      ) : (
        <DefaultFallback error={error} onRetry={this.handleRetry} />
      );
    }
    return this.props.children;
  }
}
