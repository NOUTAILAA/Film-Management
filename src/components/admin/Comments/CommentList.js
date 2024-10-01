// src/components/CommentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CommentList.css';
import Navbar from '../Navbar/Navbar';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [filmFilter, setFilmFilter] = useState('');
  const [selectedComments, setSelectedComments] = useState(new Set()); // Track selected comments

  // Function to fetch comments from the API
  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:8035/api/comments');
      setComments(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des commentaires');
    }
  };

  useEffect(() => {
    fetchComments(); // Fetch comments when the component is mounted
  }, []);

  // Filter comments based on user and film input
  const filteredComments = comments.filter(comment => {
    const matchesUser = comment.user?.nom.toLowerCase().includes(userFilter.toLowerCase());
    const matchesFilm = comment.film?.titre.toLowerCase().includes(filmFilter.toLowerCase());
    return matchesUser && matchesFilm; // Both filters must match
  });

  // Handle selection of comments
  const handleSelectComment = (id) => {
    setSelectedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Function to delete selected comments
  const handleDeleteSelected = async () => {
    try {
      await Promise.all([...selectedComments].map(id => axios.delete(`http://localhost:8035/api/comments/${id}`)));
      alert('Commentaires supprimés avec succès');
      fetchComments(); // Refresh comments
      setSelectedComments(new Set()); // Clear selection
    } catch (err) {
      alert('Erreur lors de la suppression des commentaires');
    }
  };

  return (
    <div >
       <Navbar/>
    
    <div className="comment-list">
           

      <h2>Liste des Commentaires</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="filters">
        <input
          type="text"
          placeholder="Filtrer par nom d'utilisateur"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrer par titre de film"
          value={filmFilter}
          onChange={(e) => setFilmFilter(e.target.value)}
        />
      </div>

      {selectedComments.size > 0 && (
        <button onClick={handleDeleteSelected}>
          Supprimer les commentaires sélectionnés
        </button>
      )}

      {filteredComments.length === 0 ? (
        <p>Aucun commentaire trouvé</p>
      ) : (
        <ul>
          {filteredComments.map((comment) => (
            <li key={comment.id}>
              <input
                type="checkbox"
                checked={selectedComments.has(comment.id)}
                onChange={() => handleSelectComment(comment.id)}
              />
              <p><strong>{comment.user?.nom || 'Utilisateur inconnu'}</strong>: {comment.contenu}</p>
              <p><em>Film: {comment.film?.titre || 'Film inconnu'}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default CommentList;
