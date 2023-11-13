import React, { ForwardedRef, forwardRef } from 'react';
import { useMergeRefs } from '../../hooks/index.js';
import { PopupMenuProvider } from './PopupMenuProvider.js';
import { PopupMenuStyle } from './PopupMenuStyles.js';
import { PopupMenuProps } from './types.js';
import { usePopupFocus } from './usePopupFocus.js';

export const PopupMenu = forwardRef(
  (
    { variant, children, onKeyDown, onMouseMove, ...rest }: PopupMenuProps,
    externalRef?: ForwardedRef<HTMLDivElement>,
  ) => {
    const {
      ref: controlRef,
      handleMouseMove,
      handleKeyDown,
      handleEnter,
      handleExit,
    } = usePopupFocus({ onMouseMove, onKeyDown });
    const popupRef = useMergeRefs([controlRef, externalRef]);

    return (
      <PopupMenuStyle
        onMouseMove={handleMouseMove}
        onKeyDown={handleKeyDown}
        onEnter={handleEnter}
        onExit={handleExit}
        tabIndex={-1}
        role="listbox"
        {...rest}
        ref={popupRef}
      >
        <PopupMenuProvider variant={variant}>{children}</PopupMenuProvider>
      </PopupMenuStyle>
    );
  },
);
PopupMenu.displayName = 'PopupMenu';
