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
import { ToastContainer, toast } from 'react-toastify';


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

  return (
    <div className='box_main'>
        <ToastContainer />
        <Flex className='title_wrapper'>
            <BoxTitle title="Friends" className='box_title'/>
        </Flex>
        <div className='group_wrapper'>
            {friends.length > 0 ? friends.map((item) => (
                <Flex className="grouplist">
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
  )
}

export default Friends