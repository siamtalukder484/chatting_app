import React, { useEffect, useState } from 'react'
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';
import {Box,Button,Typography,Modal,TextField} from '@mui/material';
import { getDatabase, ref, set, push, onValue, remove} from "firebase/database";
import { useDispatch,useSelector } from 'react-redux'
import Alert from '@mui/material/Alert';
import {BsThreeDotsVertical} from "react-icons/bs";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


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
    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
      };
      let data = useSelector((state) => state)
      const db = getDatabase();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = React.useState(false);
   
    const handleClose2 = () => setOpen2(false);


    let [gname, setGname] = useState()
    let [gtag, setGtag] = useState()
    let [glist, setGlist] = useState([])
    let [grlist, setGrlist] = useState([])
    let [groupmember, setGroupMember] = useState([])

    const handleOpen2 = (item) => {
        setOpen2(true)
        console.log(item.gid)
        const starCountRef = ref(db, 'grouprequest');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach(grdata=>{
                if(grdata.val().groupid == item.gid){
                    arr.push({...grdata.val(),deleteid:grdata.key})  
                }
            })
            setGrlist(arr)
        });
        const starCountRef2 = ref(db, 'groupmembers');
        onValue(starCountRef2, (snapshot) => {
            let arr = []
            snapshot.forEach(items=>{
                if(items.val().adminid == data.userData.userInfo.uid && items.val().groupid == item.gid){
                    arr.push({...items.val(),gmemberid:item.key})
               }
            })
            setGroupMember(arr)
        });
    };



    let hundleCreateGroup = () => {
        set(push(ref(db, 'groups')), {
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
                    arr.push({...item.val(),gid:item.key})
                }
            })
            setGlist(arr)
        });
    },[])

  
    
    let hundleGroupReqDelete = (item) =>{
        remove(ref(db, 'grouprequest/'+ item.deleteid)).then(()=>{
            toast("Member Delete Successfully..");
        });
    }
    let hundleGroupReqAccept = (item) =>{
        set(push(ref(db, 'groupmembers')), {
            ...item,
            date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
          }).then(()=>{
            remove(ref(db, 'grouprequest/'+ item.deleteid)).then(()=>{
                toast("Member Added Successfully..");
            });
          });
    }


    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
        TabPanel.propTypes = {
          children: PropTypes.node,
          index: PropTypes.number.isRequired,
          value: PropTypes.number.isRequired,
        };
        
        function a11yProps(index) {
          return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
          };
        }
        const handleChange = (event, newValue) => {
          setValue(newValue);
        };
        const [value, setValue] = React.useState(0);
      
      
      
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
                    <div style={{display:"flex",alignItems:"center"}}>
                        <BoxTitle title={item.groupname} className='group_name'/>
                        <span className='admin_badge'>admin</span>
                    </div>
                    <SubTitle className="group_subtitle" subtitle={item.grouptag}/>
                </div>
                </Flex>
                <div>
                    <button onClick={()=>handleOpen2(item)} className='group_popup_btn'>    
                        <BsThreeDotsVertical/>
                    </button>
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
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style2}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h4>Group Information</h4>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Pending Request" {...a11yProps(0)} />
                                    <Tab label="Member" {...a11yProps(1)} />
                                    <Tab label="Item Three" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                    {grlist.length > 0 ? grlist.map(item=>(
                                        <>  
                                            <ListItem alignItems="center">
                                                <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                primary={item.username}
                                                secondary={
                                                    <React.Fragment>
                                                    
                                                    {" — Wants to join your group"}
                                                    </React.Fragment>
                                                }
                                                />
                                                <div style={{display:"flex",columnGap:"5px"}}>
                                                    <Button onClick={()=>hundleGroupReqAccept(item)}  variant="outlined">
                                                        Accept
                                                    </Button>
                                                    <Button onClick={()=>hundleGroupReqDelete(item)} variant="outlined" color="error">
                                                        Delete
                                                    </Button>
                                                </div>
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </>
                                    )) : 
                                        <Alert style={{marginTop:"0px",padding: "0 16px",fontWeight:"600"}} variant="filled" severity="error">
                                            No Pending Request available
                                        </Alert>
                                    }
                            
                                </List>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                    {groupmember.length > 0 ? groupmember.map(item=>(
                                        <>  
                                            <ListItem alignItems="center">
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                primary={item.username}
                                                secondary={
                                                    <React.Fragment>
                                                    
                                                    {item.date}
                                                    </React.Fragment>
                                                }
                                                />
                                                <div style={{display:"flex",columnGap:"5px"}}>
                                                    <Button variant="outlined" color="error">
                                                        Remove
                                                    </Button>
                                                </div>
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </>
                                    )) : 
                                        <Alert style={{marginTop:"0px",padding: "0 16px",fontWeight:"600"}} variant="filled" severity="error">
                                            No Member available
                                        </Alert>
                                    }
                            
                                </List>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                            Item Three
                            </TabPanel>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    </div>
  )
}

export default MyGroup