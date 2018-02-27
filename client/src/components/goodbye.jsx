import React, { Component } from 'react';
import { render } from 'react-dom';
import * as classService from '../services/classes';

class GoodbyeWorld extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        classService.all()
        .then(console.log);
    }

    render() {
        return <h1>Goodbye World!</h1>;
    }
}

export default GoodbyeWorld;