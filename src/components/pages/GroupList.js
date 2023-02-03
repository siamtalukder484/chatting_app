import React, { useEffect, useState } from 'react'
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';
import { useDispatch,useSelector } from 'react-redux'
import { getDatabase, ref, set, push, onValue} from "firebase/database";

const GroupList = () => {
    const db = getDatabase();
    let data = useSelector((state) => state)
    let [allglist, setAllglist] = useState([])

    useEffect(()=>{
        const starCountRef = ref(db, 'groups');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                arr.push(item.val())
            })
            setAllglist(arr)
        });
    },[])

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
                    <HomeCmnBtn className="homecmnbtn" title="join"/>
                    </div>
                </Flex>
            ))
            :
                <h1>fjdkf</h1>
            }
            
        </div>
    </div>
  )
}

export default GroupList