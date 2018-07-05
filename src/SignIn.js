import React, { Component } from 'react'

class SignIn extends Component {
  render() {
    return (
      <div className="SignIn">
        <form>
          <label htmlFor="email">Email</label>
          <input
            required
            autoFocus
            type="email"
            name="email"
          />
          <button
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    )
  }
}

export default SignIn
