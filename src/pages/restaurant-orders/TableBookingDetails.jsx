import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../../components/Layout";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import { PostAPI } from "../../utilities/PostAPI";
import { error_toaster } from "../../utilities/Toaster";
import dayjs from "dayjs";

export default function tableBookingDetails() {
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
  }, []);

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
                  Restaurant Detail
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
            </div>
          </div>
        </div>
      }
    />
  );
}
