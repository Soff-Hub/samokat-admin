import React, { useEffect, useState } from "react";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import ChartComponent from "components/shared/chart";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function Dashboard() {
  const [data, setData] = useState(null);

  const getData = async () => {
    await Client.get(API_ENDPOINTS.DASHBOARD)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="md:w-1/2 w-1/4  flex flex-col xl:gap-12 justify-between  border p-4 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="lg:text-[18px] ms:text-[16px] sm:text-[14px] block font-semibold text-slate-900">
                Bugungi daromad
              </span>
            </p>
            <i
              style={{ color: "#FFC107  ", fontSize: "28px" }}
              className="fa-solid fa-money-check-dollar"
            ></i>
          </div>
          <p className="text-[16px]">
            <i
              style={{ color: "#FFC107" }}
              className="fa-solid fa-coins mr-1"
            ></i>
            {data?.todays_amount}
          </p>
        </div>
        <div className="md:w-1/2 w-1/4  flex flex-col xl:gap-12 justify-between  border p-4 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="lg:text-[18px] ms:text-[16px] sm:text-[14px] block font-semibold text-slate-900">
                Jami daromad
              </span>
            </p>
            <i
              style={{ color: "#FFC107  ", fontSize: "28px" }}
              class="fa-solid fa-sack-dollar"
            ></i>
          </div>
          <p className="text-[16px]">
            <i style={{ color: "#FFC107" }} className="fa-solid fa-coins"></i>{" "}
            {data?.total_amount}
          </p>
        </div>
        <div className="md:w-1/2 w-1/4  flex flex-col xl:gap-12 justify-between  border p-4 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="lg:text-[18px] ms:text-[16px] sm:text-[14px] block font-semibold text-slate-900">
                Oxirgi 30 kunlik
              </span>
            </p>
            <i
              style={{ color: "#FFC107  ", fontSize: "28px" }}
              className="fa-solid fa-money-bill-trend-up"
            ></i>
          </div>
          <p className="text-[16px]">
            <i style={{ color: "#FFC107" }} className="fa-solid fa-coins"></i>
            {data?.total_for_last_month}
          </p>
        </div>
        <div className="md:w-1/2 w-1/4  flex flex-col xl:gap-12 justify-between  border p-4 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="lg:text-[18px] ms:text-[16px] sm:text-[14px] block font-semibold text-slate-900">
                Sotilgan mahsulotning soni
              </span>
            </p>
            <i
              style={{ color: "#FFC107  ", fontSize: "28px" }}
              className="fa-solid fa-list-ol"
            ></i>
          </div>
          <p className="text-[16px]">
            <i style={{ color: "#FFC107" }} className="fa-solid fa-coins"></i>{" "}
            {data?.total_sold_products}
          </p>
        </div>
      </div>
      {1 ? (
        <>
          <ChartComponent />
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            wdith: "100%",
            justifyContent: "center",
            padding: "150px 0",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
