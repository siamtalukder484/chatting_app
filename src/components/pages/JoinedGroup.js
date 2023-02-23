import React, { useEffect, useState } from 'react'
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';
import { useDispatch,useSelector } from 'react-redux'
import Alert from '@mui/material/Alert';
import {BsThreeDotsVertical} from "react-icons/bs";
import { getDatabase, ref, set, push, onValue, remove} from "firebase/database";

const JoinedGroup = () => {
    let [glist, setGlist] = useState([])
    let [gmlist, setGmlist] = useState([])
    let data = useSelector((state) => state)
    const db = getDatabase();

    useEffect(()=>{
        const starCountRef = ref(db, 'groupmembers');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{  
                arr.push(item.val().groupid+item.val().userid)  
            })
            setGmlist(arr)
        }); 
    },[])

    useEffect(()=>{
        const starCountRef = ref(db, 'groups');
            onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(data.userData.userInfo.uid == item.val().adminid){
                    arr.push({...item.val(),gid:item.key})
                }else if(gmlist.includes(item.key+data.userData.userInfo.uid)){
                    arr.push({...item.val(),gid:item.key})
                    
                }
            })
            setGlist(arr)
            });
    },[gmlist.length])

  return (
    <div className='box_main'>
        <Flex className='title_wrapper'>
            <BoxTitle title="My Group" className='box_title'/>
            {/* <HomeCmnBtn className="homecmnbtn" title="create group"/> */}
        </Flex>
        <div className='group_wrapper'>
            {glist.map(item=>(
                <Flex className="grouplist">
                    <Flex className='group_details'>
                    <div className='group_img_holder'>
                        <Images src='assets/images/profile.png'/>
                    </div>
                    <div className='group_info'>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <BoxTitle title={item.groupname} className='group_name'/>
                            {/* <span className='admin_badge'>admin</span> */}
                        </div>
                        <SubTitle className="group_subtitle" subtitle="hi hi hi"/>
                    </div>
                    </Flex>
                    <div>
                        <button className=''>    
                            {/* <BsThreeDotsVertical/> */}
                            Leave
                        </button>
                    </div>
                </Flex>
            ))}
        </div>
    </div>
  )
}

export default JoinedGroup