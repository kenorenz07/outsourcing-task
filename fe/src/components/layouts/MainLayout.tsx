import NextNprogress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <NextNprogress color="red" />
      <div id="main-app">{children}</div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default MainLayout;
