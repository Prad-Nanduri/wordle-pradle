import "./grid.scss";

export default function Grid(props) {
    const tiles = [...Array(props.height).keys()].map((rowNum, _) =>
        <div className="row" key={`${rowNum}`}>
            {[...Array(props.width).keys()].map((columnNum, _) => {
                const content = props.content[`${rowNum},${columnNum}`]
                if (content){
                    return(
                        <div
                        className={`tile background-${content["color"]}`}
                        key = {`${rowNum}-${columnNum}`}>
                        {content["text"]}
                        </div>
                    )
                } else{
                    return(
                        <div
                        className="tile"
                        key = {`${rowNum}, ${columnNum}`}>
                        </div>
                    )
                }
            // return (<div className="tile" key={`${rowNum}-${columnNum}`}>{`(${rowNum}, ${columnNum})`}</div>);
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
