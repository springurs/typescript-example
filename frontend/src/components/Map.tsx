import { MapPinIcon } from 'lucide-react';
import { useContext } from 'react';
import FetchProviderContext from '../provider/FetchProvider';

type MapResponse = {
  id: string;
  name: string;
  code: string;
  status: string;
  zones?: Array<unknown>;
};

export default function Map() {
  const { response } = useContext(FetchProviderContext);
  const mapResponse = response as MapResponse | null;
  const hasResponse = mapResponse !== null && mapResponse !== undefined;
  const zonesCount = mapResponse?.zones?.length ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPinIcon className="text-slate-500" size={18} />
          <div>
            <p className="text-sm font-semibold text-slate-800">Facility Map</p>
            <p className="text-xs text-slate-500">Overview & metadata</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {hasResponse ? mapResponse?.status ?? 'active' : 'No facility selected'}
        </span>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-slate-800">
              {hasResponse ? mapResponse?.name : 'Select a facility to view the map'}
            </p>
            <p className="text-xs text-slate-500">
              {hasResponse ? `Code: ${mapResponse?.code ?? '—'}` : 'Pick a facility above'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Zones</p>
            <p className="text-lg font-semibold text-slate-800">{hasResponse ? zonesCount : '—'}</p>
          </div>
        </div>

        <div className="flex h-56 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50">
          <div className="h-24 w-24 rounded-full bg-emerald-100"></div>
          <p className="text-sm font-medium text-slate-600">Map preview</p>
          <p className="text-xs text-slate-400">Map rendering placeholder</p>
        </div>
      </div>
    </div>
  );
}
