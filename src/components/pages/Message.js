import React,{useEffect,useState} from 'react'
import Grid from '@mui/material/Grid';
import Friends from "./Friends"
import Images from '../layouts/Images';
import Flex from '../layouts/Flex';
import {BsThreeDotsVertical,BsCameraFill} from "react-icons/bs";
import JoinedGroup from './JoinedGroup';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import BoxTitle from '../heading/BoxTitle';
import SubTitle from '../heading/SubTitle';
import { getDatabase, ref, onValue,remove,set, push} from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment/moment';
import ScrollToBottom from 'react-scroll-to-bottom';
import { style } from '@mui/system';
import EmojiPicker from 'emoji-picker-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getStorage, ref as sref, uploadBytes,getDownloadURL,uploadString  } from "firebase/storage";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { AudioRecorder } from 'react-audio-voice-recorder';
import {BsEmojiSmileFill} from "react-icons/bs"

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
  console.log(blob)
};


const Message = () => {
  let data = useSelector(state => state)
  const db = getDatabase();
  const storage = getStorage();
  let [friends, setfriends] = useState([])
  let [activeChat, setActiveChat] = useState([])
  let [msg, setMsg] = useState([])
  let [msgList, setMsgList] = useState([])
  let [isCamera, setisCamera] = useState(false)
  let [showEmojiBox, setshowEmojiBox] = useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(()=>{
    const starCountRef = ref(db, 'friends');
    onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
            if(data.userData.userInfo.uid == item.val().receiverid || data.userData.userInfo.uid == item.val().senderid){
                arr.push({...item.val(),id:item.key})
            } 
        })
        setfriends(arr)
    });
},[])
  let handleActiveChat = (item) =>{
    setActiveChat({...item, msgstatus: "singlemsg"});  
  }
  let hundleBlock = (item) =>{
    data.userData.userInfo.uid == item.senderid 
    ?
        set(push(ref(db, 'block')), {
            block: item.receivername,
            blockid: item.receiverid,
            blockby: item.sendername,
            blockbyid: item.senderid,
        }).then(()=>{
            remove(ref(db, 'friends/'+ item.id)).then(()=>{
                toast("Block Done..");
            });
        })
    :
        set(push(ref(db, 'block')), {
            block: item.sendername,
            blockid: item.senderid,
            blockby: item.receivername,
            blockbyid: item.receiverid,
        }).then(()=>{
            remove(ref(db, 'friends/'+ item.id)).then(()=>{
                toast("Block Done..");
            });
        })
    }
  
    let handleSendMsg = () => {
      if(msg.length > 0){
        if(activeChat.msgstatus == "singlemsg"){
          set(push(ref(db, 'onebyonemsg')), {
            whosendid: data.userData.userInfo.uid,
            whosendname: data.userData.userInfo.displayName,
            whoreceivedid: data.userData.userInfo.uid == activeChat.senderid 
              ?
              activeChat.receiverid 
              :
              activeChat.senderid
            ,
            whoreceivedname: data.userData.userInfo.uid == activeChat.senderid 
              ?
              activeChat.receivername 
              :
              activeChat.sendername
            , 
            message: msg,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
          }).then(()=>{
            setMsg("")
          })
        }
      }
    }
    useEffect(()=>{
      const starCountRef = ref(db, 'onebyonemsg');
      onValue(starCountRef, (snapshot) => {
          let arr = []
          let id = activeChat.receiverid == data.userData.userInfo.uid ?
                    activeChat.senderid : activeChat.receiverid;
          snapshot.forEach(item=>{
            if((item.val().whosendid == data.userData.userInfo.uid && item.val().whoreceivedid == id) || (item.val().whosendid == id && item.val().whoreceivedid == data.userData.userInfo.uid)){
              arr.push(item.val())  
            }
          })
          setMsgList(arr)
      });
  },[activeChat])
  let handleKeyPress = (e) => {
    if(e.key == "Enter"){
      if(msg.length > 0){
        if(activeChat.msgstatus == "singlemsg"){
          set(push(ref(db, 'onebyonemsg')), {
            whosendid: data.userData.userInfo.uid,
            whosendname: data.userData.userInfo.displayName,
            whoreceivedid: data.userData.userInfo.uid == activeChat.senderid 
              ?
              activeChat.receiverid 
              :
              activeChat.senderid
            ,
            whoreceivedname: data.userData.userInfo.uid == activeChat.senderid 
              ?
              activeChat.receivername 
              :
              activeChat.sendername
            , 
            message: msg,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
          }).then(()=>{
            //msg box faka korte hobea
            setMsg("")
          })
        }
      }
    }
  }
  let handleChatImgExit = () => {
    setOpen(false)
  }
  let handleChatImg = (e) =>{
    console.log(e.target.files[0])
    const storageRef = sref(storage, "singlechatimg/"+e.target.files[0].name);
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log("file available at", downloadURL);
        if(activeChat.msgstatus == "singlemsg"){
          set(push(ref(db, 'onebyonemsg')), {
            whosendid: data.userData.userInfo.uid,
            whosendname: data.userData.userInfo.displayName,
            whoreceivedid: data.userData.userInfo.uid == activeChat.senderid 
              ?
              activeChat.receiverid 
              :
              activeChat.senderid
            ,
            whoreceivedname: data.userData.userInfo.uid == activeChat.senderid 
              ?
              activeChat.receivername 
              :
              activeChat.sendername
            , 
            onebyoneimg: downloadURL,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
          }).then(()=>{
            setMsg("")
          })
        }
      }).then(()=>{
        toast("Image Sent Successfully..");
        setOpen(false)
      })
    });
  }
  function handleTakePhoto (dataUri) {
    console.log(dataUri);
    const storageRef = sref(storage, 'singlechatimg/'+ Date.now());
    const message4 = dataUri;
    uploadString(storageRef, message4, 'data_url').then((snapshot) => {
      console.log('Uploaded a data_url string!');
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log("file available at", downloadURL);
        if(activeChat.msgstatus == "singlemsg"){
          set(push(ref(db, 'onebyonemsg')), {
            whosendid: data.userData.userInfo.uid,
            whosendname: data.userData.userInfo.displayName,
            whoreceivedid: data.userData.userInfo.uid == activeChat.senderid 
              ?
              activeChat.receiverid 
              :
              activeChat.senderid
            ,
            whoreceivedname: data.userData.userInfo.uid == activeChat.senderid 
              ?
              activeChat.receivername 
              :
              activeChat.sendername
            , 
            onebyoneimg: downloadURL,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
          }).then(()=>{
            setisCamera(false)
          })
        }
      })
    });
  }
  let handleCameraClick = () => {
    setOpen(false)
    setisCamera(true)
  }
  let handleEmoji = (e) => {
    setMsg(msg+e.emoji)
  } 
  // let handleEmojiBox = () =>{
  //   setshowEmojiBox(true)
  // }
  return (
    <>
        <Grid item xs={4}>
            {/* <Friends/> */}
            {/* <JoinedGroup/> */}
            <div>
                <div className='box_main'>
                    <ToastContainer />
                    <Flex className='title_wrapper'>
                        <BoxTitle title="Friends" className='box_title'/>
                    </Flex>
                    <div className='group_wrapper'>
                        {friends.length > 0 ? friends.map((item) => (
                            <Flex onClick={()=>handleActiveChat(item)}  className="grouplist">
                                <Flex className='group_details'>
                                <div className='group_img_holder'>
                                    <Images src='./assets/images/profile.png'/>
                                </div>
                                <div className='group_info'>
                                    {data.userData.userInfo.uid == item.senderid 
                                    ? 
                                        <BoxTitle title={item.receivername} className='group_name'/>
                                    :
                                        <BoxTitle title={item.sendername} className='group_name'/>
                                    }
                                    <SubTitle className="group_subtitle" subtitle={item.date}/>
                                </div>
                                </Flex>
                                <div>
                                    <HomeCmnBtn onClick={()=>hundleBlock(item)} className="homecmnbtn" title="block"/>
                                </div>
                            </Flex>
                        )) : 
                            <Alert style={{marginTop:"10px",padding: "0 16px",fontWeight:"600"}} variant="filled" severity="error">
                                No Friends available
                            </Alert>
                        }
                        
                    </div>
                </div>
            </div>
        </Grid>
        <Grid item xs={6}>
          {activeChat.receivername
          ?
            <Flex className="chatting_box">
                <Flex className="chat_head">
                  <Flex className="chat_head_img">
                    <Images src="assets/images/profile.png"/>
                  </Flex>
                  <Flex className="chat_head_info">
                      {
                        data.userData.userInfo.uid == activeChat.senderid
                        ?
                          <h2>{activeChat.receivername}</h2>
                          :
                          <h2>{activeChat.sendername}</h2>
                      }
                    <span>Online</span>
                  </Flex>
                  <Flex className="chat_head_btn">
                    <BsThreeDotsVertical/>
                  </Flex>
                </Flex>
                <ScrollToBottom  className="chat_body">
                  {msgList.map((item) => (
                    item.whosendid == data.userData.userInfo.uid
                    ?
                    <div className='send_msg'>
                      {item.message
                      ?
                      <p>{item.message}</p>
                      :
                      <div className='chat_img_box'>
                        <img src={item.onebyoneimg} alt="img"/>
                      </div>
                      }
                      <span>
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </span>
                    </div> 
                    :
                    <div className='receive_msg'>
                      {item.message
                      ?
                      <p>{item.message}</p>
                      :
                      <div className='chat_img_box'>
                        <img src={item.onebyoneimg} alt="img"/>
                      </div>
                      }
                      <span>
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </span>
                    </div> 
                  ))} 
                </ScrollToBottom >
                <Flex className="chat_footer">
                  <div className='chat_input_box'>
                    <input onKeyUp={handleKeyPress} onChange={(e)=>setMsg(e.target.value)} value={msg} name='chat_msg_input' placeholder='Message'/>
                    <BsCameraFill onClick={handleOpen} className='camera_icon'/>
                    <AudioRecorder className="voice_icon" onRecordingComplete={addAudioElement} />
                    <BsEmojiSmileFill onClick={() => setshowEmojiBox(!showEmojiBox)} className='emoji_click'/>
                    {showEmojiBox &&
                      <div className='emoji_box'>
                        <EmojiPicker onEmojiClick={(e)=>handleEmoji(e)}/>
                      </div>      
                    }
                  </div>
                      {msg != "" 
                      ?
                      <button onClick={handleSendMsg}>Send</button>
                      :
                      <></>
                      }
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style2}>
                        <div className='img_modal'>
                          <div>
                            <h3>Choose Image</h3>
                          </div>
                          <div className='file_box'>
                            <input onChange={handleChatImg} type="file"/>
                            
                            <button onClick={handleCameraClick}>Camera</button>
                            
                          </div>
                          <div className='img_modal_btn'>
                            <button>Sent</button>
                            <button onClick={handleChatImgExit}>Cancel</button>
                          </div>
                        </div>
                      </Box>
                    </Modal>
                </Flex>
            </Flex>
                       
          :
          <div className='empty_box'>
            <div className='empty_chat'>
              <h1>Please Select a Feiend or Group and start chatting..</h1>
            </div>
          </div>
          }
          {isCamera &&
            <div className='camera_main' style={{position:"absolute",left:0,top:0,}}>
              <button onClick={()=>setisCamera(false)} className='close_btn'>Close</button>
              <Camera
                onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                idealResolution = {{width: "90%", height: "100%"}}
                imageCompression = {0.97}
                isMaxResolution = {true}
                isImageMirror = {false}
                isSilentMode = {false}
                isDisplayStartCameraError = {false}
                isFullscreen = {true}
                sizeFactor = {1}
              />
            </div>
          }
        </Grid>
        
    </>
  )
}

export default Message