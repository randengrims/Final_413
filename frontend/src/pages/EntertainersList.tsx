import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntertainerSummary } from '../types/EntertainerSummary';
import { fetchEntertainerSummaries } from '../api/EntertainersAPI';

function EntertainerList() {
  const [entertainers, setEntertainers] = useState<EntertainerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEntertainerSummaries();
        setEntertainers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Loading entertainers...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Entertainers</h2>

      {entertainers.map((e) => (
        <div className="card mb-3 shadow-sm" key={e.entertainerID}>
          <div className="card-body">
            <h5 className="card-title">{e.entStageName}</h5>
            <p>
              <strong>Total Bookings:</strong> {e.totalBookings}
            </p>
            <p>
              <strong>Last Booking:</strong> {e.lastBookingDate ?? 'N/A'}
            </p>
            <button
              className="btn btn-primary me-2"
              onClick={() => navigate(`/entertainer/${e.entertainerID}`)}
            >
              Details
            </button>
          </div>
        </div>
      ))}

      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          onClick={() => navigate('/add-entertainer')}
        >
          Add Entertainer
        </button>
      </div>
    </div>
  );
}

export default EntertainerList;
