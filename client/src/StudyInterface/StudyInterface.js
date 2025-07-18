import { useState } from "react";
import NavUser from "../NavUser/NavUser";
import Footer from "../Footer/Footer";
import "../Home/Home.css";
import "./StudyInterface.css";

const StudyTracker = () => {
    const [showAchievements, setShowAchievements] = useState(false);
    const toggleAchievements = () => setShowAchievements(prev => !prev);

    const [expandedFolderId, setExpandedFolderId] = useState(null);
    const [folders, setFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState(null);

    const [draggedTaskInfo, setDraggedTaskInfo] = useState(null); // { folderId, taskIndex }
    const [draggedFolderIndex, setDraggedFolderIndex] = useState(null);

    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showFolderForm, setShowFolderForm] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(false);

    const [newFolderColor, setNewFolderColor] = useState("#ffb3b3");
    const [newFolderName, setNewFolderName] = useState("");
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [taskDeadline, setTaskDeadline] = useState("");
    const [taskStartDate, setTaskStartDate] = useState("");

    const calculateProgress = (startDate, deadline) => {
        const start = new Date(startDate);
        const end = new Date(deadline);
        const now = new Date();

        if (now >= end) return 100;
        if (now <= start) return 0;

        const totalMs = end - start;
        const elapsedMs = now - start;

        return Math.min(100, Math.round((elapsedMs / totalMs) * 100));
    };

    const getDaysLeft = (deadline) => {
        if (!deadline) return "";

        const [year, month, day] = deadline.split("-").map(Number);
        const dueDate = new Date(year, month - 1, day);
        const today = new Date();
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const timeDiff = dueDate.getTime() - todayDate.getTime();
        const dayDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));

        if (dayDiff < 0) return "Overdue";
        if (dayDiff === 0) return "Due today";
        if (dayDiff === 1) return "Due tomorrow";
        return `${dayDiff} days left`;
    };

    const addTask = () => {
        if (!newTask.trim() || !selectedFolderId) return;

        setFolders(folders.map(folder => {
            if (folder.id === selectedFolderId) {
                const updatedTasks = [...folder.tasks];

                if (editIndex !== null) {
                    updatedTasks[editIndex] = {
                        ...updatedTasks[editIndex],
                        text: newTask,
                        deadline: taskDeadline,
                        startDate: taskStartDate || updatedTasks[editIndex].startDate
                    };
                } else {
                    updatedTasks.push({
                        text: newTask,
                        completed: false,
                        startDate: taskStartDate || new Date().toISOString(),
                        deadline: taskDeadline
                    });
                }

                return { ...folder, tasks: updatedTasks };
            }
            return folder;
        }));

        setNewTask("");
        setEditIndex(null);
        setTaskDeadline("");
        setTaskStartDate("");
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
        setTaskDeadline(folder.tasks[index].deadline || "");
        setTaskStartDate(folder.tasks[index].startDate || "");
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
            <NavUser />

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
                            <input
                                type="date"
                                value={taskStartDate}
                                onChange={(e) => setTaskStartDate(e.target.value)}
                                placeholder="Start date"
                            />
                            <input
                                type="date"
                                value={taskDeadline}
                                onChange={(e) => setTaskDeadline(e.target.value)}
                                placeholder="Deadline"
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
                        {folders.map((folder, folderIndex) => (
                            <li
                                key={folder.id}
                                className="folder-item"
                                draggable
                                onDragStart={() => setDraggedFolderIndex(folderIndex)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    if (draggedFolderIndex === null || draggedFolderIndex === folderIndex) return;

                                    const bounding = e.currentTarget.getBoundingClientRect();
                                    const offset = e.clientY - bounding.top;
                                    const dropBefore = offset < bounding.height / 2;
                                    const newIndex = dropBefore ? folderIndex : folderIndex + 1;

                                    const updated = [...folders];
                                    const [moved] = updated.splice(draggedFolderIndex, 1);

                                    // Adjust newIndex if moving forward in the list
                                    const adjustedIndex = newIndex > draggedFolderIndex ? newIndex - 1 : newIndex;

                                    updated.splice(adjustedIndex, 0, moved);

                                    setFolders(updated);
                                    setDraggedFolderIndex(null);
                                }}
                                onDragEnd={() => setDraggedFolderIndex(null)}
                            >
                                <div
                                    className="folder-header"
                                    onClick={() => {
                                        setExpandedFolderId(prev => prev === folder.id ? null : folder.id);
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
                                                draggable
                                                onDragStart={() => setDraggedTaskInfo({ folderId: folder.id, taskIndex: index })}
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    if (!draggedTaskInfo) return;

                                                    const bounding = e.currentTarget.getBoundingClientRect();
                                                    const offset = e.clientY - bounding.top;
                                                    const dropBefore = offset < bounding.height / 2;
                                                    const newIndex = dropBefore ? index : index + 1;

                                                    setFolders(prevFolders => {
                                                        // Clone the entire folders array
                                                        const updatedFolders = prevFolders.map(f => ({
                                                            ...f,
                                                            tasks: [...f.tasks]
                                                        }));

                                                        const sourceFolder = updatedFolders.find(f => f.id === draggedTaskInfo.folderId);
                                                        const targetFolder = updatedFolders.find(f => f.id === folder.id);

                                                        if (!sourceFolder || !targetFolder) return prevFolders;

                                                        // Remove the moved task from the source folder tasks
                                                        const [movedTask] = sourceFolder.tasks.splice(draggedTaskInfo.taskIndex, 1);

                                                        // Adjust insertion index if moving down within the same folder
                                                        let adjustedIndex = newIndex;
                                                        if (folder.id === draggedTaskInfo.folderId && newIndex > draggedTaskInfo.taskIndex) {
                                                            adjustedIndex = newIndex - 1;
                                                        }

                                                        // Insert moved task at the new index in target folder
                                                        targetFolder.tasks.splice(adjustedIndex, 0, movedTask);

                                                        return updatedFolders;
                                                    });

                                                    setDraggedTaskInfo(null);
                                                }}
                                                onDragEnd={() => setDraggedTaskInfo(null)}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={task.completed}
                                                    onChange={() => toggleComplete(folder.id, index)}
                                                />
                                                <span>{task.text}</span>
                                                {task.deadline && task.startDate && (
                                                    <div className="progress-wrapper">
                                                        <div className="progress-container">
                                                            <div
                                                                className="progress-bar"
                                                                style={{ width: `${calculateProgress(task.startDate, task.deadline)}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="due-date-label">{getDaysLeft(task.deadline)}</span>
                                                    </div>
                                                )}
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
                    <div className="image-container"></div>
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