import React from "react"

function AddGroup({data, selectedColor, setSelectedColor }){
    
    const handleClick=()=>{
     setSelectedColor(data.color)
     console.log(data.id)
    }
  return (
    <div style= {{ background: data.color,  width: "30px",
        height: "30px", borderRadius: "50%", margin: "-5px 5px 0px 5px",
        border:`${(selectedColor==data.color) ? "1px solid black " : "none"}`
    }} 
        onClick={handleClick}
        >
        
    </div>
  )
}

export default AddGroup