import React, { ForwardedRef, forwardRef } from 'react';
import { InputMessageStyle } from './InputStyles.js';
import { InputGroupStyle, InputGroupContentStyle } from './InputGroupStyles.js';
import { InputGroupProps } from './types.js';

export const InputGroup = forwardRef(
  (
    { fullwidth = false, error, success, children, ...rest }: InputGroupProps,
    ref?: ForwardedRef<HTMLSpanElement>,
  ) => {
    const hasError = !!error;
    const hasSuccess = !!success && !error;

    return (
      <InputGroupStyle $fullwidth={fullwidth} {...rest} ref={ref}>
        <InputGroupContentStyle>{children}</InputGroupContentStyle>
        {hasError && (
          <InputMessageStyle $variant="error">{error}</InputMessageStyle>
        )}
        {hasSuccess && (
          <InputMessageStyle $variant="success">{success}</InputMessageStyle>
        )}
      </InputGroupStyle>
    );
  },
);
InputGroup.displayName = 'InputGroup';
