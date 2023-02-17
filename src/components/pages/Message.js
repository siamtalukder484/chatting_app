import React from 'react'
import Grid from '@mui/material/Grid';
import Friends from "./Friends"
import Images from '../layouts/Images';
import Flex from '../layouts/Flex';
import {BsThreeDotsVertical} from "react-icons/bs";
import JoinedGroup from './JoinedGroup';


const Message = () => {
  return (
    <>
        <Grid item xs={4}>
            <Friends/>
            <JoinedGroup/>
        </Grid>
        <Grid item xs={6}>
            <Flex className="chatting_box">
                <Flex className="chat_head">
                  <Flex className="chat_head_img">
                    <Images src="assets/images/profile.png"/>
                  </Flex>
                  <Flex className="chat_head_info">
                    <h2>Siam Talukder</h2>
                    <span>Online</span>
                  </Flex>
                  <Flex className="chat_head_btn">
                    <BsThreeDotsVertical/>
                  </Flex>
                </Flex>
                <Flex className="chat_body">
                  <div className='send_msg'>
                    <p>hello hello hello</p>
                  </div> 
                  <div className='receive_msg'>
                    <p>hello hello hello</p>
                  </div> 
                  <div className='send_msg'>
                    <p>hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello</p>
                  </div>
                  <div className='receive_msg'>
                    <p>hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello</p>
                  </div> 
                  <div className='send_msg'>
                    <p>hello hello hello</p>
                  </div> 
                  <div className='receive_msg'>
                    <p>hello hello hello</p>
                  </div> 
                  <div className='send_msg'>
                    <p>how are you?</p>
                  </div> 
                  <div className='send_msg'>
                    <p>how are you?</p>
                  </div> 
                </Flex>
                <Flex className="chat_footer">
                    <input name='chat_msg_input' placeholder='Message'/>
                    <button>Send</button>
                </Flex>
            </Flex>
        </Grid>
    </>
  )
}

export default Message