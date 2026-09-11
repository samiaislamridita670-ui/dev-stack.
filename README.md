# Dev Stack Builder

Dev Stack Builder is a responsive React website that helps developers explore different technologies and build their own development stack.

Users can browse technologies, check their category, difficulty, rating, and badge, then add their preferred technologies to a personal stack.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React-Toastify
- JSON
- Vite
- JavaScript ES6+

## Features

### 1. Explore Technologies
Users can browse different development technologies with their name, category, description, difficulty level, rating, and badge.

### 2. Build Your Own Stack
Users can add technologies to their personal stack and see the selected technology count.

### 3. Stack Management
Users can remove individual technologies or remove all selected technologies from their stack. Duplicate technologies cannot be added.

## React Questions & Answers

### 1. What is JSX, and why is it used?

JSX stands for JavaScript XML. It allows us to write HTML-like code inside JavaScript or TypeScript. JSX makes React components easier to write and understand.

### 2. What is the difference between props and state?

Props are used to pass data from a parent component to a child component. State is used to store and manage data that can change inside a component.

### 3. What is the useState hook, and how does it work?

The useState hook is used to create and manage state in a React component. It returns the current state value and a function that can be used to update that value.

### 4. What is the useEffect hook, and when should you use it?

The useEffect hook is used to perform side effects in a React component. For example, it can be used to fetch data, update the document title, or perform an action after a component renders.

### 5. What is the purpose of the key prop when rendering lists?

The key prop helps React identify each item in a list. It allows React to efficiently update, add, or remove list items when the data changes.

### 6. What is conditional rendering in React?

Conditional rendering means showing different content depending on a condition. For example, we can show an empty state when no technologies are selected and show the stack items when technologies have been added.

### 7. How do you pass data from a parent component to a child component? How can a child component communicate with its parent?

A parent component can pass data to a child component using props. A child can communicate with its parent by receiving a function through props and calling that function when an action happens.

## Project Structure

The project is built with React and Vite. Technology information is loaded from a local JSON file, and users can manage their selected technologies through the stack builder.

## Author

Dev Stack Builder