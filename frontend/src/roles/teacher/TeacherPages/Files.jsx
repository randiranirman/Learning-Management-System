import { useState, useRef, useEffect } from 'react';
import { Card, Button, Typography, message, Progress } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { pdfFrameImg, videoImgFull, assignmentUploadImg, addIconFull } from '../../../assets/assets.js';
import {createMetireal, getAllMetireals} from '../../../utils/MetirealApi.js';

const { Meta } = Card;
const { Text } = Typography;

function Files() {
  // const a = [
  //   {
  //     id: 1,
  //     name: 'Topic 1',
  //     items: [
  //       { id: 1, uploadLink: "abc.test", fileType: "pdf", savedName: "file item 1" },
  //       { id: 2, uploadLink: "efg.test", fileType: "assignment", savedName: "file item 2" },
  //       { id: 3, uploadLink: "hij.test", fileType: "pdf", savedName: "file item 3" },
  //       { id: 4, uploadLink: "hij.test", fileType: "pdf", savedName: "file item 6" }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'Topic 2',
  //     items: [
  //       { id: 5, uploadLink: "pqr.test", fileType: "pdf", savedName: "item 2" },
  //       { id: 6, uploadLink: "stu.test", fileType: "text", savedName: "item 3" },
  //       { id: 7, uploadLink: "vuw.test", fileType: "video", savedName: "item 4" }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     name: 'Topic 3',
  //     items: []
  //   }
  // ]
  const [materials, setMaterials] = useState([]);
  
  const [uploadingTopic, setUploadingTopic] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // dependency for empty array means it runs when the page is reloading
  useEffect(() => {
    const fetchAllMetireals = async () => {
      try {
        const response = await getAllMetireals();
        console.log("Response from page loading: ", response);
        setMaterials(response);
      } catch(err) {
        console.log("Error in page reloading: ", err);
        throw err;
      }
    };
    fetchAllMetireals();
  }, []) 

  const handleFileSelect = (e, topicId) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Auto-start upload when file is selected
      uploadToUploadcare(selectedFile, topicId);
    }
  };

  const uploadToUploadcare = async (fileToUpload, topicId) => {
    if (!fileToUpload) return;

    setUploadingTopic(topicId);
    setUploadProgress(0);

    // Create form data
    const formData = new FormData();
    formData.append('UPLOADCARE_PUB_KEY', '6cc797dafbd41f00efac');
    formData.append('UPLOADCARE_STORE', '1');
    formData.append('file', fileToUpload);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 500);

      // Upload to Uploadcare
      const response = await fetch('https://upload.uploadcare.com/base/', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      // Set progress to 100% when complete
      setUploadProgress(100);
      
      // Construct CDN URL from the UUID
      const cdnUrl = `https://ucarecdn.com/${data.file}/`;
      console.log(cdnUrl);
      
      // Determine file type based on mime type or extension
      let fileType = "pdf"; // Default
      if (fileToUpload.type.startsWith('video/')) {
        fileType = "video";
      } else if (fileToUpload.type.startsWith('image/')) {
        fileType = "image";
      } else if (fileToUpload.name.toLowerCase().endsWith('.doc') || 
                fileToUpload.name.toLowerCase().endsWith('.docx')) {
        fileType = "assignment";
      }
      
      // Add new file to materials array
      const newFile = {
        id: Date.now(),
        uploadLink: cdnUrl,
        fileType: fileType,
        savedName: fileToUpload.name.length > 15 ? 
                  fileToUpload.name.substring(0, 15) + '...' : 
                  fileToUpload.name
      };
      
      setMaterials(prevMaterials => {
        return prevMaterials.map(topic => {
          if (topic.id === topicId) {
            return {
              ...topic,
              items: [...topic.items, newFile]
            };
          }
          return topic;
        });
      });
      
      console.log(`${fileToUpload.name} uploaded successfully`);

      console.log(topicId, newFile);
      const backendResponse = await createMetireal(topicId, newFile);

      console.log(backendResponse);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      message.error('Failed to upload file. Please try again.');
    } finally {
      setTimeout(() => {
        setUploadingTopic(null);
      }, 500); // Slight delay to show 100% completion
    }
  };

  const triggerFileSelect = (topicId) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-topic-id', topicId);
      fileInputRef.current.click();
    }
  };

  const deleteFile = (e, topicId, itemId) => {
    e.stopPropagation(); // Prevent opening the file
    setMaterials(prevMaterials => {
      return prevMaterials.map(topic => {
        if (topic.id === topicId) {
          return {
            ...topic,
            items: topic.items.filter(item => item.id !== itemId)
          };
        }
        return topic;
      });
    });
    message.info('File deleted successfully');
  };

  const editFile = (e, topicId, itemId) => {
    e.stopPropagation(); // Prevent opening the file
    console.log("Edit file with id:", itemId, "in topic:", topicId);
    message.info('Edit functionality not implemented');
  };

  const openFilePreview = (file) => {
    // Open file preview in a new tab
    window.open(file.uploadLink, '_blank');
  };

  const getImageByFileType = (fileType) => {
    switch(fileType.toLowerCase()) {
      case 'pdf':
        return pdfFrameImg;
      case 'text':
        return pdfFrameImg;
      case 'video':
        return videoImgFull;
      case 'assignment':
        return assignmentUploadImg;
      case 'image':
        return pdfFrameImg; // You might want a specific image for images
      default:
        return pdfFrameImg;
    }
  };

  const addNewTopic = () => {
    const newTopic = {
      id: Date.now(),
      name: `Topic ${materials.length + 1}`,
      items: []
    };
    setMaterials([...materials, newTopic]);
    message.success('New topic added');
  };

  const handleTopicNameChange = (topicId, newName) => {
    setMaterials(prevMaterials => {
      return prevMaterials.map(topic => {
        if (topic.id === topicId) {
          return {
            ...topic,
            name: newName
          };
        }
        return topic;
      });
    });
  };

  return (
    <div style={{marginLeft: 20}}>
      
      {materials.map((topic) => {
        // Create an array of all cards for this topic including the "Add item" card
        const topicCards = [
          ...topic.items.map(item => (
            <Card
              key={`item-${item.id}`}
              hoverable
              style={{ width: 180, margin: 10, borderRadius: 10 }}
              cover={<img alt={item.savedName} src={getImageByFileType(item.fileType)} style={{ padding: 25 }} />}
              onClick={() => openFilePreview(item)}
              actions={[
                <EditOutlined key="edit" onClick={(e) => editFile(e, topic.id, item.id)} />,
                <DeleteOutlined key="delete" onClick={(e) => deleteFile(e, topic.id, item.id)} />
              ]}
            >
              <Meta style={{ textAlign: 'center' }} title={item.savedName} description="" />
            </Card>
          ))
        ];

        // Add either the "Add item" card or the "Uploading" card
        if (uploadingTopic === topic.id) {
          // Show uploading progress card
          topicCards.push(
            <Card
              key={`uploading-${topic.id}`}
              hoverable
              style={{ width: 180, margin: 10, borderRadius: 10 }}
              cover={
                <div style={{ padding: 25, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Progress type="circle" percent={Math.round(uploadProgress)} />
                </div>
              }
            >
              <Meta style={{ textAlign: 'center' }} title="Uploading..." description="" />
            </Card>
          );
        } else {
          // Show "Add item" card
          topicCards.push(
            <Card
              key={`add-item-${topic.id}`}
              hoverable
              style={{ width: 180, margin: 10, borderRadius: 0 }}
              cover={<img alt="Add new item" src={addIconFull} style={{ padding: 25 }} />}
              onClick={() => triggerFileSelect(topic.id)}
            >
              <Meta style={{ textAlign: 'center' }} title="Add item" description="" />
            </Card>
          );
        }

        // Split cards into rows of 6
        const rows = [];
        for (let i = 0; i < topicCards.length; i += 6) {
          rows.push(topicCards.slice(i, i + 6));
        }

        return (
          <div key={topic.id} style={{ marginBottom: 40 }}>
            <Text
              strong
              style={{ 
                fontSize: '30px',
                display: 'block',
                marginBottom: 20,
                marginLeft: 10
              }}
              editable={{
                onChange: (value) => handleTopicNameChange(topic.id, value),
              }}
            >
              {topic.name}
            </Text>

            {/* Render rows of cards */}
            {rows.map((row, rowIndex) => (
              <div 
                key={`row-${topic.id}-${rowIndex}`} 
                style={{ 
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 20
                }}
              >
                {row}
              </div>
            ))}
          </div>
        );
      })}

      <Button
        type="text" 
        icon={<PlusOutlined />} 
        onClick={addNewTopic}
        style={{ 
          fontWeight: '600', 
          fontSize: '30px', 
          display: 'flex', 
          alignItems: 'center',
          padding: 30,
          marginLeft: 10
        }}
      >
        Add Topic
      </Button>
      
      {/* Hidden file input for uploads */}
      <input
        type="file"
        onChange={(e) => {
          const topicId = parseInt(e.target.getAttribute('data-topic-id'));
          handleFileSelect(e, topicId);
        }}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
    </div>
  );
}

export default Files;