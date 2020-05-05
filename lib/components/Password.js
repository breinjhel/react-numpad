import React from 'react';
import PropTypes from 'prop-types';
import { KeyPad } from '../elements';
import NumPad from './NumPad';
import StaticWrapper from './StaticWrapper';

const positiveValidation = value => {
  // FIX -0 to be considered positive
  if (value === 0 && Object.is(value, -0)) {
    return false;
  }
  return parseFloat(value) >= 0;
};

const integerValidation = value => parseFloat(value) % 1 === 0;

const numberValidator = (decimal, negative,max,min) => value => {
  if (value === '-' && negative) {
    return true;
  }
  if (Number.isNaN(Number(value))) {
    return false;
  }




  const floatValue = parseFloat(value);

  if (!decimal && !integerValidation(floatValue)) {
    return false;
  }

  if (typeof decimal === 'number' && decimal > 0) {
    if ((floatValue.toString().split('.')[1] || '').length > decimal) {
      return false;
    }
  }

  if (!negative && !positiveValidation(floatValue)) {
    return false;
  }

  if(max != null ){
    if(value > max){
      return false;
    }
  }

  if(min != null){
    if(value < min ){
      return false
    }
  }
  return true;
};

const PassswordInput = ({ inline, children, keyValidator, decimal, negative,max,min,increment, ...props }) => {
  const validation = value => numberValidator(decimal, negative,max,min)(value);

  let validator = keyValidator;
  if (!validator) {
    validator = value => numberValidator(decimal, negative,max,min)(value);
  }

  const keyValid = isValid => (value = '', key) => {
    if (key === '-') {
      return value.charAt(0) === '-' || isValid(key + value);
    }
    return isValid(key === '.' ? value + key + 1 : value + key);
  };

  const displayRule = value => value.replace(/^(-)?0+(0\.|\d)/, '$1$2'); // remove leading zeros

  if (inline) {
    return (
      <StaticWrapper {...props} displayRule={displayRule}>
        <KeyPad
          validation={validation}
          keyValid={keyValid(validator)}
          displayRule={displayRule}
          incrementNum={increment}
          decimal={decimal}
          {...props}
        />
      </StaticWrapper>
    );
  }
  return (
    <NumPad {...props} customInput={children} displayRule={displayRule}>
      <KeyPad
        validation={validation}
        keyValid={keyValid(validator)}
        displayRule={displayRule}
        incrementNum={increment}
        decimal={decimal}
        mask
        {...props}
      />
    </NumPad>
  );
};

PassswordInput.propTypes = {
  inline: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  keyValidator: PropTypes.func,
  decimal: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  negative: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  increment: PropTypes.number,
};

PassswordInput.defaultProps = {
  inline: false,
  children: undefined,
  keyValidator: undefined,
  decimal: true,
  negative: true,
  max: null,
  min: null,
  increment: 1
};

export default PassswordInput;
export { numberValidator, positiveValidation, integerValidation };
