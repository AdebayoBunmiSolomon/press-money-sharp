import {
  AuthStackParamList,
  BottomTabBarStackParamList,
  RootStackParamList,
} from "@src/router/types";
import { ImageSourcePropType } from "react-native";

export type authScreenTypes = {
  screenName: keyof AuthStackParamList;
  component: React.ComponentType<any>;
};

export type appScreenTypes = {
  screenName: keyof RootStackParamList;
  component: React.ComponentType<any>;
};

export type bottomTabScreenTypes = {
  screenName: keyof BottomTabBarStackParamList;
  component: React.ComponentType<any>;
};

export type loginOptionsTypes = {
  icon: ImageSourcePropType;
}[];

export type productTypes = {
  title: string;
  price: string;
  location: string;
  image: ImageSourcePropType;
};

export type lisTypes = {
  title: string;
  subMenu: {
    list: string;
    toggle: boolean;
  }[];
}[];

export type settingsType = "whatsapp" | "phone" | "instagram" | "payment";
