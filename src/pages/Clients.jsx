import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import '../styles/Clients.css';

const initialClients = [
    { id: 1, name: 'Marie Dupont', project: 'Landing Page', status: 'Active', rate: '$2,000/mo', added: '2024-03-15' },
    { id: 2, name: 'John Smith', project: 'eCommerce Dev', status: 'Paused', rate: '$3,500/mo', added: '2024-02-01' },
];

function Clients() {
    const [clients, setClients] = useState(initialClients);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingClient, setEditingClient] = useState(null);

    const [form, setForm] = useState({
        name: '', project: '', status: 'Active', rate: '', added: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = (client) => {
        setEditingClient(client);
        setForm(client);
        setShowModal(true);
    };

    const handleAddOrUpdate = () => {
        if (!form.name || !form.project || !form.rate) return;

        if (editingClient) {
            setClients(prev =>
                prev.map(c => (c.id === editingClient.id ? { ...form } : c))
            );
        } else {
            setClients(prev => [
                ...prev,
                { ...form, id: Date.now(), added: new Date().toISOString().split('T')[0] }
            ]);
        }

        setForm({ name: '', project: '', status: 'Active', rate: '', added: '' });
        setEditingClient(null);
        setShowModal(false);
    };

    const deleteClient = (id) => {
        setClients(prev => prev.filter(c => c.id !== id));
    };

    const filteredClients = clients.filter(
        c =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.project.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="clients-page">
                <div className="clients-header">
                    <h2>Clients</h2>
                    <input
                        type="text"
                        placeholder="Search by name or project..."
                        className="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="add-btn" onClick={() => { setShowModal(true); setEditingClient(null); }}>
                        + Add Client
                    </button>
                </div>

                <table className="clients-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Project</th>
                            <th>Status</th>
                            <th>Rate</th>
                            <th>Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.project}</td>
                                <td>
                                    <span className={`status ${client.status.toLowerCase()}`}>{client.status}</span>
                                </td>
                                <td>{client.rate}</td>
                                <td>{client.added}</td>
                                <td className="actions">
                                    <button className="edit" onClick={() => handleEdit(client)}>✏️</button>
                                    <button className="delete" onClick={() => deleteClient(client.id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* MODAL */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>{editingClient ? 'Edit Client' : 'Add New Client'}</h3>
                            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                            <input name="project" placeholder="Project" value={form.project} onChange={handleChange} />
                            <input name="rate" placeholder="Rate (e.g. $2000/mo)" value={form.rate} onChange={handleChange} />
                            <select name="status" value={form.status} onChange={handleChange}>
                                <option>Active</option>
                                <option>Paused</option>
                            </select>

                            <div className="modal-buttons">
                                <button onClick={handleAddOrUpdate} className="add-btn">
                                    {editingClient ? 'Update' : 'Add'}
                                </button>
                                <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default Clients;
