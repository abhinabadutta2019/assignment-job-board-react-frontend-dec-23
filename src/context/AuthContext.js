import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();
//
const AuthContextProvider = ({ children }) => {
  //
  // const url = "http://localhost:3008";
  const url = "https://new-assignment-job-board-typescript.onrender.com";
  //
  const [user, setUser] = useState(null);
  //
  const [jobs, setJobs] = useState([]);
  // console.log(user, "user from AuthContext");
  //
  const [yourCreatedJobs, setYourCreatedJobs] = useState([]);
  //
  const fetchJobs = async () => {
    try {
      const response = await fetch(`${url}/jobs`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      //
      console.log(data, "data");
      //
      setJobs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //
  const fetchYourCreatedJobs = async () => {
    try {
      const response = await fetch(`${url}/jobs/yourCreatedJobs/${user.id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      //
      console.log(data, "data");
      //
      setYourCreatedJobs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    //
    setUser(userData);
  };
  //
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    console.log("Logout called");
  };
  //
  useEffect(() => {
    //
    const fetchUserLS = async () => {
      try {
        // console.log("calling fetchUserLS ");
        // const user = localStorage.getItem("user");
        // setUser(user);
        const userJSON = localStorage.getItem("user");
        if (userJSON) {
          const user = JSON.parse(userJSON);
          setUser(user);
        }
        //
      } catch (err) {
        console.error("Error fetching data in AuthContext:", err);
      }
      //
    };

    // console.log("user: in fetchUserLS ", user);
    // calling the function-
    fetchUserLS();
    //
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          login,
          url,
          logout,
          jobs,
          fetchJobs,
          yourCreatedJobs,
          fetchYourCreatedJobs,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthContext, AuthContextProvider };
