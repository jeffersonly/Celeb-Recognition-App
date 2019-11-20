import { Auth } from 'aws-amplify';

class pageAuth {

    state={
        authenticated: false
    }

    isAuthenticated() {
        Auth.currentSession()
        .then(data => {
            this.setState({
                authenticated: true
            })
        })
        .catch(err => {
            this.setState({
                authenticated: false
            })
        });
    }

    checkAuth() {
        return this.state.authenticated;
    }
}

export default new pageAuth();