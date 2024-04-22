import "./index.scss"

const colorNumber = 5
const colorList = [
    "blue",
    "red",
    "green",
    "yellow"
]

const DesignColorPage = () => {
    return (
        <div className="design-page">
            This is color Page
            <div className="content">
                {
                    colorList.map((item, index) => {
                        return (
                            <div className={`content-item content-item-${index+1}`} key={index}>
                                {
                                    [...Array(colorNumber * 2 - 1)].map((e, i) => {
                                        return (
                                            <div className={`item item-${i+1}`} key={i}>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DesignColorPage