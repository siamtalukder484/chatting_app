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

const GroupList = () => {
    const db = getDatabase();
    let data = useSelector((state) => state)
    let [allglist, setAllglist] = useState([])
    console.log(data.userData.userInfo.uid)

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

    let hundleGroupRequest = (item) => {
        console.log(item)
        set(push(ref(db, 'grouprequest')), {
            groupid: item.groupid,
            groupname: item.groupname,
            grouptag: item.grouptag,
            userid: data.userData.userInfo.uid,
            username: data.userData.userInfo.displayName,
            adminid: item.adminid,
            adminname: item.adminname,
        }).then(()=>{
            console.log("request gacea")
        });
    }

  return (
    <div className='box_main'>
        <Flex className='title_wrapper'>
            <BoxTitle title="All Group List" className='box_title'/>
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
                    <HomeCmnBtn onClick={()=>hundleGroupRequest(item)} className="homecmnbtn" title="join"/>
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