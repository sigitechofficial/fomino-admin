import React, { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../../components/Layout";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  DrawingManager,
} from "@react-google-maps/api";
import Select from "react-select";
import GetAPI from "../../utilities/GetAPI";
import RedButton from "../../utilities/Buttons";
import { PostAPI } from "../../utilities/PostAPI";
import { RxCross2 } from "react-icons/rx";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { MiniLoader } from "../../components/Loader";
import { LiaHandPointerSolid } from "react-icons/lia";
import { TbLassoPolygon } from "react-icons/tb";

const libraries = ["places", "drawing"];
const containerStyle = {
  width: "100%",
  height: "325px",
};

export default function AddNewZone() {
  const allUnits = GetAPI("admin/getallunits");
  const [loader, setLoader] = useState(false);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 31.5204, lng: 74.3587 });
  const [coordinates, setCoordinates] = useState([]);
  console.log("🚀 ~ AddNewZone ~ coordinates:", coordinates)
  const [closed, setClosed] = useState(false);
  const [drawingMode, setDrawingMode] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCYC3-gTg2XJFIeo9fura6PoNuQzzPeBlc",
    libraries,
  });
  const [zoneData, setZoneData] = useState({
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
  const handleOnEventChange = (e) => {
    setZoneData({ ...zoneData, [e.target.name]: e.target.value });
  };
  const currencyUnitOptions = allUnits?.data?.data?.currencyUnits?.map(
    (activeUnits) => ({
      value: activeUnits?.id,
      label: `${activeUnits?.name} (${activeUnits?.symbol})`,
    })
  );
  const distanceUnitOptions = allUnits?.data?.data?.distanceUnits?.map(
    (activeUnits) => ({
      value: activeUnits?.id,
      label: `${activeUnits?.name} (${activeUnits?.symbol})`,
    })
  );
  const onMapLoad = useCallback((map) => {
    setMap(map);
    map.setOptions({ draggableCursor: "grab" });
  }, []);

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      setCenter({ lat: location.lat(), lng: location.lng() });
      map.setCenter(location);
      map.setZoom(10);
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

  const addNewZone = async () => {
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
      const res = await PostAPI("admin/addZone", {
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
        setCoordinates([]);
        setClosed(false);
      } else {
        error_toaster(res?.data?.message);
        setLoader(false);
      }
    }
  };

  const onPolygonComplete = (polygon) => {
    const path = polygon.getPath();
    const coordinatesArray = [];
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coordinatesArray.push({ lat: point.lat(), lng: point.lng() });
    }
    setCoordinates((prevCoordinates) => [...prevCoordinates, coordinatesArray]);
    setDrawingMode(null);
  };

  const clearPolygons = () => {
    setCoordinates([]);
    map.setOptions({ draggableCursor: "pointer" });
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
                  Add Zone
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
                            <div className="flex items-center absolute top-4 left-1/2 -translate-x-1/2 z-30 space-x-1">
                              <button
                                onClick={() => {
                                  setDrawingMode(null);
                                  map.setOptions({ draggableCursor: "grab" });
                                }}
                                className="bg-white rounded-md p-3"
                              >
                                <LiaHandPointerSolid />
                              </button>
                              <button
                                onClick={() => setDrawingMode("polygon")}
                                className="bg-white rounded-md p-3"
                              >
                                <TbLassoPolygon />
                              </button>
                              <button
                                className="bg-white rounded-md p-3"
                                onClick={clearPolygons}
                              >
                                <RxCross2 />
                              </button>
                              <input
                                type="text"
                                placeholder="Search location"
                                style={{
                                  width: 400,
                                  height: 40,
                                  paddingLeft: 8,
                                }}
                                className="bg-white rounded-md"
                              />
                            </div>
                          </Autocomplete>
                          <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            onLoad={onMapLoad}
                          >
                            {drawingMode && (
                              <DrawingManager
                                options={{
                                  drawingControl: false,
                                  drawingMode: drawingMode,
                                  polygonOptions: {
                                    fillColor: "#2196F3",
                                    fillOpacity: 0.5,
                                    strokeWeight: 2,
                                    clickable: true,
                                    editable: true,
                                    draggable: true,
                                  },
                                }}
                                onPolygonComplete={onPolygonComplete}
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
                          setZoneData({ ...zoneData, distanceUnitId: e })
                        }
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
                          setZoneData({ ...zoneData, currencyUnitId: e })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-5">
                  <RedButton text="Add" onClick={addNewZone} />
                </div>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
