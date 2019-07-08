import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    register
} from '../actions/authActions';

import {
    clearErrors
}    from '../actions/errorActions'

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null,
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    componentDidUpdate (previousProps)  {
        const { error, isAuthenticated } = this.props;
        if (error !== previousProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                this.setState({
                    msg: error.msg.msg,
                })

            } else {
                this.setState({
                    msg: null,
                })
            }
        }

        if (this.state.modal && isAuthenticated) {
            this.toggle();
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal:  !this.state.modal,
        });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value, 
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const { name, email, password } = this.state;
        this.props.register({
            name,
            email,
            password,
        });
    }

    render () {
        return <div>
            <NavLink
                onClick={this.toggle}
                href="#"
            >
                Registrarse
            </NavLink>
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
            >
                <ModalHeader
                    toggle={this.toggle}
                >
                    Registrarse
                </ModalHeader>
                <ModalBody>
                    { this.state.msg ? 
                    <Alert
                        color='danger'
                    >
                        {this.state.msg}
                    </Alert>
                    : '' }
                    <Form
                        onSubmit={this.onSubmit}
                    >
                        <FormGroup>
                                <Label
                                    for="name"
                                >
                                    Nombre
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Ingrese su nombre"
                                    onChange={this.onChange}
                                />
                                <Label
                                    for="email"
                                >
                                    Correo electrónico
                                </Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Ingrese su correo electrónico"
                                    onChange={this.onChange}
                                />
                                <Label
                                    for="email"
                                >
                                    Contraseña
                                </Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Ingrese una contraseña"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >
                                    Aceptar
                                </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

export default connect(
    mapStateToProps,
    {
        register,
        clearErrors,
    }
)(RegisterModal);