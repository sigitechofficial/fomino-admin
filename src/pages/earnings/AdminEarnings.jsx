import React from "react";
import Layout from "../../components/Layout";
import GetAPI from "../../utilities/GetAPI";
import EarningCards from "../../components/EarningCards";
import Loader from "../../components/Loader";

export default function AdminEarnings() {
  const { data } = GetAPI("admin/all_earnings");

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="bg-themeGray p-5 space-y-5">
          <div className="">
            <h2 className="text-themeRed text-lg font-bold font-norms">
              Admin Earnings
            </h2>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Overall Revenue
              </h4>
              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Total Revenue Overview"
                  earning={data?.data?.admin_total_earning}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Admin Revenue Breakdown by payment method
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Earning from Online Payment"
                  earning={data?.data?.totalAdminEarningsOnline}
                />
                <EarningCards
                  title="Earning from COD"
                  earning={data?.data?.totalAdminEarningsCOD}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Revenue From Service Charges
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Service Charges"
                  earning={data?.data?.total_services_charges}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Platform Earnings from Delivery Charges
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Total Delivery Charges Collected"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
