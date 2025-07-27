export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
  body {
    font-family: 'Inter', sans-serif;
    color: #222;
  }
  .tab-button.active {
    background-color: #b5121b;
    color: #fff;
    box-shadow: 0 4px 14px 0 rgba(181, 18, 27, 0.08);
  }
  .tab-button:not(.active):hover {
    background-color: #b0b7bc;
  }
`; 