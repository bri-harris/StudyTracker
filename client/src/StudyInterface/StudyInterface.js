import { useState } from "react";
import Nav_User from "../Nav_User/Nav_User";
import Footer from "../Footer/Footer";
import "../Home/Home.css";
import "./StudyInterface.css";

const StudyTracker = () => {
    const [showAchievements, setShowAchievements] = useState(false);
    const toggleAchievements = () => setShowAchievements(prev => !prev);

    const [expandedFolderId, setExpandedFolderId] = useState(null);
    const [folders, setFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState(null);

    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showFolderForm, setShowFolderForm] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(false);

    const [newFolderColor, setNewFolderColor] = useState("#ffb3b3");
    const [newFolderName, setNewFolderName] = useState("");
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    const addTask = () => {
        if (!newTask.trim() || !selectedFolderId) return;

        setFolders(folders.map(folder => {
            if (folder.id === selectedFolderId) {
                const updatedTasks = [...folder.tasks];

                if (editIndex !== null) {
                    // Editing existing task
                    updatedTasks[editIndex] = {
                        ...updatedTasks[editIndex],
                        text: newTask,
                    };
                } else {
                    // Adding a new task
                    updatedTasks.push({ text: newTask, completed: false });
                }

                return { ...folder, tasks: updatedTasks };
            }
            return folder;
        }));

        setNewTask("");
        setEditIndex(null); // Reset edit mode
        setShowTaskForm(false);
    };

    const toggleComplete = (folderId, index) => {
        setFolders(prev =>
            prev.map(folder =>
                folder.id === folderId
                    ? {
                        ...folder,
                        tasks: folder.tasks.map((task, i) =>
                            i === index ? { ...task, completed: !task.completed } : task
                        ),
                    }
                    : folder
            )
        );
    };

    const editTask = (folderId, index) => {
        const folder = folders.find(f => f.id === folderId);
        if (!folder) return;
        setNewTask(folder.tasks[index].text);
        setEditIndex(index);
        setSelectedFolderId(folderId);
        setShowTaskForm(true);
    };

    const deleteTask = (folderId, index) => {
        setFolders(prev =>
            prev.map(folder =>
                folder.id === folderId
                    ? {
                        ...folder,
                        tasks: folder.tasks.filter((_, i) => i !== index),
                    }
                    : folder
            )
        );
    };

    return (
        <div className="page-container">
            <Nav_User />

            <div className="dashboard">
                <div className="sidebar">
                    <div className="header">
                        To-Do List
                        <button className="add-toggle" onClick={() => setShowAddMenu(!showAddMenu)}>+</button>
                        {showAddMenu && (
                            <div className="add-dropdown">
                                <div onClick={() => { setShowFolderForm(true); setShowTaskForm(false); setShowAddMenu(false); }}>
                                    📁 Add Folder
                                </div>
                                <div onClick={() => { setShowTaskForm(true); setShowFolderForm(false); setShowAddMenu(false); }}>
                                    ➕ Add Task
                                </div>
                            </div>
                        )}
                    </div>

                    {showTaskForm && selectedFolderId && (
                        <div className="todo-input">
                            <input
                                type="text"
                                placeholder="Add a task..."
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addTask()}
                            />
                            <button onClick={addTask}>Add</button>
                        </div>
                    )}

                    {showFolderForm && (
                        <div className="folder-form">
                            <input
                                type="text"
                                placeholder="Folder name"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                            />
                            <input
                                type="color"
                                value={newFolderColor}
                                onChange={(e) => setNewFolderColor(e.target.value)}
                            />
                            <button
                                onClick={() => {
                                    if (!newFolderName.trim()) return;
                                    const newFolder = {
                                        id: Date.now(),
                                        name: newFolderName.trim(),
                                        color: newFolderColor,
                                        tasks: []
                                    };
                                    setFolders([...folders, newFolder]);
                                    setNewFolderName("");
                                    setNewFolderColor("#ffb3b3");
                                    setShowFolderForm(false);
                                }}
                            >
                                Create
                            </button>
                        </div>
                    )}

                    <ul className="folder-list">
                        {folders.map(folder => (
                            <li key={folder.id} className="folder-item">
                                <div
                                    className="folder-header"
                                    onClick={() => {
                                        setExpandedFolderId(prev => prev === folder.id ? null : folder.id)
                                        setSelectedFolderId(folder.id);
                                    }}
                                    style={{
                                        backgroundColor: folder.id === expandedFolderId ? "#e3f2fd" : "#f5f5f5",
                                        borderLeft: `10px solid ${folder.color}`,
                                    }}
                                >
                                    {folder.name}
                                </div>

                                {expandedFolderId === folder.id && (
                                    <ul className="todo-list">
                                        {folder.tasks.map((task, index) => (
                                            <li
                                                key={index}
                                                className={task.completed ? "completed" : ""}
                                                style={{ borderLeft: `6px solid ${folder.color}` }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={task.completed}
                                                    onChange={() => toggleComplete(folder.id, index)}
                                                />
                                                <span>{task.text}</span>
                                                <div className="task-buttons">
                                                    <button onClick={() => editTask(folder.id, index)}>✏️</button>
                                                    <button onClick={() => deleteTask(folder.id, index)}>❌</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="middle-column">
                    <div className="image-container">{/* Optional image area */}</div>
                    <div className="achievements-bar" onClick={toggleAchievements}>
                        Achievements + Statistics
                    </div>
                    {showAchievements && (
                        <div className="achievements-content">
                            <p>⭐ You completed 3 Pomodoros today!</p>
                            <p>📈 Your focus time increased by 12%</p>
                        </div>
                    )}
                </div>

                <div className="widgets">
                    <div className="widget calendar-widget">
                        <div className="header">Calendar</div>
                    </div>
                    <div className="widget pomodoro-widget">
                        <div className="header">Pomodoro</div>
                    </div>
                </div>
            </div>

            {/* <div className="main"></div> */}
            <Footer />
        </div>
        
    );
};

export default StudyTracker;