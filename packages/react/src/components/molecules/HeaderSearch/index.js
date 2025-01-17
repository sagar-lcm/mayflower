/**
 * HeaderSearch module.
 * @module @massds/mayflower-react/HeaderSearch
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import TypeAheadDropdown from 'MayflowerReactForms/TypeAheadDropdown';
// eslint-disable-next-line import/no-unresolved
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultText };
  }

  handleChange = (event) => {
    const query = event.target.value;
    this.setState({ value: query });
    // invokes custom function if passed in the component
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(query);
    }
  }

  handleSubmit = (event) => {
    if (is.fn(this.props.onSubmit)) {
      this.props.onSubmit(event);
    }
  };

  render() {
    const headerSearch = { ...this.props };
    const orgDropdown = headerSearch.orgDropdown;
    const shouldShowTypeAhead = (orgDropdown && orgDropdown.dropdownButton && orgDropdown.inputText);
    const inputProps = {
      id: headerSearch.id,
      className: 'ma__header-search__input',
      placeholder: headerSearch.placeholder,
      onChange: this.handleChange,
      type: 'search',
      value: this.state.value
    };
    if (this.props.inputRef) {
      inputProps.ref = this.props.inputRef;
    }
    headerSearch.buttonSearch.icon = <IconSearch />;
    return(
      <div className="ma__header-search__wrapper ma__header-search__wrapper--responsive">
        {shouldShowTypeAhead
          && (
          <div className="ma__header-search__pre-filter">
            <TypeAheadDropdown {...orgDropdown} />
          </div>
          )}
        <div className="ma__header-search">
          <form action="#" className="ma__form" onSubmit={this.handleSubmit} role="search">
            <label
              htmlFor={headerSearch.id}
              className="ma__header-search__label"
            >
              {headerSearch.label}
            </label>
            <input {...inputProps} />
            {this.props.suggestions && this.props.suggestions}
            {this.props.postInputFilter && (
              <div className="ma__header-search__post-filter">
                {this.props.postInputFilter}
              </div>
            )}
            <ButtonWithIcon {...headerSearch.buttonSearch} />
          </form>
        </div>
      </div>
    );
  }
}

HeaderSearch.propTypes = {
  /** The ID for the input */
  id: PropTypes.string,
  /** The label text for the input */
  label: PropTypes.string,
  /** The placeholder text for the input */
  placeholder: PropTypes.string,
  /** The Search button */
  buttonSearch: PropTypes.shape(ButtonWithIcon.propTypes),
  /** Custom submit function */
  onSubmit: PropTypes.func,
  /** Custom change function for the text input */
  onChange: PropTypes.func,
  /** Default input text value */
  defaultText: PropTypes.string,
  /** Render suggestions as passable element */
  suggestions: PropTypes.element,
  /** @molecules/TypeAheadDropdown */
  orgDropdown: PropTypes.shape(TypeAheadDropdown.propTypes),
  /** postInputFilter passable component */
  postInputFilter: PropTypes.element,
  /** A ref object as created by React.createRef(). Will be applied to the input element. */
  inputRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    /* eslint-disable-next-line react/forbid-prop-types */
    PropTypes.shape({ current: PropTypes.object })
  ])
};

HeaderSearch.defaultProps = {
  id: 'header-search',
  label: 'Search terms',
  placeholder: 'Search Mass.gov',
  buttonSearch: {
    usage: 'secondary'
  }
};

export default HeaderSearch;
