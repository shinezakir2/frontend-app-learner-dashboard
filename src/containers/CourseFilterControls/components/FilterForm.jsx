import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import { FilterKeys } from 'data/constants/app';

import { Form } from '@openedx/paragon';

import Checkbox from './Checkbox';
import messages from '../messages';

export const filterOrder = [
  FilterKeys.inProgress,
  FilterKeys.notStarted,
  FilterKeys.done,
  FilterKeys.notEnrolled,
  FilterKeys.upgraded,
];

export const FilterForm = ({
  filters,
  handleFilterChange,
}) => {
  const { formatMessage } = useIntl();
  return (
    <Form.Group>
      <h4 className="ed-h4 side-search-and-filters-title">{formatMessage(messages.courseStatus)}</h4>
      <Form.CheckboxSet
        name="course-status-filters"
        className="sidenav-tabs"
        onChange={handleFilterChange}
        value={filters}
      >
        {filterOrder.map(filterKey => (
          <Checkbox className="sidenav-tab" filterKey={filterKey} key={filterKey} />
        ))}
      </Form.CheckboxSet>
    </Form.Group>
  );
};
FilterForm.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default FilterForm;
