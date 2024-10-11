"use client";

import Button from "@/components/ui/Button";

import {
  TTrafficListItem,
  deleteTraffic,
  getTrafficReport,
} from "@/actions/pageVisit/pageVisitServices";
import { useEffect, useState } from "react";

const convertTime = (time: Date) => {
  return (
    time.getFullYear() +
    "." +
    (time.getMonth() + 1).toLocaleString("en-us", { minimumIntegerDigits: 2 }) +
    "." +
    time.getDate().toLocaleString("en-us", { minimumIntegerDigits: 2 }) +
    "  --  " +
    time.getHours().toLocaleString("en-us", { minimumIntegerDigits: 2 }) +
    ":" +
    time.getMinutes().toLocaleString("en-us", { minimumIntegerDigits: 2 }) +
    ":" +
    time.getSeconds().toLocaleString("en-us", { minimumIntegerDigits: 2 })
  );
};

const TrafficView = () => {
  const [trafficList, setTrafficList] = useState<TTrafficListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTraffic = async () => {
    setIsLoading(true);
    const response = await getTrafficReport();
    if (response.res) {
      setTrafficList(response.res);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTraffic();
  }, []);

  const handleDeleteTraffic = async (id: string) => {
    setIsLoading(true);
    const response = await deleteTraffic(id);
    if (response.res) {
      getTraffic();
    }
  };

  return (
    <div className="text-lg text-gray-800 flex flex-col overflow-y-scroll">
      {trafficList.length > 0 ? (
        trafficList.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 p-3 rounded-lg even:bg-gray-100"
          >
            <div className="flex gap-4">
              <div className="w-44 text-center p-1 bg-white rounded border border-gray-300">
                {item.time ? convertTime(item.time) : ""}
              </div>
              <div className="w-40 text-center p-1 text-gray-600 rounded border border-gray-200">
                {item.pageType}
              </div>
              <div className="w-28 text-center p-1 rounded border border-blue-800">
                {item.deviceResolution}
              </div>
              <div className="w-52">{item.pagePath}</div>
              <div>
                {item.product &&
                  item.product?.category.name + " / " + item.product?.name}
              </div>
            </div>
            <div>
              <Button
                text="Delete"
                onClick={() => handleDeleteTraffic(item.id)}
                disabled={isLoading}
              />
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TrafficView;
