import { useForm } from '@tanstack/react-form';
import { CloseIcon } from '@/assets/Svgs'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { useCreateCategory } from '@/domains/dashboard/services/Category.services';
import { type CategoryFormData } from '../types/categories.types';
import { categorySchema } from '@/domains/dashboard/schemas/category.schema';


const colors = [
  { name: 'Light Red', hexCode: '#FFCCCB' },
  { name: 'Light Blue', hexCode: '#ADD8E6' },
  { name: 'Light Green', hexCode: '#90EE90' },
  { name: 'Pink', hexCode: '#FFC0CB' },
  { name: 'Orange', hexCode: '#FFA500' },
  { name: 'Purple', hexCode: '#E6E6FA' },
  { name: 'Teal', hexCode: '#AFEEEE' }, 
];

interface AddCategoryFormProps{
  onClose: () => void;
}

const AddCategoryForm = ({onClose}: AddCategoryFormProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0].hexCode);
  const {user} = useAuth();
  const createCategoryMutation = useCreateCategory();

  const form = useForm({
    defaultValues:{
      categoryName:"",
      categoryColor:"",
      createdBy:user?.username
    },
    validators:{
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      if(!value.createdBy){
        toast.error("Cannot create category: User identifier is missing!")
      }
      const submissionData:CategoryFormData ={
        ...value,
        categoryColor:selectedColor, 
      };
      try{
        await createCategoryMutation.mutateAsync(submissionData);
        toast.success(`${value.categoryName} created successfully`);
        onClose()
      }catch(error){
        console.log("Error adding a new category:",error);
        toast.error(error instanceof Error ? error.message:"Failed to add category")
      }
    }
  })
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit();
    }}
    className='relative bg-gray-50 rounded-xl p-10 shadow-md flex flex-col gap-3 '>
      <h2 className='text-2xl font-bold'>Add New Category</h2>
      <p className='text-gray-400 text-lg mb-4'>Create a new category to organize your tasks.</p>
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
              {field.state.meta.errors?.map((error,idx) => (
                <p key={idx} className='text-red-500 text-sm mt-1'>
                  {error?.message} 
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
              <label className='block text-sm font-medium text-gray-700 mb-1'>Category Color</label>
              <div className='flex flex-wrap gap-2'>
                {colors.map((color) => (
                  <div
                    key={color.name}
                    onClick={() => {
                      field.handleChange(color.hexCode);
                      setSelectedColor(color.hexCode);
                    }}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColor === color.hexCode ? 'border-gray-900 ring-1 ring-gray-900' : 'border-transparent'}`}
                    style={{ backgroundColor: color.hexCode }}
                    title={color.name}
                  />
                ))}
              </div>
              {field.state.meta.errors?.map((error,idx) => (
                <p key={idx} className='text-red-500 text-sm mt-1'>
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        />
      </div>
      <div className='flex justify-end'>
        <button type='submit' className='w-[180px] px-4 py-2 bg-[#00002E] text-[20px] text-white font-medium shadow-md rounded-lg cursor-pointer hover:bg-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300'>
          Add Category
        </button>
      </div>
      {form.state.isSubmitting && (
          <p className="text-lg text-gray-900">Adding Category...</p>
      )}
      {createCategoryMutation.isError && (
        <p className='text-red-500 text-lg mt-2'>
          Error: {createCategoryMutation.error?.message || 'Could not add category.'}
        </p>
      )}
    </form>
  )
}

export default AddCategoryForm
