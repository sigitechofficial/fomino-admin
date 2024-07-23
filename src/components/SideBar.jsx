import React, { useEffect, useState } from "react";
import {
  MdAddBox,
  MdCancel,
  MdDashboard,
  MdRestaurant,
  MdTableRestaurant,
  MdOutlineTableRestaurant ,
} from "react-icons/md";
import { PiPackage, PiTicket } from "react-icons/pi";
import { FaPowerOff, FaRegBell, FaUserGear } from "react-icons/fa6";
import { IoMenu, IoSettings, IoStorefront } from "react-icons/io5";
import { IoIosCheckbox, IoIosPricetags } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { GrSend } from "react-icons/gr";
import {
  FaAngleDown,
  FaUserEdit,
  FaAngleUp,
  FaUser,
  FaUsersCog,
  FaUserNurse,
  FaUsers,
  FaUserFriends,
  FaCity,
} from "react-icons/fa";
import {
  RiBus2Fill,
  RiCouponLine,
  RiMoneyDollarBoxLine,
  RiUserSettingsFill,
  RiAddFill 
} from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ListHead from "./ListHead";
import ListItems from "./ListItems";
import { info_toaster } from "../utilities/Toaster";
import { BsCashCoin } from "react-icons/bs";
import { SiVectorlogozone } from "react-icons/si";

export default function SideBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    if (
      location.includes("/user-management") ||
      location.includes("/user-details") ||
      location.includes("/driver-details") ||
      location.includes("/customers") ||
      location.includes("/restaurant-owner") ||
      location.includes("/store-owner") ||
      location.includes("/drivers") ||
      location.includes("/employees") ||
      location.includes("/roles") ||
      location.includes("/permissions")
    ) {
      setActiveDropdown("user");
    } else if (
      location.includes("/restaurant/add-on-collections") ||
      location.includes("/restaurant/menu-categories") ||
      location.includes("/restaurant/add-on") ||
      location.includes("/restaurant/products") ||
      location.includes("/restaurant/cuisines")
    ) {
      setActiveDropdown("Restaurant Items & Menu");
    } else if (
      location.includes("/store/add-on-collections") ||
      location.includes("/store/menu-categories") ||
      location.includes("/store/add-on") ||
      location.includes("/store/products") ||
      location.includes("/store/cuisines")
    ) {
      setActiveDropdown("Store Items & Menu");
    } else if (
      location.includes("/notifications") ||
      location.includes("/vouchers") ||
      location.includes("/default-values")
    ) {
      setActiveDropdown("Promotions");
    } else if (
      location.includes("/restaurant/all-orders") ||
      location.includes("/restaurant/delivered-orders") ||
      location.includes("/restaurant/cancelled-orders") ||
      location.includes("/restaurant/schedule-orders") ||
      location.includes("/order-details")
    ) {
      setActiveDropdown("Restaurant Orders");
    } else if (
      location.includes("/overall-earnings") ||
      location.includes("/admin-earnings") ||
      location.includes("/driver-earnings") ||
      location.includes("/restaurant-earnings") ||
      location.includes("/store-earnings")
    ) {
      setActiveDropdown("Earnings");
    } else if (
      location.includes("/store/all-orders") ||
      location.includes("/store/delivered-orders") ||
      location.includes("/store/cancelled-orders") ||
      location.includes("/store/schedule-orders") ||
      location.includes("/order-details")
    ) {
      setActiveDropdown("Store Orders");
    }
  }, [location]);

  const handleActive = (dropdownId) => {
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownId);
    }
  };

  const isDropdownActive = (dropdownId) => {
    return activeDropdown === dropdownId;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhoneNo");
    localStorage.removeItem("userName");
    navigate("/login");
    info_toaster("Successfully Logged out!");
  };

  return (
    <nav
      className="w-[280px] float-left fixed h-full flex bg-theme flex-col justify-between
      border-r-[1.5px] border-r-themeBorder"
    >
      <div className="flex justify-center col-span-2 border-b-[1.5px] border-b-themeBorder py-2.5 px-10">
        <Link to="/">
          <img
            src="/images/logo.webp"
            alt="logo"
            className="w-24 object-contain"
          />
        </Link>
      </div>
      <ul className="flex flex-col gap-y-1 overflow-auto pt-5 pb-3">
        <ListHead
          title="Dashboard"
          to="/"
          Icon={MdDashboard}
          active={
            location === "/store-reports" ||
            location === "/restaurant-reports" ||
            location === "/customer-analytics" ||
            location === "/order-metrics" ||
            location === "/sale-reports"
          }
        />
        <ListHead
          title="User"
          Icon={FaUser}
          active={
            location === "/user-management" ||
            location === "/user-details" ||
            location === "/driver-details" ||
            location === "/customers" ||
            location === "/restaurant-owners" ||
            location === "/store-owners" ||
            location === "/drivers" ||
            location === "/employees" ||
            location === "/permissions"
          }
          Angle={isDropdownActive("user") ? FaAngleUp : FaAngleDown}
          onClick={() => handleActive("user")}
        />
        {isDropdownActive("user") && (
          <>
            <div className="px-3 relative space-y-1">
              <ListItems
                title="User Management"
                to="/user-management"
                // active={location === "/user-details"}
                Icon={FaUserGear}
              />
              <ListItems
                title="Customer"
                to="/customers"
                // active={location === "/user-details"}
                Icon={FaUserFriends}
              />
              <ListItems
                title="Restaurant Owner"
                to="/restaurant-owners"
                // active={location === "/user-details"}
                Icon={FaUsersCog}
              />
              <ListItems
                title="Store Owner"
                to="/store-owners"
                // active={location === "/user-details"}
                Icon={FaUsersCog}
              />
              <ListItems
                title="Drivers"
                to="/drivers"
                Icon={FaUserNurse}
                // active={location === "/user-details"}
              />
              <ListItems
                title="Staff"
                to="/employees"
                // active={location === "/user-details"}
                Icon={FaUsers}
              />
              <ListItems title="Roles" to="/roles" Icon={RiCouponLine} />
              <ListItems
                title="Permissions"
                to="/permissions"
                Icon={FaUserEdit}
              />
              <hr className="w-full" />
            </div>
          </>
        )}

        <ListHead
          title="Restaurant Items & Menu"
          Icon={MdTableRestaurant}
          active={
            location === "/restaurant/add-on-collections" ||
            // location === "/restaurant/add-on" ||
            location === "/restaurant/menu-categories" ||
            location === "/restaurant/cuisines" ||
            location === "/restaurant/products"
          }
          Angle={
            isDropdownActive("Restaurant Items & Menu")
              ? FaAngleUp
              : FaAngleDown
          }
          onClick={() => handleActive("Restaurant Items & Menu")}
        />
        {isDropdownActive("Restaurant Items & Menu") && (
          <>
            <div className="m-2 relative space-y-1">
              <ListItems
                title="Add On Collections"
                to="/restaurant/add-on-collections"
                Icon={MdAddBox}
              />
              <ListItems
                title="Add On"
                to="/restaurant/add-on"
                Icon={RiAddFill}
              />
              <ListItems
                title="Menu Categories"
                to="/restaurant/menu-categories"
                Icon={IoMenu}
              />
              <ListItems
                title="All Cuisines"
                to="/restaurant/cuisines"
                Icon={MdRestaurant}
              />
              <ListItems
                title="All Products"
                to="/restaurant/products"
                Icon={PiPackage}
              />
              <hr className="w-full" />
            </div>
          </>
        )}

        <ListHead
          title="Store Items & Menu"
          Icon={IoStorefront}
          active={
            location === "/store/add-on-collections" ||
            location === "/store/add-on" ||
            location === "/store/menu-categories" ||
            location === "/store/cuisines" ||
            location === "/store/products"
          }
          Angle={
            isDropdownActive("Store Items & Menu") ? FaAngleUp : FaAngleDown
          }
          onClick={() => handleActive("Store Items & Menu")}
        />
        {isDropdownActive("Store Items & Menu") && (
          <>
            <div className="m-2 relative space-y-1">
              <ListItems
                title="Add On Collection"
                to="/store/add-on-collections"
                Icon={MdAddBox}
              />
              <ListItems title="Add On" to="/store/add-on" Icon={RiAddFill} />
              <ListItems
                title="Menu Categories"
                to="/store/menu-categories"
                Icon={IoMenu}
              />
              <ListItems
                title="All Cuisines"
                to="/store/cuisines"
                Icon={MdRestaurant}
              />
              <ListItems
                title="All Products"
                to="/store/products"
                Icon={PiPackage}
              />
              <hr className="w-full" />
            </div>
          </>
        )}

        <ListHead
          title="Restaurant Orders"
          Icon={PiPackage}
          active={
            location === "/restaurant/all-orders" ||
            location === "/restaurant/delivered-orders" ||
            location === "/restaurant/cancelled-orders" ||
            location === "/restaurant/schedule-orders" ||
            location === "/order-details"
          }
          Angle={
            isDropdownActive("Restaurant Orders") ? FaAngleUp : FaAngleDown
          }
          onClick={() => handleActive("Restaurant Orders")}
        />
        {isDropdownActive("Restaurant Orders") && (
          <>
            <div className="m-2 relative space-y-1">
              <ListItems
                title="All Orders"
                to="/restaurant/all-orders"
                Icon={PiPackage}
              />
              <ListItems
                title="Delivered"
                to="/restaurant/delivered-orders"
                Icon={IoIosCheckbox}
              />
              <ListItems
                title="Cancelled"
                to="/restaurant/cancelled-orders"
                Icon={MdCancel}
              />
              <ListItems
                title="Schedule"
                to="/restaurant/schedule-orders"
                Icon={IoIosCheckbox}
              />
               <ListItems
                title="Rejected"
                to="/restaurant/rejected"
                Icon={MdCancel}
              />
                <ListItems
                title="Table Bookings"
                to="/restaurant/table-booking"
                Icon={MdOutlineTableRestaurant }
              />
              {/* <ListItems
                title="Rejected by Store"
                to="/completed-rides"
                Icon={MdCancel}
              /> */}
              <hr className="w-full" />
            </div>
          </>
        )}

        <ListHead
          title="Store Orders"
          Icon={PiPackage}
          active={
            location === "/store/all-orders" ||
            location === "/store/delivered-orders" ||
            location === "/store/cancelled-orders" ||
            location === "/store/schedule-orders" ||
            location === "/order-details"
          }
          Angle={isDropdownActive("Store Orders") ? FaAngleUp : FaAngleDown}
          onClick={() => handleActive("Store Orders")}
        />
        {isDropdownActive("Store Orders") && (
          <>
            <div className="m-2 relative space-y-1">
              <ListItems
                title="All Orders"
                to="/store/all-orders"
                Icon={PiPackage}
              />
              <ListItems
                title="Delivered"
                to="/store/delivered-orders"
                Icon={IoIosCheckbox}
              />
              <ListItems
                title="Cancelled"
                to="/store/cancelled-orders"
                Icon={MdCancel}
              />
              <ListItems
                title="Schedule"
                to="/store/schedule-orders"
                Icon={IoIosCheckbox}
              />
              <ListItems
                title="Rejected"
                to="/store-rejected"
                Icon={MdCancel}
              />
              <hr className="w-full" />
            </div>
          </>
        )}

        <ListHead
          title="Promotions"
          Icon={GrSend}
          active={
            location === "/notifications" ||
            location === "/vouchers" ||
            location === "/default-values"
          }
          Angle={isDropdownActive("Promotions") ? FaAngleUp : FaAngleDown}
          onClick={() => handleActive("Promotions")}
        />
        {isDropdownActive("Promotions") && (
          <>
            <div className="m-2 relative space-y-1">
              <ListItems title="Vouchers" to="/vouchers" Icon={PiTicket} />
              <ListItems
                title="Default Values"
                to="/default-values"
                Icon={RiMoneyDollarBoxLine}
              />
              <ListItems
                title="Push Notification"
                to="/notifications"
                Icon={FaRegBell}
              />
              <hr className="w-full" />
            </div>
          </>
        )}

        <ListHead
          title="Earnings"
          Icon={BsCashCoin}
          active={
            location === "/overall-earnings" ||
            location === "/admin-earnings" ||
            location === "/driver-earnings" ||
            location === "/restaurant-earnings" ||
            location === "/store-earnings"
          }
          Angle={isDropdownActive("Earnings") ? FaAngleUp : FaAngleDown}
          onClick={() => handleActive("Earnings")}
        />
        {isDropdownActive("Earnings") && (
          <>
            <div className="m-2 relative space-y-1">
              {/* <ListItems
                title="Overall Earnings"
                to="/overall-earnings"
                Icon={RiMoneyDollarBoxLine}
              /> */}
              <ListItems
                title="Admin Earnings"
                to="/admin-earnings"
                Icon={RiMoneyDollarBoxLine}
              />
              <ListItems
                title="Driver Earnings"
                to="/driver-earnings"
                Icon={RiMoneyDollarBoxLine}
              />
              <ListItems
                title="Restaurant Earnings"
                to="/restaurant-earnings"
                Icon={RiMoneyDollarBoxLine}
              />
              <ListItems
                title="Store Earnings"
                to="/store-earnings"
                Icon={RiMoneyDollarBoxLine}
              />
              <hr className="w-full" />
            </div>
          </>
        )}

        <ListHead
          title="Zones"
          to="/all-zones"
          active={location === "/add-new-zone" || location === "/update-zone"}
          Icon={SiVectorlogozone}
        />

        <ListHead
          title="Restaurants"
          to="/all-restaurants"
          active={
            location === "/edit-restaurant" || location === "/add-restaurant"
          }
          Icon={MdTableRestaurant}
        />

        <ListHead
          title="Stores"
          active={location === "/edit-store"}
          to="/all-stores"
          Icon={IoStorefront}
        />
        <ListHead title="Countries" to="/all-countries" Icon={TbWorld} />
        <ListHead title="Cities" to="/all-cities" Icon={FaCity} />

        <ListHead
          title="Vehicle Management"
          to="/vehicle-management"
          Icon={RiBus2Fill}
        />

        <ListHead
          title="Front Settings"
          to="/front-settings"
          Icon={IoSettings}
        />

        <ListHead
          title="Profile Setting"
          to="/profile-settings"
          Icon={RiUserSettingsFill}
        />

        <li className="px-3">
          <button
            className="w-full flex gap-x-1.5 items-center py-1.5 lg:py-3 px-2 rounded-md text-themeLightGray hover:bg-themeRed hover:text-white duration-200"
            onClick={logout}
          >
            <FaPowerOff size={20} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
