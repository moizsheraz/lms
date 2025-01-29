import StudentsMainPage from '@/components/admin/students/studentsMainPage/studentsMainPage'
import AdminLayout from '@/components/layout/adminLayout/adminLayout'
import React from 'react'

const Students = () => {
  return (
    <AdminLayout>
        <StudentsMainPage/>
    </AdminLayout>
  )
}

export default Students