import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { CloseIcon } from '@/assets/Svgs'

const AddCategoryForm = ({onClose}: {onClose: () => void}) => {
  const form = useForm({
    defaultValues:{
      categoryName:"",
      categoryColor:""
    },
    onSubmit: async ({ value }) => {
      try{
        const response = await axios.post("http://localhost:3030/api/category");
        
      }
      catch(error){
        console.log("Error adding a new category", error)
      }
    }
  })
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit();
    }}
    className='relative bg-gray-50 rounded-xl p-10 shadow-md flex flex-col gap-3 justify-center items-center'>
      <div onClick={onClose} className='absolute top-4 right-4 cursor-pointer'>
        <CloseIcon />
      </div>
      <div className='w-full'>
        <form.Field 
          name='categoryName'
          children={(field) => (
            <div className='mb-4'>
              <input 
                type='text' 
                placeholder='Category Name'
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

      <div className='w-full'>
        <form.Field 
          name='categoryColor'
          children={(field) => (
            <div className='mb-4'>
              <input 
                type='text' 
                placeholder='Category Color'
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
      <button type='submit' className=' justify-end flex px-4 py-2 bg-gray-900 text-[20px] text-white font-medium shadow-md rounded-lg'>
        Add Category
      </button>
      {form.state.isSubmitting && (
          <p className="text-sm text-gray-500">Adding Category...</p>
        )}
    </form>
  )
}

export default AddCategoryForm
