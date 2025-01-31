import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "./QueryKeys";
import axiosInstance from "@/services/axiosConfig";
import { IPerformance } from "@/model/IEventDetail";

const eventDetailsService = {
  getEventById: async (eventId): Promise<IEventDetailResponse> => {
    const response = await axiosInstance.get<IEventDetailResponse>(
      `event-detail/${eventId}`
    );
    return response?.data;
  },
};

export const useGetEventDetailById = ({
  initialData,
  enabled = true,
  key,
}: {
  initialData;
  enabled: boolean;
  key: string;
}) => {
  const {
    data,
    isLoading: isFetching,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [QueryKeys?.GET_EVENT_DETAILS_BY_ID, { key }],
    queryFn: () => eventDetailsService?.getEventById(initialData?.id),
    enabled,
  });
  const isLoading = isRefetching || isFetching;
  return {
    data,
    isLoading,
    refetch,
  };
};

// event.ts

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
  use_paypal: number;
  trailer: string;
  show_duration: string;
  reference_key: string | null;
  has_custom_confirmation: number;
  confirmation_code: string;
  paypal_discount_value: string | null;
  vat: number;
  insured: number;
  third_party_buy_url: string;
  promotion_by_card: number;
  insurance_value: string;
  insurance_percentage: number;
  test_rajesh: string | null;
  enable_external_purchase: number;
  external_purchase_url: string | null;
  display_date: string;
  price_starts_from: string;
  currency: string;
  liked: number;
  detail: EventDetail;
  performances: IPerformance[];
  eventrules: EventRule[];
  addons: Addon[];
  venue: Venue;
  promoter: Promoter;
  galleries: Gallery[];
  tickets: Ticket[];
}

export interface EventDetail {
  id: number;
  name: string;
  description: string;
  short_terms: string;
  trailer: string;
  insurance_description: string;
  insurance_terms: string;
  commercial_register_number: string;
  tax_id: string;
  national_number: string;
  amenities: Amenity[];
  inclusions: any[];
  amenity: AmenityMapping;
  inclusion: any;
}

export interface Amenity {
  id: number;
  name: string;
  category: string;
  added_date: string;
  updated_date: string;
}

export interface AmenityMapping {
  id: number;
  event_id: number;
  amenities: string;
  added_date: string;
  updated_date: string | null;
}

export interface IEventPerformance {
  id: number;
  start_date: Date;
  end_date: string;
  enabled: number;
  added_date: string;
  updated_date: string | null;
  event_id: number;
  venue_hall_id: number;
  salable_asset: string;
  seat_selected_automatically: number;
  dtcm_code: string;
  floor_plan_id: number;
  mobile_seat_selected_automatically: number;
  sold_out: number;
  on_hold: number;
  tickets: TicketItem[];
  venuehall: null;
  floorplan: FloorPlan;
}

export interface TicketItem {
  id: number;
  performance_id: number;
  ticket_id: number;
  ticket: Ticket;
}

export interface FloorPlan {
  id: number;
  identifier: string;
  dynamic_image: string;
  static_image: string;
  added_date: string;
  updated_date: string;
  is_enabled: number;
  venue_hall_id: number;
  venue_id: number;
  floorplanimages: FloorPlanImage[];
}

export interface FloorPlanImage {
  id: number;
  floor_plan_id: number;
  dynamic_image: string;
  static_image: string;
  language_id: number;
}

export interface EventRule {
  id: number;
  event_id: number;
  rule_id: number;
  rule: Rule;
}

export interface Rule {
  id: number;
  identifier: string;
  added_date: string;
  updated_date: string;
  enabled: number;
  image: string;
}

export interface Addon {
  id: number;
  event_id: number;
  name: string;
  description: string;
  price: string;
  add_by_default: boolean;
  added_date: string;
  updated_date: string;
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
  country_id: string | null;
  state_id: string | null;
  city_id: string | null;
  detail: VenueDetail;
  floorplans: FloorPlan[];
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

export interface Promoter {
  id: number;
  identifier: string;
  type: string;
  phone_1: string;
  phone_2: string;
  email: string;
  website: string;
  commercial_register_number: string | null;
  tax_id: string | null;
  country_id: string | null;
  city_id: string | null;
  facebook: string;
  twitter: string;
  added_date: string;
  updated_date: string;
  status: number;
  image_file_name: string;
  time_zone: string;
  detail: PromoterDetail;
}

export interface PromoterDetail {
  id: number;
  name: string;
  address: string;
  description: string;
  promoter_id: number;
  language_id: number;
}

export interface Gallery {
  id: number;
  identifier: string;
  img_order: number;
  img_name: string;
  event_id: number;
}

export interface Ticket {
  id: number;
  identifier: string;
  code: string;
  currency: string;
  credit_card_type_limitation: string;
  price: string;
  service_fee: string;
  sale_start_date: string;
  sale_end_date: string;
  entry_type: string;
  available_online: number;
  online_sale_start_date: string;
  online_sale_end_date: string;
  maximum_salable_quantity: number;
  minimum_salable_quantity_per_user: number;
  maximum_salable_quantity_per_user: number;
  available_as_digital_ticket: number;
  digital_ticket_fee: string;
  digital_ticket_availability_deadline: string;
  available_as_paper_ticket: number;
  paper_ticket_fee: string;
  paper_ticket_availability_deadline: string;
  child: number;
  child_order: string | null;
  salable_in_native_box_office: number;
  salable_in_promoter_box_office: number;
  visibility_order: number;
  active: number;
  sold_out: number;
  hidden: number;
  added_date: string;
  updated_date: string;
  event_id: number;
  parent_ticket_id: string | null;
  promotion_code: string | null;
  refundable: number;
  dtcm_code: string;
  dtcm_price_category: string;
  selectable: number;
  clustered: number;
  cluster_id: string | null;
  digital_ticket_box_office_fee: string;
  on_hold: number;
  payment_currency: string;
  currency_exchange_rate: string;
  gate: string;
  promotion_value: string | null;
  salable_only_as_complementary: number;
}

export interface IEventDetailResponse {
  message: string;
  data: EventData;
  success: boolean;
  id: string;
}
