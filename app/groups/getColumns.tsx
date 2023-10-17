import { Button, Popconfirm, Popover } from 'antd';
import EditGroup, {propstypes} from "./editGroup";

const editedData = ({title, participants}: propstypes) => {
  const editedData = {title, participants};
  return editedData
}

const getColumns = (onDelete: Function, /*onEdit: Function*/) => [
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
        {/* <Popover content={<EditGroup group={record} dataToParent={editedData}/>} title='edit group'>
          <Button onClick={() => { onEdit(record), console.log('....record', record) }} type="text">Edit</Button>
        </Popover> */}


      </div>
    ),

  },


];

export default getColumns;

