"use client"
import { List } from 'antd'
import React from 'react'

const index = ({ dataNotification }: { dataNotification: any }) => {
  return (
    <div>
      <List
        size="small"
        bordered
        dataSource={dataNotification}
        renderItem={(item: any) => <List.Item>{item.content}</List.Item>}
      />
    </div>
  )
}

export default index

