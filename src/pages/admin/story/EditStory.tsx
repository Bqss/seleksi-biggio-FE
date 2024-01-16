import InputFile from '@/components/atoms/InputFile';
import Dropdown from '@/components/mollecules/Dropdown';
import MainLayout from '@/layouts/MainLayout'
import sweetAlert from '@/services/Swal';
import useStoryChapterStore from '@/store/StoryChapterStore';
import { paramify, useQueryParams } from '@/utils/paramsUtil';
import axiosInstance from '@/services/Axios';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { TagsInput } from 'react-tag-input-component';
import { useLocalStorage } from 'usehooks-ts';

const EditStory = () => {
  const navigate = useNavigate();
  const { id: storyId } = useParams();
  const { isupdate } = useQueryParams();
  const { storyChapters, setStoryChapters, deleteStoryChapter } = useStoryChapterStore();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      title: "",
      author: "",
      synopsis: "",
      category: "",
      status: "",
      tags: [],
      cover: null,
    }
  })

  useEffect(() => {
    if (!storyId) return;
    axiosInstance.get(`http://localhost:3000/api/story/${storyId}`).then(res => {
      const story = res.data.data;
      reset({
        title: story?.title,
        author: story?.author,
        synopsis: story?.synopsis,
        category: story?.category,
        status: story?.status,
        tags: JSON.parse(story?.tags ?? "[]"),
        cover: story?.cover
      });
      if (isupdate != 'true') {
        setStoryChapters(story?.StoryChapters);
      }
    }).catch(err => {
      console.log(err);
    });
  }, [storyId, isupdate])

  const handleDeleteChapter = (pk: string) => {
    deleteStoryChapter(pk);
  }

  const handleBack = () => {
    sweetAlert.fire({
      title: 'Confirmation',
      text: "Are you sure you want to cancel edit the story without saving the data?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, back!',
      cancelButtonText: 'No, cancel!',

    }).then((result) => {
      if (result.isConfirmed) {
        history.back();
      }
    })
  }

  const handleNavigateAddChapter = () => {
    navigate("/story/chapter/create" + paramify({ isupdate: true, storyid: storyId }))
  }


  const handleEdit = useCallback((formData: any) => {
    axiosInstance.put("http://localhost:3000/api/story/" + storyId, {
      ...formData,
      chapters: storyChapters??[],
      tags: JSON.stringify(formData.tags),
      cover: typeof formData.cover === "string" ? null : formData.cover[0],
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {

      navigate("/story");
    }).catch(err => {
      const errors = err.response.data.errors;
      Object.keys(errors).forEach((err: any) => {
        setError(err, {
          type: "server",
          message: errors[err]
        });
      });
    });
  }, [storyId, storyChapters]);

  return (
    <MainLayout>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><a>List Story</a></li>
          <li><a>Edit Story</a></li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(handleEdit)}>
        <div className='mt-6 '>
          <span className='text-2xl font-bold'>Edit Story</span>
          <div className='mt-10 bg-base-100 p-8 rounded-lg flex flex-col gap-y-4'>
            <div className='flex gap-6'>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Title</label>
                <input type="text" className='input input-bordered block w-full' id="" {...register("title")} />
                {errors.title ? (
                  <span className='text-xs text-error'>{String(errors.title.message) ?? ""}</span>
                ) : ""}
              </div>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Writer Name</label>
                <input {...register("author")} type="text" className='input input-bordered block w-full' id="" />
                {errors.title ? (
                  <span className='text-xs text-error'>{String(errors.title.message) ?? ""}</span>
                ) : ""}
              </div>
            </div>
            <div className=''>
              <label htmlFor="" className='block mb-4'>Synopsis</label>
              <textarea {...register("synopsis")} className='textarea textarea-bordered w-full' rows={5} id="" ></textarea>
              {errors.title ? (
                <span className='text-xs text-error'>{String(errors.title.message) ?? ""}</span>
              ) : ""}
            </div>
            <div className='flex gap-6'>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Category</label>
                <select className='select select-bordered w-full' id="" {...register("category")} >
                  <option value=""  >Select Category</option>
                  <option value="financial">Financial</option>
                  <option value="technology">Technology</option>
                  <option value="health">Health</option>
                </select>
                {errors.title ? (
                  <span className='text-xs text-error'>{String(errors.title.message) ?? ""}</span>

                ) : ""}
              </div>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Tags/Keyword Story</label>
                <TagsInput
                  name="tags"
                  classNames={{
                    input: "text-black",
                    tag: "badge badge-success text-white py-3 px-3 rounded-md",
                  }}
                  value={getValues("tags")}
                  onChange={(tags) => setValue("tags", tags)}
                />
                {errors.title ? (
                  <span className='text-xs text-error'>{String(errors.title.message) ?? ""}</span>
                ) : ""}
              </div>
            </div>
            <div className='flex gap-6'>
              <InputFile register={register} name='cover' id='cover' errors={errors} value={getValues("cover")} label='Cover Image' />
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Status</label>
                <select  {...register("status")} id="" className='select select-bordered w-full'>
                  <option value="" disabled>Select Status</option>
                  <option value="published">Publish</option>
                  <option value="draft">Draft</option>
                </select>
                {errors.title ? (
                  <span className='text-xs text-error'>{String(errors.title.message) ?? ""}</span>
                ) : ""}
              </div>
            </div>
            <hr className='my-4' />
            <div >
              <button type='button' className='btn btn-secondary ml-auto block' onClick={handleNavigateAddChapter}>Add Chapter</button>
              <table className='table table-zebra min-h-16'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>LastUpdateAt</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {storyChapters?.map((chapter, index) => (
                    <tr key={index}>
                      <td>{chapter.title}</td>
                      <td>{chapter.updatedAt}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Trigger>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                          </Dropdown.Trigger>
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <button type='button' className="" onClick={() => navigate(`/story/chapter/${chapter.id}/edit`)}>Edit</button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <button type='button' className="" onClick={() => handleDeleteChapter(chapter.id)}>Delete</button>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
            <div className='flex justify-end gap-2'>
              <button type='button' onClick={handleBack} className='btn btn-neutral'>Cancel</button>
              <button type='submit' className='btn btn-success '>Save</button>
            </div>
          </div>
        </div>
      </form>
    </MainLayout>
  )
}

export default EditStory