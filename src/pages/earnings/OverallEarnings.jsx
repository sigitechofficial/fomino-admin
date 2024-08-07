import React from "react";
import Layout from "../../components/Layout";
import GetAPI from "../../utilities/GetAPI";
import EarningCards from "../../components/EarningCards";
import Loader from "../../components/Loader";

export default function OverallEarnings() {
  const { data } = GetAPI("admin/all_earnings");

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="bg-themeGray p-5 space-y-5">
          <div className="">
            <h2 className="text-themeRed text-lg font-bold font-norms">
              Overall Earnings
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
                Platform Revenue Breakdown by Payment Method
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Total COD Revenue Collected"
                  earning={data?.data?.totalAdminEarningsOnline}
                />
                <EarningCards
                  title="Platform's Earning from COD"
                  earning={data?.data?.totalAdminEarningsCOD}
                />
                <EarningCards
                  title="Total Online Payment Collected"
                  earning={data?.data?.totalAdminEarningsCOD}
                />
                <EarningCards
                  title="Platform's Earning From Online Payments"
                  earning={data?.data?.totalAdminEarningsCOD}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Admin Revenue Breakdown by Payment Method
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Earning From Online Payment"
                  earning={data?.data?.total_services_charges}
                />
                <EarningCards
                  title="Earning From COD"
                  earning={data?.data?.total_services_charges}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Commission from Store Item Sales
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Subtotal of Items Sales"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
                <EarningCards
                  title="Admin Commissions from Items Sales"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Platform Earnings From Delivery Charges
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Total Delivery Charges Collected"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
                <EarningCards
                  title="Total Delivery Fee Paid to Drivers"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
                <EarningCards
                  title="Admin commission From Delivery fee"
                  earning={data?.data?.admin_Total_deliveryFees}
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
                  earning={data?.data?.admin_Total_deliveryFees}
                />
                <EarningCards
                  title="Packaging Fee (Stores)"
                  earning={data?.data?.admin_Total_deliveryFees}
                />

              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Cost <span className="text-gray-500 text-sm">&#40;Deduction from Admin's Earning&#41;</span>
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Discounts and Promotional Costs"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Driver Earnings
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Total Earnings of Drivers"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
                <EarningCards
                  title="Earning Made by Store through Drivers"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
                <EarningCards
                  title="Earnings of Freelance-Drivers"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Payment Owned by Store to Admin
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Net Amount Owned to Restaurants"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Payment Owned by Admin to Store
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Net Amount Owned to Admin"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                COD Commission and Payments to Platform
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Total Commissions from COD"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Gross Store Earnings
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Overall Store Earnings"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Store Earning Breakdown by Payment Method
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Earning Through COD"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
                <EarningCards
                  title="Earning Through Online Payment"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
                Breakdown of Store Earning by Revenue Component
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Item Sales"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
                <EarningCards
                  title="Packing fee"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
                <EarningCards
                  title="Self Delivery"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-black text-lg font-bold font-norms">
               Commission from Stores Earnings
              </h4>

              <div className="grid grid-cols-3 gap-5">
                <EarningCards
                  title="Item Sales"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
                <EarningCards
                  title="Packing fee"
                  earning={data?.data?.admin_Total_deliveryFees}
                />
                <EarningCards
                  title="Self Delivery"
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
