import { RootState } from '@/redux/store';
import useEmployees from '@/shared/hooks/employees.hook';
import useTasks from '@/shared/hooks/task.hook';
import { PagePropsType } from '@/types/app-components';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import { deleteTask } from '@/shared/services/Task.service';
import { TaskType } from '@/shared/models/Task.model';
import { useDispatch } from 'react-redux';
import { tasksAction } from '@/redux/slices/taskSlice';
import TaskForm, {
  DialogTaskFormInterface,
} from '@/components/dialogs/TaskForm';
import { errorNotify, successNotify } from '@/shared/utils/toast.util';
import { APP_API } from '@/shared/config/app.config';
import httpClient from '@/plugins/axios';
import { userActions } from '@/redux/slices/userSlice';
import { setUserToken } from '@/shared/utils/local-storage.util';
import { useRouter } from 'next/router';
export interface DialogInputActions {
  open: boolean;
  loading: boolean;
}

const Home: PagePropsType = () => {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState<DialogInputActions>({
    open: false,
    loading: false,
  });
  const router = useRouter();
  const { initializeTasks } = useTasks();
  const { initializeEmployees } = useEmployees();
  const [confirmDialog, setConfirmDialog] = useState<DialogInputActions>({
    loading: false,
    open: false,
  });

  useEffect(() => {
    initializeTasks();
    initializeEmployees();
  }, []);

  const tasks = useSelector((state: RootState) => state.task.tasks);
  const employees = useSelector((state: RootState) => state.employee.employees);

  const onSubmitTask = async (form: DialogTaskFormInterface) => {
    try {
      setDialog((prev) => ({ ...prev, loading: true }));

      if (selectedTask?.id) {
        const result = await httpClient.put(
          APP_API + '/tasks/' + selectedTask.id,
          form
        );
        dispatch(tasksAction.updateTask(result.data.data));
        successNotify('Updated task successfully');
      } else {
        const result = await httpClient.post(APP_API + '/tasks', form);
        dispatch(tasksAction.addTask(result.data.data));
        successNotify('Created task successfully');
      }

      setDialog((prev) => ({ ...prev, open: false }));
    } catch (e) {
      errorNotify('Submit error');
    } finally {
      setSelectedTask(null);
      setDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteConfirmation = async (okay?: boolean) => {
    if (okay == true) {
      const deleted = await deleteTask({
        selectedTask: selectedTask,
        setConfirmDialog,
      });
      if (deleted === true) {
        dispatch(tasksAction.deleteTask(selectedTask?.id));
        setSelectedTask(null);
      }
    } else {
      setConfirmDialog({ ...confirmDialog, open: false });
    }
  };

  const handleLogout = async () => {
    try {
      await httpClient.post(APP_API + '/logout');
      dispatch(userActions.setAuthenticatedUser(null));
      setUserToken('');
      successNotify('Logged out successfully');
      router.push('/login');
    } catch (e) {
      errorNotify('Error in logout');
    }
  };

  return (
    <section>
      <div className="w-full p-10">
        <div className="flex justify-between">
          <div className="text-4xl font-bold mb-2">TASKS</div>
          <div className="text-4xl font-bold mb-2">
            <AddIcon
              onClick={() => setDialog({ ...dialog, open: true })}
              className="text-4xl font-bold mb-2 cursor-pointer"
            />
          </div>
          <div>
            <LogoutIcon
              onClick={() => handleLogout()}
              className="text-4xl font-bold mb-2 cursor-pointer"
            />
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Assigned Employees</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.assigned_users}</TableCell>
                  <TableCell align="right">
                    <EditIcon
                      className="text-yellow-800 cursor-pointer"
                      onClick={() => {
                        setSelectedTask(row);
                        setDialog({ ...dialog, open: true });
                      }}
                    />
                    <DeleteIcon
                      className="text-red-800 cursor-pointer"
                      onClick={() => {
                        setSelectedTask(row);
                        setConfirmDialog({ ...confirmDialog, open: true });
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ConfirmationDialog
          id="task-delete"
          keepMounted
          description="Are you sure to delete this task?"
          open={confirmDialog.open}
          onClose={handleDeleteConfirmation}
          loading={confirmDialog.loading}
        />
        <TaskForm
          dialog={dialog}
          selectedTask={selectedTask}
          setDialog={setDialog}
          onSave={onSubmitTask}
          employees={employees ?? []}
        />
      </div>
    </section>
  );
};

Home.auth = {
  required: true,
  roles: [
    'add-users',
    'delete-users',
    'edit-users',
    'view-users',
    'add-tasks',
    'delete-tasks',
    'edit-tasks',
    'view-tasks',
  ],
};

export default Home;
