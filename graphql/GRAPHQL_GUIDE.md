# GraphQL Server Guide

This repository contains a simple GraphQL server built with Node.js and Express to demonstrate basic Queries and Mutations.

## What is GraphQL?
GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. Unlike REST, which exposes a fixed data structure for each endpoint, GraphQL allows clients to request exactly the data they need from a single endpoint (typically `/graphql`). 

### Core Concepts:
1. **Schema & Types**: The core of a GraphQL API. The Schema defines the types of data (like `User`, `Article`, `Comment`) and their relationships.
2. **Queries**: Equivalent to a REST `GET` request. Used to fetch data. You can nest types to retrieve related data in a single request.
3. **Mutations**: Equivalent to REST `POST`, `PUT`, `DELETE`. Used to modify data.
4. **Resolvers**: Functions that connect the GraphQL queries and mutations to the actual data source (e.g., a database or in-memory arrays).

## How to Run This Project

1. Navigate to the \`graphql\` directory:
   \`\`\`bash
   cd graphql
   \`\`\`
2. Install dependencies (using \`pnpm\`):
   \`\`\`bash
   pnpm install
   \`\`\`
3. Start the server:
   \`\`\`bash
   pnpm start
   \`\`\`
   *(Or \`pnpm dev\` to use Nodemon for hot-reloading)*
4. Open your browser and go to [http://localhost:4000/graphql](http://localhost:4000/graphql). This will open **GraphiQL**, an interactive IDE for testing GraphQL queries.

---

## How to Test Queries and Mutations

You can copy and paste the following snippets into the GraphiQL interface.

### 1. Fetch all articles (including author and comments)
This query retrieves all articles. Notice how we also ask for the author's details and the comments within the same request.

\`\`\`graphql
query {
  articles {
    id
    title
    content
    author {
      fullname
      email
    }
    comments {
      title
      content
    }
  }
}
\`\`\`

### 2. Fetch an article by its ID
This query fetches a single article by passing the `id` argument.

\`\`\`graphql
query {
  article(id: "1") {
    title
    content
    author {
      fullname
    }
  }
}
\`\`\`

### 3. Create a new Article
This is a mutation to create a new article. It requires the `title`, `content`, and an existing `authorId` (Use `"1"` or `"2"` based on the mock data). The mutation also returns the created article so you can immediately see the result.

\`\`\`graphql
mutation {
  createArticle(title: "My New Article", content: "Learning GraphQL is fun!", authorId: "2") {
    id
    title
    author {
      fullname
      email
    }
  }
}
\`\`\`

After running this mutation, you can run the "Fetch all articles" query again to see the new article added to the list!
