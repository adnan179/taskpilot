import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import { useDeleteTask, useUpdateTask, type Task, type TaskPriority, type TaskStatus } from '@/domains/dashboard/services/Task.services';
import { toast } from 'react-toastify';

const taskStatuses: TaskStatus[] = ["todo","in-progress","completed"];

interface TaskTableProps{
    onEditTask: (task: Task) => void,
    tasks: Task[] | undefined,
    isLoading: boolean,
    error: Error | null,
}

const TasksTable = ({ onEditTask, tasks, isLoading, error} : TaskTableProps) => {
  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();

  //state for delete confirmation modal
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [taskNameToDelete, setTaskNameToDelete] = useState<string | null>(null);

  const handleStatusChange = async(taskId:string, newStatus: TaskStatus) => {
    try{
        await updateMutation.mutateAsync({
            id:taskId,
            payload:{ status: newStatus },
        });
        toast.success(`Task status updated to ${newStatus.replace("-"," ")}`);
    }catch(error){
        console.log("Error updating task status:",error);
        toast.error(error instanceof Error ? error.message:"Failed to update task status");
    }
  }
  const openDeleteConfirmModal = (task:Task) => {
    setTaskToDelete(task._id);
    setTaskNameToDelete(task.name);
    setShowDeleteConfirmModal(true);
  }

  const handleConfirmDelete = async() => {
    if(taskToDelete){
        try{
            await deleteMutation.mutateAsync(taskToDelete);
            toast.success(`Task ${taskNameToDelete} deleted successfully!!`);
        }catch(err){
            toast.error(err instanceof Error ? err.message : `Failed to delete ${taskNameToDelete} task!!`);
            console.error(`Error deleting ${taskNameToDelete} task:`, err);
        }
        setShowDeleteConfirmModal(false);
        setTaskNameToDelete(null);
        setTaskToDelete(null);
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setTaskNameToDelete(null);
    setTaskToDelete(null);
  }

  //defining the columns for the table
  const columns = useMemo<ColumnDef<Task>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Task Name',
      cell: info => <span className="font-medium text-gray-900 text-[16px]">{info.getValue() as string}</span>,
    },
    {
        accessorKey:"description",
        header:"Description",
        cell: info => {
            const description = info.getValue() as string;
            return description || <span className="text-[16px] text-gray-400">N/A</span>;
        }
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: info => {
        const priority = info.getValue() as TaskPriority;
        let colorClass = '';
        switch (priority) {
          case 'high': colorClass = 'border border-red-400 text-red-400'; break;
          case 'medium': colorClass = 'border border-yellow-400 text-yellow-400'; break;
          case 'low': colorClass = 'border border-green-400 text-green-400'; break;
        }
        return <span className={`font-semibold text-[16px] px-4 py-2 rounded-md ${colorClass}`}>{priority ? priority.toUpperCase() : 'N/A'}</span>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const task = row.original;
        const currentStatus = task.status;
        const isUpdatingThisTask = updateMutation.isPending && updateMutation.variables?.id === task._id;
        let selectBgColorClass = '';
        switch (currentStatus) {
          case 'todo': selectBgColorClass = 'bg-gray-200 text-gray-800'; break;
          case 'in-progress': selectBgColorClass = 'bg-blue-200 text-blue-800'; break;
          case 'completed': selectBgColorClass = 'bg-green-200 text-green-800'; break;
          default: selectBgColorClass = 'bg-gray-100 text-gray-600'; break;
        }
        return (
            <select title='task status'
            value={currentStatus}
            onChange={(e) => {
              const newStatus = e.target.value as TaskStatus;
              handleStatusChange(task._id, newStatus);
            }}
            disabled={isUpdatingThisTask}
            className={`px-4 py-2 border rounded-md text-[16px] font-medium focus:outline-none focus:ring-1 focus:ring-gray-800 transition-colors duration-150 ${selectBgColorClass} disabled:opacity-70 disabled:cursor-not-allowed`}
            onClick={(e) => e.stopPropagation()} // Prevent row click events if any
          >
            {taskStatuses.map(statusVal => (
              <option key={statusVal} value={statusVal} className="capitalize bg-white text-gray-800">
                {statusVal.charAt(0).toUpperCase() + statusVal.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        )
      }

    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
      cell: info => {
        const dateValue = info.getValue() as string;
        return dateValue ? new Date(dateValue).toLocaleDateString() : 'N/A';
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: info => {
        const category = info.getValue() as string | undefined;
        return category || <span className="text-[16px] text-gray-400">N/A</span>; 
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => onEditTask(row.original)}
              className="text-indigo-600 hover:text-indigo-900 text-[16px] px-4 py-2 border border-indigo-300 rounded-md hover:bg-indigo-50 transition-colors duration-150 cursor-pointer"
            >
              Edit
            </button>
            <button 
              onClick={() => openDeleteConfirmModal(row.original)}
              disabled={deleteMutation.isPending && deleteMutation.variables === row.original._id}
              className="text-red-600 hover:text-red-900 text-[16px] px-4 py-2 border border-red-300 rounded-md hover:bg-red-50 transition-colors duration-150 cursor-pointer"
            >
              {deleteMutation.isPending && deleteMutation.variables === row.original._id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        );
      }
    }
  ], [deleteMutation.isPending, deleteMutation.variables, onEditTask]);


  const table = useReactTable({
    data: tasks || [], 
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className='flex justify-center items-center p-10'><p className='text-lg text-gray-600'>Loading tasks...</p></div>;

  if (error) return <div className='text-center p-6 bg-red-50 border border-red-200 rounded-md'><p className='text-red-700 font-semibold'>Error loading tasks:</p><p className='text-red-600'>{error.message}</p></div>;
  
  return (
    <div className="overflow-x-auto bg-white shadow-xl rounded-lg p-1 sm:p-2 mt-8">
      {(!tasks || tasks.length === 0) && !isLoading && (
         <div className="text-center p-10">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-[24px] font-medium text-gray-900">No tasks</h3>
            <p className="mt-1 text-[16px] text-gray-500">Get started by creating a new task.</p>
         </div>
      )}
      {tasks && tasks.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-3 sm:px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3 sm:px-5 whitespace-nowrap text-[16px] text-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the task "<span className='font-medium'>{taskNameToDelete || 'this task'}</span>"?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksTable;
