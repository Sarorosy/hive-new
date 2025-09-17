import React from 'react'
import Hero from './Hero'
import Stats from './home/Stats'
import SmallAbout from './home/SmallAbout'
import FeaturedSpaces from './home/FeaturedSpaces'
import Amenities from './home/Amenities'
import Faq from './home/Faq'
import Members from './home/Members'
import Testimonials from './home/Testimonials'
import HeroVideo from './home/HeroVideo'
import DiscountBanner from '../components/DiscountBanner'
import NearestHive from '../components/NearestHive'

function Home() {
  return (
    <div>
        <Hero />
        <Stats />
        <SmallAbout />
        <FeaturedSpaces />
        <DiscountBanner />
        <HeroVideo />
        <Amenities />
        <Faq />
        <Members />
        <Testimonials />
        <NearestHive />
    </div>
  )
}

export default Home