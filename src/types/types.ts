import { AuthStackParamList } from "@src/router/types";
import { ImageSourcePropType } from "react-native";

export type authScreenTypes = {
  screenName: keyof AuthStackParamList;
  component: React.ComponentType<any>;
};

export type loginOptionsTypes = {
  icon: ImageSourcePropType;
}[];
