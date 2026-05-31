const users = [
    { id: '1', fullname: 'John Doe', email: 'john@example.com', dob: '1990-01-01' },
    { id: '2', fullname: 'Jane Smith', email: 'jane@example.com', dob: '1995-05-15' }
];

const comments = [
    { id: '1', title: 'Great post', content: 'I really enjoyed this article!', articleId: '1' },
    { id: '2', title: 'Nice', content: 'Very informative.', articleId: '1' }
];

const articles = [
    { id: '1', title: 'Introduction to GraphQL', content: 'GraphQL is an open-source data query and manipulation language for APIs...', authorId: '1' }
];

module.exports = {
    users,
    comments,
    articles
};
