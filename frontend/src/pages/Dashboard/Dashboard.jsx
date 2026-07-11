import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getRandomJoke } from "../../services/jokeService";

function Dashboard() {
  const { user } = useAuth();

  const [joke, setJoke] = useState(null);
  const [loadingJoke, setLoadingJoke] = useState(false);
  const [error, setError] = useState("");

  const fetchJoke = async () => {
    try {
      setLoadingJoke(true);
      setError("");

      const data = await getRandomJoke();
      setJoke(data);
    } catch (err) {
      setError("Failed to load a joke. Please try again.");
    } finally {
      setLoadingJoke(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold">
            Welcome, {user?.name}! 👋
          </h1>

          <p className="mt-3 text-lg text-blue-100">
            You have successfully logged in using JWT Authentication.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Authentication Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Authentication Status
            </h2>

            <div className="space-y-3">
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-green-600 font-bold">
                  Logged In ✅
                </span>
              </p>

              <p>
                <span className="font-semibold">Current User:</span>{" "}
                {user?.name}
              </p>

              <p>
                <span className="font-semibold">Email:</span>{" "}
                {user?.email}
              </p>
            </div>
          </div>

          {/* Random Joke */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              😂 Random Joke
            </h2>

            {loadingJoke ? (
              <p className="text-gray-500">Loading joke...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <p className="font-semibold text-lg">
                  {joke?.setup}
                </p>

                <p className="mt-4 text-gray-700">
                  {joke?.punchline}
                </p>
              </>
            )}

            <button
              onClick={fetchJoke}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition cursor-pointer"
            >
              Generate Another Joke
            </button>
          </div>
        </div>

        {/* Quick Information */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            About This Project
          </h2>

          <p className="text-gray-700 leading-7">
            This dashboard demonstrates a complete JWT Authentication flow
            built with React, Context API, Axios, React Router, Node.js,
            Express.js, MongoDB, Mongoose, bcrypt, and JSON Web Tokens.
            Authentication state is managed globally using Context API, while
            protected routes ensure only authenticated users can access secure
            pages. The Random Joke section demonstrates integration with a
            third-party REST API.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;