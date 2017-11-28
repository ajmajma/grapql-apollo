import gql from 'graphql-tag';

export default gql`
query ($id: ID!) {
  song(id: $id) {
    title
  }
}
`;