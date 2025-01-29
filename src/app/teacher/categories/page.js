import CategoryTable from '@/components/common/categoryTable/categoryTable'
import TeacherLayout from '@/components/layout/teacherLayout/teacherLayout'
import React from 'react'

const Categories = () => {
  return (
    <TeacherLayout>
        <CategoryTable isAdmin={false}/>
    </TeacherLayout>
  )
}

export default Categories