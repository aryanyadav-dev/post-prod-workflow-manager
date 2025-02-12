// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext.tsx';
// import { useNavigate } from 'react-router-dom';
//
// export const Login: React.FC = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { login } = useAuth();
//     const navigate = useNavigate();
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await login(username, password);
//             navigate('/projectdashboard');
//             // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         } catch (err) {
//             setError('Invalid credentials');
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//                 required
//             />
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
//             />
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <button type="submit">Login</button>
//         </form>
//     );
// };

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/projman');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 relative">

            <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center">WELCOME BACK!</h1>
                <p className="text-center text-gray-600">Enter your credentials to access your account</p>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            //type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <button type="submit" className="w-full bg-[#2D2B58] hover:bg-[#1F1D3F] text-white py-2 px-4 rounded-md">
                        Login
                    </button>
                </form>
            </div>
            <div className="absolute right-0 w-[893px] h-[1188px]">
                <img src="/Rectangle 10.svg" alt="Login" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default Login;
