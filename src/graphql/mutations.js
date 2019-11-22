/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    avatar {
      bucket
      region
      key
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    avatar {
      bucket
      region
      key
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    username
    avatar {
      bucket
      region
      key
    }
  }
}
`;
export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    description
    avatar {
      bucket
      region
      key
    }
    filename
    key
    userid
    comments {
      items {
        id
        author
        content
        createdAt
      }
      nextToken
    }
  }
}
`;
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    title
    description
    avatar {
      bucket
      region
      key
    }
    filename
    key
    userid
    comments {
      items {
        id
        author
        content
        createdAt
      }
      nextToken
    }
  }
}
`;
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    id
    title
    description
    avatar {
      bucket
      region
      key
    }
    filename
    key
    userid
    comments {
      items {
        id
        author
        content
        createdAt
      }
      nextToken
    }
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    author
    content
    post {
      id
      title
      description
      avatar {
        bucket
        region
        key
      }
      filename
      key
      userid
      comments {
        nextToken
      }
    }
    createdAt
  }
}
`;
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    id
    author
    content
    post {
      id
      title
      description
      avatar {
        bucket
        region
        key
      }
      filename
      key
      userid
      comments {
        nextToken
      }
    }
    createdAt
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    id
    author
    content
    post {
      id
      title
      description
      avatar {
        bucket
        region
        key
      }
      filename
      key
      userid
      comments {
        nextToken
      }
    }
    createdAt
  }
}
`;
