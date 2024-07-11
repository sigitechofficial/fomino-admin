import React, { useState } from "react";
import Layout from "../../../components/Layout";
import Helment from "../../../components/Helment";
import RedButton, { BlackButton, EditButton } from "../../../utilities/Buttons";
import MyDataTable from "../../../components/MyDataTable";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import GetAPI from "../../../utilities/GetAPI";
import Loader, { MiniLoader } from "../../../components/Loader";
import Switch from "react-switch";
import Select from "react-select";
import { PostAPI } from "../../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../../utilities/Toaster";
import { useNavigate } from "react-router-dom";
import { PutAPI } from "../../../utilities/PutAPI";

export default function UserManagement() {
  const { data, reFetch } = GetAPI("admin/allusers");
  const roles = GetAPI("admin/allactiveroles");
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [roleId, setRoleId] = useState("");
  const navigate = useNavigate();

  const [addUser, setAddUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+92",
    phoneNum: "",
    password: "",
  });

  const roleOptions = [];
  roles.data?.data?.map((activeRoles, index) =>
    roleOptions.push({
      value: activeRoles?.id,
      label: activeRoles?.name,
    })
  );

  const userData = () => {
    const filteredData = data?.data?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.name && dat?.name.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const openModal = () => {
    setModal(true);
  };

  const handleOnEventChange = (e) => {
    setAddUser({ ...addUser, [e.target.name]: e.target.value });
  };

  const viewDetails = (id) => {
    navigate("/user-details", {
      state: {
        id: id,
      },
    });
  };

  const addNewUser = async () => {
    if (addUser?.firstName === "") {
      info_toaster("Please Enter First Name");
    } else if (addUser?.lastName === "") {
      info_toaster("Please Enter Last Name");
    } else if (addUser?.email === "") {
      info_toaster("Please Enter Email");
    } else if (addUser?.countryCode === "") {
      info_toaster("Please Select Country Code");
    } else if (addUser?.phoneNum === "") {
      info_toaster("Please Enter Phone Number");
    } else if (addUser?.password === "") {
      info_toaster("Please Enter Password");
    } else if (roleId === "") {
      info_toaster("Please Select User Role");
    } else {
      setLoader(true);
      const res = await PostAPI("admin/adduser", {
        firstName: addUser?.firstName,
        lastName: addUser?.lastName,
        email: addUser?.email,
        countryCode: addUser?.countryCode,
        phoneNum: addUser?.phoneNum,
        password: addUser?.password,
        roleId: roleId?.value,
      });
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        setModal(false);
        setAddUser({
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "",
          phoneNum: "",
          password: "",
        });
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };

  const updateStatus = async (userId, userStatus) => {
    if (userStatus === true) {
      let res = await PutAPI(`admin/banuser/${userId}`);
      if (res?.data?.status === "1") {
        success_toaster(res?.data?.message);
        reFetch();
      } else {
        error_toaster(res?.data?.message);
      }
    } else {
      let res = await PutAPI(`admin/approveuser/${userId}`);
      if (res?.data?.status === "1") {
        success_toaster(res?.data?.message);
        reFetch();
      } else {
        error_toaster(res?.data?.message);
      }
    }
  };

  const columns = [
    { field: "sn", header: "Serial. No" },
    { field: "id", header: "User Id" },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "email",
      header: "Email",
    },
    {
      field: "phone",
      header: "Phone No",
    },
    {
      field: "userType",
      header: "User Type",
    },
    {
      field: "status",
      header: "Status",
    },
    {
      field: "action",
      header: "Action",
    },
  ];

  const datas = [];
  userData()?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      id: values?.id,
      name: values?.name,
      email: values?.email,
      phone: values?.phoneNum,
      userType: values?.role,
      status: (
        <div>
          {values?.status ? (
            <div
              className="bg-[#21965314] text-themeGreen font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Active
            </div>
          ) : (
            <div
              className="bg-[#EE4A4A14] text-themeRed font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Inactive
            </div>
          )}
        </div>
      ),
      action: (
        <div className="flex items-center gap-3">
          <label>
            <Switch
              onChange={() => {
                updateStatus(values?.id, values?.status);
              }}
              checked={values?.status}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#139013"
              onHandleColor="#fff"
              className="react-switch"
              boxShadow="none"
            />
          </label>

          <EditButton
            text="View Details"
            onClick={() => viewDetails(values?.id)}
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
                All users
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
                  csvdata={datas}
                />
                <div className="flex gap-2">
                  {/* <BlackButton text="Roles & Permissions" /> */}
                  <RedButton text="Add Employee" onClick={openModal} />
                </div>
              </div>
            </div>

            <div>
              <MyDataTable columns={columns} data={datas} />
            </div>
          </div>

          <Modal
            onClose={() => setModal(false)}
            isOpen={modal}
            size={"2xl"}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader padding={0}>
                <div className="border-b-2 border-b-[#0000001F] px-5 py-2.5 text-lg font-norms font-medium">
                  Add New Employee
                </div>
              </ModalHeader>
              <ModalCloseButton />

              {loader ? (
                <div className="h-[480px]">
                  <MiniLoader />
                </div>
              ) : (
                <ModalBody padding={4}>
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
                        onChange={handleOnEventChange}
                        value={addUser?.firstName}
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
                        onChange={handleOnEventChange}
                        value={addUser?.lastName}
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
                        onChange={handleOnEventChange}
                        value={addUser?.email}
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="phone"
                        className="text-black font-switzer font-semibold"
                      >
                        Phone No
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <PhoneInput
                            country={"pk"}
                           
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
                              setAddUser({ ...addUser, countryCode: code })
                            }
                            value={addUser?.countryCode}
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            name="phoneNum"
                            className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                            onChange={handleOnEventChange}
                            value={addUser?.phoneNum}
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
                        type="password"
                        name="password"
                        id="password"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                        onChange={handleOnEventChange}
                        value={addUser?.password}
                      />
                    </div>

                    <div className="space-y-1 col-span-2">
                      <label
                        htmlFor="role"
                        className="text-black font-switzer font-semibold"
                      >
                        Select Role
                      </label>
                      <Select
                        placeholder="Select"
                        options={roleOptions}
                        onChange={(e) => {
                          setRoleId(e);
                        }}
                      />
                    </div>

                    <div className="flex justify-end col-span-2 gap-2">
                      <BlackButton
                        text="Cancle"
                        onClick={() => {
                          setModal(false);
                        }}
                      />

                      <RedButton text="Add" onClick={addNewUser} />
                    </div>
                  </div>
                </ModalBody>
              )}
            </ModalContent>
          </Modal>
        </div>
      }
    />
  );
}
