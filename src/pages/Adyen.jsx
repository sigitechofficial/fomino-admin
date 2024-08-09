import React, { useState, useContext } from "react";
import Layout from '../components/Layout'
import Select from "react-select";
import { IoMdHome } from "react-icons/io";
import { MdDirectionsBike } from "react-icons/md";
import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import Loader from "../components/Loader";
import { ToggleContext } from "../utilities/ContextApi";


const Adyen = () => {
    const { isToggled, setIsToggled } = useContext(ToggleContext);
    
    return (
        <>
            <div className='w-full h-max font-sans'>
                <div className='w-full relative'>
                    <img className='w-full h-full max-h-[250px] object-cover' src="https://tableo.com/wp-content/uploads/Restaurant-Stock-Images-e1699951587809.webp" alt="image" />
                    <div className='w-[105px] h-[105px] rounded-lg bg-white absolute bottom-[-60px] left-[15px] shadow-lg p-[3px]'> <img className='w-full h-full object-cover rounded-lg' src="https://tableo.com/wp-content/uploads/Restaurant-Stock-Images-e1699951587809.webp" alt="image" /></div>
                </div>
                <h4 className='font-bold text-[24px] text-end mt-3 mr-3'>€2000.00</h4>
                <div className='mt-7 px-4'>
                    <h4 className='font-bold text-[25px]'>MyStore</h4>
                    <p className='leading-6 font-semibold text-gray-500'>Ref.MS875478</p>

                    <p className='leading-6 font-bold text-gray-500 mt-3 tracking-wide'>HOW WOULD YOU LIKE TO PAY?</p>
                </div>
            </div>


        </>
    )
}

export default Adyen