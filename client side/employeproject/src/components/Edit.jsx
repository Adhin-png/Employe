import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { employeDetail, employeUpdate } from '../apis/fetchapi';
import { toast } from 'react-toastify';

function Edit() {
  const [empdetail, setEmployedetail] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",

  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeDetails = async () => {
      try {
        const res = await employeDetail(id);
        setEmployedetail(res.data);
      } catch (error) {
        console.error("Error fetching todo details:", error);
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized! Please log in again.");
          navigate('/home');
        } else {
          toast.error("Failed to load todo details.");
        }
      }
    };
    fetchEmployeDetails();
  }, [id, navigate]);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await employeUpdate(id, empdetail);
      toast.success("Employe updated successfully!");
      navigate('/home');
    } catch (error) {
      console.error("Error updating employe:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please log in again.");
        navigate('/home');
      } else {
        toast.error("Failed to update employe.");
      }
    }
  };

  return (
    <div className='container p-5 d-flex flex-column align-item-center'>
      <div className='w-50 p-5 border shadow'>
        <h4 className='text-center'>Edit Employe</h4>
        <FloatingLabel controlId="floatingName" label="name" className="mb-3">
          <Form.Control
            type="text"
            onChange={(e) => setEmployedetail({ ...empdetail, name: e.target.value })}
            value={empdetail.name}
            placeholder="Enter name"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingAddress" label="email" className="mb-3">
          <Form.Control
            type="text"
            onChange={(e) => setEmployedetail({ ...empdetail, email: e.target.value })}
            value={empdetail.email}
            placeholder="Enter email"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingAddress" label="phone" className="mb-3">
          <Form.Control
            type="text"
            onChange={(e) => setEmployedetail({ ...empdetail, phone_number: e.target.value })}
            value={empdetail.phone_number}
            placeholder="Enter phone no"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingAddress" label="address" className="mb-3">
          <Form.Control
            type="text"
            onChange={(e) => setEmployedetail({ ...empdetail, address: e.target.value })}
            value={empdetail.address}
            placeholder="Enter address"
          />
        </FloatingLabel>

        <div className='d-flex justify-content-around'>
          <button className='btn btn-success' onClick={updateData}>Submit</button>
          <Link to="/" className='btn btn-danger'>Cancel</Link>
        </div>
      </div>
    </div>
  );
}

export default Edit;
