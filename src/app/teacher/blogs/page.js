import BlogsTable from '@/components/common/blogsTable/blogsTable'
import TeacherLayout from '@/components/layout/teacherLayout/teacherLayout'
import React from 'react'

const Blogs = () => {
    return (
        <TeacherLayout>
            <BlogsTable isAdmin={false}/>
        </TeacherLayout>
    )
}

export default Blogs