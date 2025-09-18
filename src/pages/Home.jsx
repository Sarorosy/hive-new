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

function Home() {
  return (
    <div>
        <Hero />
        <Stats />
        <SmallAbout />
        <FeaturedSpaces />
        <DiscountBanner />
        <AmenitiesSection/>
        <HeroVideo />
        <Faq />
        <Members />
        <Testimonials />
        <NearestHive />
    </div>
  )
}

export default Home