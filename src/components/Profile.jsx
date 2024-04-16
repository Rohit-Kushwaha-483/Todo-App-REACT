import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "./Loader";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-800 text-white p-4 shadow-md mt-16"> {/* Add margin-top to push content below the header */}
      <h1 className="text-2xl font-bold mb-2">{user?.name}</h1>
      <p className="text-gray-300">{user?.email}</p>
    </div>
  );
};

export default Profile;
