import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoAddCircleSharp } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { axiosInstance, GROPU_URLS, STUDENT_URLS } from "../../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS";
import Select from 'react-select';

export default function ListGroup() {
  interface Group {
    name: string;
    students: Array<String>;
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
    students: [],
    _id: "",
  });
  const [students, setStudents] = useState([])
  const getStudents = async () => {
    try {
      const res = await axiosInstance.get(STUDENT_URLS.GET_ALL_STUDENTS)
      console.log("tydent", res.data);
      setStudents(res.data)

    } catch (error) {
      console.log(error);

    }
  }
  const getGroupList = async () => {
    try {
      const response = await axiosInstance.get(GROPU_URLS.GET_GRUOP);
      console.log(response.data);

      setGroups(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching groups.");
      console.error("Error fetching groups:", error);
    }
  };
  const options = students.map((student: any) => ({ value: student._id, label: student.first_name }))
  const handleAddGroup = async () => {
    try {
      const response = await axiosInstance.post(GROPU_URLS.CREATE_GRUOP, {
        name: editingGroup.name,
        students: editingGroup.students,
      },)

      getGroupList(); // Refresh the group list after adding
      setIsModalOpen(false); // Close the modal
      setEditingGroup({ name: "", students: "10", _id: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding group:", error);
      setError("Error adding group.");
    }
  };

  const handleEditGroup = async () => {
    try {
      const response = await axiosInstance.put(GROPU_URLS.UPDATE_GRUOP(editingGroup._id), {
        name: editingGroup.name,
        students: editingGroup.students,
      },)

      getGroupList(); // Refresh the group list after editing
      setIsModalOpen(false); // Close the modal
      setIsEditing(false); // Reset edit mode
      setEditingGroup({ name: "", students: "10", _id: "" }); // Reset the form
    } catch (error) {
      console.error("Error updating group:", error);
      setError("Error updating group.");
    }
  };

  useEffect(() => {
    getGroupList();
    getStudents()
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
    <div className="w-full p-3">
      <div>
        <button
          onClick={() => {
            setIsEditing(false); // Set to false for add mode
            setIsModalOpen(true);
          }}
          className="flex items-center ml-auto mr-5 px-4 py-2 border rounded-full text-sm font-medium text-black hover:bg-gray-100"
        >
          <IoAddCircleSharp size={20} />
          Add Group
        </button>
      </div>
      <div className=" mt-14 border-2 rounded-md">
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
                <p className="text-sm">No. of Students: {group.students}</p>
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
                  className="border px-4 py-2 rounded flex items-center gap-2"
                >
                  <MdDone size={20} />

                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="border px-4 py-2 rounded flex items-center gap-2"
                >
                  <AiOutlineClose size={20} />

                </button>
              </div>
            </div>
            {/* Group Name Input */}
            <div className="flex my-2">
              
              <input

                type="text"
                placeholder="Enter Group Name"
                value={editingGroup.name}
                onChange={(e) =>
                  setEditingGroup({ ...editingGroup, name: e.target.value })
                }
               className="basic-multi-select w-full  p-2.5 border border-gray-300 rounded-lg bg-gradient-to-r from-[#FFEDDF] via-[#ffffff] to-[#ffffff] bg-[length:100%_100%] bg-no-repeat text-black"
              />

            </div>


            <div className="flex">
              {/* List Students Dropdown */}
              
              <Select
                isMulti
                placeholder="Students"
                name="students"
                options={options}
                className="basic-multi-select w-full  p-2.5 border border-gray-300 rounded-lg bg-gradient-to-r from-[#FFEDDF] via-[#ffffff] to-[#ffffff] bg-[length:100%_100%] bg-no-repeat text-black"
                classNamePrefix="Students"
                onChange={(e) => {

                  const selectedStudents = Array.from(
                    e,
                    (option) => option.value
                  );
                  setEditingGroup({ ...editingGroup, students: selectedStudents });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
