import React, { useState } from "react";
import Layout from "../../../components/Layout";
import Helment from "../../../components/Helment";
import MyDataTable from "../../../components/MyDataTable";
import GetAPI from "../../../utilities/GetAPI";
import Switch from "react-switch";
import Loader from "../../../components/Loader";
import { EditButton } from "../../../utilities/Buttons";
import { PutAPI } from "../../../utilities/PutAPI";
import { error_toaster, success_toaster } from "../../../utilities/Toaster";
import { useNavigate } from "react-router-dom";

export default function RestaurantOwner() {
  const { data, reFetch } = GetAPI("admin/allrestowners");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const ownerData = () => {
    const filteredData = data?.data?.filter((dat) => {
      return (
        search === "" ||
        (dat?.user?.id &&
          dat?.user?.id.toString().includes(search.toLowerCase())) ||
        (dat?.user?.firstName &&
          dat?.user?.firstName.toLowerCase().includes(search.toLowerCase())) ||
        (dat?.user?.lastName &&
          dat.user?.lastName.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const updateStatus = async (userId, userStatus) => {
    if (userStatus === true) {
      let res = await PutAPI(`admin/banuser/${userId}`);
      if (res?.data?.status === "1") {
        success_toaster(res?.data?.message);
        reFetch();
      } else {
        error_toaster(res?.data?.message);
      }
    } else {
      let res = await PutAPI(`admin/approveuser/${userId}`);
      if (res?.data?.status === "1") {
        success_toaster(res?.data?.message);
        reFetch();
      } else {
        error_toaster(res?.data?.message);
      }
    }
  };

  const viewDetails = (id) => {
    navigate("/user-details", {
      state: {
        id: id,
      },
    });
  };

  const columns = [
    { field: "sn", header: "Serial. No" },
    { field: "id", header: "Owner Id" },
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
      field: "restaurant",
      header: "Restaurant",
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
  ownerData()?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      id: values?.user?.id,
      name: `${values?.user?.firstName} ${values?.user?.lastName}`,
      email: values?.user?.email,
      phone: `${values?.user?.countryCode}${values?.user?.phoneNum}`,
      restaurant: values?.businessName,
      status: (
        <div>
          {values?.user?.status ? (
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
                updateStatus(values?.user?.id, values?.user?.status);
              }}
              checked={values?.user?.status}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#139013"
              onHandleColor="#fff"
              className="react-switch"
              boxShadow="none"
            />
          </label>

          <EditButton
            text="View Details"
            onClick={() => viewDetails(values?.user?.id)}
          />
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
                All Restaurant Owners
              </h2>
              <div>
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
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
