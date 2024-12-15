import React, { useContext, useState } from "react";
import { AuthContext } from "../utils/AuthContext";

const LoginSignupForm = () => {
  const { login,signup,user,handleLogout ,showModal,setShowModal} = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: isLogin ? "" : "DefaultUser", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login({ email: formData.email, password: formData.password });
    } else {
      await signup(formData);
    }
  };


const handleProfileClick = () => {
    setShowModal(true);
};
  return user ? (
    <div className="relative z-[9999999999999999]">
    <div
        className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer absolute right-0 top-1"
        onClick={handleProfileClick}
    >
        {user.userName[0].toUpperCase()}
    </div>

    {/* Modal for logout */}
    {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[99999999]">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
                <h3 className="text-xl mb-4 text-center">Welcome, {user.userName}</h3>
                <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-red-500 text-white rounded"
                >
                    Logout
                </button>
                <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-2 mt-2 bg-gray-200 text-gray-700 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    )}
</div>
    ) :(

        <div className="flex justify-center items-center h-screen backdrop-blur-2xl absolute w-full inset-0 z-[9999999]">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md absolute top-[20vh]">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 cursor-pointer hover:underline"
            >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
)
};

export default LoginSignupForm;
