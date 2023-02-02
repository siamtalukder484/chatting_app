import React, { useEffect } from 'react'
import { getAuth, signOut, onAuthStateChanged  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { activeUser } from '../../slices/userSlices';
import Grid from '@mui/material/Grid';
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';
import GroupList from './GroupList';
import FriendRequest from './FriendRequest';
import Friends from './Friends';
import MyGroup from './MyGroup';
import UserList from './UserList';
import BlockedUser from './BlockedUser';
import ViewSentRequest from './ViewSentRequest';


const Home = () => {
  return (
    <>
        <Grid item xs={4}>
            <GroupList/>
            <FriendRequest/>
            <ViewSentRequest/>
        </Grid>
        <Grid item xs={3}>
            <Friends/>
            <MyGroup/>
        </Grid>
        <Grid item xs={3}>
            <UserList/>
            <BlockedUser/>
        </Grid>
    </>
  )
}

export default Home