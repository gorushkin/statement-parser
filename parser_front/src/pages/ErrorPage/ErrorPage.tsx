import { useRouteError } from 'react-router-dom';

interface CustomError extends Error {
  statusText?: string;
  message: string;
}

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const customError = error as CustomError;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{customError.statusText || customError.message}</i>
      </p>
    </div>
  );
}
