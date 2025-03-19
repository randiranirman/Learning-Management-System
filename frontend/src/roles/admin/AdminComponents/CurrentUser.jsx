
const CurrentUser = () => {
  return (


    <>
     <div className="flex flex-col max-w-[80%] border-black mt-1.5 mx-2 ">
         <h1 className="font-semibold text-2xl">Current Users</h1>
         <thead className="bg-primary text-white font-semibold rounded-lg justify-between  ">
            <tr>
                <th className="p-3 text-left gap-2" > Name</th>
                <th className="p-3 text-left" > Username</th>
                <th  className="p-3 text-left" >Email</th>
                <th className="p-3 text-left" >Role</th>
                <th className="p-3 text-left" >Action</th>
            </tr>
         </thead>
        

     </div>
    </>
  )
}

export default CurrentUser
