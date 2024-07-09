import React, { useState } from "react";
import Layout from "../../../components/Layout";
import Helment from "../../../components/Helment";
import RedButton, { BlackButton, EditButton } from "../../../utilities/Buttons";
import MyDataTable from "../../../components/MyDataTable";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import GetAPI from "../../../utilities/GetAPI";
import Loader, { MiniLoader } from "../../../components/Loader";
import { BASE_URL } from "../../../utilities/URL";
import { MdAddPhotoAlternate } from "react-icons/md";
import Select from "react-select";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../../utilities/Toaster";
import { PostAPI } from "../../../utilities/PostAPI";
import { PutAPI } from "../../../utilities/PutAPI";

export default function StoreCuisines() {
  const { data, reFetch } = GetAPI("admin/getAllCuisinesStore");
  const store = GetAPI("admin/getAllStores");
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [modalType, setModalType] = useState(null);
  const [addCuisine, setAddCuisine] = useState({
    name: "",
    image: "",
    id: "",
  });

  const [updateCuisine, setUpdateCuisine] = useState({
    name: "",
    image: "",
    id: "",
  });

  const cuisinesData = () => {
    const filteredData = data?.data?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.name && dat?.name.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const openModal = (type, id, name, image) => {
    setModalType(type);
    setModal(true);
    setUpdateCuisine({
      name: name,
      image: image,
      id: id,
    });
  };

  const storeOptions = [];
  store?.data?.data?.map((store, index) =>
    storeOptions.push({
      value: store?.id,
      label: store?.businessName,
    })
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAddCuisine({
        ...addCuisine,
        image: file,
        imgShow: imageUrl,
      });
    }
  };

  const handleUpdateImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUpdateCuisine({
        ...updateCuisine,
        image: file,
        imgShow: imageUrl,
      });
    }
  };

  const addNewCuisines = async () => {
    if (addCuisine?.image === "") {
      info_toaster("Please Add Cuisine Image");
    } else if (addCuisine?.name === "") {
      info_toaster("Please Add Cuisine Name");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("name", addCuisine?.name);
      formData.append("cuisine", addCuisine?.image);
      formData.append("restaurantId", addCuisine?.id);
      let res = await PostAPI("admin/addcuisine", formData);
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        setModal(false);
        success_toaster(res?.data?.message);
        setAddCuisine({
          name: "",
          image: "",
          id: "",
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };

  const updateCuisines = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("name", updateCuisine?.name);
    formData.append("cuisine", updateCuisine?.image);
    formData.append("id", updateCuisine?.id);
    let res = await PutAPI("admin/editcuisine", formData);
    if (res?.data?.status === "1") {
      reFetch();
      setLoader(false);
      setModal(false);
      success_toaster(res?.data?.message);
    } else {
      setLoader(false);
      error_toaster(res?.data?.message);
    }
  };

  const columns = [
    { field: "sn", header: "Serial. No" },
    {
      field: "image",
      header: "Image",
    },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "action",
      header: "Action",
    },
  ];

  const datas = [];
  cuisinesData()?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      image: (
        <div>
          <img
            src={`${BASE_URL}${values?.image}`}
            alt="image"
            className="w-24 h-24"
          />
        </div>
      ),
      name: values?.name,
      action: (
        <EditButton
          text="Update"
          onClick={() =>
            openModal("Update Cuisine", values?.id, values?.name, values?.image)
          }
        />
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
                All Cuisines
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
                />
                <div className="flex gap-2">
                  <RedButton
                    text="Add New Cuisine"
                    onClick={() => openModal("Add New Cuisine")}
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
                  <div className="h-[400px]">
                    <MiniLoader />
                  </div>
                ) : modalType === "Add New Cuisine" ? (
                  <div className="space-y-5">
                    <div className="border-b-2 border-b-[#0000001F] text-black text-lg font-norms font-medium">
                      Add New Cuisine
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <div className="w-28">
                        <label htmlFor="image" className="space-y-1">
                          <span className="text-black font-switzer font-semibold">
                            Upload Image
                          </span>
                          {addCuisine?.image ? (
                            <img
                              src={addCuisine?.imgShow}
                              alt="banner"
                              className="w-24 h-24"
                            />
                          ) : (
                            <div className="p-5 bg-themeInput w-24 h-24 rounded-md cursor-pointer flex justify-center items-center">
                              <MdAddPhotoAlternate
                                size={40}
                                color="#00000099"
                              />
                            </div>
                          )}
                        </label>

                        <input
                          onChange={handleImageChange}
                          type="file"
                          name="image"
                          id="image"
                          hidden
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="name"
                          className="text-black font-switzer font-semibold"
                        >
                          Cuisine Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={(e) =>
                            setAddCuisine({
                              ...addCuisine,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="cuisineName"
                          className="text-black font-switzer font-semibold"
                        >
                          Select Restaurant
                        </label>
                        <Select
                          placeholder="Select"
                          name="id"
                          options={storeOptions}
                          onChange={(e) =>
                            setAddCuisine({ ...addCuisine, id: e?.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <BlackButton
                        text="Cancle"
                        onClick={() => {
                          setModal(false);
                        }}
                      />

                      <RedButton text="Add" onClick={addNewCuisines} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="border-b-2 border-b-[#0000001F] text-black text-lg font-norms font-medium">
                      Update Cuisine
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <div className="w-28">
                        <label htmlFor="image" className="space-y-1">
                          <span className="text-black font-switzer font-semibold">
                            Upload Image
                          </span>

                          <img
                            src={
                              updateCuisine?.imgShow
                                ? updateCuisine?.imgShow
                                : `${BASE_URL}${updateCuisine?.image}`
                            }
                            alt="banner"
                            className="w-24 h-24"
                          />
                        </label>

                        <input
                          onChange={handleUpdateImageChange}
                          type="file"
                          name="image"
                          id="image"
                          hidden
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="name"
                          className="text-black font-switzer font-semibold"
                        >
                          Cuisine Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={(e) =>
                            setUpdateCuisine({
                              ...updateCuisine,
                              name: e.target.value,
                            })
                          }
                          value={updateCuisine?.name}
                        />
                      </div>
                      {/* <div className="space-y-1">
                        <label
                          htmlFor="cuisineName"
                          className="text-black font-switzer font-semibold"
                        >
                          Select Restaurant
                        </label>
                        <Select
                          placeholder="Select"
                          name="id"
                          options={resOptions}
                          onChange={(e) =>
                            setAddCuisine({ ...addCuisine, id: e?.value })
                          }
                        />
                      </div> */}
                    </div>

                    <div className="flex justify-end gap-2">
                      <BlackButton
                        text="Cancle"
                        onClick={() => {
                          setModal(false);
                        }}
                      />

                      <RedButton text="Update" onClick={updateCuisines} />
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
