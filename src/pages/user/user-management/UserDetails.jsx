import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaWallet } from "react-icons/fa";
import Layout from "../../../components/Layout";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Helment from "../../../components/Helment";
import MyDataTable from "../../../components/MyDataTable";
import RedButton, { BlackButton, TabButton } from "../../../utilities/Buttons";
import { useLocation } from "react-router-dom";
import GetAPI from "../../../utilities/GetAPI";
import Loader, { MiniLoader } from "../../../components/Loader";
import dayjs from "dayjs";
import { PutAPI } from "../../../utilities/PutAPI";
import { error_toaster, success_toaster } from "../../../utilities/Toaster";

export default function UserDetails() {
  const location = useLocation();
  const { data, reFetch } = GetAPI(`admin/userdetails/${location?.state?.id}`);
  const [tab, setTab] = useState("User Detail");
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNum: "",
    password: "",
  });

  const handleOnEventChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const updateUserDetails = async () => {
    setLoader(true);
    const res = await PutAPI(`admin/updateuserdetails/${location?.state?.id}`, {
      firstName: details?.firstName,
      lastName: details?.lastName,
      email: details?.email,
      countryCode: details?.countryCode,
      phoneNum: details?.phoneNum,
      password: details?.password,
    });
    if (res?.data?.status === "1") {
      reFetch();
      setLoader(false);
      success_toaster(res?.data?.message);
    } else {
      setLoader(false);
      error_toaster(res?.data?.message);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      if (data && data?.data && data?.data?.userDetails) {
        setDetails({
          firstName: data?.data?.userDetails?.firstName || "",
          lastName: data?.data?.userDetails?.lastName || "",
          email: data?.data?.userDetails?.email || "",
          countryCode: data?.data?.userDetails?.countryCode || "",
          phoneNum: data?.data?.userDetails?.phoneNum || "",
          password: data?.data?.userDetails?.password || "",
        });
      }
    };
    fetchData();
  }, [data, location?.state?.id]);

  const transactionData = () => {
    const filteredData = data?.data?.transactions?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.orderId &&
          dat?.orderId.toString().includes(search.toLowerCase())) ||
        (dat?.paymentType &&
          dat?.paymentType.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const orderData = () => {
    const filteredData = data?.data?.orderData?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.orderNum &&
          dat?.orderNum.toString().includes(search.toLowerCase())) ||
        (dat?.restaurant?.businessName &&
          dat?.restaurant?.businessName
            .toLowerCase()
            .includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  if (tab === "Orders") {
    var columns = [
      { field: "sn", header: "Serial. No" },
      { field: "id", header: "Id" },
      {
        field: "restaurant",
        header: "Restaurant",
      },
      {
        field: "orderNumber",
        header: "Order Num",
      },
      {
        field: "date",
        header: "Schedule Date",
      },
      {
        field: "total",
        header: "Total",
      },
      {
        field: "status",
        header: "Order status",
      },
    ];
  } else if (tab === "Wallet Transaction") {
    var columns = [
      { field: "sn", header: "Serial. No" },
      { field: "id", header: "Id" },
      {
        field: "orderId",
        header: "Order Id",
      },
      {
        field: "paymentType",
        header: "Payment Type",
      },
      {
        field: "amount",
        header: "Amount",
      },
      {
        field: "date",
        header: "Date",
      },
    ];
  }

  const datas = [];
  if (tab === "Wallet Transaction") {
    transactionData()?.map((values, index) => {
      return datas.push({
        sn: index + 1,
        id: values?.id,
        orderId: values?.orderId,
        paymentType: values?.paymentType,
        amount: values?.amount,
        date: dayjs(values?.at).format("DD-MM-YYYY h:mm:ss A"),
      });
    });
  } else {
    orderData()?.map((values, index) => {
      return datas.push({
        sn: index + 1,
        id: values?.id,
        restaurant: values?.restaurant?.businessName,
        orderNumber: values?.orderNum,
        date: dayjs(values?.scheduleDate).format("DD-MM-YYYY h:mm:ss A"),
        total: `${values?.restaurant?.currencyUnitID?.symbol}${values?.total}`,
        status: values?.orderStatus?.name,
      });
    });
  }

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="bg-themeGray p-5">
          <div className="bg-white rounded-lg p-5 h-screen">
            <div className="flex gap-5 items-center">
              <button
                className="bg-themeGray p-2 rounded-full"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft />
              </button>
              <h2 className="text-themeRed text-lg font-bold font-norms">
                {tab === "User Detail" ? (
                  "User Detail"
                ) : tab === "User Role" ? (
                  "Role Management"
                ) : tab === "Wallet Transaction" ? (
                  "Wallet Transactions"
                ) : tab === "Orders" ? (
                  "Orders"
                ) : tab === "Vehicle details" ? (
                  "Vehicle Details"
                ) : tab === "License details" ? (
                  "License Details"
                ) : tab === "Reviews" ? (
                  "Reviews"
                ) : (
                  <></>
                )}
              </h2>
            </div>

            <div className="py-5 space-y-1.5">
              <ul className="flex flex-wrap items-center gap-8">
                <TabButton
                  title="User Detail"
                  tab={tab}
                  onClick={() => setTab("User Detail")}
                />
                <TabButton
                  title="User Role"
                  tab={tab}
                  onClick={() => setTab("User Role")}
                />
                <TabButton
                  title="Wallet Transaction"
                  tab={tab}
                  onClick={() => setTab("Wallet Transaction")}
                />
                <TabButton
                  title="Orders"
                  tab={tab}
                  onClick={() => setTab("Orders")}
                />
              </ul>
              <div className={`w-full bg-[#00000033] h-[1px]`}></div>
            </div>

            {tab === "User Detail" ? (
              loader ? (
                <MiniLoader />
              ) : (
                <div className="space-y-3">
                  <div>
                    <img
                      src="/images/profile.webp"
                      alt="profile"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label
                        htmlFor="firstName"
                        className="text-black font-switzer font-semibold"
                      >
                        First Name
                      </label>
                      <input
                        value={details?.firstName}
                        onChange={handleOnEventChange}
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="lastName"
                        className="text-black font-switzer font-semibold"
                      >
                        Last Name
                      </label>
                      <input
                        value={details?.lastName}
                        onChange={handleOnEventChange}
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="email"
                        className="text-black font-switzer font-semibold"
                      >
                        Email
                      </label>
                      <input
                        value={details?.email}
                        onChange={handleOnEventChange}
                        type="email"
                        name="email"
                        id="email"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="phone"
                        className="text-black font-switzer font-semibold"
                      >
                        Phone No
                      </label>
                      <div className="grid grid-cols-5 gap-1">
                        <div className="col-span-1">
                          <PhoneInput
                            value={details?.countryCode}
                            enableSearch
                            inputStyle={{
                              width: "100%",
                              height: "40px",
                              borderRadius: "6px",
                              outline: "none",
                              border: "none",
                              background: "#F4F4F4",
                            }}
                            inputProps={{
                              id: "countryCode",
                              name: "countryCode",
                            }}
                            onChange={(code) =>
                              setDetails({ ...details, countryCode: code })
                            }
                          />
                        </div>
                        <div className="col-span-4">
                          <input
                            value={details?.phoneNum}
                            onChange={handleOnEventChange}
                            type="number"
                            name="phoneNum"
                            className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 col-span-2">
                      <label
                        htmlFor="password"
                        className="text-black font-switzer font-semibold"
                      >
                        Password
                      </label>
                      <input
                        onChange={handleOnEventChange}
                        type="password"
                        name="password"
                        id="password"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2 col-span-2 justify-end">
                      {/* <RedButton text="Block Driver" /> */}
                      <BlackButton
                        text="Update User"
                        onClick={updateUserDetails}
                      />
                    </div>
                  </div>
                </div>
              )
            ) : tab === "User Role" ? (
              <div className="flex gap-10 items-center">
                <h2 className="text-black font-switzer font-semibold">
                  Current Role :
                </h2>

                <div>
                  <RedButton text={data?.data?.userDetails?.userType} />
                </div>
              </div>
            ) : tab === "Wallet Transaction" ? (
              <div className="space-y-5">
                <div className="flex gap-5">
                  <div className="bg-themeGray w-72 h-40 p-3 rounded-lg flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                      <h2 className="text-themeBorderGray font-switzer">
                        Available Balance
                      </h2>

                      <div className="w-12 h-12 rounded-full bg-white p-2 flex items-center justify-center">
                        <FaWallet size={20} color="#E13743" />
                      </div>
                    </div>

                    <div className="text-4xl font-norms font-medium">
                      ${data?.data?.balance}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-[#00000033] h-[1.5px]"></div>
                <div className="space-y-5">
                  <Helment
                    search={true}
                    searchOnChange={(e) => setSearch(e.target.value)}
                    searchValue={search}
                  />
                  <MyDataTable columns={columns} data={datas} />
                </div>
              </div>
            ) : tab === "Orders" ? (
              <div className="space-y-5">
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
                />
                <MyDataTable columns={columns} data={datas} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      }
    />
  );
}
