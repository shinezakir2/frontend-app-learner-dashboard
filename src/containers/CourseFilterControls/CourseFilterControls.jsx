import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import {
  Button,
  Form,
  Icon,
  ModalPopup,
  Sheet,
  breakpoints,
  useWindowSize,
  ModalCloseButton,
} from '@openedx/paragon';
import { Close, Tune } from '@openedx/paragon/icons';

import { reduxHooks } from 'hooks';

import FilterForm from './components/FilterForm';
import SortForm from './components/SortForm';
import useCourseFilterControlsData from './hooks';
import messages from './messages';

import './index.scss';

export const CourseFilterControls = ({
  sortBy,
  setSortBy,
  filters,
}) => {
  const { formatMessage } = useIntl();
  const hasCourses = reduxHooks.useHasCourses();
  const {
    isOpen,
    open,
    close,
    target,
    setTarget,
    handleFilterChange,
    handleSortChange,
  } = useCourseFilterControlsData({
    filters,
    setSortBy,
  });
  const { width } = useWindowSize();
  const isMobile = width < breakpoints.small.minWidth;

  return (
    <div id="course-filter-controls">
      <Form>
        {isMobile
          ? (
            <Sheet>
              <div className="p-1 mr-3">
                <b>{formatMessage(messages.refine)}</b>
              </div>
              <hr />
              <div className="filter-form-row">
                <FilterForm {...{ filters, handleFilterChange }} />
              </div>
              <div className="filter-form-row text-left m-1">
                <SortForm {...{ sortBy, handleSortChange }} />
              </div>
            </Sheet>
          ) : (
              <div id="course-filter-controls-card">
                <div className="sidenav">
                  <FilterForm {...{ filters, handleFilterChange }} />
                </div>
                <div className="text-left m-1">
                  <SortForm {...{ sortBy, handleSortChange }} />
                </div>
              </div>
          )}
      </Form>
    </div>
  );
};
CourseFilterControls.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CourseFilterControls;
