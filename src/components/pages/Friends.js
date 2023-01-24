import React from 'react'
import BoxTitle from '../heading/BoxTitle';
import Flex from '../layouts/Flex';
import CmnButton from '../layouts/CmnButton';
import HomeCmnBtn from '../layouts/HomeCmnBtn';
import Images from "../layouts/Images"
import SubTitle from '../heading/SubTitle';

const Friends = () => {
  return (
    <div className='box_main'>
        <Flex className='title_wrapper'>
            <BoxTitle title="Friends" className='box_title'/>
        </Flex>
        <div className='group_wrapper'>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="Azmir" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Developer"/>
                </div>
                </Flex>
                <div>
                    <HomeCmnBtn className="homecmnbtn" title="block"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="shohel" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Marketer"/>
                </div>
                </Flex>
                <div>
                    <HomeCmnBtn className="homecmnbtn" title="block"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="Azmir" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Developer"/>
                </div>
                </Flex>
                <div>
                    <HomeCmnBtn className="homecmnbtn" title="block"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="shohel" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Marketer"/>
                </div>
                </Flex>
                <div>
                    <HomeCmnBtn className="homecmnbtn" title="block"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="Azmir" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Developer"/>
                </div>
                </Flex>
                <div>
                    <HomeCmnBtn className="homecmnbtn" title="block"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="shohel" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Marketer"/>
                </div>
                </Flex>
                <div>
                    <HomeCmnBtn className="homecmnbtn" title="block"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="Azmir" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Developer"/>
                </div>
                </Flex>
                <div>
                    <HomeCmnBtn className="homecmnbtn" title="block"/>
                </div>
            </Flex>
            <Flex className="grouplist">
                <Flex className='group_details'>
                <div className='group_img_holder'>
                    <Images src='assets/images/profile.png'/>
                </div>
                <div className='group_info'>
                    <BoxTitle title="shohel" className='group_name'/>
                    <SubTitle className="group_subtitle" subtitle="Marketer"/>
                </div>
                </Flex>
                <div>
                    <HomeCmnBtn className="homecmnbtn" title="block"/>
                </div>
            </Flex>
        </div>
    </div>
  )
}

export default Friends