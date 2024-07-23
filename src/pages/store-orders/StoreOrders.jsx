import React, { useState } from "react";
import Layout from "../../components/Layout";
import Helment from "../../components/Helment";
import MyDataTable from "../../components/MyDataTable";
import Loader from "../../components/Loader";
import GetAPI from "../../utilities/GetAPI";
import { EditButton } from "../../utilities/Buttons";
import { useNavigate } from "react-router-dom";

export default function AllOrders() {
  const { data } = GetAPI("admin/storeAllOrders");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const orderData = () => {
    const filteredData = data?.data?.orders?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.name && dat?.name.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const viewDetails = (orderId) => {
    navigate("/store/order-details", localStorage.setItem("orderId", orderId));
  };

  const columns = [
    { field: "sn", header: "Serial. No" },
    { field: "id", header: "Id" },
    {
      field: "orderNum",
      header: "Order Number",
    },
    {
      field: "storeName",
      header: "Store Name",
    },
    {
      field: "customerInfo",
      header: "Customer Info",
    },
    {
      field: "driverEarnings",
      header: "Driver Earnings",
    },
    {
      field: "storeEarnings",
      header: "Store Earnings",
    },
    {
      field: "discount",
      header: "Discount",
    },
    {
      field: "deliveryFees",
      header: "Delivery fees",
    },
    {
      field: "serviceFees",
      header: "Service fees",
    },
    {
      field: "packingFees",
      header: "Packing fees",
    },
    {
      field: "commission",
      header: "Admin commission on delivery charges",
    },
    {
      field: "orderMode",
      header: "Order Mode",
    },
    {
      field: "status",
      header: "Order Status",
    },
    {
      field: "action",
      header: "Action",
    },
  ];
  const datas = [];
  orderData()?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      id: values?.id,
      orderNum: values?.orderNum,
      storeName: values?.restaurant?.businessName,
      customerInfo: values?.user?.userName,
      driverEarnings: values?.orderCharge?.driverEarnings,
      restaurantEarnings: values?.orderCharge?.restaurantEarnings,
      discount: values?.orderCharge?.discount,
      deliveryFees: values?.orderCharge?.deliveryFees,
      serviceFees: values?.orderCharge?.serviceCharges,
      packingFees: values?.restaurant?.packingFee,
      commission: values?.orderCharge?.adminDeliveryCharges,
      orderMode: values?.orderMode?.name,
      status: (
        <div>
          {values?.orderStatus?.name === "Delivered" ? (
            <div
              className="bg-[#21965314] text-themeGreen font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Delivered
            </div>
          ) : values?.orderStatus?.name === "Cancelled" ? (
            <div
              className="bg-[#EE4A4A14] text-themeRed font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Cancelled
            </div>
          ) : values?.orderStatus?.name === "Rejected" ? (
            <div
              className="bg-[#1860CC33] text-[#1860CC] font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Rejected
            </div>
          ) : values?.orderStatus?.name === "Placed" ? (
            <div
              className="bg-[#faff7533] text-yellow-400 font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Placed
            </div>
          ) : values?.orderStatus?.name === "Preparing" ? (
            <div
              className="bg-[#75caff33] text-[#75caff] font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Preparing
            </div>
          ) : (
            <div
              className="bg-[#EC6C3033] text-[#EC6C30] font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Scheduled
            </div>
          )}
        </div>
      ),
      action: (
        <div className="flex items-center gap-3">
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
                All Orders
              </h2>
              <div>
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
                  csvdata={datas}
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
