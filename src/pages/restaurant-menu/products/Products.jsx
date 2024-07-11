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
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import GetAPI from "../../../utilities/GetAPI";
import Loader from "../../../components/Loader";
import { BASE_URL } from "../../../utilities/URL";

export default function Products() {
  const { data } = GetAPI("admin/allproducts");
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");

  const productData = () => {
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

  const columns = [
    { field: "sn", header: "Serial. No" },
    { field: "id", header: "Id" },
    {
      field: "image",
      header: "Image",
    },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "restaurant",
      header: "Restaurant",
    },
    {
      field: "menuCategory",
      header: "Menu Category",
    },
    {
      field: "price",
      header: "Price",
    },
    {
      field: "attribute",
      header: "Attribute",
    },
    // {
    //   field: "action",
    //   header: "Action",
    // },
  ];

  const datas = [];
  productData()?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      id: values?.id,
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
      restaurant: values?.R_MCLink?.restaurant?.businessName,
      menuCategory: values?.R_MCLink?.menuCategory?.name,
      price: values?.originalPrice,
      attribute:
        values?.isPopular || values?.isNew || values?.isRecommended ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div
                className="bg-themeRed text-white text-xs font-semibold px-2 py-1 rounded-full flex 
              justify-center items-center"
              >
                Popular
              </div>
              <div
                className="bg-[#434445] text-white text-xs font-semibold px-2 py-1  rounded-full flex 
              justify-center items-center"
              >
                New
              </div>
            </div>
            <div
              className="bg-[#92D48F] text-white text-xs font-semibold px-2 py-1  rounded-full flex 
              justify-center items-centerz"
            >
              Recommended
            </div>
          </div>
        ) : (
          <></>
        ),
      // action: <EditButton text="View Details" />,
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
                All Products
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
                  csvdata={datas}
                />
                <div className="flex gap-2">
                  {/* <RedButton text="Add New Product" onClick={openModal} /> */}
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
                      name="firtName"
                      id="firtName"
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
                      htmlFor="phone"
                      className="text-black font-switzer font-semibold"
                    >
                      Phone No
                    </label>
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
                    />
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
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter padding={4}>
                <div className="flex gap-2">
                  <BlackButton
                    text="Cancle"
                    onClick={() => {
                      setModal(false);
                    }}
                  />

                  <RedButton text="Add" />
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      }
    />
  );
}
