import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@openedx/paragon';

import { useIsCollapsed } from './hooks';
import CourseCardBanners from './components/CourseCardBanners';
import CourseCardImage from './components/CourseCardImage';
import CourseCardMenu from './components/CourseCardMenu';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';
import useCardDetailsData from './components/CourseCardDetails/hooks';
import './CourseCard.scss';

export const CourseCard = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
    const orientation = isCollapsed ? 'vertical' : 'horizontal';
    const {
        providerName,
        accessMessage,
        isEntitlement,
        isFulfilled,
        canChange,
        openSessionModal,
        courseNumber,
        changeOrLeaveSessionMessage,
    } = useCardDetailsData({ cardId });

  return (
    <div className="ed-card course-card" id={cardId} data-testid="CourseCard">
          <div>
              <div className="course-card__image-container">
                  <CourseCardImage cardId={cardId} orientation="horizontal" />
                  <span class="course-card__image-type-overlay course">Course</span>
              </div>
              <div class="ed-card-body">
                  <CourseCardDetails cardId={cardId} />
                  <CourseCardMenu cardId={cardId} />
                  
                  <CourseCardTitle cardId={cardId} />
              </div>
              <div class="ed-card-footer">
                  
                  <div class="course-card__footer-info">
                      <p class="ed-p5 ed-font-bold course-card__duration">
                      {!(isEntitlement && !isFulfilled) && accessMessage && (
                          ` • ${accessMessage}`
                          )}
                      </p>
                      <p class="ed-p5 ed-font-bold course-card__status">
                      {isEntitlement && isFulfilled && canChange ? (
                          <>
                              {' • '}
                              <Button variant="link" size="inline" className="m-0 p-0" onClick={openSessionModal}>
                                  {changeOrLeaveSessionMessage}
                              </Button>
                          </>
                      ) : null}
                      </p>
                  </div>
                  <CourseCardActions cardId={cardId} />
              </div>
          </div>
    </div>
  );
};
CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
