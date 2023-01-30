import React,{useEffect, useState} from 'react'
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

const FriendRequest = () => {

    let data = useSelector(state => state)
    const db = getDatabase();
    let [frequest, setfreqest] = useState([])

    useEffect(()=>{
        const starCountRef = ref(db, 'friendrequest');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(item.val().receiverid == data.userData.userInfo.uid){
                    arr.push({...item.val(),id:item.key})
                }
            })
            setfreqest(arr)
        });
    },[])

    let hundleDeleteFriendRequest= (friendrequest) =>{
        remove(ref(db, 'friendrequest/'+ friendrequest.id)).then(()=>{
            toast("Friend Request Rejected..");
        });
    };

    let hundleAcceptFriendRequest= (friendrequest) =>{
        set(push(ref(db, 'friends')), {
            ...friendrequest,
            date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
          }).then(()=>{
            remove(ref(db, 'friendrequest/'+ friendrequest.id)).then(()=>{
                toast("Friend Request Accepted..");
            });
          });
    };

    <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />

  return (
    <div className='box_main'>
        <ToastContainer />
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
                        <HomeCmnBtn onClick={()=>hundleAcceptFriendRequest(item)} className="homecmnbtn" title="Accept"/>
                        <HomeCmnBtn onClick={()=>hundleDeleteFriendRequest(item)} className="homecmnbtn" title="Reject"/>
                    </div>
                </Flex>
            )) : 
                <Alert style={{marginTop:"10px",padding: "0 16px",fontWeight:"600"}} variant="filled" severity="error">
                    No Friend Request available
                </Alert>
            }
            
            
        </div>
    </div>
  )
}

export default FriendRequest