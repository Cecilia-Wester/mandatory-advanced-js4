import React from 'react';

export default function Grid ({ board, onClickCell }){
    return(
        <div
            style={{
                display: "flex",
                width: 560,
                flexWrap: "wrap",
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
            }}
        >{
            board.map((color, i) => (
                <div
                    key = {i}
                    style={{
                        width: 60,
                        height: 60,
                        border: "1px solid black",
                        borderRadius: '50%',
                        boxSizing: "border-box",
                        backgroundColor: color,
                        margin: '10px'
                    }}
                    onClick={() =>  onClickCell(i)}
                >
                </div>
            ))
        }</div>
    )
}