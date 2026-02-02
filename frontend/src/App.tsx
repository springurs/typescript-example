import FacilityPicker from './components/FacilityPicker';
import Map from './components/Map';
import { FetchProvider } from './provider/FetchProvider';

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <FetchProvider>
        <div className="flex flex-col bg-slate-100 p-8 rounded-2xl gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase font-medium">Select Facility</span>
            <FacilityPicker />
          </label>
        </div>

        <div className="flex flex-col border border-slate-300 rounded-2xl p-8 gap-4">
          <Map />
        </div>
      </FetchProvider>
    </div>
  );
}

export default App;
