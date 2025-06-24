import { useState } from "react";

type actionModalType = {
  callVisible: boolean;
  messageVisible: boolean;
  whatsAppVisible: boolean;
};

export const useActionModal = () => {
  const [actionModal, setActionModal] = useState<actionModalType>({
    callVisible: false,
    messageVisible: false,
    whatsAppVisible: false,
  });
  return {
    actionModal,
    setActionModal,
  };
};
