import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../../components/Layout";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import { PostAPI } from "../../utilities/PostAPI";
import { error_toaster } from "../../utilities/Toaster";
import dayjs from "dayjs";

export default function OrderDetails() {
  const location = useLocation();
  const orderId = location?.state?.id;
  const [data, setData] = useState("");

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
        <div className="bg-themeGray p-5">
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

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white shadow-textShadow p-5 space-y-5">
                <h4 className="text-xl text-themeRed font-medium font-norms">
                  Order Detail
                </h4>

                <div className="space-y-2">
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Order Number</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.orderNum ? data?.orderNum : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Created At</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.createdAt
                        ? dayjs(data?.createdAt).format("DD-MM-YYYY h:mm:ss A")
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Order Status</div>
                    <div>
                      {data?.orderStatus?.name === "Delivered" ? (
                        <div className="bg-[#21965314]  text-themeGreen font-semibold p-2 rounded-md flex justify-center">
                          Delivered
                        </div>
                      ) : data?.orderStatus?.name === "Cancelled" ? (
                        <div
                          className="bg-[#EE4A4A14]  text-themeRed font-semibold p-2 rounded-md 
                          flex justify-center"
                        >
                          Cancelled
                        </div>
                      ) : data?.orderStatus?.name === "Rejected" ? (
                        <div className="bg-[#1860CC33] text-[#1860CC] font-semibold p-2 rounded-md flex justify-center">
                          Rejected
                        </div>
                      ) : (
                        <div className="bg-[#EC6C3033] text-[#EC6C30] font-semibold p-2 rounded-md flex justify-center">
                          Scheduled
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Order Type</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.orderType?.type ? data?.orderType?.type : "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-textShadow p-5 space-y-5">
                <h4 className="text-xl text-themeRed font-medium font-norms">
                  Customer Detail
                </h4>

                <div className="space-y-2">
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Customer Name</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.user?.userName ? data?.user?.userName : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Email</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.user?.email ? data?.user?.email : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Phone #</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {`${data?.user?.countryCode}${data?.user?.phoneNum}`
                        ? `${data?.user?.countryCode}${data?.user?.phoneNum}`
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Delivery Address</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.dropOffID?.streetAddress
                        ? data?.dropOffID?.streetAddress
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-textShadow p-5 space-y-5">
                <h4 className="text-xl text-themeRed font-medium font-norms">
                  Driver Detail
                </h4>

                <div className="space-y-2">
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Driver Name</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {`${data?.DriverId?.firstName}${data?.DriverId?.lastName}`
                        ? `${data?.DriverId?.firstName} ${data?.DriverId?.lastName}`
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Email</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.DriverId?.email ? data?.DriverId?.email : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Phone #</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {`${data?.DriverId?.countryCode}${data?.DriverId?.phoneNum}`
                        ? `${data?.DriverId?.countryCode}${data?.DriverId?.phoneNum}`
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-textShadow p-5 space-y-5">
                <h4 className="text-xl text-themeRed font-medium font-norms">
                  Delivery Detail
                </h4>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="font-medium">Pickup Address</div>
                    <div className="font-medium text-themeBorderGray">
                      {data?.restaurant?.address
                        ? data?.restaurant?.address
                        : "N/A"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">Delivery Address</div>
                    <div className="font-medium text-themeBorderGray">
                      {data?.dropOffID?.streetAddress
                        ? data?.dropOffID?.streetAddress
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-textShadow p-5 space-y-5">
                <h4 className="text-xl text-themeRed font-medium font-norms">
                  Order List
                </h4>

                <div className="space-y-2">
                  {data?.orderItems?.map((items, index) => (
                    <div className="flex justify-between items-center gap-2">
                      <div className=" font-medium">{items?.R_PLink?.name}</div>
                      <div className="font-medium text-themeBorderGray text-end">
                        {items?.unitPrice
                          ? `${data?.restaurant?.currencyUnitID?.symbol}${items?.unitPrice}`
                          : "N/A"}
                      </div>
                    </div>
                  ))}

                  <div className={`w-full bg-black h-[1px]`}></div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">SubTotal</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {/* {data?.orderCharge?.serviceCharges
                        ? `${data?.restaurant?.currencyUnitID?.symbol}${data?.orderCharge?.serviceCharges}`
                        : "N/A"} */}
                        ${data.subTotal}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Discount</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.orderCharge?.discount
                        ? `${data?.restaurant?.currencyUnitID?.symbol}${data?.orderCharge?.discount}`
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Service Charges</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.orderCharge?.serviceCharges
                        ? `${data?.restaurant?.currencyUnitID?.symbol}${data?.orderCharge?.serviceCharges}`
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Delivery Charges</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.orderCharge?.deliveryFees
                        ? `${data?.restaurant?.currencyUnitID?.symbol}${data?.orderCharge?.deliveryFees}`
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">Admin Delivery Charges</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.orderCharge?.adminDeliveryCharges
                        ? `${data?.restaurant?.currencyUnitID?.symbol}${data?.orderCharge?.adminDeliveryCharges}`
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">
                      Restaurant Delivery Charges
                    </div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.orderCharge?.restaurantDeliveryCharges
                        ? `${data?.restaurant?.currencyUnitID?.symbol}${data?.orderCharge?.restaurantDeliveryCharges}`
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-medium">VAT</div>
                    <div className="font-medium text-themeBorderGray text-end">
                      {data?.orderCharge?.VAT
                        ? `${data?.restaurant?.currencyUnitID?.symbol}${data?.orderCharge?.VAT}`
                        : "N/A"}
                    </div>
                  </div>
                  <div className={`w-full bg-black h-[1px]`}></div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="text-xl font-bold font-switzer">Total</div>
                    <div className="text-xl font-medium text-themeBorderGray text-end">
                      {data?.orderCharge?.total
                        ? `${data?.restaurant?.currencyUnitID?.symbol}${data?.orderCharge?.total}`
                        : "N/A"}
                        
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-textShadow p-5 space-y-5">
                <h4 className="text-xl text-themeRed font-medium font-norms">
                  Order History
                </h4>

                <div className="space-y-4">
                  {data?.orderHistories?.map((his, ind) => (
                    <div className="flex items-center">
                      <div className="flex justify-center items-center font-semibold w-8 h-[30px] bg-themeRed rounded-full text-white -mt-5">
                        {ind + 1}
                      </div>
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="font-switzer">
                          {his?.time
                            ? dayjs(his?.time).format("DD-MM-YYYY h:mm:ss A")
                            : "N/A"}
                        </div>
                        <div className="font-medium text-themeBorderGray">
                          {his?.orderStatus?.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
