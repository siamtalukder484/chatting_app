import React,{useEffect,useState} from 'react'
import Grid from '@mui/material/Grid';
import Friends from "./Friends"
import Images from '../layouts/Images';
import Flex from '../layouts/Flex';
import {BsThreeDotsVertical} from "react-icons/bs";
import JoinedGroup from './JoinedGroup';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import BoxTitle from '../heading/BoxTitle';
import SubTitle from '../heading/SubTitle';
import { getDatabase, ref, onValue,remove,set, push} from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';


const Message = () => {
  let data = useSelector(state => state)
  const db = getDatabase();
  let [friends, setfriends] = useState([])
  let [activeChat, setActiveChat] = useState([])
  let [msg, setMsg] = useState([])
  let [msgList, setMsgList] = useState([])


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
          msg("")
        })
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
          msg("")
        })
      }
    }
  }
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
                <Flex className="chat_body">
                  {console.log(msgList)}
                  {msgList.map((item) => (
                    item.whosendid == data.userData.userInfo.uid
                    ?
                    <div className='send_msg'>
                      <p>{item.message}</p>
                    </div> 
                    :
                    <div className='receive_msg'>
                      <p>{item.message}</p>
                    </div> 
                  ))}
                  
                  
                  
                </Flex>
                <Flex className="chat_footer">
                    <input onKeyUp={handleKeyPress} onChange={(e)=>setMsg(e.target.value)} name='chat_msg_input' placeholder='Message'/>
                    <button onClick={handleSendMsg}>Send</button>
                </Flex>
            </Flex>
          :
          <div className='empty_box'>
            <div className='empty_chat'>
              <h1>Please Select a Feiend or Group and start chatting..</h1>
            </div>
          </div>
          }
        </Grid>
    </>
  )
}

export default Message