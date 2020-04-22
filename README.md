# GraphQL Apollo Client

This exercise is part of the [React GraphQL Academy](http://reactgraphql.academy) training material.

## Our teaching method

1. Collaborative learning environment & pair programming.
   - Rooms with small groups
   - Work with your peers, discuss, help each other.
2. We try to foster critical thinking.
   - ⬆️ Discovery ⬇️ Instruction
3. We don’t explain everything you need to know before the exercise:
   - The exercise is meant to help you come up with conclusions.
   - Learn by doing and build a mental model.

More on our [teaching method](https://reactgraphql.academy/blog/react-graphql-academy-teaching-method/)

## Learning objectives

- Learn how to build data-driven React applications colocating data requirements close to the components
- Understand the value of using a GraphQL client to keep the state of the application consistent
- Comprehend the different features that Apollo Client provides to improve performance and the tradeoffs of each approach.

## To get started

### Step 1

If you haven't already set up your project, head here and follow the instructions https://github.com/reactgraphqlacademy/fb-messenger/blob/master/README.md

### Step 2

```sh
 git checkout graphql-apollo && cd graphql-apollo && npm i
```

```sh
 npm start
```

## Exercise part 1

### 🥑 Before we start the exercise 🏋️‍♀️

The `useQuery` React hook is the primary API for executing GraphQL queries with Apollo Client. When your component renders, `useQuery` returns an object from Apollo Client that contains `loading`, `error`, and `data` properties you can use to render your UI. Example:

```JavaScript
import gql from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_DOG = gql`
  query getDogName(id: ID!) {
    dog(id: 1) {
      name
    }
  }
`;

function Dog({ id }) {
  const { loading, error, data } = useQuery(GET_DOG,{
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return <p>🐶 name: ${data.dog.name}</p>
}
```

### Tasks

🎯 The goal of these tasks is to fetch the company the user works for from the GraphQL API using the useQuery hook and display it in a form. You'll also get started familiarizing yourself with the development workflow of writing and validating queries, then writing and feeding components with data.

- [ ] 1. The profile page (http://localhost:3000/profile) should display the fullname of the user in the form input labeled "fullname" (right below the image). The fullname is not displayed on the input because of a bug 🐛. Your task is to fix it. 🕵️‍♀️Hint, the bug is in this file `src/user/Profile.js`.

2. The profile page should display the name of the company in the form input labeled "Company" (right below the fullname). This feature is not implemented. You'll need to:

- [ ] 2.1. Write a GraphQL query to get the company the user works for. Write and test the query on Playground (http://localhost:3000/graphql). You can finish and use the following query:

```graphql
query work {
  # 🚧 ⬆️ you need to add some argument to the query
  work(userId: $userId) {
    company
    id
  }
}
```

You can get your user id executing the following query:

```graphql
query {
  viewer {
    id
  }
}
```

- [ ] 2.2. In `src/user/Work.js`, using the `gql` function, transform the query from the previous step from a string to something (called AST) that can be passed to the useQuery hook (next step). 🕵️‍♀️Hint, we also did that in `src/user/Profile.js`.
- [ ] 2.3. [Execute](https://www.apollographql.com/docs/react/data/queries/#executing-a-query) the query from the previous step using the useQuery hook from Apollo. 🕵️‍♀️ Hint, it's very similar to the implementation of the `fullname` in `src/user/Profile`. There is one difference though, in this case, you need to pass the userId to the useQuery using a configuration option ([variables](https://www.apollographql.com/docs/react/data/queries/#usequery-api)).

### 🏋️‍♀️ Bonus exercise

- [ ] Bonus 1. We mentioned in the exercise "transform the query from the previous step from a string to something (called **AST**)". What is an AST? Why do you think using an AST is better than using plain text? You might want to use this website https://astexplorer.net/ to explore any of the queries you wrote.
- [ ] Bonus 2. 🤔 You might have spotted that there is a better query to get the company of the user. Our current implementation is a bit naive. No worries, we are going to refactor our implementation in a bit and make some improvements as we build up our GraphQL knowledge. Meanwhile, try to **discuss with your peers** (don't change your code yet) how we could improve our current implementation. 🕵️‍♀️Hint, we need to start by changing the query.

## Exercise part 2

### 🥑 Before we start the exercise 🏋️‍♀️

The `useMutation` React hook is the primary API for executing mutations with Apollo Client. To run a mutation, you first call `useMutation` within a React component and pass it a GraphQL mutation. When your component renders, `useMutation` returns a tuple that includes:

- A mutate function that you can call at any time to execute the mutation
- An object with fields that represent the current status of the mutation's execution

Example:

```JavaScript
import gql from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import React, { useState } from "react";

const ADD_TODO = gql`
  mutation addDog($name: String!) {
    addDog(name: $name) { # 👩‍🏫 Mutations should return the object that has been mutated
      id
      name
    }
  }
`;

function AddDog() {
  const [name, setName] = useState('')
  const [addDog, { data, loading }] = useMutation(ADD_DOG);

  return (
      <form
        onSubmit={e => {
          e.preventDefault();
          addDog({ variables: { name } });
        }}
      >
        <input
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button disable={loading ? true : undefined} type="submit">Add  🐶</button>
      </form>
  );
}
```

### Tasks

🎯 The goal of these tasks is to update the fullname and the company using two different forms while keeping the state of the application consistent.

You might be wondering why we use two forms to update two fields. In a real-world application, we would have more than 1 field in each form, and both forms would probably be in different pages. That's actually how the current facebook.com "about" section works.

- https://www.facebook.com/USERNAME/about_work_and_education
- https://www.facebook.com/USERNAME/about_contact_and_basic_info
- etc

We are simplifying the codebase while keeping the complexity of the problem, so you can focus on solving a real-world use case.

- [ ] 3. Go to Playground to write and validate the mutation that updates the fullname of the user. 🕵️‍♀️Hint, it will start with:
  ```graphql
  mutation {
    updateUser # 🚧 you need to finish this query
  }
  ```
- [ ] 4. Use the useMutation from Apollo to update the fullname in `src/user/Profile.js`. Don't forget to use the `gql` function. You'll know the fullname was persisted properly because the fullname will update on the navbar (top right corner of the page).
- [ ] 5. Wait, how is it possible that the navbar changed the fullname automatically? Discuss with your peers.
- [ ] 6.  Go to Playground to write and validate the mutation that updates the company of the user. 🕵️‍♀️Hint, it will start with:
  ```graphql
  mutation {
    updateWork # 🚧 you need to finish this query
  }
  ```
- [ ] 7. Use the useMutation from Apollo to update the company in `src/user/Works.js`. You'll know it works because the company is displayed with the new name on the navbar when you reload the page. The company name won't automatically change the name on the navbar because of a 🐛 that you'll fix in the next task.
- [ ] 8. So, why does the fullname update on the navbar and the company name doesn't? There is a bug. Your task is to find it and fix it. 🕵️‍♀️ Hint, the bug is in `src/layout/TopBar.js`

### 🏋️‍♀️ Bonus exercise

- [ ] The text of either submit buttons (in the profile form and in the work form) should be "Saving" instead of "Save" when the corresponding mutation is working (meaning while being sent to the server and waiting for the response).

## Exercise part 3

### 🥑 Before we start the exercise 🏋️‍♀️

One of the patterns that has been established is colocating queries with the components that use their data. That's what we've done in our `Profile` component and `Work` component. This way components manage their own data dependencies. This pattern makes our apps easier to maintain and to add new features without potentially breaking existing functionality.

The problem is that now we run 2 different queries, 1 for `Profile` and another one for `Work`. That means 2 different requests to the GraphQL API. In fact, in our profile page we have 3 HTTP requests to the GraphQL API when the page loads because of the `TopBar`.

✋ Let's have a look at the network tab on the initial page load.

One of the GraphQL selling points is that we can group multiple requests into a single operation, avoiding the cost of multiple round trips. That's not the case in our current implementation. Let's fix it by composing our data requirements using GraphQL fragments.

#### GraphQL fragments

> GraphQL includes reusable units called fragments. Fragments let you construct sets of fields, and then include them in queries where you need to

https://graphql.org/learn/queries/#fragments

Example:

```JavaScript
const USER_FRAGMENT = gql`
  fragment UpdateUserFragment on User {
    id
    fullname
  }
`;

const VIEWER = gql`
  query {
    viewer {
      ...UpdateUserFragment
    }
  }
  ${USER_FRAGMENT}
`;
```

There are two use cases for using fragment on you app:
A) To reuse parts of queries (or mutations or subscriptions) in various parts of your application.
B) Colocate data requirements within the components and compose them into a single query.

### Tasks

🎯 The goal of the following tasks is to help you understand two different use cases for using fragment on your app:  
A) To reuse parts of queries (or mutations or subscriptions) in various parts of your application.
B) To colocate data requirements within the components and compose them into a single query to reduce the round trips to the API.

#### Fragments to reuse parts of queries

- [ ] 9. In `src/user/Profile.js` use the `UpdateUserFragment` fragment from the example above in the following query:

```graphql
query {
  viewer {
    id
    fullname
  }
}
```

- [ ] 10. In `src/user/Profile.js` use the `UpdateUserFragment` fragment from the example above in the updateUser mutation.

- [ ] 11. In `src/user/Work.js` create a fragment to reuse the following fields `company` and `id` between the query and the mutation.

#### 🏋️‍♀️ Bonus exercise

- [ ] Could we use the `UpdateUserFragment` fragment defined in `src/user/Profile.js` in `src/layout/TopBar.js`? You can try. Either case, you manage to reuse it in the TopBar or not, do you see any problems in doing so? You can discuss it with your peers. 🕵️‍♀️Hint: do you know what under-fetching and over-fetching are?

#### Fragments to compose queries

- [ ] 12.

#### 🏋️‍♀️ Bonus exercise

## Articles and links

- [Apollo Client Developer Tools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm/related)
- [Updating the cache after a mutation](https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-after-a-mutation)
- [Using fragments - Apollo docs](https://www.apollographql.com/docs/react/data/fragments)
- [Batching Client GraphQL Queries by Apollo](https://www.apollographql.com/blog/batching-client-graphql-queries-a685f5bcd41b)
- [Explaining GraphQL Connections by Apollo](https://dev-blog.apollodata.com/explaining-graphql-connections-c48b7c3d6976)
- [http://graphql.org/learn/](http://graphql.org/learn/)
- [Thinking in Graphs](http://graphql.org/learn/thinking-in-graphs/)
- [GraphQL vs. REST](https://dev-blog.apollodata.com/graphql-vs-rest-5d425123e34b)
- [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm)

## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html).

```

```
