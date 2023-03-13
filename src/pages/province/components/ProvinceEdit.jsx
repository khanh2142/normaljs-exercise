import React, { useEffect, useState } from "react";

function ProvinceEdit({ handleBack, currentItem, handleSave, title }) {
  const [formValue, setFormValue] = useState({
    ProvinceCode: undefined,
    ProvinceName: undefined,
  });

  useEffect(function () {
    if (currentItem) {
      setFormValue(currentItem);
    }
  }, []);

  function handleSubmit() {
    if (!formValue.ProvinceCode || !formValue.ProvinceName) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }

    handleSave(formValue);
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
        <label style={{ marginRight: 10 }}>Mã tỉnh/thành phố</label>
        <input
          required
          value={formValue.ProvinceCode}
          onChange={function (e) {
            setFormValue(
              Object.assign({}, formValue, { ProvinceCode: e.target.value })
            );
          }}
          disabled={currentItem}
        />
      </div>
      <div>
        <label style={{ marginRight: 10 }}>Tên tỉnh/thành phố</label>
        <input
          required
          value={formValue.ProvinceName}
          onChange={function (e) {
            setFormValue(
              Object.assign({}, formValue, { ProvinceName: e.target.value })
            );
          }}
        />
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

export default ProvinceEdit;
