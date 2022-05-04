module.exports = {
  HTML: (title, head, body) => {
    return `
      <html>
      <head>
          <meta charset="utf-8">
          <title>${title}</title>
          ${head}
      </head>
      
      <body class="d-flex flex-column h-100" id = "wrapper">
          ${body} 
      </body>
      </html>      
      `;
  },
};
