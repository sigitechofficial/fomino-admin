import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../../components/Layout";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import GetAPI from "../../utilities/GetAPI";
import dayjs from "dayjs";

export default function tableBookingDetails() {
  const location = useLocation();
  const orderId = location?.state?.id;
  // const [data, setData] = useState("");
  const { data } = GetAPI(`admin/getBookingById/${orderId}`);






  console.log(data, "datacheck")
  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="bg-themeGray p-5 mb-[300px]">
          <div className="rounded-lg p-5 space-y-5">
            <div className="flex gap-5 items-center">
              <button
                className="bg-themeGray p-2 rounded-full"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft />
              </button>
              <div className="flex flex-col">
                <h2 className="text-themeRed text-lg font-bold font-norms">
                  Table Booking Details
                </h2>
              </div>
            </div>
            {/* ================ */}
            <div className="w-full flex gap-8 px-12">
              <div className="flex-1 shadow-md p-5 bg-white">
                <h2 className="text-themeRed text-lg font-bold font-norms">
                  Customer Details
                </h2>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Customer Name</p><p className="text-gray-400 font-semibold">{data?.data?.bookingData?.user?.userName}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Email</p><p className="text-gray-400 font-semibold">{data?.data?.bookingData?.user?.email}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Phone #</p><p className="text-gray-400 font-semibold">{`${data?.data?.bookingData?.user?.countryCode} ${data?.data?.bookingData?.user?.phoneNum}`}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Delivery Address</p><p className="text-gray-400 font-semibold">Name</p>
                </div>
              </div>
              <div className="flex-1 shadow-md p-5 bg-white">
                <h2 className="text-themeRed text-lg font-bold font-norms">
                  Restaurant Details
                </h2>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Restaurant Name</p><p className="text-gray-400 font-semibold">{data?.data?.bookingData?.restaurant?.businessName}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Delivery Address</p><p className="text-gray-400 font-semibold">{data?.data?.bookingData?.restaurant?.address}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Phone #</p><p className="text-gray-400 font-semibold">{` ${data?.data?.bookingData?.restaurant?.countryCode} ${data?.data?.bookingData?.restaurant?.phoneNum}`}</p>
                </div>

              </div>
              <div className="flex-1 shadow-md p-5 bg-white">
                <h2 className="text-themeRed text-lg font-bold font-norms">
                  Order Details #76578
                </h2>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Created at</p><p className="text-gray-400 font-semibold">{data?.data?.bookingData?.createdAt ? dayjs(data?.data?.bookingData?.createdAt).format("DD-MM-YYYY") : "N/A"}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Order Status</p><p className=" bg-green-200 font-norms text-green-600 px-2">{data?.data?.bookingData?.orderStatus?.name}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Person</p><p className="text-gray-400 font-semibold">Standard</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Date</p><p className="text-gray-400 font-semibold">{data?.data?.bookingData?.date}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-medium text-lg">Time</p><p className="text-gray-400 font-semibold">{data?.data?.bookingData?.time}</p>
                </div>
              </div>
            </div>







          </div>
        </div>
      }
    />
  );
}
