import React from "react";
import { Nav, Sidenav } from "rsuite";

const styles = {
  width: 240,
  marginRight: 10,
  height: "100vh",
};

const navItemStyle = {
  padding: "10px 0",
  borderBottom: "1px solid black",
};

const Navbar = ({
  appearance,
  openKeys,
  expanded,
  onOpenChange,
  onExpand,
  ...navProps
}) => {
  return (
    <div style={styles}>
      <Sidenav
        appearance={appearance}
        expanded={true}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ height: "100%" }}
      >
        <Sidenav.Body>
          <Nav {...navProps}>
            <Nav.Item eventKey="1-1" style={navItemStyle}>
              Quận/Huyện
            </Nav.Item>
            <Nav.Item eventKey="1-2" style={navItemStyle}>
              Tỉnh/Thành phố
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default Navbar;
