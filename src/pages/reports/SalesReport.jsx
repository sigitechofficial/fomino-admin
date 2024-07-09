import React from "react";
import Layout from "../../components/Layout";
import { FaArrowLeft } from "react-icons/fa6";
import ReportsCard from "../../components/ReportsCard";
import { DonutChart } from "../../components/DonutChart";
import GetAPI from "../../utilities/GetAPI";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default function SalesReport() {
  const graphData = GetAPI("admin/salesReports");

  const deliveryOrdersEarnings =
    (parseInt(graphData?.data?.data?.deliveryOrdersEarnings) * 100) /
    parseInt(graphData?.data?.data?.totalEarning);

  const selfpickupOrdersEarnings =
    (parseInt(graphData?.data?.data?.selfpickupOrdersEarnings) * 100) /
    parseInt(graphData?.data?.data?.totalEarning);

  const orderChartData = {
    labels: [
      `Delivery - ${
        deliveryOrdersEarnings ? deliveryOrdersEarnings.toFixed(2) : "0"
      }%`,
      `Pickup - ${
        selfpickupOrdersEarnings ? selfpickupOrdersEarnings.toFixed(2) : "0"
      }%`,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [deliveryOrdersEarnings, selfpickupOrdersEarnings],
        backgroundColor: ["#1448CD", "#EC6C30"],
        borderColor: ["#1448CD", "#EC6C30"],
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
        position: "bottom",
      },
    },
  };

  const totalOrders = graphData?.data?.data?.totalOrders.map(
    (item) => Object.values(item)[0]
  );
  const labels = graphData?.data?.data?.totalOrders.map(
    (item) => Object.keys(item)[0]
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Orders",
        data: totalOrders,
        borderColor: "#1448CD",
        backgroundColor: "#1448CD",
      },
    ],
  };

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
              Sales Report
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-9 space-y-5">
              <div className="grid grid-cols-3 gap-5">
                <ReportsCard
                  total={`$${graphData?.data?.data?.totalSales}`}
                  title="Total Sales"
                  image="home-1"
                />
                <ReportsCard
                  total={`$${graphData?.data?.data?.totalRestaurantSales.toFixed(
                    2
                  )}`}
                  title="Total Sales (By Restaurant)"
                  image="home-1"
                />
                <ReportsCard
                  total={`$${graphData?.data?.data?.totalStoreSales}`}
                  title="Total Sales (By Stores)"
                  image="home-1"
                />
              </div>

              <div className="bg-white p-2.5 rounded-md shadow-lg">
                <Line options={options} data={data} />
              </div>
            </div>

            <div className="col-span-3 bg-white p-2.5 rounded-md shadow-lg space-y-10">
              <div className="space-y-2">
                <h3 className="text-xl text-black font-semibold font-norms text-center">
                  Total Store Earnings
                </h3>
                <p className="text-themeBorderGray font-medium font-switzer text-sm text-center">
                  See your store earning statistics
                </p>
              </div>

              <div>
                <DonutChart data={orderChartData} />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
