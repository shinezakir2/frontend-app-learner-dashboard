import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';

import NoCoursesView from './NoCoursesView';

import CourseList from './CourseList';

import { useCourseListData } from './hooks';

import messages from './messages';

import './index.scss';

/**
 * Renders the list of CourseCards, as well as the controls (CourseFilterControls) for modifying the list.
 * Also houses the NoCoursesView to display if the user hasn't enrolled in any courses.
 * @returns List of courses as CourseCards or empty state
*/
export const CoursesPanel = () => {
  const { formatMessage } = useIntl();
  const hasCourses = reduxHooks.useHasCourses();
  const courseListData = useCourseListData();
  return (
    <div className="page-content">
       <h2 className="ed-h2 page-content-title">{formatMessage(messages.myCourses)}</h2>
      {hasCourses ? (
        <PluginSlot
          id="course_list"
        >
          <CourseList {...courseListData} />
        </PluginSlot>
      ) : (
        <PluginSlot
          id="no_courses_view"
        >
          <NoCoursesView />
        </PluginSlot>
      )}
    </div>
  );
};

CoursesPanel.propTypes = {};

export default CoursesPanel;
