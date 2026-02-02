import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../utils/fetcher';
import type { Facility } from './useGetFacility';

export default function useGetFacilities() {
  return useQuery<Array<Facility>>({
    queryKey: ['facilities'],
    queryFn: () => fetcher('/facilities'),
  });
}
