import './Box.css'

type Props = {
  index: number
  onClick(e:any): void
  player?: string;
}

const Box = ({ index, onClick, player }: Props) => {
 
  return (
    <div
      data-cell-index={index}
      className='box'
      {...{ onClick }}>
     
      {player}
    </div>
  )
}

export default Box;