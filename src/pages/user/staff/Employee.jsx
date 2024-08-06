import React, { useState } from "react";
import Layout from "../../../components/Layout";
import Helment from "../../../components/Helment";
import MyDataTable from "../../../components/MyDataTable";
import GetAPI from "../../../utilities/GetAPI";
import Loader from "../../../components/Loader";
import Switch from "react-switch";
import { EditButton } from "../../../utilities/Buttons";

export default function Employee() {
  const { data } = GetAPI("admin/allemployees");
  const [search, setSearch] = useState("");

  const employeeData = () => {
    const filteredData = data?.data?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.name && dat?.name.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const columns = [
    { field: "sn", header: "Serial. No" },
    { field: "id", header: "Employee Id" },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "email",
      header: "Email",
    },
    {
      field: "phone",
      header: "Phone No",
    },
    {
      field: "role",
      header: "Role",
    },
    {
      field: "status",
      header: "Status",
    },
    {
      field: "action",
      header: "Action",
    },
  ];

  const datas = [];
  const csv = [];
  employeeData()?.map((values, index) => {
    csv.push({
      sn: index + 1,
      id: values?.id,
      name: values?.name,
      email: values?.email,
      phone: values?.phoneNum,
      role: values?.role,
      status: values?.status ? "Active" : "InActive",
      action: values?.status=== "Active" ? "True":"False",
    })
    return datas.push({
      sn: index + 1,
      id: values?.id,
      name: values?.name,
      email: values?.email,
      phone: values?.phoneNum,
      role: values?.role,
      status: (
        <div>
          {values?.status ? (
            <div
              className="bg-[#21965314] text-themeGreen font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Active
            </div>
          ) : (
            <div
              className="bg-[#EE4A4A14] text-themeRed font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Inactive
            </div>
          )}
        </div>
      ),
      action: (
        <div className="flex items-center gap-3">
          <label>
            <Switch
              onChange={() => {
                handleStatus(values?.id);
              }}
              checked={values?.status}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#139013"
              onHandleColor="#fff"
              className="react-switch"
              boxShadow="none"
            />
          </label>

          <EditButton text="View Details" />
        </div>
      ),
    });
  });

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="bg-themeGray p-5">
          <div className="bg-white rounded-lg p-5">
            <div className="flex justify-between items-center flex-wrap gap-5">
              <h2 className="text-themeRed text-lg font-bold font-norms">
                All Employees
              </h2>
              <div>
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
                  csvdata={csv}
                />
              </div>
            </div>

            <div>
              <MyDataTable columns={columns} data={datas} />
            </div>
          </div>
        </div>
      }
    />
  );
}
