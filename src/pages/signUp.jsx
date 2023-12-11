import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  let data; // Declare data outside the try block

  try {
    setLoading(true);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    data = await res.json();
    setLoading(false);
  } catch (error) {
    setLoading(false);
    setError(error.message);
    
  }

  if (data && data.success === false) {
    setError(data.message);
  }
   else {
      // Clear form after successful sign-up
      setFormData({});
      console.log(data);
      // Redirect to sign-in page after successful sign-up
      navigate('/sign-in');
    }

  // Clear form after successful sign-up
 
  setFormData({});
  console.log(data);
};
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8'>Sign Up </h1>

      {/* Display error message if there is an error */}
      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/signIn'}>
          <span className='text-blue-700'>SignIn</span>
        </Link>
      </div>
     </div>
  );
}
