import React, { useState } from "react";
import Layout from "../../components/Layout";
import Helment from "../../components/Helment";
import RedButton, { BlackButton, EditButton } from "../../utilities/Buttons";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import Loader, { MiniLoader } from "../../components/Loader";
import Switch from "react-switch";
import dayjs from "dayjs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { PostAPI } from "../../utilities/PostAPI";
import Select from "react-select";
import { PutAPI } from "../../utilities/PutAPI";

export default function Voucher() {
  const { data, reFetch } = GetAPI("admin/allvouchers");
  const restaurants = GetAPI("admin/getallrestaurants");
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");
  const [addVoucher, setAddVoucher] = useState({
    code: "",
    value: "",
    type: "",
    from: "",
    to: "",
    storeApplicable: [],
    conditionalAmount: "2",
  });

  const [updateVoucher, setUpdateVoucher] = useState({
    voucherId: "",
    code: "",
    value: "",
    type: "",
    from: "",
    to: "",
    storeApplicable: [],
    conditionalAmount: "2",
  });

  const notificationData = () => {
    const filteredData = data?.data?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.code && dat?.code.toLowerCase().includes(search.toLowerCase())) ||
        (dat?.type && dat?.type.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const openModal = (modType, id, code, value) => {
    setModal(true);
    setModalType(modType);
    setUpdateVoucher({
      voucherId: id,
      code: code,
      value: value,
    });
  };

  const options = [
    { value: 1, label: "Flat" },
    { value: 2, label: "Percentage" },
  ];

  const restaurantList = [];
  restaurants?.data?.data?.map((res, ind) => {
    restaurantList.push({
      value: res?.id,
      label: res?.businessName,
    });
  });

  const handleOnChange = (e) => {
    setAddVoucher({ ...addVoucher, [e.target.name]: e.target.value });
  };

  const handleUpdateOnChange = (e) => {
    setUpdateVoucher({ ...updateVoucher, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions) => {
    setAddVoucher({
      ...addVoucher,
      storeApplicable: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const handleUpdateSelectChange = (selectedOptions) => {
    setUpdateVoucher({
      ...updateVoucher,
      storeApplicable: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const addNewVocher = async () => {
    if (addVoucher?.code === "") {
      info_toaster("Please Add Voucher Code");
    } else if (addVoucher?.value === "") {
      info_toaster("Please Add Voucher Value");
    } else if (addVoucher?.type === "") {
      info_toaster("Please Select Voucher Type");
    } else if (addVoucher?.storeApplicable === "") {
      info_toaster(
        "Please Select the Restaurants that are Applicable for the Voucher."
      );
    } else if (addVoucher?.from === "") {
      info_toaster("Please Select Voucher Start Date");
    } else if (addVoucher?.to === "") {
      info_toaster("Please Select Voucher End Date");
    } else {
      setLoader(true);
      const res = await PostAPI("admin/addvoucher", {
        code: addVoucher?.code,
        value: addVoucher?.value,
        type: addVoucher?.type,
        from: addVoucher?.from,
        to: addVoucher?.to,
        storeApplicable: addVoucher?.storeApplicable,
        conditionalAmount: "2",
      });
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        setModal(false);
        success_toaster(res?.data?.message);
        setAddVoucher({
          code: "",
          value: "",
          type: "",
          from: "",
          to: "",
          storeApplicable: [],
          conditionalAmount: "2",
        });
      } else {
        error_toaster(res?.data?.message);
        setLoader(false);
      }
    }
  };

  const update = async () => {
    setLoader(true);
    const res = await PutAPI("admin/updatevoucher", {
      voucherId: updateVoucher?.voucherId,
      code: updateVoucher?.code,
      value: updateVoucher?.value,
      type: updateVoucher?.type,
      from: updateVoucher?.from,
      to: updateVoucher?.to,
      storeApplicable: updateVoucher?.storeApplicable,
      conditionalAmount: "2",
    });
    if (res?.data?.status === "1") {
      reFetch();
      setLoader(false);
      setModal(false);
      success_toaster(res?.data?.message);
    } else {
      error_toaster(res?.data?.message);
      setLoader(false);
    }
  };

  const updateStatus = async (id, status) => {
    let res = await PutAPI(`admin/changevoucherstatus`, {
      voucherId: id,
      status: status ? "false" : "true",
    });
    if (res?.data?.status === "1") {
      success_toaster(res?.data?.message);
      reFetch();
    } else {
      error_toaster(res?.data?.message);
    }
  };

  const columns = [
    { field: "sn", header: "Serial. No" },
    { field: "id", header: "Id" },
    {
      field: "code",
      header: "Code",
    },
    {
      field: "value",
      header: "Value",
    },
    {
      field: "discount",
      header: "Discount",
    },
    {
      field: "conditionalAmount",
      header: "Conditional Amount",
    },
    {
      field: "type",
      header: "Type",
    },
    {
      field: "from",
      header: "From",
    },
    {
      field: "to",
      header: "To",
    },
    {
      field: "applicableStore",
      header: "Applicable Store",
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
  notificationData()?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      id: values?.id,
      code: values?.code,
      value: values?.value,
      discount: values?.discount ? values?.discount : "0.00",
      conditionalAmount: values?.conditionalAmount
        ? values?.conditionalAmount
        : "0.00",
      type: values?.type,
      applicableStore: values?.storeApplicable,
      from: dayjs(values?.from).format("DD-MM-YYYY h:mm:ss A"),
      to: dayjs(values?.to).format("DD-MM-YYYY h:mm:ss A"),
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
            text="Update"
            onClick={() =>
              openModal(
                "Update Voucher",
                values?.id,
                values?.code,
                values?.value,
                values?.from,
                values?.to
              )
            }
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
                All Vouchers
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
                />
                <div className="flex gap-2">
                  <RedButton
                    text="Add New Voucher"
                    onClick={() => openModal("Add New Voucher")}
                  />
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
              <ModalCloseButton />
              <ModalBody padding={4}>
                {loader ? (
                  <div className="h-[450px]">
                    <MiniLoader />
                  </div>
                ) : modalType === "Add New Voucher" ? (
                  <div className="space-y-5">
                    <div className="border-b-2 border-b-[#0000001F] text-lg font-norms font-medium">
                      Add Voucher
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label
                          htmlFor="code"
                          className="text-black font-switzer font-semibold"
                        >
                          Code
                        </label>
                        <input
                          value={addVoucher?.code}
                          type="text"
                          name="code"
                          id="code"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleOnChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="value"
                          className="text-black font-switzer font-semibold"
                        >
                          Value
                        </label>
                        <input
                          value={addVoucher?.value}
                          type="number"
                          name="value"
                          id="value"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleOnChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="type"
                          className="text-black font-switzer font-semibold"
                        >
                          Flat/Percentage
                        </label>
                        <Select
                          placeholder="Select"
                          value={addVoucher?.type}
                          name="type"
                          options={options}
                          onChange={(e) =>
                            setAddVoucher({
                              ...addVoucher,
                              type: e?.label,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="storeApplicable"
                          className="text-black font-switzer font-semibold"
                        >
                          Select Restaurant
                        </label>
                        <Select
                          value={addVoucher?.applicableStore}
                          placeholder="Select"
                          name="storeApplicable"
                          options={restaurantList}
                          isMulti
                          onChange={handleSelectChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="from"
                          className="text-black font-switzer font-semibold"
                        >
                          From
                        </label>
                        <input
                          value={addVoucher?.from}
                          type="date"
                          name="from"
                          id="from"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleOnChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="to"
                          className="text-black font-switzer font-semibold"
                        >
                          To
                        </label>
                        <input
                          value={addVoucher?.to}
                          type="date"
                          name="to"
                          id="to"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end col-span-2 gap-2">
                      <BlackButton
                        text="Cancle"
                        onClick={() => {
                          setModal(false);
                        }}
                      />
                      <RedButton text="Add" onClick={addNewVocher} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="border-b-2 border-b-[#0000001F] text-lg font-norms font-medium">
                      Update Voucher
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label
                          htmlFor="code"
                          className="text-black font-switzer font-semibold"
                        >
                          Code
                        </label>
                        <input
                          value={updateVoucher?.code}
                          type="text"
                          name="code"
                          id="code"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleUpdateOnChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="value"
                          className="text-black font-switzer font-semibold"
                        >
                          Value
                        </label>
                        <input
                          value={updateVoucher?.value}
                          type="number"
                          name="value"
                          id="value"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleUpdateOnChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="type"
                          className="text-black font-switzer font-semibold"
                        >
                          Flat/Percentage
                        </label>
                        <Select
                          placeholder="Select"
                          name="type"
                          options={options}
                          onChange={(e) =>
                            setUpdateVoucher({
                              ...updateVoucher,
                              type: e?.label,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="storeApplicable"
                          className="text-black font-switzer font-semibold"
                        >
                          Select Restaurant
                        </label>
                        <Select
                          placeholder="Select"
                          name="storeApplicable"
                          options={restaurantList}
                          isMulti
                          onChange={handleUpdateSelectChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="from"
                          className="text-black font-switzer font-semibold"
                        >
                          From
                        </label>
                        <input
                          value={updateVoucher?.from}
                          type="date"
                          name="from"
                          id="from"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleUpdateOnChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="to"
                          className="text-black font-switzer font-semibold"
                        >
                          To
                        </label>
                        <input
                          value={updateVoucher?.to}
                          type="date"
                          name="to"
                          id="to"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleUpdateOnChange}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end col-span-2 gap-2">
                      <BlackButton
                        text="Cancle"
                        onClick={() => {
                          setModal(false);
                        }}
                      />
                      <RedButton text="update" onClick={update} />
                    </div>
                  </div>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      }
    />
  );
}
