type ErrorData = {
  message: string;
  email: string;
  confirm_email: string;
  password: string;
  confirm_password: string;
  "profile.first_name": string;
  "profile.last_name": string;
  "profile.gender_id": number;
  "profile.nationality_id": number;
  "profile.country_id": number;
  "profile.birth_date": string;
  "profile.phone_number": string;
  agree_terms: boolean;
};

type ResponseError = {
  error: ErrorData | null | undefined;
};

type ResponseData = {
  data: ResponseError;
  message: string;
};

type Response = {
  response: ResponseData;
  error: ErrorData | null | undefined;
  message: string;
  success: boolean;
  token: string;
  user: any | null | undefined;
};

export default Response;