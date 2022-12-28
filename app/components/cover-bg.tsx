interface BookCoverBGProps {
  color?: string
}

const BookCoverBG = ({ color }: BookCoverBGProps) => (
  <>
  <style jsx>{`
    svg {
      position: absolute;
      z-index: -1;
      height: 100%;
      width: 100%;
    }
  `}</style>
  <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 522.64 785.57"><path fill={color} fillRule="evenodd" d="m522.64,48.64v684.21c-18.93,17.57-37.86,35.14-56.79,52.71-154.84-21.93-309.73-43.86-464.57-65.79C.86,490.88.43,261.91,0,33,20.64,22,41.29,11,61.93,0c153.56,16.21,307.16,32.43,460.71,48.64Z"/></svg>
  </>
)

export default BookCoverBG