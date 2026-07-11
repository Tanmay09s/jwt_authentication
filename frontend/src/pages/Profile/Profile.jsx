import useAuth from "../../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome back,
          <span className="font-semibold text-blue-600">
            {" "}{user.name}
          </span>
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-3">
              Account Information
            </h2>

            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>User ID:</strong> {user._id}
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-3">
              Authentication Status
            </h2>

            <p className="text-green-600 font-semibold">
              ✅ Logged In
            </p>

            <p className="mt-2 text-gray-600">
              Your session is currently active.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;