import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';


import styles from './styles/LoginPage.module.css';
import NavbarHome from '../components/NavBarComp.jsx';

import picLogin from './assets/Login/picLogin.png';

const LoginPage = () => {
    return (
        <>
            <NavbarHome />
            <div className={styles.container}>

                <Form className={styles.form}>
                    <Container className={styles.imageContainer}>
                        <Row>

                            <Col xs={6} md={4}>
                                <Image src={picLogin} roundedCircle className={styles.image} />
                            </Col>

                        </Row>
                    </Container>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Nav>
                        <Button variant="primary" type="submit" className={styles.submitButton} href='/menupatient/schedule'>
                            login
                        </Button>
                    </Nav>
                </Form>
            </div>
        </>
    );
}
export default LoginPage;