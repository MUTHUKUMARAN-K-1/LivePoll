// BookmarkPage.js
import React from "react";

const dummyBookmarks = [
  {
    id: 1,
    title: "Favorite Programming Language?",
    description: "Vote for your favorite programming language among the listed options.",
  },
  {
    id: 2,
    title: "Best Framework for Web Development?",
    description: "Share your thoughts on the best framework for web development.",
  },
  {
    id: 3,
    title: "Favorite Food?",
    description: "What's your favorite food? Vote and see the results.",
  },
];

function Bookmark() {
  return (
    <div className="p-6 bg-base-200 h-screen">
      <h1 className="text-4xl font-bold text-white mb-6">Bookmarked Polls</h1>
      <div className="overflow-x-auto">
        <table className="table w-full bg-base-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyBookmarks.map((bookmark, index) => (
              <tr key={bookmark.id}>
                <th>{index + 1}</th>
                <td className="text-white">{bookmark.title}</td>
                <td className="text-gray-400 whitespace-normal break-words max-w-xs">
                  {bookmark.description}
                </td>
                <td>
                  <button className="btn btn-primary">
                    View Poll
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookmark;
