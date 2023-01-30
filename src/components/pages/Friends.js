import React,{useEffect,useState} from 'react'
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';
import { getDatabase, ref, onValue,remove,set, push} from "firebase/database";
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

const Friends = () => {
    let data = useSelector(state => state)
    const db = getDatabase();
    let [friends, setfriends] = useState([])

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

    let hundleBlock = (item) =>{
        set(push(ref(db, 'block')), {
           
        })
    }


  return (
    <div className='box_main'>
        <Flex className='title_wrapper'>
            <BoxTitle title="Friends" className='box_title'/>
        </Flex>
        <div className='group_wrapper'>
            {friends.length > 0 ? friends.map((item) => (
                <Flex className="grouplist">
                    <Flex className='group_details'>
                    <div className='group_img_holder'>
                        <Images src='assets/images/profile.png'/>
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
                        <HomeCmnBtn onClick={hundleBlock} className="homecmnbtn" title="block"/>
                    </div>
                </Flex>
            )) : 
                <Alert style={{marginTop:"10px",padding: "0 16px",fontWeight:"600"}} variant="filled" severity="error">
                    No Friends available
                </Alert>
            }
            
        </div>
    </div>
  )
}

export default Friends