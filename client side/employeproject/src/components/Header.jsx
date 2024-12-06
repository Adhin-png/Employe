import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar expand="lg" className="bg-primary text-white shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="#home" className="d-flex align-items-center text-white">
          <i className="fa-solid fa-list-check me-2" style={{ fontSize: '1.5rem' }} />
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>EMPLOYEE MANAGEMENT APP</span>
        </Navbar.Brand>
        <div className="d-flex">
          <Link to="/add" className="btn btn-success shadow-sm me-2"><i className="fa-solid fa-user-plus" style={{ color: "white", fontSize: '1.5rem', marginRight: '0.5rem' }} />
          Add Employee</Link>

          <Link to="/profile" className="btn btn-light shadow-sm">
            <i className="fa-solid fa-user" style={{ color: "white", fontSize: '1.5rem', marginRight: '0.5rem' }} />
            Profile
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
