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
                        {learnerHomeHeaderMenu.mainMenu.map((item, index) => (
                            <div class="edraak-header__navigation-link">
                                <a class="nav-link" href={item.href}>{item.content}</a>
                            </div>
                        ))}                        
                    </div>
                </div>
                <div class="edraak-header__site-controls hidden-xs">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <span class="avatar">
                                {/*<img class="avatar-img" src="${static.url('images/user.svg')}" data-src="${static.url('images/user.svg')}">*/}</span>
                            <span class="username">{authenticatedUser?.username}</span>
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {learnerHomeHeaderMenu.userMenu[0].items.map((item, index) => (
                                <li><a href={item.href}>{item.content}</a></li>
                            ))}
                        </ul>
                    </li>
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
