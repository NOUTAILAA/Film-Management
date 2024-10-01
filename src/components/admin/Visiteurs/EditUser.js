import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
    const { userId } = useParams();
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('visiteur'); // Default role
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8035/api/users/${userId}`);
                setNom(response.data.nom);
                setEmail(response.data.email);
                setRole(response.data.role);
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.put(`http://localhost:8035/api/users/${userId}`, {
                nom,
                email,
                role,
            });
            navigate('/users');
        } catch (error) {
            setError('Échec de la mise à jour de l\'utilisateur');
        }
    };

    return (
        <div className="container">
            <h2>Modifier un Utilisateur</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
            <label>Nom : </label>

                <input
                    type="text"
                    placeholder="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                />
                <label>Email : </label>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Choisir Role :</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                
                    <option value="admin">Admin</option>
                    <option value="visiteur">Visiteur</option>
                </select>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default EditUser;
