import MainLayout from '@/layouts/MainLayout'
import sweetAlert from '@/services/Swal';
import useStoryChapterStore from '@/store/StoryChapterStore'
import { paramify, useQueryParams } from '@/utils/paramsUtil';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const AddChapter = () => {
  const { addStoryChapter } = useStoryChapterStore();
  const {isupdate, storyid} = useQueryParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Omit<StoryChapter, "id">>({
    defaultValues: {
      title: '',
      story: ''
    },
    mode: "onChange"
  });

  const handleAddStoryChapter = (data: any) => {
    addStoryChapter(data);
    if(isupdate == 'true'){
      navigate(`/story/${storyid}/edit/`+paramify({isupdate: 'true'}))
    }else{
      history.back()
    };
  }

  const handleBack = () => {
    sweetAlert.fire({
      title: 'Confirmation',
      text: "Are you sure you want to cancel adding the chapter without saving the data?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, back!',
      cancelButtonText: 'No, cancel!',

    }).then((result) => {
      if (result.isConfirmed) {
        if(isupdate == 'true'){
          navigate(`/story/${storyid}/edit`+paramify({isupdate: 'true'}))
        }else{
          history.back()
        }
      }
    })   
  }

  return (
    <MainLayout>
      <div className="text-sm breadcrumbs">
        <ul >
          <li><a>List Story</a></li>
          <li><a>Add Story</a></li>
        </ul>
      </div>
      <form className='mt-6' onSubmit={handleSubmit(handleAddStoryChapter)}>
        <span className='text-2xl font-bold'>Add Chapter</span>
        <div className='mt-10 bg-base-100 p-8 rounded-lg flex flex-col gap-y-4'>
          <div className=''>
            <label htmlFor="" className='mb-4 block'>Title</label>
            <input type="text" {...register("title", { required: true})} className='input input-bordered block w-full'  id="" />
            {errors.title?.type == "required" ? (
              <span className='text-xs text-error'>{"Title field is Required"}</span>
            ) : ""}
          </div>
          <div className=''>
            <label htmlFor="" className='block mb-4'>Synopsis</label>
            <textarea {...register("story", { required: true })} className='textarea textarea-bordered w-full' rows={5} id="" ></textarea>
            {errors.story?.type== 'required' ? (
              <span className='text-xs text-error'>{"Story field is Required"}</span>
            ) : ""}
          </div>
        </div>
        <div className='flex justify-end mt-6 gap-4'>
          <button type='button' onClick={handleBack} className='btn btn-neutral'>Cancel</button>
          <button type='submit' disabled={!isValid} className='btn btn-success '>Save</button>
        </div>

      </form>
    </MainLayout>
  )
}

export default AddChapter