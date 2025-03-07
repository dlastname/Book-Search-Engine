# Front-End Refactor To-Do List



## **File: `SignupForm.tsx`**

- [ ] Replace the `addUser()` functionality (imported from the API file) with the `ADD_USER` mutation functionality.

## **File: `LoginForm.tsx`**

- [ ] Replace the `loginUser()` functionality (imported from the API file) with the `LOGIN_USER` mutation functionality.


# Done

## **File: `queries.ts`**

- ~~[x] Create the `GET_ME` query to execute the `me` query set up using Apollo Server.~~

## **File: `mutations.ts`**

- ~~[x] Create the `LOGIN_USER` mutation to execute the `loginUser` mutation.~~
- ~~[ x] Create the `ADD_USER` mutation to execute the `addUser` mutation.~~
- ~~[ x] Create the `SAVE_BOOK` mutation to execute the `saveBook` mutation.~~
- ~~[ x] Create the `REMOVE_BOOK` mutation to execute the `removeBook` mutation.~~

## **File: `App.tsx`**

~~- [ x] Create an Apollo Provider to make every request work with the Apollo Server.~~

## **File: `SearchBooks.tsx`**

- ~~[x] Replace the `saveBook()` function (imported from the API file) with the `SAVE_BOOK` mutation using the Apollo `useMutation()` hook in the `handleSaveBook()` function.~~
- ~~[x] Ensure the logic for saving the book's ID to state remains in the `try...catch` block.~~

## **File: `SavedBooks.tsx`**

- [x] Remove the `useEffect()` hook that sets the state for `UserData`.
- [x] Use the `useQuery()` hook to execute the `GET_ME` query on load and save the result to a variable named `userData`.
- [x] Replace the `deleteBook()` function (imported from the API file) with the `REMOVE_BOOK` mutation using the Apollo `useMutation()` hook in the `handleDeleteBook()` function.
- [x] Ensure the `removeBookId()` function remains in place.