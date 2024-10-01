import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddGenre.css'; // Ensure to create this CSS file

const AddGenre = () => {
    const [nom, setNom] = useState('');
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentGenreId, setCurrentGenreId] = useState(null);

    const fetchGenres = async () => {
        try {
            const response = await axios.get('http://localhost:8035/api/genres');
            setGenres(response.data);
        } catch (err) {
            setError('Erreur lors du chargement des genres');
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const newGenre = { nom };

        try {
            if (editMode) {
                const response = await axios.put(`http://localhost:8035/api/genres/${currentGenreId}`, newGenre);
                console.log('Genre mis à jour:', response.data);
                setEditMode(false);
                setCurrentGenreId(null);
            } else {
                const response = await axios.post('http://localhost:8035/api/genres', newGenre);
                console.log('Genre ajouté:', response.data);
            }
            setNom('');
            fetchGenres();
        } catch (err) {
            setError('Erreur lors de l\'ajout ou de la mise à jour du genre. Veuillez réessayer.');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8035/api/genres/${id}`);
            console.log('Genre supprimé');
            fetchGenres();
        } catch (err) {
            setError('Erreur lors de la suppression du genre');
        }
    };

    const handleEdit = (genre) => {
        setNom(genre.nom);
        setEditMode(true);
        setCurrentGenreId(genre.id);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">{editMode ? 'Modifier le Genre' : 'Ajouter un Genre'}</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                    <label htmlFor="nomGenre">Nom du Genre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nomGenre"
                        placeholder="Entrez le nom du genre"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {editMode ? 'Mettre à jour' : 'Ajouter Genre'}
                </button>
            </form>

            <h3>Liste des Genres</h3>
            {genres.length === 0 ? (
                <p className="text-muted">Aucun genre trouvé</p>
            ) : (
                <ul className="list-group">
                    {genres.map((genre) => (
                        <li key={genre.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{genre.nom}</span>
                            <div>
                                <button className="btn btn-secondary btn-sm mx-2" onClick={() => handleEdit(genre)}>
                                    Modifier
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(genre.id)}>
                                    Supprimer
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddGenre;
