
const SmallButton = ({icon, title}) => {
  return (
    <div className="flex flex-row hover:bg-[#D9D9D9] p-4 rounded-lg">
        <div className="basis-1/3 flex item-center justify-center">
            <img src={icon} alt={title} className="w-[40px]" />
        </div>
        <div className="flex items-center justify-start basis-2/3 text-center">
            <p>{title}</p>
        </div>
    </div>
  )
}

export default SmallButton;
