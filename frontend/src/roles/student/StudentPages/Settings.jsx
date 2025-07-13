import { useState } from "react";

const StudentSettings = () => {
  const [student, setStudent] = useState({
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@student.school.edu",
    contactNumber: "(555) 123-4567",
    grade: "Grade 10 - B",
    studentId: "STU-2024-001",
    parentName: "Michael Davis",
    parentContact: "(555) 987-6543",
    address: "123 Oak Street, Springfield",
    profileImage: null
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState(student);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setFormData({...formData, profileImage: imageUrl});
        setPreviewImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({...formData, profileImage: null});
    setPreviewImage(null);
  };

  const showModal = () => {
    setFormData(student);
    setPreviewImage(student.profileImage);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    setStudent(formData);
    setIsModalVisible(false);
    setShowAlert(true);
    
    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const InfoCard = ({ icon, title, value, color }) => (
    <div className="info-card">
      <div className="info-content">
        <div className="icon-container" style={{ backgroundColor: `${color}15`, color }}>
          {icon}
        </div>
        <div className="text-content">
          <div className="title">{title}</div>
          <div className="value">{value}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="student-settings">
      <style jsx>{`
        .student-settings {
          padding: 24px 32px;
          background: #F4F4F9;
          min-height: 100vh;
        }
        
        .page-title {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 32px;
          color: #262626;
        }
        
        .alert {
          margin-bottom: 24px;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #65F178;
          background-color: rgba(101, 241, 120, 0.1);
          color: #065f46;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .alert-icon {
          font-size: 16px;
          color: #65F178;
        }
        
        .alert-content {
          flex: 1;
        }
        
        .alert-title {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .alert-description {
          font-size: 14px;
          opacity: 0.8;
        }
        
        .close-alert {
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: #065f46;
          opacity: 0.7;
        }
        
        .close-alert:hover {
          opacity: 1;
        }
        
        .profile-header {
          background: linear-gradient(135deg, #4f39f6 0%, #6366f1 100%);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 0 6px 24px rgba(79, 57, 246, 0.15);
        }
        
        .profile-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .profile-info {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          color: white;
          overflow: hidden;
        }
        
        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .profile-text h3 {
          margin: 0;
          color: white;
          font-size: 24px;
          font-weight: 600;
        }
        
        .profile-text p {
          margin: 4px 0 0 0;
          color: rgba(255,255,255,0.8);
          font-size: 16px;
        }
        
        .student-id {
          margin: 2px 0 0 0;
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          font-family: monospace;
        }
        
        .edit-btn {
          background: rgba(255,255,255,0.2);
          border: 2px solid white;
          border-radius: 8px;
          padding: 12px 24px;
          color: white;
          font-size: 16px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .edit-btn:hover {
          background: rgba(255,255,255,0.3);
        }
        
        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        
        .info-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          height: 100%;
          border: 1px solid rgba(79, 57, 246, 0.1);
        }
        
        .info-content {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
        }
        
        .icon-container {
          padding: 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        
        .text-content {
          flex: 1;
        }
        
        .title {
          font-size: 13px;
          color: #8c8c8c;
          margin-bottom: 4px;
        }
        
        .value {
          font-size: 16px;
          font-weight: 600;
          color: #262626;
          word-break: break-word;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .modal {
          background: white;
          border-radius: 12px;
          width: 700px;
          max-width: 90vw;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .modal-header {
          padding: 24px;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #262626;
        }
        
        .modal-body {
          padding: 24px;
        }
        
        .form-row {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .form-group {
          flex: 1;
        }
        
        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #262626;
        }
        
        .form-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #d9d9d9;
          border-radius: 6px;
          font-size: 14px;
          box-sizing: border-box;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #4f39f6;
          box-shadow: 0 0 0 2px rgba(79, 57, 246, 0.2);
        }
        
        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #f0f0f0;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        
        .btn {
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid #d9d9d9;
          background: white;
          cursor: pointer;
          font-size: 14px;
        }
        
        .btn-primary {
          background: #4f39f6;
          border-color: #4f39f6;
          color: white;
        }
        
        .btn-primary:hover {
          background: #6366f1;
          border-color: #6366f1;
        }
        
        .btn:hover {
          border-color: #4f39f6;
        }
        
        .profile-image-section {
          margin-bottom: 24px;
          text-align: center;
        }
        
        .profile-image-container {
          position: relative;
          display: inline-block;
          margin-bottom: 16px;
        }
        
        .profile-image-preview {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #f0f0f0;
          border: 2px solid #d9d9d9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: #8c8c8c;
          overflow: hidden;
        }
        
        .profile-image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .image-upload-btn {
          position: absolute;
          bottom: -5px;
          right: -5px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #4f39f6;
          color: white;
          border: 2px solid white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 2px 8px rgba(79, 57, 246, 0.3);
        }
        
        .image-upload-btn:hover {
          background: #6366f1;
        }
        
        .image-upload-input {
          display: none;
        }
        
        .image-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 12px;
        }
        
        .btn-small {
          padding: 6px 12px;
          font-size: 12px;
          border-radius: 4px;
        }
        
        .btn-danger {
          background: #F16567;
          border-color: #F16567;
          color: white;
        }
        
        .btn-danger:hover {
          background: #f87171;
          border-color: #f87171;
        }
        
        @media (max-width: 768px) {
          .student-settings {
            padding: 16px;
          }
          
          .profile-content {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          
          .details-grid {
            grid-template-columns: 1fr;
          }
          
          .modal {
            width: 95vw;
            margin: 20px;
          }
          
          .form-row {
            flex-direction: column;
          }
        }
      `}</style>
      
      <h1 className="page-title">Student Settings</h1>
      
      {/* Success Alert */}
      {showAlert && (
        <div className="alert">
          <span className="alert-icon">✓</span>
          <div className="alert-content">
            <div className="alert-title">Profile Updated Successfully!</div>
            <div className="alert-description">Your student profile information has been saved and updated.</div>
          </div>
          <button className="close-alert" onClick={() => setShowAlert(false)}>×</button>
        </div>
      )}
      
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-content">
          <div className="profile-info">
            <div className="avatar">
              {student.profileImage ? (
                <img src={student.profileImage} alt="Profile" />
              ) : (
                "👨‍🎓"
              )}
            </div>
            <div className="profile-text">
              <h3>{student.firstName} {student.lastName}</h3>
              <p>{student.grade}</p>
              <p className="student-id">ID: {student.studentId}</p>
            </div>
          </div>
          <button className="edit-btn" onClick={showModal}>
            ✏️ Edit Profile
          </button>
        </div>
      </div>

      {/* Details Cards */}
      <div className="details-grid">
        <InfoCard 
          icon="📧"
          title="Email Address"
          value={student.email}
          color="#4f39f6"
        />
        <InfoCard 
          icon="📞"
          title="Phone Number"
          value={student.contactNumber}
          color="#65F178"
        />
        <InfoCard 
          icon="🎓"
          title="Grade & Section"
          value={student.grade}
          color="#4f39f6"
        />
        <InfoCard 
          icon="🆔"
          title="Student ID"
          value={student.studentId}
          color="#65F178"
        />
        <InfoCard 
          icon="👨‍👩‍👧‍👦"
          title="Parent/Guardian"
          value={student.parentName}
          color="#4f39f6"
        />
        <InfoCard 
          icon="📱"
          title="Parent Contact"
          value={student.parentContact}
          color="#65F178"
        />
        <InfoCard 
          icon="🏠"
          title="Address"
          value={student.address}
          color="#4f39f6"
        />
      </div>

      {/* Edit Profile Modal */}
      {isModalVisible && (
        <div className="modal-overlay" onClick={() => setIsModalVisible(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span style={{ color: '#4f39f6' }}>✏️</span>
              <span className="modal-title">Edit Student Profile</span>
            </div>
            <div className="modal-body">
              {/* Profile Image Section */}
              <div className="profile-image-section">
                <div className="profile-image-container">
                  <div className="profile-image-preview">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" />
                    ) : (
                      "👨‍🎓"
                    )}
                  </div>
                  <label htmlFor="imageUpload" className="image-upload-btn">
                    📷
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="image-upload-input"
                  />
                </div>
                {previewImage && (
                  <div className="image-actions">
                    <button className="btn btn-small btn-danger" onClick={removeImage}>
                      🗑️ Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Grade & Section</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    placeholder="Enter grade and section"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Student ID</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.studentId}
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                  placeholder="Enter student ID"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Parent/Guardian Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    placeholder="Enter parent/guardian name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Parent Contact</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.parentContact}
                    onChange={(e) => setFormData({...formData, parentContact: e.target.value})}
                    placeholder="Enter parent contact number"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter home address"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={() => setIsModalVisible(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                💾 Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSettings;