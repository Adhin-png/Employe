import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { addEmploye } from '../apis/fetchapi';
import { toast } from 'react-toastify';

function Add() {
  const [addEmploys, setAddEmploy] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    dynamic_fields: [], 
  });

  const navigate = useNavigate();

  const addDynamicField = () => {
    setAddEmploy({
      ...addEmploys,
      dynamic_fields: [
        ...addEmploys.dynamic_fields,
        { label: "", type: "text", value: "" }, 
      ],
    });
  };

  const handleDynamicFieldChange = (index, key, value) => {
    const updatedFields = [...addEmploys.dynamic_fields];
    updatedFields[index][key] = value;
    setAddEmploy({ ...addEmploys, dynamic_fields: updatedFields });
  };

  const submitData = () => {
    const header = {
      Authorization: `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    const { name, email, phone_number, address } = addEmploys;

    if (!name || !email || !phone_number || !address) {
      toast.warning("Invalid input");
      return;
    }

    addEmploye(addEmploys, header)
      .then((res) => {
        console.log(res.data);
        toast.success("Added successfully");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        toast.error("Failed to add employee");
      });
  };

  return (
    <div className="container p-5 d-flex flex-column align-items-center">
      <div className="w-50 p-5 border shadow">
        <h4 className="text-center">Add Employee</h4>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(e) => setAddEmploy({ ...addEmploys, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setAddEmploy({ ...addEmploys, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Phone Number"
            onChange={(e) => setAddEmploy({ ...addEmploys, phone_number: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            onChange={(e) => setAddEmploy({ ...addEmploys, address: e.target.value })}
          />
        </Form.Group>

        {addEmploys.dynamic_fields.map((field, index) => (
          <div key={index} className="mb-3">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Field Label"
                value={field.label}
                onChange={(e) => handleDynamicFieldChange(index, "label", e.target.value)}
                className="mb-2"
              />
              <Form.Select
                value={field.type}
                onChange={(e) => handleDynamicFieldChange(index, "type", e.target.value)}
                className="mb-2"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
                <option value="date">Date</option>
              </Form.Select>
              <Form.Control
                type={field.type}
                placeholder={`Enter ${field.label}`}
                value={field.value}
                onChange={(e) => handleDynamicFieldChange(index, "value", e.target.value)}
              />
            </Form.Group>
          </div>
        ))}

        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={addDynamicField}>
            Add Field
          </button>
        </div>

        <div className="d-flex justify-content-around">
          <button className="btn btn-success" onClick={submitData}>
            Submit
          </button>
          <Link to="/home" className="btn btn-danger">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Add;
