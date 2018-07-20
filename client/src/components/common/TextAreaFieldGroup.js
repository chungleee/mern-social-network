import React from 'react';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({ 
  name, 
  placeholder, 
  value, 
  error, 
  info, 
  onChange
  }) => {
  return (
    <div>
      <div className="form-group">
      <textarea
        value={value}
        className={error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} 
        placeholder={placeholder}
        name={name}
        onChange={onChange} 
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (<div className='invalid-feedback'>{error}</div>)}
    </div>
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}


export default TextAreaFieldGroup