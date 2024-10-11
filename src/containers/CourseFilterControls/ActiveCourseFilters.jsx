import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import closeSVG from 'assets/images/icons/close.svg';
import { Button, Chip } from '@openedx/paragon';
import { CloseSmall } from '@openedx/paragon/icons';
import { reduxHooks } from 'hooks';

import messages from './messages';
import './index.scss';

export const ActiveCourseFilters = ({
  filters,
  handleRemoveFilter,
}) => {
  const { formatMessage } = useIntl();
  const clearFilters = reduxHooks.useClearFilters();
  return (
    <div id="course-list-active-filters" className="selectedFilters">
        {filters.map(filter => (
        <div class="filterItem">
            <span class="filterItemName">
            {formatMessage(messages[filter])}
            </span>
            <img onClick={handleRemoveFilter(filter)} key={filter} src={closeSVG} class="closeBtn" alt="close" />
        </div>
      ))}
      <Button variant="link" onClick={clearFilters}>
        {formatMessage(messages.clearAll)}
      </Button>
    </div>
  );
};
ActiveCourseFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleRemoveFilter: PropTypes.func.isRequired,
};

export default ActiveCourseFilters;
