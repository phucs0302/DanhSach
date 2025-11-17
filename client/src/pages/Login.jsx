    import React, { useState, useContext } from 'react';
    import { AuthContext } from '../contexts/AuthContext'; // Adjust path if needed
    import { login } from '../api/authApi'; // Assuming you have an authApi with login function

    function Login() {
    const { login: authLogin } = useContext(AuthContext); // Rename to avoid conflict
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await login({ email, password }); // Call your API to get token
        authLogin(response.data.token, response.data.user); // Update context with token/user
        } catch (err) {
        setError('Login failed. Check credentials.');
        }
    };

    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            />
            <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        </div>
    );
    }

    export default Login; // Ensure default export here