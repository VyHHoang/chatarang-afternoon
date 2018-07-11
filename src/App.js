import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import './App.css'
import base, { auth } from './base'
import Main from './Main'
import SignIn from './SignIn'
import SignUp from './SignUp'

class App extends Component {
  constructor() {
    super()

    const user = JSON.parse(localStorage.getItem('user'))

    this.state = {
      user: user || {},
      displayName: null,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(
      user => {
        if (user) {
          // User is signed in.
          this.handleAuth(user)
        } else {
          // No user is signed in.
          this.handleUnauth()
        }
    })
  }

  handleAuth = (oAuthUser) => {
    const user = {
      uid: oAuthUser.uid,
      displayName: oAuthUser.displayName,
      email: oAuthUser.email,
      photoUrl: oAuthUser.photoURL,
      provider: oAuthUser.providerData[0].providerId,
    }
    this.syncUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  syncUser = user => {
    if (this.state.displayName) {
      user.displayName = this.state.displayName
    }

    this.userRef = base.syncState(
      `users/${user.uid}`,
      {
        context: this,
        state: 'user',
        then: () => this.setState({ user }),
      }
    )
  }

  signUp = user => {
    if (user.displayName) {
      this.setState({ displayName: user.displayName })
    }

    return auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    )
  }

  signedIn = () => {
    return this.state.user.uid
  }

  signOut = () => {
    auth.signOut()
  }

  handleUnauth = () => {
    if (this.userRef) {
      base.removeBinding(this.userRef)
    }

    this.setState({ user: {} })
    localStorage.removeItem('user')
  }

  render() {
    return (
      <div className="App">
        <Switch>
        <Route
            path="/sign-up"
            render={() => (
              this.signedIn()
                ? <Redirect to="/chat" />
                : <SignUp signUp={this.signUp} />
            )}
          />
          <Route
            path="/sign-in"
            render={() => (
              this.signedIn()
                ? <Redirect to="/chat" />
                : <SignIn />
            )}
          />
          <Route
            path="/chat/rooms/:roomName"
            render={(navProps) => (
              this.signedIn()
                ? <Main
                    user={this.state.user}
                    signOut={this.signOut}
                    {...navProps}
                  />
                : <Redirect to="/sign-in" />
            )}
          />
          <Route
            path="/chat"
            render={(navProps) => (
              this.signedIn()
                ? <Main
                    user={this.state.user}
                    signOut={this.signOut}
                    {...navProps}
                  />
                : <Redirect to="/sign-in" />
            )}
          />
          <Route
            render={() => (
              this.signedIn()
                ? <Redirect to="/chat" />
                : <Redirect to="/sign-in" />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default App
