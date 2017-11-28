import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag' ;

class SongCreate extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: ''
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const { mutate } = this.props;

    mutate({
      variables: {
        title
      }
    });
  }

  render() {
    return (
      <div>
        <h3>Create new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song title:</label>
          <input
            type="text"
            onChange={event => this.setState({title: event.target.value })}
            value={this.state.title}
            />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation ($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);