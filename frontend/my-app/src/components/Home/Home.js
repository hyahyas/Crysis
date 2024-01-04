import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faEnvelope,
    faBullhorn,
    faTicketAlt,
    faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../Assets/crysis_logo.png";
import usericon from "../Assets/userlogo.png";
import Modal from "react-modal";
import CreateTeam from "../CreateTeam/createTeam";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Home = () => {
    const navigate = useNavigate();
    const [teamsAdmin, setTeamsAdmin] = useState([]);
    const [teamsMember, setTeamsMember] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
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
        setModalIsOpen(true);
    };

    const handleTicketPage = (serverId) => {
        console.log("sss", serverId);
        navigate(`/tickets/${serverId}`);
    };

    const handleMembersPage = (serverId) => {
        console.log("sss", serverId);
        navigate(`/manageteam/${serverId}`);
    };

    const handleAnnouncementsPage = (serverId) => {
        console.log("sss", serverId);
        navigate(`/announcements/${serverId}`);
    };

    const handleChatPage = (serverId) => {
        navigate(`/chat/${serverId}`);
    };

    const handleHomeClick = () => {
        navigate("/home");
    };

    const handleAddMember = (serverId) => {
        console.log("sss", serverId);
        alert("Add member to server");
    };

    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode);
    // };

    const onClose = () => {
        setModalIsOpen(false);
    };

    const navigation = [
        // {
        //     name: "Latest Updates",
        //     href: "#",
        //     onclick: console.log("yo"),
        //     current: true,
        // },
        {
            name: "Create new team",
            href: "/newteam",
            onclick: handleNewTeam,
            current: false,
        },
        // { name: "Your Servers", href: "#", current: false },
        // { name: "Servers you have joined", href: "#", current: false },
    ];
    return (
        <div
            className={`flex flex-col min-h-screen ${"bg-gray-800 text-white"}`}
        >
            <Disclosure as="nav" className={`bg-${"gray-900"} text-white p-4`}>
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
                                    <div className="hidden justify-end sm:ml-6 sm:block">
                                        <div className="flex justify-middle space-x-4 ">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    onClick={item.onclick}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-gray-900 text-white"
                                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                        " rounded-md px-3 py-2 text-sm font-medium "
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
                                                    className="h-8 w-8 rounded-full bg-white"
                                                    src={usericon}
                                                    alt={faUser}
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
                                                            onClick={() => {
                                                                console.log(
                                                                    "Profile clicked"
                                                                );
                                                            }}
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
                                        onClick={item.onclick}
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

            <div className={`flex-grow p-4 bg-${"gray-900"}`}>
                <div className="mb-8">
                    <h5 className={`text-lg font-bold ${"text-white"}`}>
                        Your Servers (Admin)
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teamsAdmin.map((team) => (
                            <div
                                key={team._id}
                                className={`bg-white p-4 rounded-md shadow-md ${"dark:bg-gray-500"} h-full`}
                            >
                                <button
                                    onClick={() => handleMembersPage(team._id)}
                                    className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md float-right ${"dark:bg-gray-600"}`}
                                >
                                    <FontAwesomeIcon icon={faGear} />
                                </button>
                                <p
                                    className={`font-semibold ${"text-gray-900"}`}
                                >
                                    {team.name}
                                </p>

                                <p className="text-gray-500 mt-2 pr-4">
                                    {team.description}
                                </p>
                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={() =>
                                            handleAnnouncementsPage(team._id)
                                        }
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${"dark:bg-gray-600"}`}
                                    >
                                        <FontAwesomeIcon icon={faBullhorn} />
                                    </button>
                                    <button
                                        onClick={() => handleChatPage(team._id)}
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${"dark:bg-gray-600"}`}
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleTicketPage(team._id)
                                        }
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${"dark:bg-gray-600"}`}
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
                    <h5 className={`text-lg font-bold ${"text-white"}`}>
                        Joined Servers (Member)
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teamsMember.map((team) => (
                            <div
                                key={team._id}
                                className={`bg-white p-4 rounded-md shadow-md ${"dark:bg-gray-700"} h-full`}
                            >
                                {/* <button
                                    onClick={() => handleMembersPage(team._id)}
                                    className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md float-right ${"dark:bg-gray-600"}`}
                                >
                                    <FontAwesomeIcon icon={faGear} />
                                </button> */}
                                <p
                                    className={`font-semibold ${"text-gray-900"}`}
                                >
                                    {team.name}
                                </p>
                                <p className={`text-gray-500 mt-2 pr-4`}>
                                    {team.description}
                                </p>
                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={() =>
                                            handleAnnouncementsPage(team._id)
                                        }
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${"dark:bg-gray-600"}`}
                                    >
                                        <FontAwesomeIcon icon={faBullhorn} />
                                    </button>
                                    <button
                                        onClick={handleChatPage}
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${"dark:bg-gray-600"}`}
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </button>
                                    <button
                                        onClick={handleTicketPage}
                                        className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md ${"dark:bg-gray-600"}`}
                                    >
                                        <FontAwesomeIcon icon={faTicketAlt} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Create Team Modal"
                    // className={`max-w-md w-full bg-white p-4 rounded-md shadow-md justify-center item-center ${"dark:bg-gray-700"}`}
                >
                    <CreateTeam
                        // darkMode={darkMode}
                        onClose={onClose}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default Home;
