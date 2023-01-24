import React from 'react'
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';

const GroupList = () => {
  return (
    <div className='box_main'>
        <Flex className='title_wrapper'>
            <BoxTitle title="Group List" className='box_title'/>
            <HomeCmnBtn className="homecmnbtn" title="create group"/>
        </Flex>
        <div className='group_wrapper'>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="Friends Adda" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Hi guys, What's up?"/>
                </div>
                </Flex>
                <div>
                <HomeCmnBtn className="homecmnbtn" title="join"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="Friends Adda" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Hi guys, What's up?"/>
                </div>
                </Flex>
                <div>
                <HomeCmnBtn className="homecmnbtn" title="join"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="Friends Adda" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Hi guys, What's up?"/>
                </div>
                </Flex>
                <div>
                <HomeCmnBtn className="homecmnbtn" title="join"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="Friends Adda" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Hi guys, What's up?"/>
                </div>
                </Flex>
                <div>
                <HomeCmnBtn className="homecmnbtn" title="join"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="Friends Adda" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Hi guys, What's up?"/>
                </div>
                </Flex>
                <div>
                <HomeCmnBtn className="homecmnbtn" title="join"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="Friends Adda" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Hi guys, What's up?"/>
                </div>
                </Flex>
                <div>
                <HomeCmnBtn className="homecmnbtn" title="join"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="Friends Adda" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Hi guys, What's up?"/>
                </div>
                </Flex>
                <div>
                <HomeCmnBtn className="homecmnbtn" title="join"/>
                </div>
            </Flex>
        </div>
    </div>
  )
}

export default GroupList