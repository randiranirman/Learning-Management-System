import { Avatar, Card, Button, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { addIconFull, pdfFrameImg, videoImgFull, assignmentUploadImg } from '../../../assets/assets';
import { useState } from 'react';

const { Meta } = Card;
const { Text } = Typography;

const Files = () => {
    const [topicName, setTopicName] = useState('Topic 1');

    const metirials = [
        {
            id: 1,
            name: 'topic 1',
            items: [
                {id: 1, uploadLink: "abc.test", fileType: "pdf", savedName: "file item 1"},
                {id: 2, uploadLink: "efg.test", fileType: "assignment", savedName: "file item 2"},
                {id: 3, uploadLink: "hij.test", fileType: "pdf", savedName: "file item 3"},
                {id: 4, uploadLink: "hij.test", fileType: "pdf", savedName: "file item 6"}
            ]
        },
        {
            id: 2,
            name: 'topic 2',
            items: [
                {id: 4, uploadLink: "pqr.test", fileType: "pdf", savedName: "item 2"},
                {id: 5, uploadLink: "stu.test", fileType: "text", savedName: "item 3"},
                {id: 6, uploadLink: "vuw.test", fileType: "video", savedName: "item 4"}
            ]
        },
        {
            id: 3,
            name: 'topic 3',
            items: []
        }
    ];

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
            default:
                return pdfFrameImg;
        }
    };

    return (
        <div>
            {metirials.map((topic) => {
                // Create an array of all cards for this topic including the "Add item" card
                const topicCards = [
                    ...topic.items.map(item => (
                        <Card
                            key={`item-${item.id}`}
                            hoverable
                            style={{ width: 180, margin: 10, borderRadius: 10 }}
                            cover={<img alt={item.savedName} src={getImageByFileType(item.fileType)} style={{ padding: 25 }} />}
                            actions={[
                                <EditOutlined key="edit" />,
                                <DeleteOutlined key="delete" />
                            ]}
                        >
                            <Meta style={{ textAlign: 'center' }} title={item.savedName} description="" />
                        </Card>
                    )),
                    // Add item card
                    <Card
                        key={`add-item-${topic.id}`}
                        hoverable
                        style={{ width: 180, margin: 10, borderRadius: 0 }}
                        cover={<img alt="Add new item" src={addIconFull} style={{ padding: 25 }} />}
                    >
                        <Meta style={{ textAlign: 'center' }} title="Add item" description="" />
                    </Card>
                ];

                // Split cards into rows of 4
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
                                onChange: (value) => {
                                    setTopicName(value);
                                    console.log('Edited value:', value);
                                },
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
        </div>
    );
};

export default Files;