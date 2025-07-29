import BlogCard from '@/components/blogcard/BlogCard'
import HomeLayout from '@/components/layouts/homelayout/HomeLayout'
import React from 'react'

const page = () => {
  return (
    <HomeLayout>
      <BlogCard/>
    </HomeLayout>
  )
}

export default page
