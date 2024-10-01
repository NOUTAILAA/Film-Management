import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListFilm.css';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [likedFilms, setLikedFilms] = useState(new Set());

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

        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:8035/api/genres');
                setGenres(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des genres', error);
            }
        };

        const checkUser = async () => {
            const loggedInUser = localStorage.getItem('user');
            if (loggedInUser) {
                const user = JSON.parse(loggedInUser);
                setUser(user);

                // Fetch liked films for the logged-in user
                try {
                    const likedResponse = await axios.get(`http://localhost:8035/api/likes/user/${user.id}`);
                    const likedFilmIds = new Set(likedResponse.data.map(like => like.film.id));
                    setLikedFilms(likedFilmIds);
                } catch (error) {
                    console.error('Erreur lors du chargement des films aimés:', error);
                }
            } else {
                setUser(null);
            }
        };

        fetchFilms();
        fetchGenres();
        checkUser();
    }, []);

    const handleLike = async (filmId) => {
        if (!user) {
            alert("Veuillez vous connecter pour aimer un film.");
            return;
        }

        if (likedFilms.has(filmId)) {
            try {
                await axios.delete(`http://localhost:8035/api/likes/${filmId}`, {
                    data: { userId: user.id }
                });
                setLikedFilms(prev => {
                    const newLikedFilms = new Set(prev);
                    newLikedFilms.delete(filmId);
                    return newLikedFilms;
                });
                alert("J'aime retiré avec succès !");
            } catch (error) {
                console.error(error);
                alert("Erreur lors de la suppression du j'aime.");
            }
        } else {
            try {
                await axios.post('http://localhost:8035/api/likes', {
                    film: { id: filmId },
                    user: { id: user.id }
                });
                setLikedFilms(prev => new Set(prev).add(filmId));
                alert("Film aimé avec succès !");
            } catch (error) {
                console.error(error);
                alert("Erreur lors de l'ajout du j'aime.");
            }
        }
    };

    if (loading) return <div style={styles.loading}>Chargement des films...</div>;
    if (error) return <div style={styles.error}>{error}</div>;

    const filteredFilms = selectedGenre
        ? films.filter((film) => film.genre?.id === parseInt(selectedGenre))
        : films;

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Liste des Films</h1>
            <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                style={styles.select}
            >
                <option value="">Tous les genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.nom}
                    </option>
                ))}
            </select>
            <div style={styles.cardContainer}>
                {filteredFilms.map(film => (
                    <div key={film.id} style={styles.card}>
                        <Link to={`/visitfilms/${film.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                            <h3 style={styles.title}>{film.titre}</h3>
                            <p style={styles.description}>{film.description}</p>
                            <p><strong>Genre :</strong> {film.genre ? film.genre.nom : 'N/A'}</p>
                            {film.imageData ? (
                                <img src={`data:image/jpeg;base64,${film.imageData}`} alt={film.titre} style={styles.image} />
                            ) : (
                                <p>Aucune image disponible</p>
                            )}
                        </Link>
                        <div className="heart-container" title="Like">
                            <input
                                type="checkbox"
                                className="checkbox"
                                id={`like-${film.id}`}
                                checked={likedFilms.has(film.id)}
                                onChange={() => handleLike(film.id)}
                            />
                            <div className="svg-container" style={{ fill: likedFilms.has(film.id) ? 'red' : 'none' }}>
                                <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
                                </svg>
                                <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
                                </svg>
                                <svg className="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="10,10 20,20" />
                                    <polygon points="10,50 20,50" />
                                    <polygon points="20,80 30,70" />
                                    <polygon points="90,10 80,20" />
                                    <polygon points="90,50 80,50" />
                                    <polygon points="80,80 70,70" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Styles pour les composants
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.5em',
        marginTop: '20px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: '20px',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    select: {
        margin: '20px auto',
        padding: '10px',
        fontSize: '1em',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: '#fff',
        width: '200px',
        textAlign: 'center',
        position: 'relative',
    },
    title: {
        fontSize: '1.2em',
        marginBottom: '10px',
    },
    description: {
        fontSize: '0.9em',
        color: '#555',
        marginBottom: '10px',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '5px',
    },
};

export default FilmList;
