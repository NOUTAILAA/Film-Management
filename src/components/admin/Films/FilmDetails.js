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
    const [hasLiked, setHasLiked] = useState(false); // Track if the user has liked the film
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const response = await axios.get(`http://localhost:8035/api/films/${id}`);
                setFilm(response.data);
                await fetchLikesCount(response.data.id);
                await fetchComments();
            } catch (error) {
                setError('Erreur lors du chargement des détails du film');
            } finally {
                setLoading(false);
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

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8035/api/films/${id}`);
            alert('Film supprimé avec succès');
            navigate('/films');
        } catch (error) {
            alert('Erreur lors de la suppression du film');
        }
    };

    const handleEdit = () => {
        navigate(`/films/edit/${id}`);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8035/api/comments`, {
                film: { id },
                contenu: newComment,
                user: { id: 1 },
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            alert('Erreur lors de l\'ajout du commentaire');
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
            
            <button onClick={handleEdit} style={styles.editButton}>Modifier</button>
            <button onClick={handleDelete} style={styles.deleteButton}>Supprimer</button>

            <div style={styles.commentsContainer}>
                <h2>Commentaires</h2>
                
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
    editButton: {
        marginRight: '10px',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    deleteButton: {
        padding: '10px 20px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    
    commentsContainer: {
        marginTop: '20px',
        textAlign: 'left',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
    },
    commentForm: {
        marginBottom: '10px',
    },
    commentInput: {
        width: '100%',
        height: '60px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        resize: 'none',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#2196F3',
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
