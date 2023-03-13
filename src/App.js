import React, { useState } from "react";
import "rsuite/dist/rsuite.min.css";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import * as districtList from "./data/Mst_District.json";
import * as provinceList from "./data/Mst_Province.json";
import District from "./pages/district/District";
import Province from "./pages/province/Province";

function App() {
  function getDefaultDistrictList() {
    const list = Object.values(districtList);
    const arr = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].DistrictCode) {
        arr.push(list[i]);
      }
    }

    return arr;
  }

  function getDefaultProvinceList() {
    const list = Object.values(provinceList);
    const arr = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].ProvinceCode) {
        arr.push(list[i]);
      }
    }

    return arr;
  }

  const [data, setData] = useState({
    District: getDefaultDistrictList(),
    Province: getDefaultProvinceList(),
  });

  const components = [
    {
      key: "1",
      component: <District data={data} setData={setData} />,
      content: "Quận/Huyện",
    },
    {
      key: "2",
      component: <Province data={data} setData={setData} />,
      content: "Tỉnh/Thành Phố",
    },
  ];

  const [activeKey, setActiveKey] = React.useState("1");

  function renderComponent() {
    for (let i = 0; i < components.length; i++) {
      if (components[i].key === activeKey) {
        return components[i].component;
      }
    }
  }

  return (
    <div className="App">
      <Navbar
        navList={components}
        setActiveKey={setActiveKey}
        activeKey={activeKey}
      />
      {renderComponent()}
    </div>
  );
}

export default App;
