export const EventTypes = [
  "HOT_EVENTS",
  "TOP_EVENTS",
  "CATCH_OF_THE_DAY",
  "CONCERTS_AND_FESTIVALS",
  "SPORT",
  "THEATRE",
  "MOVIES",
  "ARTS_AND_CULTURE",
  "PARKS_AND_ATTRACTIONS",
  "EXPERIENCES",
  "PARTIES",
  "RESTAURANTS",
  "BARS",
  "LOUNGES_AND_NIGHTCLUBS",
  "KIDS",
  "FAMILIES",
];

export interface IEventType {
  message: string;
  data: Data;
  success: boolean;
}

export interface Data {
  title: string;
  subtitle: string;
  events: Event[];
}
export interface IEventDataSetForSearch {
  key: string;
  value: string;
}
export interface IEventDataSetForSelect {
  key: number | string;
  value: string;
}

export interface Event {
  id: number;
  valid_date?: string;
  event_order?: number;
  event_id: number;
  show_title?: number;
  event?: EventData;
  detail?: EventDetail;
  image?: ImageEvent;
  galleries?: ImageGallery[];
}

export interface EventData {
  id: number;
  identifier: string;
  slugified_identifier: string;
  facebook: string;
  twitter: string;
  age_policy: string;
  has_promotion_code: number;
  email_mandatory: number;
  publish_status: string;
  type: string;
  active: number;
  free: number;
  hidden: number;
  use_dtcm: number;
  added_date: string;
  updated_date: string;
  venue_id: number;
  promoter_id: number;
  country_id: number;
  city_id: number;
  template_id: number;
  has_custom_gac: number;
  google_analytics_code: string;
  ticket_template: string;
  has_custom_fbc: number;
  facebook_code: string;
  has_custom_purchase: number;
  purchase_code: string;
  purchase_disable_for_mobile: number;
  start_date: string;
  end_date: string;
  display_date: string;
  use_paypal: number;
  trailer: string;
  show_duration: string;
  reference_key: any;
  has_custom_confirmation: number;
  confirmation_code: string;
  paypal_discount_value: any;
  vat: number;
  insured: number;
  third_party_buy_url: string;
  promotion_by_card: number;
  insurance_value?: string;
  insurance_percentage: number;
  test_rajesh: any;
  enable_external_purchase: number;
  external_purchase_url: any;
  venue?: Venue;
}

export interface EventDetail {
  id: number;
  name: string;
  description: string;
  short_description: string;
  meta_tag_description: string;
  meta_tag_keyword: string;
  event_id: number;
  language_id: number;
  terms: string;
  short_terms: string;
  trailer: string;
  insurance_description: string;
  insurance_terms: string;
  commercial_register_number: string;
  tax_id: string;
  national_number: string;
}

export interface ImageEvent {
  id: number;
  identifier: string;
  tag: string;
  event_id: number;
  detail: ImageEventDetail;
}

export interface ImageEventDetail {
  id: number;
  name: string;
  image_id: number;
  language_id: number;
}

export interface ImageGallery {
  id: number;
  identifier: string;
  im_order: number;
  event_id: number;
  img_name: string;
}

export interface Venue {
  id: number;
  identifier: string;
  slugified_identity: string;
  phone_1: string;
  phone_2: string;
  website: string;
  email: string;
  facebook: string;
  twitter: string;
  latitude: string;
  longitude: string;
  capacity: string;
  is_active: boolean;
  is_hidden: boolean;
  country_id: number;
  state_id: number;
  city_id: number;
  detail?: VenueDetail;
}

export interface VenueDetail {
  id: number;
  name: string;
  description: string;
  address: string;
  direction: string;
  meta_tag_description: string;
  venue_id: number;
  language_id: number;
}
