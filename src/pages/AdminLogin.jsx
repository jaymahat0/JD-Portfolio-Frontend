function AdminLogin() {
    return (
        <div className="max-w-md mx-auto p-8 mt-10 shadow-lg rounded-lg bg-white">

            <h1 className="text-3xl font-bold text-center mb-6">
                Admin Login
            </h1>

            <form className="space-y-4">

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded"
                />

                <button
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default AdminLogin;