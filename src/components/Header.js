import { useEffect, useState } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    navigate("/")
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    setUser(user)
  }, [])

  return (
    <Navbar bg="primary" expand="md" varirant="dark">
      <Container>
        <Navbar.Brand href="#home">Expenses Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <div className="nav-link fw-bolder text-wraning">
                  Welcome Back {user?.fName}!
                </div>
                <Link to="/" className="nav-link" onClick={handleLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
