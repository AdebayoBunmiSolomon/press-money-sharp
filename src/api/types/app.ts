import { settingsType } from "@src/types/types";

export type apiGetAllServicesResponse = {
  id: number;
  uuid: string;
  category: string;
  brand: string;
  type: string;
  model: string;
  fee: number;
  description: string;
  image_urls: string[];
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | any;
  location: string;
};

export type apiViewServicesResponse = {
  id: number;
  uuid: string;
  category: string;
  brand: string;
  type: string;
  model: string;
  fee: number;
  description: string;
  image_urls: string[];
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | any;
  location: string;
};

export type apiSendMessage = {
  message: string;
  service: string; //service_uuid
};

export type apiGetSettingsResponse = {
  id: number;
  uuid: string;
  type: settingsType;
  value: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type apiGetUserNotificationsResponse = {};
