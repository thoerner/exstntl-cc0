export const Spacer = props => {
  var size = props.size > 0 ? props.size : "0.5";
  return (
    <div style={{padding: size + 'vw'}}></div>
  )
}
