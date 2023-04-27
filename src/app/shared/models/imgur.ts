export interface ImgurResponse {
  data: ImgurDataResponse;
  success: boolean;
  status: number;
}

export interface ImgurDataResponse {
  id: string;
  title: string;
  description: string;
  datetime: number;
  type: string;
  animated: boolean;
  width: number;
  height: number;
  size: number;
  views: number;
  bandwidth: number;
  vote: string;
  favorite: boolean;
  nsfw: string;
  section: string;
  account_url: string;
  account_id: number;
  is_ad: false;
  in_most_viral: boolean;
  tags: string[];
  ad_type: 0;
  ad_url: string;
  in_gallery: boolean;
  deletehash: string;
  name: string;
  link: string;
}
