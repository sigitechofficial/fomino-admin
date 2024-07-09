import React from "react";
import Layout from "../../components/Layout";
import { FaArrowLeft } from "react-icons/fa6";
import ReportsCard from "../../components/ReportsCard";
import { DonutChart } from "../../components/DonutChart";
import GetAPI from "../../utilities/GetAPI";
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
import { Line } from "react-chartjs-2";
import Loader from "../../components/Loader";

export default function CustomerAnalytics() {
  const graphData = GetAPI("admin/customerReports");
  console.log("🚀 ~ CustomerAnalytics ~ graphData:", graphData);

  const returningCustomers =
    (parseInt(graphData?.data?.data?.returningCustomers) * 100) /
    parseInt(graphData?.data?.data?.totalUsers);

  const newUsers =
    (parseInt(graphData?.data?.data?.newUsers) * 100) /
    parseInt(graphData?.data?.data?.totalUsers);

  const orderChartData = {
    labels: [
      `Returning customer - ${
        returningCustomers ? returningCustomers.toFixed(2) : "0"
      }%`,
      `New customer - ${newUsers ? newUsers.toFixed(2) : "0"}%`,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [returningCustomers, newUsers],
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

  const returningCustomersOrders =
    graphData?.data?.data?.returningCustomersOrders.map(
      (item) => Object.values(item)[0]
    );
  const labels = graphData?.data?.data?.newCustomersOrders.map(
    (item) => Object.keys(item)[0]
  );
  const newCustomersOrders = graphData?.data?.data?.newCustomersOrders.map(
    (item) => Object.values(item)[0]
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Order by returning customer",
        data: returningCustomersOrders,
        borderColor: "#1448CD",
        backgroundColor: "#1448CD",
      },
      {
        label: "Order by New customer",
        data: newCustomersOrders,
        borderColor: "#EC6C30",
        backgroundColor: "#EC6C30",
      },
    ],
  };

  return graphData?.data?.length === 0 ? (
    <Loader />
  ) : (
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
              Customer Analytics
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-9 space-y-5">
              <div className="grid grid-cols-3 gap-5">
                <ReportsCard
                  total={graphData?.data?.data?.totalUsers}
                  title="Total Users"
                  image="home-1"
                />
                <ReportsCard
                  total={graphData?.data?.data?.newUsers}
                  title="New Customers"
                  image="home-1"
                />
                <ReportsCard
                  total={graphData?.data?.data?.returningCustomers}
                  title="Returning Customers"
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
                  Returning and new customer
                </h3>
                <p className="text-themeBorderGray font-medium font-switzer text-sm text-center">
                  See how many successful order made by new and returning
                  customer.
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
