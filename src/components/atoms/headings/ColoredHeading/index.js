import React from 'react';
import PropTypes from 'prop-types';

const ColoredHeading = (props) => {
  const { coloredHeading } = props;
  const Element = `h${coloredHeading.level}`;

  let classes = ['ma__colored-heading'];
  if (coloredHeading.color) {
    classes.push(`ma__colored-heading--${coloredHeading.color}`);
  }
  classes = classes.join(' ');

  return(
    <Element className={classes} tabIndex="-1">
      {coloredHeading.text}
    </Element>
  );
};

ColoredHeading.propTypes = {
  coloredHeading: PropTypes.shape({
    text: PropTypes.string.isRequired,
    level: PropTypes.string,
    color: PropTypes.oneOf(['','green','blue'])
  })
};

ColoredHeading.defaultProps = {
  coloredHeading: {
    text: 'Colored Heading',
    level: '2',
    color: ''
  }
};

export default ColoredHeading;
