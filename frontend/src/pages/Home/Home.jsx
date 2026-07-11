import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">
        JWT Authentication App
      </h1>

      <p className="text-gray-600">
        Learn JWT Authentication using React and Node.js
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;