import { useEffect } from 'react';
import { React } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import axios from 'axios';
import { faCircleUser, faUserAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavBar() {

  const [userFullName, setUserFullName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserFullName = async () => {
      try {
        const baseURL = 'http://localhost:5273';
        //const baseURL = 'http://5cg9523v7n:8082';

        const response = await axios.get(`${baseURL}/api/user`, {
          withCredentials: true,
          headers: {
            'Authorization': 'Negotiate'
          }
        });
        //console.log('API response:', response.data); // Add this line to log the API response
        setUserFullName(response.data);
      } catch (error) {
        console.error('Error fetching user name:', error);
        setError('Error fetching user name');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserFullName();
  }, []);


  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">SQL Query Builder Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Reports" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/pension">Pension</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/earnings">Earnings</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/deductions">Deductions</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/deductions">HR</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/deductions">L and A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/deductions">GL</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/all-reports">All Reports</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <div>
              
              {isLoading ? (
                <span>Loading... </span>
              ) : error ? (
                <span style={{ color: 'red' }}>{error} </span>
              ) : userFullName ? (
                <>                  
                  <FontAwesomeIcon icon={faUserCircle} size='lg' style={{ marginRight: '0.5rem' }} />
                  <span style={{ color: 'green' }}>{userFullName} </span>
                </>
              ) : (
                <span>... </span>
              )}
              
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;