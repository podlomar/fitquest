import './layout.css';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fitness Tracker</title>
        <link rel="stylesheet" href="/server.css" />
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script defer src="/index.js"></script>
      </head>

      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
};
