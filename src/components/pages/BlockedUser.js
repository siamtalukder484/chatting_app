import React, { useEffect, useState } from "react";
import BoxTitle from "../heading/BoxTitle";
import Flex from "../layouts/Flex";
import CmnButton from "../layouts/CmnButton";
import HomeCmnBtn from "../layouts/HomeCmnBtn";
import Images from "../layouts/Images";
import SubTitle from "../heading/SubTitle";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Alert from "@mui/material/Alert";

const BlockedUser = () => {
  let data = useSelector((state) => state);
  const db = getDatabase();
  let [blocklist, setblocklist] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "block");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().blockbyid == data.userData.userInfo.uid) {
          arr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid,
          });
        } else {
          arr.push({
            id: item.key,
            blockby: item.val().blockby,
            blockbyid: item.val().blockbyid,
          });
        }
      });
      setblocklist(arr);
    });
  }, []);

  let hundleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      sendername: item.block,
      senderid: item.blockid,
      receivername: data.userData.userInfo.displayName,
      receiverid: data.userData.userInfo.uid,
      date: `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "block/" + item.id)).then(() => {
        toast("Unblock Done..");
      });
    });
  };

  return (
    <div className="box_main">
      <Flex className="title_wrapper">
        <BoxTitle title="Blocked User" className="box_title" />
      </Flex>
      <div className="group_wrapper">
        {blocklist.length > 0 ? (
          blocklist.map((item) => (
            <Flex className="grouplist">
              <Flex className="group_details">
                <div className="group_img_holder">
                  <Images src="assets/images/profile.png" />
                </div>
                <div className="group_info">
                  <BoxTitle title={item.block} className="group_name" />
                  <SubTitle
                    className="group_subtitle"
                    subtitle="Python Developer"
                  />
                </div>
              </Flex>
              <div>
                <HomeCmnBtn
                  onClick={() => hundleUnblock(item)}
                  className="homecmnbtn"
                  title="unblock"
                />
              </div>
            </Flex>
          ))
        ) : (
          <Alert
            style={{ marginTop: "10px", padding: "0 16px", fontWeight: "600" }}
            variant="filled"
            severity="error"
          >
            No Blocked User
          </Alert>
        )}
      </div>
    </div>
  );
};

export default BlockedUser;
