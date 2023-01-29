import React,{useEffect, useState} from 'react'
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';
import { getDatabase, ref, onValue} from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {

    let data = useSelector(state => state)
    console.log(data)
    const db = getDatabase();
    let [frequest, setfreqest] = useState([])

    useEffect(()=>{
        const starCountRef = ref(db, 'friendrequest');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(item.val().receiverid == data.userData.userInfo.uid){
                    arr.push(item.val())
                }
            })
            setfreqest(arr)
        });
    },[])

  return (
    <div className='box_main'>
        <Flex className='title_wrapper'>
            <BoxTitle title="Friend Request" className='box_title'/>
        </Flex>
        <div className='group_wrapper'>
            {frequest.length > 0 ? frequest.map((item)=>(
                <Flex className="grouplist">
                    <Flex className='group_details'>
                    <div className='group_img_holder'>
                        <Images src='assets/images/profile.png'/>
                    </div>
                    <div className='group_info'>
                        <BoxTitle title={item.sendername} className='group_name'/>
                        <SubTitle className="group_subtitle" subtitle="MERN Stack Developer"/>
                    </div>
                    </Flex>
                    <div className='homecmnbtn_wrapper'>
                        <HomeCmnBtn className="homecmnbtn" title="Accept"/>
                        <HomeCmnBtn className="homecmnbtn" title="Reject"/>
                    </div>
                </Flex>
            )) : <h1>No Request avaliable</h1>}
            
            
        </div>
    </div>
  )
}

export default FriendRequest