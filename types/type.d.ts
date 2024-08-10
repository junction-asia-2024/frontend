type FlowState =
  | 'idle'
  | 'where_you_find_that'
  | 'detail_information'
  | 'register_complaint';

type FlowContext = {
  id: number;
  complaintType: string;
  address: string;
  description?: string;
  phone?: string;
  img?: string;
  location?: {
    lat: number;
    lng: number;
  };
};
