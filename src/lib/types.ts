export type ApiResponse ={
  message: {
    txt: (string | null)[];
  };
  data: {
    categories: Category[];
    ios_version: string;
    ios_latest_version: string;
    google_version: string;
    huawei_version: string;
  };
}

export type Category ={
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  properties_count: number;
  image: {
    medium: string;
    thumbnail: string;
    id: number | null;
    custom_properties:  null;
    place_holder: {
      small_no_bg: string;
      medium_bg: string;
      small_bg: string;
    };
  };
  seo_tags: string[];
  is_other: boolean;
}
export type Property= {
  id: number;
  name: string;
  type: string;
  parent_id: number | null;
  options: Option[] |[]
  
}
export type Option={
  id:number;
  name:string;
  has_child:boolean
}

