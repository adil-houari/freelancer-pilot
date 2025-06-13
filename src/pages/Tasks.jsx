import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import '../styles/Tasks.css';
import { FaPlus, FaTrashAlt, FaEdit, FaCheck } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function Tasks() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('freelancerTasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [newTask, setNewTask] = useState('');
    const [newTag, setNewTag] = useState('General');
    const [newDueDate, setNewDueDate] = useState('');
    const [filter, setFilter] = useState('All');
    const [error, setError] = useState('');
    const [sortByDate, setSortByDate] = useState(false);
    const [toast, setToast] = useState('');

    // MODAL STATE
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editTag, setEditTag] = useState('General');

    useEffect(() => {
        localStorage.setItem('freelancerTasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!newTask.trim()) {
            setError('Please enter a task title.');
            setTimeout(() => setError(''), 3000);
            return;
        }

        const task = {
            id: Date.now(),
            title: newTask,
            completed: false,
            tag: newTag,
            dueDate: newDueDate
        };

        setTasks([...tasks, task]);
        setNewTask('');
        setNewDueDate('');
        setToast('Task added!');
        setTimeout(() => setToast(''), 2000);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        setToast('Task deleted.');
        setTimeout(() => setToast(''), 2000);
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // Ouvre le modal
    const openEditModal = (task) => {
        setEditingTask(task);
        setEditTitle(task.title);
        setEditDate(task.dueDate || '');
        setEditTag(task.tag || 'General');
        setIsModalOpen(true);
    };

    const saveEdit = () => {
        setTasks(tasks.map(task =>
            task.id === editingTask.id
                ? { ...task, title: editTitle, dueDate: editDate, tag: editTag }
                : task
        ));
        setIsModalOpen(false);
        setToast('Task updated.');
        setTimeout(() => setToast(''), 2000);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        if (filter === 'Completed') return task.completed;
        if (filter === 'Pending') return !task.completed;
        return true;
    });

    let sortedTasks = filteredTasks;
    if (sortByDate) {
        sortedTasks = filteredTasks.slice().sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destIndex = result.destination.index;

        const newTasks = Array.from(tasks);
        const [removed] = newTasks.splice(sourceIndex, 1);
        newTasks.splice(destIndex, 0, removed);

        setTasks(newTasks);
    };

    return (
        <DashboardLayout>
            <div className="tasks-container">
                <h2>My Tasks</h2>

                <div className="task-input">
                    <input
                        type="text"
                        placeholder="New task..."
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                    />
                    <select value={newTag} onChange={e => setNewTag(e.target.value)}>
                        <option>General</option>
                        <option>Client</option>
                        <option>Personal</option>
                    </select>
                    <input
                        type="date"
                        value={newDueDate}
                        onChange={e => setNewDueDate(e.target.value)}
                    />
                    <button onClick={addTask}><FaPlus /></button>
                </div>

                {error && <div className="error-toast">{error}</div>}
                {toast && <div className="success-toast">{toast}</div>}

                <div className="filter-and-sort">
                    <div className="filter">
                        <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
                        <button className={filter === 'Completed' ? 'active' : ''} onClick={() => setFilter('Completed')}>Completed</button>
                        <button className={filter === 'Pending' ? 'active' : ''} onClick={() => setFilter('Pending')}>Pending</button>
                    </div>
                    <button className="sort-btn" onClick={() => setSortByDate(!sortByDate)}>
                        {sortByDate ? 'Unsort by date' : 'Sort by date'}
                    </button>
                </div>


                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <ul className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
                                {sortedTasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={task.completed ? 'completed' : ''}
                                            >
                                                <div className="task-info">
                                                    <span className="task-title">
                                                        {task.title}
                                                    </span>
                                                    <div className="task-details">
                                                        {task.dueDate &&
                                                            <span className="due-date">Due: {task.dueDate}</span>
                                                        }
                                                        <span className={`tag ${task.tag.toLowerCase()}`}>{task.tag}</span>
                                                        <span className={`status-badge ${task.completed ? 'complete' : 'pending'}`}>
                                                            {task.completed ? 'Completed' : 'Pending'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="actions">
                                                    <FaCheck
                                                        title="Toggle complete"
                                                        onClick={() => toggleComplete(task.id)}
                                                    />
                                                    <FaEdit title="Edit" onClick={() => openEditModal(task)} />
                                                    <FaTrashAlt title="Delete" onClick={() => deleteTask(task.id)} />
                                                </div>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>

                {/* --- MODAL --- */}
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Edit Task</h3>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={e => setEditTitle(e.target.value)}
                            />
                            <input
                                type="date"
                                value={editDate}
                                onChange={e => setEditDate(e.target.value)}
                            />
                            <select value={editTag} onChange={e => setEditTag(e.target.value)}>
                                <option>General</option>
                                <option>Client</option>
                                <option>Personal</option>
                            </select>
                            <div className="modal-buttons">
                                <button onClick={saveEdit}>Save</button>
                                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </DashboardLayout>
    );
}

export default Tasks;
