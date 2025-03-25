import Card from "../AdminComponents/Card";

const Dashboard = () => {
  return (
    <div  className="mx-2 mt-2 px-2 ">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div  className="flex ">
        <Card title="Total Users" description="500 users registered" />
        <Card title="Active Users" description="25 users are active" />
        <Card title="Total Assignments" description="124 assignments are posted" />
        <Card title="Total Courses" description="20 courses available" />
      </div>
    </div>
  );
};

export default Dashboard;
