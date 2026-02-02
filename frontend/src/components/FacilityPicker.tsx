import { LoaderCircleIcon } from 'lucide-react';
import { useContext, useState, type ChangeEvent } from 'react';
import useGetFacilities from '../hooks/useGetFacilities';
import type { Facility } from '../hooks/useGetFacility';
import FetchProviderContext from '../provider/FetchProvider';

export default function FacilityPicker() {
  const [facility, setFacility] = useState<Facility | null>(null);
  const { data: facilities, error, isLoading } = useGetFacilities();
  const { fetcher, setResponse } = useContext(FetchProviderContext);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const _facility = facilities?.find((facility) => facility.id === event.target.value);
    setFacility(_facility ?? null);
    fetcher(`/facility/${_facility?.id}`).then((response) => {
      setResponse(response);
    });
    
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-sm gap-2">
        <LoaderCircleIcon className="animate-spin" size={16} />
        <span>Loading facilities...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-rose-600">Error loading facilities</div>;
  }

  return (
    <select
      name="facility"
      className="p-2 border border-slate-300 rounded-lg bg-white text-sm m-0"
      value={facility?.id ?? ''}
      onChange={handleChange}
    >
      <option value="">Select a facility</option>

      {facilities?.map((facility) => (
        <option key={facility.id} value={facility.id}>
          {facility.name}
        </option>
      ))}
    </select>
  );
}
