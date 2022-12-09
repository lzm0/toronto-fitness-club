import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import EditProfile from "./EditProfile";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://${window.location.hostname}:8000/api/profile/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhoneNumber(data.phone_number);
        setAvatar(`http://${window.location.hostname}:8000` + data.avatar);
        setIsLoaded(true);
      });
  }, []);

  return (
    <div className={"card bg-base-100" + (isLoaded ? "" : " invisible")}>
      <div className="card-body gap-8">
        <div className="flex items-center gap-8 truncate">
          <Avatar avatar={avatar} firstName={firstName} />
          <div className="flex flex-col gap-2 items-start">
            <div className="flex flex-col">
              <div className="font-bold text-2xl">
                {firstName} {lastName}
              </div>
              <div className="text-slate-500">{"@" + username}</div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-end gap-1">
                <EnvelopeIcon className="w-5 h-5" />
                <div>{email}</div>
              </div>
              <div className="flex items-end gap-1">
                <PhoneIcon className="w-5 h-5" />
                <div>{phoneNumber}</div>
              </div>
            </div>
          </div>
        </div>
        <EditProfile
          username={username}
          email={email}
          firstName={firstName}
          lastName={lastName}
          phoneNumber={phoneNumber}
        />
      </div>
    </div>
  );
}

export default Profile;
