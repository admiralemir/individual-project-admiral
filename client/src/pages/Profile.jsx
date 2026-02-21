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
    const infoItem = ({ label, value }) => (
        <div>
            <small className="text-white-50 d-block">{label}</small>
            <strong>{value || '-'}</strong>
        </div>
    )

    return (
        <>
            <div
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
                    paddingTop: "120px",
                    paddingBottom: "80px"
                }}
            >

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">

                            {/* Header */}
                            <div className="d-flex justify-content-between align-items-center mb-5 text-white">
                                <h2 className="mb-0 fw-bold" style={{ letterSpacing: "1px" }}>
                                    My Profile
                                </h2>
                                <button
                                    className="btn btn-outline-light btn-sm"
                                    onClick={() => navigate('/')}
                                >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Back to Home
                                </button>
                            </div>

                            <div className="row g-5">

                                {/* LEFT CARD */}
                                <div className="col-md-4">
                                    <div className="glass-card text-center p-4">

                                        <div className="mb-4">
                                            <div className="profile-circle">
                                                {imagePreview ? (
                                                    <img src={imagePreview} alt="Preview" />
                                                ) : profile?.imageProfile ? (
                                                    <img src={profile.imageProfile} alt="Profile" />
                                                ) : (
                                                    <div className="profile-placeholder">
                                                        <i className="bi bi-person-fill"></i>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-3">
                                                <label htmlFor="imageUpload" className="btn btn-outline-light btn-sm w-100">
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
                                                    className="btn btn-primary btn-sm w-100 mt-2"
                                                    onClick={handleUpdateImage}
                                                    disabled={loading}
                                                >
                                                    Upload Photo
                                                </button>
                                            )}
                                        </div>

                                        <h4 className="text-white">{profile?.fullName || 'No Name'}</h4>
                                        <p className="text-white-50">{profile?.email}</p>

                                        <span className={`badge ${profile?.role === 'Admin' ? 'bg-danger' : 'bg-primary'}`}>
                                            {profile?.role}
                                        </span>
                                    </div>
                                </div>


                                {/* RIGHT CARD */}
                                <div className="col-md-8">
                                    <div className="glass-card p-4">

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h5 className="text-white mb-0">Profile Information</h5>

                                            {!editMode ? (
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => setEditMode(true)}
                                                >
                                                    Edit Profile
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-outline-light btn-sm"
                                                    onClick={() => {
                                                        setEditMode(false);
                                                        setForm({
                                                            fullName: profile?.fullName || '',
                                                            phoneNumber: profile?.phoneNumber || '',
                                                            departementId: profile?.departementId || ''
                                                        });
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>

                                        {!editMode ? (
                                            <div className="info-box">
                                                <infoItem label="Full Name" value={profile?.fullName} />
                                                <infoItem label="Email" value={profile?.email} />
                                                <infoItem label="Phone Number" value={profile?.phoneNumber} />
                                                <infoItem label="Department" value={profile?.Departement?.departementName} />
                                                <infoItem label="Role" value={profile?.role} />
                                            </div>
                                        ) : (
                                            <form onSubmit={handleUpdateProfile} className="text-white">

                                                <div className="mb-3">
                                                    <label className="form-label">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control custom-input"
                                                        name="fullName"
                                                        value={form.fullName}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control custom-input"
                                                        value={profile?.email}
                                                        disabled
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control custom-input"
                                                        name="phoneNumber"
                                                        value={form.phoneNumber}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label className="form-label">Department ID</label>
                                                    <input
                                                        type="number"
                                                        className="form-control custom-input"
                                                        name="departementId"
                                                        value={form.departementId}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100"
                                                    disabled={loading}
                                                >
                                                    Save Changes
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


            {/* ================= STYLING ================= */}
            <style>{`

.glass-card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.08);
}

.profile-circle {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    border: 3px solid rgba(255,255,255,0.2);
}

.profile-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-placeholder {
    background: linear-gradient(135deg, #203a43, #2c5364);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    color: white;
}

.info-box div {
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    color: white;
}

.custom-input {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: white;
}

.custom-input:focus {
    background: rgba(255,255,255,0.12);
    border-color: #2c5364;
    box-shadow: none;
    color: white;
}

`}</style>
        </>
    );
}