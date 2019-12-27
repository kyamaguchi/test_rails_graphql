import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CreateUser from './CreateUser';

const USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      booksCount
    }
  }
`;

class Users extends Component {
  updateUsers = (cache, { data: { createUser } }) => {
    const { users } = cache.readQuery({ query: USERS_QUERY });
    cache.writeQuery({
      query: USERS_QUERY,
      data: { users: users.concat([createUser.user]) },
    });
  }

  render() {
    return (
      <Query query={USERS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          return (
            <div>
              <div className="flex flex-wrap mb-4">
                {data.users.map((user) => {
                  return <div key={user.id}
                              className="m-4 w-1/4 rounded overflow-hidden shadow-lg"
                              onClick={this.props.selectUser.bind(this, user)}>
                    Email: {user.email}
                  </div>
                })}
              </div>
              <div className="flex flex-wrap mb-4">
                <Fragment>
                  {data.users.map((user) => {
                    // truncated
                  })}
                  <div className="m-4 w-1/4 rounded overflow-hidden shadow-lg">
                    <CreateUser onCreateUser={this.updateUsers} />
                  </div>
                </Fragment>
              </div>
             </div>
          )
        }}
      </Query>
    )
  }
}

export default Users;
