const Login = () => {
    const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000';

    const handleGoogle = () => {
        window.open(`${BACKEND_URL}/auth/google`, '_self');
    };

    const handleGithub = () => {
        window.open(`${BACKEND_URL}/auth/github`, '_self');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-950">
            <div className="bg-white max-w-md p-8 rounded-lg shadow-md">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Casino.100x</h1>
                <button className="flex items-center justify-center w-full h-12 bg-gray-800 text-white rounded-md mb-4 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={handleGithub}>
                    <img src="https://i.ibb.co/6wr4xtn/github-removebg-preview.png" alt="github" className="w-12 mr-2" />
                    <span className="text-lg">Sign in with GitHub</span>
                </button>
                <button className="flex items-center justify-center w-full h-12 bg-white text-black rounded-md border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={handleGoogle}>
                    <img src="https://i.ibb.co/yYpmGLB/google.png" alt="google" className="w-8 mr-4" />
                    <span className="text-lg">Sign in with Google</span>
                </button>
                <p className="text-sm text-center mt-4 text-gray-600">By signing in, you agree to our Terms and Privacy Policy.</p>
            </div>
        </div>
    );
}

export default Login;




