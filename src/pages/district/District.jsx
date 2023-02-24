import SearchIcon from "@rsuite/icons/Search";
import React, { useEffect, useState } from "react";
import { Button, IconButton, Input, InputGroup, Stack, Table } from "rsuite";
import Flag from "../../components/flag/Flag";
import { findMaxValue } from "../../utils/FindMaxValue";
import DistrictPopup from "./components/DistrictPopup";

const { Column, HeaderCell, Cell } = Table;

const District = ({ data, setData }) => {
  const [list, setList] = useState(data.District);
  const [params, setParams] = useState({
    DistrictCode: "",
    DistrictName: "",
  });
  const [popUp, setPopUp] = useState(<></>);
  const [reloadKey, setReloadKey] = useState("0");

  const handleReload = () => {
    setReloadKey(Math.random());
  };

  const handleSearch = () => {
    const arr = [...data.District]
      .filter((item, index) => {
        if (!params.DistrictCode || params.DistrictCode === "") {
          return item;
        }
        return (
          item.DistrictCode &&
          item.DistrictCode.toLowerCase().includes(
            params.DistrictCode.toLowerCase()
          )
        );
      })
      .filter((item, index) => {
        if (!params.DistrictName || params.DistrictName === "") {
          return item;
        }
        return (
          item.DistrictName &&
          item.DistrictName.toLowerCase().includes(
            params.DistrictName.toLowerCase()
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
      const arr = data.District.map((item) => {
        if (item.DistrictCode === formValue.DistrictCode) {
          item = formValue;
        }
        return item;
      });

      setData({ ...data, District: arr });
      handleReload();
    };

    setPopUp(
      <DistrictPopup
        uuid={Math.random()}
        rowData={rowData}
        handleClick={confirmEdit}
        title="Chỉnh sửa"
        provinceList={data.Province}
        type="edit"
      />
    );
  };

  const handleDelete = (rowData) => {
    const confirmDelete = (formValue) => {
      const arr = data.District.filter((item) => {
        return item.DistrictCode !== formValue.DistrictCode;
      });

      setData({ ...data, District: arr });
      handleReload();
    };

    setPopUp(
      <DistrictPopup
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
      const newDistrictCode = findMaxValue(data.District, "DistrictCode") + 1;

      const arr = [
        ...data.District,
        { ...formValue, DistrictCode: newDistrictCode.toString() },
      ];

      setData({ ...data, District: arr });
      handleReload();
    };

    setPopUp(
      <DistrictPopup
        uuid={Math.random()}
        handleClick={confirmAdd}
        title="Thêm"
        provinceList={data.Province}
        type="add"
        districtList={data.District}
      />
    );
  };

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
      <Stack style={{ marginBottom: 30 }} spacing={10} alignItems="flex-start">
        <Stack direction="column" spacing={10}>
          <Stack spacing={10}>
            <label>Tìm theo mã huyện</label>
            <InputGroup
              style={{ width: 300 }}
              onChange={(e) => {
                setParams({ ...params, DistrictCode: e.target.value });
              }}
            >
              <Input />
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
            </InputGroup>
          </Stack>
          <Stack spacing={10}>
            <label>Tìm theo tên huyện</label>
            <InputGroup
              style={{ width: 300 }}
              onChange={(e) => {
                setParams({ ...params, DistrictName: e.target.value });
              }}
            >
              <Input />
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
            </InputGroup>
          </Stack>
        </Stack>

        <IconButton
          appearance="primary"
          color="cyan"
          icon={<SearchIcon />}
          onClick={handleSearch}
        >
          Tìm kiếm
        </IconButton>

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
          <HeaderCell>DistrictCode</HeaderCell>
          <Cell dataKey="DistrictCode" />
        </Column>

        <Column width={200}>
          <HeaderCell>ProvinceCode</HeaderCell>
          <Cell dataKey="ProvinceCode" />
        </Column>

        <Column width={200}>
          <HeaderCell>DistrictName</HeaderCell>
          <Cell dataKey="DistrictName" />
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

export default District;
