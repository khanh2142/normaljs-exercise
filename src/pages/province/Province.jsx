import SearchIcon from "@rsuite/icons/Search";
import React, { useEffect, useState } from "react";
import { Button, Input, InputGroup, Stack, Table } from "rsuite";
import Flag from "../../components/flag/Flag";
import { findMaxValue } from "../../utils/FindMaxValue";
import ProvincePopup from "./components/ProvincePopup";

const { Column, HeaderCell, Cell } = Table;

const Province = ({ data, setData }) => {
  const [list, setList] = useState(data.Province);
  const [params, setParams] = useState({
    ProvinceName: "",
    ProvinceCode: "",
  });

  const [popUp, setPopUp] = useState(<></>);
  const [reloadKey, setReloadKey] = useState("0");

  const handleReload = () => {
    setReloadKey(Math.random());
  };

  const handleSearch = () => {
    const arr = [...data.Province]
      .filter((item, index) => {
        if (!params.ProvinceName || params.ProvinceName === "") {
          return item;
        }
        return (
          item.ProvinceName &&
          item.ProvinceName.toLowerCase().includes(
            params.ProvinceName.toLowerCase()
          )
        );
      })
      .filter((item, index) => {
        if (!params.ProvinceCode || params.ProvinceCode === "") {
          return item;
        }
        return (
          item.ProvinceCode &&
          item.ProvinceCode.toLowerCase().includes(
            params.ProvinceCode.toLowerCase()
          )
        );
      })
      .map((item, index) => {
        return {
          ...item,
          Idx: index + 1,
        };
      });

    setList(arr);
  };

  const handleEdit = (rowData) => {
    const confirmEdit = (formValue) => {
      const arr = data.Province.map((item) => {
        if (item.ProvinceCode === formValue.ProvinceCode) {
          item = formValue;
        }
        return item;
      });

      setData({ ...data, Province: arr });
      handleReload();
    };

    setPopUp(
      <ProvincePopup
        uuid={Math.random()}
        rowData={rowData}
        handleClick={confirmEdit}
        title="Chỉnh sửa"
        type="edit"
      />
    );
  };

  const handleDelete = (rowData) => {
    const confirmDelete = (formValue) => {
      const arr = data.Province.filter((item) => {
        return item.ProvinceCode !== formValue.ProvinceCode;
      });

      setData({
        ...data,
        Province: arr,
        District: data.District.filter(
          (item) => item.ProvinceCode !== formValue.ProvinceCode
        ),
      });
      handleReload();
    };

    setPopUp(
      <ProvincePopup
        uuid={Math.random()}
        rowData={rowData}
        handleClick={confirmDelete}
        title="Xóa"
        provinceList={data.Province}
        type="delete"
      />
    );
  };

  const handleAdd = () => {
    const confirmAdd = (formValue) => {
      const newDistrictCode = findMaxValue(data.District, "ProvinceCode") + 1;

      const arr = [
        ...data.Province,
        { ...formValue, ProvinceCode: newDistrictCode.toString() },
      ];

      setData({ ...data, Province: arr });
      handleReload();
    };

    setPopUp(
      <ProvincePopup
        uuid={Math.random()}
        handleClick={confirmAdd}
        title="Thêm"
        type="add"
        provinceList={data.Province}
      />
    );
  };

  useEffect(() => {
    handleSearch();
  }, [params]);

  useEffect(() => {
    setList(data.District);
    handleSearch();
  }, [reloadKey]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        padding: "10px 0",
      }}
    >
      <Stack style={{ marginBottom: 30 }} spacing={10}>
        <Stack direction="column" spacing={10}>
          <Stack spacing={10}>
            <label>Tìm theo mã tỉnh</label>
            <InputGroup
              style={{ width: 300 }}
              onChange={(e) => {
                setParams({ ...params, ProvinceCode: e.target.value });
              }}
            >
              <Input />
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
            </InputGroup>
          </Stack>
          <Stack spacing={10}>
            <label>Tìm theo tên tỉnh</label>
            <InputGroup
              style={{ width: 300 }}
              onChange={(e) => {
                setParams({ ...params, ProvinceName: e.target.value });
              }}
            >
              <Input />
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
            </InputGroup>
          </Stack>
        </Stack>

        <Button appearance="primary" color="green" onClick={handleAdd}>
          Thêm
        </Button>
      </Stack>

      <Table data={list} style={{ width: "100%" }} height={600} rowHeight={55}>
        <Column width={100}>
          <HeaderCell>STT</HeaderCell>
          <Cell dataKey="Idx" />
        </Column>

        <Column width={200}>
          <HeaderCell>ProvinceCode</HeaderCell>
          <Cell dataKey="ProvinceCode" />
        </Column>

        <Column width={200}>
          <HeaderCell>ProvinceName</HeaderCell>
          <Cell dataKey="ProvinceName" />
        </Column>

        <Column width={200}>
          <HeaderCell>FlagActive</HeaderCell>
          <Cell style={{ display: "flex", justifyContent: "center" }}>
            {(rowData) => <Flag flag={rowData.FlagActive} />}
          </Cell>
        </Column>

        <Column width={200}>
          <HeaderCell></HeaderCell>
          <Cell>
            {(rowData) => (
              <Stack spacing={10}>
                <Button
                  style={{ height: 30 }}
                  color="yellow"
                  appearance="primary"
                  onClick={() => handleEdit(rowData)}
                >
                  Sửa
                </Button>
                <Button
                  style={{ height: 30 }}
                  color="red"
                  appearance="primary"
                  onClick={() => handleDelete(rowData)}
                >
                  Xóa
                </Button>
              </Stack>
            )}
          </Cell>
        </Column>
      </Table>

      {popUp}
    </div>
  );
};

export default Province;
