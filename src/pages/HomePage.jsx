import styles from './styles/HomePage.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import picHome1 from '../assets/picHome1.jpg';
import picHome2 from '../assets/picHome2.jpg';
import picHome3 from '../assets/picHome3.jpg';

const HomePage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.panel_text}>
                <h1>Medical and Clinical Center</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ratione aperiam suscipit magni nihil. Qui voluptas quos quidem asperiores. Voluptates adipisci, molestias voluptas similique, fuga est nemo quis magnam quibusdam voluptatum explicabo nam accusantium doloribus eligendi illo! Magnam, a cupiditate magni dicta aut id quae sunt culpa delectus temporibus consectetur quod quidem quia, atque tempore nemo, sequi debitis. Atque quod molestias eaque est minus numquam? Totam ullam voluptatem accusantium nostrum quod possimus beatae rem. Nulla odio voluptate harum quam, totam itaque architecto cumque ducimus sed facere vitae exercitationem, ut quod optio. Officia alias in neque ut, debitis dolores labore aperiam!</p>
            </div>
            <div>
                <Container>
                    <Row className={styles.row}>
                        <Col md={4}>
                            <Image src={picHome1} roundedCircle className={styles.image} />
                        </Col>

                    </Row>
                    <Row>
                        <Col md={{ span: 6, offset: 6 }}>
                            <Image src={picHome2} roundedCircle className={styles.image} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Image src={picHome3} roundedCircle className={styles.image} />
                        </Col>
                    </Row>
                </Container>
            </div>



        </div>
    );
}

export default HomePage;