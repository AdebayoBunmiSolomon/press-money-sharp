import { AuthStackParamList } from "@src/router/types";

export type authScreenTypes = {
  screenName: keyof AuthStackParamList;
  component: React.ComponentType<any>;
};
