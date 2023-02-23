import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Schema, Toggle } from "rsuite";
import RequireField from "../../../components/form/RequireField";
import { checkExistInArray } from "../../../utils/CheckExistInArray";

const DistrictPopup = ({
  uuid,
  rowData,
  handleClick,
  title,
  provinceList,
  type,
}) => {
  const defaultFormValue = {
    ProvinceCode: null,
    ProvinceName: "",
    FlagActive: "1",
  };

  const formModel = Schema.Model({
    ProvinceCode:
      type === "add"
        ? Schema.Types.StringType()
            .addRule((value) => {
              return !checkExistInArray(provinceList, "ProvinceCode", value);
            }, "Mã tỉnh đã tồn tại")
            .isRequired()
        : Schema.Types.StringType(),
    ProvinceName: Schema.Types.StringType().isRequired(),
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
        <Form.Group controlId="ProvinceCode">
          <Form.ControlLabel>ProvinceCode</Form.ControlLabel>
          <Form.Control
            name="ProvinceCode"
            disabled={type !== "add"}
            plaintext={type === "delete"}
          />
        </Form.Group>
        <Form.Group controlId="ProvinceName">
          <Form.ControlLabel>
            ProvinceName <RequireField />
          </Form.ControlLabel>
          <Form.Control name="ProvinceName" plaintext={type === "delete"} />
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
