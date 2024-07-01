import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export interface IConfirmationDialog {
  id: string;
  keepMounted: boolean;
  open: boolean;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  type?: 'normal' | 'danger';
  onClose: (value?: boolean) => void;
  withoutCancel?: boolean;
  loading?: boolean;
}

const ConfirmationDialog: React.FC<IConfirmationDialog> = ({
  title = 'Are you sure?',
  type = 'normal',
  description = 'Are you sure you want to delete this data?',
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  withoutCancel = false,
  onClose,
  open,
  loading = false,
  ...other
}) => {
  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          maxHeight: 435,
          borderRadius: '10px',
        },
      }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle className="bg-red-500 h-14 text-xl text-white">
        {title}
      </DialogTitle>
      <DialogContent className="mt-12 mb-7 text-center text-red-500 font-semibold">
        {description}
      </DialogContent>
      <div className="mb-10 flex justify-center space-x-7">
        {!withoutCancel && (
          <button
            onClick={handleCancel}
            className="rounded-[10px] w-32 h-10 flex items-center justify-center text-center text-base text-red-500"
          >
            {cancelText}
          </button>
        )}
        <Button
          className={` w-32 ${loading && 'bg-gray-600'}`}
          onClick={handleOk}
          disabled={loading}
          endIcon={loading && <CircularProgress color="info" size={15} />}
        >
          {confirmText}
        </Button>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
