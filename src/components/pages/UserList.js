import React, { useEffect, useState } from 'react'
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';
import { getDatabase, ref, onValue} from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
    let data = useSelector(state => state)
    let db = getDatabase()
    let [userlist,setUserlist] = useState([])

    useEffect(()=>{
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(data.userData.userInfo.uid != item.key){
                    arr.push(item.val())
                }
            })
            setUserlist(arr)
        });
    },[])
    console.log(userlist)


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
                    <div>
                        <HomeCmnBtn className="homecmnbtn" title="Add"/>
                    </div>
                </Flex>            
            ))}
        </div>
    </div>
  )
}

export default UserList