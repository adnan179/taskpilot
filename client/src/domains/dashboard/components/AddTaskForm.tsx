import { CloseIcon } from "@/assets/Svgs";
import { useAuth } from "@/context/AuthContext";
import { taskSchema } from "@/domains/dashboard/schemas/task.schema";
import { useGetCategories } from "@/domains/dashboard/services/Category.services";
import { useCreateTask, useUpdateTask } from "@/domains/dashboard/services/Task.services";
import { type Task, type TaskPriority, type TaskStatus, type TaskFormData } from "../types/tasks.types";
import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface AddTaskFormProps {
  onClose: () => void;
  taskToEdit?: Task | null;
}

const taskPriorities: TaskPriority[] = ["low","medium","high"];
const taskStatus: TaskStatus[] = ["todo","in-progress","completed"];

const AddTaskForm = ({onClose, taskToEdit}: AddTaskFormProps) => {
    const { user } = useAuth();
    const { data: categories } = useGetCategories(user?.username);
    const createTaskMutation = useCreateTask();
    const updateTaskMutation = useUpdateTask();

    const isEditMode = !!taskToEdit;

    const form = useForm({
        defaultValues:{
            taskName:"",
            description:"",
            priority:"low",
            status:"todo",
            dueDate: "",
            category:"",
            createdBy:user?.username
        },
        validators:{
            onSubmit: taskSchema,
        },
        onSubmit: async({ value }) => {
            if(!value.createdBy){
                toast.error("Cannot create task: User identifier is missing!");
                return;
            }
            const submissionData: TaskFormData = {
                ...value,
            }

            try{
                if(isEditMode && taskToEdit){
                    await updateTaskMutation.mutateAsync({
                        id:taskToEdit._id,
                        payload:{
                            name:submissionData.taskName,
                            description:submissionData.description,
                            priority:submissionData.priority as TaskPriority,
                            status:submissionData.status as TaskStatus,
                            dueDate:submissionData.dueDate,
                            category:submissionData.category,
                        }
                    });
                    toast.success(`Task ${value.taskName} updated successfully`);
                    onClose();
                    return;
                }else{
                    await createTaskMutation.mutateAsync(submissionData);
                    toast.success(`Task ${value.taskName} created successfully`);
                    onClose();
                }
                
            }catch(error){
                console.log("Error creating a new task:",error);
                toast.error(error instanceof Error ? error.message:"Failed to create task")
            }
        }
    });

    //getting form data for the edit mode
    useEffect(() => {
        if(isEditMode && taskToEdit){
            form.reset({
                taskName:taskToEdit.name,
                description: taskToEdit.description || "",
                priority: taskToEdit.priority,
                status: taskToEdit.status,
                dueDate: taskToEdit.dueDate?.split('T')[0] || "",
                category: taskToEdit.category || "",
                createdBy: taskToEdit.createdBy 
            })
        }else{
            form.reset({
                taskName: "",
                description: "",
                priority: "low",
                status: "todo",
                dueDate: "",
                category: "",
                createdBy: user?.username || ""
            })
        }
    },[taskToEdit, form, user?.username, isEditMode]);

  return (
    <form onSubmit={(e) =>{
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit()
    }} className="relative bg-gray-50 rounded-xl p-10 shadow-md flex flex-col gap-0">
      <h2 className='text-2xl font-bold'>{isEditMode ? "Edit Task" : "Add New Task"}</h2>
      <p className='text-gray-400 text-lg mb-4'>{isEditMode ? "Update the task details" : "Create a new task to keep track of your work."}</p>
      <div onClick={onClose} className='absolute top-4 right-4 cursor-pointer'>
        <CloseIcon />
      </div>
      {/* task name input */}
      <div className="w-[400px]">
        <form.Field 
            name="taskName"
            children={(field) => (
                <div className="mb-4">
                    <label htmlFor={field.name} className='block text-sm font-medium text-gray-700 mb-1'>
                        Task Name*
                    </label>
                    <input 
                        type="text"
                        placeholder="Task Name"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className='p-4 sm:w-[400px] w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'
                    />
                    {field.state.meta.errors?.map((error,idx) => (
                        <p key={idx} className='text-red-500 text-sm mt-1'>
                            {error?.message}
                        </p>
                    ))}
                </div>
            )}
        />
      </div>
      {/* task name input */}
      {/* task category input */}
      <div className="w-[400px]">
            <form.Field 
                name="category"
                children={(field) => (
                    <div className="mb-4">
                         <label htmlFor={field.name} className='block text-sm font-medium text-gray-700 mb-1'>Category (Optional)</label>
                        <select title="category"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className='p-4 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'>
                            <option value="">Select Category</option>
                            {categories?.map((cat) => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        
                    </div>
                )}
            />
        </div>
        {/* task category input */}
      {/* task description input */}
      <div className="w-[400px]">
        <form.Field 
            name="description"
            children={(field) => (
                <div className="mb-4">
                    <label htmlFor={field.name} className='block text-sm font-medium text-gray-700 mb-1'>Description (optional)</label>
                    <textarea rows={3} 
                        placeholder="Description"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className='p-4 sm:w-[400px] w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'
                    />
                    {field.state.meta.errors?.map((error,idx) => (
                        <p key={idx} className='text-red-500 text-sm mt-1'>
                            {error?.message}
                        </p>
                    ))}
                </div>
            )}
        />
      </div>
      {/* task name description */}
      <div className="w-[400px] flex gap-3">
        {/* task priority input */}
            <div className="flex w-1/2">
                <form.Field 
                    name="priority"
                    children={(field) => (
                        <div className="mb-4">
                            <label htmlFor={field.name} className='block text-sm font-medium text-gray-700 mb-1'>Priority</label>
                            <select title="priority"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className='p-4 w-[200px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'
                            >
                                <option value="">Select Priority</option>
                                {taskPriorities.map((priority) => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))}
                            </select>
                            {field.state.meta.errors?.map((error,idx) => (
                                <p key={idx} className='text-red-500 text-sm mt-1'>
                                    {error?.message}
                                </p>
                            ))}
                        </div>
                    )}
                />
            </div>
            {/* task priority input */}
            {/* task status input */}
            <div className="flex w-1/2">
                <form.Field 
                    name="status"
                    children={(field) => (
                        <div className="mb-4">
                            <label htmlFor={field.name} className='block text-sm font-medium text-gray-700 mb-1'>Status*</label>
                            <select title="Status"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className='p-4 w-[200px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'
                            >
                                <option value="">Select Status</option>
                                {taskStatus.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            {field.state.meta.errors?.map((error,idx) => (
                                <p key={idx} className='text-red-500 text-sm mt-1'>
                                    {error?.message}
                                </p>
                            ))}
                        </div>
                    )}
                />
        </div>
        {/* task status input */}
      </div>
        
      {/* task due date input */}
      <div className="w-[400px]">
        <form.Field 
            name="dueDate"
            children={(field) => (
                <div className="mb-4">
                    <label htmlFor={field.name} className='block text-sm font-medium text-gray-700 mb-1'>Due Date*</label>
                    <input title="dueDate"
                        type="date"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className='p-4 sm:w-[400px] w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'
                    />
                    {field.state.meta.errors?.map((error,idx) => (
                        <p key={idx} className='text-red-500 text-sm mt-1'>
                            {error.message}
                        </p>
                    ))}
                </div>
            )}
        />
      </div>
       {/* task due date input */}
       <div className="flex justify-end">
        <button type='submit' className='w-[180px] px-4 py-2 bg-[#00002E] text-[20px] text-white font-medium shadow-md rounded-lg cursor-pointer hover:bg-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300'>
            {isEditMode ? "Update Task" : "Create Task"}
        </button>
       </div>
       {form.state.isSubmitting && (
          <p className="text-2xl text-gray-900">{isEditMode ? "Updating Task..." : "Adding Task..."}</p>
      )}
      {createTaskMutation.isError && (
        <p className='text-red-500 text-lg mt-2'>
          Error: {createTaskMutation.error?.message || (isEditMode ? 'Could not update task.' : 'Could not add task.')}
        </p>
      )}
    </form>
  )
}

export default AddTaskForm
