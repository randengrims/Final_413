import { useState } from 'react';
import { Entertainer } from '../types/Entertainer';
import { updateEntertainer } from '../api/EntertainersAPI';

interface EditEntertainerFormProps {
  entertainer: Entertainer;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditEntertainerForm = ({
  entertainer,
  onSuccess,
  onCancel,
}: EditEntertainerFormProps) => {
  const [formData, setFormData] = useState<Entertainer>({ ...entertainer });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEntertainer(formData.entertainerID, formData);
      onSuccess();
    } catch (error) {
      alert('Error updating entertainer. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Entertainer</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Stage Name</label>
          <input
            type="text"
            className="form-control"
            name="entStageName"
            value={formData.entStageName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">SSN</label>
          <input
            type="text"
            className="form-control"
            name="entSSN"
            value={formData.entSSN}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Street Address</label>
          <input
            type="text"
            className="form-control"
            name="entStreetAddress"
            value={formData.entStreetAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="entCity"
            value={formData.entCity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            name="entState"
            value={formData.entState ?? ''}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Zip Code</label>
          <input
            type="text"
            className="form-control"
            name="entZipCode"
            value={formData.entZipCode ?? ''}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="entPhoneNumber"
            value={formData.entPhoneNumber ?? ''}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Web Page</label>
          <input
            type="text"
            className="form-control"
            name="entWebPage"
            value={formData.entWebPage ?? ''}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="entEMailAddress"
            value={formData.entEMailAddress ?? ''}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Date Entered</label>
          <input
            type="date"
            className="form-control"
            name="dateEntered"
            value={formData.dateEntered ?? ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary me-2">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEntertainerForm;
