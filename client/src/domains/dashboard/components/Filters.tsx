import { FilterIcon, SearchIcon } from '@/assets/Svgs';
import { useAuth } from '@/context/AuthContext';
import { useGetCategories } from '@/domains/dashboard/services/Category.services';
import React from 'react'

export type TaskFilters = {
    search:string;
    status:string;
    priority:string;
    category:string;
    isTableView:boolean;
};

type Props = {
    filters:TaskFilters;
    setFilters:(filters:TaskFilters) => void;
};


const Filters = ({filters, setFilters}:Props) => {
    const { user } = useAuth();
    const { data:categories } = useGetCategories(user?.username);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({...filters,[name]:value})
    };

  return (
    <div className='flex w-full flex-wrap gap-4 my-4 bg-white p-4 rounded-2xl'>
        {/* search filter */}
        <div className='relative w-fit'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none '>
                <SearchIcon />
            </div>
            <input 
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder='Search tasks...'
                className='lg:w-[800px] md:w-[600px] sm:w-[250px] w-full bg-[#F6F5FF] pl-10 px-8 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900'
            />
        </div>
        {/* search filter */}
        
        {/* category filter */}
        <div className="relative w-fit">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FilterIcon  />
            </div>
            <select
                title="category"
                name="category"
                value={filters.category}
                onChange={handleChange}
                className="bg-[#F6F5FF] text-gray-700 pl-10 px-8 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900"
            >
                <option value="">All Category</option>
                {categories?.map((category) => (
                <option key={category._id} value={category.name}>
                    {category.name}
                </option>
                ))}
            </select>
        </div>
        {/* category filter */}

        
        {/* status filter */}
        <select title='status' name='status' value={filters.status} onChange={handleChange} className='bg-[#F6F5FF] px-8 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900'>
            <option value="">All Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
        </select>
        {/* status filter */}

        {/* priority filter */}
        <select title='priority' name='priority' value={filters.priority} onChange={handleChange} className='bg-[#F6F5FF] px-8 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900'>
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        {/* priority filter */}
        


    </div>
  )
}

export default Filters;
