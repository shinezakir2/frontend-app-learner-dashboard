import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';

import { getConfig } from '@edx/frontend-platform';
import messages from './messages';

export const BrandLogo = () => {
  const { formatMessage } = useIntl();
  const dashboard = reduxHooks.useEnterpriseDashboardData();

  return (
    <a href={dashboard?.url || '/'} className="edraak-header__brand hidden-sm hidden-xs">
    <img loading="lazy"
        className="logo"
        src={getConfig().LOGO_URL}
        alt={formatMessage(messages.logoAltText)}
      />
      </a>
  );
};

BrandLogo.propTypes = {};

export default BrandLogo;
