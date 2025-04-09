import "./grid.scss";

// export default function Grid(props) {
//     const tiles = [...Array(props.height).keys()].map((rowNumber, _) =>
//         <div className="row" key={`${rowNumber}`}>
//             {[...Array(props.width).keys()].map((colNumber, _) => {
//             const content = props.content[`${rowNumber},${colNumber}`]
//             if (content){
//                 return (
//                     <div 
//                     className={`tile background-${content["color"]}`}
//                     key={`${rowNumber}-${colNumber}`}>
//                     {content["text"]}
//                     </div>
//                 );

//             } else{
                
//             return (
//                 <div 
//                 className="tile"
//                 key={`${rowNumber}-${colNumber}`}>
//                 </div>
//             );
//             }
//         })} 
//         </div>
//     )
//     return(
//         <div className="grid-container">
//            <div className="tiles-container">
//              {tiles}
//             </div>
//         </div>
//     )       

// }

// Grid.js
export default function Grid(props) {
    const tiles = [...Array(props.height).keys()].map((rowNumber, _) =>
        <div className="row" key={`${rowNumber}`}>
            {[...Array(props.width).keys()].map((colNumber, _) => {
            const content = props.content[`${rowNumber},${colNumber}`]
            if (content){
                return (
                    <div 
                    className={`tile flip-tile background-${content["color"]}`}
                    key={`${rowNumber}-${colNumber}`}
                    style={{ animationDelay: `${colNumber * 200}ms` }}
                    >
                    {content["text"]}
                    </div>
                );
            } else {
                return (
                    <div 
                    className="tile"
                    key={`${rowNumber}-${colNumber}`}>
                    </div>
                );
            }
        })} 
        </div>
    )
    return(
        <div className="grid-container">
           <div className="tiles-container">
             {tiles}
            </div>
        </div>
    )       
}