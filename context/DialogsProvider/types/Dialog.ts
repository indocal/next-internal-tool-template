export type Dialog = {
  isOpen: boolean;
  open: (onOpen?: () => void | Promise<void>) => void;
  close: (onClose?: () => void | Promise<void>) => void;
};

export default Dialog;
