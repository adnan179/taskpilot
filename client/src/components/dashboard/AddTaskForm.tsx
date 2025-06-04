import { CloseIcon } from "@/assets/Svgs";
import { useAuth } from "@/context/AuthContext";
import { useGetCategories } from "@/services/Category.services";
import { useForm } from "@tanstack/react-form";

interface AddTaskFormProps {
  onClose: () => void;
}
const AddTaskForm = ({onClose}: AddTaskFormProps) => {
    const { user } = useAuth();
    const { data: categories} = useGetCategories();

    const form = useForm({
        defaultValues:{
            taskName:"",
            description:"",
            priority:"",
            status:"",
            DueDate: "",
            category:"",
            createdBy:user?.username
        }
    })
  return (
    <form onSubmit={(e) =>{
        e.preventDefault();
    }} className="relative bg-gray-50 rounded-xl p-10 shadow-md flex flex-col gap-3 ">
      <h2 className='text-2xl font-bold'>Add New Task</h2>
      <p className='text-gray-400 text-lg mb-4'>Create a new task to keep track of your work.</p>
      <div onClick={onClose} className='absolute top-4 right-4 cursor-pointer'>
        <CloseIcon />
      </div>
      {/* task name input */}
      <div className="w-[400px]">
        <form.Field 
            name="taskName"
            children={(field) => (
                <div className="mb-4">
                    <input 
                        type="text"
                        placeholder="Task Name"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className='p-4 sm:w-[400px] w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'
                    />
                    {field.state.meta.errors?.map((error) => (
                        <p key={error} className='text-red-500 text-sm mt-1'>
                            {error}
                        </p>
                    ))}
                </div>
            )}
        />
      </div>
      {/* task name input */}
      {/* task description input */}
      <div className="w-[400px]">
        <form.Field 
            name="description"
            children={(field) => (
                <div className="mb-4">
                    <textarea 
                        placeholder="Description"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className='p-4 sm:w-[400px] w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'
                    />
                    {field.state.meta.errors?.map((error) => (
                        <p key={error} className='text-red-500 text-sm mt-1'>
                            {error}
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
                            <select title="Priority"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className='p-4 w-[200px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'
                            >
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {field.state.meta.errors?.map((error) => (
                                <p key={error} className='text-red-500 text-sm mt-1'>
                                    {error}
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
                            <select title="Status"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className='p-4 w-[200px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'
                            >
                                <option value="">Select Status</option>
                                <option value="todo">To Do</option>
                                <option value="inprogress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            {field.state.meta.errors?.map((error) => (
                                <p key={error} className='text-red-500 text-sm mt-1'>
                                    {error}
                                </p>
                            ))}
                        </div>
                    )}
                />
        </div>
        {/* task status input */}
      </div>
        {/* task category input */}
        <div className="w-[400px]">
            <form.Field 
                name="category"
                children={(field) => (
                    <div className="mb-4">
                        <select title="category"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className='p-4 w-[200px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'>
                            <option value="">Select Category</option>
                            {categories?.map((cat) => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        {field.state.meta.errors?.map((error) => (
                            <p key={error} className='text-red-500 text-sm mt-1'>
                                {error}
                            </p>
                        ))}
                    </div>
                )}
            />
        </div>
        {/* task category input */}
      {/* task due date input */}
      <div className="w-[400px]">
        <label className="text-lg text-gray-400">Due Date</label>
        <form.Field 
            name="startDateTime"
            children={(field) => (
                <div className="mb-4">
                    <input title="Due Date"
                        type="date"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className='p-4 sm:w-[400px] w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900'
                    />
                    {field.state.meta.errors?.map((error) => (
                        <p key={error} className='text-red-500 text-sm mt-1'>
                            {error}
                        </p>
                    ))}
                </div>
            )}
        />
      </div>
       {/* task due date input */}
    </form>
  )
}

export default AddTaskForm
