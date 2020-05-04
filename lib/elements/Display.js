import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconBackspace from '@material-ui/icons/BackspaceSharp';

import NButton from './ui';
import useLongPress from '../hooks/useLongPress';
import AddBoxIcon from "@material-ui/core/SvgIcon/SvgIcon";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox'
import AddBox from '@material-ui/icons/AddBox';
const Wrapper = styled.div`
  display: flex;
  padding: 2px 5px 5px 8px;
  align-items: center;
  border: none;
`;

const Backspace = styled(NButton)`
  color: ${props => props.theme.header.primaryColor};
`;

const PlusMinus = styled(NButton)`
  color: ${props => props.theme.header.primaryColor};
  display: inline;
`;

const Input = styled.input`
  &:read-only {
    cursor: not-allowed;
  }
  border-radius: 0px;
  cursor: default;
  background: transparent;
  font-size: 1.3em;
  outline: none;
  border: none;
  width: 100%;
`;
const Display = styled.div`
  flex-grow: 1;
`;


const DisplayWrapper = ({ value, backspace,increment,decrement, longPressBackspace }) => {

    const backspaceLongPress = useLongPress(longPressBackspace, 1000);

  return (
    <Wrapper>
      <Display>
        <Input role="display" value={value} readOnly autoFocus />
          <PlusMinus  >
            <AddBox onClick={increment} />
          </PlusMinus>
          <PlusMinus onClick={decrement}>
              <IndeterminateCheckBoxIcon />
          </PlusMinus>
      </Display>
      <Backspace {...backspaceLongPress} onClick={backspace}>
        <IconBackspace />
      </Backspace>
    </Wrapper>
  );
};

DisplayWrapper.propTypes = {
  value: PropTypes.string.isRequired,
  backspace: PropTypes.func,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  longPressBackspace: PropTypes.func,
};

DisplayWrapper.defaultProps = {
  backspace: () => {},
  increment: () => {},
  decrement: () => {},
  longPressBackspace: () => {},
};

export default DisplayWrapper;
