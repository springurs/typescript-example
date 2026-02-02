export type Facility = {
  id: string;
  name: string;
  map_config: { latitude: number; longitude: number };
  city: string;
  state: string;
  country_code: string;
  postal_code: string;
  locale: string;
  time_zone: string;
  status: 'active' | 'inactive';
};

export default function useGetFacility() {
  return {};
}
