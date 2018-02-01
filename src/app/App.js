import React, { Component } from 'react';
import { View } from 'react-native';
// Firebase.
import firebase from 'firebase';
import { FIREBASE_CONFIG } from './Credentials';
// Common Components.
import { Header, Button, Spinner } from '../components/common';
// Components.
import LoginForm from '../components/LoginForm';

class App extends Component {
    state = { loggedIn: null };
    componentWillMount() {
        firebase.initializeApp(FIREBASE_CONFIG);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <View style={styles.logoutButtonStyle}>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </View>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    logoutButtonStyle: {
        flexDirection: 'row', //essential
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
};

export default App;