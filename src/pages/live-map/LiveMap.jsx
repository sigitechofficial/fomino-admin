import React, { useState, useContext } from "react";
import Select from "react-select";
import { IoMdHome } from "react-icons/io";
import { MdDirectionsBike } from "react-icons/md";
import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import Loader from "../../components/Loader";
import { ToggleContext } from "../../utilities/ContextApi";
import Layout from "../../components/Layout";


const LiveMap = () => {
    const { isToggled, setIsToggled } = useContext(ToggleContext)


    const [selectedPlace, setSelectedPlace] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const containerStyle = {
        width: "100%",
        height: "600px"
    };

    const center = {
        lat: 37.7749, // Default latitude
        lng: -122.4194 // Default longitude
    };

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
        url: "/images/electric_cars.png", // Replace with the URL or path to your custom logo
        scaledSize: new window.google.maps.Size(100, 100) // Adjust the size as needed
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
            {/* <div className='w-full h-max font-sans'>
                <div className='w-full max-h-[300px] relative'>
                    <img className='w-full h-full max-h-[300px] object-cover' src="https://tableo.com/wp-content/uploads/Restaurant-Stock-Images-e1699951587809.webp" alt="image" />
                    <div className='w-[105px] h-[105px] rounded-lg bg-white absolute bottom-[-65px] left-[27px] shadow-lg p-[3px]'> <img className='w-full h-full object-cover rounded-lg' src="https://tableo.com/wp-content/uploads/Restaurant-Stock-Images-e1699951587809.webp" alt="image" /></div>
                </div>
                <h4 className='font-semibold text-[24px] text-end mt-3 mr-6'>CHF 26,12</h4>
                <div className='mt-7 pl-8 pr-6'>
                    <h4 className='font-semibold text-[25px]'>Fomino</h4>
                    <p className='text-gray-800 leading-6 text-[14px] font-normal'>Payment for online ordering: PEIRC with <span className='font-semibold underline'>Fomino.ch</span></p>
                    <p className='text-gray-800 leading-6 text-[14px] font-normal'>Ref. IKEDC6676BBB</p>
                    <p className='underline underline-offset-4 text-[14px] font-medium text-end mt-3'>Cancel payment</p>
                </div>
            </div> */}

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
                                    options={[{ value: "1", label: "Drivers" }, { value: "2", label: "Drivers1" }]}
                                    // onChange={(e) =>
                                    //     setZoneData({ ...zoneData, distanceUnitId: e?.value })
                                    // }
                                    value={{ value: "1", label: "Select Zone" }}
                                />
                            </div>
                        </div>
                        {/* ================= */}
                        <div className='w-[90%] mx-auto flex relative'>
                            <div className='w-[30%] min-w-[300px] h-full bg-white shadow-2xl rounded-xl py-8 absolute top-0 left-0 z-10 overflow-auto'>
                                <div className="bg-gray-200 rounded-full p-1 mb-6 w-[320px] mx-auto flex items-center gap-4"><button className='bg-white rounded-full px-4 py-1 shadow-md duration-200 text-lg font-semibold font-norms  hover:bg-gradient-to-r hover:from-red-400 hover:via-red-500 hover:to-red-600 hover:text-white'>Active Courier</button> <p className='text-gray-400 text-lg font-norms '>Order Today &#40;2&#41; </p></div>
                                <div className='w-[92%] mx-auto border-gray-200 border-[2px] rounded-xl px-3 py-3 mt-4 cursor-pointer hover:border-gray-400'>
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
                                </div>
                                <div className='w-[92%] mx-auto border-gray-200 border-[2px] rounded-xl px-3 py-3 mt-4 cursor-pointer hover:border-gray-400'>
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
                                </div>


                            </div>

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