import { css } from '@emotion/react';

export const globalStyles = css`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .App {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  header {
    background-color: #4a90e2;
    padding: 10px;
    margin-bottom: 20px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav ul {
    list-style-type: none;
    padding: 0;
  }

  nav ul li {
    display: inline;
    margin-right: 10px;
  }

  main {
    background-color: #ffffff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  aside {
    width: 250px;
    background-color: #e0e0e0;
    padding: 10px;
    height: 100vh;
  }

  footer {
    width: 100%;
    height: 40px;
    background-color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: white;
  }
`;
