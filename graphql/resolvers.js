const { users, comments, articles } = require('./data');

const root = {
    articles: () => {
        return articles.map(article => ({
            ...article,
            author: users.find(u => u.id === article.authorId),
            comments: comments.filter(c => c.articleId === article.id)
        }));
    },
    article: ({ id }) => {
        const article = articles.find(a => a.id === id);
        if (!article) return null;
        return {
            ...article,
            author: users.find(u => u.id === article.authorId),
            comments: comments.filter(c => c.articleId === article.id)
        };
    },
    createArticle: ({ title, content, authorId }) => {
        // Simple check if user exists
        const userExists = users.find(u => u.id === authorId);
        if (!userExists) {
            throw new Error("User (Author) not found");
        }

        const newArticle = {
            id: String(articles.length + 1),
            title,
            content,
            authorId
        };
        articles.push(newArticle);
        
        return {
            ...newArticle,
            author: userExists,
            comments: []
        };
    }
};

module.exports = root;
