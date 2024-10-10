import React from 'react';
import { Spinner } from '@openedx/paragon';

import hooks from './hooks';

export const LoadingView = () => {
  const { spinnerScreenReaderText } = hooks.useDashboardMessages();

  return (
    <div class="ed-loading-spinner"></div>
  );
};

export default LoadingView;
