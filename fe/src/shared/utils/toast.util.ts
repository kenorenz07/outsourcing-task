import type { Id, Theme, ToastPosition } from 'react-toastify';
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function successNotify(
  message: string,
  theme: Theme = 'light',
  position: ToastPosition = 'top-right',
  autoClose: number = 5000,
  hideProgressBar: boolean = false,
  closeOnClick: boolean = true,
  pauseOnHover: boolean = true,
  draggable: boolean = true,
  progress: number | undefined = undefined
): Id {
  return toast.success(message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
    theme,
    transition: Slide,
  });
}

export function errorNotify(
  message: string,
  theme: Theme = 'light',
  position: ToastPosition = 'top-right',
  autoClose: number = 5000,
  hideProgressBar: boolean = false,
  closeOnClick: boolean = true,
  pauseOnHover: boolean = true,
  draggable: boolean = true,
  progress: number | undefined = undefined
): Id {
  return toast.error(message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
    theme,
    transition: Slide,
  });
}
