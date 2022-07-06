import { useState, useCallback } from 'react';

import { Dialog } from '../../types';

export function useDialogHandler(): Dialog {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback(
    async (onOpen?: () => void | Promise<void>) => {
      setOpen(true);

      onOpen && (await onOpen());
    },
    []
  );

  const handleClose = useCallback(
    async (onClose?: () => void | Promise<void>) => {
      setOpen(false);

      onClose && (await onClose());
    },
    []
  );

  return {
    isOpen: open,
    open: handleOpen,
    close: handleClose,
  };
}

export default useDialogHandler;
