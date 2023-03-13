import React, { useEffect, useState } from "react";
import ProvinceEdit from "./components/ProvinceEdit";

function Province({ data, setData }) {
  const [list, setList] = useState(data.Province);
  const [params, setParams] = useState({
    ProvinceCode: "",
    ProvinceName: "",
  });
  const [currentComponent, setCurrentComponent] = useState(null);

  function handleSearch() {
    const arr = data.Province;
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      if (
        (!params.ProvinceCode || params.ProvinceCode === "") &&
        (!params.ProvinceName || params.ProvinceName === "")
      ) {
        newArr.push(item);
      } else if (
        item.ProvinceCode &&
        item.ProvinceCode.toLowerCase().indexOf(
          params.ProvinceCode.toLowerCase()
        ) !== -1 &&
        (!params.ProvinceName || params.ProvinceName === "")
      ) {
        newArr.push(item);
      } else if (
        item.ProvinceName &&
        item.ProvinceName.toLowerCase().indexOf(
          params.ProvinceName.toLowerCase()
        ) !== -1 &&
        (!params.ProvinceCode || params.ProvinceCode === "")
      ) {
        newArr.push(item);
      } else if (
        item.ProvinceCode &&
        item.ProvinceCode.toLowerCase().indexOf(
          params.ProvinceCode.toLowerCase()
        ) !== -1 &&
        item.ProvinceName &&
        item.ProvinceName.toLowerCase().indexOf(
          params.ProvinceName.toLowerCase()
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
      const arr = data.Province;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].ProvinceCode === formValue.ProvinceCode) {
          arr[i] = formValue;
        }
      }

      setData(Object.assign({}, data, { Province: arr }));

      handleBack();
    }

    setCurrentComponent(
      <ProvinceEdit
        handleBack={handleBack}
        currentItem={currentItem}
        handleSave={handleSave}
        title="Chỉnh sửa"
      />
    );
  }

  function handleDelete(currentItem) {
    if (
      window.confirm(
        `Bạn có muốn xóa tỉnh/thành phố: ${currentItem.ProvinceName}`
      )
    ) {
      const arr = data.Province;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].ProvinceCode === currentItem.ProvinceCode) {
          arr.splice(i, 1);
        }
      }

      setData(Object.assign({}, data, { Province: arr }));
    }
  }

  function handleBack() {
    setCurrentComponent(null);
  }

  function handleAdd() {
    function handleSave(formValue) {
      const arr = data.Province;
      let check = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].ProvinceCode === formValue.ProvinceCode) {
          check = true;
        }
      }
      if (check === false) {
        arr.push(formValue);
        setData(Object.assign({}, data, { Province: arr }));
        handleBack();
      } else {
        alert("Mã quận/huyện đã tồn tại!");
        return;
      }
    }

    setCurrentComponent(
      <ProvinceEdit
        handleBack={handleBack}
        handleSave={handleSave}
        title="Thêm mới"
      />
    );
  }

  useEffect(() => {
    setList(data.Province);
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
                ProvinceCode: e.target.value,
                ProvinceName: params.ProvinceName,
              });
            }}
          />
        </div>
        <div>
          <label style={{ marginRight: 10 }}>Tên quận/huyện</label>
          <input
            onChange={function (e) {
              setParams({
                ProvinceCode: params.ProvinceCode,
                ProvinceName: e.target.value,
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
          <td>{list[i].ProvinceCode}</td>
          <td>{list[i].ProvinceName}</td>
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
          <div style={{ height: 500, overflow: "auto", marginTop: 50 }}>
            <table border={1}>
              <tr>
                <th>ProvinceCode</th>
                <th>ProvinceName</th>
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

export default Province;
