import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag' ;


class LyricList extends Component {
  constructor(props) {
    super(props);

    this.mapLyrics = this.mapLyrics.bind(this);
  }

  onLike(id, likes) {
    const { mutate } = this.props;

    mutate({
      variables: {
        id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  mapLyrics() {
    const { lyrics } = this.props;

    if (!lyrics) {
      return null;
    }

    return lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="voteBox">
            <i className="material-icons" onClick={() => this.onLike(id, likes)}>thumb_up</i>
            {likes}
          </div>
          </li>
      )
    } )
  }

  render() {
    return(
      <ul className="collection">
        {this.mapLyrics()}
      </ul>
    );
  }
}

const mutation = gql`
mutation LikeLyric($id: ID) {
  likeLyric(id: $id) {
    id
    likes
  }
}
`;


export default graphql(mutation)(LyricList);
