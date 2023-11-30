import Toast from "react-bootstrap/Toast";

function ErrorSnackBar({ errors }) {
  return (
    <Toast>
      <Toast.Header>
        <img src="" className="rounded me-2" alt="" />
        <strong className="me-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>{errors}</Toast.Body>
    </Toast>
  );
}

export default ErrorSnackBar;
