import React from "react";
import Layout from "../../components/Layout";
import GetAPI from "../../utilities/GetAPI";
import EarningCards from "../../components/EarningCards";
import Loader from "../../components/Loader";

export default function DriverEarnings() {
  const { data } = GetAPI("admin/driver_earnings");

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="bg-themeGray p-5 space-y-5">
          <div className="">
            <h2 className="text-themeRed text-lg font-bold font-norms">
              Driver Earnings
            </h2>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Overall Delivery charges
              </h4>
              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Total Revenue Overview"
                  earning={data?.data?.overall_driver_earnings}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Components of Drivers Earning
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Earning from Deliveries"
                  earning={data?.data?.overall_delivery_fees}
                />
                <EarningCards
                  title="Tip Collected"
                  earning={data?.data?.tip_earning}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Drivers Earning breakdown (gross Earning include tips)
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Drivers Earning (store Employee)"
                  earning={data?.data?.store_driver_earning}
                />
                <EarningCards
                  title="Freelance Drivers Earning"
                  earning={data?.data?.freelance_earnings}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Cost and Deductions
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Total Admin commission from deliveries"
                  earning={data?.data?.earning_from_delivery_charges}
                />
                <EarningCards
                  title="Admin commission on deliveries done by store driver"
                  earning={data?.data?.adminCommision_from_restaurant_driver}
                />
                <EarningCards
                  title="Admin commission on deliveries done by Freelance drivers"
                  earning={data?.data?.adminCommision_from_freelancer_driver}
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
