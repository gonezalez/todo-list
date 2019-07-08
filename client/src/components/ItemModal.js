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
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }

    toggle = () => {
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
        const newItem = {
            name: this.state.name
        }
        this.props.addItem(newItem);
        this.toggle();
    }

    render () {
        if (!this.props.isAuthenticated)
            return ''
        return <div>
            <Button
                color="dark"
                style={{ marginBottom: '2rem' }}
                onClick={this.toggle}
            >
                Agregar tarea
            </Button>
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
            >
                <ModalHeader
                    toggle={this.toggle}
                >
                    Agregar a la lista
                </ModalHeader>
                <ModalBody>
                    <Form
                        onSubmit={this.onSubmit}
                    >
                        <FormGroup>
                                <Label
                                    for="item"
                                >
                                    Tarea
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Describa la tarea"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >
                                    Agregar tarea
                                </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps,
    { 
        addItem,
    }
)(ItemModal);