//
import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    // LOAD UP THE GOGLE API
    window.gapi.load("client:auth2", () => {
      // INITIALIZE THE API WITH THE ID AND SCOPE
      // NOTE THAT THIS RETURNS A PROMISE
      window.gapi.client
        .init({
          clientId:
            "219632446073-38dqo1hp2tup3jq74on3t45426d55lc1.apps.googleusercontent.com",
          scope: "email",
        })
        // GET INSTANCE OF THE getAUTHINSTANCE OBJECT
        // THIS GIVES ACCESS TO VARIOUS METHOD LIKE SIGN IN, OUT and STATUS
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign in with google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
