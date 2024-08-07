import React, { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../../components/Layout";
import {
  GoogleMap,
  useLoadScript,
  Polygon,
  Autocomplete,
  Polyline,
} from "@react-google-maps/api";
import Select from "react-select";
import GetAPI from "../../utilities/GetAPI";
import RedButton from "../../utilities/Buttons";
import { PostAPI } from "../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { MiniLoader } from "../../components/Loader";
import { useLocation } from "react-router-dom";

export default function UpdateZone() {
  const location = useLocation();
  const zoneDetail = location?.state?.zoneData;
  const allUnits = GetAPI("admin/getallunits");
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 31.5204, lng: 74.3587 });
  const [coordinates, setCoordinates] = useState([]);
  const [closed, setClosed] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [loader, setLoader] = useState(false);
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCYC3-gTg2XJFIeo9fura6PoNuQzzPeBlc",
    libraries,
  });
  const [zoneData, setZoneData] = useState({
    zoneId: "",
    name: zoneDetail?.name,
    baseCharges: zoneDetail?.zoneDetail?.baseCharges,
    baseDistance: zoneDetail?.zoneDetail?.baseDistance,
    perKmCharges: zoneDetail?.zoneDetail?.perKmCharges,
    maxDeliveryCharges: zoneDetail?.zoneDetail?.maxDeliveryCharges,
    adminComission: zoneDetail?.zoneDetail?.adminComission,
    adminComissionOnDeliveryCharges:
      zoneDetail?.zoneDetail?.adminComissionOnDeliveryCharges,
    distanceUnitId: zoneDetail?.zoneDetail?.currencyUnitId,
    currencyUnitId: zoneDetail?.zoneDetail?.distanceUnitId,
    arr: "",
  });

  const handleOnEventChange = (e) => {
    setZoneData({ ...zoneData, [e.target.name]: e.target.value });
  };

  const containerStyle = {
    width: "100%",
    height: "325px",
  };

  const currencyUnitOptions = [];
  allUnits?.data?.data?.currencyUnits?.map((activeUnits, index) =>
    currencyUnitOptions.push({
      value: activeUnits?.id,
      label: `${activeUnits?.name} (${activeUnits?.symbol})`,
    })
  );

  const distanceUnitOptions = [];
  allUnits?.data?.data?.distanceUnits?.map((activeUnits, index) =>
    distanceUnitOptions.push({
      value: activeUnits?.id,
      label: `${activeUnits?.name} (${activeUnits?.symbol})`,
    })
  );

  const onMapLoad = useCallback((map) => {
    setMap(map);
    map.setOptions({ draggableCursor: "crosshair" });
  }, []);

  const onMapClick = useCallback(
    (event) => {
      const newCoord = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      if (coordinates.length > 0 && closePolygon(newCoord, coordinates[0])) {
        setCoordinates([...coordinates, coordinates[0]]);
        setClosed(true);
      } else {
        setCoordinates([...coordinates, newCoord]);
      }
    },
    [coordinates]
  );

  const closePolygon = (coord1, coord2) => {
    const distance = Math.sqrt(
      Math.pow(coord1.lat - coord2.lat, 2) +
      Math.pow(coord1.lng - coord2.lng, 2)
    );
    return distance < 0.001;
  };

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      setCenter(place.geometry.location);
      map.setCenter(place.geometry.location);
      map.setZoom(15);
    }
  };

  useEffect(() => {
    const formattedCoordinates = coordinates.map((coord) => [
      coord.lat,
      coord.lng,
    ]);
    setZoneData((prevZoneData) => ({
      ...prevZoneData,
      arr: formattedCoordinates,
    }));
  }, [coordinates]);

  const updateZone = async () => {
    if (zoneData?.name === "") {
      info_toaster("Please Add Business Zone Name");
    } else if (zoneData?.arr === "") {
      info_toaster("Please Select Coordinates On Map");
    } else if (zoneData?.baseCharges === "") {
      info_toaster("Please Add Base Charges");
    } else if (zoneData?.baseDistance === "") {
      info_toaster("Please Add Base Distance");
    } else if (zoneData?.perKmCharges === "") {
      info_toaster("Please Add Per Km Charges");
    } else if (zoneData?.maxDeliveryCharges === "") {
      info_toaster("Please Add Maximum Delivery Charges");
    } else if (zoneData?.adminComission === "") {
      info_toaster("Please Add Admin Comission");
    } else if (zoneData?.adminComissionOnDeliveryCharges === "") {
      info_toaster("Please Add Admin Comission On Delivery Charges");
    } else if (zoneData?.distanceUnitId === "") {
      info_toaster("Please Select Distance Unit");
    } else if (zoneData?.currencyUnitId === "") {
      info_toaster("Please Select Currency Unit");
    } else {
      setLoader(true);
      const res = await PostAPI("admin/updateZone", {
        zoneId: zoneDetail?.id,
        name: zoneData?.name,
        baseCharges: zoneData?.baseCharges,
        baseDistance: zoneData?.baseDistance,
        perKmCharges: zoneData?.perKmCharges,
        maxDeliveryCharges: zoneData?.maxDeliveryCharges,
        adminComission: zoneData?.adminComission,
        adminComissionOnDeliveryCharges:
          zoneData?.adminComissionOnDeliveryCharges,
        distanceUnitId: zoneData?.distanceUnitId?.value,
        currencyUnitId: zoneData?.currencyUnitId?.value,
        arr: zoneData?.arr,
      });

      if (res?.data?.status === "1") {
        success_toaster(res?.data?.message);
        setLoader(false);
        setZoneData({
          name: "",
          baseCharges: "",
          baseDistance: "",
          perKmCharges: "",
          maxDeliveryCharges: "",
          adminComission: "",
          adminComissionOnDeliveryCharges: "",
          distanceUnitId: "",
          currencyUnitId: "",
          arr: "",
        });
      } else {
        error_toaster(res?.data?.message);
        setLoader(false);
      }
    }
  };

  return (
    <Layout
      content={
        <div className="bg-themeGray p-5">
          <div className="bg-white rounded-lg p-5 space-y-10">
            <div className="flex gap-5 items-center">
              <button
                className="bg-themeGray p-2 rounded-full"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft />
              </button>
              <div className="flex flex-col">
                <h2 className="text-themeRed text-lg font-bold font-norms">
                  Update Zone
                </h2>
              </div>
            </div>

            {loader ? (
              <MiniLoader />
            ) : (
              <div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-black font-switzer font-semibold"
                    >
                      Business Zone Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-themeInput w-full h-10 px-3 rounded-md outline-none placeholder:font-switzer  placeholder:text-themeBorderGray"
                      placeholder="Write a new business zone name"
                      onChange={handleOnEventChange}
                      value={zoneData?.name}
                    />
                  </div>

                  <div>
                    <div className="space-y-2">
                      <div className="text-black font-switzer font-semibold">
                        Map
                      </div>
                      {isLoaded && (
                        <div className="mt-4 relative">
                          <Autocomplete
                            onLoad={setAutocomplete}
                            onPlaceChanged={handlePlaceChanged}
                          >
                            <input
                              type="text"
                              placeholder="Search location"
                              style={{ width: 400, height: 40, paddingLeft: 8 }}
                              className="absolute top-4 bg-white left-1/2 -translate-x-1/2 z-30 rounded-md"
                            />
                          </Autocomplete>
                          <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            onLoad={onMapLoad}
                            onClick={onMapClick}
                          >
                            {!closed && coordinates.length > 1 && (
                              <Polyline
                                path={coordinates}
                                options={{
                                  strokeColor: "#FF0000",
                                  strokeOpacity: 0.8,
                                  strokeWeight: 2,
                                }}
                              />
                            )}
                            {closed && (
                              <Polygon
                                paths={coordinates}
                                options={{
                                  fillColor: "#FF0000",
                                  fillOpacity: 0.4,
                                  strokeColor: "#FF0000",
                                  strokeOpacity: 0.8,
                                  strokeWeight: 2,
                                }}
                              />
                            )}
                          </GoogleMap>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="baseCharges"
                        className="text-black font-switzer font-semibold"
                      >
                        Base Charges
                      </label>
                      <input
                        type="number"
                        name="baseCharges"
                        id="baseCharges"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none placeholder:font-switzer  placeholder:text-themeBorderGray"
                        placeholder="10"
                        onChange={handleOnEventChange}
                        value={zoneData?.baseCharges}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="baseDistance"
                        className="text-black font-switzer font-semibold"
                      >
                        Base Distance
                      </label>
                      <input
                        type="text"
                        name="baseDistance"
                        id="baseDistance"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none placeholder:font-switzer  placeholder:text-themeBorderGray"
                        placeholder="10"
                        onChange={handleOnEventChange}
                        value={zoneData?.baseDistance}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="perKmCharges"
                        className="text-black font-switzer font-semibold"
                      >
                        Per km delivery charge ($)
                      </label>
                      <input
                        type="number"
                        name="perKmCharges"
                        id="perKmCharges"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none placeholder:font-switzer  placeholder:text-themeBorderGray"
                        placeholder="10"
                        onChange={handleOnEventChange}
                        value={zoneData?.perKmCharges}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="maxDeliveryCharges"
                        className="text-black font-switzer font-semibold"
                      >
                        Maximum delivery charge ($)
                      </label>
                      <input
                        type="text"
                        name="maxDeliveryCharges"
                        id="maxDeliveryCharges"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none placeholder:font-switzer  placeholder:text-themeBorderGray"
                        placeholder="10"
                        onChange={handleOnEventChange}
                        value={zoneData?.maxDeliveryCharges}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="adminComission"
                        className="text-black font-switzer font-semibold"
                      >
                        Admin Comission
                      </label>
                      <input
                        type="number"
                        name="adminComission"
                        id="adminComission"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none placeholder:font-switzer  placeholder:text-themeBorderGray"
                        placeholder="10"
                        onChange={handleOnEventChange}
                        value={zoneData?.adminComission}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="adminComissionOnDeliveryCharges"
                        className="text-black font-switzer font-semibold"
                      >
                        Admin Comission On Delivery Charges
                      </label>
                      <input
                        type="text"
                        name="adminComissionOnDeliveryCharges"
                        id="adminComissionOnDeliveryCharges"
                        className="bg-themeInput w-full h-10 px-3 rounded-md outline-none placeholder:font-switzer placeholder:text-themeBorderGray"
                        placeholder="10"
                        onChange={handleOnEventChange}
                        value={zoneData?.adminComissionOnDeliveryCharges}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="distanceUnitId"
                        className="text-black font-switzer font-semibold"
                      >
                        Select Distance Unit
                      </label>
                      <Select
                        placeholder="Select"
                        name="distanceUnitId"
                        options={distanceUnitOptions}
                        onChange={(e) =>
                          setZoneData({ ...zoneData, distanceUnitId: e?.value })
                        }
                        value={zoneData?.distanceUnitId}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="currencyUnitId"
                        className="text-black font-switzer font-semibold"
                      >
                        Select Currency Unit
                      </label>
                      <Select
                        placeholder="Select"
                        name="currencyUnitId"
                        options={currencyUnitOptions}
                        onChange={(e) =>
                          setZoneData({ ...zoneData, currencyUnitId: e?.value })
                        }
                        value={zoneData?.currencyUnitId}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-5">
                  <RedButton text="Update" onClick={updateZone} />
                </div>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
