import React from 'react';

import MasqueradeBar from 'containers/MasqueradeBar';
import { AppContext } from '@edx/frontend-platform/react';
import Header from '@edx/frontend-component-header';
import { reduxHooks } from 'hooks';
import urls from 'data/services/lms/urls';
import BrandLogo from './BrandLogo';
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
                    <BrandLogo />
                    <ConfirmEmailBanner />
                    <div class="edraak-header__navigation-links hidden-xs">
                        <div class="edraak-header__navigation-link">
                            <a class="nav-link" href="test"
                                aria-current="test">
                                    test link
                            </a>
                        </div>
                    </div>
                    <div class="edraak-header__search hidden-xs">
                        
                    </div>
                    <div class="edraak-header__site-controls hidden-xs">
                        <a class="btn btn-primary btn-rounded btn-wide btn-header btn-header-dashboard" href="https://programs.edraak.org/en/learn/">
                            Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

  //return (
  //  <>
  //    <ConfirmEmailBanner />
  //    <Header
  //      mainMenuItems={learnerHomeHeaderMenu.mainMenu}
  //      secondaryMenuItems={learnerHomeHeaderMenu.secondaryMenu}
  //      userMenuItems={learnerHomeHeaderMenu.userMenu}
  //    />
  //    <MasqueradeBar />
  //  </>
  //);
};

LearnerDashboardHeader.propTypes = {};

export default LearnerDashboardHeader;
