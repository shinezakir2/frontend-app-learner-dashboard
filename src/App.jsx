import React from 'react';
import { Helmet } from 'react-helmet';

import { useIntl } from '@edx/frontend-platform/i18n';
import { logError } from '@edx/frontend-platform/logging';
import { initializeHotjar } from '@edx/frontend-enterprise-hotjar';

import { ErrorPage, AppContext } from '@edx/frontend-platform/react';
import FooterSlot from '@openedx/frontend-slot-footer';
import { Alert } from '@openedx/paragon';

import { RequestKeys } from 'data/constants/requests';
import store from 'data/store';
import {
  selectors,
  actions,
} from 'data/redux';
import { reduxHooks } from 'hooks';
import Dashboard from 'containers/Dashboard';

import track from 'tracking';

import fakeData from 'data/services/lms/fakeData/courses';

import AppWrapper from 'containers/WidgetContainers/AppWrapper';
import LearnerDashboardHeader from 'containers/LearnerDashboardHeader';

import { getConfig } from '@edx/frontend-platform';
import messages from './messages';
import './App.scss';
import './assets/css/adcda-ui-rtl.min.css';

export const App = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { formatMessage } = useIntl();
  const isFailed = {
    initialize: reduxHooks.useRequestIsFailed(RequestKeys.initialize),
    refreshList: reduxHooks.useRequestIsFailed(RequestKeys.refreshList),
  };
  const hasNetworkFailure = isFailed.initialize || isFailed.refreshList;
  const { supportEmail } = reduxHooks.usePlatformSettingsData();
  const loadData = reduxHooks.useLoadData();
  const year = new Date().getFullYear();
  React.useEffect(() => {
    if (authenticatedUser?.administrator || getConfig().NODE_ENV === 'development') {
      window.loadEmptyData = () => {
        loadData({ ...fakeData.globalData, courses: [] });
      };
      window.loadMockData = () => {
        loadData({
          ...fakeData.globalData,
          courses: [
            ...fakeData.courseRunData,
            ...fakeData.entitlementData,
          ],
        });
      };
      window.store = store;
      window.selectors = selectors;
      window.actions = actions;
      window.track = track;
    }
    if (getConfig().HOTJAR_APP_ID) {
      try {
        initializeHotjar({
          hotjarId: getConfig().HOTJAR_APP_ID,
          hotjarVersion: getConfig().HOTJAR_VERSION,
          hotjarDebug: !!getConfig().HOTJAR_DEBUG,
        });
      } catch (error) {
        logError(error);
      }
    }
  }, [authenticatedUser, loadData]);
  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
        <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
      </Helmet>
    <div id="outdated">
        <AppWrapper>
          <LearnerDashboardHeader />
          <main class="body-content">
            {hasNetworkFailure
              ? (
                <Alert variant="danger">
                  <ErrorPage message={formatMessage(messages.errorMessage, { supportEmail })} />
                </Alert>
              ) : (
                <Dashboard />
              )}
          </main>
        </AppWrapper>
              <div class="site-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <span class="copy">
                          &copy;{year} ADCDA.
                        </span>
                        <br />
                        <span class="copy">
                          ALL RIGHTS RESERVED.
                        </span>
                    </div>
                    <div class="col-md-4 col-6">
                        <ul>
                            <li>
                                <a class="" href="https://www.edraak.org/en/about-us">About</a>
                            </li>
                            <li>
                                
                                <a class="" href="https://www.edraak.org/blog">Our Blog</a>
                            </li>
                            <li>
                                
                                <a class="" href="https://www.edraak.org/en/help/how-it-works">How It Works</a>
                            </li>
                            <li>
                                
                                <a class="" href="https://www.edraak.org/en/help">Help Center</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-4 col-6">
                        <ul>
                            <li>
                                
                                <a class="" href="https://www.edraak.org/en/terms-of-service">Terms of Service</a>
                            </li>
                            <li>
                                
                                <a class="" href="https://www.edraak.org/en/privacy-policy">Privacy Policy</a>
                            </li>
                            <li>
                                
                                <a class="" href="https://www.edraak.org/en/cookie-policy">Cookie Policy</a>
                            </li>
                            <li>
                                
                                <a class="" href="https://www.edraak.org/en/data-processing-agreement">Data Processing Agreement</a>
                            </li>
                            <li>
                                
                                <a class="" href="https://www.edraak.org/en/contact-us">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <span class="copy visible-xs text-center">
                      All rights reserved {year} &copy;.
                    </span>

                  </div>
                </div>
            </div>
      </div>
    </>
  );
};

export default App;
