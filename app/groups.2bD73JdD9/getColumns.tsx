import type { ColumnsType } from "antd/es/table";
import { Button, Popconfirm, Popover } from 'antd';
import EditGroup from "./editGroup";

interface DataType {
  key: string;
  title: string;
  participants: [];
}



const getColumns = (onDelete: Function, onEdit: Function) => [
  {
    title: "Goup Name",
    dataIndex: "title",
    key: "title",
    render: (text: string) => <span style={{fontWeight: 'bolder'}}>{text}</span>,
  },
  {
    title: "Participants",
    dataIndex: "participants",
    key: "participants",
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (_: any, record: any) => (
      <div>
        <Popconfirm
          title="Are you sure you want to delete this record?"
          onConfirm={() => onDelete(record)}
        >
          <Button type="primary">Delete</Button>
        </Popconfirm>
        <Popover content={<EditGroup admin={record}/>} title='edit admin'>
          <Button onClick={() => { onEdit(record), console.log('....', 'record', record._id) }} type="text">Edit</Button>
        </Popover>


      </div>
    ),

  },


];

export default getColumns;

