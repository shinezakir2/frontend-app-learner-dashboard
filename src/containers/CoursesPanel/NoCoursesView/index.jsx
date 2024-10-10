import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Image } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import { baseAppUrl } from 'data/services/lms/urls';

import emptyCourseSVG from 'assets/empty-course.svg';
import { reduxHooks } from 'hooks';
import messages from './messages';
import './index.scss';

export const NoCoursesView = () => {
  const { formatMessage } = useIntl();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  return (
    <div class="content-placeholder">
        <Image src={emptyCourseSVG} alt={formatMessage(messages.bannerAlt)} className="content-placeholder-img" />
        <h4 class="ed-h4 content-placeholder-text">{formatMessage(messages.lookingForChallengePrompt)}</h4>
        <p>
            {formatMessage(messages.exploreCoursesPrompt)}
          </p>
        <a variant="brand"
        href={baseAppUrl(courseSearchUrl)} class="ed-btn ed-btn-outline-secondary content-placeholder-btn">
            {formatMessage(messages.exploreCoursesButton)}
        </a>
    </div>
  );
};

export default NoCoursesView;
