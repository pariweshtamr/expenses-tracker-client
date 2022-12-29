import { Container, Nav, Navbar } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    navigate("/")
  }

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
                  Welcome Back {user?.name.split(" ").slice(0, -1).join(" ")}!
                </div>
                <Link to="/" className="nav-link" onClick={handleLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
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
