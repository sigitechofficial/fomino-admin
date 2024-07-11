import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Helment from "../../components/Helment";
import MyDataTable from "../../components/MyDataTable";
import Loader, { MiniLoader } from "../../components/Loader";
import GetAPI from "../../utilities/GetAPI";
import Switch from "react-switch";
import RedButton, { BlackButton, EditButton } from "../../utilities/Buttons";
import { BASE_URL } from "../../utilities/URL";
import Select from "react-select";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
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

export default function Cities() {
  const { data, reFetch } = GetAPI("admin/getCities");
  const countries = GetAPI("admin/getCountries");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 31.5204, lng: 74.3587 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCYC3-gTg2XJFIeo9fura6PoNuQzzPeBlc",
    libraries,
  });
  const [addCity, setAddCity] = useState({
    name: "",
    countryId: "",
  });
  const [updateCity, setUpdateCity] = useState({
    name: "",
    countryId: "",
    countryName: "",
    cityId: "",
  });

  const containerStyle = {
    width: "100%",
    height: "325px",
  };

  const cityData = () => {
    const filteredData = data?.data?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.name && dat?.name.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const openModal = (
    type,
    cityName,
    cityId,
    countryId,
    countryName,
    lat,
    lng
  ) => {
    setModalType(type);
    setModal(true);
    setUpdateCity({
      name: cityName,
      countryId: countryId,
      cityId: cityId,
      countryName: countryName,
    });

    if (type === "Update City") {
      const newCenter = { lat: parseFloat(lat), lng: parseFloat(lng) };
      setCenter(newCenter);
      setMarkerPosition(newCenter);
    } else if (type === "Add City") {
      const defaultCenter = { lat: 31.5204, lng: 74.3587 };
      setCenter(defaultCenter);
      setMarkerPosition(defaultCenter);
    }
  };

  const onMapLoad = useCallback(
    (mapInstance) => {
      setMap(mapInstance);
      mapInstance.setOptions({ draggableCursor: "crosshair" });
      if (modalType === "Update City") {
        mapInstance.panTo(center);
        mapInstance.setZoom(10);
        setMarkerPosition(center);
      } else if (modalType === "Add New City") {
        setMarkerPosition(center);
      }
    },
    [center, modalType]
  );

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        const newLocation = { lat: location.lat(), lng: location.lng() };
        setCenter(newLocation);
        setMarkerPosition(newLocation);
        if (map) {
          map.panTo(location);
          map.setZoom(15);
        }
      }
    }
  };

  const countryOptions = [];
  countries?.data?.data?.countries?.map((count) => {
    countryOptions.push({
      value: count?.id,
      label: count?.name,
    });
  });

  const addNewCity = async () => {
    if (addCity?.name === "") {
      info_toaster("Please Add City Name");
    } else if (addCity?.countryId === "") {
      info_toaster("Please Select Country To Add New City");
    } else {
      setLoader(true);
      let res = await PostAPI("admin/addCity", {
        name: addCity?.name,
        countryId: addCity?.countryId,
        lat: center?.lat,
        lng: center?.lng,
      });
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        setModal(false);
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };

  const update = async () => {
    setLoader(true);
    let res = await PostAPI("admin/editCity", {
      name: updateCity?.name,
      cityId: updateCity?.cityId,
      countryId: updateCity?.countryId,
      lat: center?.lat,
      lng: center?.lng,
    });
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

  const updateStatus = async (id, status) => {
    let res = await PostAPI("admin/changeStatusofCity", {
      status: !status,
      cityId: id,
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
      field: "cityName",
      header: "City Name",
    },
    {
      field: "countryName",
      header: "Country Name",
    },
    {
      field: "countryFlag",
      header: "Country Flag",
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
  cityData()?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      id: values?.id,
      cityName: values?.name,
      countryName: values?.country?.name,
      countryFlag: (
        <div>
          <img
            src={`${BASE_URL}${values?.country?.flag}`}
            alt="image"
            className="w-24 h-24"
          />
        </div>
      ),
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
            onClick={() => {
              openModal(
                "Update City",
                values?.name,
                values?.id,
                values?.country?.id,
                values?.country?.name,
                values?.lat,
                values?.lng
              );
            }}
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
                All Cities
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <Helment
                  search={true}
                  searchOnChange={(e) => setSearch(e.target.value)}
                  searchValue={search}
                  csvdata={datas}
                />
                <div className="flex gap-2">
                  <RedButton
                    text="Add New City"
                    onClick={() => openModal("Add New City")}
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
                ) : modalType === "Add New City" ? (
                  <div className="space-y-5">
                    <div
                      className="border-b-2 border-b-[#0000001F] text-black text-lg 
                    font-norms font-medium"
                    >
                      Add New Country
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <div className="space-y-1">
                        <label
                          htmlFor="name"
                          className="text-black font-switzer font-semibold"
                        >
                          City Name
                        </label>
                        <input
                          value={addCity?.name}
                          type="text"
                          name="name"
                          id="name"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={(e) =>
                            setAddCity({
                              ...addCity,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="countryId"
                          className="text-black font-switzer font-semibold"
                        >
                          Select Country
                        </label>
                        <Select
                          placeholder="Select"
                          name="countryId"
                          options={countryOptions}
                          onChange={(e) =>
                            setAddCity({
                              ...addCity,
                              countryId: e?.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      {isLoaded && (
                        <div className="relative space-y-1">
                          <label
                            htmlFor="name"
                            className="text-black font-switzer font-semibold"
                          >
                            Map
                          </label>
                          <Autocomplete
                            onLoad={(autocompleteInstance) =>
                              setAutocomplete(autocompleteInstance)
                            }
                            onPlaceChanged={handlePlaceChanged}
                          >
                            <input
                              type="text"
                              placeholder="Search location"
                              className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                            />
                          </Autocomplete>
                          <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            onLoad={onMapLoad}
                          >
                            {markerPosition && (
                              <MarkerF position={markerPosition} />
                            )}
                          </GoogleMap>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2">
                      <BlackButton
                        text="Cancel"
                        onClick={() => {
                          setModal(false);
                        }}
                      />

                      <RedButton text="Add" onClick={addNewCity} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div
                      className="border-b-2 border-b-[#0000001F] text-black text-lg 
                    font-norms font-medium"
                    >
                      Update Country
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <div className="space-y-1">
                        <label
                          htmlFor="name"
                          className="text-black font-switzer font-semibold"
                        >
                          City Name
                        </label>
                        <input
                          value={updateCity?.name}
                          type="text"
                          name="name"
                          id="name"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={(e) =>
                            setUpdateCity({
                              ...updateCity,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="countryId"
                          className="text-black font-switzer font-semibold"
                        >
                          Select Country
                        </label>
                        <Select
                          placeholder="Select"
                          name="countryId"
                          defaultValue={{
                            value: updateCity?.countryId,
                            label: updateCity?.countryName,
                          }}
                          options={countryOptions}
                          onChange={(e) =>
                            setUpdateCity({
                              ...updateCity,
                              countryId: e?.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      {isLoaded && (
                        <div className="relative space-y-1">
                          <label
                            htmlFor="name"
                            className="text-black font-switzer font-semibold"
                          >
                            Map
                          </label>
                          <Autocomplete
                            onLoad={(autocompleteInstance) =>
                              setAutocomplete(autocompleteInstance)
                            }
                            onPlaceChanged={handlePlaceChanged}
                          >
                            <input
                              type="text"
                              placeholder="Search location"
                              className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                            />
                          </Autocomplete>
                          <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            onLoad={onMapLoad}
                          >
                            {markerPosition && (
                              <MarkerF position={markerPosition} />
                            )}
                          </GoogleMap>
                        </div>
                      )}
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
