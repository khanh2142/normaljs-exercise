import React, { useEffect, useState } from "react";

function DistrictEdit({
  handleBack,
  listProvince,
  currentItem,
  handleSave,
  title,
}) {
  const [formValue, setFormValue] = useState({
    DistrictCode: undefined,
    DistrictName: undefined,
    ProvinceCode: undefined,
  });

  useEffect(function () {
    if (currentItem) {
      setFormValue(currentItem);
    }
  }, []);

  function handleSubmit() {
    if (
      !formValue.DistrictCode ||
      !formValue.DistrictName ||
      !formValue.ProvinceCode
    ) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }

    handleSave(formValue);
  }

  function renderProvinceList() {
    const renderReactNode = [];
    for (let i = 0; i < listProvince.length; i++) {
      renderReactNode.push(
        <option
          key={listProvince[i].ProvinceCode}
          value={listProvince[i].ProvinceCode}
        >
          {listProvince[i].ProvinceName}
        </option>
      );
    }

    return renderReactNode;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexDirection: "column",
        padding: 10,
        alignItems: "flex-start",
      }}
    >
      <div>{title}</div>
      <div>
        <label style={{ marginRight: 10 }}>Mã quận/huyện</label>
        <input
          required
          value={formValue.DistrictCode}
          onChange={function (e) {
            setFormValue(
              Object.assign({}, formValue, { DistrictCode: e.target.value })
            );
          }}
          disabled={currentItem}
        />
      </div>
      <div>
        <label style={{ marginRight: 10 }}>Tên quận/huyện</label>
        <input
          required
          value={formValue.DistrictName}
          onChange={function (e) {
            setFormValue(
              Object.assign({}, formValue, { DistrictName: e.target.value })
            );
          }}
        />
      </div>
      <div>
        <label style={{ marginRight: 10 }}>Tên tỉnh/thành phố</label>
        <select
          value={formValue.ProvinceCode}
          onChange={function (e) {
            setFormValue(
              Object.assign({}, formValue, { ProvinceCode: e.target.value })
            );
          }}
        >
          <option value={undefined}>Chọn</option>
          {renderProvinceList()}
        </select>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          style={{ padding: "5px 10px", backgroundColor: "#73d13d" }}
          onClick={handleSubmit}
        >
          Lưu
        </button>
        <button
          onClick={handleBack}
          style={{ padding: "5px 10px", backgroundColor: "yellow" }}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}

export default DistrictEdit;
