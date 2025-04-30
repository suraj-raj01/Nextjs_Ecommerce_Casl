"use client"
import MyLineChart from "../_components/Chart";

export default function Home() {
    return(
        <>
        <div className="h-135">
        <div className="w-full h-auto p-2 bg-gray-100 flex flex-wrap items-center content-center gap-4">
            <div className="w-45 bg-white h-20 ml-2"></div>
            <div className="w-45 bg-white h-20"></div>
            <div className="w-45 bg-white h-20"></div>
            <div className="w-45 bg-white h-20"></div>
            <div className="w-45 bg-white h-20"></div>
            <div className="w-45 bg-white h-20"></div>
        </div>
        <MyLineChart/>
        </div>
        </>
    )
}