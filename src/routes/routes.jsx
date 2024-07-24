import { lazy } from "react";

// Reports
const StoreReport = lazy(() => import("../pages/reports/StoreReport"));
const RestaurantReport = lazy(() =>
  import("../pages/reports/RestaurantReport")
);
const CustomerAnalytics = lazy(() =>
  import("../pages/reports/CustomerAnalytics")
);
const SalesReport = lazy(() => import("../pages/reports/SalesReport"));
const OrderMetrics = lazy(() => import("../pages/reports/OrderMetrics"));

// User Management
const User = lazy(() => import("../pages/user/user-management/UserManagement"));
const UserDetails = lazy(() =>
  import("../pages/user/user-management/UserDetails")
);
const Customers = lazy(() => import("../pages/user/customer/Customer"));
const RestaurantOwners = lazy(() =>
  import("../pages/user/restaurant-owner/RestaurantOwner")
);
const StoreOwners = lazy(() => import("../pages/user/store-owner/StoreOwner"));
const Drivers = lazy(() => import("../pages/user/drivers/Drivers"));
const DriverDetails = lazy(() => import("../pages/user/drivers/DriverDetails"));
const Employees = lazy(() => import("../pages/user/staff/Employee"));
const Roles = lazy(() => import("../pages/user/role/Roles"));
const Permissions = lazy(() => import("../pages/user/permissions/Permissions"));

// Restaurant Items & Menu
const AddOnCollections = lazy(() =>
  import("../pages/restaurant-menu/add-on-collection/AddOnCollections")
);
const AddOn = lazy(() => import("../pages/restaurant-menu/add-on/AddOn"));
const MenuCategories = lazy(() =>
  import("../pages/restaurant-menu/menu-categories/MenuCategories")
);
const Cuisines = lazy(() =>
  import("../pages/restaurant-menu/cuisines/Cuisines")
);
const Products = lazy(() =>
  import("../pages/restaurant-menu/products/Products")
);


// Store Items & Menu
const StoreAddOnCollections = lazy(() =>
  import("../pages/store-menu/add-on-collection/StoreAddOnCollection")
);
const StoreAddOn = lazy(() => import("../pages/store-menu/add-on/StoreAddOn"));

const StoreMenuCategories = lazy(() =>
  import("../pages/store-menu/menu-categories/StoreMenuCategories")
);

const StoreCuisines = lazy(() =>
  import("../pages/store-menu/cuisines.jsx/StoreCuisines")
);

const StoreProducts = lazy(() =>
  import("../pages/store-menu/products/StoreProducts")
);

// Restaurant Orders
const RestaurantOrders = lazy(() =>
  import("../pages/restaurant-orders/RestaurantOrders")
);
const DeliveredOrders = lazy(() =>
  import("../pages/restaurant-orders/DeliveredOrders")
);
const CancelledOrders = lazy(() =>
  import("../pages/restaurant-orders/CancelledOrders")
);
const ScheduleOrders = lazy(() =>
  import("../pages/restaurant-orders/ScheduleOrders")
);
const OrderDetails = lazy(() =>
  import("../pages/restaurant-orders/OrderDetails")
);
const TableBooking = lazy(() =>
  import("../pages/restaurant-orders/TableBooking")
);
const TableBookingDetails = lazy(() =>
  import("../pages/restaurant-orders/TableBookingDetails")
);
const Rejected = lazy(() =>
  import("../pages/restaurant-orders/Rejected")
);
// Store Orders
const StoreOrders = lazy(() => import("../pages/store-orders/StoreOrders"));
const StoreDeliveredOrders = lazy(() =>
  import("../pages/store-orders/StoreDeliveredOrders")
);
const StoreCancelledOrders = lazy(() =>
  import("../pages/store-orders/StoreCancelledOrders")
);
const StoreScheduleOrders = lazy(() =>
  import("../pages/store-orders/StoreScheduleOrders")
);
const StoreRejected = lazy(() =>
  import("../pages/store-orders/StoreRejected")
);

// All Restaurants
const Restaurants = lazy(() => import("../pages/restaurants/Restaurants"));
const AddRestaurants = lazy(() => import("../pages/restaurants/AddRestaurant"));
const EditRestaurants = lazy(() =>
  import("../pages/restaurants/EditRestaurants")
);

// All Stores
const Stores = lazy(() => import("../pages/stores/Stores"));
const EditStore = lazy(() => import("../pages/stores/EditStore"));

// All Countries
const Countries = lazy(() => import("../pages/country/Countries"));

// All Cities
const Cities = lazy(() => import("../pages/city/Cities"));

const VehicleManagement = lazy(() =>
  import("../pages/vehicle-management/VehicleManagement")
);

// All Zones
const Zones = lazy(() => import("../pages/zones/Zones"));
const AddNewZone = lazy(() => import("../pages/zones/AddNewZone"));
const UpdateZone = lazy(() => import("../pages/zones/UpdateZone"));

// Promotions
const Voucher = lazy(() => import("../pages/promotions/Voucher"));
const Notifications = lazy(() => import("../pages/promotions/Notifications"));
const Charges = lazy(() => import("../pages/promotions/Charges"));

// Earnings
const AdminEarnings = lazy(() => import("../pages/earnings/AdminEarnings"));
const DriverEarnings = lazy(() => import("../pages/earnings/DriverEarnings"));
const RestaurantEarnings = lazy(() =>
  import("../pages/earnings/RestaurantEarnings")
);
const StoreEarnings = lazy(() => import("../pages/earnings/StoreEarnings"));

// Front Settings
const FrontSettings = lazy(() =>
  import("../pages/front-settings/FrontSetting")
);
// Payout Requet
const PayoutRequest = lazy(() =>
  import("../pages/payout-request/Payoutrequest")
);

// Profile Settings
const ProfileSettings = lazy(() =>
  import("../pages/profile-settings/ProfileSettings")
);

const DefaultValues = lazy(() =>
  import("../pages/default-values/DefaultValues")
);

const coreRoutes = [
  // Reports
  {
    path: "/store-reports",
    component: StoreReport,
  },
  {
    path: "/restaurant-reports",
    component: RestaurantReport,
  },
  {
    path: "/customer-analytics",
    component: CustomerAnalytics,
  },
  {
    path: "/sale-reports",
    component: SalesReport,
  },
  {
    path: "/order-metrics",
    component: OrderMetrics,
  },

  // User Management
  {
    path: "/user-management",
    component: User,
  },
  {
    path: "/user-details",
    component: UserDetails,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/restaurant-owners",
    component: RestaurantOwners,
  },
  {
    path: "/store-owners",
    component: StoreOwners,
  },
  {
    path: "/drivers",
    component: Drivers,
  },
  {
    path: "/driver-details",
    component: DriverDetails,
  },
  {
    path: "/employees",
    component: Employees,
  },
  {
    path: "/roles",
    component: Roles,
  },
  {
    path: "/permissions",
    component: Permissions,
  },
  // Restaurant Items & Menu
  {
    path: "/restaurant/add-on-collections",
    component: AddOnCollections,
  },
  {
    path: "/restaurant/add-on",
    component: AddOn,
  },
  {
    path: "/restaurant/menu-categories",
    component: MenuCategories,
  },
  {
    path: "/restaurant/cuisines",
    component: Cuisines,
  },
  {
    path: "/restaurant/products",
    component: Products,
  },
  // Store Items & Menu
  {
    path: "/store/add-on-collections",
    component: StoreAddOnCollections,
  },

  {
    path: "/store/add-on",
    component: StoreAddOn,
  },

  {
    path: "/store/menu-categories",
    component: StoreMenuCategories,
  },

  {
    path: "/store/cuisines",
    component: StoreCuisines,
  },

  {
    path: "/store/products",
    component: StoreProducts,
  },

  // Restaurant Orders
  {
    path: "/restaurant/all-orders",
    component: RestaurantOrders,
  },
  {
    path: "restaurant/delivered-orders",
    component: DeliveredOrders,
  },
  {
    path: "restaurant/cancelled-orders",
    component: CancelledOrders,
  },
  {
    path: "restaurant/schedule-orders",
    component: ScheduleOrders,
  },
  {
    path: "restaurant/order-details",
    component: OrderDetails,
  },
  {
    path: "/order-details",
    component: OrderDetails,
  },
  {
    path: "/booking-details",
    component: TableBookingDetails,
  },
  {
    path: "restaurant/table-booking",
    component: TableBooking,
  },
  {
    path: "restaurant/rejected",
    component: Rejected,
  },


  // Store Orders
  {
    path: "/store/all-orders",
    component: StoreOrders,
  },
  {
    path: "/store/delivered-orders",
    component: StoreDeliveredOrders,
  },
  {
    path: "/store/cancelled-orders",
    component: StoreCancelledOrders,
  },
  {
    path: "/store/schedule-orders",
    component: StoreScheduleOrders,
  },

  {
    path: "/vehicle-management",
    component: VehicleManagement,
  },
  {
    path: "/store-rejected",
    component: StoreRejected,
  },

  // All Zones
  {
    path: "/all-zones",
    component: Zones,
  },
  {
    path: "/add-new-zone",
    component: AddNewZone,
  },
  {
    path: "/update-zone",
    component: UpdateZone,
  },
  // All Restaurants
  {
    path: "/all-restaurants",
    component: Restaurants,
  },
  {
    path: "/add-restaurant",
    component: AddRestaurants,
  },
  {
    path: "/edit-restaurant",
    component: EditRestaurants,
  },

  // All Stores
  {
    path: "/all-stores",
    component: Stores,
  },
  {
    path: "/edit-store",
    component: EditStore,
  },

  // All Countries
  {
    path: "/all-countries",
    component: Countries,
  },

  // All Countries
  {
    path: "/all-cities",
    component: Cities,
  },

  // Promotions
  {
    path: "/vouchers",
    component: Voucher,
  },
  {
    path: "/notifications",
    component: Notifications,
  },
  {
    path: "/charges",
    component: Charges,
  },

  // Earnings
  {
    path: "/admin-earnings",
    component: AdminEarnings,
  },
  {
    path: "/driver-earnings",
    component: DriverEarnings,
  },
  {
    path: "/restaurant-earnings",
    component: RestaurantEarnings,
  },
  {
    path: "/store-earnings",
    component: StoreEarnings,
  },

  // Front Settings
  {
    path: "/front-settings",
    component: FrontSettings,
  },
  // Payout Request
  {
    path: "/payout-request",
    component: PayoutRequest,
  },

  // Profile Settings
  {
    path: "/profile-settings",
    component: ProfileSettings,
  },

  {
    path: "/default-values",
    component: DefaultValues,
  },
];

const routes = [...coreRoutes];
export default routes;
