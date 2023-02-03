import React, { useEffect, useState } from 'react'
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';
import {Box,Button,Typography,Modal,TextField} from '@mui/material';
import { getDatabase, ref, set, push, onValue} from "firebase/database";
import { useDispatch,useSelector } from 'react-redux'
import Alert from '@mui/material/Alert';

const MyGroup = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      let data = useSelector((state) => state)
      const db = getDatabase();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [gname, setGname] = useState()
    let [gtag, setGtag] = useState()
    let [glist, setGlist] = useState([])

    let hundleCreateGroup = () => {
        set(push(ref(db, 'groups/')), {
            groupname: gname,
            grouptag: gtag,
            adminid: data.userData.userInfo.uid,
            adminname: data.userData.userInfo.displayName,
        }).then(()=>{
            setOpen(false)
        });
    }
    

    useEffect(()=>{
        const starCountRef = ref(db, 'groups');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(data.userData.userInfo.uid == item.val().adminid){
                    arr.push(item.val())
                }
            })
            setGlist(arr)
        });
    },[])
      
  return (
    <div className='box_main'>
        <Flex className='title_wrapper'>
            <BoxTitle title="My Group" className='box_title'/>
            <HomeCmnBtn onClick={handleOpen} className="homecmnbtn" title="create group"/>
        </Flex>
        <div className='group_wrapper'>
        {glist.length > 0 ? glist.map(item=>(
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
                <HomeCmnBtn className="homecmnbtn" title="leave"/>
                </div>
            </Flex>
        )) :
        <Alert style={{marginTop:"10px",padding: "0 16px",fontWeight:"600"}} variant="filled" severity="error">
            No group available now
        </Alert>
        }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h4>Create New Group</h4>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField onChange={(e)=>setGname(e.target.value)} style={{width:"100%",marginBottom:"10px"}} id="outlined-basic" label="Group Name" variant="outlined" />
                        <TextField onChange={(e)=>setGtag(e.target.value)} style={{width:"100%",marginBottom:"10px"}} id="outlined-basic" label="Group Tag" variant="outlined" />
                        <Button onClick={hundleCreateGroup} variant="contained">Create</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    </div>
  )
}

export default MyGroup