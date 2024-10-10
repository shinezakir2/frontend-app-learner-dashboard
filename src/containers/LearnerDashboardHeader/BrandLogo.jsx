import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';

import { getConfig } from '@edx/frontend-platform';
import messages from './messages';

export const BrandLogo = () => {
  const { formatMessage } = useIntl();
  const dashboard = reduxHooks.useEnterpriseDashboardData();

  return (
        <a href={dashboard?.url || '/'}>
            <img class="ed-header-logo" src={getConfig().LOGO_URL} alt={formatMessage(messages.logoAltText)} />
        </a>
  );
};

BrandLogo.propTypes = {};

export default BrandLogo;
