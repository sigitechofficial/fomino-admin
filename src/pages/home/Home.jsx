import React from "react";
import Layout from "../../components/Layout";
import GetAPI from "../../utilities/GetAPI";
import HomeCards from "../../components/HomeCards";
import LineChart from "../../components/LineChart";
import { DonutChart } from "../../components/DonutChart";

export default function Home() {
  const { data } = GetAPI("admin/statsadmin");

  const homeChartData = {
    labels: ["Preparing Orders", "Ready for Pick Up", "Order Placed"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 12, 12],
        backgroundColor: ["#FF5329", "#79E0AC", "#379465"],
        borderColor: ["#FF5329", "#79E0AC", "#379465"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout
      content={
        <div className="bg-themeGray p-5 space-y-5">
          <div className="">
            <h2 className="text-themeRed text-lg font-bold font-norms">
              Dashboard
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-9 space-y-5">
              <div className="grid grid-cols-3 gap-5">
                <HomeCards
                  title="Store Reports"
                  image="1"
                  to="/store-reports"
                />
                <HomeCards
                  title="Restaurant Reports"
                  image="1"
                  to="/restaurant-reports"
                />
                <HomeCards
                  title="Customer Analytics"
                  image="2"
                  to="/customer-analytics"
                />
                <HomeCards
                  title="Order Metrics"
                  image="3"
                  to="/order-metrics"
                />
                <HomeCards
                  title="Sales Reports"
                  image="4"
                  to="/sale-reports"
                />
                {/* <HomeCards
                  title="User Feedback"
                  image="5"
                  to="/user-feedback"
                /> */}
              </div>

              <div className="bg-white p-2.5 rounded-md shadow-lg">
                <LineChart />
              </div>
            </div>

            <div className="col-span-3 bg-white p-2.5 rounded-md shadow-lg space-y-10">
              <div className="space-y-2">
                <h3 className="text-xl text-black font-medium font-norms text-center">
                  Overview Of Order Statuses
                </h3>
                <p className="text-themeBorderGray font-medium font-switzer text-center">
                  Of all orders till today
                </p>
              </div>

              <div>
                <DonutChart data={homeChartData} />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
