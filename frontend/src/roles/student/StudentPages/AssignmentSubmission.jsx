import React, { useState } from 'react';

const AssignmentSubmission = () => {
  const [fileList, setFileList] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      id: Math.random().toString(36).substr(2, 9)
    }));
    setFileList(prev => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    handleFileUpload(files);
  };

  const handleSaveChanges = () => {
    alert('Changes saved successfully!');
  };

  const handleCancel = () => {
    setFileList([]);
    alert('Changes cancelled');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'white',
      padding: '20px',
      fontFamily: '"poppins",sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px 16px 0 0',
          padding: '24px',
          marginBottom: '0',
          color: 'white',
          textAlign: 'center'
        }}>
          
          <h1 style={{ 
            color: 'white', 
            margin: 0,
            fontWeight: 600,
            fontSize: '24px'
          }}>
            Assignment - Lesson 02
          </h1>
        </div>

        {/* Main Content Card */}
        <div style={{
          background: 'white',
          borderRadius: '0 0 16px 16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          padding: '32px'
        }}>
          {/* Date Information */}
          <div style={{
            background: '#f4f4f9',
            border: 'none',
            borderLeft: '4px solid #5038ED ',
            marginBottom: '32px',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
              gap: '16px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: '#6c757d',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  📅 OPENED
                </div>
                <div style={{ fontWeight: 500, color: '#212529' }}>
                  Monday, 11 November 2024, 12:00 AM
                </div>
              </div>
              <div>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: '#6c757d',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  ⏰ DUE
                </div>
                <div style={{ fontWeight: 500, color: '#212529' }}>
                  Monday, 9th December 9:00 AM
                </div>
              </div>
            </div>
          </div>

          {/* Submission Section */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
              color: '#5038ED ',
              marginBottom: '32px',
              fontWeight: 700,
              fontSize: '24px',
              position: 'relative'
            }}>
              Add Submission
              <div style={{
                position: 'absolute',
                bottom: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '3px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '2px'
              }} />
            </h2>

            <div 
              style={{
                background: dragOver ? '#f8f9ff' : '#fdfdfe',
                border: `2px dashed ${dragOver ? '#5038ED ' : '#d9d9d9'}`,
                borderRadius: '16px',
                padding: '48px 24px',
                marginBottom: '32px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px'
              }}>
                📄
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: 500,
                marginBottom: '8px',
                color: '#495057'
              }}>
                Drag and drop files here or click here to select
              </div>
              <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '24px' }}>
                Choose files to upload
              </div>
              
              <input
                id="fileInput"
                type="file"
                multiple
                accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>

            {fileList.length > 0 && (
              <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                <h4 style={{ color: '#667eea', marginBottom: '12px' }}>Selected Files:</h4>
                {fileList.map((file) => (
                  <div key={file.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '14px' }}>{file.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileList(prev => prev.filter(f => f.id !== file.id));
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff4d4f',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{
              fontSize: '12px',
              background: '#f1f3f4',
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'inline-block',
              marginBottom: '32px',
              color: '#868e96'
            }}>
              Supported formats: pdf, docx, png, etc.
            </div>

            <div style={{ height: '1px', background: '#f0f0f0', margin: '24px 0' }}></div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={handleSaveChanges}
                style={{
                  background: '#5038ED ',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  minWidth: '140px',
                  height: '48px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Save Changes
              </button>
              <button 
                onClick={handleCancel}
                style={{
                  background: 'white',
                  color: '#6c757d',
                  border: '2px solid #dee2e6',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  minWidth: '140px',
                  height: '48px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#f8f9fa';
                  e.target.style.borderColor = '#adb5bd';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = '#dee2e6';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmission;
