import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddUser.css'; // Import the CSS file
import Navbar from '../Navbar/Navbar';

const AddUser = () => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('visiteur'); // Default role
    const [error, setError] = useState('');
    const [existingEmails, setExistingEmails] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8035/api/users');
                const emails = response.data.map(user => user.email);
                setExistingEmails(emails);
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (existingEmails.includes(email)) {
            setError('Cet email est déjà utilisé');
            return;
        }

        try {
            await axios.post('http://localhost:8035/api/users', {
                nom,
                email,
                password,
                role,
            });
            navigate('/users');
        } catch (error) {
            alert('Échec de l\'ajout de l\'utilisateur');
        }
    };

    return (
        <div > <Navbar/>
        <div className="add-user-container">
            <h2>Ajouter un Utilisateur</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="add-user-form">
                <input
                    type="text"
                    placeholder="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
                    <option value="admin">Admin</option>
                    <option value="visiteur">Visiteur</option>
                </select>
                <button type="submit" className="submit-button">Ajouter</button>
            </form>
        </div></div>
    );
};

export default AddUser;
