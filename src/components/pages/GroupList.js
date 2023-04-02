import React, { useEffect, useState } from 'react'
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';
import { useDispatch,useSelector } from 'react-redux'
import { getDatabase, ref, set, push, onValue} from "firebase/database";
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';

const GroupList = () => {
    const db = getDatabase();
    let data = useSelector((state) => state)
    let [allglist, setAllglist] = useState([])
    let [grouprequest,setGroupreqest] = useState([])
    let [joinedgroup,setJoinedGroup] = useState([])
    // console.log(data.userData.userInfo.uid)

    useEffect(()=>{
        const starCountRef = ref(db, 'groups');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(data.userData.userInfo.uid != item.val().adminid){
                    arr.push({...item.val(),groupid:item.key})
                }
            })
            setAllglist(arr)
        });
    },[])

    useEffect(()=>{
        const usersRef = ref(db, 'grouprequest');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(item.val().userid == data.userData.userInfo.uid ){
                    arr.push(item.val().userid + item.val().groupid)
                }
            })
            setGroupreqest(arr)
        });
    },[])

    useEffect(()=>{
        const usersRef = ref(db, 'groupmembers');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(item.val().userid == data.userData.userInfo.uid){
                    arr.push(item.val().userid + item.val().groupid)
                }
            })
            setJoinedGroup(arr)
        });
    },[])
    


    let hundleGroupRequest = (item) => {
        set(push(ref(db, 'grouprequest')), {
            groupid: item.groupid,
            groupname: item.groupname,
            grouptag: item.grouptag,
            userid: data.userData.userInfo.uid,
            username: data.userData.userInfo.displayName,
            adminid: item.adminid,
            adminname: item.adminname,
        }).then(()=>{
            toast("Group join request Done..");
        });
    }

  return (
    <div className='box_main'>
        <Flex className='title_wrapper'>
            <BoxTitle title="Group" className='box_title'/>
        </Flex>
        <div className='group_wrapper'>
            {allglist.length > 0 ? allglist.map(item=>(
                <Flex className="grouplist">
                    <Flex className='group_details'>
                    <div className='group_img_holder'>
                        <Images src='assets/images/profile.png'/>
                    </div>
                    <div className='group_info'>
                        <BoxTitle title={item.groupname} className='group_name'/>
                        <SubTitle className="group_subtitle" subtitle={item.grouptag}/>
                    </div>
                    </Flex>
                    <div>
                        {joinedgroup.includes(data.userData.userInfo.uid + item.groupid) 
                        ?
                            <HomeCmnBtn className="homecmnbtn" title="Joined"/>
                        :
                            grouprequest.includes(data.userData.userInfo.uid + item.groupid ) 
                            ? 
                                <HomeCmnBtn className="homecmnbtn" title="Pending"/>
                            :
                                <HomeCmnBtn onClick={()=>hundleGroupRequest(item)} className="homecmnbtn" title="join"/>
                        }
                    </div>
                </Flex>
            ))
            :
                <Alert style={{marginTop:"10px",padding: "0 16px",fontWeight:"600"}} variant="filled" severity="error">
                    No Groups available here...
                </Alert>
            }
            
        </div>
    </div>
  )
}

export default GroupList