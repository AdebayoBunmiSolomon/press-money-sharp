import { showFlashMsg } from "@src/helper/ui-utils";

export interface IResponseHandler {
  status: 200 | 401 | 500 | 422;
  success: boolean;
  code: string;
  message: string;
}

export const RESPONSE_HANDLER = ({
  status,
  success,
  code,
  message,
}: IResponseHandler) => {
  let msgType: "SUCCESS" | "ERROR" | "FAILED" = "SUCCESS";

  switch (status) {
    case 200:
      msgType = "SUCCESS";
      break;
    case 401:
      msgType = "ERROR";
      break;
    case 422:
      msgType = "ERROR";
      break;
    case 500:
      msgType = "FAILED";
      break;
    default:
      msgType = "ERROR";
  }

  showFlashMsg({
    msgType,
    title: code,
    description: message,
  });

  console.log("Message", `${status}\n${success}\n${code}\n${message}`);
};
