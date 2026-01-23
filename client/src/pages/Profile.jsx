// Membuat page profile
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import http from '../helpers/http'
import showError from '../helpers/error'
import NavbarHome from '../components/NavbarHome'

export default function Profile() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [form, setForm] = useState({
        fullName: '',
        phoneNumber: '',
        departementId: ''
    })
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const fetchProfile = async () => {
        try {
            setLoading(true)
            const response = await http({
                method: 'GET',
                url: '/profile'
            })
            setProfile(response.data)
            setForm({
                fullName: response.data.fullName || '',
                phoneNumber: response.data.phoneNumber || '',
                departementId: response.data.departementId || ''
            });
        } catch (error) {
            showError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await http({
                method: 'PUT',
                url: '/profile',
                data: form
            });
            
            alert('Profile updated successfully!');
            setEditMode(false);
            fetchProfile();
        } catch (error) {
            showError(error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleUpdateImage = async () => {
        if (!selectedImage) {
            alert('Please select an image first');
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('imageProfile', selectedImage);

            await http({
                method: 'PATCH',
                url: `/profile/image-profile`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Profile image updated successfully!');
            setSelectedImage(null);
            setImagePreview(null);
            fetchProfile();
        } catch (error) {
            showError(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !profile) {
        return (
            <>
                <NavbarHome />
                <div className="container text-center py-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading profile...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <NavbarHome />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="mb-0">
                                <i className="bi bi-person-circle me-2 text-success"></i>
                                My Profile
                            </h2>
                            <button 
                                className="btn btn-outline-secondary"
                                onClick={() => navigate('/')}
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Home
                            </button>
                        </div>

                        <div className="row g-4">
                        
                            <div className="col-md-4">
                                <div className="card shadow-sm border-0">
                                    <div className="card-body text-center p-4">
                                        <div className="mb-4">
                                            <div 
                                                className="rounded-circle mx-auto mb-3 overflow-hidden border border-3 border-success"
                                                style={{ width: '180px', height: '180px' }}
                                            >
                                                {imagePreview ? (
                                                    <img 
                                                        src={imagePreview} 
                                                        alt="Preview"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : profile?.imageProfile ? (
                                                    <img 
                                                        src={profile.imageProfile} 
                                                        alt="Profile"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div 
                                                        className="bg-success d-flex align-items-center justify-content-center"
                                                        style={{ width: '100%', height: '100%' }}
                                                    >
                                                        <i className="bi bi-person-fill text-white" style={{ fontSize: '5rem' }}></i>
                                                    </div>
                                                )}
                                            </div>
                                
                                            <div className="mb-2">
                                                <label htmlFor="imageUpload" className="btn btn-sm btn-outline-success">
                                                    <i className="bi bi-camera me-2"></i>
                                                    Change Photo
                                                </label>
                                                <input 
                                                    type="file" 
                                                    id="imageUpload"
                                                    className="d-none"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                            
                                            {selectedImage && (
                                                <button 
                                                    className="btn btn-success btn-sm w-100"
                                                    onClick={handleUpdateImage}
                                                    disabled={loading}
                                                >
                                                    <i className="bi bi-upload me-2"></i>
                                                    Upload Photo
                                                </button>
                                            )}
                                        </div>

                                        <h4 className="mb-1">{profile?.fullName || 'No Name'}</h4>
                                        <p className="text-muted mb-2">{profile?.email}</p>
                                        <span className={`badge ${profile?.role === 'Admin' ? 'bg-danger' : 'bg-success'}`}>
                                            {profile?.role}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="card shadow-sm border-0">
                                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">Profile Information</h5>
                                        {!editMode ? (
                                            <button 
                                                className="btn btn-success btn-sm"
                                                onClick={() => setEditMode(true)}
                                            >
                                                <i className="bi bi-pencil me-2"></i>
                                                Edit Profile
                                            </button>
                                        ) : (
                                            <button 
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => {
                                                    setEditMode(false);
                                                    setForm({
                                                        fullName: profile?.fullName || '',
                                                        phoneNumber: profile?.phoneNumber || '',
                                                        departementId: profile?.departementId || ''
                                                    });
                                                }}
                                            >
                                                <i className="bi bi-x-circle me-2"></i>
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                    <div className="card-body p-4">
                                        {!editMode ? (
                                            
                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <div className="p-3 bg-light rounded">
                                                        <small className="text-muted d-block mb-1">
                                                            <i className="bi bi-person me-2"></i>Full Name
                                                        </small>
                                                        <strong>{profile?.fullName || '-'}</strong>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="p-3 bg-light rounded">
                                                        <small className="text-muted d-block mb-1">
                                                            <i className="bi bi-envelope me-2"></i>Email
                                                        </small>
                                                        <strong>{profile?.email || '-'}</strong>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="p-3 bg-light rounded">
                                                        <small className="text-muted d-block mb-1">
                                                            <i className="bi bi-telephone me-2"></i>Phone Number
                                                        </small>
                                                        <strong>{profile?.phoneNumber || '-'}</strong>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="p-3 bg-light rounded">
                                                        <small className="text-muted d-block mb-1">
                                                            <i className="bi bi-building me-2"></i>Department
                                                        </small>
                                                        <strong>{profile?.Departement?.departementName || '-'}</strong>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="p-3 bg-light rounded">
                                                        <small className="text-muted d-block mb-1">
                                                            <i className="bi bi-shield-check me-2"></i>Role
                                                        </small>
                                                        <strong>{profile?.role || '-'}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                           
                                            <form onSubmit={handleUpdateProfile}>
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">
                                                        <i className="bi bi-person me-2"></i>Full Name
                                                    </label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        name="fullName"
                                                        value={form.fullName}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">
                                                        <i className="bi bi-envelope me-2"></i>Email
                                                    </label>
                                                    <input 
                                                        type="email"
                                                        className="form-control"
                                                        value={profile?.email}
                                                        disabled
                                                    />
                                                    <small className="text-muted">Email cannot be changed</small>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">
                                                        <i className="bi bi-telephone me-2"></i>Phone Number
                                                    </label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        name="phoneNumber"
                                                        value={form.phoneNumber}
                                                        onChange={handleChange}
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="form-label fw-semibold">
                                                        <i className="bi bi-building me-2"></i>Department ID
                                                    </label>
                                                    <input 
                                                        type="number"
                                                        className="form-control"
                                                        name="departementId"
                                                        value={form.departementId}
                                                        onChange={handleChange}
                                                        placeholder="Enter department ID"
                                                    />
                                                </div>
                                                <button 
                                                    type="submit"
                                                    className="btn btn-success w-100"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                                            Updating...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="bi bi-check-circle me-2"></i>
                                                            Save Changes
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}