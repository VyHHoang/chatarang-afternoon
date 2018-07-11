import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'

class UserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: this.props.user,
      errorMessage: null,
    }
  }

  handleChange = (ev) => {
    const user = {...this.state.user}
    user[ev.target.name] = ev.target.value
    this.setState({ user })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    if (this.passwordsMatch()) {
      this.props
        .signUp(this.state.user)
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  passwordsMatch = () => {
    if (this.state.user.password !== this.state.user.passwordConfirmation) {
      this.setState({ errorMessage: 'The passwords you entered do not match.' })
      return false
    }
    return true
  }

  isPasswordUser = () => {
    return this.state.user.provider === 'password'
  }

  renderPasswordOnlyFields = () => {
    return (
      <Fragment>
        <label
          htmlFor="email"
          className={css(styles.label)}
        >
          Email
        </label>
        <input
          autoFocus
          required
          type="email"
          name="email"
          className={css(styles.input)}
          value={this.state.user.email}
          onChange={this.handleChange}
        />

        <label
          htmlFor="password"
          className={css(styles.label)}
        >
          Password
        </label>
        <input
          required
          type="password"
          name="password"
          className={css(styles.input)}
          value={this.state.user.password}
          onChange={this.handleChange}
        />

        <label
          htmlFor="passwordConfirmation"
          className={css(styles.label)}
        >
          Re-type Password
        </label>
        <input
          required
          type="password"
          name="passwordConfirmation"
          className={css(styles.input)}
          value={this.state.user.passwordConfirmation}
          onChange={this.handleChange}
        />
      </Fragment>
    )
  }

  render() {
    return (
      <div className={`UserForm ${css(styles.signIn)}`}>
        <header className={css(styles.header)}>
          <span className={css(styles.title)}>
            <i className="fas fa-hashtag"></i>
            Chatarang
          </span>
        </header>
        <main className={css(styles.main)}>
          <form
            className={css(styles.form)}
            onSubmit={this.handleSubmit}
          >
            <h2>Update Profile</h2>

            <label
              htmlFor="displayName"
              className={css(styles.label)}
            >
              Display Name (optional)
            </label>
            <input
              type="text"
              name="displayName"
              className={css(styles.input)}
              value={this.state.user.displayName}
              onChange={this.handleChange}
            />

            {
              this.isPasswordUser() && this.renderPasswordOnlyFields()
            }

            <button
              type="submit"
              className={css(styles.button)}
            >
              Save Changes
            </button>

            <p className={css(styles.error)}>
              {this.state.errorMessage}
            </p>
          </form>
        </main>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  signIn: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f6f6f6',
  },

  header: {
    backgroundColor: '#fff',
    height: '4rem',
    padding: '0 2rem',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
  },

  title: {
    color: '#ff3344',
    fontWeight: 400,
    textTransform: 'uppercase',
    lineHeight: '80px',
    fontSize: '2rem',
  },

  main: {
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    paddingBottom: '3rem',
  },

  form: {
    width: '40rem',
    backgroundColor: 'white',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
    marginBottom: '2rem',
    paddingBottom: '2rem',
  },

  label: {
    display: 'block',
    textTransform: 'uppercase',
    color: '#999',
  },

  input: {
    width: '20rem',
    fontSize: '1.5rem',
    border: 0,
    borderBottom: '1px solid black',
    marginTop: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    padding: '0.5rem',

    ':focus': {
      outline: 0,
    },
  },

  h2: {
    fontWeight: 'normal',
  },

  button: {
    display: 'block',
    margin: '0 auto 1rem',
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    borderRadius: '1rem',
    backgroundColor: '#ff3333',
    color: 'white',
    width: '20rem',
  },

  error: {
    color: '#ff3344',
    height: '1.2rem',
  }
})


export default UserForm
