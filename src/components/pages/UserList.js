import React, { useEffect, useState } from 'react'
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';
import { getDatabase, ref, onValue, set, push,remove} from "firebase/database";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const UserList = () => {
    let data = useSelector(state => state)
    let db = getDatabase()
    let [userlist,setUserlist] = useState([])
    let [frequest,setfreqest] = useState([])

    useEffect(()=>{
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(data.userData.userInfo.uid != item.key){
                    arr.push({...item.val(), id:item.key})
                }
            })
            console.log(arr,"dfdsf")
            setUserlist(arr)
        });
    },[])
    useEffect(()=>{
        const usersRef = ref(db, 'friendrequest');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                arr.push(item.val().receiverid + item.val().senderid)
            })
            setfreqest(arr)
        });
    },[])

    let hundleFriendRequest = (info) =>{
        set(push(ref(db, 'friendrequest')), {
            sendername: data.userData.userInfo.displayName,
            senderid: data.userData.userInfo.uid,
            receivername: info.displayName,
            receiverid: info.id,
          });
    }

    let hundleCancelFriendRequest = (item) => {
        console.log(item)
        // remove(ref(db, 'friendrequest/'+ )).then(()=>{
        //     console.log("remove hoice")
        // });
    }

  return (
    <div className='box_main'>
        <Flex className='title_wrapper'>
            <BoxTitle title="User List" className='box_title'/>
        </Flex>
        <div className='group_wrapper'>
            {userlist.map(item=>(
                <Flex className="grouplist">
                    <Flex className='group_details'>
                    <div className='group_img_holder'>
                        <Images src="assets/images/profile.png"/>
                    </div>
                    <div className='group_info'>
                        <BoxTitle title={item.displayName} className='group_name'/>
                        <SubTitle className="group_subtitle" subtitle={item.email}/>
                    </div>
                    </Flex>
                    <div className='homecmnbtn_wrapper'>
                        {frequest.includes(item.id + data.userData.userInfo.uid || data.userData.userInfo.uid + item.id)
                        ?
                        <>
                            <HomeCmnBtn className="homecmnbtn" title="Pending"/>
                            <HomeCmnBtn onClick={()=>hundleCancelFriendRequest(item)} className="homecmnbtn" title="Cancel"/>
                        </>
                        :
                        <HomeCmnBtn onClick={()=> hundleFriendRequest(item)} className="homecmnbtn" title="Add"/>
                        }
                    </div>
                </Flex>            
            ))}
        </div>
    </div>
  )
}

export default UserList