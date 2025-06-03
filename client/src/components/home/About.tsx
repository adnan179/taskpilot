import { CircleCheck,Zap, People } from "@/assets/Svgs";

const AboutData = [
    {
        title:"Task Management",
        desc:"Create, edit, and organize your tasks with ease. Set priorities, due dates, and track completion.",
        icon:<CircleCheck />
    },
    {
        title:"Categories",
        desc:"Organize your tasks into custom categories with color coding for better visual organization.",
        icon:<People />
    },
    {
        title:"Multiple Views",
        desc:"Switch between card and table views. Includes dark/light modes for comfortable viewing.",
        icon:<Zap />
    },
]

const About = () => {
  return (
    <section className='w-full flex flex-col gap-4 justify-center items-center py-10 md:py-20 mx-auto'>
      <h1 className='text-[36px] sm:text-[56px] font-bold text-gray-800'>Everything you need to stay organized</h1>
      <p className='text-[20px] sm:text-[24px] text-gray-400'>Simple yet powerful features designed to help you manage your tasks efficiently</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {AboutData.map((item,index) => (
            <div key={index} className="w-full md:w-[450px] p-4 sm:p-6 gap-3 md:gap-5 bg-white border border-gray-200 rounded-2xl flex flex-col justify-center items-center hover:shadow-md hover:scale-105 ease-in-out duration-500">
                {item.icon}
                <h1 className="text-[18px] sm:text-[24px] font-semibold text-gray-800">{item.title}</h1>
                <p className="text-[14px] sm:text-[16px] text-gray-400 text-center">{item.desc}</p>
            </div>
        ))}
      </div>
    </section>
  )
}

export default About
