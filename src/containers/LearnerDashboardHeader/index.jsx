import React from 'react';

import MasqueradeBar from 'containers/MasqueradeBar';
import { AppContext } from '@edx/frontend-platform/react';
import Header from '@edx/frontend-component-header';
import { reduxHooks } from 'hooks';
import urls from 'data/services/lms/urls';

import ConfirmEmailBanner from './ConfirmEmailBanner';

import { useLearnerDashboardHeaderMenu, findCoursesNavClicked } from './hooks';

import './index.scss';

export const LearnerDashboardHeader = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();

  const exploreCoursesClick = () => {
    findCoursesNavClicked(urls.baseAppUrl(courseSearchUrl));
  };

  const learnerHomeHeaderMenu = useLearnerDashboardHeaderMenu({
    courseSearchUrl,
    authenticatedUser,
    exploreCoursesClick,
  });

  return (
      <div class="edraak-header scrolling">
          <div class="edraak-header-container">
              <div class="edraak-header__site-navigation">
                 
                  <div class="edraak-header__search hidden-xs">
                      <form method="get" action="/courses" class="search-form" id="header-search-form" autocomplete="off">
                          <button id="search-icon-btn" class="btn-icon">
                              <i class="icon-search" id="search-icon" data-search="true"></i>
                          </button>
                          <input type="text" class="text-input" name="query" value="" id="header-search-text" data-values="[]" placeholder="Search" autocomplete="off">
                      </form>
                  </div>
              </div>
          </div>
      </div>
  );
};

LearnerDashboardHeader.propTypes = {};

export default LearnerDashboardHeader;
