import Toast from "react-bootstrap/Toast";

function ErrorSnackBar() {
  return (
    <Toast>
      <Toast.Header>
        <img src="" className="rounded me-2" alt="" />
        <strong className="me-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>Error Message</Toast.Body>
    </Toast>
  );
}

export default ErrorSnackBar;
