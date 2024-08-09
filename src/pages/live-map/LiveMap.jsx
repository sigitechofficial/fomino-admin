import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { IoMdHome } from "react-icons/io";
import { MdDirectionsBike } from "react-icons/md";
import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import Loader from "../../components/Loader";
import { ToggleContext } from "../../utilities/ContextApi";
import Layout from "../../components/Layout";
import GetAPI from "../../utilities/GetAPI";
import { PostAPI } from "../../utilities/PostAPI";
import dayjs from "dayjs";


const LiveMap = () => {
    const { data } = GetAPI("admin/getAllZones");
    const [activeDriver, setActiveDriver] = useState();
    const [center, setCenter] = useState({
        lat: 37.7749, // Default latitude
        lng: -122.4194 // Default longitude
    })
    const [zoneData, setZoneData] = useState({
        zone: { value: "1", label: "zone1" },
    });
    let zoneOptions = []
    data?.data?.map((z, i) => {

        zoneOptions.push({
            value: z?.zoneDetail?.zoneId, label: z?.name
        })
    });
    // ==========GetActiveZonesFunction==========
    const activeZone = async () => {
        const res = await PostAPI("admin/zoneActiveDrivers", {
            zoneId: zoneData?.zone?.value,
        });
        console.log(res, "res");
        if (res?.data?.status === "1") {
            setActiveDriver(res?.data?.data)
        }
    };

    console.log(activeDriver, "activeDriver");

    useEffect(() => {
        activeZone();


    }, [zoneData?.zone])

    // ===========End here=========
    const { isToggled, setIsToggled } = useContext(ToggleContext)
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);


    const containerStyle = {
        width: "100%",
        height: "600px"
    };


    // const center = {
    //     lat: 37.7749, // Default latitude
    //     lng: -122.4194 // Default longitude
    // };

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCYC3-gTg2XJFIeo9fura6PoNuQzzPeBlc"
    });

    const onMarkerClick = (place, marker) => {
        setSelectedPlace(place);
        setActiveMarker(marker);
        setShowingInfoWindow(true);
    };

    const onInfoWindowClose = () => {
        setActiveMarker(null);
        setShowingInfoWindow(false);
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <Loader />;
    }

    const customIcon = {
        url: "/images/bike-logo.png", // Replace with the URL or path to your custom logo
        scaledSize: new window.google.maps.Size(100, 100), // Adjust the size as needed
    };
    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "#fff",
            // match with the menu
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "green" : "gray",
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: state.isFocused ? "red" : "blue"
            }
        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0
        })
    };




    return (
        <>
            < Layout content={<>
                <div className='bg-[#faf4f8] px-5 py-8 w-full'>
                    <div className='w-full rounded-md bg-white h-full pb-10'>
                        <div className='flex justify-between items-center w-[90%] mx-auto py-5' >
                            <h4 className='text-themeRed text-lg font-bold font-norms'>Active Couriers</h4>
                            <div className='w-[300px]'>
                                <Select
                                    styles={customStyles}
                                    placeholder="Select"
                                    name="distanceUnitId"
                                    options={zoneOptions}
                                    onChange={(e) => {
                                        setZoneData({ ...zoneData, zone: zoneOptions.find(el => el.value === e?.value) });
                                    }
                                    }
                                    value={zoneData?.zone}
                                />
                            </div>
                        </div>

                        {/* ================= */}
                        <div className='w-[90%] mx-auto flex relative'>
                            <div className='w-[30%] min-w-[300px] h-full bg-white shadow-2xl rounded-xl py-8 absolute top-0 left-0 z-10 overflow-auto'>
                                <div className=" w-full flex justify-center"><button className='bg-green-700 rounded-full text-white px-4 py-1 shadow-md duration-200 text-lg font-semibold font-norms border-green-700 border-[1px]  hover:bg-transparent hover:border-[1px] hover:text-green-700'>Active Courier</button></div>

                                {activeDriver?.activeDrivers?.length > 0 ? activeDriver?.activeDrivers?.map((item, i) => {
                                    return (
                                        <div key={i} className='w-[92%] mx-auto border-gray-200 border-[2px] rounded-xl px-3 py-3 mt-3 cursor-pointer hover:border-gray-400' onClick={() => setCenter({ ...center, lat: item?.location?.lat, lng: item?.location?.lng })}>
                                            <div className='flex justify-between'><p className='font-norms font-semibold text-lg'>{item?.orderData?.orderNum ? item?.orderData?.orderNum : "N/A "}</p> <div className='flex flex-col justify-center items-center'><p>{dayjs(item?.orderData?.createdAt).format("DD/MM/YYYY h:mm A")}</p> <p className={`${item?.assigned ? "bg-green-700" : "bg-gray-400"}  rounded-md px-2 text-white mt-1`}>{item?.assigned ? "Assigned" : "Not Assigned"}</p></div></div>
                                            <div className='flex gap-3'>
                                                <IoMdHome className='text-green-700' size={20} />
                                                <div>
                                                    <p className='font-medium font-norms'>Deliver to {item?.orderData?.dropOffID?.title ? item?.orderData?.dropOffID?.title : "stefani"}</p>
                                                    <p className='text-gray-400'>{item?.orderData?.dropOffID?.streetAddress ? item?.orderData?.dropOffID?.streetAddress : "N/A"}</p>
                                                </div>
                                            </div>
                                            <div className='flex gap-3 mt-3'>
                                                <MdDirectionsBike className='text-green-700' size={20} />
                                                <div>
                                                    <p className='font-medium font-norms'>{`${item?.courier?.firstName} ${item?.courier?.lastName}`}</p>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <p className="text-center mt-10 text-lg font-medium font-norms text-gray-500">No Active Courier</p>}

                            </div>

                            {/* <div className='w-[92%] mx-auto border-gray-200 border-[2px] rounded-xl px-3 py-3 mt-4 cursor-pointer hover:border-gray-400'>
                                    <div className='flex justify-between'><p className='font-norms font-semibold text-lg'>U61V9P</p> <div className='flex flex-col justify-center items-center'><p>ETA 10:45</p> <p className='bg-green-700 rounded-md px-2 text-white mt-1'>Assigned</p></div></div>
                                    <div className='flex gap-3'>
                                        <IoMdHome className='text-green-700' size={20} />
                                        <div>
                                            <p className='font-medium font-norms'>Deliver to stefani</p>
                                            <p className='text-gray-400'>Street no 5</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-3 mt-3'>
                                        <MdDirectionsBike className='text-green-700' size={20} />
                                        <div>
                                            <p className='font-medium font-norms'>Ali Hamza</p>

                                        </div>
                                    </div>
                                </div> */}

                            {/* =====================Google Maps========================= */}
                            <div className='w-[70.2%] bg-slate-600 ml-[29.5%]'>
                                <div className="">
                                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                                        <Marker
                                            position={center}
                                            icon={customIcon}
                                            onClick={() => onMarkerClick({ name: "Current location" }, { position: center })}
                                        />

                                        {showingInfoWindow && (
                                            <InfoWindow position={activeMarker.position} onCloseClick={onInfoWindowClose}>
                                                <div>
                                                    <h1>{selectedPlace.name}</h1>
                                                </div>
                                            </InfoWindow>
                                        )}
                                    </GoogleMap>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>} />
        </>
    )
}

export default LiveMap