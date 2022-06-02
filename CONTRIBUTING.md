# Contributing

## 1. Issue Tracking
The best way to start contributing is to explore the GitHub issue tracker for the repository.

If you have already tried the application feel free to open an issue if you notice any bug or feature that could be improved.

Include a brief description and context of the issue, and optionally choose labels to mark the issue as bug, enhancement, question... 
to give extra information to other developers.

## 2. Code Formatting
We use [ESLint](https://github.com/eslint/eslint) for linting of Vue and JS files. You can set up ESLint with your editor following these 
[instructions](https://eslint.org/docs/user-guide/integrations). We also have scripts to check and update code.

To check:

```sh
npm run lint
```

To update:

```sh
npm run lint:fix
```

## 3. Commit Messages
Every commit should follow the following format:
```
(<type>): <short summary>
  │             │
  │             └─⫸ Summary in past tense. Not capitalized. No period at the end.
  │       
  └─⫸ Commit Type: feat | fix | docs | style | misc
```

Here is an example of a commit for documentation improvement:

```
(docs): Added some text about commit rules
```

## 4. Pull Requests
When creating a `Pull Request` please include a short description explaining what has changed and why. If applicable, screenshots or GIF capture about the fix 
or improvement will really help. This will help others reviewing your code so you may also reference any issues that you were working on fixing.

Finally choose a meaningful title so your pull request can be easily identified

## 5. Branches
`master` branch is protected and changes cannot be done directly on that branch. In order to push something to master a `Pull Request` must be made from another branch 
with the following naming convention:

```
<initials>-<feature name>
    |            |
    |            └─⫸ Name of the feature underscore separated in lowercase
    |
    └─⫸ Initials of user's name for ex. first letter of name
```

Here is an example of a branch name:

```
g-login_through_coinbase : g are my initials, and login through coinbase is the feature I want to work on
```

## Thanks!

Your contribution is very appreciated, thank you!
