import React from 'react'
import Hero from './Hero'
import Stats from './home/Stats'
import SmallAbout from './home/SmallAbout'
import FeaturedSpaces from './home/FeaturedSpaces'
import Faq from './home/Faq'
import Members from './home/Members'
import Testimonials from './home/Testimonials'
import HeroVideo from './home/HeroVideo'
import DiscountBanner from '../components/DiscountBanner'
import NearestHive from '../components/NearestHive'
import AmenitiesSection from './home/AmenitiesSection'
import WorkspaceTypes from './home/WorkspaceTypes'

function Home() {
  return (
    <div>
        <Hero />
        <WorkspaceTypes />
        <Stats />
        <SmallAbout />
        <HeroVideo />
        <AmenitiesSection/>
        <Members />
        <DiscountBanner />
        <Faq />
        {/* <FeaturedSpaces /> */}
        <Testimonials />
        <NearestHive />
    </div>
  )
}

export default Home