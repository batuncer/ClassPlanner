import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "../../utils/axios";

const SignUpLessonButton = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [availableRoles, setAvailableRoles] = useState([]);

    const fetchRoles = async () => {
        try {
            const response = await axios.get("roles");
            const data = response.data;
            setAvailableRoles(data);
            if (data.length > 0) {
                setSelectedRole(data[0].id);
            }
        } catch (error) {
            console.error("Error fetching sign-up details:", error);
        }
    };

    const handleButtonClick = () => {
        setModalVisible(true);
        fetchRoles();
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleSignUpSubmit = async () => {
        const sessionId = props.sessionId;
        const role = selectedRole;

        try {
            const body = {
                sessionId: sessionId,
                role: role,
            };
            const response = await axios.post("insert-signup", body);
            setModalVisible(false);
            alert("You registered successfully. Good luck with your class!");
        } catch (error) {
            console.error("Error inserting sign-up:", error);
        }
        console.log("sessionId:", props.sessionId);
    };

    return (
        <>
            <Button
                variant="primary"
                onClick={handleButtonClick}
                style={{
                    backgroundImage: 'linear-gradient(100deg,#36454f  0%, #36454f 74%)',
                    padding: '15px 35px',
                    borderRadius: '50px',
                    color: '#fff',
                    border: 'none',
                }}
            >
                Sign up Lesson
            </Button>
            <Modal show={modalVisible} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Choose a role and sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formRole">
                            <Form.Label>
                                <b>Role</b>
                            </Form.Label>
                            <Form.Control as="select" onChange={handleRoleChange}>
                                {availableRoles.map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSignUpSubmit} >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SignUpLessonButton;
