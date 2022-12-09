import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { PhoneIcon } from "@heroicons/react/20/solid";
import Avatar from "./Avatar";
import EditProfile from "./EditProfile";

function Profile({ user }) {
  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <div className="flex items-center gap-8 truncate">
          <Avatar user={user} />
          <div className="flex flex-col gap-2 items-start">
            <div className="flex flex-col">
              <div className="font-bold text-2xl">
                {user.first_name} {user.last_name}
              </div>
              <div className="opacity-60">{"@" + user.username}</div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <EnvelopeIcon className="w-4 h-4" />
                <div>{user.email}</div>
              </div>
              <div className="flex items-center gap-1">
                <PhoneIcon className="w-4 h-4" />
                <div>{user.phone_number}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end">
          <EditProfile user={user} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
