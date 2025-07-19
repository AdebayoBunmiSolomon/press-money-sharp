export type apiGetAllServicesResponse = {
  id: number;
  uuid: string;
  category: string;
  brand: string;
  type: string;
  model: string;
  fee: number;
  description: string;
  imageUrls: string[];
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
  imageUrls: string[];
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | any;
  location: string;
};
