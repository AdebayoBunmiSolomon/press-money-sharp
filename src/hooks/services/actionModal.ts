import { useState } from "react";

type actionModalType = {
  callVisible: boolean;
  messageVisible: boolean;
  whatsAppVisible: boolean;
  value: string;
};

export const useActionModal = () => {
  const [actionModal, setActionModal] = useState<actionModalType>({
    callVisible: false,
    messageVisible: false,
    whatsAppVisible: false,
    value: "",
  });
  return {
    actionModal,
    setActionModal,
  };
};
