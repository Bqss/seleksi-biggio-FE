import {createBrowserRouter} from "react-router-dom";
import Dashboard from "@/pages/admin/Dashboard";
import Index from "@/pages/admin/story/Index";
import AddStory from "@/pages/admin/story/AddStory";
import EditStory from "@/pages/admin/story/EditStory";
import DetailStory from "@/pages/admin/story/DetailStory";
import AddChapter from "@/pages/admin/chapter/AddChapter";
import EditChapter from "@/pages/admin/chapter/EditChapter";

const router =  createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
  },
  {
    "path": "/story",
    element: <Index />,
  },
  {
    path : "/story/create",
    element : <AddStory/>
  },
  {
    path : "/story/:id/show",
    element : <DetailStory/>
  },
  {
    path : "/story/:id/edit",
    element : <EditStory/>
  },
  {
    path : "/story/chapter/create",
    element : <AddChapter/>
  },
  {
    path : "/story/chapter/:id/edit",
    element : <EditChapter/>
  },
]) ;

export default router;