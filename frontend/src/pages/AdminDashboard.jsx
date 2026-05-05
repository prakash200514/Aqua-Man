import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Upload, Trash2, Edit2, Play, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('fishes');
    
    // Data States
    const [fishes, setFishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            toast.error("Unauthorized access.");
        } else {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const [fishRes, catRes, ordRes, vidRes] = await Promise.all([
                axios.get('http://localhost/Aquarium/backend/api/fishes.php'),
                axios.get('http://localhost/Aquarium/backend/api/categories.php'),
                axios.get('http://localhost/Aquarium/backend/api/orders.php'),
                axios.get('http://localhost/Aquarium/backend/api/background_videos.php')
            ]);
            if (fishRes.data.status === 'success') setFishes(fishRes.data.fishes);
            if (catRes.data.status === 'success') setCategories(catRes.data.categories);
            if (ordRes.data.status === 'success') setOrders(ordRes.data.orders);
            if (vidRes.data.status === 'success') setVideos(vidRes.data.videos);
        } catch (err) {
            console.error(err);
        }
    };

    // Category Handlers
    const handleAddCategory = async (e) => {
        e.preventDefault();
        const name = e.target.category_name.value;
        try {
            await axios.post('http://localhost/Aquarium/backend/api/categories.php', { category_name: name });
            toast.success("Category added");
            e.target.reset();
            fetchData();
        } catch (err) { toast.error("Error adding category"); }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete('http://localhost/Aquarium/backend/api/categories.php', { data: { id } });
            toast.success("Category deleted");
            fetchData();
        } catch (err) { toast.error("Error deleting category"); }
    };

    // Video Handlers
    const handleVideoUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('video_name', e.target.video_name.value);
        formData.append('video', e.target.video.files[0]);
        try {
            await axios.post('http://localhost/Aquarium/backend/api/background_videos.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success("Video uploaded");
            e.target.reset();
            fetchData();
        } catch (err) { toast.error("Error uploading video"); }
    };

    const handleSetActiveVideo = async (id) => {
        try {
            await axios.put('http://localhost/Aquarium/backend/api/background_videos.php', { id });
            toast.success("Active video updated");
            fetchData();
        } catch (err) { toast.error("Error updating video"); }
    };

    const handleDeleteVideo = async (id) => {
        try {
            await axios.delete('http://localhost/Aquarium/backend/api/background_videos.php', { data: { id } });
            toast.success("Video deleted");
            fetchData();
        } catch (err) { toast.error("Error deleting video"); }
    };

    // Order Handlers
    const handleUpdateOrderStatus = async (id, status) => {
        try {
            await axios.put('http://localhost/Aquarium/backend/api/orders.php', { order_id: id, status });
            toast.success("Order status updated");
            fetchData();
        } catch (err) { toast.error("Error updating order"); }
    };

    // Fish Handlers (Add new)
    const handleAddFish = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            await axios.post('http://localhost/Aquarium/backend/api/fishes.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success("Fish added successfully");
            e.target.reset();
            fetchData();
        } catch (err) { toast.error("Error adding fish"); }
    };

    const handleDeleteFish = async (id) => {
        try {
            await axios.delete('http://localhost/Aquarium/backend/api/fishes.php', { data: { id } });
            toast.success("Fish deleted");
            fetchData();
        } catch (err) { toast.error("Error deleting fish"); }
    };

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="admin-layout fade-in glass" style={{margin:'100px 20px 20px', borderRadius:'16px'}}>
            <div className="admin-sidebar">
                <h3 style={{marginBottom:'30px'}} className="text-gradient">Admin Panel</h3>
                <ul style={{listStyle:'none'}}>
                    <li style={{marginBottom:'15px'}}>
                        <button className={`btn ${activeTab === 'fishes' ? 'btn-primary' : 'btn-outline'}`} style={{width:'100%'}} onClick={() => setActiveTab('fishes')}>Manage Fishes</button>
                    </li>
                    <li style={{marginBottom:'15px'}}>
                        <button className={`btn ${activeTab === 'categories' ? 'btn-primary' : 'btn-outline'}`} style={{width:'100%'}} onClick={() => setActiveTab('categories')}>Categories</button>
                    </li>
                    <li style={{marginBottom:'15px'}}>
                        <button className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline'}`} style={{width:'100%'}} onClick={() => setActiveTab('orders')}>Orders</button>
                    </li>
                    <li style={{marginBottom:'15px'}}>
                        <button className={`btn ${activeTab === 'videos' ? 'btn-primary' : 'btn-outline'}`} style={{width:'100%'}} onClick={() => setActiveTab('videos')}>Background Videos</button>
                    </li>
                </ul>
            </div>
            
            <div className="admin-content">
                {activeTab === 'fishes' && (
                    <div>
                        <h2>Manage Fishes</h2>
                        <div className="glass" style={{padding:'20px', borderRadius:'10px', marginTop:'20px', marginBottom:'30px'}}>
                            <h4>Add New Fish</h4>
                            <form onSubmit={handleAddFish} style={{display:'grid', gap:'10px', gridTemplateColumns:'1fr 1fr', marginTop:'15px'}}>
                                <input name="fish_name" className="input-field" placeholder="Fish Name" required />
                                <select name="category_id" className="input-field" required>
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.category_name}</option>)}
                                </select>
                                <input name="price" type="number" step="0.01" className="input-field" placeholder="Price" required />
                                <input name="size" className="input-field" placeholder="Size (e.g. 5cm)" required />
                                <input name="stock" type="number" className="input-field" placeholder="Stock Quantity" required />
                                <input name="image" type="file" className="input-field" accept="image/*" required />
                                <textarea name="description" className="input-field" placeholder="Description" style={{gridColumn:'span 2'}}></textarea>
                                <button type="submit" className="btn btn-primary" style={{gridColumn:'span 2'}}>Add Fish</button>
                            </form>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fishes.map(f => (
                                    <tr key={f.id}>
                                        <td><img src={f.image ? `http://localhost/Aquarium/backend/uploads/fish_images/${f.image}` : ''} alt={f.fish_name} style={{width:'50px', borderRadius:'5px'}} /></td>
                                        <td>{f.fish_name}</td>
                                        <td>{f.category_name}</td>
                                        <td>${f.price}</td>
                                        <td>{f.stock}</td>
                                        <td>
                                            <button className="btn-danger" style={{padding:'5px 10px', borderRadius:'5px', border:'none', cursor:'pointer'}} onClick={() => handleDeleteFish(f.id)}><Trash2 size={16}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'categories' && (
                    <div>
                        <h2>Categories</h2>
                        <form onSubmit={handleAddCategory} style={{display:'flex', gap:'10px', marginTop:'20px', marginBottom:'30px'}}>
                            <input name="category_name" className="input-field" placeholder="New Category Name" required style={{marginBottom:0}} />
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.category_name}</td>
                                        <td><button className="btn-danger" style={{padding:'5px 10px', borderRadius:'5px', border:'none', cursor:'pointer'}} onClick={() => handleDeleteCategory(c.id)}><Trash2 size={16}/></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div>
                        <h2>Manage Orders</h2>
                        <table style={{marginTop:'20px'}}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(o => (
                                    <tr key={o.id}>
                                        <td>#{o.id}</td>
                                        <td>{o.user_name} ({o.email})</td>
                                        <td>${o.total_amount}</td>
                                        <td>
                                            <span style={{
                                                padding:'4px 8px', borderRadius:'12px', fontSize:'0.8rem',
                                                background: o.status==='Delivered' ? 'var(--success)' : (o.status==='Pending' ? 'orange' : 'gray')
                                            }}>{o.status}</span>
                                        </td>
                                        <td>{new Date(o.created_at).toLocaleString()}</td>
                                        <td>
                                            <select 
                                                value={o.status} 
                                                onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                                                style={{padding:'5px', borderRadius:'5px', background:'var(--glass-bg)', color:'white', border:'1px solid var(--glass-border)'}}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'videos' && (
                    <div>
                        <h2>Background Videos</h2>
                        <form onSubmit={handleVideoUpload} style={{display:'flex', gap:'10px', marginTop:'20px', marginBottom:'30px'}}>
                            <input name="video_name" className="input-field" placeholder="Video Title" required style={{marginBottom:0}} />
                            <input name="video" type="file" className="input-field" accept="video/mp4" required style={{marginBottom:0}} />
                            <button type="submit" className="btn btn-primary"><Upload size={18}/> Upload</button>
                        </form>
                        <table>
                            <thead>
                                <tr>
                                    <th>Video</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {videos.map(v => (
                                    <tr key={v.id}>
                                        <td>
                                            <video src={`http://localhost/Aquarium/backend/uploads/videos/${v.video_path}`} style={{width:'100px', height:'60px', objectFit:'cover', borderRadius:'5px'}} />
                                        </td>
                                        <td>{v.video_name}</td>
                                        <td>{v.is_active == 1 ? <span style={{color:'var(--success)'}}><CheckCircle size={16}/> Active</span> : <span style={{color:'var(--text-muted)'}}>Inactive</span>}</td>
                                        <td style={{display:'flex', gap:'10px', alignItems:'center', height:'60px'}}>
                                            {v.is_active == 0 && (
                                                <button className="btn-outline" style={{padding:'5px 10px'}} onClick={() => handleSetActiveVideo(v.id)}>Set Active</button>
                                            )}
                                            <button className="btn-danger" style={{padding:'5px 10px', borderRadius:'5px', border:'none', cursor:'pointer'}} onClick={() => handleDeleteVideo(v.id)}><Trash2 size={16}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
