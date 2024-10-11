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

import './CourseCard.scss';

export const CourseCard = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  return (
    <div className="ed-card course-card" id={cardId} data-testid="CourseCard">
          <div>
              <div className="course-card__image-container">
                  <CourseCardImage cardId={cardId} orientation="horizontal" />
                  <span class="course-card__image-type-overlay course">Course</span>
              </div>
              <div class="ed-card-body">
                  <p class="ed-p4 ed-font-bold course-card__organization">LMS</p>
                  <div class="ed-card__options-menu">
                      <button class="ed-btn ed-btn-ghost ed-card__options-menu-btn" type="button">...</button>
                      <ul class="ed-card__options-menu-list">
                          <li class="ed-card__options-menu-list-item">
                              <p class="ed-p4 ed-card__options-menu-list-item-text">Un-Enroll</p>
                          </li>
                      </ul>
                  </div>
                  <CourseCardTitle cardId={cardId} />
              </div>
              <div class="ed-card-footer">
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
