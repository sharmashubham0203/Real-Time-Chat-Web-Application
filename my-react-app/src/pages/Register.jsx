import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const register = async (event) => {
    event.preventDefault();
    setMessage(null);

    const jsonData = { username, email, password };

    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    };

    try {
      const req = await fetch('http://127.0.0.1:1337/api/auth/local/register', reqOptions);
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        return;
      }

      if (res.jwt && res.user) {
        setMessage('Successful registration.');
        navigate('/chatroom'); // Navigate to chatroom
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='flex flex-wrap w-full h-screen bg-slate-100'>
        <div className='flex justify-center items-center w-full sm:w-1/2 p-4'>
            <img className='w-full md:w-9/12 rounded-xl' src="/image1.jpg" alt="Image Not Found" />
        </div>
        <div className='flex flex-col justify-center items-center w-full sm:w-1/2 p-4 gap-10'>
            <h1 className="text-blue-500 font-serif text-4xl sm:text-5xl md:text-6xl text-center">
                ChatterBox
            </h1>
            <div className="w-full sm:w-8/12 lg:w-6/12 p-6 border rounded-lg shadow-md bg-blue-100">
                <form onSubmit={register} className="space-y-4">
                    <h2 className="text-lg font-bold text-center">Register</h2>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 focus:outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 focus:outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Register
                    </button>

                    {message && <div className="text-red-500 mt-2">{message}</div>}

                    <div className="form-footer mt-4 text-sm text-center">
                        <p>
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-blue-500 underline hover:text-blue-600"
                            >
                                Login here
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}
