import { type ParamListBase } from "@react-navigation/native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";

//auth screen stack navigation
export interface AuthStackParamList extends ParamListBase {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  PasswordReset: undefined;
  VerifyEmailForPasswordUpdate: {
    email: string;
  };
  PasswordUpdate: {
    email: string;
    hash: string;
  };
  VerifyEmailForSignUp: {
    email: string;
  };
}

export type AuthScreenProps<ScreenName extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, ScreenName>;

//bottom tab-bar screen navigation
export interface BottomTabBarStackParamList extends ParamListBase {
  HomeStack: undefined;
  CategoriesStack: undefined;
  WishlistStack: undefined;
  MessagesStack: undefined;
  ProfileStack: undefined;
}

export type BottomTabBarScreenProps<
  ScreenName extends keyof BottomTabBarStackParamList
> = BottomTabScreenProps<BottomTabBarStackParamList, ScreenName>;

//native and app screen navigation
export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  Categories: undefined;
  Wishlist: undefined;
  Profile: undefined;
  Messages: undefined;
  CarDetails: {
    service_uuid: string;
  };
  CarSales: undefined;
  CarHire: undefined;
  DealersDeal: undefined;
  SpareParts: undefined;
  ConsultationServices: undefined;
  RecentlyViewed: undefined;
  ContactUs: undefined;
  Notification: undefined;
  MyCart: undefined;
  Checkout: undefined;
  Chat: undefined;
  UpdateProfile: undefined;
}

export type RootStackScreenProps<ScreenName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, ScreenName>;
