import React from 'react';

import { reduxHooks } from 'hooks';
import { RequestKeys } from 'data/constants/requests';
import EnterpriseDashboardModal from 'containers/EnterpriseDashboardModal';
import SelectSessionModal from 'containers/SelectSessionModal';
import CoursesPanel from 'containers/CoursesPanel';
import { useCourseListData } from '../CoursesPanel/hooks';
import {
  CourseFilterControls,
} from 'containers/CourseFilterControls';

import LoadingView from './LoadingView';
import DashboardLayout from './DashboardLayout';
import hooks from './hooks';
import './index.scss';

export const Dashboard = () => {
  hooks.useInitializeDashboard();
  const { pageTitle } = hooks.useDashboardMessages();
  const hasCourses = reduxHooks.useHasCourses();
  const hasAvailableDashboards = reduxHooks.useHasAvailableDashboards();
  const initIsPending = reduxHooks.useRequestIsPending(RequestKeys.initialize);
  const showSelectSessionModal = reduxHooks.useShowSelectSessionModal();
   const courseListData = useCourseListData();
  return (
    <div id="dashboard" className="dashboard">
      {!initIsPending && (
        <>
          {hasAvailableDashboards && <EnterpriseDashboardModal />}
          {(hasCourses && showSelectSessionModal) && <SelectSessionModal />}
        </>
      )}
      <div className="page learner-page">
          <div className="container">
            <div class="row">
                    <div class="col-md-4 col-xl-3">
                        <CourseFilterControls {...courseListData.filterOptions} />
                    </div>
                    <div class="col-md-8 col-xl-9">
                        {initIsPending
                          ? (<LoadingView />)
                          : (
                            <DashboardLayout>
                              <CoursesPanel />
                            </DashboardLayout>
                          )}
                    </div>
                </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
