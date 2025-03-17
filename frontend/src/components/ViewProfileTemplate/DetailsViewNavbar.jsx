import { Link } from "react-router-dom";
import { roleProfile, editProfileVector } from "../../assets/assets";

const userName = "S.P.Chanuka Dasun";
const indexNo = "224189M";

const DetailsViewNavbar = () => {
  return (
    <div className="w-80 min-h-[500px] bg-gradient-to-b from-purple-400 to-blue-600 p-6 rounded-2xl flex flex-col items-center shadow-lg">
      <div className="lex items-center justify-center">
        <img src={roleProfile} alt="roleProfileImg" className="w-30 h-30" />
      </div>
      <div className="mt-4 text-center text-white">
        <p className="text-lg font-semibold">{userName}</p>
        <p className="text-sm">{indexNo}</p>
      </div>
      <EditProfileBtn urlPath={"/editProfile"} />
    </div>
  )
}

const EditProfileBtn = ({urlPath}) => {
  return (
    <Link to={urlPath} className="mt-6 flex items-center gap-2 bg-gradient-to-b text-gray-700 px-4 py-2">
      <img src={editProfileVector} alt="Edit Icon" className="w-5 h-5" />
      <span className="font-medium">Edit Profile</span>
    </Link>
  )
}

export default DetailsViewNavbar;