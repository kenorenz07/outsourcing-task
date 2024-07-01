import React from 'react';
import { APP_API } from '../config/app.config';
import { TaskType } from '../models/Task.model';
import { errorNotify, successNotify } from '../utils/toast.util';
import httpClient from '@/plugins/axios';
import { DialogInputActions } from '@/pages';

interface InventoryServiceCommonType {
  selectedTask: TaskType | null;
  setConfirmDialog: React.Dispatch<React.SetStateAction<DialogInputActions>>;
}
export const deleteTask = async ({
  selectedTask,
  setConfirmDialog,
}: InventoryServiceCommonType) => {
  try {
    setConfirmDialog({ open: true, loading: true });
    await httpClient.delete(APP_API + '/tasks/' + selectedTask?.id);
    successNotify('Tasks deleted successfully.');
    setConfirmDialog({ open: false, loading: false });
    return true;
  } catch (e) {
    errorNotify('Delete Error');
  }
  return false;
};
