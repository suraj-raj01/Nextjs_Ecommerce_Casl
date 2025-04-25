'use client'
export default function Home() {
    return(
        <>
        <div className="h-135">
        {/* <h1>Vendor Dashboard Layout</h1> */}
        <h2>Welcome <span className="text-red-600">{localStorage.getItem("name")}</span></h2>
        </div>
        </>
    )
}