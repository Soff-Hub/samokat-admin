import React, { useEffect, useState } from "react";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { Link } from "react-router-dom";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import NavHeader from "components/shared/NavHeader";
import { Table } from "antd";
import ResponsiveDialog from "components/shared/modal";

function AddSeller() {
  const [data, setData] = useState(null);
  // const [count, setCount] = useState(null)
  
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const columns = [
    {
      title: "Ism",
      dataIndex: "first_name",
      key: "name",
      render: (first_name) => <a>{first_name}</a>,
    },
    {
      title: "Nomer",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tahrirlash",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <>
          <Link to={`actions/${id}`}>
            <IconButton color="primary">
              <DriveFileRenameOutlineOutlinedIcon />
            </IconButton>
          </Link>
        </>
      ),
    },
    {
      title: "O'chirish",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <>
          <IconButton
            color="error"
            onClick={() => {
              setDeleteId(id);
              setOpen(true);
            }}
            aria-label="delete"
          >
            <DeleteSharpIcon />
          </IconButton>
        </>
      ),
    },
  ];


    async function handleDelete() {
        await Client.delete(`${API_ENDPOINTS.DETAIL_EMPLOYEE}${deleteId}/`)
          .then((resp) => {
            setOpen(false);
            getOrders();
            setData(resp.results);
          })
          .catch((err) => console.log(err));
      }
    

  async function getOrders() {
    await Client.get(API_ENDPOINTS.EMPLOYEE)
      .then((resp) => {
        setData(resp.results);
        // setCount(resp.count);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="px-2 py-3">
      <NavHeader title="Sotuvchilar" />
      <div className="py-3 px-2">
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
      <ResponsiveDialog
        open={openDelete}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default AddSeller;