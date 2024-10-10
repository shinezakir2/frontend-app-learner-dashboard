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
    <div class="ed-header">
        <div class="ed-header-logo-and-menu">
            <BrandLogo />
            <ul class="ed-header-nav">
                {learnerHomeHeaderMenu.mainMenu.map((item, index) => (
                    <li class="ed-header-nav-item">
                        <a class="ed-header-nav-link" href={item.href}>{item.content}</a>
                    </li>
                ))} 
            </ul>
        </div>
        <ul class="ed-header-nav right">
            <li class="ed-header-nav-item profile-nav-item dropdown">
                <a class="ed-header-nav-link ed-header-btn-drop" href="#">{authenticatedUser?.username}</a>

                <div class="dropdown-content right-menu" id="profile-dropdown">
                    <div class="dropdown-content-container">
                        <div class="dropdown-row">
                            <ul class="dropdown-list">
                                 {learnerHomeHeaderMenu.userMenu[0].items.map((item, index) => (
                                    <li class="dropdown-list-item"><a href={item.href}>{item.content}</a></li>
                                ))}
                            </ul>
                             <ul class="dropdown-list">
                                 {learnerHomeHeaderMenu.userMenu[1].items.map((item, index) => (
                                    <li class="dropdown-list-item"><a href={item.href}>{item.content}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
            <li class="language-toggle">
                <a data-href="/learn/" title="/learn/" data-cookie="openedx-language-preference=ar; max-age=1209600; path=/; domain=.edraak.org" class="change-lang-btn lang ed-header-nav-item ed-header-nav-link circle">
                    ع
                </a>
            </li>
        </ul>
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
