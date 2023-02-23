import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Schema, SelectPicker, Toggle } from "rsuite";
import RequireField from "../../../components/form/RequireField";
import { checkExistInArray } from "../../../utils/CheckExistInArray";

const DistrictPopup = ({
  uuid,
  rowData,
  handleClick,
  title,
  provinceList,
  districtList,
  type,
}) => {
  const defaultFormValue = {
    DistrictCode: null,
    ProvinceCode: null,
    DistrictName: "",
    FlagActive: "1",
  };

  const formModel = Schema.Model({
    DistrictCode:
      type === "add"
        ? Schema.Types.StringType()
            .addRule((value) => {
              return !checkExistInArray(districtList, "DistrictCode", value);
            }, "Mã huyện đã tồn tại")
            .isRequired()
        : Schema.Types.StringType(),
    ProvinceCode: Schema.Types.StringType().isRequired(),
    DistrictName: Schema.Types.StringType().isRequired(),
  });

  const formRef = useRef();
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(defaultFormValue);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    if (rowData) {
      setFormValue(rowData);
    } else {
      setFormValue(defaultFormValue);
    }
  }, [uuid, rowData, type]);

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      return;
    }

    handleClick(formValue);
    handleClose();
  };

  const renderBody = () => {
    return (
      <Form
        formValue={formValue}
        onChange={(value) => setFormValue(value)}
        model={formModel}
        ref={formRef}
      >
        <Form.Group controlId="DistrictCode">
          <Form.ControlLabel>DistrictCode</Form.ControlLabel>
          <Form.Control
            name="DistrictCode"
            disabled={type !== "add"}
            plaintext={type === "delete"}
          />
        </Form.Group>
        <Form.Group controlId="ProvinceCode">
          <Form.ControlLabel>
            ProvinceCode <RequireField />
          </Form.ControlLabel>
          <Form.Control
            name="ProvinceCode"
            accepter={SelectPicker}
            data={provinceList.map((item) => {
              return {
                label: item.ProvinceName,
                value: item.ProvinceCode,
              };
            })}
            style={{ width: 300 }}
            plaintext={type === "delete"}
          />
        </Form.Group>
        <Form.Group controlId="DistrictName">
          <Form.ControlLabel>
            DistrictName <RequireField />
          </Form.ControlLabel>
          <Form.Control name="DistrictName" plaintext={type === "delete"} />
        </Form.Group>
        <Form.Group controlId="FlagActive">
          <Form.ControlLabel>FlagActive</Form.ControlLabel>
          <Form.Control
            name="FlagActive"
            accepter={Toggle}
            onChange={(checked) =>
              setFormValue({ ...formValue, FlagActive: checked ? "1" : "0" })
            }
            value={formValue.FlagActive === "1"}
            readOnly={type === "delete"}
          />
        </Form.Group>
      </Form>
    );
  };

  return (
    <Modal open={open} onClose={handleClose} backdrop="static">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderBody()}</Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSubmit}
          appearance="primary"
          color={
            type === "edit" ? "orange" : type === "delete" ? "red" : "green"
          }
        >
          Ok
        </Button>
        <Button onClick={handleClose}>Thoát</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DistrictPopup;
