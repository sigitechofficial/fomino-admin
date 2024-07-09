import React, { useState } from 'react'
import Layout from "../../components/Layout"
import MyDataTable from '../../components/MyDataTable'
import GetAPI from '../../utilities/GetAPI';
import Helment from '../../components/Helment';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';


const TableBooking = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data } = GetAPI("admin/getTableBooking");
  console.log(data?.data?.data)


  const orderData = () => {
    const filteredData = data?.data?.data?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.orderStatusId &&
          dat?.orderStatusId.toString().includes(search.toLowerCase())) ||
        (dat?.restaurant?.businessName &&
          dat?.restaurant?.businessName
            .toLowerCase()
            .includes(search.toLowerCase())) ||
        (dat?.user?.userName &&
          dat?.user?.userName.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };


  const columns = [
    { field: "sn", header: "Serial. No" },
    { field: "id", header: "BookingID" },
    {
      field: "restaurantName",
      header: "Restaurant Name",
    },
    {
      field: "customerInfo",
      header: "Customer Info",
    },
    {
      field: "contact",
      header: "Contact",
    },
    {
      field: "date",
      header: "Date",
    },
    {
      field: "time",
      header: "Time",
    },
    {
      field: "guests",
      header: "Guests",
    },
    {
      field: "orderStatus",
      header: "Order Status",
    },
    {
      field: "action",
      header: "Action",
    },
  ];



  let datas = orderData()?.map((item, index) => {
    return {
      sn: index + 1,
      id: item?.id,
      restaurantName: item?.restaurant?.businessName,
      customerInfo: item?.user?.userName,
      contact: ` ${item?.restaurant?.countryCode} ${item?.restaurant?.phoneNum}`,
      date: item?.date,
      time: item?.time,
      guests: item?.noOfMembers,
      orderStatus: item?.orderStatus?.displayText === "Delivered" ? (
        <div
          className="bg-[#21965314] text-themeGreen font-semibold p-2 rounded-md flex 
    justify-center"
        >
          Delivered
        </div>
      ) : item?.orderStatus?.displayText === "Cancelled" ?(
        <div
          className="bg-[#EE4A4A14] text-themeRed font-semibold p-2 rounded-md flex 
          justify-center"
        >
          Cancelled
        </div>
      ):item?.orderStatus?.displayText === "Rejected" ?(
        <div
          className="bg-[#1860CC33] text-[#1860CC] font-semibold p-2 rounded-md flex 
          justify-center"
        >
          Rejected
        </div>
      ):(
        <div
          className="bg-[#EC6C3033] text-[#EC6C30] font-semibold p-2 rounded-md flex 
          justify-center"
        >
          Scheduled
        </div>
      ),
      action: <div className='border-gray-300 border-[1px] px-4 py-1 font-semibold rounded-md inline-block cursor-pointer' onClick={()=>navigate("/booking-details",{state:{id: item?.id}})} >View Details</div>
    }
  })


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
  )
}

export default TableBooking