
import MainLayout from '@/layouts/MainLayout'
import axiosInstance from '@/services/Axios';
import { useEffect, useState } from 'react';
import {  useParams } from 'react-router';
import { TagsInput } from 'react-tag-input-component';

const DetailStory = () => {
  const {id : StoryId } = useParams();
  const [story, setStory] = useState<Story>();
  useEffect(() => {
    axiosInstance.get(`/story/${StoryId}`).then(res => {
      setStory(res.data.data);
    }).catch(err => {
      console.log(err);
    });
  },[StoryId]);



  return (
    <MainLayout>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><a>List Story</a></li>
          <li><a>Detail</a></li>
        </ul>
      </div>
  
        <div className='mt-6 '>
          <span className='text-2xl font-bold'>Detail Story "{story?.title}"</span>
          <div className='mt-10 bg-base-100 p-8 rounded-lg flex flex-col gap-y-4'>
            <div className='flex gap-6'>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Title</label>
                <input type="text" readOnly className='input input-bordered block w-full' id="" defaultValue={story?.title} />
              </div>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Writer Name</label>
                <input  type="text" readOnly className='input input-bordered block w-full' id="" defaultValue={story?.author} />
              
              </div>
            </div>
            <div className=''>
              <label htmlFor="" className='block mb-4'>Synopsis</label>
              <textarea readOnly defaultValue={story?.synopsis} className='textarea textarea-bordered w-full' rows={5} id="" ></textarea>
            </div>
            <div className='flex gap-6'>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Category</label>
                <select className='select select-bordered w-full' disabled id="" defaultValue={story?.category} >
                  <option value="" disabled >Select Category</option>
                  <option value="financial">Financial</option>
                  <option value="technology">Technology</option>
                  <option value="health">Health</option>
                </select>
              
              </div>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Tags/Keyword Story</label>
                <TagsInput
                  name="tags"
                  classNames={{
                    input: "text-black",
                    tag: "badge badge-success text-white py-3 px-3 rounded-md",
                  }}
                  value={JSON.parse(story?.tags ?? "[]")}
                  disabled={true}
                />
              
              </div>
            </div>
            <div className='flex gap-6'>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Cover Image</label>
                <div>
                  <img src={story?.cover} className='w-40 h-40 rounded-md' alt="" />
                </div>
              </div>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Status</label>
                <select id="" defaultValue={story?.status} disabled className='select select-bordered w-full'>
                  <option value="" disabled>Select Status</option>
                  <option value="published">Publish</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <hr className='my-4' />
            <div >
              <table className='table table-zebra min-h-16'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>LastUpdateAt</th>
                  </tr>
                </thead>
                <tbody>
                  {story?.StoryChapters?.map((chapter, i) => (
                    <tr key={i}>
                      <td>{chapter.title}</td>
                      <td>{chapter.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex'>
              <button className='btn btn-warning ml-auto mt-7'onClick={()=>history.back()}>Back</button>
            </div>
          </div>
        </div>
    </MainLayout>
  )
}

export default DetailStory;