export interface EventDetail {
  id: number;
  name: string;
  description: string;
  trailer: string;
  insurance_description: string;
  insurance_terms: string;
  commercial_register_number: string;
  tax_id: string;
  national_number: string;
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

export interface Venue {
  id: number;
  identifier: string;
  slugified_identity: string | null;
  phone_1: string;
  phone_2: string;
  website: string;
  email: string;
  facebook: string;
  twitter: string;
  latitude: string;
  longitude: string;
  capacity: number;
  is_active: number;
  is_hidden: number;
  added_date: string;
  updated_date: string;
  country_id: number | null;
  state_id: number | null;
  city_id: number | null;
  detail: VenueDetail;
}

export interface Gallery {
  id: number;
  identifier: string;
  img_order: number;
  img_name: string;
  event_id: number;
}

export interface ImageDetail {
  id: number;
  name: string;
  image_id: number;
  language_id: number;
}

export interface Image {
  id: number;
  identifier: string;
  tag: string;
  event_id: number;
  detail: ImageDetail;
}

export interface Event {
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
  use_paypal: number;
  trailer: string;
  show_duration: string;
  reference_key: string | null;
  has_custom_confirmation: number;
  confirmation_code: string;
  paypal_discount_value: number | null;
  vat: number;
  insured: number;
  third_party_buy_url: string;
  promotion_by_card: number;
  insurance_value: string;
  insurance_percentage: number;
  enable_external_purchase: number;
  external_purchase_url: string | null;
  display_date: string;
  detail: EventDetail;
  venue: Venue;
  galleries: Gallery[];
  images: Image[];
}

export interface IWishListEvent {
  id: number;
  user_id: number;
  event_id: number;
  event: Event;
}
