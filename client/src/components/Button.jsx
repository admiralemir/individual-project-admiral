export default function Button(props) {
  const { children, variant, style, onClick } = props

  const newStyle = { 
    border: '2px solid grey',
    ...style
  }

  return (
    <button onClick={onClick} style={newStyle} className={`btn btn-${variant} w-100"`}>{children}</button>
  )
}