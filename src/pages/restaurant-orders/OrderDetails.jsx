import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../../components/Layout";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import { PostAPI } from "../../utilities/PostAPI";
import { error_toaster } from "../../utilities/Toaster";
import { PiPrinterDuotone } from "react-icons/pi";
import { LiaMapSolid } from "react-icons/lia";
import { FaCheck, FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { BsFillChatSquareTextFill } from "react-icons/bs";



import dayjs from "dayjs";
import { BASE_URL } from "../../utilities/URL";

export default function OrderDetails() {
  // const location = useLocation();
  const orderId = localStorage.getItem("orderId");
  const [data, setData] = useState("");
  console.log("🚀 ~ OrderDetails ~ data:", data);

  useEffect(() => {
    const getDetails = async () => {
      const res = await PostAPI("admin/orderdetailbyid", {
        orderId: orderId,
      });
      if (res?.data?.status === "1") {
        setData(res?.data?.data);
      } else {
        error_toaster(res?.data?.message);
      }
    };
    getDetails();
  }, [orderId]);

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="bg-themeGray p-5 mb-[300px]">
          <div className="bg-white rounded-lg p-5 space-y-5">
            <div className="flex gap-5 items-center">
              <button
                className="bg-themeGray p-2 rounded-full"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft />
              </button>
              <div className="flex flex-col">
                <h2 className="text-themeRed text-lg font-bold font-norms">
                  Order Details
                </h2>
                {/* <p className="font-medium text-[#00000099]">
                  Order # {data?.orderNum}
                </p> */}
              </div>
            </div>

            <div className="w-full flex gap-x-16">
              <div className="w-[55%]">
                <div className="flex justify-between">
                  <h4 className="font-medium text-xl">Order#<span className="font-medium text-base text-themeBorderGray">  {data?.orderDetails?.orderNum ? data?.orderDetails?.orderNum : "N/A"}</span></h4>
                  <div className="flex gap-3">
                    <button
                      className="flex items-center gap-1 font-medium border border-gray-300 rounded-md px-2 py-1.5 h-9 hover:bg-theme hover:text-white duration-100"
                    >
                      <LiaMapSolid size={19} />
                      <p>Show Location On Map</p>
                    </button>
                    <button
                      className="flex items-center gap-1 text-white bg-red-500 font-medium border border-gray-300 rounded-md px-2 py-1.5 h-9 hover:bg-theme hover:text-white duration-100"
                    >
                      <PiPrinterDuotone size={19} />
                      <p>Print Invoice</p>
                    </button>                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <div className="flex"><p className="font-medium text-themeBorderGray">Order Date:&nbsp;</p> <p className="font-medium">{data?.orderDetails?.createdAt
                    ? dayjs(data?.orderDetails?.createdAt).format("DD-MM-YYYY")
                    : "N/A"}</p></div>
                  <div className="flex"><p className="font-medium text-themeBorderGray">Time&nbsp;</p> <p className="font-medium">{data?.orderDetails?.createdAt
                    ? dayjs(data?.orderDetails?.createdAt).format("h:mm:ss A")
                    : "N/A"}</p></div>
                  <div className="flex"><p className="font-medium text-themeBorderGray">Payment Method:&nbsp;</p> <p className="font-medium">{data?.orderDetails?.paymentMethod ? data?.orderDetails?.paymentMethod.name : "N/A"}</p></div>
                  <div className="flex"><p className="font-medium text-themeBorderGray">Payment Status:&nbsp;</p> <p> {data?.orderDetails?.paymentRecieved ? <div className="font-medium px-3 bg-green-500 rounded-md text-white">Paid</div> : <div className="font-medium px-3 bg-red-200 rounded-md text-red-600">Unpaid</div>}</p></div>
                  <div className="flex"><p className="font-medium text-themeBorderGray">Order Type:&nbsp;</p> <p className="font-medium px-3 bg-gray-200 rounded-md text-red-600">{data?.orderDetails?.orderType.type ? data?.orderDetails?.orderType.type : "N/A"}</p></div>
                </div>
                <hr className="bg-gray-300 h-[1px] my-5" />

                {data?.orderDetails?.orderItems.map((items, index) => (
                  <>
                    <div className="flex gap-3 mt-6">
                      <div className="flex">
                        <img className="w-[200px] h-[120px] rounded-md object-cover shrink-0" src={`${BASE_URL}${data?.productList[index]?.image}`} alt="image" />

                      </div>
                      <div className="">
                        <h4 className="font-bold text-xl ">{items?.quantity}x {data?.productList[index]?.name}</h4>
                        <div className="font-medium text-themeBorderGray text-sm mt-2z` w-full" >{data?.productList[index]?.addOnArr?.map((item, idx) => {
                          return (
                            <div className="flex flex-wrap"><div className="font-bold">{item?.category?.name}</div>: &nbsp; {data?.productList[index]?.addOnArr[idx]?.addons?.map(item => <div>{`${item?.name},`}&nbsp;</div>)}</div>
                          )
                        })}</div>

                      </div>
                      <div className="flex-1 text-end">
                        <p className="font-bold text-xl ">{data?.orderDetails?.restaurant?.currencyUnitID?.symbol}{items?.total}</p>
                      </div>
                    </div>


                  </>
                ))}
                <div className="flex justify-between text-lg font-medium text-themeBorderGray mt-6">
                  <div className="flex justify-between w-1/3">
                    <div className="flex flex-col gap-2">
                      <p>Subtotal</p>
                      <p>Delivery Fee</p>
                      <p>Service Charge</p>
                      {data?.orderDetails?.orderCharge?.packingFee === "0" ? "" : <p>Packing Fee</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <p>{data?.orderDetails?.orderItems?.length === 1 ? <div>{data?.orderDetails?.orderItems?.length} Item</div> : <div>{data?.orderDetails?.orderItems?.length} Items</div>}</p>
                      <p>{""}</p>
                      <p>{""}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>{data?.orderDetails?.subTotal ? `${data?.orderDetails?.restaurant?.currencyUnitID?.symbol} ${data?.orderDetails?.subTotal}` : "N/A"}</p>
                    <p>{data?.orderDetails?.orderCharge?.deliveryFees ? `${data?.orderDetails?.restaurant?.currencyUnitID?.symbol} ${data?.orderDetails?.orderCharge?.deliveryFees}` : "N/A"}</p>
                    <p>{data?.orderDetails?.orderCharge?.serviceCharges ? `${data?.orderDetails?.restaurant?.currencyUnitID?.symbol} ${data?.orderDetails?.orderCharge?.serviceCharges}` : "N/A"} </p>
                    <p>{data?.orderDetails?.orderCharge?.packingFee === "0" ? "" : `${data?.orderDetails?.restaurant?.currencyUnitID?.symbol} ${data?.orderDetails?.orderCharge?.packingFee}`}</p>
                  </div>
                </div>



                <div className="font-bold text-xl flex justify-between mt-2">
                  <p>Total</p><p>{data?.orderDetails?.restaurant?.currencyUnitID?.symbol}{data?.orderDetails?.total}</p>
                </div>
                <hr className="bg-gray-300 h-[1px] my-2" />
                <div className="font-bold text-xl flex justify-between">
                  <p className="font-medium text-themeBorderGray">Paid by customer</p><p>N/A</p>
                </div>

              </div>



              <div className="w-[45%]">
                <div className="flex flex-col justify-center gap-3 items-center bg-red-500 rounded-xl text-white py-6">
                  <h4 className="text-xl font-bold">ON DELIVERY</h4>
                  <p>Estimated Time, 8-15 min</p>
                </div>

                <div className="space-y-4 pl-3 min-h-[135px] ">
                  {data?.orderDetails?.orderHistories?.map((his, ind) => (
                    <div className="flex items-center mt-6">
                      <div className="flex justify-center items-center font-semibold w-8 h-[30px] bg-themeRed rounded-full text-white -mt-5">
                        <FaCheck />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="font-switzer ml-3">
                          <p> {his?.orderStatus?.name}</p>
                          {his?.time
                            ? dayjs(his?.time).format("DD-MM-YYYY h:mm:ss A")
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>



                {data?.orderDetails?.DriverId && <div className="flex justify-between pr-4 mt-10">

                  <div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xl font-bold text-red-500">#{data?.vehicleTypeId ? data?.vehicleTypeId : "N/A"}</h4>
                      <p className="font-medium text-lg text-themeBorderGray">Driver</p>
                      <p className="text-xl font-bold">{data?.orderDetails?.DriverId?.firstName || data?.orderDetails?.DriverId?.lastName ? `${data?.orderDetails?.DriverId?.firstName} ${data?.orderDetails?.DriverId?.lastName}` : "N/A"}</p>
                      <Link to={`mailto:${data?.orderDetails?.DriverId?.email}`} className="flex items-center font-medium text-themeBorderGray mt-2"><IoMailOutline className="text-red-500 text-xl font-bold" />&nbsp;
                        {data?.orderDetails?.DriverId?.email ? data?.orderDetails?.DriverId?.email : "N/A"}
                      </Link>
                    </div>
                    <Link to={`tel:${data?.orderDetails?.DriverId?.countryCode} ${data?.orderDetails?.DriverId?.phoneNum}`} className="flex items-center font-medium text-themeBorderGray mt-2"><LuPhone className="text-red-500 text-xl" />&nbsp;
                      {data?.orderDetails?.DriverId?.countryCode || data?.orderDetails?.DriverId?.phoneNum ? `${data?.orderDetails?.DriverId?.countryCode}  ${data?.orderDetails?.DriverId?.phoneNum}` : "N/A"}
                    </Link>
                  </div>
                  <div>
                    <img className="w-32 h-32 rounded-md object-cover" src="/images/user.jpg" alt="image" />
                  </div>
                </div>}


              </div>
            </div>

            {/* ====================== */}
            <div className="flex gap-6 relative top-20">
              <div className="min-w-[400px] flex flex-col justify-center items-center bg-white shadow py-8 rounded-md">
                <div>
                  <img className="w-32 h-32 rounded-md object-cover" src="/images/user.jpg" alt="image" />
                </div>
                <h4 className="mt-5 text-2xl font-bold">{data?.orderDetails?.user?.userName ? data?.orderDetails?.user?.userName : "N/A"}</h4>
                <p className="my-3 font-medium text-themeBorderGray text-xl">Customer</p>
                <div className="flex gap-6 mt-4">
                  <div className="bg-sky-100 text-xl rounded-md p-3 text-red-500 cursor-pointer"><Link to={`tel:${data?.orderDetails?.user?.countryCode}${data?.orderDetails?.user?.phoneNum}`}><FaPhoneVolume /></Link> </div>
                  <div className="bg-sky-100 text-xl rounded-md p-3 text-red-500 cursor-pointer"><BsFillChatSquareTextFill /></div>
                  <div className="bg-sky-100 text-xl rounded-md p-3 text-red-500 cursor-pointer"><FaLocationDot /></div>
                </div>
              </div>
              <div className="flex-1 w-full p-4 bg-white shadow rounded-md">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d196281.2215564226!2d-105.01991837576863!3d39.7644863346684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1721044326339!5m2!1sen!2s" width="100%" height="100%" ></iframe>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
