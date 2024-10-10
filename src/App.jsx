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
    <div class="transparent">
        <AppWrapper>
          <LearnerDashboardHeader />
          <main class="adcda_page">
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
              <div class="site-footer-new">
                  <div class="container contentContainer">
                      <div class="row">
                          <div class="col-xs-12 col-sm-6">
                              <div class="left-container">
                                  <div class="row">
                                      <div class="col-xs-6">
                                          <div class="more-links">
                                              <h3 class="footer-title">More</h3>
                                              <div class="links-list">
                                                  <a class="link-item" href="/blog">Our Blog</a>
                                                  <a class="link-item" href="/help">Help center</a>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="col-xs-6">
                                          <div class="more-links">
                                              <h3 class="footer-title">About us</h3>
                                              <div class="links-list">
                                                  <a class="link-item" href="/about">About Us</a>
                                                  <a class="link-item" href="/donate">Donate</a>
                                                  <a class="link-item" href="/privacy">Privacy Policy</a>
                                                  <a class="link-item" href="/contact">Contact Us</a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="copyright-container">
                              <span class="copyright-text">©${datetime.now().year} ADCDA LMS</span>
                              <span class="copyright-text">All rights reserved</span>
                          </div>
                      </div>
                  </div>
              </div>
      </div>
    </>
  );
};

export default App;
