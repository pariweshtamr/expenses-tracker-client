import React from "react"
import { Container } from "react-bootstrap"
import Header from "../Header"

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <Container className="mt-5">{children}</Container>

      <footer className="text-center bg-dark text-light p-5 mt-5">
        &copy; all right resrved 2022 || Made with fun by ME
      </footer>
    </div>
  )
}

export default Layout
