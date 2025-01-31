export interface IEventDetails {
  message: string;
  data: IEventData;
  success: boolean;
  id: string;
}

export interface IEventData {
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
  added_date: Date;
  updated_date: Date;
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
  start_date: Date;
  end_date: Date;
  use_paypal: number;
  trailer: string;
  show_duration: string;
  reference_key: null;
  has_custom_confirmation: number;
  confirmation_code: string;
  paypal_discount_value: null;
  vat: number;
  insured: number;
  third_party_buy_url: string;
  promotion_by_card: number;
  insurance_value: null;
  insurance_percentage: number;
  price_starts_from?: string | number | null;
  test_rajesh: null;
  enable_external_purchase: number;
  external_purchase_url: null;
  display_date: string;
  detail: IDataDetail;
  performances: IPerformance[];
  eventrules: IEventrule[];
  venue: IVenue;
  promoter: IPromoter;
  galleries: IGallery[];
}

export interface ITicketType {
  value: number;
  label: string;
}
export interface ITicketSelection {
  value: number;
  label: string;
}

export interface IDataDetail {
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

export interface IEventrule {
  id: number;
  event_id: number;
  rule_id: number;
  rule: IRule;
}

export interface IRule {
  id: number;
  identifier: string;
  added_date: Date;
  updated_date: Date;
  enabled: number;
  image: string;
}

export interface IGallery {
  id: number;
  identifier: string;
  img_order: number;
  img_name: "https://static.toiimg.com/thumb/msid-103359834,width-1280,height-720,resizemode-4/103359834.jpg";
  event_id: number;
}

export interface IPerformance {
  id: number;
  start_date: Date;
  end_date: Date;
  enabled: number;
  added_date: Date;
  updated_date: Date;
  event_id: number;
  venue_hall_id: number;
  salable_asset: string;
  seat_selected_automatically: number;
  dtcm_code: string;
  floor_plan_id: number;
  mobile_seat_selected_automatically: number;
  sold_out: number;
  on_hold: number;
  quantity?: number;
  tickets: ITicketElement[];
  venuehall: null;
  floorplan: IFloorplan;
}
export interface IFloorplan {
  id: number;
  identifier: string;
  dynamic_image: string;
  static_image: string;
  added_date: string;
  updated_date: string;
  is_enabled: number;
  venue_hall_id: number;
  venue_id: number;
  floorplanimages: IFloorplanimage[];
}

export interface IFloorplanimage {
  id: number;
  floor_plan_id: number;
  dynamic_image: string;
  static_image: string;
  language_id: number;
}
export interface ITicketElement {
  payment_currency: any;
  identifier: any;
  price: any;
  on_hold: any;
  id: number;
  performance_id: number;
  ticket_id: number;
  ticket: ITicketTicket;
}

export interface ITicketTicket {
  id: number;
  identifier: string;
  code: string;
  currency: string;
  credit_card_type_limitation: string;
  price: string;
  service_fee: string;
  sale_start_date: Date;
  sale_end_date: Date;
  entry_type: string;
  available_online: number;
  online_sale_start_date: Date;
  online_sale_end_date: Date;
  maximum_salable_quantity: number;
  minimum_salable_quantity_per_user: number;
  maximum_salable_quantity_per_user: number;
  available_as_digital_ticket: number;
  digital_ticket_fee: string;
  digital_ticket_availability_deadline: Date;
  available_as_paper_ticket: number;
  paper_ticket_fee: string;
  paper_ticket_availability_deadline: Date;
  child: number;
  child_order: null;
  salable_in_native_box_office: number;
  salable_in_promoter_box_office: number;
  visibility_order: number;
  active: number;
  sold_out: number;
  hidden: number;
  added_date: Date;
  updated_date: Date;
  event_id: number;
  parent_ticket_id: null;
  promotion_code: null;
  quantity?: number;
  refundable: number;
  dtcm_code: string;
  dtcm_price_category: string;
  selectable: number;
  clustered: number;
  cluster_id: null;
  digital_ticket_box_office_fee: string;
  on_hold: number;
  payment_currency: string;
  currency_exchange_rate: string;
  gate: string;
  promotion_value: null;
  detail: ITicketDetail;
}

export interface ITicketDetail {
  id: number;
  name: string;
  description: string;
  description_on_ticket: string;
  row_one_text: string;
  row_one_text_size: number;
  row_two_text: string;
  row_two_text_size: number;
  row_three_text: string;
  row_three_text_size: number;
  row_four_text: string;
  row_four_text_size: number;
  ticket_id: number;
  language_id: number;
}

export interface IVenue {
  id: number;
  identifier: string;
  slugified_identity: null;
  phone_1: string;
  phone_2: string;
  website: string;
  email: string;
  facebook: string;
  twitter: string;
  latitude: string;
  longitude: string;
  capacity: null;
  is_active: number;
  is_hidden: number;
  added_date: Date;
  updated_date: Date;
  country_id: null;
  state_id: null;
  city_id: null;
  detail: IVenueDetail;
}

export interface IVenueDetail {
  id: number;
  name: string;
  description: string;
  address: string;
  direction: string;
  meta_tag_description: string;
  venue_id: number;
  language_id: number;
}

export interface IPromoterDetails {
  message: string;
  data: IPromoter;
  success: boolean;
  id: string;
}

export interface IPromoter {
  id: number;
  identifier: string;
  phone_1: string;
  phone_2: string;
  website: string;
  email: string;
  facebook: string;
  twitter: string;
  added_date: Date;
  updated_date: Date;
  status: null;
  image_file_name: string;
  time_zone: null;
  detail: IPromoterDetail;
}

export interface IPromoterDetail {
  id: number;
  name: string;
  description: string;
  address: string;
  promoter_id: number;
  language_id: number;
}
