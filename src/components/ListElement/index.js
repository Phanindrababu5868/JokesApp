import './index.css'

const ListElement = props => {
  const {category, joke} = props
  return (
    <tr className="border border-success p-4">
      <td className="text-success">
        <p>category:-</p>
        {category}
      </td>
      <td className="pl-3 text-white joke">
        <p className="text-danger">joke:-</p>
        {joke}
      </td>
    </tr>
  )
}

export default ListElement
