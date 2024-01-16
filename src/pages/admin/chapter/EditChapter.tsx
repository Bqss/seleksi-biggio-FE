import MainLayout from '@/layouts/MainLayout'
import useStoryChapterStore from '@/store/StoryChapterStore'
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

const EditChapter = () => {
  const navigate = useNavigate();
  const { id: storyChapterId } = useParams();
  const { storyChapters, editStoryChapter } = useStoryChapterStore();

 
  useEffect(() => {
    if (!storyChapterId) return;
    const storyChapter = storyChapters.find(storyChapter => storyChapter.id == storyChapterId);
    if (!storyChapter) return;
    reset({
      title: storyChapter.title,
      story: storyChapter.story
    });
  }, [storyChapterId]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Omit<StoryChapter, "id">>({
    defaultValues: {
      title: '',
      story: ''
    },
    mode: "onChange"
  });

  const handleEditStoryChapter = (data: any) => {
    if (!storyChapterId) return;
    console.log(data)
    editStoryChapter({
      id: storyChapterId,
      storyChapter: data
    });
    navigate('/story/create');
  }

  return (
    <MainLayout>
      <div className="text-sm breadcrumbs">
        <ul >
          <li><a>List Story</a></li>
          <li><a>Edit Chapter</a></li>
        </ul>
      </div>
      <form className='mt-6' onSubmit={handleSubmit(handleEditStoryChapter)}>
        <span className='text-2xl font-bold'>Add Chapter</span>
        <div className='mt-10 bg-base-100 p-8 rounded-lg flex flex-col gap-y-4'>
          <div className=''>
            <label htmlFor="" className='mb-4 block'>Title</label>
            <input type="text" {...register("title", { required: true })} className='input input-bordered block w-full' id="" />
            {errors.title?.type == "required" ? (
              <span className='text-xs text-error'>{"Title field is Required"}</span>
            ) : ""}
          </div>
          <div className=''>
            <label htmlFor="" className='block mb-4'>Synopsis</label>
            <textarea {...register("story", { required: true })} className='textarea textarea-bordered w-full' rows={5} id="" ></textarea>
            {errors.story?.type == 'required' ? (
              <span className='text-xs text-error'>{"Story field is Required"}</span>
            ) : ""}
          </div>
        </div>
        <div className='flex justify-end mt-6 gap-4'>
          <button type='button' onClick={() => navigate("/story/create")} className='btn btn-neutral'>Cancel</button>
          <button type='submit' disabled={!isValid} className='btn btn-success '>Save</button>
        </div>

      </form>
    </MainLayout>
  )
}

export default EditChapter