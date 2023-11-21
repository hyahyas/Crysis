import React, { useState } from "react";

const Announcements = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5; // pagenation

    const placeholderAnnouncements = [
        {
            id: 1,
            title: "Placeholder Announcement 1",
            description: "This is a placeholder announcement. Add your content here.",
            createdBy: "Ahsan Ali Khan",
            date: "2023-01-15",
        },
        {
            id: 2,
            title: "Placeholder Announcement 2",
            description: "Another placeholder announcement. Customize as needed.",
            createdBy: "hassan",
            date: "2023-01-20",
        },
        {
            id: 3,
            title: "Placeholder Announcement 3",
            description: "This is a placeholder announcement. Add your content here.",
            createdBy: "Ahsan Ali Khan",
            date: "2023-01-15",
        },
        {
            id: 4,
            title: "Placeholder Announcement 4",
            description: "Another placeholder announcement. Customize as needed.",
            createdBy: "hassan",
            date: "2023-01-20",
        },
        {
            id: 5,
            title: "Placeholder Announcement 5",
            description: "This is a placeholder announcement. Add your content here.",
            createdBy: "Ahsan Ali Khan",
            date: "2023-01-15",

        },
        {
            id: 6,
            title: "Placeholder Announcement 6",
            description: "Another placeholder announcement. Customize as needed.",
            createdBy: "hassan",
            date: "2023-01-20",

        },
        {
            id: 7,
            title: "Placeholder Announcement 7",
            description: "This is a placeholder announcement. Add your content here.",
            createdBy: "Ahsan Ali Khan",
            date: "2023-01-15",
            
        }
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAnnouncements = placeholderAnnouncements.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="grid grid-cols-12 gap-6 p-4">
            {/* Left column for chat, announcements, and tickets */}
            <div className="col-span-3 bg-gray-200 p-4">
                <button
                    className={`w-full py-2 mb-2 rounded-md text-left ${
                        currentPage === 2 ? "bg-indigo-500 text-white" : "hover:bg-gray-300"
                    }`}
                >
                    Announcements
                </button>
                <button
                    className={`w-full py-2 mb-2 rounded-md text-left ${
                        currentPage === 1 ? "bg-indigo-500 text-white" : "hover:bg-gray-300"
                    }`}
                >
                    Chat
                </button>
                <button
                    className={`w-full py-2 mb-2 rounded-md text-left ${
                        currentPage === 3 ? "bg-indigo-500 text-white" : "hover:bg-gray-300"
                    }`}
                >
                    Tickets
                </button>
            </div>

            {/* Main content area */}
            <div className="col-span-9">
                <h2 className="text-2xl font-bold mb-4">Announcements</h2>

                {/* Display Announcements */}
                {currentAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="mb-8 bg-white p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                        <p className="text-gray-500 mb-2">{announcement.date}</p>
                        <p className="text-gray-800">{announcement.description}</p>
                        <p className="text-gray-500 mt-2">Created by: {announcement.createdBy}</p>
                    </div>
                ))}

                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    {Array.from({ length: Math.ceil(placeholderAnnouncements.length / itemsPerPage) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-2 rounded-md ${
                                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Announcements;
