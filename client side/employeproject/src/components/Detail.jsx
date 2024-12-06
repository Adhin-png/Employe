import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { employeDetail, employeDelete } from '../apis/fetchapi';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';

function Detail() {
  const [employe, setEmploye] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchemployeDetail = async () => {
      try {
        const res = await employeDetail(id);
        setEmploye(res.data);
      } catch (error) {
        console.error("Error fetching employe detail:", error);
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized! Please log in again.");
          navigate("/login");
        } else {
          toast.error("Failed to load todo details.");
        }
      }
    };
    fetchemployeDetail();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await employeDelete(id);
      toast.success("employe deleted successfully!");
      navigate('/home');
    } catch (error) {
      console.error("Error deleting employe:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please log in again.");
        navigate("/home");
      } else {
        toast.error("Failed to delete todo.");
      }
    }
  };

  return (
    <div>
      <Row>
        <Col md={4}></Col>
        <Col md={4} className='mt-5'>
          <Card style={{ width: '18rem' }}>
            <Card.Header>Employe Detail</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>NAME:</strong> {employe.name || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>EMAIL:</strong> {employe.email || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>PHONE:</strong> {employe.phone_number || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>ADDRESS:</strong> {employe.address || "N/A"}
              </ListGroup.Item>
            </ListGroup>
            <div className="mt-3">
              <button className='btn btn-danger' onClick={handleDelete}>
                Delete
              </button>
            </div>
          </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}

export default Detail;
