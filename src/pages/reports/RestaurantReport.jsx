import React, { useState } from "react";
import Layout from "../../components/Layout";
import { FaArrowLeft } from "react-icons/fa6";
import { TabButton } from "../../utilities/Buttons";
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

export default function RestaurantReport() {
  const [tab, setTab] = useState("Summary Report");
  const graphData = GetAPI("admin/restaurantReports");
  // Doughnut Chart Data
  const sumOnline =
    (parseInt(graphData?.data?.data?.summary_reports?.onlineTotals) * 100) /
    parseInt(graphData?.data?.data?.summary_reports?.totalPayment);

  const sumCod =
    (parseInt(graphData?.data?.data?.summary_reports?.codTotals) * 100) /
    parseInt(graphData?.data?.data?.summary_reports?.totalPayment);

  const summaryChartData = {
    labels: [
      `Online - ${sumOnline ? sumOnline.toFixed(2) : "0"}%`,
      `Cash - ${sumCod ? sumCod.toFixed(2) : "0"}%`,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [sumOnline, sumCod],
        backgroundColor: ["#1448CD", "#EC6C30"],
        borderColor: ["#1448CD", "#EC6C30"],
        borderWidth: 1,
      },
    ],
  };

  const saleDelivery =
    (parseInt(graphData?.data?.data?.sales_reports?.deliveredOrders) * 100) /
    parseInt(graphData?.data?.data?.summary_reports?.totalOrders);

  const salePickup =
    (parseInt(graphData?.data?.data?.sales_reports?.pickupOrders) * 100) /
    parseInt(graphData?.data?.data?.summary_reports?.totalOrders);

  const salesChartData = {
    labels: [
      `Delivery - ${saleDelivery ? saleDelivery.toFixed(2) : "0"}%`,
      `Pickup - ${salePickup ? salePickup.toFixed(2) : "0"}%`,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [saleDelivery, salePickup],
        backgroundColor: ["#1448CD", "#EC6C30"],
        borderColor: ["#1448CD", "#EC6C30"],
        borderWidth: 1,
      },
    ],
  };

  const orderDelivery =
    (parseInt(graphData?.data?.data?.orderReports?.deliveredOrders) * 100) /
    parseInt(graphData?.data?.data?.orderReports?.totalOrders);

  const orderPickup =
    (parseInt(graphData?.data?.data?.orderReports?.pickupOrders) * 100) /
    parseInt(graphData?.data?.data?.orderReports?.totalOrders);

  const orderChartData = {
    labels: [
      `Delivery - ${orderDelivery ? orderDelivery.toFixed(2) : "0"}%`,
      `Pickup - ${orderPickup ? orderPickup.toFixed(2) : "0"}%`,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [orderDelivery, orderPickup],
        backgroundColor: ["#379465", "#4D7EFF"],
        borderColor: ["#379465", "#4D7EFF"],
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

  const labels = graphData?.data?.data?.monthlyData.map((item) => item.month);
  const ordersCount = graphData?.data?.data?.monthlyData.map(
    (item) => item.ordersCount
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Average order value",
        data: ordersCount,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "Average order value",
      //   data: ordersCount,
      //   borderColor: "rgb(53, 162, 235)",
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
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
              Restaurant Reports
            </h2>
          </div>

          <div className="space-y-1.5">
            <ul className="flex flex-wrap items-center gap-8">
              <TabButton
                title="Summary Report"
                tab={tab}
                onClick={() => setTab("Summary Report")}
              />
              <TabButton
                title="Sales Reports"
                tab={tab}
                onClick={() => setTab("Sales Reports")}
              />
              <TabButton
                title="Order Reports"
                tab={tab}
                onClick={() => setTab("Order Reports")}
              />
            </ul>
            <div className={`w-full bg-[#00000033] h-[1px]`}></div>
          </div>

          {tab === "Summary Report" ? (
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-9 space-y-5">
                <div className="grid grid-cols-3 gap-5">
                  <ReportsCard
                    total={
                      graphData?.data?.data?.summary_reports
                        ?.totalRegisteredRestaurants
                    }
                    title="Total Registered"
                    image="store"
                  />
                  <ReportsCard
                    total={graphData?.data?.data?.summary_reports?.newItems}
                    title="New Items"
                    image="store"
                  />
                  <ReportsCard title="Total Orders" image="report" />
                </div>
                <div className="bg-white p-2.5 rounded-md shadow-lg">
                  <Line options={options} data={data} />
                </div>
              </div>

              <div className="col-span-3 bg-white p-2.5 rounded-md shadow-lg space-y-10">
                <div className="space-y-2">
                  <h3 className="text-xl text-black font-semibold font-norms text-center">
                    Completed Payment Statistics
                  </h3>
                  <p className="text-themeBorderGray font-medium font-switzer text-sm text-center">
                    See how your customer paid you
                  </p>
                </div>

                <div>
                  <DonutChart data={summaryChartData} />
                </div>
              </div>
            </div>
          ) : tab === "Sales Reports" ? (
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-9 space-y-5">
                <div className="grid grid-cols-3 gap-5">
                  <ReportsCard
                    total={`$${graphData?.data?.data?.sales_reports?.gross_sales}`}
                    title="Gross Sale "
                    image="home-1"
                  />
                  <ReportsCard
                    total={`$${graphData?.data?.data?.sales_reports?.total_tax}`}
                    title="Total Tax"
                    image="home-1"
                  />

                  <ReportsCard
                    total={`$${graphData?.data?.data?.sales_reports?.total_commissions}`}
                    title="Total Commission"
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
                  <DonutChart data={salesChartData} />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-9 space-y-5">
                <div className="grid grid-cols-3 gap-5">
                  <ReportsCard
                    total={graphData?.data?.data?.orderReports?.totalOrders}
                    title="Total Orders"
                    image="home-1"
                  />

                  <div className="bg-white px-2.5 py-5 rounded-md shadow-lg space-y-3">
                    <div className="flex flex-col gap-3 justify-center items-center">
                      <div>
                        <img
                          src={`/images/home-1.webp`}
                          alt={`card-1`}
                          className="w-20 h-16 object-contain"
                        />
                      </div>
                      <div className="text-2xl font-medium text-center font-norms">
                        $
                        {graphData?.data?.data?.orderReports?.totalOrdersAmount}
                      </div>
                      <div className="text-base font-medium text-center font-norms">
                        Total Order Amount
                      </div>
                    </div>

                    <div className="flex justify-center gap-5">
                      <div className="">
                        <div className="text-themeGreen text-xl font-norms font-bold text-center">
                          $
                          {
                            graphData?.data?.data?.orderReports
                              ?.completeOrdersEarning
                          }
                        </div>
                        <div className="text-center font-medium">Completed</div>
                      </div>
                      <div className="">
                        <div className="text-themeBlue text-xl font-norms font-bold text-center">
                          $
                          {graphData?.data?.data?.orderReports?.notCompleteEarning.toFixed(
                            2
                          )}
                        </div>
                        <div className="text-center font-medium">
                          Incomplete
                        </div>
                      </div>
                      <div className="">
                        <div className="text-themeRed text-xl font-norms font-bold text-center">
                          $
                          {graphData?.data?.data?.orderReports?.cancelledOrdersEarning.toFixed(
                            2
                          )}
                        </div>
                        <div className="text-center font-medium">Rejected</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white px-2.5 py-5 rounded-md shadow-lg space-y-3">
                    <div className="flex flex-col gap-3 justify-center items-center">
                      <div>
                        <img
                          src={`/images/home-1.webp`}
                          alt={`card-1`}
                          className="w-20 h-16 object-contain"
                        />
                      </div>
                      <div className="text-2xl font-medium text-center font-norms">
                        ${graphData?.data?.data?.orderReports?.discountAmount}
                      </div>
                      <div className="text-base font-medium text-center font-norms">
                        Total Discount Given
                      </div>
                    </div>

                    <div className="flex justify-between gap-5">
                      <div className="">
                        <div className="text-themeGreen text-xl font-norms font-bold text-center">
                          $0
                        </div>
                        <div className="text-center font-medium">
                          Coupon Discount
                        </div>
                      </div>

                      <div className="">
                        <div className="text-themeBlue text-xl font-norms font-bold text-center">
                          $0
                        </div>
                        <div className="text-center font-medium">
                          Product Discount
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-md shadow-lg">
                  <Line options={options} data={data} />
                </div>
              </div>

              <div className="col-span-3 bg-white p-2.5 rounded-md shadow-lg space-y-10">
                <div className="space-y-2">
                  <h3 className="text-xl text-black font-semibold font-norms text-center">
                    Order Types
                  </h3>
                  <p className="text-themeBorderGray font-medium font-switzer text-sm text-center">
                    Distribution of all successful orders for both pickup and
                    delivery
                  </p>
                </div>

                <div>
                  <DonutChart data={orderChartData} />
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}
