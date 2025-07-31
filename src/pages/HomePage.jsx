import styles from './styles/HomePage.module.css';
import NavbarHome from '../components/NavBarComp.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

import picHome1 from './assets/Home/picHome1.jpg';
import picHome2 from './assets/Home/picHome2.jpg';
import picHome3 from './assets/Home/picHome3.jpg';


const HomePage = () => {
    // console.log('Datos del localStorage:', {
    //     authToken: localStorage.getItem('authToken'),
    //     patientId: localStorage.getItem('patientId'),
    //     currentUser: localStorage.getItem('currentUser'),
    //     patientName: localStorage.getItem('patientName'),
    // });

    return (
        <>
            <NavbarHome />
            <div className={styles.container}>
                <div className="d-flex justify-content-around">
                    <Card className={styles.card}>
                        <Card.Body className={styles.panel_body}>
                            <Card.Title className={styles.panel_title}>Medical and Clinical Center</Card.Title>
                            <Card.Text className={styles.panel_text}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio dolores soluta vel, labore eveniet natus autem sint expedita! Deserunt magni dolor tempore totam recusandae aperiam nulla, ab molestiae tenetur ipsa, vitae at aspernatur distinctio voluptate odit fugit? Error ea explicabo nesciunt ullam, nihil deserunt temporibus distinctio soluta, cupiditate veritatis mollitia accusamus omnis! Veniam sit corporis ratione explicabo expedita cumque asperiores. Temporibus eligendi necessitatibus quaerat aliquid. A numquam molestias quidem? Aliquam est explicabo harum reiciendis ducimus tempore eveniet perferendis optio non! Id saepe accusamus voluptate tempora, consequuntur obcaecati laborum dolor magni minima sed, quis, perspiciatis omnis ullam! Repellat hic beatae ea!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className={styles.imageContainer}>
                    <Container>
                        <Row className={styles.row}>
                            <Col md={{ offset: 0 }}>
                                <Image src={picHome1} roundedCircle className={styles.image} />
                            </Col>

                        </Row>
                        <Row>
                            <Col md={{ offset: 5 }}>
                                <Image src={picHome2} roundedCircle className={styles.image} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ offset: 0 }}>
                                <Image src={picHome3} roundedCircle className={styles.image} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div >
        </>
    );
}

export default HomePage;