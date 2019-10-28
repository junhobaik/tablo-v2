/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

class BoundaryError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
    };
  }

  componentDidCatch(_error, _info) {
    this.setState({ hasError: true, error: { error: _error.toString(), info: _info } });
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError)
      return (
        <div id="ErrorBoundary">
          <div className="inner" style={{ maxWidth: '30rem', margin: '1rem auto' }}>
            <h1>ERROR!</h1>
            <article>
              <p>
                Sorry, An error occurred. If you get an error repeatedly, please email me with the details of the error
                and what happened.
              </p>
              <a href="mailto:junhobaik@gmail.com">junhobaik@gmail.com</a>
              <h3>Error Message</h3>
              <span width="10">{JSON.stringify(error)}</span>
            </article>
          </div>
        </div>
      );
    return children;
  }
}

export default BoundaryError;
