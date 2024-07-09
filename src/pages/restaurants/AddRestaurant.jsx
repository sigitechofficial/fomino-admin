import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../../components/Layout";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BlackButton, TabButton } from "../../utilities/Buttons";
import { MiniLoader } from "../../components/Loader";
import Select from "react-select";

export default function AddRestaurant() {
  const [tab, setTab] = useState("User Detail");
  const [loader, setLoader] = useState(false);

  return (
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
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label
                        htmlFor="firstName"
                        className="text-black font-switzer font-semibold"
                      >
                        First Name
                      </label>
                      <input
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
                        type="email"
                        name="email"
                        id="email"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="text-black font-switzer font-semibold"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
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
                            // onChange={(code) =>
                            //   setDetails({ ...details, countryCode: code })
                            // }
                          />
                        </div>
                        <div className="col-span-4">
                          <input
                            type="number"
                            name="phoneNum"
                            className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="moduleType"
                        className="text-black font-switzer font-semibold"
                      >
                        Select Module
                      </label>
                      <Select
                        placeholder="Select Module"
                        name="moduleType"
                        // options={deliveryTypeOptions}
                        // onChange={(e) =>
                        //   setDeliveryData({
                        //     ...deliveryData,
                        //     deliveryTypeId: e?.value,
                        //   })
                        // }
                      />
                    </div>

                    <div className="flex items-center gap-2 col-span-2 justify-end">
                      <BlackButton
                        text="Update User"
                        // onClick={updateUserDetails}
                      />
                    </div>
                  </div>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      }
    />
  );
}
