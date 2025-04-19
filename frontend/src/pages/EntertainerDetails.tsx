import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { deleteEntertainer, updateEntertainer } from '../api/EntertainersAPI';
import EditEntertainerForm from '../components/EditEntertainerForm';

const EntertainerDetails = () => {
  const { entertainerID } = useParams();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntertainer = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/Entertainment/AllEntertainers`
        );
        const data = await response.json();
        const found = data.entertainers.find(
          (e: Entertainer) => e.entertainerID === Number(entertainerID)
        );
        setEntertainer(found);
      } catch (err) {
        console.error('Failed to load entertainer.');
      }
    };

    fetchEntertainer();
  }, [entertainerID]);

  const handleDelete = async () => {
    if (!entertainer) return;
    if (window.confirm('Are you sure you want to delete this entertainer?')) {
      await deleteEntertainer(entertainer.entertainerID);
      navigate('/entertainers');
    }
  };

  if (!entertainer) return <p className="text-center mt-5">Loading...</p>;

  if (editMode) {
    return (
      <EditEntertainerForm
        entertainer={entertainer}
        onSuccess={() => {
          setEditMode(false);
          navigate('/entertainers');
        }}
        onCancel={() => setEditMode(false)}
      />
    );
  }

  return (
    <div className="container mt-4">
      <h2>Entertainer Details</h2>
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <strong>Stage Name:</strong> {entertainer.entStageName}
        </li>
        <li className="list-group-item">
          <strong>SSN:</strong> {entertainer.entSSN}
        </li>
        <li className="list-group-item">
          <strong>Address:</strong> {entertainer.entStreetAddress},{' '}
          {entertainer.entCity}, {entertainer.entState} {entertainer.entZipCode}
        </li>
        <li className="list-group-item">
          <strong>Phone:</strong> {entertainer.entPhoneNumber}
        </li>
        <li className="list-group-item">
          <strong>Email:</strong> {entertainer.entEMailAddress}
        </li>
        <li className="list-group-item">
          <strong>Web Page:</strong> {entertainer.entWebPage}
        </li>
        <li className="list-group-item">
          <strong>Date Entered:</strong> {entertainer.dateEntered}
        </li>
      </ul>

      <button
        className="btn btn-warning me-2"
        onClick={() => setEditMode(true)}
      >
        Edit
      </button>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default EntertainerDetails;
