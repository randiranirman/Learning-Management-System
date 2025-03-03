import Card from "../AdminComponents/Card"

const Dashboard = () => {
  return (
    <>
      <div>
        <div>
          <div>
            <h1>DashBoard</h1>
            <div>
              <Card title={"Total Users"} description={"100 users are registered"} />
              <Card title={"Active Users"} description={"25 users are active"} />
              <Card title={"Total Courses"} description={"20 courses are available"} />
              <Card title={"Total Assignments"} description={"10 assignments are available"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
