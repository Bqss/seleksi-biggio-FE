import Modal from "@/components/mollecules/Modal";
import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";
import axiosInstance from "@/services/Axios";
import { useNavigate } from "react-router";
import Dropdown from "@/components/mollecules/Dropdown";
import { paramify, useQueryParams } from "@/utils/paramsUtil";
import { useDebounce } from "usehooks-ts";
import sweetAlert from "@/services/Swal";
import { useQuery } from "@tanstack/react-query";
import queryClient from "@/services/UseQuery";

const Index = () => {
  const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { search, category, status } = useQueryParams();
  const searchParams = useDebounce<string>(search ?? "", 500);

  const [filter, setFilter] = useState({
    category: category ?? "",
    status: status ?? ""
  });

  const { data: stories = [], isLoading } = useQuery<Array<Story & TimeStamp>>({
    queryKey: ['stories', searchParams, category, status],
    queryFn: async function ()  {
      const { data } = await axiosInstance.get("/story" + paramify({
        search: searchParams,
        category,
        status
      }));
      return data.data;
    },
  })

  const openFilterModal = () => {
    setIsOpenFilterModal(true);
  }

  const resetFilter = () => {
    setFilter({
      category: "",
      status: ""
    });
  }

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    navigate("/story" + paramify({
      search: ev.target.value,
      ...filter
    }));
  };

  const applyFilter = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    navigate("/story" + paramify(filter));
    closeFilterModal();
  }

  const handleDelete = (storyId: string) => {
    sweetAlert.fire({
      title: 'Confirmation',
      text: "Are you sure you want to delete this story, all chapter will also deleted?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'No, cancel!',

    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/story/${storyId}`).then(res => {
          queryClient.invalidateQueries({
            queryKey: ['stories', searchParams, category, status]
          });
          sweetAlert.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })

  }

  const closeFilterModal = () => {
    setIsOpenFilterModal(false);
  }

  return (
    <MainLayout>
      <Modal isOpen={isOpenFilterModal} onClose={closeFilterModal} title="Filter">
        <form onSubmit={applyFilter}>
          <div className="mb-5">
            <label htmlFor="" className="mb-3 block text-sm">Category</label>
            <select name="" value={filter.category} onChange={(ev) => setFilter((current) => ({ status: current.status, category: ev.target.value }))} className="select select-bordered w-full" id="asdf">
              <option value="" disabled >Select Category</option>
              <option value="financial">Financial</option>
              <option value="technology">Technology</option>
              <option value="health">Health</option>
            </select>

          </div>
          <div className="">
            <label htmlFor="" className="mb-3 block text-sm">Status</label>
            <select name="" value={filter.status} onChange={(ev) => setFilter((current) => ({ status: ev.target.value, category: current.category }))} className="select select-bordered w-full" id="ff">
              <option value="" disabled>Select Status</option>
              <option value="publish">Publish</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="flex justify-between mt-10">
            <button type="button" className="btn btn-neutral" onClick={resetFilter}>Reset</button>
            <div className="flex gap-2">
              <button type="button" className="btn btn-neutral" onClick={closeFilterModal}>Cancel</button>
              <button type="submit" className="btn btn-success" >Apply</button>
            </div>
          </div>
        </form>
      </Modal>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>List Story</li>
        </ul>
      </div>
      <div className="flex justify-between mt-6">
        <span className="text-3xl font-bold ">List Story</span>
        <div className="flex gap-4">
          <input onChange={handleSearch} value={search} type="text" className="input input-bordered mr-2" name="" id="" placeholder="Search" />
          <button className="btn btn-secondary" onClick={openFilterModal} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/story/create")}>Add Story</button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center text-white items-center h-64">
          <span className="text-2xl font-bold">Loading...</span>
        </div>
      ) : (
        <>
          <table className="table table-lg table-zebra-zebra mt-10">
            <thead>
              <tr>
                <th>Title</th>
                <th>Writer</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story, i) => (
                <tr key={i}>
                  <td>{story.title}</td>
                  <td>{story.author}</td>
                  <td>{story.category}</td>
                  <td>{JSON.parse(story.tags).map((tag: any, i:number) => {
                    return <span key={i} className="badge text-white badge-secondary">{tag}</span>
                  })}</td>
                  <td>{story.status}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Trigger>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </Dropdown.Trigger>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <button className="" onClick={() => navigate(`/story/${story.id}/show`)}>Detail</button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <button className="" onClick={() => navigate(`/story/${story.id}/edit`)}>Edit</button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <button className="" onClick={() => handleDelete(story.id)}>Delete</button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isLoading && stories.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <span className="text-2xl font-bold">No story found, change the filter or add the story first</span>
            </div>
          )}
        </>


      )}


    </MainLayout>
  )
}

export default Index

