import React from 'react';
import PropTypes from 'prop-types';

const SelectListGroup = ({ 
  name, 
  value, 
  error, 
  info, 
  onChange,
  options
  }) => {
    const selectOptions = options.map((option) => {
      return <option label={option.label} value={option.value}>{option.value}</option>
    })

  return (
    <div>
      <div className="form-group">
      <select
        value={value}
        className={error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} 
        name={name}
        onChange={onChange} 
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (<div className='invalid-feedback'>{error}</div>)}
    </div>
    </div>
  )
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}


export default SelectListGroup