// import Toast from "react-bootstrap/Toast";

function ErrorSnackBar({ errors }) {
  console.log(errors);
  if (!errors) {
    return null;
  }
  return (
    <div className="field">
      <div className="ui pointing label">
        {errors.map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </div>
    </div>
  );
}

export default ErrorSnackBar;
{
  /* {errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))} */
}
