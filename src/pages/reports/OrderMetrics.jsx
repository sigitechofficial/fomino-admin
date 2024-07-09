import React from "react";
import Layout from "../../components/Layout";
import { FaArrowLeft } from "react-icons/fa6";
import ReportsCard from "../../components/ReportsCard";
import { DonutChart } from "../../components/DonutChart";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";

export default function OrderMetrics() {
  const { data } = GetAPI("admin/orderMetrics");

  const preparingOrders =
    (parseInt(data?.data?.PreparingOrders) * 100) /
    parseInt(data?.data?.totalOrders);

  const pickOrders =
    (parseInt(data?.data?.pickOrders) * 100) /
    parseInt(data?.data?.totalOrders);

  const placedOrders =
    (parseInt(data?.data?.PlacedOrders) * 100) /
    parseInt(data?.data?.totalOrders);

  const OrderMetricsData = {
    labels: [
      `Preparing Orders - ${
        preparingOrders ? preparingOrders.toFixed(2) : "0"
      }%`,
      `Ready for Pick Up - ${pickOrders ? pickOrders.toFixed(2) : "0"}%`,

      `Order Placed - ${placedOrders ? placedOrders.toFixed(2) : "0"}%`,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [preparingOrders, pickOrders, placedOrders],
        backgroundColor: ["#FF5329", "#79E0AC", "#379465"],
        borderColor: ["#FF5329", "#79E0AC", "#379465"],
        borderWidth: 1,
      },
    ],
  };

  const columns = [
    { field: "sn", header: "Serial. No" },
    {
      field: "moduleType",
      header: "Module Type",
    },
    {
      field: "totalOrders",
      header: "Total Orders",
    },
    {
      field: "completedOrders",
      header: "Completed Orders",
    },
    {
      field: "pendingOrders",
      header: "Pending Orders",
    },
    {
      field: "cancelledOrders",
      header: "Cancelled Orders",
    },
    {
      field: "averageOrder",
      header: "Average Order Value",
    },
  ];

  const datas = [
    {
      sn: "1",
      moduleType: "Restaurant",
      totalOrders: data?.data?.restTotalOrders,
      completedOrders: data?.data?.restCompleteOrders,
      pendingOrders: data?.data?.restPendingOrders,
      cancelledOrders: data?.data?.restCancelledOrders,
      averageOrder: data?.data?.restAverageOrder.toFixed(2),
    },
    {
      sn: "1",
      moduleType: "Store",
      totalOrders: data?.data?.storeTotalOrders,
      completedOrders: data?.data?.storeCompleteOrders,
      pendingOrders: data?.data?.storePendingOrders,
      cancelledOrders: data?.data?.storeCancelledOrders,
      averageOrder: data?.data?.storeAverageOrder.toFixed(2),
    },
  ];

  return (
    <Layout
      content={
        <div className="bg-themeGray p-5 space-y-5">
          <div className="flex gap-5 items-center">
            <button
              className="bg-white p-2 rounded-full"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft />
            </button>
            <h2 className="text-themeRed text-lg font-bold font-norms">
              Order Metrics
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-5">
            <div className="grid grid-cols-3 col-span-8 gap-5">
              <ReportsCard
                total={data?.data?.totalOrders}
                title="Total Orders"
                image="home-3"
              />
              <ReportsCard
                total={data?.data?.deliveryOrders}
                title="Delivery Order"
                image="home-3"
              />
              <ReportsCard
                total={data?.data?.selfPickupOrders}
                title="Pickup Order"
                image="home-3"
              />
              <ReportsCard
                total={data?.data?.scheduleOrders}
                title="Schedule Orders"
                image="home-3"
              />
              <ReportsCard
                total={data?.data?.completeOrders}
                title="Completed Orders"
                image="home-3"
              />
              <ReportsCard
                total={data?.data?.cancelOrders}
                title="Cancelled Orders"
                image="home-3"
              />
            </div>

            <div className="bg-white p-2.5 rounded-md shadow-lg space-y-10 col-span-4">
              <div className="space-y-2">
                <h3 className="text-xl text-black font-semibold font-norms text-center">
                  Overview Of Order Statuses
                </h3>
                <p className="text-themeBorderGray font-medium font-switzer text-sm text-center">
                  Of all orders till today
                </p>
              </div>

              <div>
                <DonutChart data={OrderMetricsData} />
              </div>
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-md shadow-lg">
            <MyDataTable columns={columns} data={datas} />
          </div>
        </div>
      }
    />
  );
}
