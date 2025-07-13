import { useEffect, useState } from "react";
import { Card, Typography, Button, Row, Col } from "antd";
import EditProfile from "./EditProfile";
import { getAdminDetails } from "../../../utils/adminService";

const { Title } = Typography;

const Settings = () => {
 const [showEditProfile, setShowEditProfile] = useState(false);
 const [adminDetails, setAdminDetails] = useState({});

 const fetchAdminDetails = async () => {
   const id = localStorage.getItem("UserId");
   if (!id) {
     console.error("User ID not found in localStorage");
     return;
   }
   
   try {
     const details = await getAdminDetails(id);
     console.log("Admin Details:", details);
     setAdminDetails(details);
   } catch (error) {
     console.error("Failed to fetch admin details:", error);
   }
 };

 useEffect(() => {
   fetchAdminDetails();
 }, []);

 return (
   <>
     <Title level={3} style={{ paddingLeft: 8 }}>Settings</Title>
     <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
       <Col xs={24} sm={12} md={8}>
         <Card
           title="Edit Profile"
           bordered={false}
           style={{
             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
             borderRadius: 12
           }}
         >
           <p><strong>Name:</strong> {adminDetails.firstName} {adminDetails.lastName}</p>
           <p><strong>Email:</strong> {adminDetails.email}</p>
           <p><strong>Contact:</strong> {adminDetails.contactNumber}</p>
           <Button
             type="primary"
             onClick={() => setShowEditProfile(true)}
           >
             Edit
           </Button>
         </Card>
       </Col>
       {/* Add more cards if needed */}
     </Row>
     {showEditProfile && <EditProfile setShowEditProfile={setShowEditProfile} />}
   </>
 );
};

export default Settings;