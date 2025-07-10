import styles from './styles/HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.container}>
            <h1>Bienvenido al Centro de Salud</h1>
            <p>Esta es la página de inicio del Centro de Salud.</p>
            <p>Aquí puedes encontrar información sobre nuestros servicios, horarios y más.</p>
        </div>
    );
}

export default HomePage;