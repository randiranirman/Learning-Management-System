const LogOutPopUp = ({ onCloseLogOut }) => {
  return (
    <div onClick={onCloseLogOut}>
      <div >
        <p>Are you sure you want to log out?</p>
        <div>
          <button onClick={onCloseLogOut}>Log Out</button>
          <button onClick={onCloseLogOut}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogOutPopUp;
