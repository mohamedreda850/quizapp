import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoAddCircleSharp } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

export default function ListGroup() {
  // Define the Group interface
  interface Group {
    name: string;
    max_students: string;
    _id: string;
  }

  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track the current page
  const [groupsPerPage] = useState<number>(10); // Number of groups per page

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzdiYzJhYjMzZmY0NjUyMzVmZmQ4ODAiLCJlbWFpbCI6Ikdlb3JnZS5taWxhZDNAZ21haWwuY29tIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3MzYxNjQwMjksImV4cCI6MTczOTc2NDAyOX0.UtHK2JcOmtKrOKTxzj3grZ1BPrF60z3WQeZWsqu3vrc";

  const getGroupList = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3005/api/group",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGroups(response.data);
      setError(null);
      console.log(response);
    } catch (error) {
      setError("Error fetching groups.");
      console.error("Error fetching groups:", error);
    }
  };

  // useEffect to fetch groups when the component mounts
  useEffect(() => {
    getGroupList();
  }, []);
  // Pagination logic

  // Calculate the index of the last group to display on the current page.
  // If currentPage is 1 and groupsPerPage is 10, the indexOfLastGroup will be 10.
  // This means the first 10 groups (from index 0 to 9) will be shown on the first page.
  // For example, on page 2, indexOfLastGroup will be 20, showing groups 10 to 19.
  const indexOfLastGroup = currentPage * groupsPerPage;

  // Calculate the index of the first group to display on the current page.
  // For page 1, it will be 0 (groups[0] to groups[9]).
  // For page 2, it will be 10 (groups[10] to groups[19]).
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;

  // Slice the groups array to get the current groups for the current page.
  // This will slice the array from indexOfFirstGroup to indexOfLastGroup.
  // For example, if currentPage is 2 and groupsPerPage is 10, it will return groups[10] to groups[19].
  const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);

  // Function to change the current page when the user clicks a pagination button.
  // It takes a page number as an argument and updates the currentPage state accordingly.
  // For example, if currentPage is 2, clicking on the "Next" button will increment it to 3,
  // which will fetch the next set of groups (groups 20 to 29).
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <button className="absolute right-2 border border-black p-1 rounded-xl flex justify-end me-2 items-center">
          <IoAddCircleSharp size={20} />
          Add Group
        </button>
      </div>
      <div className="md:w-[96vw] mt-14 border-2 rounded-md">
        <h1 className="p-2 ps-5">Groups List</h1>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Show error if any */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 px-4">
          {currentGroups.map((group) => (
            <div
              key={group._id}
              className="flex justify-between items-center border p-4 rounded-lg shadow"
            >
              <div className="flex flex-col">
                <h1 className="font-semibold">Group: {group.name}</h1>
                <p className="text-sm">No. of Students: {group.max_students}</p>
              </div>
              <div className="flex gap-2">
                <button className="cursor-pointer p-2">
                  <FaRegEdit size={20} />
                </button>
                <button className="cursor-pointer p-2">
                  <FiTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center py-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2"
          >
            ...
          </button>
          <span> {currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * groupsPerPage >= groups.length}
            className="px-4 py-2 mx-2"
          >
            ...
          </button>
        </div>
      </div>
    </div>
  );
}
