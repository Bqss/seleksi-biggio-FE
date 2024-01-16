import Dropdown from '@/components/mollecules/Dropdown';
import MainLayout from '@/layouts/MainLayout'
import sweetAlert from '@/services/Swal';
import useStoryChapterStore from '@/store/StoryChapterStore';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { TagsInput } from 'react-tag-input-component';
import { useLocalStorage } from 'usehooks-ts';

const AddStory = () => {
  const navigate = useNavigate();
  const { storyChapters, deleteStoryChapter } = useStoryChapterStore();
  const [prevFormData, setPrevFormData] = useLocalStorage("prevFormData", null);

  const {
    register,
    handleSubmit,
    setError,
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
    if (prevFormData) {
      Object.keys(prevFormData).forEach((key: any) => {
        setValue(key, prevFormData[key]);
      });
    }
  }, [prevFormData])

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (formData: Story) => {
      const data = await axios.post("http://localhost:3000/api/story", {
        ...formData,
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return data.data.data;
    }
  })


  const handleCreate = (formData: any) => {
    mutateAsync({
      ...formData,
      tags: JSON.stringify(formData.tags),
      cover: formData.cover ? formData.cover[0] : null,
      chapters: storyChapters
    }).then(() => {
      setPrevFormData(null);
      sweetAlert.fire({
        title: "Success",
        text: "Story successfully added",
        icon: "success"
      })
      navigate("/story");
    }).catch((err: AxiosError) => {
      if (err?.response?.status == 400) {
        const errors = err?.response?.data?.errors;
        Object.keys(errors).forEach((err: any) => {
          setError(err, {
            type: "server",
            message: errors[err]
          });
        });
      }
    })
  }

  const handleDeleteChapter = (pk: string) => {
    deleteStoryChapter(pk);
  }

  const handleNavigateAddChapter = () => {
    setPrevFormData(getValues());
    navigate("/story/chapter/create");
  }

  const handleBack = () => {
    sweetAlert.fire({
      title: 'Confirmation',
      text: "Are you sure you want to cancel adding the story without saving the data?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, back!',
      cancelButtonText: 'No, cancel!',

    }).then((result) => {
      if (result.isConfirmed) {
        setPrevFormData(null)
        navigate("/story")
      }
    })
  }

  return (
    <MainLayout>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><a>List Story</a></li>
          <li><a>Add Story</a></li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(handleCreate)}>
        <div className='mt-6 '>
          <span className='text-2xl font-bold'>Add Story</span>
          <div className='mt-10 bg-base-100 p-8 rounded-lg flex flex-col gap-y-4'>
            <div className='flex gap-6'>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Title</label>
                <input type="text" className='input input-bordered block w-full' id="" {...register("title")} />
                {errors.title ? (
                  <span className='text-xs text-error'>{errors.title.message ?? ""}</span>
                ) : ""}
              </div>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Writer Name</label>
                <input {...register("author")} type="text" className='input input-bordered block w-full' id="" />
                {errors.title ? (
                  <span className='text-xs text-error'>{errors.title.message ?? ""}</span>
                ) : ""}
              </div>
            </div>
            <div className=''>
              <label htmlFor="" className='block mb-4'>Synopsis</label>
              <textarea {...register("synopsis")} className='textarea textarea-bordered w-full' rows={5} id="" ></textarea>
              {errors.synopsis ? (
                <span className='text-xs text-error'>{errors.synopsis.message ?? ""}</span>
              ) : ""}
            </div>
            <div className='flex gap-6'>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Category</label>
                <select className='select select-bordered w-full' id="" {...register("category")} >
                  <option value="" disabled >Select Category</option>
                  <option value="financial">Financial</option>
                  <option value="technology">Technology</option>
                  <option value="health">Health</option>
                </select>
                {errors.category ? (
                  <span className='text-xs text-error'>{errors.category.message ?? ""}</span>
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
                {errors.tags ? (
                  <span className='text-xs text-error'>{errors.tags.message ?? ""}</span>
                ) : ""}
              </div>
            </div>
            <div className='flex gap-6'>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Cover Image</label>
                <input type="file" {...register("cover")} accept='image/png, image/jpg' multiple={false} className='file-input file-input-bordered file-input-primary w-full ' id="" />
                {errors.cover ? (
                  <span className='text-xs text-error'>{errors.cover.message ?? ""}</span>
                ) : ""}
              </div>
              <div className='flex-1'>
                <label htmlFor="" className='mb-4 block'>Status</label>
                <select  {...register("status")} id="" className='select select-bordered w-full'>
                  <option value="" disabled>Select Status</option>
                  <option value="published">Publish</option>
                  <option value="draft">Draft</option>
                </select>
                {errors.status ? (
                  <span className='text-xs text-error'>{errors.status.message ?? ""}</span>
                ) : ""}
              </div>
            </div>
            <hr className='my-4' />
            <div>
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
                  {storyChapters.map((chapter, index) => (
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
              <button type='submit' className='btn btn-success '>
                {isPending ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : "Save"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </MainLayout>
  )
}

export default AddStory