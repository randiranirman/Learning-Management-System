import Card from "../Components/Card"


const Dashboard = () => {
  return (

    <>
        <div className="flex flex-col  h-screen">
            <div className="flex flex-1">
                <div className="flex-1 bg-gray-100 p-10">
                    <h1 className="text-3xl font-bold mb-6">DashBoard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card title={"Total Users"} description={"100 users are  registered"} />
                        <Card title={"Active  Users"} description={"25 users are  active "} />
                        <Card title={"Total Courses"} description={"20 courses are available"} />
                        <Card title={"Total Assignments"} description={"10 assignments are available"} />
                    </div>

                </div>
            </div>
        </div>
    </>


  )
}

export default Dashboard
