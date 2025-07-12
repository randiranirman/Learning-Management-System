import React from 'react';
import { Alert, Button, Card, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    // Reset the error state and reload the page
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
          <Card
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              textAlign: 'center',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Title level={3} style={{ color: '#ff4d4f' }}>
              Something went wrong
            </Title>
            <Alert
              message="Application Error"
              description="An unexpected error occurred. Please try reloading the page or contact support if the issue persists."
              type="error"
              style={{ marginBottom: '24px' }}
            />
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={this.handleReload}
              size="large"
            >
              Reload Page
            </Button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div style={{ marginTop: '24px', textAlign: 'left' }}>
                <Paragraph strong>Error Details (Development Only):</Paragraph>
                <pre style={{ 
                  background: '#f6f8fa', 
                  padding: '16px', 
                  borderRadius: '4px', 
                  overflow: 'auto',
                  fontSize: '12px'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
