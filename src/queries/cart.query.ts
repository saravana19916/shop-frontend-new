import axiosInstance from "@/services/axiosConfig";
import { IPurchaseSession } from "@/model/IPurchaseSessionType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "./QueryKeys";
import { IPostCartPayload } from "@/services/cart.services";

export const useGetCartDetailById = ({
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
    queryKey: [QueryKeys?.GET_CART_BY_ID, { key }],
    queryFn: () => cartService?.getCartById(initialData?.id),
    enabled,
  });
  const isLoading = isFetching;

  return {
    data,
    isLoading,
    refetch,
    isRefetching,
  };
};
export const useGetCart = ({
  initialData,
  enabled = true,
  key,
}: {
  initialData?;
  enabled?: boolean;
  key: string;
}) => {
  const {
    data,
    isLoading: isFetching,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [QueryKeys?.GET_CART, { key }],
    queryFn: () => cartService.getCart(),
    enabled,
  });
  const isLoading = isRefetching || isFetching;
  return {
    data,
    isLoading,
    refetch,
  };
};
export const useAddToCart = () => {
  return useMutation({
    mutationKey: [QueryKeys?.CREATE_PURCHASE_SESSION],
    mutationFn: (payload: IPostCartPayload) => cartService.addToCart(payload),
    onSuccess: () => {},
    onError: () => {},
  });
};
export const useDeleteFromCart = () => {
  return useMutation({
    mutationKey: [QueryKeys?.CREATE_PURCHASE_SESSION],
    mutationFn: ({
      purchase_session_id,
      ticket_id,
    }: {
      purchase_session_id: number | string;
      ticket_id: number | string;
    }) => cartService.deleteFromCart({ purchase_session_id, ticket_id }),
    onSuccess: () => {},
    onError: () => {},
  });
};

const cartService = {
  getCartById: async (eventId): Promise<CartDataResponse> => {
    const response = await axiosInstance.get<CartDataResponse>(
      `getcart/${eventId}`
    );
    return response.data;
  },
  getCart: async (): Promise<CartDataAllResponse> => {
    const response = await axiosInstance.get(`getcart`);
    return response.data;
  },
  addToCart: async (payload: IPostCartPayload): Promise<CartDataResponse> => {
    const response = await axiosInstance.post(`addtocart`, payload);
    return response.data;
  },
  deleteFromCart: async ({
    purchase_session_id,
    ticket_id,
  }: {
    purchase_session_id: number | string;
    ticket_id: number | string;
  }): Promise<CartDataResponse> => {
    const response = await axiosInstance.delete(
      `deletefromcart/${purchase_session_id}/${ticket_id}`
    );
    return response.data;
  },
};
export default cartService;

type Ticket = {
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
};

type Event = {
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
  tickets: Ticket[];
};

export interface CartDataResponse {
  message: string;
  data: {
    id: number;
    ip_address: string;
    country: string | null;
    start_date: string;
    end_date: string;
    user_id: string | null;
    event_id: number;
    insured: number;
    performances: any[];
    encrypted_identifier: string;
    reference_number: string;
    event: Event;
  };
  success: boolean;
}
export interface CartDataAllResponse {
  message: string;
  data: CartData[];
  success: boolean;
}

export interface CartData {
  id: number;
  ip_address: string;
  country: string | null;
  start_date: string;
  end_date: string;
  user_id: string | null;
  event_id: number;
  insured: number;
  performances: any[];
  encrypted_identifier: string;
  reference_number: string;
  event: Event;
}

export interface IDeleteFromCartPayload {
  event_id: number;
  performance_id: number;
  ticket_id: number;
  block_id?: number;
  row_id?: number;
  seat_id?: number;
  quantity?: number;
}
