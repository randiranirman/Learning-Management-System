import { useState } from "react";
import DetailsViewNavbar from "./DetailsViewNavbar";
import RightSideNavbar from "./RightSideNavbar";


const FullProfilePage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 p-4 flex justify-center">
        <DetailsViewNavbar />
      </div>
      <div className="w-2/3 p-6">
        <RightSideNavbar />
      </div>
    </div>
  )
}

export default FullProfilePage;
