import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/users" style={styles.navLink}>Users</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/comments" style={styles.navLink}>Commentaires</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/films" style={styles.navLink}>Films</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/add-genre" style={styles.navLink}>Genre</Link>
                </li>
            </ul>
        </nav>
    );
};

// Styles for the component
const styles = {
    navbar: {
        backgroundColor: 'transparent',
        padding: '10px',
    },
    navList: {
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'space-around',
        margin: 0,
        padding: 0,
    },
    navItem: {
        margin: '0 10px',
    },
    navLink: {
        color: 'black',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default Navbar;
