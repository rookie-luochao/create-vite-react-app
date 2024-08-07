import { Modal } from 'antd';
import { isString } from 'lodash-es';
import { ErrorInfo, ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

function FallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{isString(error) ? error : error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function LogError(error: Error, info: ErrorInfo) {
  // Do something with the error, e.g. log to an external API
  Modal.error({
    title: error.message,
    content: info.componentStack,
    width: 756,
  });

  // use error make log
}

function ErrorBoundaryWrap({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallbackRender={FallbackRender}
      onError={LogError}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
        console.log('details:', details);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default function ErrorBoundaryWrapOutlet() {
  return (
    <ErrorBoundaryWrap>
      <Outlet />
    </ErrorBoundaryWrap>
  );
}
