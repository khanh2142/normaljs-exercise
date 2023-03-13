import React from "react";

const Navbar = ({ navList, setActiveKey, activeKey }) => {
  function returnNavItem() {
    const arrayReactNode = [];

    if (navList && navList.length > 0) {
      for (let i = 0; i < navList.length; i++) {
        arrayReactNode.push(
          <div
            key={navList[i].key}
            onClick={() => handleSetActiveKey(navList[i].key)}
            style={{
              backgroundColor: navList[i].key == activeKey && "blanchedalmond",
              padding: 10,
              cursor: "pointer",
            }}
          >
            {navList[i].content}
          </div>
        );
      }
    }

    return arrayReactNode;
  }

  function handleSetActiveKey(key) {
    setActiveKey(key);
  }

  return (
    <div
      style={{
        backgroundColor: "#f3f3f3",
        width: 300,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {returnNavItem()}
    </div>
  );
};

export default Navbar;
