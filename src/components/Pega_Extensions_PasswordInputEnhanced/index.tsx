import { useEffect, useState, useRef } from 'react';
import { Input, FieldValueList, Text, withConfiguration, registerIcon } from '@pega/cosmos-react-core';
import * as eyeIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/eye.icon';
import * as eyeOffIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/eye-off.icon';
import type { PConnFieldProps } from '../shared/PConnProps';
import '../shared/create-nonce';

// include in bundle
import handleEvent from "./event-utils";

import StyledPegaExtensionsPasswordInputEnhancedWrapper from './styles';

registerIcon(eyeIcon, eyeOffIcon);

// interface for props
export interface PegaExtensionsPasswordInputEnhancedProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  variant?: any;
}

// interface for StateProps object
interface StateProps {
  value: string;
}

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function PegaExtensionsPasswordInputEnhanced(props: PegaExtensionsPasswordInputEnhancedProps) {
  const {
    getPConnect,
    placeholder,
    validatemessage,
    label,
    hideLabel = false,
    helperText,
    testId,
    fieldMetadata = {},
    additionalProps = {},
    displayMode,
    variant = 'inline'
  } = props;
  
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: string = stateProps.value;
  const maxLength = fieldMetadata?.maxLength;
  const hasValueChange = useRef(false);

  const { value } = props;
  let { readOnly = false, required = false, disabled = false } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    (prop) => prop === true || (typeof prop === 'string' && prop === 'true')
  );

  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string | undefined>(undefined);

  // cast status
  let myStatus: 'success' | 'warning' | 'error' | 'pending';
  // eslint-disable-next-line prefer-const
  myStatus = status as 'success' | 'warning' | 'error' | 'pending';

  useEffect(() => setInputValue(value), [value]);

  useEffect(() => {
    if (validatemessage !== '') {
      setStatus('error');
    } else if (myStatus !== 'success') {
      setStatus(undefined);
    }
  }, [validatemessage, myStatus]);

  if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
    const displayComp = value ? '********' : <span aria-hidden='true'>&ndash;&ndash;</span>;
    return displayMode === 'DISPLAY_ONLY' ? (
      <StyledPegaExtensionsPasswordInputEnhancedWrapper> {displayComp} </StyledPegaExtensionsPasswordInputEnhancedWrapper>
    ) : (
      <StyledPegaExtensionsPasswordInputEnhancedWrapper>
      <FieldValueList
        variant={hideLabel ? 'stacked' : variant}
        data-testid={testId}
        fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
      />
      </StyledPegaExtensionsPasswordInputEnhancedWrapper>
    );
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    const isValDefined = typeof value !== 'undefined' && value !== '';
    const val = isValDefined ? (
      <Text variant='h1' as='span'>
        ********
      </Text>
    ) : (
      ''
    );
    return (
      <StyledPegaExtensionsPasswordInputEnhancedWrapper>
      <FieldValueList
        variant='stacked'
        data-testid={testId}
        fields={[{ id: '2', name: hideLabel ? '' : label, value: val }]}
      />
      </StyledPegaExtensionsPasswordInputEnhancedWrapper>
    );
  }

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
    if (value !== event.target.value) {
      handleEvent(actions, 'change', propName, event.target.value);
      hasValueChange.current = true;
    }
  };

  const handleBlur = (event: any) => {
    if ((!value || hasValueChange.current) && !readOnly) {
      handleEvent(actions, 'blur', propName, event.target.value);
      hasValueChange.current = false;
    }
  };

  return (
    <StyledPegaExtensionsPasswordInputEnhancedWrapper>
    <Input
      {...additionalProps}
      type={showPassword ? 'text' : 'password'}
      actions={[{
        id: 'toggle-password',
        icon: showPassword ? 'eye-off' : 'eye',
        text: showPassword ? 'Hide password' : 'Show password',
        onClick: (id, e) => {
          e.preventDefault();
          setShowPassword(!showPassword);
        }
      }]}
      label={label}
      labelHidden={hideLabel}
      info={validatemessage || helperText}
      data-testid={testId}
      value={inputValue}
      status={myStatus}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      maxLength={maxLength}
      onChange={!readOnly ? handleChange : undefined}
      onBlur={!readOnly ? handleBlur : undefined}
    />
    </StyledPegaExtensionsPasswordInputEnhancedWrapper>
  );
}

export default withConfiguration(PegaExtensionsPasswordInputEnhanced);
