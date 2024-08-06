import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Helment from "../../components/Helment";
import MyDataTable from "../../components/MyDataTable";
import Loader from "../../components/Loader";
import GetAPI from "../../utilities/GetAPI";
import { EditButton } from "../../utilities/Buttons";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../utilities/SocketContext"; // Import the useSocket hook
import { toast } from "react-toastify";

export default function Currentorder() {
  const { data, reFetch } = GetAPI("admin/currentOrders");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { socket } = useSocket(); // Destructure the socket instance from useSocket

  const viewDetails = (orderId) => {
    localStorage.setItem("orderId", orderId);
    navigate("/restaurant/order-details");
  };

  const orderData = () => {
    return data?.error?.orders?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.orderNum &&
          dat?.orderNum.toString().includes(search.toLowerCase())) ||
        (dat?.restaurant?.businessName &&
          dat?.restaurant?.businessName
            .toLowerCase()
            .includes(search.toLowerCase())) ||
        (dat?.user?.userName &&
          dat?.user?.userName.toLowerCase().includes(search.toLowerCase()))
      );
    });
  };

  const columns = [
    { field: "sn", header: "Serial. No" },
    { field: "id", header: "Id" },
    { field: "orderNum", header: "Order Number" },
    { field: "restaurantName", header: "Restaurant Name" },
    { field: "status", header: "Order Status" },
    { field: "action", header: "Action" },
  ];

  const datas = [];
  const csv = [];

  orderData()?.forEach((values, index) => {
    csv.push({
      sn: index + 1,
      id: values?.id,
      orderNum: values?.orderNum,
      restaurantName: values?.restaurant?.businessName,
      customerInfo: values?.user?.userName,
      driverEarnings: values?.orderCharge?.driverEarnings,
      restaurantEarnings: values?.orderCharge?.restaurantEarnings,
      discount: values?.orderCharge?.discount,
      deliveryFees: values?.orderCharge?.deliveryFees,
      serviceFees: values?.orderCharge?.serviceCharges,
      packingFees: values?.restaurant?.packingFee,
      commission: values?.orderCharge?.adminDeliveryCharges,
      orderMode: values?.orderMode?.name,
      status: values?.orderStatus?.name,
    });

    datas.push({
      sn: index + 1,
      id: values?.id,
      orderNum: values?.orderNum,
      restaurantName: values?.restaurant?.businessName,
      status: (
        <div>
          {values?.orderStatus?.name === "Delivered" ? (
            <div className="bg-[#21965314] text-themeGreen font-semibold p-2 rounded-md flex justify-center">
              Delivered
            </div>
          ) : values?.orderStatus?.name === "Cancelled" ? (
            <div className="bg-[#EE4A4A14] text-themeRed font-semibold p-2 rounded-md flex justify-center">
              Cancelled
            </div>
          ) : values?.orderStatus?.name === "Reject" ? (
            <div className="bg-[#1860CC33] text-[#1860CC] font-semibold p-2 rounded-md flex justify-center">
              Rejected
            </div>
          ) : values?.orderStatus?.name === "Placed" ? (
            <div className="bg-[#faff7533] text-yellow-400 font-semibold p-2 rounded-md flex justify-center">
              Placed
            </div>
          ) : values?.orderStatus?.name === "Preparing" ? (
            <div className="bg-[#75caff33] text-[#75caff] font-semibold p-2 rounded-md flex justify-center">
              Preparing
            </div>
          ) : (
            <div className="bg-[#EC6C3033] text-[#EC6C30] font-semibold p-2 rounded-md flex justify-center">
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

  useEffect(() => {
    if (!socket) return; // Ensure the socket is available

    // Handle connection event
    socket.on('connect', () => {
      console.log('Connected');
      const map = {
        userId: localStorage.getItem('userId'), // Replace with actual userId
        type: 'connected',
      };
      socket.emit('message', JSON.stringify(map));
    });

    // Listen for the 'placeOrder' event
    socket.on('placeOrder', (data) => {
      console.log(data);
      reFetch(); // Refresh the order data
      toast.success("New Order Placed");
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error('Error:', error);
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('placeOrder');
      socket.off('disconnect');
      socket.off('error');
    };
  }, [socket, reFetch]); // Include socket and reFetch in the dependency array

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="bg-themeGray p-5">
          <div className="bg-white rounded-lg p-5">
            <div className="flex justify-between items-center flex-wrap gap-5">
              <h2 className="text-themeRed text-lg font-bold font-norms">
                Current Orders
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
