/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
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
      }
      nextToken
    }
  }
}
`;
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
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
      }
      nextToken
    }
  }
}
`;
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
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
      }
      nextToken
    }
  }
}
`;
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
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
  }
}
`;
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
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
  }
}
`;
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
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
  }
}
`;
