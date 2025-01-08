import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoAddCircleSharp } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

export default function ListGroup() {
  interface Group {
    name: string;
    max_students: string;
    _id: string;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [groupsPerPage] = useState<number>(10);
  const [editingGroup, setEditingGroup] = useState<Group>({
    name: "",
    max_students: "10",
    _id: "", // _id will be empty for new groups
  });

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
    } catch (error) {
      setError("Error fetching groups.");
      console.error("Error fetching groups:", error);
    }
  };

  const handleAddGroup = async () => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3005/api/group",
        {
          name: editingGroup.name,
          max_students: editingGroup.max_students,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getGroupList(); // Refresh the group list after adding
      setIsModalOpen(false); // Close the modal
      setEditingGroup({ name: "", max_students: "10", _id: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding group:", error);
      setError("Error adding group.");
    }
  };

  const handleEditGroup = async () => {
    try {
      const response = await axios.put(
        `https://upskilling-egypt.com:3005/api/group/${editingGroup._id}`,
        {
          name: editingGroup.name,
          max_students: editingGroup.max_students,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getGroupList(); // Refresh the group list after editing
      setIsModalOpen(false); // Close the modal
      setIsEditing(false); // Reset edit mode
      setEditingGroup({ name: "", max_students: "10", _id: "" }); // Reset the form
    } catch (error) {
      console.error("Error updating group:", error);
      setError("Error updating group.");
    }
  };

  useEffect(() => {
    getGroupList();
  }, []);

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleOpenEditModal = (group: Group) => {
    setEditingGroup(group); // Populate form with the group's data
    setIsEditing(true); // Set edit mode
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setIsEditing(false); // Set to false for add mode
            setIsModalOpen(true);
          }}
          className="absolute right-2 border border-black p-1 rounded-xl flex justify-end me-2 items-center"
        >
          <IoAddCircleSharp size={20} />
          Add Group
        </button>
      </div>
      <div className="md:w-[96vw] mt-14 border-2 rounded-md">
        <h1 className="p-2 ps-5">Groups List</h1>
        {error && <p className="text-red-500">{error}</p>}
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
                <button
                  onClick={() => handleOpenEditModal(group)}
                  className="cursor-pointer p-2"
                >
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="text-center bg-white p-9 rounded-md shadow-md w-[60vw]">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {isEditing ? "Update Group" : "Set up a new Group"}
              </h2>
              <div className="flex gap-2">
                {/* Confirm Button */}
                <button
                  onClick={isEditing ? handleEditGroup : handleAddGroup}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <MdDone size={20} />
                  Confirm
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <AiOutlineClose size={20} />
                  Cancel
                </button>
              </div>
            </div>
            {/* Group Name Input */}
            <div className="flex">
 <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block border rounded text-sm font-medium mb-3 ">Group Name</label>

       <input

              type="text"
              placeholder="Enter Group Name"
              value={editingGroup.name}
              onChange={(e) =>
                setEditingGroup({ ...editingGroup, name: e.target.value })
              }
              className="w-full p-2 border rounded mb-3"
          />

            </div>
           
     
    <div className="flex">
              {/* List Students Dropdown */}
              <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 ">List Students</label>
            <select
              className="w-full p-2 border rounded mb-3"
              value={editingGroup.max_students}
              onChange={(e) =>
                setEditingGroup({ ...editingGroup, max_students: e.target.value })
              }
            >
              <option value="10">10 Students</option>
              <option value="20">20 Students</option>
              <option value="30">30 Students</option>
            </select>
    </div>
          </div>
        </div>
      )}
    </div>
  );
}
