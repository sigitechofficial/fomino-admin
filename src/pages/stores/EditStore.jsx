import React, { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../../components/Layout";
import "react-phone-input-2/lib/style.css";
import Loader, { MiniLoader } from "../../components/Loader";
import { BlackButton, TabButton } from "../../utilities/Buttons";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import GetAPI from "../../utilities/GetAPI";
import { PostAPI } from "../../utilities/PostAPI";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BASE_URL } from "../../utilities/URL";
import { PutAPI } from "../../utilities/PutAPI";
import Switch from "react-switch";
import dayjs from "dayjs";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import Helment from "../../components/Helment";
import MyDataTable from "../../components/MyDataTable";

export default function EditStore() {
  const location = useLocation();
  const { data, reFetch } = GetAPI(
    `admin/getmetadatarestaurant/${location?.state?.resId}`
  );
  console.log("🚀 ~ EditStore ~ data:", data);
  const deliveryType = GetAPI("admin/activedeliverytype");
  const [tab, setTab] = useState("General");
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 31.5204, lng: 74.3587 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCYC3-gTg2XJFIeo9fura6PoNuQzzPeBlc",
    libraries,
  });
  const containerStyle = {
    width: "100%",
    height: "350px",
  };

  const [general, setGeneral] = useState({
    id: "",
    businessName: "",
    businessEmail: "",
    description: "",
    countryCode: "+92",
    phoneNum: "",
    certificateCode: "",
    logo: "",
    coverImage: "",
    openingTime: "",
    closingTime: "",
  });
  const [deliveryData, setDeliveryData] = useState({
    deliveryTypeId: "",
    deliveryFeeTypeId: "",
    deliveryFeeFixed: "0.00",
    baseCharge: "0.00",
    baseDistance: "0.00",
    chargePerExtraUnit: "0.00",
    extraUnitDistance: "0.00",
    restaurantId: "",
    id: "",
  });
  const [metaData, setMetaData] = useState({
    id: "",
    address: "",
    approxDeliveryTime: "",
    city: "",
    deliveryRadius: "",
    isFeatured: false,
    isPureVeg: false,
    lat: "",
    lng: "",
    zipCode: "",
  });
  const [chargesData, setChargesData] = useState({
    minOrderAmount: "",
    packingFee: "",
    comission: "",
    pricesIncludeVAT: "",
    VATpercent: "",
    id: "",
  });
  const [bankData, setBankData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    bankName: "",
    accountHolderName: "",
    accountNo: "",
    IBAN: "",
    swiftCode: "",
    bankAddress: "",
    bankCountry: "",
    streetAddress: "",
    zip: "",
    city: "",
    country: "",
  });

  const deliveryTypeOptions = [];
  deliveryType?.data?.data?.map((del, ind) => {
    deliveryTypeOptions.push({
      value: del?.id,
      label: del?.name,
    });
  });

  const deliveryFeeOptions = [
    { value: 1, label: "Static" },
    { value: 2, label: "Dynamic" },
  ];

  const priceOptions = [
    { value: 1, label: "True" },
    { value: 2, label: "False" },
  ];

  const handleOnEventChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = () => {
      if (data && data?.data) {
        setDeliveryData({
          deliveryTypeId: data?.data?.deliveryData?.deliveryTypeId,
          deliveryFeeTypeId: data?.data?.deliveryData?.deliveryFeeTypeId,
          deliveryFeeFixed: data?.data?.deliveryData?.deliveryFeeFixed,
          baseCharge: data?.data?.deliveryData?.deliveryFeeValues?.baseCharge,
          baseDistance:
            data?.data?.deliveryData?.deliveryFeeValues?.baseDistance,
          chargePerExtraUnit:
            data?.data?.deliveryData?.deliveryFeeValues?.chargePerExtraUnit,
          extraUnitDistance:
            data?.data?.deliveryData?.deliveryFeeValues?.extraUnitDistance,
        });
        setGeneral({
          id: location?.state?.resId,
          businessName: data?.data?.general?.businessName,
          businessEmail: data?.data?.general?.businessEmail,
          description: data?.data?.general?.description,
          countryCode: data?.data?.general?.countryCode,
          phoneNum: data?.data?.general?.phoneNum,
          certificateCode: data?.data?.general?.certificateCode,
          logo: data?.data?.general?.logo,
          coverImage: data?.data?.general?.coverImage,
          openingTime: data?.data?.general?.openingTime,
          closingTime: data?.data?.general?.closingTime,
        });
        setMetaData({
          id: location?.state?.resId,
          address: data?.data?.metaData?.address,
          approxDeliveryTime: data?.data?.metaData?.approxDeliveryTime,
          city: data?.data?.metaData?.city,
          deliveryRadius: data?.data?.metaData?.deliveryRadius,
          isFeatured: data?.data?.metaData?.isFeatured,
          isPureVeg: data?.data?.metaData?.isPureVeg,
          lat: data?.data?.metaData?.lat,
          lng: data?.data?.metaData?.lng,
          zipCode: data?.data?.metaData?.zipCode,
        });
        setCenter({
          lat: parseFloat(data?.data?.metaData?.lat),
          lng: parseFloat(data?.data?.metaData?.lng),
        });
        setMarkerPosition({
          lat: parseFloat(data?.data?.metaData?.lat),
          lng: parseFloat(data?.data?.metaData?.lng),
        });

        setChargesData({
          id: location?.state?.resId,
          minOrderAmount: data?.data?.charges?.minOrderAmount,
          packingFee: data?.data?.charges?.packingFee,
          comission: data?.data?.charges?.comission,
          pricesIncludeVAT: data?.data?.charges?.pricesIncludeVAT,
          VATpercent: data?.data?.charges?.VATpercent,
        });
        setBankData({
          id: data?.data?.bankDetails?.bankDetails?.id,
          firstName: data?.data?.bankDetails?.bankDetails?.firstName,
          lastName: data?.data?.bankDetails?.bankDetails?.lastName,
          bankName: data?.data?.bankDetails?.bankDetails?.bankName,
          accountHolderName:
            data?.data?.bankDetails?.bankDetails?.accountHolderName,
          accountNo: data?.data?.bankDetails?.bankDetails?.accountNo,
          IBAN: data?.data?.bankDetails?.bankDetails?.IBAN,
          swiftCode: data?.data?.bankDetails?.bankDetails?.swiftCode,
          bankAddress: data?.data?.bankDetails?.bankDetails?.bankAddress,
          bankCountry: data?.data?.bankDetails?.bankDetails?.bankCountry,
          streetAddress: data?.data?.bankDetails?.bankDetails?.streetAddress,
          zip: data?.data?.bankDetails?.bankDetails?.zip,
          city: data?.data?.bankDetails?.bankDetails?.city,
          country: data?.data?.bankDetails?.bankDetails?.country,
        });
      }
    };
    fetchData();
  }, [data, location?.state?.resId]);

  const handleGeneralEventChange = (e) => {
    setGeneral({ ...general, [e.target.name]: e.target.value });
  };

  const handleMetaEventChange = (e) => {
    setMetaData({ ...metaData, [e.target.name]: e.target.value });
  };

  const handleChargeEventChange = (e) => {
    setChargesData({ ...chargesData, [e.target.name]: e.target.value });
  };

  const handleBankEventChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file && type === "Cover Image") {
      const imageUrl = URL.createObjectURL(file);
      setGeneral({
        ...general,
        coverImage: file,
        coverImageShow: imageUrl,
      });
    }
    if (file && type === "Logo Image") {
      const imageUrl = URL.createObjectURL(file);
      setGeneral({
        ...general,
        logo: file,
        logoShow: imageUrl,
      });
    }
  };

  const updateGeneralData = async () => {
    setLoader(true);
    let res = await PutAPI("admin/editrestaurantgeneral", {
      id: general?.id,
      businessName: general?.businessName,
      businessEmail: general?.businessEmail,
      description: general?.description,
      countryCode: general?.countryCode,
      phoneNum: general?.phoneNum,
      certificateCode: general?.certificateCode,
      openingTime: general?.openingTime,
      closingTime: general?.closingTime,
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

  const updateMetaData = async () => {
    setLoader(true);
    let res = await PutAPI("admin/editrestaurantmetadata", {
      id: metaData?.id,
      address: metaData?.address,
      approxDeliveryTime: metaData?.approxDeliveryTime,
      city: metaData?.city,
      deliveryRadius: metaData?.deliveryRadius,
      isFeatured: metaData?.isFeatured,
      isPureVeg: metaData?.isPureVeg,
      lat: center?.lat,
      lng: center?.lng,
      zipCode: metaData?.zipCode,
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

  const updateChargesData = async () => {
    setLoader(true);
    let res = await PutAPI("admin/editrestaurantcharges", {
      id: chargesData?.id,
      minOrderAmount: chargesData?.minOrderAmount,
      packingFee: chargesData?.packingFee,
      comission: chargesData?.comission,
      pricesIncludeVAT: chargesData?.pricesIncludeVAT,
      VATpercent: chargesData?.VATpercent,
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

  const updateBankData = async () => {
    setLoader(true);
    const res = await PostAPI("admin/updateDirector", {
      id: bankData?.id,
      firstName: bankData?.firstName,
      lastName: bankData?.lastName,
      bankName: bankData?.bankName,
      accountHolderName: bankData?.accountHolderName,
      accountNo: bankData?.accountNo,
      IBAN: bankData?.IBAN,
      swiftCode: bankData?.swiftCode,
      bankAddress: bankData?.bankAddress,
      bankCountry: bankData?.bankCountry,
      streetAddress: bankData?.streetAddress,
      zip: bankData?.zip,
      city: bankData?.city,
      country: bankData?.country,
    });
    if (res?.data?.status === "1") {
      success_toaster(res?.data?.message);
      reFetch();
      setLoader(false);
    } else {
      error_toaster(res?.data?.message);
      setLoader(false);
    }
  };

  const updateDelivery = async () => {
    setLoader(true);
    const res = await PostAPI("admin/editrestaurantdeliverysettings", {
      deliveryTypeId: deliveryData?.deliveryTypeId,
      deliveryFeeTypeId: deliveryData?.deliveryFeeTypeId,
      deliveryFeeFixed: deliveryData?.deliveryFeeFixed,
      baseCharge: deliveryData?.baseCharge,
      baseDistance: deliveryData?.baseDistance,
      chargePerExtraUnit: deliveryData?.chargePerExtraUnit,
      extraUnitDistance: deliveryData?.extraUnitDistance,
      restaurantId: location?.state?.resId,
      id: location?.state?.resId,
    });
    if (res?.data?.status === "1") {
      success_toaster(res?.data?.message);
      reFetch();
      setLoader(false);
    } else {
      error_toaster(res?.data?.message);
      setLoader(false);
    }
  };

  const onMapLoad = useCallback((map) => {
    setMap(map);
    map.setOptions({ draggableCursor: "crosshair" });
  }, []);

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });
        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        map.panTo(location);
        map.setZoom(15);
        const address = place.formatted_address;
        setMetaData({ ...metaData, address });
      }
    }
  };

  const handleSwitchChange = (checked, name) => {
    setMetaData({ ...metaData, [name]: checked });
  };

  const menuData = () => {
    return data?.data?.menuSetting?.rmc?.map((category) => {
      const searches = search[category.menuCategory.name] || "";
      return {
        ...category,
        R_PLinks: category.R_PLinks.filter((link) => {
          return (
            search === "" ||
            (link.id && link.id.toString().includes(searches.toLowerCase())) ||
            (link.name &&
              link.name.toLowerCase().includes(searches.toLowerCase()))
          );
        }),
      };
    });
  };

  const handleSearchChange = (categoryName, value) => {
    setSearch({
      ...search,
      [categoryName]: value,
    });
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
  ];

  const datas = menuData()?.map((category, catIndex) => ({
    header: category.menuCategory.name,
    data: category.R_PLinks.map((val, ind) => ({
      sn: ind + 1,
      id: val?.id,
      name: val?.name,
      image: (
        <div>
          <img
            src={`${BASE_URL}${val?.image}`}
            alt="image"
            className="w-24 h-24"
          />
        </div>
      ),
    })),
  }));

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="bg-themeGray p-5">
          <div className="bg-white rounded-lg p-5">
            <div className="flex gap-5 items-center">
              <button
                className="bg-themeGray p-2 rounded-full"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft />
              </button>
              <h2 className="text-themeRed text-lg font-bold font-norms">
                {tab === "General" ? (
                  "General"
                ) : tab === "Meta Data" ? (
                  "Meta Data"
                ) : tab === "Charges Setting" ? (
                  "Charges Setting"
                ) : tab === "Inventory" ? (
                  "Inventory"
                ) : tab === "Delivery" ? (
                  "Delivery"
                ) : tab === "Bank Details" ? (
                  "Bank Details"
                ) : (
                  <></>
                )}
              </h2>
            </div>

            <div className="py-5 space-y-1.5">
              <ul className="flex flex-wrap items-center gap-8">
                <TabButton
                  title="General"
                  tab={tab}
                  onClick={() => setTab("General")}
                />
                <TabButton
                  title="Meta Data"
                  tab={tab}
                  onClick={() => setTab("Meta Data")}
                />
                <TabButton
                  title="Delivery"
                  tab={tab}
                  onClick={() => setTab("Delivery")}
                />
                <TabButton
                  title="Charges Setting"
                  tab={tab}
                  onClick={() => setTab("Charges Setting")}
                />
                <TabButton
                  title="Inventory"
                  tab={tab}
                  onClick={() => setTab("Inventory")}
                />
                <TabButton
                  title="Bank Details"
                  tab={tab}
                  onClick={() => setTab("Bank Details")}
                />
              </ul>
              <div className={`w-full bg-[#00000033] h-[1px]`}></div>

              {tab === "General" ? (
                loader ? (
                  <MiniLoader />
                ) : (
                  <div className="space-y-3 pt-4">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label
                          htmlFor="businessName"
                          className="text-black font-switzer font-semibold"
                        >
                          Business Name
                        </label>
                        <input
                          value={general?.businessName}
                          type="text"
                          name="businessName"
                          id="businessName"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleGeneralEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="businessEmail"
                          className="text-black font-switzer font-semibold"
                        >
                          Business Email
                        </label>
                        <input
                          value={general?.businessEmail}
                          type="email"
                          name="businessEmail"
                          id="businessEmail"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleGeneralEventChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <div>
                          <img
                            src={
                              general?.coverImageShow
                                ? general?.coverImageShow
                                : `${BASE_URL}${general?.coverImage}`
                            }
                            alt="Cover Image"
                            className="w-24 h-24"
                          />
                        </div>
                        <div className="space-y-1">
                          <label
                            htmlFor="coverImage"
                            className="text-black font-switzer font-semibold"
                          >
                            Cover Image
                          </label>

                          <input
                            type="file"
                            id="coverImage"
                            name="coverImage"
                            className="bg-themeInput w-full h-10 px-3 py-1 rounded-md outline-none"
                            onChange={(e) => {
                              handleImageChange(e, "Cover Image");
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <img
                          src={
                            general?.logoShow
                              ? general?.logoShow
                              : `${BASE_URL}${general?.logo}`
                          }
                          alt="Logo"
                          className="w-24 h-24"
                        />

                        <div className="space-y-1">
                          <label
                            htmlFor="logo"
                            className="text-black font-switzer font-semibold"
                          >
                            Logo
                          </label>

                          <input
                            type="file"
                            id="logo"
                            name="logo"
                            className="bg-themeInput w-full h-10 px-3 py-1 rounded-md outline-none"
                            onChange={(e) => {
                              handleImageChange(e, "Logo Image");
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="description"
                          className="text-black font-switzer font-semibold"
                        >
                          Description
                        </label>
                        <input
                          value={general?.description}
                          type="text"
                          name="description"
                          id="description"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleGeneralEventChange}
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
                              value={general?.countryCode}
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
                                setGeneral({ ...general, countryCode: code })
                              }
                            />
                          </div>
                          <div className="col-span-4">
                            <input
                              value={general?.phoneNum}
                              onChange={handleGeneralEventChange}
                              type="number"
                              name="phoneNum"
                              className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="openingTime "
                          className="text-black font-switzer font-semibold"
                        >
                          Opening Time
                        </label>
                        <input
                          value={dayjs(general?.openingTime).format(
                            "YYYY-MM-DDTHH:mm"
                          )}
                          type="datetime-local"
                          name="openingTime"
                          id="openingTime"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleGeneralEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="closingTime "
                          className="text-black font-switzer font-semibold"
                        >
                          Closing Time
                        </label>
                        <input
                          value={dayjs(general?.closingTime).format(
                            "YYYY-MM-DDTHH:mm"
                          )}
                          type="datetime-local"
                          name="closingTime"
                          id="closingTime"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleGeneralEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="certificateCode "
                          className="text-black font-switzer font-semibold"
                        >
                          Certificate Code
                        </label>
                        <input
                          value={general?.certificateCode}
                          type="number"
                          name="certificateCode"
                          id="certificateCode"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleGeneralEventChange}
                        />
                      </div>

                      <div className="flex items-center gap-2 col-span-2 justify-end">
                        <BlackButton
                          text="Update"
                          onClick={updateGeneralData}
                        />
                      </div>
                    </div>
                  </div>
                )
              ) : tab === "Meta Data" ? (
                loader ? (
                  <MiniLoader />
                ) : (
                  <div className="space-y-5 pt-4">
                    <div className="grid grid-cols-2 gap-10">
                      <div>
                        {isLoaded && (
                          <div className="relative space-y-1">
                            <label
                              htmlFor="name"
                              className="text-black font-switzer font-semibold"
                            >
                              Address
                            </label>
                            <Autocomplete
                              onLoad={(autocompleteInstance) =>
                                setAutocomplete(autocompleteInstance)
                              }
                              onPlaceChanged={handlePlaceChanged}
                            >
                              <input
                                defaultValue={metaData?.address}
                                type="search"
                                placeholder="Search location"
                                className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                              />
                            </Autocomplete>
                            <GoogleMap
                              mapContainerStyle={containerStyle}
                              center={center}
                              zoom={15}
                              onLoad={onMapLoad}
                            >
                              {markerPosition && (
                                <MarkerF position={markerPosition} />
                              )}
                            </GoogleMap>
                          </div>
                        )}
                      </div>

                      <div className="space-y-5">
                        <div className="space-y-1">
                          <label
                            htmlFor="city"
                            className="text-black font-switzer font-semibold"
                          >
                            City
                          </label>
                          <input
                            value={metaData?.city}
                            type="text"
                            name="city"
                            id="city"
                            className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                            onChange={handleMetaEventChange}
                          />
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="zipCode"
                            className="text-black font-switzer font-semibold"
                          >
                            Zip
                          </label>
                          <input
                            value={metaData?.zipCode}
                            type="number"
                            name="zipCode"
                            id="zipCode"
                            className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                            onChange={handleMetaEventChange}
                          />
                        </div>

                        <div className="space-y-1 relative">
                          <label
                            htmlFor="deliveryRadius"
                            className="text-black font-switzer font-semibold"
                          >
                            Delivery Radius
                          </label>
                          <input
                            value={metaData?.deliveryRadius}
                            type="number"
                            name="deliveryRadius"
                            id="deliveryRadius"
                            className="bg-themeInput w-full h-10 pl-24 rounded-md outline-none"
                            onChange={handleMetaEventChange}
                          />
                          <div className="bg-[#B9B7B7] h-10 px-3 w-20 flex justify-center items-center rounded-md absolute top-6 left-0">
                            Miles
                          </div>
                        </div>

                        <div className="space-y-1 relative">
                          <label
                            htmlFor="approxDeliveryTime"
                            className="text-black font-switzer font-semibold"
                          >
                            Delivery Time
                          </label>
                          <input
                            value={metaData?.approxDeliveryTime}
                            type="number"
                            name="approxDeliveryTime"
                            id="approxDeliveryTime"
                            className="bg-themeInput w-full h-10 pl-24 rounded-md outline-none"
                            onChange={handleMetaEventChange}
                          />
                          <div className="bg-[#B9B7B7] h-10 px-3 w-20 flex justify-center items-center rounded-md absolute top-6 left-0">
                            Min
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <label
                            htmlFor="pure"
                            className="text-black font-switzer font-semibold"
                          >
                            Pure Vegetarian
                          </label>
                          <Switch
                            checked={metaData?.isPureVeg}
                            onChange={(checked) =>
                              handleSwitchChange(checked, "isPureVeg")
                            }
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#4e73df"
                            onHandleColor="#fff"
                            className="react-switch"
                            boxShadow="none"
                            width={36}
                            height={20}
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <label
                            htmlFor="pure"
                            className="text-black font-switzer font-semibold"
                          >
                            Featured
                          </label>
                          <Switch
                            checked={metaData?.isFeatured}
                            onChange={(checked) =>
                              handleSwitchChange(checked, "isFeatured")
                            }
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#4e73df"
                            onHandleColor="#fff"
                            className="react-switch"
                            boxShadow="none"
                            width={36}
                            height={20}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 justify-end">
                      <BlackButton text="Update" onClick={updateMetaData} />
                    </div>
                  </div>
                )
              ) : tab === "Charges Setting" ? (
                loader ? (
                  <MiniLoader />
                ) : (
                  <div className="space-y-5 pt-4">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1 relative">
                        <label
                          htmlFor="minOrderAmount"
                          className="text-black font-switzer font-semibold"
                        >
                          Minimum Order Amount
                        </label>
                        <input
                          value={chargesData?.minOrderAmount}
                          type="number"
                          name="minOrderAmount"
                          id="minOrderAmount"
                          className="bg-themeInput w-full h-10 pl-24 rounded-md outline-none"
                          onChange={handleChargeEventChange}
                        />
                        <div className="bg-[#B9B7B7] h-10 px-3 w-20 flex justify-center items-center rounded-md absolute top-6 left-0">
                          Unit
                        </div>
                      </div>

                      <div className="space-y-1 relative">
                        <label
                          htmlFor="packingFee"
                          className="text-black font-switzer font-semibold"
                        >
                          Packing Fee
                        </label>
                        <input
                          value={chargesData?.packingFee}
                          type="number"
                          name="packingFee"
                          id="packingFee"
                          className="bg-themeInput w-full h-10 pl-24 rounded-md outline-none"
                          onChange={handleChargeEventChange}
                        />
                        <div className="bg-[#B9B7B7] h-10 px-3 w-20 flex justify-center items-center rounded-md absolute top-6 left-0">
                          Unit
                        </div>
                      </div>

                      <div className="space-y-1 relative">
                        <label
                          htmlFor="comission"
                          className="text-black font-switzer font-semibold"
                        >
                          Commission
                        </label>
                        <input
                          value={chargesData?.comission}
                          type="number"
                          name="comission"
                          id="comission"
                          className="bg-themeInput w-full h-10 pl-24 rounded-md outline-none"
                          onChange={handleChargeEventChange}
                        />
                        <div className="bg-[#B9B7B7] h-10 px-3 w-20 flex justify-center items-center rounded-md absolute top-6 left-0">
                          %
                        </div>
                      </div>

                      <div className="space-y-1 relative">
                        <label
                          htmlFor="VATpercent"
                          className="text-black font-switzer font-semibold"
                        >
                          VAT Percent
                        </label>
                        <input
                          value={chargesData?.VATpercent}
                          type="number"
                          name="VATpercent"
                          id="VATpercent"
                          className="bg-themeInput w-full h-10 pl-24 rounded-md outline-none"
                          onChange={handleChargeEventChange}
                        />
                        <div className="bg-[#B9B7B7] h-10 px-3 w-20 flex justify-center items-center rounded-md absolute top-6 left-0">
                          %
                        </div>
                      </div>

                      <div className="space-y-1 relative">
                        <label
                          htmlFor="pricesIncludeVAT"
                          className="text-black font-switzer font-semibold"
                        >
                          Price Included VAT
                        </label>
                        <Select
                          placeholder="Select"
                          defaultValue={{
                            value:
                              data?.data?.charges?.pricesIncludeVAT === true
                                ? 1
                                : 2,
                            label:
                              data?.data?.charges?.pricesIncludeVAT === true
                                ? "True"
                                : "False",
                          }}
                          name="pricesIncludeVAT"
                          options={priceOptions}
                          onChange={(e) =>
                            setChargesData({
                              ...chargesData,
                              pricesIncludeVAT:
                                e?.label === "True" ? true : false,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 justify-end">
                      <BlackButton text="Update" onClick={updateChargesData} />
                    </div>
                  </div>
                )
              ) : tab === "Menu Settings" ? (
                loader ? (
                  <MiniLoader />
                ) : (
                  <div className="space-y-5">
                    {datas?.map((categoryData, index) => (
                      <>
                        <div key={index} className="space-y-5 mt-5">
                          <h2 className="text-2xl font-semibold">
                            {categoryData.header}
                          </h2>
                          <Helment
                            search={true}
                            csvdata={categoryData?.data}
                            searchOnChange={(e) =>
                              handleSearchChange(
                                categoryData.header,
                                e.target.value
                              )
                            }
                            searchValue={search[categoryData.header] || ""}
                          />

                          <MyDataTable
                            columns={columns}
                            data={categoryData?.data}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                )
              ) : tab === "Bank Details" ? (
                loader ? (
                  <MiniLoader />
                ) : (
                  <div className="space-y-3 pt-4">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label
                          htmlFor="firstName"
                          className="text-black font-switzer font-semibold"
                        >
                          First Name
                        </label>
                        <input
                          value={bankData?.firstName}
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
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
                          value={bankData?.lastName}
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="bankName"
                          className="text-black font-switzer font-semibold"
                        >
                          Bank Name
                        </label>
                        <input
                          value={bankData?.bankName}
                          type="text"
                          name="bankName"
                          id="bankName"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="accountHolderName"
                          className="text-black font-switzer font-semibold"
                        >
                          Account Holder Name
                        </label>
                        <input
                          value={bankData?.accountHolderName}
                          type="text"
                          name="accountHolderName"
                          id="accountHolderName"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="accountNo"
                          className="text-black font-switzer font-semibold"
                        >
                          Account Number
                        </label>
                        <input
                          value={bankData?.accountNo}
                          type="text"
                          name="accountNo"
                          id="accountNo"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="IBAN"
                          className="text-black font-switzer font-semibold"
                        >
                          IBAN
                        </label>
                        <input
                          value={bankData?.IBAN}
                          type="text"
                          name="IBAN"
                          id="IBAN"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="swiftCode"
                          className="text-black font-switzer font-semibold"
                        >
                          Swift Code
                        </label>
                        <input
                          value={bankData?.swiftCode}
                          type="text"
                          name="swiftCode"
                          id="swiftCode"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="bankAddress"
                          className="text-black font-switzer font-semibold"
                        >
                          Bank Address
                        </label>
                        <input
                          value={bankData?.bankAddress}
                          type="text"
                          name="bankAddress"
                          id="bankAddress"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="streetAddress"
                          className="text-black font-switzer font-semibold"
                        >
                          Street Address
                        </label>
                        <input
                          value={bankData?.streetAddress}
                          type="text"
                          name="streetAddress"
                          id="streetAddress"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="city"
                          className="text-black font-switzer font-semibold"
                        >
                          City
                        </label>
                        <input
                          value={bankData?.city}
                          type="text"
                          name="city"
                          id="city"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="zip"
                          className="text-black font-switzer font-semibold"
                        >
                          Zip Code
                        </label>
                        <input
                          value={bankData?.zip}
                          type="number"
                          name="zip"
                          id="zip"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="bankCountry"
                          className="text-black font-switzer font-semibold"
                        >
                          Bank Country
                        </label>
                        <input
                          value={bankData?.bankCountry}
                          type="text"
                          name="bankCountry"
                          id="bankCountry"
                          className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                          onChange={handleBankEventChange}
                        />
                      </div>

                      <div className="flex items-center gap-2 col-span-2 justify-end">
                        <BlackButton text="Update" onClick={updateBankData} />
                      </div>
                    </div>
                  </div>
                )
              ) : tab === "Delivery" ? (
                loader ? (
                  <MiniLoader />
                ) : (
                  <div className="space-y-3 pt-4">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label
                          htmlFor="deliveryTypeId"
                          className="text-black font-switzer font-semibold"
                        >
                          Delivery Type Name
                        </label>
                        <Select
                          placeholder="Select"
                          defaultValue={{
                            value: data?.data?.deliveryData?.deliveryTypeId,
                            label: data?.data?.deliveryData?.deliveryTypeName,
                          }}
                          name="deliveryTypeId"
                          options={deliveryTypeOptions}
                          onChange={(e) =>
                            setDeliveryData({
                              ...deliveryData,
                              deliveryTypeId: e?.value,
                            })
                          }
                        />
                      </div>

                      {(deliveryData?.deliveryTypeId ||
                        data?.data?.deliveryTypeId) !== 2 && (
                          <>
                            <div className="space-y-1">
                              <label
                                htmlFor="deliveryFeeTypeId"
                                className="text-black font-switzer font-semibold"
                              >
                                Delivery Fee Type Name
                              </label>
                              <Select
                                placeholder="Select"
                                defaultValue={{
                                  value:
                                    data?.data?.deliveryData?.deliveryFeeTypeId,
                                  label:
                                    data?.data?.deliveryData?.deliveryFeeTypeName,
                                }}
                                name="deliveryFeeTypeId"
                                options={deliveryFeeOptions}
                                onChange={(e) =>
                                  setDeliveryData({
                                    ...deliveryData,
                                    deliveryFeeTypeId: e?.value,
                                  })
                                }
                              />
                            </div>

                            {(deliveryData?.deliveryFeeTypeId ||
                              data?.data?.deliveryFeeTypeId) === 1 ? (
                              <div className="space-y-1">
                                <label
                                  htmlFor="deliveryFeeFixed"
                                  className="text-black font-switzer font-semibold"
                                >
                                  Delivery Fee
                                </label>
                                <input
                                  value={deliveryData?.deliveryFeeFixed}
                                  onChange={handleOnEventChange}
                                  type="number"
                                  name="deliveryFeeFixed"
                                  id="deliveryFeeFixed"
                                  className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                                />
                              </div>
                            ) : (
                              <>
                                <div className="grid grid-cols-2 gap-5">
                                  <div className="space-y-1">
                                    <label
                                      htmlFor="baseCharge"
                                      className="text-black font-switzer font-semibold"
                                    >
                                      Base Charges
                                    </label>
                                    <input
                                      value={deliveryData?.baseCharge}
                                      onChange={handleOnEventChange}
                                      type="number"
                                      name="baseCharge"
                                      id="baseCharge"
                                      className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label
                                      htmlFor="baseDistance"
                                      className="text-black font-switzer font-semibold"
                                    >
                                      Base Distance
                                    </label>
                                    <input
                                      value={deliveryData?.baseDistance}
                                      onChange={handleOnEventChange}
                                      type="number"
                                      name="baseDistance"
                                      id="baseDistance"
                                      className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                  <div className="space-y-1">
                                    <label
                                      htmlFor="chargePerExtraUnit"
                                      className="text-black font-switzer font-semibold"
                                    >
                                      Charges per Extra Unit
                                    </label>
                                    <input
                                      value={deliveryData?.chargePerExtraUnit}
                                      onChange={handleOnEventChange}
                                      type="number"
                                      name="chargePerExtraUnit"
                                      id="chargePerExtraUnit"
                                      className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label
                                      htmlFor="extraUnitDistance"
                                      className="text-black font-switzer font-semibold"
                                    >
                                      Extar Unit Distance
                                    </label>
                                    <input
                                      value={deliveryData?.extraUnitDistance}
                                      onChange={handleOnEventChange}
                                      type="number"
                                      name="extraUnitDistance"
                                      id="extraUnitDistance"
                                      className="bg-themeInput w-full h-10 px-3 rounded-md outline-none"
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}

                      <div className="flex items-center gap-2 col-span-2 justify-end">
                        <BlackButton text="Update" onClick={updateDelivery} />
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
}
