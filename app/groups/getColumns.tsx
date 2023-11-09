import { Button, Popconfirm, Popover, Image } from 'antd';
import EditGroup from "./editGroup";

// const editedData = ({title, participants}: propstypes) => {
//   const editedData = {title, participants};
//   return editedData
// }


const getColumns = (onDelete: Function, onEdit: Function) => [
  {
    title: "Goup Picture",
    dataIndex: "profile",
    key: "profile",
    render: (text: string) => <span><Image src={text} width={50} height={50} style={{ borderRadius: 25 }} alt=''/></span>
  },
  {
    title: "Goup Name",
    dataIndex: "title",
    key: "title",
    render: (text: string) => <span style={{ fontSize: 16, fontWeight: 'bolder' }}>{text}</span>,
  },
  {
    title: "Participants",
    dataIndex: "participants",
    key: "participants",
    render: (participants: []) => participants.map((participant: any) => (
      <span key={participant.id}>{participant.username}, </span>
    )),
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
        <Popover content={<EditGroup group={record} />} title='edit group'>
          <Button onClick={() => { onEdit(record)/*, console.log('....record', { record, _ })*/ }} type="text">Edit</Button>
        </Popover>


      </div>
    ),

  },


];

export default getColumns;

