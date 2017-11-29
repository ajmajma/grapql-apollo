import React, { Component } from 'react';
import gql from 'graphql-tag' ;
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props){
    super(props);

    this.state = {
      content: ''
    };
  }

  submitLyric(event) {
    event.preventDefault();
    const { mutate } = this.props;

    mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    }).then(() => this.setState({ content: '' }) );
  }

  render() {
    return (
      <form onSubmit={this.submitLyric.bind(this)}>
        <label>Add a lyric</label>
        <input type="text" value={this.state.lyric} onChange={(event) => this.setState({content: event.target.value})}/>
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
