import React from "react";

const Square = (props) => {
  return (
    <div
      onClick={props.onClick}
      className="square animate"
      style={props.style?{
        border: "1px solid",
        height: "100px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:"yellowgreen",
        fontSize:"80px"
      }:{
        border: "1px solid",
        height: "100px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:"white"
      }
    }
     
    >
      <h5>{props.value}</h5>
    </div>
  );
};

export default Square;
