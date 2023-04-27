export interface IUnsplashResponse {
  id: string;
  created_at: Date;
  width: number;
  height: number;
  color: string;
  likes: number;
  liked_by_user: boolean;
  alt_description: string;
  description: string;
  user: IUnsplashUser;
  current_user_collections?: string[];
  urls: IUnsplashUrls;
  links: IUnsplashLinks;
}

export interface IUnsplashLinks {
  self: string;
  html: string;
  download: string;
}

export interface IUnsplashUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface IUnsplashUser {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  instagram_username: string;
  twitter_username: string;
  portfolio_url: string;
  profile_image: IUnsplashProfileImage;
  links: IUnsplashUserLink;
}

export interface IUnsplashUserLink {
  self: string;
  html: string;
  photos: string;
  likes: string;
}

export interface IUnsplashProfileImage {
  small: string;
  medium: string;
  large: string;
}
