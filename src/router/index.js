import React from "react";
import { useRoutes } from "react-router-dom";

const Recommend = React.lazy(() => import("../pages/recommend/Recommend"));
const Artist = React.lazy(() => import("pages/artist/Artist"));
const Search = React.lazy(() => import("pages/search/Search"));
const Toplist = React.lazy(() => import("pages/toplist/Toplist"));
const Profile = React.lazy(() => import("pages/profile/Profile"));
const Playlist = React.lazy(() => import("pages/playlist/Playlist"));

function Routes() {
  return useRoutes([
    {
      path: "/",
      name: "recommend",
      element: <Recommend />,
    },
    {
      path: "artist",
      name: "artist",
      element: <Artist />,
    },
    {
      path: "search",
      name: "search",
      element: <Search />,
    },
    {
      path: "profile",
      name: "profile",
      element: <Profile />,
    },
    {
      path: "toplist",
      name: "toplist",
      element: <Toplist />,
    },
    {
      path: "playlist/:id",
      name: "playlist",
      element: <Playlist />,
    },
    {
      path: "*",
      name: "NotFond",
      element: <h1>NotFond</h1>,
    },
  ]);
}

export default Routes;
