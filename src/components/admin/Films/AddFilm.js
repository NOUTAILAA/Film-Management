// src/components/AddFilm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddFilm = () => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [genreId, setGenreId] = useState('');
    const [imageData, setImageData] = useState(null); // État pour l'image
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Récupérer la liste des genres
        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:8035/api/genres');
                setGenres(response.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des genres:', err);
            }
        };
        fetchGenres();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageData(reader.result); // Convertir l'image en base64
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const newFilm = {
            titre,
            description,
            genre: { id: genreId },
            imageData: imageData ? imageData.split(',')[1] : null, // Extraire la partie base64
        };

        try {
            const response = await axios.post('http://localhost:8035/api/films', newFilm);
            console.log('Film ajouté:', response.data);
            // Réinitialiser le formulaire après succès
            setTitre('');
            setDescription('');
            setGenreId('');
            setImageData(null);
        } catch (err) {
            setError('Erreur lors de l\'ajout du film. Veuillez réessayer.');
            console.error(err);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Ajouter un Film</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Titre:</label>
                    <input
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ ...styles.input, ...styles.textarea }}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Genre:</label>
                    <select
                        value={genreId}
                        onChange={(e) => setGenreId(e.target.value)}
                        style={styles.select}
                        required
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
                    <label style={styles.label}>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Ajouter Film</button>
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
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '1.5em',
        color: '#333',
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
    label: {
        marginBottom: '5px',
        fontSize: '1em',
        color: '#555',
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
    buttonHover: {
        backgroundColor: '#45a049',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
};

export default AddFilm;
