import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSun,
    faMoon,
    faUser,
    faEnvelope,
    faBullhorn,
    faTicketAlt,
    faUserPlus,
    faCloudMoon,
} from "@fortawesome/free-solid-svg-icons";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../Assets/crysis_logo.png";
import custom_header from "../Header/header";

const navigation = [
    { name: "Latest Updates", href: "#", current: true },
    { name: "Create new team", href: "/newteam", current: false },
    // { name: "Your Servers", href: "#", current: false },
    // { name: "Servers you have joined", href: "#", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Home = () => {
    const navigate = useNavigate();
    const [teamsAdmin, setTeamsAdmin] = useState([]);
    const [teamsMember, setTeamsMember] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Fetch data for teams
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const responseAdmin = await axios.get(
                    "http://localhost:5000/getMyServers/?role=admin",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const responseMember = await axios.get(
                    "http://localhost:5000/getMyServers?role=user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setTeamsAdmin(responseAdmin.data);
                setTeamsMember(responseMember.data);
            } catch (error) {
                console.error("Error fetching teams: ", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleNewTeam = () => {
        navigate("/newteam");
    };

    const handleTicketPage = (serverId) => {
        console.log("sss",serverId);
        navigate(`/tickets/${serverId}`);
    };

    const handleAnnouncementsPage = (serverId) => {
      console.log("sss",serverId);
      navigate(`/announcements/${serverId}`);
    };

    const handleChatPage = (serverId) => {
        navigate(`/chat/${serverId}`);
    };

    const handleHomeClick = () => {
        navigate("/home");
    };

    const handleAddMember = (serverId) => {
        console.log("sss",serverId);
        alert("Add member to server");
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    return (
        <div
            className={`flex flex-col min-h-screen ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
        >
            <Disclosure
                as="nav"
                className={`bg-${
                    darkMode ? "gray-900" : "white-800"
                } text-white p-4`}
            >
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                  
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="h-12 w-auto"
                                            src={logo}
                                            alt="Crysis"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-gray-900 text-white"
                                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                        "rounded-md px-3 py-2 text-sm font-medium"
                                                    )}
                                                    aria-current={
                                                        item.current
                                                            ? "page"
                                                            : undefined
                                                    }
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                  
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={faUser}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            onClick={console.log("Profile clicked")}
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "block px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            onClick={
                                                                toggleDarkMode
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "block px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            Switch mode
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            onClick={
                                                                handleLogout
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "block px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "block rounded-md px-3 py-2 text-base font-medium"
                                        )}
                                        aria-current={
                                            item.current ? "page" : undefined
                                        }
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            {/* Header */}
            {/* {custom_header(`Welcome user, this is your home page`, darkMode, toggleDarkMode, handleLogout, handleHomeClick)} */}

            <div className={`flex-grow p-4 bg-${darkMode ? "gray-900" : "white-800"}`}>
                {/* Rest of your content */}
                {/* Teams Admin */}
                <div className="mb-8">
                    <h5
                        className={`text-lg font-bold ${
                            darkMode ? "text-white" : "text-black"
                        }`}
                    >
                        Your Servers (Admin)
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teamsAdmin.map((team) => (
                            <div
                                key={team._id}
                                className={`bg-white p-4 rounded-md shadow-md ${
                                    darkMode ? "dark:bg-gray-300" : ""
                                } h-full`}
                            >
                                <button
                                        onClick={()=>handleAddMember(team._id)}
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md float-right ${
                                            darkMode ? "dark:bg-gray-600" : ""
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </button>
                                <p
                                    className={`font-semibold ${
                                        darkMode ? "text-black" : "text-black"
                                    }`}
                                >
                                    {team.name}
                                </p>
                                
                                <p
                                    className={`text-gray-500 mt-2 ${
                                        darkMode ? "" : "text-black"
                                    }`}
                                >
                                    {team.description}
                                </p>
                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={()=>handleChatPage(team._id)}
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${
                                            darkMode ? "dark:bg-gray-600" : ""
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </button>
                                    <button
                                        onClick={()=>handleAnnouncementsPage(team._id)}
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${
                                            darkMode ? "dark:bg-gray-600" : ""
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faBullhorn} />
                                    </button>
                                    <button
                                        onClick={()=>handleTicketPage(team._id)}
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${
                                            darkMode ? "dark:bg-gray-600" : ""
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faTicketAlt} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Teams Member */}
                <div>
                    <h5
                        className={`text-lg font-bold ${
                            darkMode ? "text-white" : "text-black"
                        }`}
                    >
                        Joined Servers (Member)
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teamsMember.map((team) => (
                            <div
                                key={team.id}
                                className={`bg-white p-4 rounded-md shadow-md ${
                                    darkMode ? "dark:bg-gray-700" : ""
                                } h-full`}
                            >
                                <button
                                        onClick={()=>handleAddMember(team._id)}
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md float-right ${
                                            darkMode ? "dark:bg-gray-600" : ""
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </button>
                                <p
                                    className={`font-semibold ${
                                        darkMode ? "text-white" : "text-black"
                                    }`}
                                >
                                    {team.name}
                                </p>
                                <p
                                    className={`text-gray-500 mt-2 ${
                                        darkMode ? "text-white" : "text-black"
                                    }`}
                                >
                                    {team.description}
                                </p>
                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={handleChatPage}
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${
                                            darkMode ? "dark:bg-gray-600" : ""
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </button>
                                    <button
                                        onClick={()=>handleAnnouncementsPage(team._id)}
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${
                                            darkMode ? "dark:bg-gray-600" : ""
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faBullhorn} />
                                    </button>
                                    <button
                                        onClick={handleTicketPage}
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${
                                            darkMode ? "dark:bg-gray-600" : ""
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faTicketAlt} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
