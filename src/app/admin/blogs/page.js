import BlogsTable from '@/components/common/blogsTable/blogsTable'
import AdminLayout from '@/components/layout/adminLayout/adminLayout'
import React from 'react'

const Blogs = () => {
  return (
    <AdminLayout>
        <BlogsTable isAdmin={true}/>
    </AdminLayout>
  )
}

export default Blogs