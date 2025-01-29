import CategoryTable from '@/components/common/categoryTable/categoryTable'
import AdminLayout from '@/components/layout/adminLayout/adminLayout'
import React from 'react'

const Categories = () => {
  return (
    <AdminLayout>
        <CategoryTable isAdmin={true}/>
    </AdminLayout>
  )
}

export default Categories