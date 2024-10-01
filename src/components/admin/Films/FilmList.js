// src/components/FilmList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await axios.get('http://localhost:8035/api/films');
                setFilms(response.data);
            } catch (error) {
                setError('Erreur lors du chargement des films');
            } finally {
                setLoading(false);
            }
        };

        fetchFilms();
    }, []);

    if (loading) return <div>Chargement des films...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
        <Navbar/>
            <h1>Liste des Films</h1>

            {/* Button to add a new film */}
            <div style={styles.addButtonContainer}>
                <Link to="/add-film" style={styles.addButton}>Ajouter un Film</Link>
            </div>

            <div style={styles.cardContainer}>
                {films.map(film => (
                    <Link key={film.id} to={`/films/${film.id}`} style={styles.card}>
                        <h3 style={styles.title}>{film.titre}</h3>
                        <p style={styles.description}>{film.description}</p>
                        <p><strong>Genre :</strong> {film.genre ? film.genre.nom : 'N/A'}</p>
                        {film.imageData ? (
                            <img
                                src={`data:image/jpeg;base64,${film.imageData}`}
                                alt={film.titre}
                                style={styles.image}
                            />
                        ) : (
                            <p>Aucune image disponible</p>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Styles for the components
const styles = {
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px', // Space between cards
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        width: '350px',
        height: '350px',
        backgroundColor: '#f9f9f9',
        overflow: 'hidden',
        textAlign: 'center',
        textDecoration: 'none', // Remove underline from link
        color: 'black',
    },
    title: {
        fontSize: '1.1em',
        margin: '0',
    },
    description: {
        fontSize: '0.9em',
        margin: '0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '3', // Limit to 3 lines
        WebkitBoxOrient: 'vertical',
    },
    image: {
        width: '100%',
        height: 'auto',
        marginTop: '5px',
    },
    // Styles for the add button
    addButtonContainer: {
        marginBottom: '20px',
        textAlign: 'right', // Align button to the right
    },
    addButton: {
        display: 'inline-block',
        backgroundColor: '#4CAF50', // Green background
        color: 'white', // White text
        padding: '10px 15px', // Button padding
        textDecoration: 'none', // Remove underline from link
        borderRadius: '5px', // Rounded corners
        fontSize: '1em',
    },
};

export default FilmList;
