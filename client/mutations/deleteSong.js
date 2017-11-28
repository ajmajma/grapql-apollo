import gql from 'graphql-tag';

export default gql`
mutation ($id: ID) {
  deleteSong(id: $id) {
    id
  }
}
`;