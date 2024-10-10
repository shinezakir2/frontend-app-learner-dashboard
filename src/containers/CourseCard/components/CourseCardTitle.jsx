import React from 'react';
import PropTypes from 'prop-types';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import useActionDisabledState from './hooks';

const { courseTitleClicked } = track.course;

export const CourseCardTitle = ({ cardId }) => {
  const { courseName } = reduxHooks.useCardCourseData(cardId);
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const handleTitleClicked = reduxHooks.useTrackCourseEvent(
    courseTitleClicked,
    cardId,
    homeUrl,
  );
  const { disableCourseTitle } = useActionDisabledState(cardId);
  return (
    <p>
      {disableCourseTitle ? (
        <span data-testid="CourseCardTitle">{courseName}</span>
      ) : (
        <a
          href={homeUrl}
          className="ed-p1 ed-font-bold course-card__title"
          data-testid="CourseCardTitle"
          onClick={handleTitleClicked}
        >
          {courseName}
        </a>
      )}
    </p>
  );
};

CourseCardTitle.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardTitle.defaultProps = {};

export default CourseCardTitle;
