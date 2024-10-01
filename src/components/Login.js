// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8035/api/users/login', {
                email,
                password,
            });
            const user = response.data;

            // Save user data to local storage
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'admin') {
                navigate('/films');
            } else {
                navigate('/visitfilms');
                console.log(user);
            }

        } catch (err) {
            setError('Erreur lors de la connexion. Veuillez vérifier vos informations.');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Connexion</h1>
            {error && <div style={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Se connecter</button>
            </form>
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        width: '200px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
};

export default Login;
