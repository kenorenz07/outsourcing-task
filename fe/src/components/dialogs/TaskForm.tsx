import { UserType } from '@/shared/models/User.model';
import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/base';
import {
  Checkbox,
  FormControl,
  ListItemText,
  Select,
  SelectChangeEvent,
  makeStyles,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { MultiSelect, Option } from 'react-multi-select-component';
import { TaskType } from '@/shared/models/Task.model';

export interface DialogTaskFormInterface {
  name: string;
  description: string;
  assigned_employees: number[];
}

export interface DialogInputActions {
  open: boolean;
  loading: boolean;
}

export interface ITaskForm {
  setDialog: React.Dispatch<React.SetStateAction<DialogInputActions>>;
  onSave: (payload: DialogTaskFormInterface) => {};
  selectedTask: TaskType | null;
  dialog: DialogInputActions;
  employees: UserType[];
}

const TaskForm: React.FC<ITaskForm> = ({
  setDialog,
  onSave,
  dialog,
  employees,
  selectedTask,
}) => {
  const schema = yup.object().shape({
    name: yup.string().trim().required('Name is required.'),
    description: yup.string().trim().required('Description is required.'),
    assigned_employees: yup
      .array()
      .of(yup.number().required())
      .required('Employee is required.'),
  });
  const [selectedEmployees, setSelectedEmployees] = useState<Option[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DialogTaskFormInterface>({
    resolver: yupResolver(schema),
  });

  const options: Option[] = useMemo(() => {
    return employees.map((emp) => ({ label: emp.name, value: emp.id }));
  }, [employees]);

  useEffect(() => {
    setValue(
      'assigned_employees',
      selectedEmployees.map((emp) => emp.value)
    );
  }, [selectedEmployees]);

  useEffect(() => {
    if (selectedTask) {
      const users = selectedTask.users;
      const mapped = users.map((emp) => ({
        label: emp.name,
        value: emp.id ?? 0,
      }));
      const assigned = mapped.map((ma) => ma.value);

      setValue('name', selectedTask.name);
      setValue('description', selectedTask.description);
      setValue('assigned_employees', assigned);
      setSelectedEmployees(mapped);
    }
  }, [selectedTask]);

  const onSubmit = (payload: DialogTaskFormInterface) => {
    onSave(payload);
    setValue('name', '');
    setValue('description', '');
    setValue('assigned_employees', []);
    setSelectedEmployees([]);
  };

  const handleClose = () => {
    setDialog((prevDialog) => ({ ...prevDialog, open: false }));
  };

  return (
    <Dialog open={dialog.open} onClose={handleClose}>
      <DialogContent className="px-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContentText className="text-primary-base font-semibold pt-3 pb-2">
            Task
          </DialogContentText>
          <div className="mx-3">
            <TextField
              margin="dense"
              size="small"
              label="Name"
              error={errors?.name && true}
              helperText={errors.name?.message}
              {...register('name')}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Description"
              size="small"
              error={errors?.description && true}
              helperText={errors.description?.message}
              {...register('description')}
              fullWidth
            />
            <MultiSelect
              className="mt-2"
              options={options}
              value={selectedEmployees}
              onChange={setSelectedEmployees}
              labelledBy="Select"
            />
          </div>
          <div className="flex-center mb-3 space-x-8 mt-4">
            <Button type="button" onClick={handleClose} className="py-1">
              Cancel
            </Button>
            <Button type="submit" className="bg-green-200 py-1 text-white">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
