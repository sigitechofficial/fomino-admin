import React, { useState } from "react";
import Layout from "../../components/Layout";
import Helment from "../../components/Helment";
import MyDataTable from "../../components/MyDataTable";
import Loader from "../../components/Loader";
import GetAPI from "../../utilities/GetAPI";
import RedButton, { EditButton } from "../../utilities/Buttons";
import { useNavigate } from "react-router-dom";

export default function Zones() {
  const { data } = GetAPI("admin/getAllZones");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  console.log(data,"zones")

  // const viewDetails = (orderId) => {
  //   navigate("/order-details", {
  //     state: {
  //       id: orderId,
  //     },
  //   });
  // };

  const zonesData = () => {
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
    { field: "id", header: "Zone Id" },
    {
      field: "name",
      header: "Business Zone Name",
    },
    {
      field: "baseCharges",
      header: "Base Charges",
    },
    {
      field: "maxDeliveryCharges",
      header: "Max Delivery Charges",
    },
    {
      field: "action",
      header: "Action",
    },
  ];
  const datas = [];
  zonesData()?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      id: values?.id,
      name: values?.name,
      restaurantName: values?.restaurant?.businessName,
      baseCharges: values?.zoneDetail?.baseCharges,
      maxDeliveryCharges: values?.zoneDetail?.maxDeliveryCharges,
      action: (
        <div className="flex items-center gap-1">
          <RedButton
            text="Update"
            onClick={() => {
              navigate("/update-zone", {
                state: {
                  zoneData: values,
                },
              });
            }}
          />
          <EditButton
            text="View Details"
            onClick={() => {
              viewDetails(values?.id);
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
                All Zones
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
                  csvdata={datas}
                />
                <div className="flex gap-2">
                  <RedButton
                    text="Add New Zone"
                    onClick={() => {
                      navigate("/add-new-zone");
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
