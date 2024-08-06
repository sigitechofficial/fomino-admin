import React, { useState } from "react";
import Layout from "../../components/Layout";
import Helment from "../../components/Helment";
import RedButton, { EditButton } from "../../utilities/Buttons";
import MyDataTable from "../../components/MyDataTable";
import "react-phone-input-2/lib/style.css";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import Switch from "react-switch";
import { BASE_URL } from "../../utilities/URL";
import { useNavigate } from "react-router-dom";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import { PutAPI } from "../../utilities/PutAPI";

export default function Restaurants() {
  const { data, reFetch } = GetAPI("admin/getallrestaurants");
  console.log("🚀 ~ Restaurants ~ data:", data)
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const restaurantData = () => {
    const filteredData = data?.data?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.businessName &&
          dat?.businessName.toLowerCase().includes(search.toLowerCase())) ||
        (dat?.ownerName &&
          dat?.ownerName.toLowerCase().includes(search.toLowerCase())) ||
        (dat?.city && dat?.city.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const edit = (resId) => {
    navigate("/edit-restaurant", {
      state: {
        resId: resId,
      },
    });
  };

  const updateStatus = async (resId, userStatus) => {
    if (userStatus === true) {
      let res = await PutAPI("admin/changerestaurantstatus", {
        status: false,
        id: resId,
      });
      if (res?.data?.status === "1") {
        success_toaster(res?.data?.message);
        reFetch();
      } else {
        error_toaster(res?.data?.message);
      }
    } else {
      let res = await PutAPI("admin/changerestaurantstatus", {
        status: true,
        id: resId,
      });
      if (res?.data?.status === "1") {
        success_toaster(res?.data?.message);
        reFetch();
      } else {
        error_toaster(res?.data?.message);
      }
    }
  };

  const columns = [
    { field: "sn", header: "Serial. No" },
    { field: "id", header: "Id" },
    {
      field: "logo",
      header: "Logo",
    },
    {
      field: "name",
      header: "Restaurant Name",
    },
    {
      field: "city",
      header: "City",
    },
    {
      field: "ownerName",
      header: "Owner Name",
    },
    {
      field: "operatingTime",
      header: "Operating Time ",
    },
    {
      field: "joinedAt",
      header: "Joined At",
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


  const csv = []
  const datas = [];
  restaurantData()?.map((values, index) => {
    csv.push({
      sn: index + 1,
      id: values?.id,
      logo: "image",
      name: values?.businessName,
      city: values?.city,
      ownerName: values?.ownerName,
      operatingTime: values?.operatingTime,
      joinedAt: values?.joinedAt ? values?.joinedAt: "",
      status: values?.status ? "Active" : "InActive",
    })
    return datas.push({
      sn: index + 1,
      id: values?.id,
      logo: (
        <div>
          <img
            src={`${BASE_URL}${values?.logo}`}
            alt="image"
            className="w-24 h-24"
          />
        </div>
      ),
      name: values?.businessName,
      city: values?.city,
      ownerName: values?.ownerName,
      operatingTime: values?.operatingTime,
      joinedAt: values?.joinedAt,
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
                updateStatus(values?.id, values?.status);
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

          <EditButton
            text="Edit"
            onClick={() => {
              edit(values?.id);
            }}
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
                All Restaurants
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
                  csvdata={csv}
                />
                <div className="flex gap-2">
                  <RedButton
                    text="Add New Restaurants"
                    onClick={() => {
                      navigate("/add-restaurant");
                    }}
                  />
                </div>
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
