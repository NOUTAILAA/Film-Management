// src/components/EditFilm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const EditFilm = () => {
    const { id } = useParams();
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [genreId, setGenreId] = useState('');
    const [genres, setGenres] = useState([]);
    const [currentImage, setCurrentImage] = useState(''); // State for displaying the current image
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const response = await axios.get(`http://localhost:8035/api/films/${id}`);
                const { titre, description, genre, image } = response.data;
                setTitre(titre);
                setDescription(description);
                setGenreId(genre ? genre.id : '');
                setCurrentImage(image); // Store current image URL
            } catch (error) {
                setError('Erreur lors du chargement des détails du film');
            }
        };

        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:8035/api/genres');
                setGenres(response.data);
            } catch (error) {
                setError('Erreur lors de la récupération des genres');
            }
        };

        fetchFilm();
        fetchGenres();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8035/api/films/${id}`, {
                titre,
                description,
                genre: { id: genreId },
                image: currentImage, // Keep the current image intact
            });
            alert('Film modifié avec succès');
            navigate(`/films/${id}`); // Redirect back to film details after editing
        } catch (error) {
            setError('Erreur lors de la modification du film');
        }
    };

    return (
        <div style={styles.container}>
        <Navbar/>
            <h2>Modifier le Film</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Titre:</label>
                    <input
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Genre:</label>
                    <select
                        value={genreId}
                        onChange={(e) => setGenreId(e.target.value)}
                        required
                        style={styles.select}
                    >
                        <option value="">Sélectionner un genre</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.nom}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label>Image Actuelle:</label>
                    {currentImage && <img src={currentImage} alt="Film" style={styles.imagePreview} />}
                </div>
                <button type="submit" style={styles.button}>Modifier Film</button>
            </form>
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        fontSize: '1em',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
    },
    textarea: {
        height: '100px',
        resize: 'none',
    },
    select: {
        padding: '10px',
        fontSize: '1em',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
    },
    button: {
        padding: '10px 15px',
        fontSize: '1.1em',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        alignSelf: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    imagePreview: {
        marginTop: '10px',
        maxWidth: '100%',
        maxHeight: '200px',
    },
};

export default EditFilm;
