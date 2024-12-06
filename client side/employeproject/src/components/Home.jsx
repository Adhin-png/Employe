import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { listEmploye } from '../apis/fetchapi';

function Home() {
    const [employs, setEmploy] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmploys, setFilteredEmploys] = useState([]);

    useEffect(() => {
        const header = {
            "Authorization": `Token ${sessionStorage.getItem("token")}`,
            "Content-Type": 'application/json'
        };

        listEmploye(header)
            .then((res) => {
                setEmploy(res.data);
                setFilteredEmploys(res.data); 
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = employs.filter(emp =>
            emp.name.toLowerCase().includes(query) ||
            emp.email.toLowerCase().includes(query) ||
            emp.phone_number.toLowerCase().includes(query) ||
            emp.address.toLowerCase().includes(query)
        );
        setFilteredEmploys(filtered);
    };

    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col md={3} sm={12}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control mt-3"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </Col>
                    <Col md={9} sm={12}>
                        <table className='mt-3 table table-bordered table-st bg-warning'>
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>PHONE</th>
                                    <th>ADDRESS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredEmploys.length !== 0 ? (
                                        filteredEmploys.map((emp) => (
                                            <tr key={emp.id}>
                                                <td>{emp.name}</td>
                                                <td>{emp.email}</td>
                                                <td>{emp.phone_number}</td>
                                                <td>{emp.address}</td>
                                                <td>
                                                    <Link to={`/detail/${emp.id}`} className='btn btn-success mt-3'>View</Link>
                                                    <Link to={`/edit/${emp.id}`} className='btn btn-success mt-3'>Edit</Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">No Data Found</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default Home;
