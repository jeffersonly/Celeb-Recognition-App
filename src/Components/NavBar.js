import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import {Link } from 'react-router-dom';
import '../Pages/Styling/Auth/Bar.css';
import{
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem 
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  //function for signing out of the application - uses amplify
  async function signOut() {
    await Auth.signOut()
      .then(data => {
        console.log("Signed out: "  + data);
        this.props.history.push('/login');
    })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md" className="fancy-font">
        <NavbarBrand href="/Home" className="titleStyle">Celebrity Recognition Application</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink><Link to="/Home" className="linkStyle">Identify Celebs</Link></NavLink>
            </NavItem>

            <NavItem>
              <NavLink><Link to="/NameSearch" className="linkStyle">Search for Celebrity</Link></NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <span className="linkStyle">Posts about Celebs</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/Myposts" className="dropStyle">My Posts</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem >
                     <Link to="/Otherposts" className="dropStyle">Other Posts</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink onClick={signOut}><Link to="/Login" className="linkStyle">Logout</Link></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;