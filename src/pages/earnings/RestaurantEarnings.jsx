import React from "react";
import Layout from "../../components/Layout";
import GetAPI from "../../utilities/GetAPI";
import EarningCards from "../../components/EarningCards";
import Loader from "../../components/Loader";

export default function RestaurantEarnings() {
  const { data } = GetAPI("admin/restaurant_earnings");

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="bg-themeGray p-5 space-y-5">
          <div className="">
            <h2 className="text-themeRed text-lg font-bold font-norms">
              Restaurant Earnings
            </h2>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Driver Earnings
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Overall Revenue"
                  earning={data?.data?.driver_earnings}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Restaurant Packing Fee
              </h4>
              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Restaurant Packing Fee"
                  earning={data?.data?.rest_packing_fee}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Restaurant Online Earnings
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Online Earnings"
                  earning={data?.data?.online_earnings}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Driver Revenue Breakdown by payment method
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Earning from COD"
                  earning={data?.data?.cod_earnings}
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
