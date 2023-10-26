"use client";

import { useState, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";
import Avatar from "boring-avatars";
import {Img} from 'react-image'

import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaUserLarge,
  FaQuoteLeft,
  FaHouse,
  FaMagnifyingGlass
} from "react-icons/fa6";

import Toggle from "react-toggle";

import Modal from "./modal";

import { User } from "./types/user";
import { GOTchar } from "./types/user";

export type GalleryProps = {
  users: User[];
};
const  Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<User | GOTchar | null >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showGotChar, setShowGotChar] = useState(false);
  const [gotChar, setGotChar] = useState(null);

  const handleModalOpen = (id: number) => {
    let user;
    if ( gotChar ){
      user = gotChar[id] || null;

    }else {
      user = usersList.find((item) => item.id === id) || null;
    }

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const fetchGotCharData = async () => {
    try {
      const data = await getGotData();
      setGotChar(data.characters);

    } catch (error) {
      console.error("Failed to fetch GOT character data:", error);
    }
  };

  const handleToggleChange = (e: { target: { checked: any; }; }) => {
    if (e.target.checked) {
      setShowGotChar(true);
    } else {
      setShowGotChar(false);
    }
  };
  useEffect(() => {
    if (showGotChar) {
      fetchGotCharData();
    }
  }, [showGotChar]);

  return (
    <div className="user-gallery">
      <h1 className="heading">Users</h1>
      <Toggle
        id="gotchar-status"
        defaultChecked={showGotChar}
        aria-labelledby="biscuit-label"
        onChange={handleToggleChange}
      />
      <span id="gotchar-label" > Show Game of Thrones characters? </span>
      {showGotChar ? (
                gotChar && ( // Check if gotChar has data

        <div className="items">
          {gotChar.map((user: { characterImageThumb: string | string[]; name: string | undefined; characterName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; houseName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; nickname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }, index: Key | null | undefined) => (
            <div
              className="item user-card"
              key={index}
              onClick={() => handleModalOpen(index)}
            >
              <div className="body">
                {
                  user.characterImageThumb ? <Img className="avatar" src={user.characterImageThumb}/> 
                  : <Avatar
                  size={96}
                  name={user.name}
                />
                }
              </div>
              <div className="info">
                <div className="name">{user.characterName}</div>
                <div className="company">{user.houseName}</div>
                <div className="nickname">"{user.nickname}"</div>
              </div>
            </div>
          ))}
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div className="user-panel">
              <div className="header">
                <div
                  role="button"
                  tabIndex={0}
                  className="close"
                  onClick={handleModalClose}
                >
                  <FaRegCircleXmark size={32} />
                </div>
              </div>
              <div className="body">
                {selectedUser && (
                  <div className="user-info info">
                    <div className="avatar">
                    {
                  selectedUser.characterImageFull ? <Img className="avatar-modal" src={selectedUser.characterImageFull}/> 
                  : <Avatar
                  size={96}
                  name={selectedUser.name}
                />
                }
                    </div>
                    <div className="name">
                      {selectedUser.characterName}
                    </div>
                    <div className="field">
                      <FaHouse className="icon" />
                      <div className="data">{selectedUser.houseName}</div>
                    </div>
                    <div className="field">
                      <FaUserLarge className="icon" />
                      <div className="value">{selectedUser.actorName}</div>
                    </div>
                    <div className="fields">
                      <FaQuoteLeft className="icon" />
                      <div className="value">{selectedUser.nickname}</div>
                    </div>
                    <div className="fields">
                      <FaMagnifyingGlass className="icon" />
                      <div className="value">{selectedUser.killedBy &&selectedUser.killedBy[0]}</div>
                    </div>                 
                  </div>
                )}
              </div>
            </div>
          </Modal>
        </div>
      )) : (
        <div className="items">
          {usersList.map((user, index) => (
            <div
              className="item user-card"
              key={index}
              onClick={() => handleModalOpen(user.id)}
            >
              <div className="body">
                <Avatar
                  size={96}
                  name={user.name}
                  variant="marble"
                  colors={[
                    "#92A1C6",
                    "#146A7C",
                    "#F0AB3D",
                    "#C271B4",
                    "#C20D90",
                  ]}
                />
              </div>
              <div className="info">
                <div className="name">{user.name}</div>
                <div className="company">{user.company.name}</div>
              </div>
            </div>
          ))}
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div className="user-panel">
              <div className="header">
                <div
                  role="button"
                  tabIndex={0}
                  className="close"
                  onClick={handleModalClose}
                >
                  <FaRegCircleXmark size={32} />
                </div>
              </div>
              <div className="body">
                {selectedUser && (
                  <div className="user-info info">
                    <div className="avatar">
                      <Avatar
                        size={240}
                        name={selectedUser.name}
                        variant="marble"
                        colors={[
                          "#92A1C6",
                          "#146A7C",
                          "#F0AB3D",
                          "#C271B4",
                          "#C20D90",
                        ]}
                      />
                    </div>
                    <div className="name">
                      {selectedUser.name} ({selectedUser.username})
                    </div>
                    <div className="field">
                      <FaLocationDot className="icon" />
                      <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                    </div>
                    <div className="field">
                      <FaPhone className="icon" />
                      <div className="value">{selectedUser.phone}</div>
                    </div>
                    <div className="fields">
                      <FaEnvelope className="icon" />
                      <div className="value">{selectedUser.email}</div>
                    </div>
                    <div className="company">
                      <div className="name">{selectedUser.company.name}</div>
                      <div className="catchphrase">
                        {selectedUser.company.catchPhrase}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

async function getGotData() {
  const res = await fetch(
    "https://raw.githubusercontent.com/jeffreylancaster/game-of-thrones/master/data/characters.json"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default Gallery;
