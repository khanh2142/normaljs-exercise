import React, { useEffect, useState } from "react";
import DistrictEdit from "./components/DistrictEdit";

function District({ data, setData }) {
  const [list, setList] = useState(data.District);
  const [params, setParams] = useState({
    DistrictCode: "",
    DistrictName: "",
  });
  const [currentComponent, setCurrentComponent] = useState(null);

  function handleSearch() {
    const arr = data.District;
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      if (
        (!params.DistrictCode || params.DistrictCode === "") &&
        (!params.DistrictName || params.DistrictName === "")
      ) {
        newArr.push(item);
      } else if (
        item.DistrictCode &&
        item.DistrictCode.toLowerCase().indexOf(
          params.DistrictCode.toLowerCase()
        ) !== -1 &&
        (!params.DistrictName || params.DistrictName === "")
      ) {
        newArr.push(item);
      } else if (
        item.DistrictName &&
        item.DistrictName.toLowerCase().indexOf(
          params.DistrictName.toLowerCase()
        ) !== -1 &&
        (!params.DistrictCode || params.DistrictCode === "")
      ) {
        newArr.push(item);
      } else if (
        item.DistrictCode &&
        item.DistrictCode.toLowerCase().indexOf(
          params.DistrictCode.toLowerCase()
        ) !== -1 &&
        item.DistrictName &&
        item.DistrictName.toLowerCase().indexOf(
          params.DistrictName.toLowerCase()
        ) !== -1
      ) {
        newArr.push(item);
      }
    }

    const finalArr = [];
    for (let i = 0; i < newArr.length; i++) {
      const item = newArr[i];
      finalArr.push(Object.assign({}, item, { Idx: i + 1 }));
    }

    setList(finalArr);
  }

  function handleEdit(currentItem) {
    function handleSave(formValue) {
      const arr = data.District;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].DistrictCode === formValue.DistrictCode) {
          arr[i] = formValue;
        }
      }

      setData(Object.assign({}, data, { District: arr }));

      handleBack();
    }

    setCurrentComponent(
      <DistrictEdit
        handleBack={handleBack}
        listProvince={data.Province}
        currentItem={currentItem}
        handleSave={handleSave}
        title="Chỉnh sửa"
      />
    );
  }

  function handleDelete(currentItem) {
    if (
      window.confirm(`Bạn có muốn xóa quận/huyện: ${currentItem.DistrictName}`)
    ) {
      const arr = data.District;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].DistrictCode === currentItem.DistrictCode) {
          arr.splice(i, 1);
        }
      }

      setData(Object.assign({}, data, { District: arr }));
    }
  }

  function handleBack() {
    setCurrentComponent(null);
  }

  function handleAdd() {
    function handleSave(formValue) {
      const arr = data.District;
      let check = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].DistrictCode === formValue.DistrictCode) {
          check = true;
        }
      }
      if (check === false) {
        arr.push(formValue);
        setData(Object.assign({}, data, { District: arr }));
        handleBack();
      } else {
        alert("Mã quận/huyện đã tồn tại!");
        return;
      }
    }

    setCurrentComponent(
      <DistrictEdit
        handleBack={handleBack}
        listProvince={data.Province}
        handleSave={handleSave}
        title="Thêm mới"
      />
    );
  }

  useEffect(() => {
    setList(data.District);
  }, [data]);

  function renderSearch() {
    return (
      <div
        style={{
          display: "flex",
          gap: 10,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div>
          <label style={{ marginRight: 10 }}>Mã quận/huyện</label>
          <input
            onChange={function (e) {
              setParams({
                DistrictCode: e.target.value,
                DistrictName: params.DistrictName,
              });
            }}
          />
        </div>
        <div>
          <label style={{ marginRight: 10 }}>Tên quận/huyện</label>
          <input
            onChange={function (e) {
              setParams({
                DistrictCode: params.DistrictCode,
                DistrictName: e.target.value,
              });
            }}
          />
        </div>
        <button
          style={{ padding: "5px 10px", backgroundColor: "#73d13d" }}
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
        <button
          style={{ padding: "5px 10px", backgroundColor: "#b37feb" }}
          onClick={handleAdd}
        >
          Thêm
        </button>
      </div>
    );
  }

  function renderTable() {
    const renderReacNode = [];
    for (let i = 0; i < list.length; i++) {
      renderReacNode.push(
        <tr>
          <td>{list[i].DistrictCode}</td>
          <td>{list[i].DistrictName}</td>
          <td>{list[i].ProvinceCode}</td>
          <td>
            <span style={{ display: "flex", gap: 10 }}>
              <button
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#fff566",
                }}
                onClick={() => handleEdit(list[i])}
              >
                Sửa
              </button>
              <button
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#ff4d4f",
                }}
                onClick={() => handleDelete(list[i])}
              >
                Xóa
              </button>
            </span>
          </td>
        </tr>
      );
    }

    return renderReacNode;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        padding: 10,
      }}
    >
      {currentComponent || (
        <>
          {renderSearch()}
          <div style={{ height: 550, overflow: "auto", marginTop: 50 }}>
            <table border={1}>
              <tr>
                <th>DistrictCode</th>
                <th>DistrictName</th>
                <th>ProvinceCode</th>
                <th></th>
              </tr>
              <tbody>{renderTable()}</tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default District;
