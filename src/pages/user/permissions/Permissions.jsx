import React, { useState } from "react";
import Layout from "../../../components/Layout";
import Helment from "../../../components/Helment";
import MyDataTable from "../../../components/MyDataTable";
import RedButton, { BlackButton, EditButton } from "../../../utilities/Buttons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Loader, { MiniLoader } from "../../../components/Loader";
import GetAPI from "../../../utilities/GetAPI";
import dayjs from "dayjs";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../../utilities/Toaster";
import { PostAPI } from "../../../utilities/PostAPI";

export default function Permissions() {
  const { data, reFetch } = GetAPI("admin/get_permissions");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalType, setModalType] = useState("");
  const [permissionId, setPermissionId] = useState("");
  const [addPermission, setAddPermission] = useState("");
  const [updatePermission, setUpdatePermission] = useState("");

  const openModal = (type, id) => {
    setModalType(type);
    setModal(true);
    setPermissionId(id);
  };

  const permissionData = () => {
    const filteredData = data?.data?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.title && dat?.title.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const addNewPermission = async () => {
    if (addPermission === "") {
      info_toaster("Please Enter Name");
    } else {
      setLoader(true);
      const res = await PostAPI("admin/add_permission", {
        title: addPermission,
      });
      if (res?.data?.status === "1") {
        setLoader(false);
        reFetch();
        setModal(false);
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };

  const update = async () => {
    if (updatePermission === "") {
      info_toaster("Please Enter Name");
    } else {
      setLoader(true);
      const res = await PostAPI("admin/updatePermission", {
        id: permissionId,
        title: updatePermission,
      });
      if (res?.data?.status === "1") {
        setLoader(false);
        reFetch();
        setModal(false);
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };

  const columns = [
    { field: "sn", header: "Serial. No" },
    { field: "id", header: "Id" },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "createdDate",
      header: "Created Date",
    },
    {
      field: "updatedDate",
      header: "Updated Date",
    },
    {
      field: "action",
      header: "Action",
    },
  ];

  const datas = [];
  const csv = [];
  permissionData()?.map((values, index) => {
    csv.push({
      sn: index + 1,
      id: values?.id,
      name: values?.title,
      createdDate: values?.createdAt,
      updatedDate: values?.updatedAt,
    })
    return datas.push({
      sn: index + 1,
      id: values?.id,
      name: values?.title,
      createdDate: dayjs(values?.createdAt).format("DD-MM-YYYY h:mm:ss A"),
      updatedDate: dayjs(values?.updatedAt).format("DD-MM-YYYY h:mm:ss A"),
      action: (
        <div>
          <EditButton
            text="Update"
            onClick={() => openModal("Edit Permission", values?.id)}
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
                All Permissions
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
                  csvdata={csv}
                />
                <div className="flex gap-2">
                  <RedButton
                    text="Add New Permissions"
                    onClick={() => openModal("Add Permission")}
                  />
                </div>
              </div>
            </div>

            <div>
              <MyDataTable columns={columns} data={datas} />
            </div>
          </div>

          <Modal onClose={() => setModal(false)} isOpen={modal} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody padding={4}>
                {loader ? (
                  <div className="h-[200px]">
                    <MiniLoader />
                  </div>
                ) : modalType === "Add Permission" ? (
                  <div className="space-y-5">
                    <div className="border-b-2 border-b-[#0000001F] text-lg font-norms font-medium">
                      Add New Permission
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="name"
                        className="text-black font-norms font-medium"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                        onChange={(e) => {
                          setAddPermission(e.target.value);
                        }}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <BlackButton
                        text="Cancel"
                        onClick={() => {
                          setModal(false);
                        }}
                      />

                      <RedButton text="Add" onClick={addNewPermission} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="border-b-2 border-b-[#0000001F] text-lg font-norms font-medium">
                      Update Permission
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="name"
                        className="text-black font-norms font-medium"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                        onChange={(e) => {
                          setUpdatePermission(e.target.value);
                        }}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <BlackButton
                        text="Cancel"
                        onClick={() => {
                          setModal(false);
                        }}
                      />

                      <RedButton text="Update" onClick={update} />
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
