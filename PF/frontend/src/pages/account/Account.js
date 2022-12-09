import LogoutButton from "./LogoutButton";
import Profile from "./profile/Profile";

function Account() {
  return (
    <div className="flex justify-center p-3">
      <div className="flex flex-col grow justify-items-stretch gap-4 max-w-md min-w-0">
        <Profile />
        <LogoutButton />
      </div>
    </div>
  );
}

export default Account;
