import { Flip, ToastContainer } from 'react-toastify';

const ToastifyContainer = () => {
  return (
    <ToastContainer
      autoClose={5000}
      className="mr-4"
      closeOnClick
      draggable
      hideProgressBar={false}
      newestOnTop
      pauseOnFocusLoss
      pauseOnHover
      position="bottom-left"
      rtl={false}
      transition={Flip}
    />
  );
};

const LoadingSpinner = () => {
  return (
    <span className="spinner d-inline-block">
      <span className="bounce1" />
      <span className="bounce2" />
      <span className="bounce3" />
    </span>
  );
};

export { ToastifyContainer, LoadingSpinner };
