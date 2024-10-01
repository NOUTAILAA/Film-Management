import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FilmDetail = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [likesCount, setLikesCount] = useState(0);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')); // Récupère l'utilisateur connecté


    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const response = await axios.get(`http://localhost:8035/api/films/${id}`);
                setFilm(response.data);
                await fetchComments();
                await fetchLikesCount(response.data.id); // Fetch likes count
            } catch (error) {
                setError('Erreur lors du chargement des détails du film');
            } finally {
                setLoading(false);
            }
        };

       

        const fetchLikesCount = async (filmId) => {
            try {
                const response = await axios.get(`http://localhost:8035/api/likes/count/${filmId}`);
                setLikesCount(response.data);
            } catch (error) {
                setError('Erreur lors du chargement des mentions j\'aime');
            }
        };

        fetchFilm();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Veuillez vous connecter pour ajouter un commentaire.");
            return;
        }
        
        try {
            const response = await axios.post(`http://localhost:8035/api/comments`, {
                film: { id },
                contenu: newComment,
                user: { id: user.id }, // Utilise l'ID de l'utilisateur connecté
            });
            setComments([...comments, response.data]);
            setNewComment('');
            await fetchComments(); // Refresh comments after adding a new one

        } catch (error) {
            alert('Erreur lors de l\'ajout du commentaire');
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8035/api/comments/film/${id}`);
            setComments(response.data);
        } catch (error) {
            setError('Erreur lors du chargement des commentaires');
        }
    };
    if (loading) return <div>Chargement des détails du film...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={styles.container}>
            <h1>{film.titre}</h1>
            {film.imageData ? (
                <img
                    src={`data:image/jpeg;base64,${film.imageData}`}
                    alt={film.titre}
                    style={styles.image}
                />
            ) : (
                <p>Aucune image disponible</p>
            )}
            <p><strong>Description :</strong> {film.description}</p>
            <p><strong>Genre :</strong> {film.genre ? film.genre.nom : 'N/A'}</p>
            <p><strong>Mentions J'aime :</strong> {likesCount}</p>
            

            <div style={styles.commentsContainer}>
                <h2>Commentaires</h2>
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Ajouter un commentaire"
                        style={styles.commentInput}
                    />
                    <button type="submit" style={styles.submitButton}>Envoyer</button>
                </form>
                <div style={styles.commentList}>
                    {comments.map(comment => (
                        <div key={comment.id} style={styles.comment}>
                            <p><strong>{comment.user.nom} :</strong> {comment.contenu}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        marginTop: '10px',
    },
    commentsContainer: {
        marginTop: '20px',
        textAlign: 'left',
    },
    commentInput: {
        width: '100%',
        height: '60px',
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    likeButton: {
        padding: '10px 20px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        marginRight: '10px',
    },
    unlikeButton: {
        padding: '10px 20px',
        backgroundColor: '#ff9800',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    commentList: {
        marginTop: '10px',
    },
    comment: {
        borderBottom: '1px solid #ccc',
        padding: '5px 0',
    },
};

export default FilmDetail;
