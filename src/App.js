import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Content from './Content';

class App extends Component {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%'
                }}
            >
                <Header />
                <Content />
            </div>
        );
    }
}

export default App;
